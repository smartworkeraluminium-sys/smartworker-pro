from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.modalview import ModalView
from kivy.properties import ObjectProperty, StringProperty, BooleanProperty
from kivy.clock import Clock
from kivy.core.window import Window
from kivy.uix.popup import Popup
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.factory import Factory
from kivy.utils import platform
import datetime
import math
import urllib.parse
import webbrowser
import sqlite3  
import re  
import os
import shutil
import hashlib

# --- কাস্টম ফাইল থেকে ইমপোর্ট (ইমোজি ফাংশন সহ) ---
from database import setup_db, get_user_profile
from calculations import to_fraction_inch, to_mm_str, safe_eval, optimize_cutting_plan, format_cuts, generate_material_list, format_pdf_text_with_emoji

# --- Google AdMob (KivMob) Import with Safety Guard ---
try:
    from kivmob import KivMob
    HAS_KIVMOB = True
except ImportError:
    HAS_KIVMOB = False
    print("Warning: KivMob is not installed. Ads will not show, but app will run safely.")

# PDF Library
try:
    from reportlab.lib.pagesizes import A4
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    from reportlab.lib.units import inch
    from reportlab.graphics.shapes import Drawing, Rect, Line, String
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False

# ==========================================
# 0. PREMIUM LICENSE SYSTEM (PDF ONLY)
# ==========================================
SALTS = {
    "1M": "SAHEB_1M_PRO",
    "3M": "SAHEB_3M_PRO",
    "1Y": "SAHEB_1Y_PRO"
}
SPECIAL_PROMO_CODE = "SMARTWORKER_ADMIN_100" # এটি আপনার স্পেশাল কি, যা আজীবন ফ্রি রাখবে

def get_device_id():
    device_id = "UNKNOWN"
    if platform == 'android':
        try:
            from jnius import autoclass
            Context = autoclass('android.content.Context')
            SettingsSecure = autoclass('android.provider.Settings$Secure')
            PythonActivity = autoclass('org.kivy.android.PythonActivity')
            activity = PythonActivity.mActivity
            device_id = SettingsSecure.getString(activity.getContentResolver(), SettingsSecure.ANDROID_ID)
        except Exception as e:
            device_id = "ANDROID_ERR"
    else:
        import uuid
        device_id = str(uuid.getnode()) 
        
    return hashlib.md5(device_id.encode()).hexdigest()[:8].upper()

def check_activation_type(device_id, input_key):
    input_key = input_key.strip().upper()
    if input_key == SPECIAL_PROMO_CODE:
        return "LIFETIME"
        
    for duration, salt in SALTS.items():
        expected_key = hashlib.sha256((device_id + salt).encode()).hexdigest()[:8].upper()
        if input_key == expected_key:
            return duration
    return None

def is_app_activated():
    try:
        with sqlite3.connect('smartworker.db') as conn:
            c = conn.cursor()
            c.execute("CREATE TABLE IF NOT EXISTS license (key TEXT, expiry_date TEXT)")
            c.execute("SELECT key, expiry_date FROM license")
            row = c.fetchone()
            if row:
                saved_key, expiry_str = row
                if saved_key == SPECIAL_PROMO_CODE:
                    return True
                
                expiry_date = datetime.datetime.strptime(expiry_str, "%Y-%m-%d").date()
                if datetime.date.today() <= expiry_date:
                    return True
                else:
                    c.execute("DELETE FROM license")
                    conn.commit()
    except Exception as e:
        pass
    return False

class ActivationScreen(Screen):
    device_id_text = StringProperty("")
    
    def on_enter(self):
        self.device_id_text = get_device_id()
        
    def activate_app(self):
        input_key = self.ids.activation_input.text.strip()
        duration_type = check_activation_type(self.device_id_text, input_key)
        
        if duration_type:
            days_to_add = 0
            if duration_type == "1M": days_to_add = 30
            elif duration_type == "3M": days_to_add = 90
            elif duration_type == "1Y": days_to_add = 365
            elif duration_type == "LIFETIME": days_to_add = 36500
            
            expiry_date = datetime.date.today() + datetime.timedelta(days=days_to_add)
            
            try:
                with sqlite3.connect('smartworker.db') as conn:
                    c = conn.cursor()
                    c.execute("CREATE TABLE IF NOT EXISTS license (key TEXT, expiry_date TEXT)")
                    c.execute("DELETE FROM license")
                    c.execute("INSERT INTO license (key, expiry_date) VALUES (?, ?)", (input_key.upper(), str(expiry_date)))
                show_message("Success", f"PRO Activated Successfully!\nValid till: {expiry_date.strftime('%d-%m-%Y') if duration_type != 'LIFETIME' else 'Lifetime'}")
                
                # --- PRO Active হলে Ads বন্ধ করার লজিক ---
                app = App.get_running_app()
                app.is_pro_active = True
                if HAS_KIVMOB and hasattr(app, 'ads'):
                    app.ads.hide_banner()
                # ------------------------------------------
                
                self.manager.current = 'home'
            except Exception as e:
                show_message("Database Error", str(e))
        else:
            show_message("Failed", "Invalid Activation Key!\nPlease contact Smart Worker Aluminium.")

# ==========================================
# 1. SHARED LOGIC & HELPERS
# ==========================================

def show_message(title, message):
    popup = Popup(title=title, content=Label(text=message), size_hint=(0.8, 0.3))
    popup.open()

def create_elevation_drawing(raw_w, raw_h, top_cols=1, bot_cols=0, bot_h=0, rows=1):
    if not HAS_REPORTLAB or raw_w <= 0 or raw_h <= 0: return None
    try:
        dw, dh = 400, 220
        d = Drawing(dw, dh)
        pad = 25
        avail_w, avail_h = dw - 2*pad, dh - 2*pad
        scale = min(avail_w / raw_w, avail_h / raw_h)
        dr_w = raw_w * scale
        dr_h = raw_h * scale
        start_x = (dw - dr_w) / 2
        start_y = (dh - dr_h) / 2
        
        d.add(Rect(start_x, start_y, dr_w, dr_h, fillColor=None, strokeColor=colors.black, strokeWidth=2.5))
        d.add(Line(start_x, start_y - 8, start_x + dr_w, start_y - 8, strokeColor=colors.blue, strokeWidth=1))
        d.add(Line(start_x, start_y - 12, start_x, start_y - 4, strokeColor=colors.blue, strokeWidth=1))
        d.add(Line(start_x + dr_w, start_y - 12, start_x + dr_w, start_y - 4, strokeColor=colors.blue, strokeWidth=1))
        d.add(String(start_x + dr_w/2 - 20, start_y - 20, f"W: {raw_w}", fontSize=10, fillColor=colors.blue))
        d.add(Line(start_x - 8, start_y, start_x - 8, start_y + dr_h, strokeColor=colors.blue, strokeWidth=1))
        d.add(Line(start_x - 12, start_y, start_x - 4, start_y, strokeColor=colors.blue, strokeWidth=1))
        d.add(Line(start_x - 12, start_y + dr_h, start_x - 4, start_y + dr_h, strokeColor=colors.blue, strokeWidth=1))
        d.add(String(start_x - 45, start_y + dr_h/2, f"H: {raw_h}", fontSize=10, fillColor=colors.blue))
        
        if bot_h > 0 and bot_h < raw_h:
            transom_y = start_y + (bot_h * scale)
            d.add(Line(start_x, transom_y, start_x + dr_w, transom_y, strokeColor=colors.black, strokeWidth=1.5))
            if bot_cols > 1:
                cw = dr_w / bot_cols
                for i in range(1, bot_cols):
                    lx = start_x + i*cw
                    d.add(Line(lx, start_y, lx, transom_y, strokeColor=colors.black, strokeWidth=1))
            if top_cols > 1:
                cw = dr_w / top_cols
                for i in range(1, top_cols):
                    lx = start_x + i*cw
                    d.add(Line(lx, transom_y, lx, start_y + dr_h, strokeColor=colors.black, strokeWidth=1))
        else:
            if rows > 1:
                ch = dr_h / rows
                for i in range(1, rows):
                    ly = start_y + i*ch
                    d.add(Line(start_x, ly, start_x + dr_w, ly, strokeColor=colors.black, strokeWidth=1))
            if top_cols > 1:
                cw = dr_w / top_cols
                for i in range(1, top_cols):
                    lx = start_x + i*cw
                    d.add(Line(lx, transom_y, lx, start_y + dr_h, strokeColor=colors.black, strokeWidth=1))
        return d
    except: return None

def export_tabular_pdf(filename, title, text_content, drawing_obj=None):
    base_dir = "/storage/emulated/0/Download/SmartWorker"
    try:
        if not os.path.exists(base_dir): os.makedirs(base_dir)
    except:
        base_dir = "/storage/emulated/0/Download"
        
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    profile = get_user_profile()
    
    shop_name = profile['shop_name'].upper() if profile and profile.get('shop_name') else "SMART WORKER ALUMINIUM"
    address_line = f"{profile['address']}<br/>Contact: {profile['phone']}" if profile and profile.get('address') else "Amta (Chandni), Howrah, West Bengal<br/>Contact: 9239413517 / 9641405426"
    
    if profile and profile.get('email') and profile['email'].strip(): address_line += f" | Email: {profile['email']}"
    if profile and profile.get('gst') and profile['gst'].strip(): address_line += f"<br/>GST No: {profile['gst']}"
    
    if not HAS_REPORTLAB:
        filepath = os.path.join(base_dir, f"{filename}_{timestamp}.txt")
        try:
            with open(filepath, 'w') as f: f.write(f"=== {shop_name} ===\n{title}\n\n{text_content}\n\n-- App by Smart worker --")
            return filepath
        except Exception as e:
            show_message("Error", str(e))
            return None
            
    filepath = os.path.join(base_dir, f"{filename}_{timestamp}.pdf")
    try:
        doc = SimpleDocTemplate(filepath, pagesize=A4, rightMargin=20, leftMargin=20, topMargin=20, bottomMargin=20)
        elements = []
        styles = getSampleStyleSheet()
        styleH = ParagraphStyle(name='CH', parent=styles['Heading1'], alignment=1, fontSize=14, spaceAfter=2, fontName='Helvetica-Bold')
        styleSub = ParagraphStyle(name='CS', parent=styles['Normal'], alignment=1, fontSize=9, spaceAfter=6)
        styleTitle = ParagraphStyle(name='CT', parent=styles['Heading3'], alignment=1, fontSize=11, spaceAfter=6, fontName='Helvetica-Bold')
        styleCell = ParagraphStyle(name='Cell', parent=styles['Normal'], fontSize=8, leading=9)
        styleCellBold = ParagraphStyle(name='CellB', parent=styles['Normal'], fontSize=8, leading=9, fontName='Helvetica-Bold')

        elements.append(Paragraph(format_pdf_text_with_emoji(shop_name), styleH))
        elements.append(Paragraph(format_pdf_text_with_emoji(f"{address_line}<br/><b>JOB CARD / MEASUREMENT SHEET</b>"), styleSub))
        elements.append(Paragraph(format_pdf_text_with_emoji(f"<u>{title}</u>"), styleTitle))

        if drawing_obj:
            elements.append(Spacer(1, 10))
            elements.append(drawing_obj)
            elements.append(Spacer(1, 15))

        data = [[ Paragraph("<b>Section / Category</b>", styleCellBold), Paragraph("<b>Item Details</b>", styleCellBold), Paragraph("<b>Measurement & Qty</b>", styleCellBold) ]]
        styles_list = [
            ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 1),
        ]

        row_idx = 1
        lines = text_content.split('\n')
        for line in lines:
            line = line.strip()
            if not line or line.startswith('='): continue
            if line.startswith('[') or line.startswith('---'):
                cat = line.replace('[', '').replace(']', '').replace('---', '').strip()
                data.append([Paragraph(format_pdf_text_with_emoji(f"<b>{cat}</b>"), styleCellBold), '', ''])
                styles_list.append(('SPAN', (0, row_idx), (-1, row_idx)))
                styles_list.append(('BACKGROUND', (0, row_idx), (-1, row_idx), colors.HexColor('#e8e8e8')))
                row_idx += 1
            else:
                content = line.lstrip('>').strip()
                if ':' in content:
                    parts = content.split(':', 1)
                    data.append(['', Paragraph(format_pdf_text_with_emoji(parts[0].strip()), styleCell), Paragraph(format_pdf_text_with_emoji(parts[1].strip()), styleCellBold)])
                else:
                    data.append(['', Paragraph(format_pdf_text_with_emoji(content), styleCell), ''])
                row_idx += 1

        t = Table(data, colWidths=[2.0*inch, 2.3*inch, 3.4*inch], repeatRows=1)
        t.setStyle(TableStyle(styles_list))
        elements.append(t)
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("<font size=8 color=grey><i>App by Smart worker</i></font>", ParagraphStyle(name='Footer', parent=styles['Normal'], alignment=1)))
        
        doc.build(elements)
        return filepath
    except Exception as e:
        show_message("Error Saving PDF", str(e))
        return None

# ==========================================
# 2. BASE CLASS FOR DRY PRINCIPLE
# ==========================================

class BaseCalcScreen(Screen):
    def temp_btn_text(self, dt, btn, orig): 
        btn.text = orig

    def save_measurement_data(self, btn, content_text, project_type):
        if not content_text.strip(): return
        today = datetime.date.today().strftime("%d/%m/%Y %I:%M %p")
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("INSERT INTO measurements (date, project_type, details) VALUES (?, ?, ?)",
                          (today, project_type, content_text))
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e:
            show_message("Database Error", str(e))

    def share_pdf(self, filepath, btn, orig_text):
        if filepath:
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig_text), 2)
            if platform == 'android':
                try:
                    from plyer import share
                    share.send_file(filepath)
                except Exception as e:
                    print("Share not available:", e)

# ==========================================
# 3. APPLICATION LOGIC
# ==========================================

class SetupScreen(Screen):
    def save_profile(self):
        name = self.ids.setup_name.text.strip()
        shop = self.ids.setup_shop.text.strip()
        phone = self.ids.setup_phone.text.strip()
        address = self.ids.setup_address.text.strip()
        if not name or not shop or not phone or not address:
            show_message("Error", "Please fill Name, Shop Name, Phone and Address.")
            return
        email = "" 
        gst = ""
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("INSERT INTO user_profile (name, shop_name, email, phone, gst, address) VALUES (?, ?, ?, ?, ?, ?)",
                          (name, shop, email, phone, gst, address))
            self.manager.current = 'home'
        except Exception as e: show_message("Database Error", str(e))

class SettingsScreen(Screen): pass

class BillSettingsScreen(Screen):
    def on_enter(self):
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("SELECT key_name, value FROM bill_settings")
                rows = c.fetchall()
            
            data = {k: v for k, v in rows}
            self.ids.bs_unit.text = str(data.get('Default Unit', 'Feet'))
            self.ids.bs_d27_2t.text = str(data.get('Domal 27x65 (2-Track)', '0.0'))
            self.ids.bs_d27_3t.text = str(data.get('Domal 27x65 (3-Track)', '0.0'))
            self.ids.bs_d27_4t.text = str(data.get('Domal 27x65 (4-Track)', '0.0'))
            self.ids.bs_d35_2t.text = str(data.get('Domal 35x75 (2-Track)', '0.0'))
            self.ids.bs_d35_3t.text = str(data.get('Domal 35x75 (3-Track)', '0.0'))
            self.ids.bs_d35_4t.text = str(data.get('Domal 35x75 (4-Track)', '0.0'))
            
            self.ids.bs_s1840_2t.text = str(data.get('Sliding 18x40 (2-Track)', '0.0'))
            self.ids.bs_s1840_3t.text = str(data.get('Sliding 18x40 (3-Track)', '0.0'))
            self.ids.bs_s1840_4t.text = str(data.get('Sliding 18x40 (4-Track)', '0.0'))
            self.ids.bs_s1850_2t.text = str(data.get('Sliding 18x50 (2-Track)', '0.0'))
            self.ids.bs_s1850_3t.text = str(data.get('Sliding 18x50 (3-Track)', '0.0'))
            self.ids.bs_s1850_4t.text = str(data.get('Sliding 18x50 (4-Track)', '0.0'))
            self.ids.bs_s1860_2t.text = str(data.get('Sliding 18x60 (2-Track)', '0.0'))
            self.ids.bs_s1860_3t.text = str(data.get('Sliding 18x60 (3-Track)', '0.0'))
            self.ids.bs_s1860_4t.text = str(data.get('Sliding 18x60 (4-Track)', '0.0'))
            self.ids.bs_s2550_2t.text = str(data.get('Sliding 25x50 (2-Track)', '0.0'))
            self.ids.bs_s2550_3t.text = str(data.get('Sliding 25x50 (3-Track)', '0.0'))
            self.ids.bs_s2550_4t.text = str(data.get('Sliding 25x50 (4-Track)', '0.0'))
            self.ids.bs_s2565_2t.text = str(data.get('Sliding 25x65 (2-Track)', '0.0'))
            self.ids.bs_s2565_3t.text = str(data.get('Sliding 25x65 (3-Track)', '0.0'))
            self.ids.bs_s2565_4t.text = str(data.get('Sliding 25x65 (4-Track)', '0.0'))
            
            self.ids.bs_c34.text = str(data.get('Casement 34 Series', '0.0'))
            self.ids.bs_c40.text = str(data.get('Casement 40 Series', '0.0'))
            
            self.ids.bs_door_std.text = str(data.get('Standard Door', '0.0'))
            self.ids.bs_door_fs.text = str(data.get('Floor Spring Door', '0.0'))
            self.ids.bs_door_th.text = str(data.get('Top Hung Door', '0.0'))
            self.ids.bs_door_domal.text = str(data.get('Domal Door', '0.0'))
            
            self.ids.bs_part_fix.text = str(data.get('Fixed Partition', '0.0'))
            self.ids.bs_part_door.text = str(data.get('Door Partition', '0.0'))
            
            self.ids.bs_ceil_gyp.text = str(data.get('Gypsum Ceiling', '0.0'))
            self.ids.bs_ceil_pvc.text = str(data.get('PVC Ceiling', '0.0'))
            
            self.ids.bs_other.text = str(data.get('Other Work', '0.0'))
            self.ids.bs_gst.text = str(data.get('GST', '0.0'))
            self.ids.bs_discount.text = str(data.get('Discount', '0.0'))
        except Exception as e:
            print("DB Error:", e)

    def save_settings(self):
        try:
            data = [
                (self.ids.bs_unit.text, 'Default Unit'),
                (str(safe_eval(self.ids.bs_d27_2t.text)), 'Domal 27x65 (2-Track)'),
                (str(safe_eval(self.ids.bs_d27_3t.text)), 'Domal 27x65 (3-Track)'),
                (str(safe_eval(self.ids.bs_d27_4t.text)), 'Domal 27x65 (4-Track)'),
                (str(safe_eval(self.ids.bs_d35_2t.text)), 'Domal 35x75 (2-Track)'),
                (str(safe_eval(self.ids.bs_d35_3t.text)), 'Domal 35x75 (3-Track)'),
                (str(safe_eval(self.ids.bs_d35_4t.text)), 'Domal 35x75 (4-Track)'),
                
                (str(safe_eval(self.ids.bs_s1840_2t.text)), 'Sliding 18x40 (2-Track)'),
                (str(safe_eval(self.ids.bs_s1840_3t.text)), 'Sliding 18x40 (3-Track)'),
                (str(safe_eval(self.ids.bs_s1840_4t.text)), 'Sliding 18x40 (4-Track)'),
                (str(safe_eval(self.ids.bs_s1850_2t.text)), 'Sliding 18x50 (2-Track)'),
                (str(safe_eval(self.ids.bs_s1850_3t.text)), 'Sliding 18x50 (3-Track)'),
                (str(safe_eval(self.ids.bs_s1850_4t.text)), 'Sliding 18x50 (4-Track)'),
                (str(safe_eval(self.ids.bs_s1860_2t.text)), 'Sliding 18x60 (2-Track)'),
                (str(safe_eval(self.ids.bs_s1860_3t.text)), 'Sliding 18x60 (3-Track)'),
                (str(safe_eval(self.ids.bs_s1860_4t.text)), 'Sliding 18x60 (4-Track)'),
                (str(safe_eval(self.ids.bs_s2550_2t.text)), 'Sliding 25x50 (2-Track)'),
                (str(safe_eval(self.ids.bs_s2550_3t.text)), 'Sliding 25x50 (3-Track)'),
                (str(safe_eval(self.ids.bs_s2550_4t.text)), 'Sliding 25x50 (4-Track)'),
                (str(safe_eval(self.ids.bs_s2565_2t.text)), 'Sliding 25x65 (2-Track)'),
                (str(safe_eval(self.ids.bs_s2565_3t.text)), 'Sliding 25x65 (3-Track)'),
                (str(safe_eval(self.ids.bs_s2565_4t.text)), 'Sliding 25x65 (4-Track)'),
                
                (str(safe_eval(self.ids.bs_c34.text)), 'Casement 34 Series'),
                (str(safe_eval(self.ids.bs_c40.text)), 'Casement 40 Series'),
                
                (str(safe_eval(self.ids.bs_door_std.text)), 'Standard Door'),
                (str(safe_eval(self.ids.bs_door_fs.text)), 'Floor Spring Door'),
                (str(safe_eval(self.ids.bs_door_th.text)), 'Top Hung Door'),
                (str(safe_eval(self.ids.bs_door_domal.text)), 'Domal Door'),
                
                (str(safe_eval(self.ids.bs_part_fix.text)), 'Fixed Partition'),
                (str(safe_eval(self.ids.bs_part_door.text)), 'Door Partition'),
                
                (str(safe_eval(self.ids.bs_ceil_gyp.text)), 'Gypsum Ceiling'),
                (str(safe_eval(self.ids.bs_ceil_pvc.text)), 'PVC Ceiling'),
                
                (str(safe_eval(self.ids.bs_other.text)), 'Other Work'),
                (str(safe_eval(self.ids.bs_gst.text)), 'GST'),
                (str(safe_eval(self.ids.bs_discount.text)), 'Discount')
            ]
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.executemany("UPDATE bill_settings SET value = ? WHERE key_name = ?", data)
            show_message("Success", "All Settings Saved Successfully!")
        except Exception as e:
            show_message("Error", str(e))

class CustomerLookupScreen(Screen):
    def search_customer(self):
        pin = self.ids.lookup_pin.text.strip()
        if not pin or len(pin) < 4:
            show_message("Error", "Please enter at least a 4-digit PIN.")
            return
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("SELECT name, phone, address FROM customers WHERE phone LIKE ?", (f'%{pin}',))
                customers = c.fetchall()
                if not customers:
                    self.ids.lookup_results.text = "No customer found with this PIN."
                    return
                out_text = ""
                for cust in customers:
                    name, phone, addr = cust
                    c_pin = phone[-4:] if len(phone)>=4 else phone
                    out_text += f"--- CUSTOMER DETAILS ---\nName: {name}\nPhone: {phone}\nAddress: {addr}\nPIN Code: {c_pin}\n\n"
                    out_text += "--- PREVIOUS BILLS ---\n"
                    c.execute("SELECT date, amount, bill_text FROM invoices WHERE phone=?", (phone,))
                    bills = c.fetchall()
                    if bills:
                        for b in bills:
                            out_text += f"Date: {b[0]} | Total: Rs {b[1]:.2f}\n"
                            out_text += b[2] + "\n" + "="*40 + "\n\n"
                    else: out_text += "No saved bills found for this customer.\n\n"
                self.ids.lookup_results.text = out_text
        except Exception as e: self.ids.lookup_results.text = f"Database Error: {str(e)}"

class DashboardScreen(Screen):
    current_month = StringProperty(datetime.date.today().strftime("%m/%Y"))
    total_sales = StringProperty("Rs 0.00")
    total_purchases = StringProperty("Rs 0.00")
    net_balance = StringProperty("Rs 0.00")

    def on_enter(self):
        self.current_month = datetime.date.today().strftime("%m/%Y")
        self.load_dashboard()

    def load_dashboard(self):
        target_month = self.ids.dash_month.text
        sales_sum = 0.0
        exp_sum = 0.0
        details_txt = f"--- DETAILS FOR {target_month} ---\n\n"
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("SELECT date, client, amount FROM invoices WHERE date LIKE ?", (f'%/{target_month}',))
                sales = c.fetchall()
                details_txt += ">> CUSTOMER BILLS (INCOME):\n"
                if sales:
                    for s in sales:
                        details_txt += f"- {s[0]} | {s[1]} | Rs {s[2]:.2f}\n"
                        sales_sum += s[2]
                else: details_txt += "No bills generated this month.\n"
                
                details_txt += "\n>> MATERIAL PURCHASES (EXPENSE):\n"
                c.execute("SELECT date, category, supplier, memo_no, amount FROM expenses WHERE date LIKE ?", (f'%/{target_month}',))
                expenses = c.fetchall()
                if expenses:
                    for e in expenses:
                        details_txt += f"- {e[0]} | {e[1]} | {e[2]} (Memo:{e[3]}) | Rs {e[4]:.2f}\n"
                        exp_sum += e[4]
                else: details_txt += "No purchases recorded this month.\n"
            
            self.total_sales = f"Rs {sales_sum:,.2f}"
            self.total_purchases = f"Rs {exp_sum:,.2f}"
            self.net_balance = f"Rs {(sales_sum - exp_sum):,.2f}"
            self.ids.dash_details.text = details_txt
        except Exception as e: self.ids.dash_details.text = f"Error loading data: {str(e)}"

    def open_add_expense(self):
        popup = App.get_running_app().expense_popup
        popup.ids.exp_supplier.text = ""
        popup.ids.exp_memo.text = ""
        popup.ids.exp_amt.text = ""
        popup.open()

class ProfileScreen(Screen):
    def on_enter(self):
        profile = get_user_profile()
        if profile:
            self.ids.set_name.text = profile.get('name', '')
            self.ids.set_shop.text = profile.get('shop_name', '')
        
    def update_profile(self):
        name = self.ids.set_name.text.strip()
        shop = self.ids.set_shop.text.strip()
        phone = self.ids.set_phone.text.strip()
        address = self.ids.set_address.text.strip()
        if not name or not shop or not phone or not address:
            show_message("Error", "Please fill Name, Shop Name, Phone and Address.")
            return
        try:
            email = self.ids.set_email.text.strip()
            gst = self.ids.set_gst.text.strip()
        except:
            email = ""
            gst = ""
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("DELETE FROM user_profile") 
                c.execute("INSERT INTO user_profile (name, shop_name, email, phone, gst, address) VALUES (?, ?, ?, ?, ?, ?)",
                          (name, shop, email, phone, gst, address))
            show_message("Success", "Profile updated successfully!")
            self.manager.current = 'home'
        except Exception as e: show_message("Database Error", str(e))

class KeypadPopup(ModalView):
    target = ObjectProperty(None)
    display_text = StringProperty("")
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.last_pad = 'none'
    def add_whole(self, val):
        self.display_text += val
        self.last_pad = 'whole'
    def add_num(self, val):
        if self.last_pad == 'whole' and self.display_text and self.display_text[-1].isdigit(): self.display_text += "+" + val
        else: self.display_text += val
        self.last_pad = 'num'
    def add_denom(self, val):
        if self.last_pad != 'denom' and self.display_text and self.display_text[-1].isdigit(): self.display_text += "/" + val
        else: self.display_text += val
        self.last_pad = 'denom'
    def calculate_result(self):
        try:
            ans = str(round(float(eval(self.display_text)), 3))
            if ans.endswith('.0'): ans = ans[:-2]
            self.display_text = ans
            self.last_pad = 'whole'
        except: pass
    def clear(self):
        self.display_text = ""
        self.last_pad = 'none'
    def backspace(self): self.display_text = self.display_text[:-1]
    def enter(self):
        self.calculate_result()
        if self.target: self.target.text = self.display_text
        self.dismiss()

class HomeScreen(Screen):
    greeting = StringProperty("Welcome, Brother!")
    shop_name_display = StringProperty("SMART WORKER PRO")
    is_pro_active = BooleanProperty(False)

    def on_enter(self):
        self.is_pro_active = is_app_activated()
        
        # --- Update App property for global check ---
        app = App.get_running_app()
        if hasattr(app, 'is_pro_active'):
            app.is_pro_active = self.is_pro_active
            
        profile = get_user_profile()
        if profile:
            self.greeting = f"Welcome, {profile.get('name', 'Brother')}!"
            self.shop_name_display = profile.get('shop_name', 'SMART WORKER PRO').upper()

class HistoryScreen(Screen):
    def on_enter(self): self.load_history()
    def load_history(self):
        h_type = self.ids.hist_spinner.text
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                out_text = ""
                if h_type == "Saved Measurements":
                    c.execute("SELECT id, date, project_type, details FROM measurements ORDER BY id DESC")
                    rows = c.fetchall()
                    if not rows: out_text = "No saved measurements found."
                    for row in rows:
                        out_text += f"Project ID #{row[0]} | Date: {row[1]} | Type: {row[2]}\n"
                        out_text += "-"*45 + "\n" + row[3] + "\n" + "="*45 + "\n\n"
                else:
                    c.execute("SELECT id, date, client, amount, bill_text FROM invoices ORDER BY id DESC")
                    rows = c.fetchall()
                    if not rows: out_text = "No saved bills found."
                    for row in rows:
                        out_text += f"Invoice #{row[0]} | Date: {row[1]} | Client: {row[2]} | Total: Rs {row[3]:.2f}\n"
                        out_text += "-"*45 + "\n" + row[4] + "\n" + "="*45 + "\n\n"
            self.ids.history_out.text = out_text
        except Exception as e: self.ids.history_out.text = f"Error loading database: {e}"

    def backup_db(self):
        try:
            base_dir = "/storage/emulated/0/Download/SmartWorker"
            if not os.path.exists(base_dir): os.makedirs(base_dir)
            shutil.copy2('smartworker.db', os.path.join(base_dir, 'smartworker_backup.db'))
            show_message("Backup Successful", f"Database saved to:\n{base_dir}")
        except Exception as e: show_message("Backup Failed", str(e))
            
    def confirm_delete(self):
        h_type = self.ids.hist_spinner.text
        content = BoxLayout(orientation='vertical', padding='10dp', spacing='10dp')
        msg = Label(text=f"Are you sure you want to delete all\n{h_type.lower()}?\n\nThis action cannot be undone!", halign="center")
        content.add_widget(msg)
        btn_layout = BoxLayout(size_hint_y=None, height='50dp', spacing='10dp')
        btn_cancel = Button(text="CANCEL", background_color=(0.2, 0.5, 0.8, 1), bold=True)
        btn_delete = Button(text="YES, DELETE", background_color=(0.9, 0.1, 0.1, 1), bold=True)
        btn_layout.add_widget(btn_cancel)
        btn_layout.add_widget(btn_delete)
        content.add_widget(btn_layout)
        popup = Popup(title="WARNING!", content=content, size_hint=(0.85, 0.35), auto_dismiss=False)
        btn_cancel.bind(on_release=popup.dismiss)
        btn_delete.bind(on_release=lambda x: self.execute_delete(popup, h_type))
        popup.open()

    def execute_delete(self, popup, h_type):
        popup.dismiss()
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                if h_type == "Saved Measurements": c.execute("DELETE FROM measurements")
                else: c.execute("DELETE FROM invoices")
            self.load_history()
            show_message("Success", f"All {h_type.lower()} deleted successfully.")
        except Exception as e: show_message("Error", str(e))

class DomalScreen(BaseCalcScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {}
        self.glass_dict = {}

    def calculate_domal(self):
        try:
            raw_h, raw_w = safe_eval(self.ids.entry_h_cut.text), safe_eval(self.ids.entry_w_cut.text)
            if raw_h == 0 or raw_w == 0: 
                show_message("Input Error", "Please enter Height and Width.")
                return
            is_mm = ("Millimeter" in self.ids.combo_unit_cut.text)
            h_in = raw_h / 25.4 if is_mm else raw_h
            w_in = raw_w / 25.4 if is_mm else raw_w
            t_text = self.ids.combo_type_cut.text
            series = self.ids.combo_series.text
            h_minus, w_minus_2t, w_plus_3t, w_plus_4t, w_plus_co, g_minus = 3.125, 0.625, 1.625, 3.875, 1.75, 4.125
            
            if "35x75" in series:
                if "2 inch" in series: h_minus = 3.0
                else: h_minus = 2.875  
                w_minus_2t, w_plus_3t, w_plus_4t, w_plus_co = 0.375, 2.875, 5.875, 2.0 
                if "4-Track (4-Sash)" in t_text: g_minus = 5.0 
                else: g_minus = 4.625 
                
            v_cut_in = h_in - h_minus
            
            has_mesh = False
            mesh_w_in = 0
            
            if "2-Track (2-Sash)" in t_text: 
                h_cut_in, s_c = (w_in - w_minus_2t) / 2, 2
                han_qty, int_qty = 4, 2
            elif "3-Track (3-Sash)" in t_text: 
                h_cut_in, s_c = (w_in + w_plus_3t) / 3, 3
                han_qty, int_qty = 6, 4
                has_mesh = True
                mesh_w_in = (w_in - w_minus_2t) / 2 
            elif "4-Track (4-Sash)" in t_text: 
                h_cut_in, s_c = (w_in + w_plus_4t) / 4, 4
                han_qty, int_qty = 8, 6
                has_mesh = True
                mesh_w_in = (w_in + w_plus_co) / 4 
            else: 
                h_cut_in, s_c = (w_in + w_plus_co) / 4, 4
                han_qty, int_qty = 8, 4
            
            gh_in, gw_in = v_cut_in - g_minus, h_cut_in - g_minus
            self.window_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            
            sys_short = "27x65" if "27x65" in series else "35x75"
            
            total_sash_for_hw = s_c + (1 if has_mesh else 0)
            hw_txt = "--- HARDWARE & ACCESSORIES ---\n"
            hw_txt += f"> Domal Roller / Bearing: {total_sash_for_hw * 2} pc\n"
            hw_txt += f"> Touch Lock / Star Lock: {2 if s_c >= 3 else 1} pc\n"
            hw_txt += f"> L-Cleat (Angle): {total_sash_for_hw * 4} pc\n"
            
            alu_txt = f"[Win #{self.window_count} - H:{raw_h} x W:{raw_w} ({sys_short})]\n> Outer Track (Top/Bot): {disp(w_in)} (2 pc)\n> Outer Track (Vertical): {disp(h_in)} (2 pc)\n> Sash Top/Bottom: {disp(h_cut_in)} ({s_c*2} pc)\n> Sash Handle: {disp(v_cut_in)} ({han_qty} pc)\n> Sash Interlock: {disp(v_cut_in)} ({int_qty} pc)\n"
            
            if has_mesh:
                alu_txt += f"\n--- MOSQUITO NET (জালি পাল্লা) ---\n> Mesh Top/Bot: {disp(mesh_w_in)} (2 pc)\n> Mesh Handle/Interlock: {disp(v_cut_in)} (2 pc)\n"
            
            glass_txt = f"\n--- GLASS SIZES ---\n> Glass Size: {disp(gh_in)} x {disp(gw_in)} ({s_c} pc)\n"
            
            glass_key = f"{disp(gh_in)} x {disp(gw_in)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + s_c
            
            track_type = t_text.split(' ')[0] 
            if "Center" in t_text: track_type = "2-Track CO"
                
            outer_key = f"Domal Outer Frame ({track_type})"
            sash_handle_key = f"Domal Sash Patta & Handle ({track_type})"
            interlock_key = f"Domal Interlock ({track_type})"
            
            for key in [outer_key, sash_handle_key, interlock_key]:
                if key not in self.buckets: self.buckets[key] = []
            
            self.buckets[outer_key].extend([w_in, w_in, h_in, h_in])
            self.buckets[sash_handle_key].extend([h_cut_in] * (s_c * 2))
            if has_mesh: self.buckets[sash_handle_key].extend([mesh_w_in] * 2)
            
            self.buckets[sash_handle_key].extend([v_cut_in] * han_qty)
            if has_mesh: self.buckets[sash_handle_key].extend([v_cut_in] * 1) 
            
            self.buckets[interlock_key].extend([v_cut_in] * int_qty)
            if has_mesh: self.buckets[interlock_key].extend([v_cut_in] * 1) 
            
            self.ids.domal_alu_out.text = alu_txt + hw_txt + glass_txt + "="*35 + "\n\n" + self.ids.domal_alu_out.text
            self.ids.domal_mat_out.text = generate_material_list(self.buckets)
            
            # --- AdMob Interstitial Show ---
            App.get_running_app().show_full_screen_ad()
            
        except Exception as e: show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.window_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.ids.entry_h_cut.text = ""
        self.ids.entry_w_cut.text = ""
        self.ids.domal_alu_out.text = ""
        self.ids.domal_mat_out.text = ""
        
    def export_full(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PDF বিল তৈরি করতে PRO অ্যাক্টিভেশন প্রয়োজন।")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "=== CUTTING SIZES ===\n" + self.ids.domal_alu_out.text + "\n\n" + self.ids.domal_mat_out.text
        raw_h = safe_eval(self.ids.entry_h_cut.text)
        raw_w = safe_eval(self.ids.entry_w_cut.text)
        t_text = self.ids.combo_type_cut.text
        s_c = 2
        if "3-Track" in t_text: s_c = 3
        elif "4-Track" in t_text or "Center Open" in t_text: s_c = 4
        drawing = create_elevation_drawing(raw_w, raw_h, top_cols=s_c, bot_cols=0, bot_h=0, rows=1)
        filepath = export_tabular_pdf("Domal_Material", "Domal Window Job Card", content, drawing)
        self.share_pdf(filepath, btn, orig)
            
    def export_glass(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PDF বিল তৈরি করতে PRO অ্যাক্টিভেশন প্রয়োজন।")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1): content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        filepath = export_tabular_pdf("Domal_Glass", "Domal Glass List", content)
        self.share_pdf(filepath, btn, orig)
            
    def save_data(self, btn):
        content = self.ids.domal_alu_out.text + "\n" + self.ids.domal_mat_out.text
        self.save_measurement_data(btn, content, "Domal Window")

class SlidingScreen(BaseCalcScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {}
        self.glass_dict = {}

    def calculate_sliding(self):
        try:
            raw_h, raw_w = safe_eval(self.ids.sl_h.text), safe_eval(self.ids.sl_w.text)
            if raw_h == 0 or raw_w == 0: 
                show_message("Input Error", "Please enter Height and Width.")
                return
            is_mm = ("Millimeter" in self.ids.sl_unit.text)
            h_in = raw_h / 25.4 if is_mm else raw_h
            w_in = raw_w / 25.4 if is_mm else raw_w
            sys_type, t_type = self.ids.sl_sys.text, self.ids.sl_type.text
            h_minus, w_mod, div, g_h_minus, g_w_mod, g_c = 0, 0, 2, 0, 0, 2
            han_qty, int_qty = 2, 2
            
            mesh_w_mod = 0
            
            if "2-Track" in t_type: div, g_c = 2, 2
            elif "3-Track" in t_type: div, g_c = 3, 3; han_qty, int_qty = 2, 4
            elif "4-Track" in t_type: div, g_c = 4, 4; han_qty, int_qty = 2, 6
            elif "Center Open" in t_type: div, g_c = 4, 4; han_qty, int_qty = 4, 4
            
            if "18x40" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.625, 2.75, 0.625
                mesh_w_mod = -6.0
                if div == 2: w_mod = -6.0
                elif div == 3: w_mod = -8.0
                else: w_mod = -11.0
            elif "18x50" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.625, 2.75, 0.625
                mesh_w_mod = -7.0
                if div == 2: w_mod = -7.0
                elif div == 3: w_mod = -9.5
                else: w_mod = -12.5
            elif "18x60" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.5, 4.125, -4.125
                mesh_w_mod = 0.625
                if div == 2: w_mod = 0.625         
                elif div == 3: w_mod = 2.75        
                else: w_mod = 5.125 
            elif "25x50" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.125, 4.125, 0.75
                mesh_w_mod = -7.5
                if "Center" in t_type: w_mod = -13.5 
                elif div == 2: w_mod = -7.5          
                elif div == 3: w_mod = -9.25       
                else: w_mod = -11.5                
            elif "25x65" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.125, 5.5, 0.75
                mesh_w_mod = -8.75
                if "Center" in t_type: w_mod = -16.625 
                elif div == 2: w_mod = -8.75       
                elif div == 3: w_mod = -11.25      
                else: w_mod = -14.0       
            elif "Door Sliding Master" in sys_type:
                h_minus, g_h_minus, g_w_mod = 43 / 25.4, 121 / 25.4, -8 / 25.4
                mesh_w_mod = -169 / 25.4
                if div == 2: w_mod = -169 / 25.4      
                elif div == 3: w_mod = -204 / 25.4
                else: w_mod = -169 / 25.4

            tb_w = (w_in + w_mod) / div
            handle_h = h_in - h_minus
            glass_h, glass_w = handle_h - g_h_minus, tb_w + g_w_mod
            
            has_mesh = False
            mesh_w_in = 0
            if "3-Track" in t_type or "4-Track" in t_type:
                has_mesh = True
                if "4-Track" in t_type:
                    co_mod = mesh_w_mod * 2 if "18x60" not in sys_type else mesh_w_mod * 2 
                    mesh_w_in = (w_in + co_mod) / 4 
                else:
                    mesh_w_in = (w_in + mesh_w_mod) / 2
            
            self.window_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            
            total_sash_for_hw = g_c + (1 if has_mesh else 0)
            hw_txt = "--- HARDWARE & ACCESSORIES ---\n"
            hw_txt += f"> Sliding Roller / Bearing: {total_sash_for_hw * 2} pc\n"
            hw_txt += f"> Star Lock: {2 if g_c >= 3 else 1} pc\n"
            hw_txt += f"> Rubber & Woolpile: Required\n"
            
            alu_txt = f"[Win #{self.window_count} - H:{raw_h} x W:{raw_w} ({sys_type.split(' ')[0]})]\n> Track Top: {disp(w_in)} (1 pc)\n> Track Bottom: {disp(w_in)} (1 pc)\n> Track Vertical: {disp(h_in)} (2 pc)\n> Sash Top/Bottom: {disp(tb_w)} ({g_c*2} pc)\n> Sash Handle: {disp(handle_h)} ({han_qty} pc)\n> Sash Interlock: {disp(handle_h)} ({int_qty} pc)\n"
            
            if has_mesh:
                alu_txt += f"\n--- MOSQUITO NET (জালি পাল্লা) ---\n> Mesh Top/Bot: {disp(mesh_w_in)} (2 pc)\n> Mesh Handle/Interlock: {disp(handle_h)} (2 pc)\n"
                
            glass_txt = f"\n--- GLASS SIZES ---\n> Glass Size: {disp(glass_h)} x {disp(glass_w)} ({g_c} pc)\n"
            
            glass_key = f"{disp(glass_h)} x {disp(glass_w)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + g_c
            
            track_type = t_type.split(' ')[0]
            top_vert_track_key = f"Track Top/Vertical ({track_type})"
            bot_track_key = f"Track Bottom ({track_type})"
            sash_tb_key = "Sash Top/Bottom"
            sash_vert_key = "Sash Verticals (Handle + Interlock)" 

            for key in [top_vert_track_key, bot_track_key, sash_tb_key, sash_vert_key]:
                if key not in self.buckets: self.buckets[key] = []
                    
            self.buckets[top_vert_track_key].extend([w_in, h_in, h_in])
            self.buckets[bot_track_key].extend([w_in])
            
            self.buckets[sash_tb_key].extend([tb_w] * (g_c * 2))
            if has_mesh: self.buckets[sash_tb_key].extend([mesh_w_in] * 2)
            
            self.buckets[sash_vert_key].extend([handle_h] * (han_qty + int_qty))
            if has_mesh: self.buckets[sash_vert_key].extend([handle_h] * 2)
            
            self.ids.sl_out.text = alu_txt + hw_txt + glass_txt + "="*35 + "\n\n" + self.ids.sl_out.text
            self.ids.sl_mat_out.text = generate_material_list(self.buckets)
            
            # --- AdMob Interstitial Show ---
            App.get_running_app().show_full_screen_ad()
            
        except Exception as e: show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.window_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.ids.sl_h.text = ""
        self.ids.sl_w.text = ""
        self.ids.sl_out.text = ""
        self.ids.sl_mat_out.text = ""
        
    def export_full(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PDF বিল তৈরি করতে PRO অ্যাক্টিভেশন প্রয়োজন।")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "=== CUTTING SIZES ===\n" + self.ids.sl_out.text + "\n\n" + self.ids.sl_mat_out.text
        raw_h = safe_eval(self.ids.sl_h.text)
        raw_w = safe_eval(self.ids.sl_w.text)
        t_type = self.ids.sl_type.text
        div = 2
        if "3-Track" in t_type: div = 3
        elif "4-Track" in t_type or "Center Open" in t_type: div = 4
        drawing = create_elevation_drawing(raw_w, raw_h, top_cols=div, bot_cols=0, bot_h=0, rows=1)
        filepath = export_tabular_pdf("Sliding_Material", "Sliding Window Job Card", content, drawing)
        self.share_pdf(filepath, btn, orig)
            
    def export_glass(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PDF বিল তৈরি করতে PRO অ্যাক্টিভেশন প্রয়োজন।")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1): content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        filepath = export_tabular_pdf("Sliding_Glass", "Sliding Glass List", content)
        self.share_pdf(filepath, btn, orig)
            
    def save_data(self, btn):
        content = self.ids.sl_out.text + "\n" + self.ids.sl_mat_out.text
        self.save_measurement_data(btn, content, "Sliding Window")

class QuotationScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.bill_items = []
        
    def on_enter(self): pass

    def autofill_customer(self):
        phone_input = self.ids.q_phone.text.strip()
        if not phone_input:
            show_message("Empty", "Please enter Phone or PIN (last 4 digits) first.")
            return
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("SELECT name, phone, address FROM customers WHERE phone LIKE ?", (f'%{phone_input}',))
                row = c.fetchone()
            if row:
                self.ids.q_name.text = row[0]
                self.ids.q_phone.text = row[1]  
                self.ids.q_addr.text = row[2]
            else:
                show_message("Not Found", "No customer found with this number.")
        except: pass
        
    def add_item(self):
        try:
            h = safe_eval(self.ids.q_h.text)
            w = safe_eval(self.ids.q_w.text)
            qty = max(1, int(safe_eval(self.ids.q_qty.text)))
            w_type = self.ids.q_type.text
            
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("SELECT value FROM bill_settings WHERE key_name='Default Unit'")
                u_row = c.fetchone()
                unit = u_row[0] if u_row else "Feet"
                
                c.execute("SELECT value FROM bill_settings WHERE key_name=?", (w_type,))
                r_row = c.fetchone()
                rate = safe_eval(r_row[0]) if r_row else 0.0
            
            if h == 0 or w == 0 or rate == 0: 
                show_message("Error", f"Height, Width cannot be 0.\nRate for {w_type} is Rs 0.\nPlease update Rate in Settings.")
                return
            
            if unit == "Feet": sq_ft = h * w
            elif unit == "Millimeters": sq_ft = (h * w) / 92903.04
            else: sq_ft = (h * w) / 144
                
            total_sq_ft = sq_ft * qty
            total_price = total_sq_ft * rate
            
            if unit == "Feet": unit_str = "ft"
            elif unit == "Millimeters": unit_str = "mm"
            else: unit_str = "in"
            
            item = {
                'type': w_type,
                'h': h, 'w': w, 'unit': unit_str, 'qty': qty,
                'rate': rate, 'area': total_sq_ft,
                'price': total_price
            }
            self.bill_items.append(item)
            self.ids.bill_queue_text.text += f"[{len(self.bill_items)}] {w_type} | {h}x{w} {unit_str} | Qty:{qty} | Rs:{total_price:.2f}\n"
            
            self.ids.q_h.text = ""
            self.ids.q_w.text = ""
            self.ids.q_qty.text = "1"
        except Exception as e: show_message("Error", str(e))
        
    def _get_discount_and_gst(self):
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("SELECT value FROM bill_settings WHERE key_name='GST'")
                g_row = c.fetchone()
                gst = safe_eval(g_row[0]) if g_row else 0.0
                
                c.execute("SELECT value FROM bill_settings WHERE key_name='Discount'")
                d_row = c.fetchone()
                disc = safe_eval(d_row[0]) if d_row else 0.0
            return disc, gst
        except:
            return 0.0, 0.0

    def generate_bill(self):
        if not self.bill_items: 
            show_message("Empty", "Please add items to generate bill.")
            return
            
        profile = get_user_profile()
        shop_name = profile['shop_name'].upper() if profile and profile.get('shop_name') else "SMART WORKER ALUMINIUM"
        contact_info = profile['phone'] if profile and profile.get('phone') else "9239413517 / 9641405426"
        addr = profile['address'] if profile and profile.get('address') else "Amta (Chandni), Howrah, West Bengal"
        
        email_info = f"\n           Email: {profile['email']}" if profile and profile.get('email') and profile['email'].strip() else ""
        gst_info = f"\n           GST No: {profile['gst']}" if profile and profile.get('gst') and profile['gst'].strip() else ""
        
        bill_stage = self.ids.q_stage.text
        c_name = self.ids.q_name.text if self.ids.q_name.text else 'Customer'
        c_phone = self.ids.q_phone.text if self.ids.q_phone.text else 'N/A'
        c_addr = self.ids.q_addr.text if self.ids.q_addr.text else 'N/A'
        today = datetime.date.today().strftime("%d/%m/%Y")
        
        discount, gst_pct = self._get_discount_and_gst()
        advance_paid = safe_eval(self.ids.q_advance.text)
        
        bill = "=================================================\n"
        bill += f"           {shop_name}\n"
        bill += f"           {addr}\n"
        bill += f"           Mob: {contact_info}{email_info}{gst_info}\n"
        bill += "=================================================\n"
        bill += f"Invoice Type: {bill_stage}\nDate: {today}\n\n"
        bill += f"Bill To:\nName: {c_name}\nPhone: {c_phone}\nAddress: {c_addr}\n"
        bill += "-------------------------------------------------\n"
        bill += "SN. Description             Qty  Sq.Ft   Amount\n"
        bill += "-------------------------------------------------\n"
        
        grand_total = 0.0
        for i, item in enumerate(self.bill_items, 1):
            desc = f"{item['type']}\n    Size: {item['h']}x{item['w']} {item['unit']} @ Rs.{item['rate']}"
            bill += f"{i}. {desc}\n                            {item['qty']}    {item['area']:.1f}   {item['price']:.2f}\n"
            grand_total += item['price']
            
        net_total = grand_total - discount
        gst_amount = net_total * (gst_pct / 100)
        final_total = net_total + gst_amount
        due_amount = final_total - advance_paid
            
        bill += "-------------------------------------------------\n"
        bill += f"                               Sub Total: Rs {grand_total:.2f}\n"
        if discount > 0:
            bill += f"                               Discount: -Rs {discount:.2f}\n"
        if gst_pct > 0:
            bill += f"                               GST ({gst_pct}%): +Rs {gst_amount:.2f}\n"
        
        bill += f"                             GRAND TOTAL: Rs {final_total:.2f}\n"
        if advance_paid > 0:
            bill += f"                        Advance Received: -Rs {advance_paid:.2f}\n"
        
        bill += f"                              DUE AMOUNT: Rs {due_amount:.2f}\n"
        bill += "=================================================\n"
        bill += "Thank you for your business!\n"
        bill += "           -- App by Smart worker --"
        
        self.ids.bill_output.text = bill
        
        # --- AdMob Interstitial Show ---
        App.get_running_app().show_full_screen_ad()

    def clear_items(self):
        self.bill_items.clear()
        self.ids.bill_queue_text.text = ""
        self.ids.bill_output.text = ""
        self.ids.q_advance.text = "0"
            
    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig
            
    def save_to_db(self, btn):
        bill_text = self.ids.bill_output.text
        if not bill_text.strip(): return
        
        c_name = self.ids.q_name.text.strip() if self.ids.q_name.text.strip() else 'Customer'
        c_phone = self.ids.q_phone.text.strip()
        c_addr = self.ids.q_addr.text.strip()
        today = datetime.date.today().strftime("%d/%m/%Y")
        
        grand_total = sum(item['price'] for item in self.bill_items)
        discount, gst_pct = self._get_discount_and_gst()
        
        net_total = grand_total - discount
        final_total = net_total + (net_total * (gst_pct / 100))
        
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                if c_phone and c_phone != 'N/A' and c_phone.isdigit():
                    c.execute("SELECT id FROM customers WHERE phone=?", (c_phone,))
                    if not c.fetchone():
                        c.execute("INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)", (c_name, c_phone, c_addr))
                    else:
                        c.execute("UPDATE customers SET name=?, address=? WHERE phone=?", (c_name, c_addr, c_phone))
                
                c.execute("INSERT INTO invoices (date, client, phone, amount, bill_text) VALUES (?, ?, ?, ?, ?)",
                          (today, c_name, c_phone if c_phone else 'N/A', final_total, bill_text))
                
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e:
            show_message("Database Error", str(e))

    def share_pdf(self, filepath, btn, orig_text):
        if filepath:
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig_text), 2)
            if platform == 'android':
                try:
                    from plyer import share
                    share.send_file(filepath)
                except Exception as e:
                    print("Share not available:", e)

    def export_bill_pdf(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PDF বিল তৈরি করতে PRO অ্যাক্টিভেশন প্রয়োজন।")
            self.manager.current = 'activation'
            return
            
        if not self.bill_items:
            show_message("Empty", "Please add items to generate a bill first.")
            return

        c_name = self.ids.q_name.text if self.ids.q_name.text else 'Customer'
        c_phone = self.ids.q_phone.text if self.ids.q_phone.text else 'N/A'
        c_addr = self.ids.q_addr.text if self.ids.q_addr.text else 'N/A'
        bill_stage = self.ids.q_stage.text
        today = datetime.date.today().strftime("%d/%m/%Y")

        base_dir = "/storage/emulated/0/Download/SmartWorker"
        try:
            if not os.path.exists(base_dir): os.makedirs(base_dir)
        except:
            base_dir = "/storage/emulated/0/Download"
            
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"Invoice_{c_name.replace(' ', '_')}_{timestamp}"
        
        orig = btn.text
        
        if not HAS_REPORTLAB:
            filepath = os.path.join(base_dir, f"{filename}.txt")
            try:
                with open(filepath, 'w') as f:
                    f.write(self.ids.bill_output.text)
                btn.text = "SAVED TXT!"
                Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
            except Exception as e: show_message("Error", str(e))
            return

        filepath = os.path.join(base_dir, f"{filename}.pdf")
        try:
            doc = SimpleDocTemplate(filepath, pagesize=A4, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=30)
            elements = []
            styles = getSampleStyleSheet()
            
            styleH = ParagraphStyle(name='CH', parent=styles['Heading1'], alignment=1, fontSize=18, spaceAfter=2, fontName='Helvetica-Bold', textColor=colors.HexColor("#4a148c"))
            styleSub = ParagraphStyle(name='CS', parent=styles['Normal'], alignment=1, fontSize=10, spaceAfter=15)
            styleNormal = styles['Normal']
            
            profile = get_user_profile()
            shop_name = profile['shop_name'].upper() if profile and profile.get('shop_name') else "SMART WORKER ALUMINIUM"
            address_line = f"{profile['address']}<br/>Contact: {profile['phone']}" if profile and profile.get('address') else "Amta (Chandni), Howrah, West Bengal<br/>Contact: 9239413517 / 9641405426"
            
            if profile and profile.get('email') and profile['email'].strip(): address_line += f"<br/>Email: {profile['email']}"
            if profile and profile.get('gst') and profile['gst'].strip(): address_line += f"<br/>GST No: {profile['gst']}"
                
            elements.append(Paragraph(format_pdf_text_with_emoji(shop_name), styleH))
            elements.append(Paragraph(format_pdf_text_with_emoji(address_line), styleSub))
            
            elements.append(Paragraph(format_pdf_text_with_emoji(f"<b><u>{bill_stage.upper()}</u></b>"), ParagraphStyle(name='Stage', parent=styles['Normal'], alignment=1, fontSize=12, spaceAfter=10, fontName='Helvetica-Bold')))
            
            cust_data = [
                [Paragraph(format_pdf_text_with_emoji(f"<b>Bill To:</b><br/>{c_name}<br/>Phone: {c_phone}<br/>Address: {c_addr}"), styleNormal), 
                 Paragraph(format_pdf_text_with_emoji(f"<b>Date:</b> {today}<br/><b>Invoice No:</b> SW-{timestamp[-6:]}"), styleNormal)]
            ]
            cust_table = Table(cust_data, colWidths=[4*inch, 2.5*inch])
            cust_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP')]))
            elements.append(cust_table)
            elements.append(Spacer(1, 20))
            
            table_data = [['SN', 'Description', 'Qty', 'Sq.Ft', 'Rate', 'Amount']]
            grand_total = 0.0
            
            for i, item in enumerate(self.bill_items, 1):
                desc = Paragraph(format_pdf_text_with_emoji(f"<b>{item['type']}</b><br/>Size: {item['h']} x {item['w']} {item['unit']}"), styleNormal)
                table_data.append([
                    str(i), desc, str(item['qty']), f"{item['area']:.1f}", f"{item['rate']}", f"{item['price']:.2f}"
                ])
                grand_total += item['price']
            
            discount, gst_pct = self._get_discount_and_gst()
            advance_paid = safe_eval(self.ids.q_advance.text)
            
            net_total = grand_total - discount
            gst_amount = net_total * (gst_pct / 100)
            final_total = net_total + gst_amount
            due_amount = final_total - advance_paid
            
            total_start_idx = len(table_data)
            table_data.append(['', '', '', '', 'Sub Total:', f"Rs {grand_total:.2f}"])
            if discount > 0: table_data.append(['', '', '', '', 'Discount:', f"- Rs {discount:.2f}"])
            if gst_pct > 0: table_data.append(['', '', '', '', f'GST ({gst_pct}%):', f"+ Rs {gst_amount:.2f}"])
            
            table_data.append(['', '', '', '', 'Grand Total:', f"Rs {final_total:.2f}"])
            
            if advance_paid > 0:
                table_data.append(['', '', '', '', 'Advance Paid:', f"- Rs {advance_paid:.2f}"])
            
            table_data.append(['', '', '', '', 'DUE AMOUNT:', f"Rs {due_amount:.2f}"])
            
            t = Table(table_data, colWidths=[0.5*inch, 2.5*inch, 0.5*inch, 0.8*inch, 0.8*inch, 1.4*inch])
            t_style = [
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e1bee7")),
                ('TEXTCOLOR', (0,0), (-1,0), colors.black),
                ('ALIGN', (0,0), (-1,0), 'CENTER'),
                ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0,0), (-1,0), 10),
                ('TOPPADDING', (0,0), (-1,0), 10),
                ('INNERGRID', (0,0), (-1, total_start_idx - 1), 0.25, colors.black),
                ('BOX', (0,0), (-1, total_start_idx - 1), 1, colors.black),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                ('ALIGN', (0,1), (0,-1), 'CENTER'), 
                ('ALIGN', (2,1), (4,-1), 'CENTER'), 
                ('ALIGN', (5,1), (5,-1), 'RIGHT'),  
                ('FONTNAME', (4, total_start_idx), (-1, -1), 'Helvetica-Bold'),
                ('ALIGN', (4, total_start_idx), (4, -1), 'RIGHT'),
            ]
            
            last_row_idx = len(table_data) - 1
            t_style.append(('BACKGROUND', (4, last_row_idx), (-1, last_row_idx), colors.HexColor("#ffcdd2")))
            
            t.setStyle(TableStyle(t_style))
            elements.append(t)
            
            elements.append(Spacer(1, 30))
            elements.append(Paragraph(format_pdf_text_with_emoji("<b>Thank you for your business!</b><br/><br/><br/><font size=8 color=grey><i>App by Smart worker</i></font>"), ParagraphStyle(name='CenterB', parent=styles['Normal'], alignment=1)))
            
            doc.build(elements)
            self.share_pdf(filepath, btn, orig)
        except Exception as e:
            show_message("Error Saving PDF", str(e))

    def share_to_whatsapp(self, btn):
        bill_text = self.ids.bill_output.text
        if not bill_text.strip():
            show_message("Empty", "Please generate a bill first to share.")
            return
        
        orig_text = btn.text
        btn.text = "OPENING..."
        Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig_text), 2)
        
        try:
            encoded_msg = urllib.parse.quote(bill_text)
            webbrowser.open(f"whatsapp://send?text={encoded_msg}")
        except Exception as e:
            show_message("Error", "WhatsApp could not be opened.")

# ==========================================
# 4. MAIN APP CLASS WITH ADMOB INTEGRATION
# ==========================================
class SmartWorkerApp(App):
    is_pro_active = BooleanProperty(False)

    def build(self):
        Window.clearcolor = (0.15, 0.15, 0.15, 1) 
        self.sm = Builder.load_file('smartworker.kv')
        self.keypad = KeypadPopup()
        self.expense_popup = Factory.ExpensePopup()
        return self.sm

    def on_start(self):
        if platform == 'android':
            try:
                from android.permissions import request_permissions, Permission
                request_permissions([Permission.WRITE_EXTERNAL_STORAGE, Permission.READ_EXTERNAL_STORAGE])
            except Exception as e:
                print("Permission request failed:", e)

        setup_db()
        self.is_pro_active = is_app_activated()
        
        # --- AdMob Initialization ---
        if HAS_KIVMOB:
            try:
                self.ads = KivMob("ca-app-pub-5392142867325180~6009668242")
                
                if not self.is_pro_active:
                    self.ads.new_banner("ca-app-pub-5392142867325180/7758241486", top_pos=False)
                    self.ads.request_banner()
                    self.ads.show_banner()
                    
                    self.ads.new_interstitial("ca-app-pub-5392142867325180/3435853090")
                    self.ads.request_interstitial()
            except Exception as e:
                print("AdMob setup error:", e)
        # ----------------------------

        if get_user_profile():
            self.sm.current = 'home'
        else:
            self.sm.current = 'setup'
            
    def on_resume(self):
        # KivyMob Banner Reload
        if HAS_KIVMOB and not self.is_pro_active and hasattr(self, 'ads'):
            self.ads.request_banner()
            
    def show_full_screen_ad(self):
        """ক্যালকুলেট বা বিল জেনারেট করার পর ফুল-স্ক্রিন অ্যাড দেখাবে"""
        if HAS_KIVMOB and not self.is_pro_active and hasattr(self, 'ads'):
            try:
                self.ads.show_interstitial()
                self.ads.request_interstitial()
            except Exception as e:
                pass

    def open_keypad(self, target_widget):
        self.keypad.target = target_widget
        self.keypad.display_text = target_widget.text
        self.keypad.open()

    def save_expense(self, popup_instance):
        cat = popup_instance.ids.exp_cat.text
        supplier = popup_instance.ids.exp_supplier.text.strip()
        memo = popup_instance.ids.exp_memo.text.strip()
        amt = safe_eval(popup_instance.ids.exp_amt.text)
        
        if amt == 0:
            show_message("Error", "Please enter a valid amount.")
            return
            
        today = datetime.date.today().strftime("%d/%m/%Y")
        
        try:
            with sqlite3.connect('smartworker.db') as conn:
                c = conn.cursor()
                c.execute("INSERT INTO expenses (date, category, supplier, memo_no, amount) VALUES (?, ?, ?, ?, ?)",
                          (today, cat, supplier if supplier else "Unknown", memo if memo else "N/A", amt))
            
            popup_instance.dismiss()
            show_message("Success", "Purchase saved successfully!")
            
            if self.sm.current == 'dashboard':
                self.sm.get_screen('dashboard').load_dashboard()
                
        except Exception as e:
            show_message("Database Error", str(e))

if __name__ == '__main__': 
    SmartWorkerApp().run()
