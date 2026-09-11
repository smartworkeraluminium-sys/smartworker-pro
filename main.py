import os
import sys

# Auto-set directory so Pydroid 3 always finds smartworker.kv and custom modules
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
try:
    os.chdir(BASE_DIR)
except Exception:
    pass

from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.modalview import ModalView
from kivy.properties import ObjectProperty, StringProperty, BooleanProperty
from kivy.clock import Clock
from kivy.core.window import Window
Window.clearcolor = (0.08, 0.12, 0.24, 1)
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
import shutil
import hashlib

# --- Imports from custom modules ---
from database import setup_db, get_user_profile
from calculations import to_fraction_inch, to_mm_str, safe_eval, optimize_cutting_plan, format_cuts, generate_material_list, format_pdf_text_with_emoji

# ==========================================
# GOOGLE ADMOB (OFFICIAL PRODUCTION IDS)
# ==========================================
ADMOB_APP_ID = "ca-app-pub-5392142867325180~6009668242"
ADMOB_BANNER_ID = "ca-app-pub-5392142867325180/7758241486"
ADMOB_INTERSTITIAL_ID = "ca-app-pub-5392142867325180/3435853090"

try:
    from kivmob import KivMob
    HAS_KIVMOB = True
except ImportError:
    HAS_KIVMOB = False

# --- PDF Library & Drawing tools ---
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
# 0. PREMIUM LICENSE SYSTEM & WHATSAPP
# ==========================================
ADMIN_WHATSAPP_NUMBER = "919239413517"

SALTS = {
    "1M": "SAHEB_1M_PRO",
    "3M": "SAHEB_3M_PRO",
    "1Y": "SAHEB_1Y_PRO"
}
SPECIAL_PROMO_CODE = "SMARTWORKER_ADMIN_100"

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
        except Exception:
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
        db_file = os.path.join(BASE_DIR, 'smartworker.db')
        with sqlite3.connect(db_file) as conn:
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
    except Exception:
        pass
    return False

def get_export_dir():
    if platform == 'android':
        base_dir = "/storage/emulated/0/Download/SmartWorker"
    else:
        base_dir = os.path.join(os.path.expanduser("~"), "Downloads", "SmartWorker")
    try:
        if not os.path.exists(base_dir):
            os.makedirs(base_dir)
    except Exception:
        base_dir = "/storage/emulated/0/Download" if platform == 'android' else os.path.expanduser("~")
    return base_dir

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
                db_file = os.path.join(BASE_DIR, 'smartworker.db')
                with sqlite3.connect(db_file) as conn:
                    c = conn.cursor()
                    c.execute("CREATE TABLE IF NOT EXISTS license (key TEXT, expiry_date TEXT)")
                    c.execute("DELETE FROM license")
                    c.execute("INSERT INTO license (key, expiry_date) VALUES (?, ?)", (input_key.upper(), str(expiry_date)))
                exp_msg = expiry_date.strftime('%d-%m-%Y') if duration_type != 'LIFETIME' else 'Lifetime'
                show_message("Success", f"PRO Activated Successfully! Valid till: {exp_msg}")
                
                app = App.get_running_app()
                app.is_pro_active = True
                if HAS_KIVMOB and hasattr(app, 'ads'):
                    try:
                        app.ads.hide_banner()
                    except Exception:
                        pass
                
                self.manager.current = 'home'
            except Exception as e:
                show_message("Database Error", str(e))
        else:
            show_message("Failed", "Invalid Activation Key! Please contact Smart Worker Aluminium.")

    def subscribe_via_whatsapp(self):
        device_id = self.device_id_text if self.device_id_text else get_device_id()
        msg = f"Hello, I want to activate Smart Worker PRO subscription. Device ID: {device_id}"
        encoded_msg = urllib.parse.quote(msg)
        whatsapp_url = f"https://wa.me/{ADMIN_WHATSAPP_NUMBER}?text={encoded_msg}"
        try:
            webbrowser.open(whatsapp_url)
        except Exception:
            try:
                webbrowser.open(f"whatsapp://send?phone={ADMIN_WHATSAPP_NUMBER}&text={encoded_msg}")
            except Exception:
                show_message("Error", "WhatsApp could not be opened.")
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
                    d.add(Line(lx, start_y, lx, start_y + dr_h, strokeColor=colors.black, strokeWidth=1))
        return d
    except Exception:
        return None

def export_tabular_pdf(filename, title, text_content, drawing_obj=None):
    base_dir = get_export_dir()
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    profile = get_user_profile()
    
    shop_name = profile['shop_name'].upper() if profile and profile.get('shop_name') else "SMART WORKER ALUMINIUM"
    address_line = f"{profile['address']}<br/>Contact: {profile['phone']}" if profile and profile.get('address') else "Amta (Chandni), Howrah, West Bengal<br/>Contact: 9239413517 / 9641405426"
    
    if profile and profile.get('email') and profile['email'].strip(): address_line += f" | Email: {profile['email']}"
    if profile and profile.get('gst') and profile['gst'].strip(): address_line += f"<br/>GST No: {profile['gst']}"
    
    if not HAS_REPORTLAB:
        filepath = os.path.join(base_dir, f"{filename}_{timestamp}.txt")
        try:
            with open(filepath, 'w') as f:
                f.write(f"=== {shop_name} ===\n{title}\n\n{text_content}\n\n-- App by Smart worker --")
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
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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

class SplashScreen(Screen):
    def on_enter(self):
        # Stay clearly visible for 3.5 seconds so the user can read the logo & text
        Clock.schedule_once(self.go_to_next, 3.5)

    def go_to_next(self, dt):
        if get_user_profile():
            self.manager.current = 'home'
        else:
            self.manager.current = 'setup'
    pass

class SetupScreen(Screen):
    def save_profile(self):
        name = self.ids.setup_name.text.strip()
        shop = self.ids.setup_shop.text.strip()
        phone = self.ids.setup_phone.text.strip()
        address = self.ids.setup_address.text.strip()
        if not name or not shop or not phone or not address:
            show_message("Error", "Please fill Name, Shop Name, Phone and Address.")
            return
        email = self.ids.setup_email.text.strip() if hasattr(self.ids, 'setup_email') else "" 
        gst = self.ids.setup_gst.text.strip() if hasattr(self.ids, 'setup_gst') else ""
        try:
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
                c = conn.cursor()
                c.execute("INSERT INTO user_profile (name, shop_name, email, phone, gst, address) VALUES (?, ?, ?, ?, ?, ?)",
                          (name, shop, email, phone, gst, address))
            self.manager.current = 'home'
        except Exception as e: show_message("Database Error", str(e))

class SettingsScreen(Screen): pass

class BillSettingsScreen(Screen):
    def on_enter(self):
        try:
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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
            
            # Dynamic Costing Engine Fields (Step 1: Sliding & Step 2: Domal)
            # Step 1: Sliding Color Rates
            if hasattr(self.ids, 'bs_sl_mill'): self.ids.bs_sl_mill.text = str(data.get('Sliding Mill/Natural (Rs/Kg)', '260.0'))
            if hasattr(self.ids, 'bs_sl_anod'): self.ids.bs_sl_anod.text = str(data.get('Sliding Anodized (Rs/Kg)', '275.0'))
            if hasattr(self.ids, 'bs_sl_powder'): self.ids.bs_sl_powder.text = str(data.get('Sliding Powder Coated (Rs/Kg)', '290.0'))
            if hasattr(self.ids, 'bs_sl_wooden'): self.ids.bs_sl_wooden.text = str(data.get('Sliding Wooden Finish (Rs/Kg)', '345.0'))
            
            # Step 2: Domal Color Rates
            if hasattr(self.ids, 'bs_dm_mill'): self.ids.bs_dm_mill.text = str(data.get('Domal Mill/Natural (Rs/Kg)', '280.0'))
            if hasattr(self.ids, 'bs_dm_anod'): self.ids.bs_dm_anod.text = str(data.get('Domal Anodized (Rs/Kg)', '295.0'))
            if hasattr(self.ids, 'bs_dm_powder'): self.ids.bs_dm_powder.text = str(data.get('Domal Powder Coated (Rs/Kg)', '310.0'))
            if hasattr(self.ids, 'bs_dm_wooden'): self.ids.bs_dm_wooden.text = str(data.get('Domal Wooden Finish (Rs/Kg)', '365.0'))
            
            # Step 3: Doors, Partitions & Casement
            if hasattr(self.ids, 'bs_alu_door'): self.ids.bs_alu_door.text = str(data.get('Door Master Material (Rs/Kg)', '270.0'))
            if hasattr(self.ids, 'bs_alu_partition'): self.ids.bs_alu_partition.text = str(data.get('Partition Material (Rs/Kg)', '265.0'))
            if hasattr(self.ids, 'bs_alu_casement'): self.ids.bs_alu_casement.text = str(data.get('Casement Material (Rs/Kg)', '275.0'))
            
            # Step 4: Glass & Toughened
            if hasattr(self.ids, 'bs_glass_clear'): self.ids.bs_glass_clear.text = str(data.get('Clear Glass (Rs/Sq.Ft)', '35.0'))
            if hasattr(self.ids, 'bs_glass_refl'): self.ids.bs_glass_refl.text = str(data.get('Reflective Glass (Rs/Sq.Ft)', '55.0'))
            if hasattr(self.ids, 'bs_glass_tough'): self.ids.bs_glass_tough.text = str(data.get('Toughened Extra (Rs/Sq.Ft)', '25.0'))
            
            # Step 5: Labour & Profit
            if hasattr(self.ids, 'bs_labour_sliding'): self.ids.bs_labour_sliding.text = str(data.get('Sliding Window Labour', '35.0'))
            if hasattr(self.ids, 'bs_labour_domal'): self.ids.bs_labour_domal.text = str(data.get('Domal Window Labour', '50.0'))
            if hasattr(self.ids, 'bs_labour_casement'): self.ids.bs_labour_casement.text = str(data.get('Casement Labour', '60.0'))
            if hasattr(self.ids, 'bs_labour_door'): self.ids.bs_labour_door.text = str(data.get('Door Master Labour', '65.0'))
            if hasattr(self.ids, 'bs_labour_partition'): self.ids.bs_labour_partition.text = str(data.get('Partition Labour', '40.0'))
            
            if hasattr(self.ids, 'bs_profit_sliding'): self.ids.bs_profit_sliding.text = str(data.get('Sliding Profit (%)', '15.0'))
            if hasattr(self.ids, 'bs_profit_domal'): self.ids.bs_profit_domal.text = str(data.get('Domal Profit (%)', '20.0'))
            if hasattr(self.ids, 'bs_profit_casement'): self.ids.bs_profit_casement.text = str(data.get('Casement Profit (%)', '25.0'))
            if hasattr(self.ids, 'bs_profit_door'): self.ids.bs_profit_door.text = str(data.get('Door Profit (%)', '20.0'))
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
            if hasattr(self.ids, 'bs_sl_mill'):
                data.extend([
                    # Step 1: Sliding Colors
                    (str(safe_eval(self.ids.bs_sl_mill.text)), 'Sliding Mill/Natural (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_sl_anod.text)), 'Sliding Anodized (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_sl_powder.text)), 'Sliding Powder Coated (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_sl_wooden.text)), 'Sliding Wooden Finish (Rs/Kg)'),
                    
                    # Step 2: Domal Colors
                    (str(safe_eval(self.ids.bs_dm_mill.text)), 'Domal Mill/Natural (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_dm_anod.text)), 'Domal Anodized (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_dm_powder.text)), 'Domal Powder Coated (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_dm_wooden.text)), 'Domal Wooden Finish (Rs/Kg)'),
                    
                    # Step 3: Doors, Partitions & Casement
                    (str(safe_eval(self.ids.bs_alu_door.text)), 'Door Master Material (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_alu_partition.text)), 'Partition Material (Rs/Kg)'),
                    (str(safe_eval(self.ids.bs_alu_casement.text)), 'Casement Material (Rs/Kg)'),
                    
                    # Step 4: Glass & Toughened
                    (str(safe_eval(self.ids.bs_glass_clear.text)), 'Clear Glass (Rs/Sq.Ft)'),
                    (str(safe_eval(self.ids.bs_glass_refl.text)), 'Reflective Glass (Rs/Sq.Ft)'),
                    (str(safe_eval(self.ids.bs_glass_tough.text)), 'Toughened Extra (Rs/Sq.Ft)'),
                    
                    # Step 5: Labour & Profit
                    (str(safe_eval(self.ids.bs_labour_sliding.text)), 'Sliding Window Labour'),
                    (str(safe_eval(self.ids.bs_labour_domal.text)), 'Domal Window Labour'),
                    (str(safe_eval(self.ids.bs_labour_casement.text)), 'Casement Labour'),
                    (str(safe_eval(self.ids.bs_labour_door.text)), 'Door Master Labour'),
                    (str(safe_eval(self.ids.bs_labour_partition.text)), 'Partition Labour'),
                    (str(safe_eval(self.ids.bs_profit_sliding.text)), 'Sliding Profit (%)'),
                    (str(safe_eval(self.ids.bs_profit_domal.text)), 'Domal Profit (%)'),
                    (str(safe_eval(self.ids.bs_profit_casement.text)), 'Casement Profit (%)'),
                    (str(safe_eval(self.ids.bs_profit_door.text)), 'Door Profit (%)')
                ])
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
                c = conn.cursor()
                for val, key in data:
                    c.execute("UPDATE bill_settings SET value = ? WHERE key_name = ?", (val, key))
                    if c.rowcount == 0:
                        c.execute("INSERT INTO bill_settings (key_name, value) VALUES (?, ?)", (key, val))
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
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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
            self.ids.set_phone.text = profile.get('phone', '')
            self.ids.set_address.text = profile.get('address', '')
            if hasattr(self.ids, 'set_email'):
                self.ids.set_email.text = profile.get('email', '')
            if hasattr(self.ids, 'set_gst'):
                self.ids.set_gst.text = profile.get('gst', '')
        
    def update_profile(self):
        name = self.ids.set_name.text.strip()
        shop = self.ids.set_shop.text.strip()
        phone = self.ids.set_phone.text.strip()
        address = self.ids.set_address.text.strip()
        if not name or not shop or not phone or not address:
            show_message("Error", "Please fill Name, Shop Name, Phone and Address.")
            return
        email = self.ids.set_email.text.strip() if hasattr(self.ids, 'set_email') else ""
        gst = self.ids.set_gst.text.strip() if hasattr(self.ids, 'set_gst') else ""
        try:
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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
        except Exception: pass
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
        app = App.get_running_app()
        if hasattr(app, 'is_pro_active'):
            app.is_pro_active = self.is_pro_active
            
        profile = get_user_profile()
        if profile:
            self.greeting = f"Welcome, {profile.get('name', 'Brother')}!"
            self.shop_name_display = profile.get('shop_name', 'SMART WORKER PRO').upper()

    def subscribe_via_whatsapp(self):
        device_id = get_device_id()
        msg = f"Hello, I want to activate Smart Worker PRO subscription. Device ID: {device_id}"
        encoded_msg = urllib.parse.quote(msg)
        whatsapp_url = f"https://wa.me/{ADMIN_WHATSAPP_NUMBER}?text={encoded_msg}"
        try:
            webbrowser.open(whatsapp_url)
        except Exception:
            try:
                webbrowser.open(f"whatsapp://send?phone={ADMIN_WHATSAPP_NUMBER}&text={encoded_msg}")
            except Exception:
                show_message("Error", "WhatsApp could not be opened.")

class HistoryScreen(Screen):
    def on_enter(self): self.load_history()
    def load_history(self):
        h_type = self.ids.hist_spinner.text
        try:
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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
            base_dir = get_export_dir()
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            shutil.copy2(db_file, os.path.join(base_dir, 'smartworker_backup.db'))
            show_message("Backup Successful", f"Database saved to: {base_dir}")
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
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
                c = conn.cursor()
                if h_type == "Saved Measurements": c.execute("DELETE FROM measurements")
                else: c.execute("DELETE FROM invoices")
            self.load_history()
            show_message("Success", f"All {h_type.lower()} deleted successfully.")
        except Exception as e: show_message("Error", str(e))

class DoorScreen(BaseCalcScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.door_count = 0
        self.buckets = {"Door Outer Frame": [], "Door Verticals": [], "Door Horizontals": []}
        self.glass_dict = {}
    def calculate_door(self):
        try:
            raw_h, raw_w = safe_eval(self.ids.d_master_h.text), safe_eval(self.ids.d_master_w.text)
            if raw_h == 0 or raw_w == 0: 
                show_message("Input Error", "Please enter Height and Width.")
                return
            is_mm = ("Millimeter" in self.ids.d_master_unit.text)
            h = raw_h / 25.4 if is_mm else raw_h
            w = raw_w / 25.4 if is_mm else raw_w
            d_type = self.ids.d_master_type.text
            outer_v = h
            outer_h = w - 3.0
            has_outer = True
            if d_type == "Standard Door": door_v, door_tb, palla_qty = h - 1.75, w - 6.75, 1
            elif d_type == "Top Hung Door": door_v, door_tb, palla_qty, has_outer = h, w - 6.75, 1, False
            elif d_type == "Domal System Door": door_v, door_tb, palla_qty = h - (25.0 / 25.4), (w - (38.0 / 25.4)) - 3.5, 1
            else: door_v, door_tb, palla_qty = h - 2.0, w - 6.75, 1
            glass_h, glass_w = door_v - 5.875 - 0.25, door_tb - 0.25
            self.door_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            unit_str = "mm" if is_mm else "Inch"
            
            hw_txt = "--- HARDWARE & ACCESSORIES ---\n"
            hw_txt += f"> Door Hinges / Pivot: 3 pc (Per Leaf)\n> Door Handle: 1 Set\n> Door Lock: 1 Set\n"
            if d_type == "Standard Door": hw_txt += "> Door Closer / Floor Spring: 1 pc\n"
            
            out = f"[Door #{self.door_count} - {d_type} ({raw_h} x {raw_w} {unit_str})]\n"
            if has_outer:
                out += "--- OUTER FRAME ---\n"
                out += f"> Outer Vertical: {disp(outer_v)} (2 pc)\n> Outer Top Horizontal: {disp(outer_h)} (1 pc)\n"
                self.buckets["Door Outer Frame"].extend([outer_v, outer_v, outer_h])
            out += f"--- DOOR SASH ({palla_qty} Palla) ---\n> Door Vertical: {disp(door_v)} ({palla_qty * 2} pc)\n> Door Top/Bottom: {disp(door_tb)} ({palla_qty * 2} pc)\n"
            self.buckets["Door Verticals"].extend([door_v] * (palla_qty * 2))
            self.buckets["Door Horizontals"].extend([door_tb] * (palla_qty * 2))
            out += hw_txt
            out += f"--- GLASS / BOARD ---\n> Glass Size: {disp(glass_h)} x {disp(glass_w)} ({palla_qty} pc)\n"
            glass_key = f"{disp(glass_h)} x {disp(glass_w)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + palla_qty
            
            self.ids.d_master_out.text = out + "="*35 + "\n\n" + self.ids.d_master_out.text
            self.ids.d_master_mat_out.text = generate_material_list(self.buckets)
            
            App.get_running_app().show_full_screen_ad()
        except Exception:
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.door_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.ids.d_master_h.text = ""
        self.ids.d_master_w.text = ""
        self.ids.d_master_out.text = ""
        self.ids.d_master_mat_out.text = ""
        
    def export_full(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "=== CUTTING SIZES ===\n" + self.ids.d_master_out.text + "\n\n" + self.ids.d_master_mat_out.text
        raw_h = safe_eval(self.ids.d_master_h.text)
        raw_w = safe_eval(self.ids.d_master_w.text)
        drawing = create_elevation_drawing(raw_w, raw_h, top_cols=1, bot_cols=0, bot_h=0, rows=1)
        filepath = export_tabular_pdf("DoorMaster_Material", "Door Job Card", content, drawing)
        self.share_pdf(filepath, btn, orig)
            
    def export_glass(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1): content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        filepath = export_tabular_pdf("DoorMaster_Glass", "Door Glass List", content)
        self.share_pdf(filepath, btn, orig)
            
    def save_data(self, btn):
        content = self.ids.d_master_out.text + "\n" + self.ids.d_master_mat_out.text
        self.save_measurement_data(btn, content, "Door Master")

class CustomCasementScreen(BaseCalcScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {"Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": [], "Square Clip (Beading)": []}
        self.glass_dict = {}

    def calculate_custom(self):
        try:
            raw_h = safe_eval(self.ids.cc_h.text)
            raw_w = safe_eval(self.ids.cc_w.text)
            if raw_h == 0 or raw_w == 0: 
                show_message("Input Error", "Please enter Height and Width.")
                return
            bot_h_input = safe_eval(self.ids.cc_bot_h.text)
            mid_w_input = safe_eval(self.ids.cc_mid_w.text)
            
            top_cols = max(1, int(safe_eval(self.ids.cc_top_cols.text)))
            top_open = int(safe_eval(self.ids.cc_top_open.text))
            if top_open > top_cols: top_open = top_cols
            top_fixed = top_cols - top_open
            
            bot_cols = int(safe_eval(self.ids.cc_bot_cols.text)) if self.ids.cc_bot_cols.text.strip() else 0
            bot_open = int(safe_eval(self.ids.cc_bot_open.text)) if self.ids.cc_bot_open.text.strip() else 0
            if bot_open > bot_cols: bot_open = bot_cols
            bot_fixed = bot_cols - bot_open

            is_mm = ("Millimeter" in self.ids.cc_unit.text)
            h_mm = raw_h if is_mm else raw_h * 25.4
            w_mm = raw_w if is_mm else raw_w * 25.4
            bot_gap_input_mm = bot_h_input if is_mm else bot_h_input * 25.4
            mid_w_mm = mid_w_input if is_mm else mid_w_input * 25.4
            
            series = self.ids.cc_series.text
            overlap = 11  
            glass_m_open = 65  
            glass_m_fixed = 7 
            
            outer_2 = 56 if "34" in series else 46
            mullion = 25 if "34" in series else 27
            
            rows = 2 if bot_gap_input_mm > 0 else 1
            h_mullion_qty = 1 if rows == 2 else 0
            
            if rows == 2:
                bot_gap_h = bot_gap_input_mm 
                top_gap_h = h_mm - outer_2 - mullion - bot_gap_h 
            else:
                bot_gap_h = 0
                top_gap_h = h_mm - outer_2
                
            top_v_mullion_qty = top_cols - 1
            bot_v_mullion_qty = max(0, bot_cols - 1)
            
            top_gap_w = (w_mm - outer_2 - (top_v_mullion_qty * mullion)) / top_cols
            bot_gap_w = 0
            if bot_cols > 0: 
                bot_gap_w = (w_mm - outer_2 - (bot_v_mullion_qty * mullion)) / bot_cols

            self.window_count += 1
            def disp(val_mm): return to_mm_str(val_mm / 25.4) if is_mm else to_fraction_inch(val_mm / 25.4)
            unit_str = "mm" if is_mm else "Inch"
            
            total_sash_qty = top_open + bot_open
            
            out_txt = f"[{series} Win #{self.window_count} | Size: {raw_h} x {raw_w} {unit_str}]\n"
            out_txt += "--- 1. OUTER FRAME & MULLIONS ---\n"
            out_txt += f"> Outer Vertical: {disp(h_mm)} (2 pc)\n> Outer Horizontal: {disp(w_mm)} (2 pc)\n"
            self.buckets["Casement Outer"].extend([h_mm/25.4, h_mm/25.4, w_mm/25.4, w_mm/25.4])
            
            if h_mullion_qty > 0:
                out_txt += f"> Horizontal Divider: {disp(w_mm - outer_2)} ({h_mullion_qty} pc)\n"
                self.buckets["Casement Mullion"].extend([(w_mm - outer_2)/25.4] * h_mullion_qty)
            if top_v_mullion_qty > 0:
                out_txt += f"> Top Vert. Mullions: {disp(top_gap_h)} ({top_v_mullion_qty} pc)\n"
                self.buckets["Casement Mullion"].extend([top_gap_h/25.4] * top_v_mullion_qty)
            if bot_v_mullion_qty > 0:
                out_txt += f"> Bot Vert. Mullions: {disp(bot_gap_h)} ({bot_v_mullion_qty} pc)\n"
                self.buckets["Casement Mullion"].extend([bot_gap_h/25.4] * bot_v_mullion_qty)
            
            out_txt += f"\n--- 2. TOP ROW DETAILS ({top_cols} SECTIONS) ---\n"
            if mid_w_mm > 0 and top_cols >= 3:
                num_center_gaps = top_cols - 2
                side_w_total = w_mm - outer_2 - (num_center_gaps * mid_w_mm) - (top_v_mullion_qty * mullion)
                top_side_w = side_w_total / 2
                w_gap_open = mid_w_mm
                w_gap_fixed = top_side_w
            else:
                w_gap_open = top_gap_w
                w_gap_fixed = top_gap_w

            if top_open > 0:
                out_txt += f"[OPENABLE SASH | Qty: {top_open} | Clear Gap: {disp(top_gap_h)} x {disp(w_gap_open)}]\n"
                s1_h, s1_w = top_gap_h + overlap, w_gap_open + overlap
                g_h, g_w = s1_h - glass_m_open, s1_w - glass_m_open
                out_txt += f"  > Z-Handle Sash: {disp(s1_h)} x {disp(s1_w)}\n  > Glass Size: {disp(g_h)} x {disp(g_w)}\n"
                glass_key = f"{disp(g_h)} x {disp(g_w)} (Sash Glass)"
                self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + top_open
                self.buckets["Casement Z Handle"].extend([s1_h/25.4]*2*top_open + [s1_w/25.4]*2*top_open)
                
            if top_fixed > 0:
                out_txt += f"[FIXED GLASS | Qty: {top_fixed} | Clear Gap: {disp(top_gap_h)} x {disp(w_gap_fixed)}]\n"
                g_h, g_w = top_gap_h - glass_m_fixed, w_gap_fixed - glass_m_fixed
                out_txt += f"  > Fixed Glass Size: {disp(g_h)} x {disp(g_w)}\n  > Square Clip (Beading): Required\n"
                glass_key = f"{disp(g_h)} x {disp(g_w)} (Fixed Glass)"
                self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + top_fixed
                beading_length = (top_gap_h + w_gap_fixed) * 2 / 25.4
                self.buckets["Square Clip (Beading)"].extend([beading_length] * top_fixed)

            if bot_cols > 0 and rows == 2:
                out_txt += f"\n--- 3. BOTTOM ROW DETAILS ({bot_cols} SECTIONS) ---\n"
                if bot_open > 0:
                    out_txt += f"[OPENABLE SASH | Qty: {bot_open} | Clear Gap: {disp(bot_gap_h)} x {disp(bot_gap_w)}]\n"
                    s1_h, s1_w = bot_gap_h + overlap, bot_gap_w + overlap
                    g_h, g_w = s1_h - glass_m_open, s1_w - glass_m_open
                    out_txt += f"  > Z-Handle Sash: {disp(s1_h)} x {disp(s1_w)}\n  > Glass Size: {disp(g_h)} x {disp(g_w)}\n"
                    glass_key = f"{disp(g_h)} x {disp(g_w)} (Sash Glass)"
                    self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + bot_open
                    self.buckets["Casement Z Handle"].extend([s1_h/25.4]*2*bot_open + [s1_w/25.4]*2*bot_open)
                    
                if bot_fixed > 0:
                    out_txt += f"[FIXED GLASS | Qty: {bot_fixed} | Clear Gap: {disp(bot_gap_h)} x {disp(bot_gap_w)}]\n"
                    g_h, g_w = bot_gap_h - glass_m_fixed, bot_gap_w - glass_m_fixed
                    out_txt += f"  > Fixed Glass Size: {disp(g_h)} x {disp(g_w)}\n  > Square Clip (Beading): Required\n"
                    glass_key = f"{disp(g_h)} x {disp(g_w)} (Fixed Glass)"
                    self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + bot_fixed
                    beading_length = (bot_gap_h + bot_gap_w) * 2 / 25.4
                    self.buckets["Square Clip (Beading)"].extend([beading_length] * bot_fixed)
                
            hw_txt = "\n--- HARDWARE & ACCESSORIES ---\n"
            if total_sash_qty > 0:
                hw_txt += f"> Friction Stay / Hinges: {total_sash_qty * 2} pc\n"
                hw_txt += f"> Casement Handle: {total_sash_qty} pc\n"
            else:
                hw_txt += "> No Sash Hardware Required (Fully Fixed)\n"
            out_txt += hw_txt
            
            self.ids.cc_out.text = out_txt + "="*35 + "\n\n" + self.ids.cc_out.text
            self.ids.cc_mat_out.text = generate_material_list(self.buckets)
            
            App.get_running_app().show_full_screen_ad()
        except Exception:
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.window_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.ids.cc_h.text = ""
        self.ids.cc_w.text = ""
        self.ids.cc_bot_h.text = "0"
        self.ids.cc_mid_w.text = "0"
        self.ids.cc_top_cols.text = "1"
        self.ids.cc_top_open.text = "1"
        self.ids.cc_bot_cols.text = "0"
        self.ids.cc_bot_open.text = "0"
        self.ids.cc_out.text = ""
        self.ids.cc_mat_out.text = ""
        
    def export_full(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "=== CUTTING SIZES ===\n" + self.ids.cc_out.text + "\n\n" + self.ids.cc_mat_out.text
        raw_h = safe_eval(self.ids.cc_h.text)
        raw_w = safe_eval(self.ids.cc_w.text)
        bot_h = safe_eval(self.ids.cc_bot_h.text)
        top_cols = max(1, int(safe_eval(self.ids.cc_top_cols.text)))
        bot_cols = int(safe_eval(self.ids.cc_bot_cols.text)) if self.ids.cc_bot_cols.text.strip() else 0
        drawing = create_elevation_drawing(raw_w, raw_h, top_cols=top_cols, bot_cols=bot_cols, bot_h=bot_h, rows=1)
        filepath = export_tabular_pdf("CustomCasement_Material", "Custom Casement Job Card", content, drawing)
        self.share_pdf(filepath, btn, orig)
            
    def export_glass(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1): content += f"> {i}. {size} ({qty} Pcs)\n"
        filepath = export_tabular_pdf("CustomCasement_Glass", "Custom Casement Glass List", content)
        self.share_pdf(filepath, btn, orig)
            
    def save_data(self, btn):
        content = self.ids.cc_out.text + "\n" + self.ids.cc_mat_out.text
        self.save_measurement_data(btn, content, "Custom Casement")

class PartitionScreen(BaseCalcScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.part_count = 0
        self.buckets = {"Single Glazing": [], "Double Glazing": [], "Door Sash": []}
        self.glass_dict = {}

    def calculate_partition(self):
        try:
            raw_h, raw_w = safe_eval(self.ids.p_h.text), safe_eval(self.ids.p_w.text)
            if raw_h == 0 or raw_w == 0: 
                show_message("Input Error", "Please enter Height and Width.")
                return
            is_mm = ("Millimeter" in self.ids.p_unit.text)
            h = raw_h / 25.4 if is_mm else raw_h
            w = raw_w / 25.4 if is_mm else raw_w
            p_type = self.ids.part_type.text
            cols = max(1, int(safe_eval(self.ids.p_cols.text)))
            rows = max(1, int(safe_eval(self.ids.p_rows.text)))
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            self.part_count += 1
            unit_str = "mm" if is_mm else "Inch"
            
            hw_txt = "--- HARDWARE & ACCESSORIES ---\n"
            hw_txt += f"> Square Clip (Beading) Required\n> Rubber/Sealant as per perimeter\n"
            
            if p_type == "Fixed Partition":
                out = f"[Partition #{self.part_count} - {p_type} ({raw_h} x {raw_w} {unit_str})]\n"
                outer_v, inter_v, outer_h = h, h - 3.0, w - 3.0
                inner_h = (w - ((cols + 1) * 1.5)) / cols
                
                out += "--- SINGLE GLAZING ---\n"
                out += f"> Vertical: {disp(outer_v)} (2 pc)\n"
                out += f"> Horizontal: {disp(outer_h)} (2 pc)\n"
                self.buckets["Single Glazing"].extend([outer_v, outer_v, outer_h, outer_h])
                
                out += "--- DOUBLE GLAZING ---\n"
                if cols > 1:
                    out += f"> Vertical: {disp(inter_v)} ({cols - 1} pc)\n"
                    self.buckets["Double Glazing"].extend([inter_v] * (cols - 1))
                h_qty = cols * (rows - 1)
                if h_qty > 0:
                    out += f"> Horizontal: {disp(inner_h)} ({h_qty} pc)\n"
                    self.buckets["Double Glazing"].extend([inner_h] * h_qty)
                    
                gap_h = (h - ((rows + 1) * 1.5)) / rows
                glass_qty = int(cols * rows)
                out += hw_txt
                out += f"--- GLASS / BOARD ---\n> Size: {disp(gap_h - 0.25)} x {disp(inner_h - 0.25)} ({glass_qty} pc)\n"
                glass_key = f"{disp(gap_h - 0.25)} x {disp(inner_h - 0.25)}"
                self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + glass_qty
                
            else: 
                raw_dh, raw_dw = safe_eval(self.ids.d_h.text), safe_eval(self.ids.d_w.text)
                if raw_dh == 0 or raw_dw == 0: 
                    show_message("Input Error", "Please enter Door Size.")
                    return
                dh, dw = raw_dh / 25.4 if is_mm else raw_dh, raw_dw / 25.4 if is_mm else raw_dw
                
                out = f"[Partition #{self.part_count} - Door + Partition ({raw_h} x {raw_w} {unit_str})]\n"
                outer_v, inter_v, door_side_v = h, h - 3.0, h - 1.5
                outer_h_top, rem_w = w - 3.0, w - (dw + 3.0)
                inner_h = (rem_w - 3.0) / cols if cols > 0 else 0
                
                out += "--- VERTICALS ---\n"
                out += f"> Outer Vertical: {disp(outer_v)} (2 pc)\n"
                out += f"> Door Side Vertical: {disp(door_side_v)} (1 pc)\n"
                self.buckets["Single Glazing"].extend([outer_v, outer_v])
                self.buckets["Double Glazing"].extend([door_side_v])
                
                if cols > 1:
                    out += f"> Intermediate Vertical: {disp(inter_v)} ({cols - 1} pc)\n"
                    self.buckets["Double Glazing"].extend([inter_v] * (cols - 1))
                    
                out += "--- HORIZONTALS ---\n"
                out += f"> Outer Top Horizontal: {disp(outer_h_top)} (1 pc)\n"
                out += f"> Door Top Transom: {disp(rem_w)} (1 pc)\n"
                self.buckets["Single Glazing"].extend([outer_h_top])
                self.buckets["Double Glazing"].extend([rem_w])
                h_qty = cols * (rows - 1)
                if h_qty > 0:
                    out += f"> Internal Horizontal: {disp(inner_h)} ({h_qty} pc)\n"
                    self.buckets["Double Glazing"].extend([inner_h] * h_qty)
                    
                door_v, door_tb = dh - 1.75, dw - 6.75
                dg_h, dg_w = door_v - 5.875 - 0.25, door_tb - 0.25
                
                out += f"--- DOOR SASH ---\n"
                out += f"> Vertical: {disp(door_v)} (2 pc)\n> Top/Bottom: {disp(door_tb)} (2 pc)\n"
                out += f"> Glass Size: {disp(dg_h)} x {disp(dg_w)} (1 pc)\n"
                self.buckets["Door Sash"].extend([door_v, door_v, door_tb, door_tb])
                
                transom_g_h, transom_g_w = (h - dh - 1.5) - 0.25, dw - 0.25
                part_g_h, part_g_w = (h - ((rows + 1) * 1.5)) / rows - 0.25, inner_h - 0.25
                part_g_qty = int(cols * rows)
                
                hw_txt += "> Door Lock: 1 Set\n> Door Pivot / Floor Spring: 1 Set\n> Door Handle: 1 Set\n"
                out += hw_txt
                
                out += f"--- FIXED GLASS / BOARD ---\n"
                out += f"> Top Transom Glass: {disp(transom_g_h)} x {disp(transom_g_w)} (1 pc)\n"
                if part_g_qty > 0:
                    out += f"> Partition Grid Glass: {disp(part_g_h)} x {disp(part_g_w)} ({part_g_qty} pc)\n"
                    
                self.glass_dict[f"{disp(dg_h)} x {disp(dg_w)}"] = self.glass_dict.get(f"{disp(dg_h)} x {disp(dg_w)}", 0) + 1
                self.glass_dict[f"{disp(transom_g_h)} x {disp(transom_g_w)}"] = self.glass_dict.get(f"{disp(transom_g_h)} x {disp(transom_g_w)}", 0) + 1
                if part_g_qty > 0:
                    self.glass_dict[f"{disp(part_g_h)} x {disp(part_g_w)}"] = self.glass_dict.get(f"{disp(part_g_h)} x {disp(part_g_w)}", 0) + part_g_qty
            
            self.ids.part_out.text = out + "="*35 + "\n\n" + self.ids.part_out.text
            self.ids.part_mat_out.text = generate_material_list(self.buckets)
            
            App.get_running_app().show_full_screen_ad()
        except Exception: 
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.part_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.ids.p_h.text = ""
        self.ids.p_w.text = ""
        self.ids.d_h.text = ""
        self.ids.d_w.text = ""
        self.ids.p_cols.text = "3"
        self.ids.p_rows.text = "3"
        self.ids.part_out.text = ""
        self.ids.part_mat_out.text = ""
        
    def export_full(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "=== CUTTING SIZES ===\n" + self.ids.part_out.text + "\n\n" + self.ids.part_mat_out.text
        raw_h = safe_eval(self.ids.p_h.text)
        raw_w = safe_eval(self.ids.p_w.text)
        cols = max(1, int(safe_eval(self.ids.p_cols.text)))
        rows = max(1, int(safe_eval(self.ids.p_rows.text)))
        drawing = create_elevation_drawing(raw_w, raw_h, top_cols=cols, bot_cols=0, bot_h=0, rows=rows)
        filepath = export_tabular_pdf("Partition_Material", "Partition Job Card", content, drawing)
        self.share_pdf(filepath, btn, orig)
            
    def export_glass(self, btn):
        if not is_app_activated():
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
            self.manager.current = 'activation'
            return
            
        orig = btn.text
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1): content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        filepath = export_tabular_pdf("Partition_Glass", "Partition Glass List", content)
        self.share_pdf(filepath, btn, orig)
            
    def save_data(self, btn):
        content = self.ids.part_out.text + "\n" + self.ids.part_mat_out.text
        self.save_measurement_data(btn, content, "Partition & Door")

class CeilingScreen(Screen):
    def calculate_ceiling(self):
        try:
            l, w = safe_eval(self.ids.c_l.text), safe_eval(self.ids.c_w.text)
            if l == 0 or w == 0: 
                show_message("Input Error", "Please enter Length and Width.")
                return
            area, perimeter, mat_txt = l * w, 2 * (l + w), ""
            if self.ids.c_type.text == "Gypsum Board":
                area_sqm = area / 10.764
                safe_area = area * 1.05 
                pcs_6x4 = math.ceil(safe_area / 24)
                waste_6x4 = (pcs_6x4 * 24) - safe_area
                pcs_8x4 = math.ceil(safe_area / 32)
                waste_8x4 = (pcs_8x4 * 32) - safe_area
                if waste_8x4 < waste_6x4: chosen_board, final_boards = "Gypsum Board (8ft x 4ft)", pcs_8x4
                else: chosen_board, final_boards = "Gypsum Board (6ft x 4ft)", pcs_6x4
                main_channel = math.ceil((area_sqm * 0.83 * 3.28) / 12)
                cross_section = math.ceil((area_sqm * 3.23 * 3.28) / 12)
                l_patti = math.ceil(perimeter / 12)
                cleats_plugs = math.ceil(area_sqm * 0.77)
                screws = math.ceil(area_sqm * 14) 
                compound = round(area_sqm * 0.35, 1) 
                tape = round(area_sqm * 1.2, 1) 
                mat_txt += f"> {chosen_board} -> {final_boards} Pcs\n> Main Channel (12ft): {main_channel} Pcs\n> Cross Section (12ft): {cross_section} Pcs\n> Perimeter L-Patti (12ft): {l_patti} Pcs\n--- Professional Accessories ---\n> Soffit Cleat & Rawl Plug: {cleats_plugs} Sets\n> Drywall Screws: {screws} Pcs\n> Jointing Compound: {compound} Kg\n> Fiber Tape: {tape} Meter\n"
            else:
                panels = math.ceil((area / 8.33) * 1.05)
                tube_ft = (area / 2) + perimeter
                pvc_channels = math.ceil(tube_ft / 12)
                l_patti = math.ceil(perimeter / 12)
                screws = math.ceil(area * 1.5)
                mat_txt += f"> PVC Panels (10ft x 10in): {panels} Pcs\n> Support Channel/Tube (12ft): {pvc_channels} Pcs\n> Perimeter U-Patti/L-Patti: {l_patti} Pcs\n> Screws (Half Inch): {screws} Pcs\n"
            res = f"--- ROOM DETAILS ---\nRoom Size: {l} ft x {w} ft\nTotal Area: {area:.2f} Sq.Ft\n-------------------------\n--- MATERIAL REQUIRED ---\n" + mat_txt
            self.ids.c_out.text = res
            
            App.get_running_app().show_full_screen_ad()
        except Exception:
            show_message("Calculation Error", "Please check your inputs.")
        
    def clear_all(self):
        self.ids.c_l.text = ""
        self.ids.c_w.text = ""
        self.ids.c_out.text = ""

class DomalScreen(BaseCalcScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {}
        self.glass_dict = {}

    def calculate_domal(self):
        try:
            raw_h = safe_eval(self.ids.entry_h_cut.text)
            raw_w = safe_eval(self.ids.entry_w_cut.text)
            if raw_h == 0 or raw_w == 0: 
                show_message("Input Error", "Please enter Height and Width.")
                return
            is_mm = ("Millimeter" in self.ids.combo_unit_cut.text)
            h_mm = raw_h if is_mm else raw_h * 25.4
            w_mm = raw_w if is_mm else raw_w * 25.4
            
            t_text = self.ids.combo_type_cut.text
            
            # Read Track Height (e.g. 40mm, 42mm, 45mm, 48mm, 50mm, 54mm, 60mm)
            track_h = 45.0
            if hasattr(self.ids, 'domal_track_h'):
                try:
                    num_match = re.findall(r"[0-9]+(?:\.[0-9]+)?", self.ids.domal_track_h.text)
                    if num_match: track_h = float(num_match[0])
                except Exception: track_h = 45.0
                
            # Read Handle H x W (e.g. 27x60, 27x65, 28x65, 26x66, 27x70, 32x72, 35x75, 37x82, 45x85)
            handle_h = 27.0
            handle_w = 65.0
            if hasattr(self.ids, 'domal_handle_hw'):
                try:
                    nums = re.findall(r"[0-9]+(?:\.[0-9]+)?", self.ids.domal_handle_hw.text)
                    if len(nums) >= 2:
                        handle_h = float(nums[0])
                        handle_w = float(nums[1])
                    elif len(nums) == 1:
                        handle_w = float(nums[0])
                except Exception:
                    handle_h, handle_w = 27.0, 65.0
                
            # 1. Height cut formula: Total Height - (2 * Track Height) + 22mm groove overlap
            v_cut_mm = h_mm - (track_h * 2.0) + 22.0
            h_deduct_mm = (track_h * 2.0) - 22.0
            
            # 2. Width cut formula: Total Width - (2 * Track Height - 12mm clearance) + Handle Overlaps
            side_clearance = (track_h * 2.0) - 12.0
            has_mesh = False
            mesh_w_mm = 0
            
            if "2-Track (2-Sash)" in t_text:
                net_w_mod = handle_w - side_clearance
                h_cut_mm = (w_mm + net_w_mod) / 2.0
                s_c = 2
                han_qty, int_qty = 4, 2
            elif "3-Track (3-Sash)" in t_text:
                net_w_mod = (handle_w * 2.0) - side_clearance
                h_cut_mm = (w_mm + net_w_mod) / 3.0
                s_c = 3
                han_qty, int_qty = 6, 4
                has_mesh = True
                mesh_w_mm = (w_mm - side_clearance + handle_w) / 2.0
            elif "4-Track (4-Sash)" in t_text:
                net_w_mod = (handle_w * 3.0) - side_clearance
                h_cut_mm = (w_mm + net_w_mod) / 4.0
                s_c = 4
                han_qty, int_qty = 8, 6
                has_mesh = True
                mesh_w_mm = (w_mm + net_w_mod) / 4.0
            else: # 2-Track Center Open (4-Sash)
                net_w_mod = (handle_w * 2.0) - side_clearance
                h_cut_mm = (w_mm + net_w_mod) / 4.0
                s_c = 4
                han_qty, int_qty = 8, 4
                
            # 3. Glass deduction formula: (2 * Handle Width) - 26mm (13mm pocket each side)
            g_deduct_mm = (handle_w * 2.0) - 26.0
            gh_mm = v_cut_mm - g_deduct_mm
            gw_mm = h_cut_mm - g_deduct_mm
            
            h_in = h_mm / 25.4
            w_in = w_mm / 25.4
            v_cut_in = v_cut_mm / 25.4
            h_cut_in = h_cut_mm / 25.4
            mesh_w_in = mesh_w_mm / 25.4
            gh_in = gh_mm / 25.4
            gw_in = gw_mm / 25.4
            
            self.window_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            unit_str = "mm" if is_mm else "Inch"
            
            total_sash_for_hw = s_c + (1 if has_mesh else 0)
            hw_txt = "--- HARDWARE & ACCESSORIES ---\n"
            hw_txt += f"> Domal Bearing / Rollers: {total_sash_for_hw * 2} pc\n"
            hw_txt += f"> Touch Lock / Star Lock: {2 if s_c >= 3 else 1} pc\n"
            hw_txt += f"> L-Cleat (Corner Angle): {total_sash_for_hw * 4} pc\n"
            hw_txt += "> EPDM Gasket / Seal: Required\n"
            
            w_sign = f"+{net_w_mod:.0f}" if net_w_mod >= 0 else f"{net_w_mod:.0f}"
            spec_info = f"--- JINDAL SPECS (Track H:{track_h:.0f}mm | Handle:{handle_h:.0f}x{handle_w:.0f}mm) ---\n"
            spec_info += f"> Height Formula: (H - {h_deduct_mm:.0f} mm) [+22mm overlap]\n"
            spec_info += f"> Width Formula: (W {w_sign} mm) / {s_c} [-12mm clearance]\n"
            spec_info += f"> Glass Deduction: Sash - {g_deduct_mm:.0f} mm [13mm pocket each side]\n"
            
            alu_txt = f"[Domal Win #{self.window_count} - H:{raw_h} x W:{raw_w} {unit_str}]\n"
            alu_txt += spec_info
            alu_txt += f"> Outer Track (Top/Bot): {disp(w_in)} (2 pc)\n"
            alu_txt += f"> Outer Track (Vertical): {disp(h_in)} (2 pc)\n"
            alu_txt += f"> Sash Top/Bottom: {disp(h_cut_in)} ({s_c*2} pc)\n"
            alu_txt += f"> Sash Handle: {disp(v_cut_in)} ({han_qty} pc)\n"
            alu_txt += f"> Sash Interlock: {disp(v_cut_in)} ({int_qty} pc)\n"
            
            if has_mesh:
                alu_txt += f"\n--- MOSQUITO NET ---\n> Mesh Top/Bot: {disp(mesh_w_in)} (2 pc)\n> Mesh Handle/Interlock: {disp(v_cut_in)} (2 pc)\n"
            
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
            
            App.get_running_app().show_full_screen_ad()
        except Exception as e:
            show_message("Calculation Error", str(e))

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
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
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
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
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

# ==========================================
# 4. SLIDING SCREEN (MOSQUITO NET REMOVED, HANDLE & INTERLOCK FULLY SEPARATED)
# ==========================================
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
            
            # Track and sash division (mosquito net completely removed)
            if "2-Track" in t_type: div, g_c = 2, 2; han_qty, int_qty = 2, 2
            elif "3-Track" in t_type: div, g_c = 3, 3; han_qty, int_qty = 2, 4
            elif "4-Track" in t_type: div, g_c = 4, 4; han_qty, int_qty = 2, 6
            elif "Center Open" in t_type: div, g_c = 4, 4; han_qty, int_qty = 4, 4
            
            if "18x40" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.625, 2.75, 0.625
                if div == 2: w_mod = -6.0
                elif div == 3: w_mod = -8.0
                else: w_mod = -11.0
            elif "18x50" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.625, 2.75, 0.625
                if div == 2: w_mod = -7.0
                elif div == 3: w_mod = -9.5
                else: w_mod = -12.5
            elif "18x60" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.5, 4.125, -4.125
                if div == 2: w_mod = 0.625         
                elif div == 3: w_mod = 2.75        
                else: w_mod = 5.125 
            elif "25x50" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.125, 4.125, 0.75
                if "Center" in t_type: w_mod = -13.5 
                elif div == 2: w_mod = -7.5          
                elif div == 3: w_mod = -9.25       
                else: w_mod = -11.5                
            elif "25x65" in sys_type:
                h_minus, g_h_minus, g_w_mod = 1.125, 5.5, 0.75
                if "Center" in t_type: w_mod = -16.625 
                elif div == 2: w_mod = -8.75       
                elif div == 3: w_mod = -11.25      
                else: w_mod = -14.0       
            elif "Door Sliding Master" in sys_type:
                h_minus, g_h_minus, g_w_mod = 43 / 25.4, 121 / 25.4, -8 / 25.4
                if div == 2: w_mod = -169 / 25.4      
                elif div == 3: w_mod = -204 / 25.4
                else: w_mod = -169 / 25.4

            tb_w = (w_in + w_mod) / div
            handle_h = h_in - h_minus
            glass_h, glass_w = handle_h - g_h_minus, tb_w + g_w_mod
            
            self.window_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            
            hw_txt = "--- HARDWARE & ACCESSORIES ---\n"
            hw_txt += f"> Sliding Roller / Bearing: {g_c * 2} pc\n"
            hw_txt += f"> Star Lock: {2 if g_c >= 3 else 1} pc\n"
            hw_txt += f"> Rubber & Woolpile: Required\n"
            
            alu_txt = f"[Win #{self.window_count} - H:{raw_h} x W:{raw_w} ({sys_type.split(' ')[0]})]\n"
            alu_txt += f"> Track Top: {disp(w_in)} (1 pc)\n"
            alu_txt += f"> Track Bottom: {disp(w_in)} (1 pc)\n"
            alu_txt += f"> Track Vertical: {disp(h_in)} (2 pc)\n"
            alu_txt += f"> Sash Top/Bottom: {disp(tb_w)} ({g_c*2} pc)\n"
            alu_txt += f"> Sash Handle: {disp(handle_h)} ({han_qty} pc)\n"
            alu_txt += f"> Sash Interlock: {disp(handle_h)} ({int_qty} pc)\n"
            
            glass_txt = f"\n--- GLASS SIZES ---\n> Glass Size: {disp(glass_h)} x {disp(glass_w)} ({g_c} pc)\n"
            
            glass_key = f"{disp(glass_h)} x {disp(glass_w)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + g_c
            
            # Cutting optimizer with Handle and Interlock fully separated
            track_type = t_type.split(' ')[0]
            top_vert_track_key = f"Track Top/Vertical ({track_type})"
            bot_track_key = f"Track Bottom ({track_type})"
            sash_tb_key = "Sash Top/Bottom"
            sash_handle_key = "Sash Handle"
            sash_interlock_key = "Sash Interlock"

            for key in [top_vert_track_key, bot_track_key, sash_tb_key, sash_handle_key, sash_interlock_key]:
                if key not in self.buckets: self.buckets[key] = []
                    
            self.buckets[top_vert_track_key].extend([w_in, h_in, h_in])
            self.buckets[bot_track_key].extend([w_in])
            self.buckets[sash_tb_key].extend([tb_w] * (g_c * 2))
            self.buckets[sash_handle_key].extend([handle_h] * han_qty)
            self.buckets[sash_interlock_key].extend([handle_h] * int_qty)
            
            self.ids.sl_out.text = alu_txt + hw_txt + glass_txt + "="*35 + "\n\n" + self.ids.sl_out.text
            self.ids.sl_mat_out.text = generate_material_list(self.buckets)
            
            App.get_running_app().show_full_screen_ad()
        except Exception:
            show_message("Calculation Error", "Please check your inputs.")

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
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
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
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
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


def calculate_suggested_rate(w_type, thickness='1.5 mm', color='Natural Anodized', glass_thick='5.0 mm', glass_type='Clear Float', toughened=False):
    cost_data = {}
    try:
        db_file = os.path.join(BASE_DIR, 'smartworker.db')
        with sqlite3.connect(db_file) as conn:
            c = conn.cursor()
            c.execute("SELECT key_name, value FROM bill_settings")
            cost_data = {k: safe_eval(v) for k, v in c.fetchall()}
    except Exception:
        pass
        
    if cost_data.get(w_type, 0.0) > 0:
        return cost_data[w_type]
    
    thick_val = 1.5
    try:
        thick_val = float(thickness.replace('mm', '').strip())
    except Exception:
        pass
    
    is_domal = ('Domal' in w_type)
    
    # 1. Base metal weight factor per sqft
    if '4-Track' in w_type or 'Center Open' in w_type:
        base_wt = (1.80 if is_domal else 1.40) * (thick_val / 1.5)
    elif '3-Track' in w_type:
        base_wt = (1.45 if is_domal else 1.10) * (thick_val / 1.5)
    elif '2-Track' in w_type:
        base_wt = (1.05 if is_domal else 0.80) * (thick_val / 1.5)
    elif 'Casement' in w_type:
        base_wt = 1.15 * (thick_val / 1.5)
    elif 'Door' in w_type:
        base_wt = 1.35 * (thick_val / 1.5)
    elif 'Partition' in w_type:
        base_wt = 0.90 * (thick_val / 1.5)
    elif 'Ceiling' in w_type:
        return 110.0 if 'Gypsum' in w_type else 95.0
    else:
        base_wt = 0.90
        
    # 2. Material Rate by System and exact Color Variant
    if is_domal:
        # Step 2: Domal Color Rates
        if 'Wooden' in color:
            alu_kg_rate = cost_data.get('Domal Wooden Finish (Rs/Kg)', 365.0)
        elif any(c in color for c in ['Black', 'White', 'Brown', 'Grey']):
            alu_kg_rate = cost_data.get('Domal Powder Coated (Rs/Kg)', 310.0)
        elif any(c in color for c in ['Anodized', 'Bronze']):
            alu_kg_rate = cost_data.get('Domal Anodized (Rs/Kg)', 295.0)
        else:
            alu_kg_rate = cost_data.get('Domal Mill/Natural (Rs/Kg)', 280.0)
    elif 'Door' in w_type:
        alu_kg_rate = cost_data.get('Door Master Material (Rs/Kg)', 270.0)
    elif 'Partition' in w_type:
        alu_kg_rate = cost_data.get('Partition Material (Rs/Kg)', 265.0)
    elif 'Casement' in w_type:
        alu_kg_rate = cost_data.get('Casement Material (Rs/Kg)', 275.0)
    else:
        # Step 1: Sliding 18x40 Color Rates
        if 'Wooden' in color:
            alu_kg_rate = cost_data.get('Sliding Wooden Finish (Rs/Kg)', 345.0)
        elif any(c in color for c in ['Black', 'White', 'Brown', 'Grey']):
            alu_kg_rate = cost_data.get('Sliding Powder Coated (Rs/Kg)', 290.0)
        elif any(c in color for c in ['Anodized', 'Bronze']):
            alu_kg_rate = cost_data.get('Sliding Anodized (Rs/Kg)', 275.0)
        else:
            alu_kg_rate = cost_data.get('Sliding Mill/Natural (Rs/Kg)', 260.0)
        
    alu_cost = base_wt * alu_kg_rate
    
    # 3. Glass Thickness Multiplier (3.5mm is lowest up to 12mm & DGU)
    glass_multipliers = {
        '3.5 mm': 0.80,
        '4.0 mm': 0.90,
        '5.0 mm': 1.00,
        '6.0 mm': 1.30,
        '8.0 mm': 1.80,
        '10.0 mm': 2.40,
        '12.0 mm': 3.10,
        'DGU Soundproof': 4.50
    }
    g_mult = glass_multipliers.get(glass_thick.strip(), 1.0)
    base_clear_sqft = cost_data.get('Clear Glass (Rs/Sq.Ft)', 35.0)
    glass_cost = base_clear_sqft * g_mult
    
    # 4. Glass Type / Shade
    if 'Reflective' in glass_type:
        glass_cost += cost_data.get('Reflective Glass (Rs/Sq.Ft)', 55.0) - base_clear_sqft
    elif 'Tinted' in glass_type or 'Frosted' in glass_type:
        glass_cost += 10.0
        
    # 5. Toughened Processing Charge
    tough_extra = cost_data.get('Toughened Extra (Rs/Sq.Ft)', 25.0)
    if toughened:
        if any(g in glass_thick for g in ['8.0', '10.0', '12.0']):
            glass_cost += (tough_extra * 1.6)
        else:
            glass_cost += tough_extra
            
    # 6. Hardware Cost
    hw_domal = cost_data.get('Domal Hardware Cost (Rs/Sq.Ft)', 55.0)
    hw_sliding = cost_data.get('Sliding Hardware Cost (Rs/Sq.Ft)', 35.0)
    hw_cost = hw_domal if is_domal else hw_sliding
        
    # 7. Labour cost & Profit Margin
    if is_domal:
        labour_cost = cost_data.get('Domal Window Labour', 50.0)
        margin = cost_data.get('Domal Profit (%)', 20.0) / 100.0
    elif 'Casement' in w_type:
        labour_cost = cost_data.get('Casement Labour', 60.0)
        margin = cost_data.get('Casement Profit (%)', 25.0) / 100.0
    elif 'Door' in w_type:
        labour_cost = cost_data.get('Door Master Labour', 65.0)
        margin = cost_data.get('Door Profit (%)', 20.0) / 100.0
    elif 'Partition' in w_type:
        labour_cost = cost_data.get('Partition Labour', 40.0)
        margin = cost_data.get('Door Profit (%)', 18.0) / 100.0
    else:
        labour_cost = cost_data.get('Sliding Window Labour', 35.0)
        margin = cost_data.get('Sliding Profit (%)', 15.0) / 100.0
        
    sub_cost = alu_cost + glass_cost + hw_cost + labour_cost
    final_rate = round(sub_cost * (1.0 + margin), -1)
    return max(150.0, float(final_rate))

class QuotationScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.bill_items = []
        
    def on_enter(self):
        Clock.schedule_once(lambda dt: self.update_auto_rate(), 0.2)

    def update_auto_rate(self):
        try:
            w_type = self.ids.q_type.text if hasattr(self.ids, "q_type") else "Domal 27x65 (2-Track)"
            color = self.ids.q_color.text if hasattr(self.ids, "q_color") else "Jet Black"
            thick = self.ids.q_thick.text if hasattr(self.ids, "q_thick") else "1.5 mm"
            g_thick = self.ids.q_g_thick.text if hasattr(self.ids, "q_g_thick") else "5.0 mm"
            g_type = self.ids.q_g_type.text if hasattr(self.ids, "q_g_type") else "Clear Float"
            tough = ("Yes" in self.ids.q_tough.text) if hasattr(self.ids, "q_tough") else False
            rate = calculate_suggested_rate(w_type, thick, color, g_thick, g_type, tough)
            if hasattr(self.ids, "q_rate"):
                self.ids.q_rate.text = str(int(rate) if rate.is_integer() else rate)
        except Exception:
            pass

    def autofill_customer(self):
        phone_input = self.ids.q_phone.text.strip()
        if not phone_input:
            show_message("Empty", "Please enter Phone or PIN (last 4 digits) first.")
            return
        try:
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
                c = conn.cursor()
                c.execute("SELECT name, phone, address FROM customers WHERE phone LIKE ?", (f'%{phone_input}',))
                row = c.fetchone()
            if row:
                self.ids.q_name.text = row[0]
                self.ids.q_phone.text = row[1]  
                self.ids.q_addr.text = row[2]
            else:
                show_message("Not Found", "No customer found with this number.")
        except Exception: pass
        
    def add_item(self):
        try:
            h = safe_eval(self.ids.q_h.text)
            w = safe_eval(self.ids.q_w.text)
            qty = max(1, int(safe_eval(self.ids.q_qty.text)))
            w_type = self.ids.q_type.text
            color = self.ids.q_color.text if hasattr(self.ids, "q_color") else "Jet Black"
            thick = self.ids.q_thick.text if hasattr(self.ids, "q_thick") else "1.5 mm"
            g_thick = self.ids.q_g_thick.text if hasattr(self.ids, "q_g_thick") else "5.0 mm"
            g_type = self.ids.q_g_type.text if hasattr(self.ids, "q_g_type") else "Clear Float"
            toughened = ("Yes" in self.ids.q_tough.text) if hasattr(self.ids, "q_tough") else False
            loc = self.ids.q_loc.text.strip() if hasattr(self.ids, "q_loc") and self.ids.q_loc.text.strip() else ""
            rate = safe_eval(self.ids.q_rate.text) if hasattr(self.ids, "q_rate") and self.ids.q_rate.text.strip() else 0.0
            if rate <= 0:
                rate = calculate_suggested_rate(w_type, thick, color, g_thick, g_type, toughened)
            if h == 0 or w == 0:
                show_message("Error", "Please enter valid Height and Width.")
                return
            db_file = os.path.join(BASE_DIR, "smartworker.db")
            with sqlite3.connect(db_file) as conn:
                c = conn.cursor()
                c.execute("SELECT value FROM bill_settings WHERE key_name='Default Unit'")
                u_row = c.fetchone()
                unit = u_row[0] if u_row else "Feet"
            if unit == "Feet": sq_ft = h * w
            elif unit == "Millimeters": sq_ft = (h * w) / 92903.04
            else: sq_ft = (h * w) / 144
            total_sq_ft = sq_ft * qty
            total_price = total_sq_ft * rate
            unit_str = "ft" if unit == "Feet" else ("mm" if unit == "Millimeters" else "in")
            item = {
                "type": w_type,
                "location": loc,
                "color": color,
                "thickness": thick,
                "glass_thick": g_thick,
                "glass_type": g_type,
                "toughened": toughened,
                "h": h, "w": w, "unit": unit_str, "qty": qty,
                "rate": rate, "area": total_sq_ft,
                "price": total_price
            }
            self.bill_items.append(item)
            loc_lbl = f"[{loc}] " if loc else ""
            self.ids.bill_queue_text.text += f"[{len(self.bill_items)}] {loc_lbl}{w_type} | {h}x{w} {unit_str} | Qty:{qty} @ Rs.{rate:.0f} | Rs:{total_price:.2f}\n"
            self.ids.q_h.text = ""
            self.ids.q_w.text = ""
            self.ids.q_qty.text = "1"
            if hasattr(self.ids, "q_loc"):
                self.ids.q_loc.text = ""
        except Exception as e: show_message("Error", str(e))
    def _get_discount_and_gst(self):
        try:
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
                c = conn.cursor()
                c.execute("SELECT value FROM bill_settings WHERE key_name='GST'")
                g_row = c.fetchone()
                gst = safe_eval(g_row[0]) if g_row else 0.0
                
                c.execute("SELECT value FROM bill_settings WHERE key_name='Discount'")
                d_row = c.fetchone()
                disc = safe_eval(d_row[0]) if d_row else 0.0
            return disc, gst
        except Exception:
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
            color = item.get('color', 'Jet Black')
            thick = item.get('thickness', '1.5 mm')
            g_thick = item.get('glass_thick', '5.0 mm')
            g_type = item.get('glass_type', 'Clear Float')
            tough_txt = " [TOUGHENED: YES]" if item.get('toughened') else ""
            loc_txt = f"[{item['location']}] " if item.get('location') else ""
            desc = f"{loc_txt}{item['type']}\n    Specs: {color} ({thick}) | {g_thick} {g_type}{tough_txt}\n    Size: {item['h']}x{item['w']} {item['unit']} @ Rs.{item['rate']}"
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
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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
            show_message("Pro Upgrade", "PRO activation is required to generate PDF bills.")
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

        base_dir = get_export_dir()
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
                color = item.get('color', 'Jet Black')
                thick = item.get('thickness', '1.5 mm')
                g_thick = item.get('glass_thick', '5.0 mm')
                g_type = item.get('glass_type', 'Clear Float')
                tough_badge = " <b><font color=red>[TOUGHENED]</font></b>" if item.get('toughened') else ""
                loc_txt = f"[{item['location']}] " if item.get('location') else ""
                desc_text = (
                    f"<b>{loc_txt}{item['type']}</b><br/>"
                    f"<font size=7 color='#444444'>• Specs: {color} ({thick})<br/>"
                    f"• Glass: {g_thick} {g_type}{tough_badge}<br/>"
                    f"• Size: {item['h']} x {item['w']} {item['unit']} @ Rs.{item['rate']}</font>"
                )
                desc = Paragraph(format_pdf_text_with_emoji(desc_text), styleNormal)
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
        except Exception:
            show_message("Error", "WhatsApp could not be opened.")

# ==========================================
# 5. MAIN APP CLASS WITH ADMOB INTEGRATION
# ==========================================
class SmartWorkerApp(App):
    is_pro_active = BooleanProperty(False)

    def open_privacy_policy(self):
        try:
            webbrowser.open("https://doc-hosting.flycricket.io/smart-worker-pro-privacy-policy/f14b6197-2482-4e0f-8827-3a8f11ba788f/privacy")
        except Exception:
            pass

    def build(self):
        Window.clearcolor = (0.08, 0.12, 0.24, 1) 
        if not self.root:
            kv_file = os.path.join(BASE_DIR, 'smartworker.kv')
            if os.path.exists(kv_file):
                self.root = Builder.load_file(kv_file)
            else:
                self.root = Builder.load_file('smartworker.kv')
        self.sm = self.root
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
        
        # --- AdMob Initialization (Only if KivMob installed and not PRO) ---
        if HAS_KIVMOB:
            try:
                self.ads = KivMob(ADMOB_APP_ID)
                if not self.is_pro_active:
                    self.ads.new_banner(ADMOB_BANNER_ID, top_pos=False)
                    self.ads.request_banner()
                    self.ads.show_banner()
                    
                    self.ads.new_interstitial(ADMOB_INTERSTITIAL_ID)
                    self.ads.request_interstitial()
            except Exception as e:
                print("AdMob setup error:", e)

        # Splash screen transitions automatically via on_enter
    def on_resume(self):
        if HAS_KIVMOB and not self.is_pro_active and hasattr(self, 'ads'):
            try:
                self.ads.request_banner()
            except Exception:
                pass

    def show_full_screen_ad(self):
        if HAS_KIVMOB and not self.is_pro_active and hasattr(self, 'ads'):
            try:
                self.ads.show_interstitial()
                self.ads.request_interstitial()
            except Exception:
                pass

    def subscribe_via_whatsapp(self):
        device_id = get_device_id()
        msg = f"Hello, I want to activate Smart Worker PRO subscription. Device ID: {device_id}"
        encoded_msg = urllib.parse.quote(msg)
        whatsapp_url = f"https://wa.me/{ADMIN_WHATSAPP_NUMBER}?text={encoded_msg}"
        try:
            webbrowser.open(whatsapp_url)
        except Exception:
            try:
                webbrowser.open(f"whatsapp://send?phone={ADMIN_WHATSAPP_NUMBER}&text={encoded_msg}")
            except Exception:
                show_message("Error", "WhatsApp could not be opened.")

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
            db_file = os.path.join(BASE_DIR, 'smartworker.db')
            with sqlite3.connect(db_file) as conn:
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