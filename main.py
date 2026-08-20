from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.modalview import ModalView
from kivy.properties import ObjectProperty, StringProperty
from kivy.clock import Clock
from kivy.core.window import Window
from kivy.uix.popup import Popup
from kivy.uix.label import Label
from kivy.utils import platform  # ক্র্যাশ রোধ করার জন্য নতুন যুক্ত করা হয়েছে
import fractions
import datetime
import math
import urllib.parse
import webbrowser
import sqlite3  
import re  
import os
import shutil

# PDF Library try-import
try:
    from reportlab.lib.pagesizes import A4
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    from reportlab.lib.units import inch
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False

# ==========================================
# 1. SHARED LOGIC & HELPERS
# ==========================================

def get_safe_save_path():
    """নিরাপদ ফোল্ডার তৈরি করার ফাংশন যাতে স্টোরেজ পারমিশনের অভাবে অ্যাপ ক্র্যাশ না করে"""
    if platform == 'android':
        base_dir = "/storage/emulated/0/Download/SmartWorker"
    else:
        base_dir = "SmartWorker_Files"
        
    try:
        if not os.path.exists(base_dir):
            os.makedirs(base_dir)
        return base_dir
    except Exception as e:
        from kivy.app import App
        return App.get_running_app().user_data_dir

def setup_db():
    conn = sqlite3.connect('smartworker.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS invoices
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  client TEXT,
                  amount REAL,
                  bill_text TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS measurements
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  project_type TEXT,
                  details TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS user_profile
                 (id INTEGER PRIMARY KEY,
                  name TEXT,
                  shop_name TEXT,
                  email TEXT,
                  phone TEXT,
                  gst TEXT,
                  address TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS stock
                 (item_name TEXT PRIMARY KEY,
                  qty REAL)''')
    conn.commit()
    conn.close()

def get_user_profile():
    try:
        conn = sqlite3.connect('smartworker.db')
        c = conn.cursor()
        c.execute("SELECT name, shop_name, email, phone, gst, address FROM user_profile LIMIT 1")
        row = c.fetchone()
        conn.close()
        if row:
            return {'name': row[0], 'shop_name': row[1], 'email': row[2], 'phone': row[3], 'gst': row[4], 'address': row[5]}
    except: pass
    return None

def get_all_stock():
    try:
        conn = sqlite3.connect('smartworker.db')
        c = conn.cursor()
        c.execute("SELECT item_name, qty FROM stock")
        rows = c.fetchall()
        conn.close()
        return {r[0]: r[1] for r in rows}
    except: return {}

def show_message(title, message):
    popup = Popup(title=title, content=Label(text=message), size_hint=(0.8, 0.3))
    popup.open()

def to_fraction_inch(inch_val):
    rounded_val = math.floor(inch_val * 16 + 0.5) / 16
    whole_number = int(rounded_val)
    frac_part = rounded_val - whole_number
    if frac_part == 0: return f"{whole_number}\""
    frac = fractions.Fraction(frac_part).limit_denominator(16)
    if whole_number == 0: return f"{frac}\""
    return f"{whole_number} {frac}\""

def to_mm_str(inch_val):
    mm_val = int(math.floor((inch_val * 25.4) + 0.5))
    return f"{mm_val} mm"

def safe_eval(text):
    if not text.strip(): return 0.0
    try:
        text = re.sub(r'\b0+(?=\d)', '', text)
        return float(eval(text))
    except:
        return 0.0

# --- ADVANCED TABULAR PDF GENERATOR ---
def export_tabular_pdf(filename, title, text_content):
    base_dir = get_safe_save_path()
        
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    profile = get_user_profile()
    
    shop_name = profile['shop_name'].upper() if profile and profile.get('shop_name') else "SMART WORKER ALUMINIUM"
    address_line = f"{profile['address']}<br/>Contact: {profile['phone']}" if profile and profile.get('address') else "Amta (Chandni), Howrah, West Bengal<br/>Contact: 9239413517 / 9641405426"
    
    if profile and profile.get('email') and profile['email'].strip():
        address_line += f" | Email: {profile['email']}"
    if profile and profile.get('gst') and profile['gst'].strip():
        address_line += f"<br/>GST No: {profile['gst']}"
    
    if not HAS_REPORTLAB:
        filepath = os.path.join(base_dir, f"{filename}_{timestamp}.txt")
        try:
            with open(filepath, 'w') as f:
                f.write(f"=== {shop_name} ===\n{title}\n\n{text_content}\n\n-- App by Smart worker --")
            return True
        except Exception as e:
            show_message("Error", str(e))
            return False
            
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

        elements.append(Paragraph(shop_name, styleH))
        elements.append(Paragraph(f"{address_line}<br/><b>JOB CARD / MEASUREMENT SHEET</b>", styleSub))
        elements.append(Paragraph(f"<u>{title}</u>", styleTitle))

        data = [[
            Paragraph("<b>Section / Category</b>", styleCellBold), 
            Paragraph("<b>Item Details</b>", styleCellBold), 
            Paragraph("<b>Measurement & Qty</b>", styleCellBold)
        ]]
        
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
                data.append([Paragraph(f"<b>{cat}</b>", styleCellBold), '', ''])
                styles_list.append(('SPAN', (0, row_idx), (-1, row_idx)))
                styles_list.append(('BACKGROUND', (0, row_idx), (-1, row_idx), colors.HexColor('#e8e8e8')))
                row_idx += 1
            else:
                content = line.lstrip('>').strip()
                if ':' in content:
                    parts = content.split(':', 1)
                    data.append(['', Paragraph(parts[0].strip(), styleCell), Paragraph(parts[1].strip(), styleCellBold)])
                else:
                    data.append(['', Paragraph(content, styleCell), ''])
                row_idx += 1

        t = Table(data, colWidths=[2.0*inch, 2.3*inch, 3.4*inch], repeatRows=1)
        t.setStyle(TableStyle(styles_list))
        elements.append(t)
        
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("<font size=8 color=grey><i>App by Smart worker</i></font>", ParagraphStyle(name='Footer', parent=styles['Normal'], alignment=1)))
        
        doc.build(elements)
        return True
    except Exception as e:
        show_message("Error Saving PDF", str(e))
        return False

# --- Advanced Zero-Wastage Calculator with Stock Deduction ---
def optimize_cutting_plan(pieces):
    if not pieces: return None
    pieces.sort(reverse=True) 
    best_plan = None
    
    for std_len in [180, 192, 144]: 
        bins = []
        valid = True
        for p in pieces:
            if p > std_len:
                valid = False
                break
            placed = False
            for b in bins:
                if sum(b) + p <= std_len:
                    b.append(p)
                    placed = True
                    break
            if not placed:
                bins.append([p])
        
        if valid:
            total_waste = (len(bins) * std_len) - sum(pieces)
            if best_plan is None or len(bins) < len(best_plan['bins']):
                best_plan = {'len': std_len, 'bins': bins, 'waste': total_waste}
            elif len(bins) == len(best_plan['bins']) and total_waste < best_plan['waste']:
                best_plan = {'len': std_len, 'bins': bins, 'waste': total_waste}
                
    if not best_plan:
        best_plan = {'len': 0, 'bins': [[p] for p in pieces], 'waste': 0, 'oversize': True}
        
    return best_plan

def format_cuts(cuts):
    counts = {}
    for c in cuts:
        val = round(c, 2)
        counts[val] = counts.get(val, 0) + 1
    parts = []
    for val in sorted(counts.keys(), reverse=True):
        qty = counts[val]
        if qty > 1:
            parts.append(f"{val}\" x {qty}")
        else:
            parts.append(f"{val}\"")
    return " + ".join(parts)

def generate_material_list(buckets, acc_buckets=None):
    stock = get_all_stock()
    res_text = "--- ACCUMULATED MATERIAL PURCHASE ---\n\n"
    has_items = False
    
    # Process Aluminum Buckets
    for name, pieces in buckets.items():
        if pieces:
            has_items = True
            plan = optimize_cutting_plan(pieces)
            res_text += f"[{name}]\n"
            if plan.get('oversize'):
                res_text += "> SPECIAL ORDER (Oversized)\n"
                for p in pieces:
                    res_text += f"  > Piece: {round(p, 2)}\"\n"
            else:
                ft = int(plan['len'] / 12)
                sticks_needed = len(plan['bins'])
                
                # Precise mapping to inventory stock keys
                stock_key = None
                if "Domal Track" in name: stock_key = "Domal Track"
                elif "Domal Sash" in name: stock_key = "Domal Sash"
                elif "Domal Handle" in name: stock_key = "Domal Handle"
                elif "Domal Interlock" in name: stock_key = "Domal Interlock"
                elif "Track" in name: stock_key = "Sliding Track"
                elif "Sash" in name and ("Top" in name or "Bottom" in name): stock_key = "Sliding Sash"
                elif "Handle" in name: stock_key = "Sliding Handle"
                elif "Interlock" in name: stock_key = "Sliding Interlock"
                
                in_stock = int(stock.get(stock_key, 0.0)) if stock_key else 0
                
                if in_stock >= sticks_needed:
                    to_buy = 0
                    stock_msg = f" (In Stock: {in_stock} -> Need to Buy: {to_buy})"
                elif in_stock > 0:
                    to_buy = sticks_needed - in_stock
                    stock_msg = f" (In Stock: {in_stock} -> Need to Buy: {to_buy})"
                else:
                    to_buy = sticks_needed
                    stock_msg = f" -> Need to Buy: {to_buy}"

                res_text += f"> Total Req: {sticks_needed} pcs ({ft} ft){stock_msg}\n"
                
                for i, b in enumerate(plan['bins'], 1):
                    cuts_str = format_cuts(b)
                    waste = round(plan['len'] - sum(b), 2)
                    res_text += f"  > Stick #{i}: Cut [ {cuts_str} ] -> Waste: {waste}\"\n"
                    
    # Process Accessories
    if acc_buckets and any(v > 0 for v in acc_buckets.values()):
        res_text += "\n--- ACCESSORIES REQUIRED ---\n"
        has_items = True
        for acc_name, req_qty in acc_buckets.items():
            if req_qty > 0:
                req_qty = math.ceil(req_qty)
                in_stock = int(stock.get(acc_name, 0.0))
                to_buy = max(0, req_qty - in_stock)
                stock_msg = f" | In Stock: {in_stock} -> Buy: {to_buy}" if in_stock > 0 else f" -> Buy: {to_buy}"
                res_text += f"> {acc_name}: {req_qty}{stock_msg}\n"

    if not has_items:
        return ""
    return res_text

# ==========================================
# 2. UI DESIGN
# ==========================================
KV = '''
<NumInput@Button>:
    background_normal: ''
    background_color: 0.95, 0.95, 0.95, 1
    color: 0, 0, 0, 1
    halign: 'left'
    valign: 'middle'
    text_size: self.width - 20, self.height
    on_release: app.open_keypad(self)

<CalcBtn@Button>:
    font_size: '22sp'
    background_normal: ''
    background_color: 0.85, 0.85, 0.85, 1
    color: 0, 0, 0, 1
    bold: True
    canvas.before:
        Color:
            rgba: 0.5, 0.5, 0.5, 1
        Line:
            width: 1
            rectangle: (self.x, self.y, self.width, self.height)

<KeypadPopup>:
    size_hint: 0.95, 0.95
    background_color: 0, 0, 0, 0.8
    auto_dismiss: False
    BoxLayout:
        orientation: 'vertical'
        padding: '5dp'
        spacing: '5dp'
        canvas.before:
            Color:
                rgba: 0.9, 0.9, 0.92, 1
            Rectangle:
                pos: self.pos
                size: self.size
        BoxLayout:
            size_hint_y: 0.15
            spacing: '5dp'
            Label:
                text: root.display_text
                color: 0.2, 0.4, 0.4, 1
                font_size: '34sp'
                text_size: self.width - 20, self.height
                halign: 'right'
                valign: 'middle'
            Button:
                text: 'OK'
                size_hint_x: 0.2
                background_color: 0, 0.7, 0, 1
                color: 1, 1, 1, 1
                font_size: '20sp'
                bold: True
                on_release: root.enter()
        BoxLayout:
            orientation: 'horizontal'
            size_hint_y: 0.75
            spacing: '5dp'
            GridLayout:
                cols: 2
                size_hint_x: 0.4
                spacing: '3dp'
                CalcBtn:
                    text: 'C'
                    color: 1, 0, 0, 1
                    background_color: 1, 0.6, 0.6, 1
                    on_release: root.clear()
                CalcBtn:
                    text: '<'
                    background_color: 0.7, 0.7, 0.8, 1
                    on_release: root.backspace()
                CalcBtn:
                    text: '1'
                    on_release: root.add_whole('1')
                CalcBtn:
                    text: '2'
                    on_release: root.add_whole('2')
                CalcBtn:
                    text: '3'
                    on_release: root.add_whole('3')
                CalcBtn:
                    text: '4'
                    on_release: root.add_whole('4')
                CalcBtn:
                    text: '5'
                    on_release: root.add_whole('5')
                CalcBtn:
                    text: '6'
                    on_release: root.add_whole('6')
                CalcBtn:
                    text: '7'
                    on_release: root.add_whole('7')
                CalcBtn:
                    text: '8'
                    on_release: root.add_whole('8')
                CalcBtn:
                    text: '9'
                    on_release: root.add_whole('9')
                CalcBtn:
                    text: '0'
                    on_release: root.add_whole('0')
                CalcBtn:
                    text: '.'
                    on_release: root.add_whole('.')
                CalcBtn:
                    text: '+/-'
                    on_release: root.add_whole('-')
            BoxLayout:
                orientation: 'vertical'
                size_hint_x: 0.6
                spacing: '5dp'
                BoxLayout:
                    orientation: 'vertical'
                    spacing: '3dp'
                    GridLayout:
                        cols: 3
                        spacing: '3dp'
                        CalcBtn:
                            text: '1'
                            on_release: root.add_num('1')
                        CalcBtn:
                            text: '2'
                            on_release: root.add_num('2')
                        CalcBtn:
                            text: '3'
                            on_release: root.add_num('3')
                        CalcBtn:
                            text: '4'
                            on_release: root.add_num('4')
                        CalcBtn:
                            text: '5'
                            on_release: root.add_num('5')
                        CalcBtn:
                            text: '6'
                            on_release: root.add_num('6')
                        CalcBtn:
                            text: '7'
                            on_release: root.add_num('7')
                        CalcBtn:
                            text: '8'
                            on_release: root.add_num('8')
                        CalcBtn:
                            text: '9'
                            on_release: root.add_num('9')
                    BoxLayout:
                        orientation: 'horizontal'
                        size_hint_y: 0.33 
                        spacing: '3dp'
                        CalcBtn:
                            text: '0'
                            size_hint_x: 0.66
                            on_release: root.add_num('0')
                        CalcBtn:
                            text: '<'
                            background_color: 0.7, 0.7, 0.8, 1
                            size_hint_x: 0.34
                            on_release: root.backspace()
                Widget:
                    size_hint_y: None
                    height: '4dp'
                BoxLayout:
                    orientation: 'vertical'
                    spacing: '3dp'
                    GridLayout:
                        cols: 3
                        spacing: '3dp'
                        CalcBtn:
                            text: '1'
                            on_release: root.add_denom('1')
                        CalcBtn:
                            text: '2'
                            on_release: root.add_denom('2')
                        CalcBtn:
                            text: '3'
                            on_release: root.add_denom('3')
                        CalcBtn:
                            text: '4'
                            on_release: root.add_denom('4')
                        CalcBtn:
                            text: '5'
                            on_release: root.add_denom('5')
                        CalcBtn:
                            text: '6'
                            on_release: root.add_denom('6')
                        CalcBtn:
                            text: '7'
                            on_release: root.add_denom('7')
                        CalcBtn:
                            text: '8'
                            on_release: root.add_denom('8')
                        CalcBtn:
                            text: '9'
                            on_release: root.add_denom('9')
                    BoxLayout:
                        orientation: 'horizontal'
                        size_hint_y: 0.33
                        spacing: '3dp'
                        CalcBtn:
                            text: '0'
                            size_hint_x: 0.66
                            on_release: root.add_denom('0')
                        CalcBtn:
                            text: '<'
                            background_color: 0.7, 0.7, 0.8, 1
                            size_hint_x: 0.34
                            on_release: root.backspace()
        GridLayout:
            cols: 5
            size_hint_y: 0.15
            spacing: '3dp'
            CalcBtn:
                text: '+'
                background_color: 0.7, 0.7, 0.8, 1
                on_release: root.add_whole('+')
            CalcBtn:
                text: '-'
                background_color: 0.7, 0.7, 0.8, 1
                on_release: root.add_whole('-')
            CalcBtn:
                text: '*'
                background_color: 0.7, 0.7, 0.8, 1
                on_release: root.add_whole('*')
            CalcBtn:
                text: '/'
                background_color: 0.7, 0.7, 0.8, 1
                on_release: root.add_whole('/')
            CalcBtn:
                text: '='
                background_color: 1, 0.6, 0.2, 1
                on_release: root.calculate_result()

ScreenManager:
    SetupScreen:
    HomeScreen:
    SettingsScreen:
    ProfileScreen:
    InventoryScreen:
    DomalScreen:
    SlidingScreen:
    CustomCasementScreen:
    DoorScreen:
    PartitionScreen:      
    QuotationScreen:
    CeilingScreen:
    HistoryScreen:

<SetupScreen>:
    name: 'setup'
    canvas.before:
        Color:
            rgba: 0.9, 0.9, 0.95, 1
        Rectangle:
            pos: self.pos
            size: self.size
    BoxLayout:
        orientation: 'vertical'
        padding: '20dp'
        spacing: '10dp'
        
        Label:
            text: "WELCOME TO SMART WORKER APP"
            color: 0, 0.2, 0.4, 1
            font_size: '22sp'
            bold: True
            size_hint_y: None
            height: '40dp'
            
        Label:
            text: "Please set up your profile to generate bills in your Shop's name."
            color: 0.3, 0.3, 0.3, 1
            font_size: '14sp'
            size_hint_y: None
            height: '30dp'
            
        ScrollView:
            GridLayout:
                cols: 1
                spacing: '10dp'
                size_hint_y: None
                height: self.minimum_height
                
                Label:
                    text: "Your Name (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: setup_name
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Shop / Company Name (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: setup_shop
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Email ID (Optional):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: setup_email
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Phone Number (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: setup_phone
                    multiline: False
                    input_type: 'number'
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "GST No (Optional):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: setup_gst
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Shop Address (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: setup_address
                    multiline: True
                    size_hint_y: None
                    height: '80dp'
                    
        Button:
            text: "SAVE & CONTINUE"
            size_hint_y: None
            height: '55dp'
            background_color: 0.1, 0.6, 0.2, 1
            bold: True
            font_size: '18sp'
            on_release: root.save_profile()

<SettingsScreen>:
    name: 'settings'
    canvas.before:
        Color:
            rgba: 0.9, 0.9, 0.95, 1
        Rectangle:
            pos: self.pos
            size: self.size
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.4, 0.4, 0.4, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "SETTINGS MENU"
                bold: True
                size_hint_x: 0.75
                text_size: self.size
                halign: 'center'
                valign: 'middle'
        BoxLayout:
            orientation: 'vertical'
            padding: '30dp'
            spacing: '20dp'
            
            Button:
                text: "Edit Profile"
                font_size: '20sp'
                bold: True
                size_hint_y: None
                height: '70dp'
                background_color: 0.2, 0.5, 0.8, 1
                on_release: root.manager.current = 'profile'

            Button:
                text: "Stock & Inventory Manager"
                font_size: '20sp'
                bold: True
                size_hint_y: None
                height: '70dp'
                background_color: 0.1, 0.7, 0.3, 1
                on_release: root.manager.current = 'inventory'
                
            Button:
                text: "Data History"
                font_size: '20sp'
                bold: True
                size_hint_y: None
                height: '70dp'
                background_color: 0.3, 0.3, 0.4, 1
                on_release: root.manager.current = 'history'
                
            Widget:
                # Spacer

<ProfileScreen>:
    name: 'profile'
    canvas.before:
        Color:
            rgba: 0.9, 0.9, 0.95, 1
        Rectangle:
            pos: self.pos
            size: self.size
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.4, 0.4, 0.4, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'settings'
            Label:
                text: "EDIT PROFILE"
                bold: True
                size_hint_x: 0.75
        ScrollView:
            GridLayout:
                cols: 1
                padding: '20dp'
                spacing: '10dp'
                size_hint_y: None
                height: self.minimum_height
                
                Label:
                    text: "Your Name (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: set_name
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Shop / Company Name (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: set_shop
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Email ID (Optional):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: set_email
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Phone Number (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: set_phone
                    multiline: False
                    input_type: 'number'
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "GST No (Optional):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: set_gst
                    multiline: False
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Shop Address (Required):"
                    color: 0, 0, 0, 1
                    size_hint_y: None
                    height: '30dp'
                    text_size: self.size
                    halign: 'left'
                TextInput:
                    id: set_address
                    multiline: True
                    size_hint_y: None
                    height: '80dp'
                    
                Button:
                    text: "UPDATE PROFILE"
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.1, 0.6, 0.2, 1
                    bold: True
                    font_size: '18sp'
                    on_release: root.update_profile()

<InventoryScreen>:
    name: 'inventory'
    canvas.before:
        Color:
            rgba: 0.9, 0.9, 0.95, 1
        Rectangle:
            pos: self.pos
            size: self.size
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.1, 0.7, 0.3, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'settings'
            Label:
                text: "STOCK MANAGER"
                bold: True
                size_hint_x: 0.75
        ScrollView:
            GridLayout:
                cols: 2
                padding: '20dp'
                spacing: '10dp'
                size_hint_y: None
                height: self.minimum_height
                
                Label:
                    text: "--- ACCESSORIES ---"
                    color: 0.1, 0.5, 0.8, 1
                    bold: True
                    size_hint_y: None
                    height: '30dp'
                Label:
                    text: ""
                    size_hint_y: None
                    height: '30dp'
                    
                Label:
                    text: "Sliding Locks (Pcs):"
                    color: 0,0,0,1
                NumInput:
                    id: inv_locks
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Rollers (Pcs):"
                    color: 0,0,0,1
                NumInput:
                    id: inv_rollers
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Rubber (Feet):"
                    color: 0,0,0,1
                NumInput:
                    id: inv_rubber
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Wool Pile (Feet):"
                    color: 0,0,0,1
                NumInput:
                    id: inv_wool
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Screws (Pcs):"
                    color: 0,0,0,1
                NumInput:
                    id: inv_screws
                    size_hint_y: None
                    height: '40dp'

                Label:
                    text: "--- ALUMINIUM (Sticks) ---"
                    color: 0.8, 0.4, 0.1, 1
                    bold: True
                    size_hint_y: None
                    height: '40dp'
                Label:
                    text: ""
                    size_hint_y: None
                    height: '40dp'

                Label:
                    text: "Domal Track:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_domal_track
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Domal Sash:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_domal_sash
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Domal Handle:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_domal_handle
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Domal Interlock Patti:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_domal_interlock
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Sliding Track:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_sl_track
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Sliding Sash:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_sl_sash
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Sliding Handle:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_sl_handle
                    size_hint_y: None
                    height: '40dp'
                    
                Label:
                    text: "Sliding Interlock:"
                    color: 0,0,0,1
                NumInput:
                    id: inv_sl_interlock
                    size_hint_y: None
                    height: '40dp'
                    
        BoxLayout:
            size_hint_y: None
            height: '55dp'
            Button:
                text: "SAVE STOCK"
                background_color: 0.1, 0.7, 0.3, 1
                bold: True
                font_size: '18sp'
                on_release: root.save_inventory()

<HomeScreen>:
    name: 'home'
    canvas.before:
        Color:
            rgba: 0.9, 0.9, 0.95, 1
        Rectangle:
            pos: self.pos
            size: self.size
    BoxLayout:
        orientation: 'vertical'
        
        # TOP BAR WITH SETTINGS BUTTON
        BoxLayout:
            size_hint_y: None
            height: '55dp'
            padding: '5dp'
            canvas.before:
                Color:
                    rgba: 0, 0.2, 0.4, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Label:
                text: "SMART WORKER PRO"
                font_size: '22sp'
                bold: True
                size_hint_x: 0.75
                text_size: self.size
                halign: 'center'
                valign: 'middle'
            Button:
                text: "Settings"
                font_size: '14sp'
                bold: True
                size_hint_x: 0.25
                background_color: 0.2, 0.5, 0.8, 1  
                color: 1, 1, 1, 1
                on_release: root.manager.current = 'settings'

        ScrollView:
            BoxLayout:
                orientation: 'vertical'
                padding: '20dp'
                spacing: '15dp'
                size_hint_y: None
                height: self.minimum_height
                
                Button:
                    text: "Domal Window Systems" 
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.1, 0.5, 0.8, 1
                    on_release: root.manager.current = 'domal'
                    
                Button:
                    text: "Sliding Window Systems"
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.8, 0.4, 0.1, 1
                    on_release: root.manager.current = 'slidingscreen'

                Button:
                    text: "Custom Casement Designer"
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.8, 0.2, 0.4, 1
                    on_release: root.manager.current = 'custom_casement'

                Button:
                    text: "Door Option"
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.7, 0.3, 0.1, 1
                    on_release: root.manager.current = 'door'

                Button:
                    text: "Partition & Door Master"
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.9, 0.3, 0.3, 1
                    on_release: root.manager.current = 'partition'
                    
                Button:
                    text: "Smart Quotation Maker"
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.6, 0.2, 0.6, 1
                    on_release: root.manager.current = 'quotation'

                Button:
                    text: "False Ceiling Estimator"
                    font_size: '18sp'
                    bold: True
                    size_hint_y: None
                    height: '55dp'
                    background_color: 0.1, 0.7, 0.7, 1
                    on_release: root.manager.current = 'ceiling'

<HistoryScreen>:
    name: 'history'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.3, 0.3, 0.4, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'settings'
            Label:
                text: "DATA HISTORY"
                bold: True
                size_hint_x: 0.75
        
        BoxLayout:
            orientation: 'vertical'
            size_hint_y: None
            height: '90dp'
            
            Spinner:
                id: hist_spinner
                size_hint_y: 0.5
                text: "Saved Measurements"
                values: ["Saved Measurements", "Saved Bills"]
                on_text: root.load_history()
                
            BoxLayout:
                orientation: 'horizontal'
                size_hint_y: 0.5
                Button:
                    text: "REFRESH"
                    background_color: 0.1, 0.6, 0.9, 1
                    bold: True
                    on_release: root.load_history()
                Button:
                    text: "BACKUP"
                    background_color: 0.2, 0.8, 0.2, 1
                    bold: True
                    on_release: root.backup_db()
                Button:
                    text: "DELETE ALL"
                    background_color: 0.9, 0.2, 0.2, 1
                    bold: True
                    on_release: root.clear_history()
                    
        ScrollView:
            TextInput:
                id: history_out
                readonly: True
                use_bubble: False
                use_handles: False
                size_hint_y: None
                height: max(self.minimum_height, dp(600))
                font_size: '12sp'   

<DoorScreen>:
    name: 'door'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.7, 0.3, 0.1, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "DOOR OPTION"
                bold: True
                size_hint_x: 0.75
        GridLayout:
            cols: 2
            size_hint_y: None
            height: '160dp'
            padding: '5dp'
            spacing: '5dp'
            Label:
                text: "Door Type:"
            Spinner:
                id: d_master_type
                text: "Standard Door"
                values: ["Standard Door", "Floor Spring Door", "Top Hung Door", "Domal System Door"]
            Label:
                text: "Input Unit:"
            Spinner:
                id: d_master_unit
                text: "Inch"
                values: ["Inch", "Millimeter"]
            Label:
                text: "Total Height (H):"
            NumInput:
                id: d_master_h
            Label:
                text: "Total Width (W):"
            NumInput:
                id: d_master_w
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "CLEAR"
                size_hint_x: 0.2
                background_color: 0.8, 0.2, 0.2, 1
                bold: True
                on_release: root.clear_all()
            Button:
                text: "+ ADD DOOR"
                size_hint_x: 0.8
                background_color: 0.7, 0.3, 0.1, 1
                bold: True
                on_release: root.calculate_door()
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "SAVE"
                background_color: 0.2, 0.7, 0.3, 1
                bold: True
                on_release: root.save_data(self)
            Button:
                text: "CUTTING PDF"
                background_color: 0.6, 0.3, 0.6, 1
                bold: True
                on_release: root.export_full(self)
            Button:
                text: "GLASS PDF"
                background_color: 0.1, 0.6, 0.8, 1
                bold: True
                on_release: root.export_glass(self)
        ScrollView:
            size_hint_y: 1
            BoxLayout:
                orientation: 'vertical'
                size_hint_y: None
                height: self.minimum_height
                spacing: '10dp'
                Label:
                    text: "CUTTING SIZES:"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.7, 0.3, 0.1, 1
                    bold: True
                TextInput:
                    id: d_master_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))
                Label:
                    text: "MATERIAL PURCHASE (AUTO-UPDATED):"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.2, 0.7, 0.3, 1
                    bold: True
                TextInput:
                    id: d_master_mat_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))

<CustomCasementScreen>:
    name: 'custom_casement'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.8, 0.2, 0.4, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "CUSTOM CASEMENT"
                bold: True
                size_hint_x: 0.75
        GridLayout:
            cols: 2
            size_hint_y: None
            height: '240dp'
            padding: '5dp'
            spacing: '5dp'
            Label:
                text: "Input Unit:"
            Spinner:
                id: cc_unit
                text: "Millimeter"
                values: ["Inch", "Millimeter"]
            Label:
                text: "Series Type:"
            Spinner:
                id: cc_series
                text: "40 Series"
                values: ["34 Series", "40 Series"]
            Label:
                text: "Total Height (H):"
            NumInput:
                id: cc_h
            Label:
                text: "Total Width (W):"
            NumInput:
                id: cc_w
            Label:
                text: "Bottom Part Height:"
            NumInput:
                id: cc_bot_h
                text: "0"
            Label:
                text: "Clear Gap for 1 Palla:"
            NumInput:
                id: cc_mid_w
                text: "0"
            Label:
                text: "Top Sections (Cols):"
            NumInput:
                id: cc_top_cols
                text: "1"
            Label:
                text: "Bottom Sections (Cols):"
            NumInput:
                id: cc_bot_cols
                text: "0"
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "CLEAR"
                size_hint_x: 0.2
                background_color: 0.8, 0.2, 0.2, 1
                bold: True
                on_release: root.clear_all()
            Button:
                text: "+ ADD WINDOW"
                size_hint_x: 0.8
                background_color: 0.8, 0.2, 0.4, 1
                bold: True
                on_release: root.calculate_custom()
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "SAVE"
                background_color: 0.2, 0.7, 0.3, 1
                bold: True
                on_release: root.save_data(self)
            Button:
                text: "CUTTING PDF"
                background_color: 0.6, 0.3, 0.6, 1
                bold: True
                on_release: root.export_full(self)
            Button:
                text: "GLASS PDF"
                background_color: 0.1, 0.6, 0.8, 1
                bold: True
                on_release: root.export_glass(self)
        ScrollView:
            size_hint_y: 1
            BoxLayout:
                orientation: 'vertical'
                size_hint_y: None
                height: self.minimum_height
                spacing: '10dp'
                Label:
                    text: "CUTTING SIZES:"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.8, 0.2, 0.4, 1
                    bold: True
                TextInput:
                    id: cc_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))
                Label:
                    text: "MATERIAL PURCHASE (AUTO-UPDATED):"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.2, 0.7, 0.3, 1
                    bold: True
                TextInput:
                    id: cc_mat_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))

<PartitionScreen>:
    name: 'partition'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.9, 0.3, 0.3, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "PARTITION & DOOR"
                bold: True
                size_hint_x: 0.75
        GridLayout:
            cols: 2
            size_hint_y: None
            height: '240dp'
            padding: '5dp'
            spacing: '5dp'
            Label:
                text: "Input Unit:"
            Spinner:
                id: p_unit
                text: "Inch"
                values: ["Inch", "Millimeter"]
            Label:
                text: "Partition Type:"
            Spinner:
                id: part_type
                text: "Fixed Partition"
                values: ["Fixed Partition", "Door + Partition"]
            Label:
                text: "Total Wall Height (H):"
            NumInput:
                id: p_h
            Label:
                text: "Total Wall Width (W):"
            NumInput:
                id: p_w
            Label:
                text: "Door Height (Optional):"
            NumInput:
                id: d_h
            Label:
                text: "Door Width (Optional):"
            NumInput:
                id: d_w
            Label:
                text: "Horizontal Sections:"
            NumInput:
                id: p_cols
                text: "3"
            Label:
                text: "Vertical Sections:"
            NumInput:
                id: p_rows
                text: "3"
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "CLEAR"
                size_hint_x: 0.2
                background_color: 0.8, 0.2, 0.2, 1
                bold: True
                on_release: root.clear_all()
            Button:
                text: "+ ADD PARTITION"
                size_hint_x: 0.8
                background_color: 0.9, 0.3, 0.3, 1
                bold: True
                on_release: root.calculate_partition()
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "SAVE"
                background_color: 0.2, 0.7, 0.3, 1
                bold: True
                on_release: root.save_data(self)
            Button:
                text: "CUTTING PDF"
                background_color: 0.6, 0.3, 0.6, 1
                bold: True
                on_release: root.export_full(self)
            Button:
                text: "GLASS PDF"
                background_color: 0.1, 0.6, 0.8, 1
                bold: True
                on_release: root.export_glass(self)
        ScrollView:
            size_hint_y: 1
            BoxLayout:
                orientation: 'vertical'
                size_hint_y: None
                height: self.minimum_height
                spacing: '10dp'
                Label:
                    text: "CUTTING SIZES:"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.9, 0.3, 0.3, 1
                    bold: True
                TextInput:
                    id: part_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))
                Label:
                    text: "MATERIAL PURCHASE (AUTO-UPDATED):"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.2, 0.7, 0.3, 1
                    bold: True
                TextInput:
                    id: part_mat_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))

<CeilingScreen>:
    name: 'ceiling'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.1, 0.7, 0.7, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "CEILING ESTIMATOR"
                bold: True
                size_hint_x: 0.75
        GridLayout:
            cols: 2
            size_hint_y: None
            height: '150dp'
            padding: '10dp'
            spacing: '5dp'
            Label:
                text: "Material Type:"
            Spinner:
                id: c_type
                text: "Gypsum Board"
                values: ["Gypsum Board", "PVC Panel"]
            Label:
                text: "Room Length (Ft):"
            NumInput:
                id: c_l
            Label:
                text: "Room Width (Ft):"
            NumInput:
                id: c_w
        BoxLayout:
            size_hint_y: None
            height: '45dp'
            spacing: '5dp'
            Button:
                text: "CLEAR"
                size_hint_x: 0.3
                background_color: 0.8, 0.2, 0.2, 1
                bold: True
                on_release: root.clear_all()
            Button:
                text: "CALCULATE"
                size_hint_x: 0.7
                background_color: 0.1, 0.7, 0.7, 1
                bold: True
                on_release: root.calculate_ceiling()
        TextInput:
            id: c_out
            readonly: True
            use_bubble: False
            use_handles: False
            font_size: '14sp'
            padding: '10dp'

<DomalScreen>:
    name: 'domal'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.1, 0.5, 0.8, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "DOMAL CALCULATOR"
                bold: True
                size_hint_x: 0.75
        GridLayout:
            cols: 2
            size_hint_y: None
            height: '160dp'
            padding: '5dp'
            spacing: '5dp'
            Label:
                text: "Series Type:"
            Spinner:
                id: combo_series
                text: "35x75 Domal (1.75 inch Track)"
                values: ["27x65 Domal", "35x75 Domal (2 inch Track)", "35x75 Domal (1.75 inch Track)"]
            Label:
                text: "Track & Sash Type:"
            Spinner:
                id: combo_type_cut
                text: "2-Track (2-Sash)"
                values: ["2-Track (2-Sash)", "3-Track (3-Sash)", "4-Track (4-Sash)", "2-Track (Center Open)"]
            Label:
                text: "Input Unit:"
            Spinner:
                id: combo_unit_cut
                text: "Inch"
                values: ["Inch", "Millimeter"]
            Label:
                text: "Height:"
            NumInput:
                id: entry_h_cut
            Label:
                text: "Width:"
            NumInput:
                id: entry_w_cut
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "CLEAR"
                size_hint_x: 0.2
                background_color: 0.8, 0.2, 0.2, 1
                bold: True
                on_release: root.clear_all()
            Button:
                text: "+ ADD WINDOW"
                size_hint_x: 0.8
                background_color: 0.1, 0.5, 0.8, 1
                bold: True
                on_release: root.calculate_domal()
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "SAVE"
                background_color: 0.2, 0.7, 0.3, 1
                bold: True
                on_release: root.save_data(self)
            Button:
                text: "CUTTING PDF"
                background_color: 0.6, 0.3, 0.6, 1
                bold: True
                on_release: root.export_full(self)
            Button:
                text: "GLASS PDF"
                background_color: 0.1, 0.6, 0.8, 1
                bold: True
                on_release: root.export_glass(self)
        ScrollView:
            size_hint_y: 1
            BoxLayout:
                orientation: 'vertical'
                size_hint_y: None
                height: self.minimum_height
                spacing: '10dp'
                Label:
                    text: "CUTTING SIZES:"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.1, 0.5, 0.8, 1
                    bold: True
                TextInput:
                    id: domal_alu_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))
                Label:
                    text: "MATERIAL PURCHASE (AUTO-UPDATED):"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.2, 0.7, 0.3, 1
                    bold: True
                TextInput:
                    id: domal_mat_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))

<SlidingScreen>:
    name: 'slidingscreen'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.8, 0.4, 0.1, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "SLIDING WINDOW"
                bold: True
                size_hint_x: 0.75
        GridLayout:
            cols: 2
            size_hint_y: None
            height: '160dp'
            padding: '5dp'
            spacing: '5dp'
            Label:
                text: "System Size:"
            Spinner:
                id: sl_sys
                text: "Door Sliding Master"
                values: ["18x40 System", "18x50 System", "18x60 System", "25x50 System", "25x65 System", "Door Sliding Master"]
            Label:
                text: "Track Type:"
            Spinner:
                id: sl_type
                text: "2-Track"
                values: ["2-Track", "3-Track", "4-Track", "Center Open"]
            Label:
                text: "Input Unit:"
            Spinner:
                id: sl_unit
                text: "Millimeter"
                values: ["Inch", "Millimeter"]
            Label:
                text: "Height:"
            NumInput:
                id: sl_h
            Label:
                text: "Width:"
            NumInput:
                id: sl_w
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "CLEAR"
                size_hint_x: 0.2
                background_color: 0.8, 0.2, 0.2, 1
                bold: True
                on_release: root.clear_all()
            Button:
                text: "+ ADD WINDOW"
                size_hint_x: 0.8
                background_color: 0.8, 0.4, 0.1, 1
                bold: True
                on_release: root.calculate_sliding()
        BoxLayout:
            size_hint_y: None
            height: '40dp'
            spacing: '5dp'
            Button:
                text: "SAVE"
                background_color: 0.2, 0.7, 0.3, 1
                bold: True
                on_release: root.save_data(self)
            Button:
                text: "CUTTING PDF"
                background_color: 0.6, 0.3, 0.6, 1
                bold: True
                on_release: root.export_full(self)
            Button:
                text: "GLASS PDF"
                background_color: 0.1, 0.6, 0.8, 1
                bold: True
                on_release: root.export_glass(self)
        ScrollView:
            size_hint_y: 1
            BoxLayout:
                orientation: 'vertical'
                size_hint_y: None
                height: self.minimum_height
                spacing: '10dp'
                Label:
                    text: "CUTTING SIZES:"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.8, 0.4, 0.1, 1
                    bold: True
                TextInput:
                    id: sl_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))
                Label:
                    text: "MATERIAL PURCHASE (AUTO-UPDATED):"
                    size_hint_y: None
                    height: '25dp'
                    color: 0.2, 0.7, 0.3, 1
                    bold: True
                TextInput:
                    id: sl_mat_out
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: max(self.minimum_height, dp(250))

<QuotationScreen>:
    name: 'quotation'
    BoxLayout:
        orientation: 'vertical'
        BoxLayout:
            size_hint_y: None
            height: '50dp'
            canvas.before:
                Color:
                    rgba: 0.6, 0.2, 0.6, 1
                Rectangle:
                    pos: self.pos
                    size: self.size
            Button:
                text: "< Back"
                size_hint_x: 0.25
                background_color: 1, 0, 0, 1
                on_release: root.manager.current = 'home'
            Label:
                text: "PRO BILL & QUOTATION"
                bold: True
                size_hint_x: 0.75
        ScrollView:
            size_hint_y: 1
            BoxLayout:
                orientation: 'vertical'
                size_hint_y: None
                height: self.minimum_height
                padding: '10dp'
                spacing: '10dp'
                
                Label:
                    text: "--- CUSTOMER DETAILS ---"
                    color: 0.6, 0.2, 0.6, 1
                    bold: True
                    size_hint_y: None
                    height: '30dp'
                GridLayout:
                    cols: 2
                    size_hint_y: None
                    height: '110dp'
                    spacing: '5dp'
                    Label:
                        text: "Name:"
                    TextInput:
                        id: q_name
                        multiline: False
                    Label:
                        text: "Phone:"
                    TextInput:
                        id: q_phone
                        multiline: False
                        input_type: 'number'
                    Label:
                        text: "Address:"
                    TextInput:
                        id: q_addr
                        multiline: False
                
                Label:
                    text: "--- ADD BILL ITEM ---"
                    color: 0.6, 0.2, 0.6, 1
                    bold: True
                    size_hint_y: None
                    height: '30dp'
                GridLayout:
                    cols: 2
                    size_hint_y: None
                    height: '230dp'  
                    spacing: '5dp'
                    Label:
                        text: "Work Type:"
                    Spinner:
                        id: q_type
                        text: "Domal Window"
                        values: ["Domal Window", "Sliding Window", "Door", "Partition", "False Ceiling"]
                    Label:
                        text: "Height (Unit):"
                    NumInput:
                        id: q_h
                    Label:
                        text: "Width (Unit):"
                    NumInput:
                        id: q_w
                    Label:
                        text: "Quantity (Pcs):"
                    NumInput:
                        id: q_qty
                        text: "1"
                    Label:
                        text: "Rate (per Sq.Ft):"
                    NumInput:
                        id: q_rate
                    Label:
                        text: "Discount (Rs):"
                    NumInput:
                        id: q_discount
                        text: "0"
                    Label:
                        text: "GST (%):"
                    NumInput:
                        id: q_gst
                        text: "0"
                        
                BoxLayout:
                    size_hint_y: None
                    height: '45dp'
                    spacing: '5dp'
                    Button:
                        text: "CLEAR"
                        size_hint_x: 0.3
                        background_color: 0.8, 0.2, 0.2, 1
                        bold: True
                        on_release: root.clear_items()
                    Button:
                        text: "+ ADD ITEM"
                        size_hint_x: 0.7
                        background_color: 0.1, 0.6, 0.2, 1
                        bold: True
                        on_release: root.add_item()
                
                TextInput:
                    id: bill_queue_text
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: '100dp'
                    font_size: '12sp'
                
                BoxLayout:
                    size_hint_y: None
                    height: '45dp'
                    spacing: '5dp'
                    Button:
                        text: "GENERATE BILL"
                        background_color: 0.6, 0.2, 0.6, 1
                        bold: True
                        on_release: root.generate_bill()
                
                BoxLayout:
                    size_hint_y: None
                    height: '45dp'
                    spacing: '5dp'
                    Button:
                        text: "SAVE BILL"
                        background_color: 0.2, 0.5, 0.8, 1
                        bold: True
                        on_release: root.save_to_db(self)
                    Button:
                        text: "WHATSAPP"
                        background_color: 0.1, 0.7, 0.2, 1
                        bold: True
                        on_release: root.share_whatsapp()
                    Button:
                        text: "PDF BILL"
                        background_color: 0.8, 0.2, 0.2, 1
                        bold: True
                        on_release: root.export_bill_pdf(self)
                
                TextInput:
                    id: bill_output
                    readonly: True
                    use_bubble: False
                    use_handles: False
                    size_hint_y: None
                    height: '400dp'
                    font_size: '14sp'
'''

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
            
        email = self.ids.setup_email.text.strip()
        gst = self.ids.setup_gst.text.strip()
        
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO user_profile (name, shop_name, email, phone, gst, address) VALUES (?, ?, ?, ?, ?, ?)",
                      (name, shop, email, phone, gst, address))
            conn.commit()
            conn.close()
            
            self.manager.current = 'home'
        except Exception as e:
            show_message("Database Error", str(e))

class SettingsScreen(Screen):
    pass

class ProfileScreen(Screen):
    def on_enter(self):
        profile = get_user_profile()
        if profile:
            self.ids.set_name.text = profile.get('name', '')
            self.ids.set_shop.text = profile.get('shop_name', '')
            self.ids.set_email.text = profile.get('email', '')
            self.ids.set_phone.text = profile.get('phone', '')
            self.ids.set_gst.text = profile.get('gst', '')
            self.ids.set_address.text = profile.get('address', '')

    def update_profile(self):
        name = self.ids.set_name.text.strip()
        shop = self.ids.set_shop.text.strip()
        phone = self.ids.set_phone.text.strip()
        address = self.ids.set_address.text.strip()
        
        if not name or not shop or not phone or not address:
            show_message("Error", "Please fill Name, Shop Name, Phone and Address.")
            return
            
        email = self.ids.set_email.text.strip()
        gst = self.ids.set_gst.text.strip()
        
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("DELETE FROM user_profile") 
            c.execute("INSERT INTO user_profile (name, shop_name, email, phone, gst, address) VALUES (?, ?, ?, ?, ?, ?)",
                      (name, shop, email, phone, gst, address))
            conn.commit()
            conn.close()
            
            show_message("Success", "Profile updated successfully!")
            self.manager.current = 'home'
        except Exception as e:
            show_message("Database Error", str(e))

class InventoryScreen(Screen):
    def on_enter(self):
        stock = get_all_stock()
        self.ids.inv_locks.text = str(int(stock.get('Locks', 0)))
        self.ids.inv_rollers.text = str(int(stock.get('Rollers', 0)))
        self.ids.inv_rubber.text = str(int(stock.get('Rubber (Ft)', 0)))
        self.ids.inv_wool.text = str(int(stock.get('Wool Pile (Ft)', 0)))
        self.ids.inv_screws.text = str(int(stock.get('Screws', 0)))
        self.ids.inv_domal_track.text = str(int(stock.get('Domal Track', 0)))
        self.ids.inv_domal_sash.text = str(int(stock.get('Domal Sash', 0)))
        self.ids.inv_domal_handle.text = str(int(stock.get('Domal Handle', 0)))
        self.ids.inv_domal_interlock.text = str(int(stock.get('Domal Interlock', 0)))
        self.ids.inv_sl_track.text = str(int(stock.get('Sliding Track', 0)))
        self.ids.inv_sl_sash.text = str(int(stock.get('Sliding Sash', 0)))
        self.ids.inv_sl_handle.text = str(int(stock.get('Sliding Handle', 0)))
        self.ids.inv_sl_interlock.text = str(int(stock.get('Sliding Interlock', 0)))

    def save_inventory(self):
        try:
            stock_data = {
                'Locks': safe_eval(self.ids.inv_locks.text),
                'Rollers': safe_eval(self.ids.inv_rollers.text),
                'Rubber (Ft)': safe_eval(self.ids.inv_rubber.text),
                'Wool Pile (Ft)': safe_eval(self.ids.inv_wool.text),
                'Screws': safe_eval(self.ids.inv_screws.text),
                'Domal Track': safe_eval(self.ids.inv_domal_track.text),
                'Domal Sash': safe_eval(self.ids.inv_domal_sash.text),
                'Domal Handle': safe_eval(self.ids.inv_domal_handle.text),
                'Domal Interlock': safe_eval(self.ids.inv_domal_interlock.text),
                'Sliding Track': safe_eval(self.ids.inv_sl_track.text),
                'Sliding Sash': safe_eval(self.ids.inv_sl_sash.text),
                'Sliding Handle': safe_eval(self.ids.inv_sl_handle.text),
                'Sliding Interlock': safe_eval(self.ids.inv_sl_interlock.text)
            }
            
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("DELETE FROM stock")
            for item, qty in stock_data.items():
                if qty > 0:
                    c.execute("INSERT INTO stock (item_name, qty) VALUES (?, ?)", (item, qty))
            conn.commit()
            conn.close()
            show_message("Success", "Stock saved successfully!")
            self.manager.current = 'settings'
        except Exception as e:
            show_message("Database Error", str(e))

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
    pass

class HistoryScreen(Screen):
    def on_enter(self):
        self.load_history()
        
    def load_history(self):
        h_type = self.ids.hist_spinner.text
        try:
            conn = sqlite3.connect('smartworker.db')
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
            conn.close()
            self.ids.history_out.text = out_text
        except Exception as e:
            self.ids.history_out.text = f"Error loading database: {e}"

    def backup_db(self):
        try:
            base_dir = get_safe_save_path()
            shutil.copy2('smartworker.db', os.path.join(base_dir, 'smartworker_backup.db'))
            show_message("Backup Successful", f"Database saved to:\n{base_dir}")
        except Exception as e:
            show_message("Backup Failed", str(e))
            
    def clear_history(self):
        h_type = self.ids.hist_spinner.text
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            if h_type == "Saved Measurements":
                c.execute("DELETE FROM measurements")
            else:
                c.execute("DELETE FROM invoices")
            conn.commit()
            conn.close()
            self.load_history()
            show_message("Success", f"All {h_type.lower()} deleted successfully.")
        except Exception as e:
            show_message("Error", str(e))

class DoorScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.door_count = 0
        self.buckets = {"Door Outer Frame": [], "Door Verticals": [], "Door Horizontals": []}
        self.glass_dict = {}
        self.acc_buckets = {}

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

            if d_type == "Standard Door":
                door_v = h - 1.75
                door_tb = w - 6.75
                glass_h = door_v - 5.875 - 0.25
                glass_w = door_tb - 0.25
                palla_qty = 1
                has_outer = True
                
            elif d_type == "Top Hung Door":
                door_v = h 
                door_tb = w - 6.75 
                glass_h = door_v - 5.875 - 0.25
                glass_w = door_tb - 0.25
                palla_qty = 1
                has_outer = False
                
            elif d_type == "Domal System Door":
                door_v = h - (25.0 / 25.4) 
                door_tb = (w - (38.0 / 25.4)) - 3.5 
                glass_h = door_v - 4.625
                glass_w = door_tb - 0.25
                palla_qty = 1
                has_outer = True
                
            else: # Floor Spring Door
                door_v = h - 2.0
                door_tb = w - 6.75
                glass_h = door_v - 5.875 - 0.25
                glass_w = door_tb - 0.25
                palla_qty = 1
                has_outer = True

            self.door_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            unit_str = "mm" if is_mm else "Inch"
            
            out = f"[Door #{self.door_count} - {d_type} ({raw_h} x {raw_w} {unit_str})]\n"
            
            if has_outer:
                out += "--- OUTER FRAME ---\n"
                out += f"> Outer Vertical: {disp(outer_v)} (2 pc)\n"
                out += f"> Outer Top Horizontal: {disp(outer_h)} (1 pc)\n"
                self.buckets["Door Outer Frame"].extend([outer_v, outer_v, outer_h])
            else:
                out += "--- NO OUTER FRAME (Sash Only) ---\n"

            out += f"--- DOOR SASH ({palla_qty} Palla) ---\n"
            out += f"> Door Vertical: {disp(door_v)} ({palla_qty * 2} pc)\n"
            out += f"> Door Top/Bottom: {disp(door_tb)} ({palla_qty * 2} pc)\n"
            self.buckets["Door Verticals"].extend([door_v] * (palla_qty * 2))
            self.buckets["Door Horizontals"].extend([door_tb] * (palla_qty * 2))

            out += f"--- GLASS / BOARD ---\n> Glass Size: {disp(glass_h)} x {disp(glass_w)} ({palla_qty} pc)\n"
            
            glass_key = f"{disp(glass_h)} x {disp(glass_w)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + palla_qty

            out += "="*35 + "\n\n"
            
            self.ids.d_master_out.text = out + self.ids.d_master_out.text
            self.ids.d_master_mat_out.text = generate_material_list(self.buckets, self.acc_buckets)
        except:
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.door_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.acc_buckets.clear()
        self.ids.d_master_h.text = ""
        self.ids.d_master_w.text = ""
        self.ids.d_master_out.text = ""
        self.ids.d_master_mat_out.text = ""

    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig

    def export_full(self, btn):
        content = "=== CUTTING SIZES ===\n" + self.ids.d_master_out.text + "\n\n" + self.ids.d_master_mat_out.text
        if export_tabular_pdf("DoorMaster_Material", "Door Job Card", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def export_glass(self, btn):
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1):
            content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        if export_tabular_pdf("DoorMaster_Glass", "Door Glass List", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def save_data(self, btn):
        content = self.ids.d_master_out.text + "\n" + self.ids.d_master_mat_out.text
        if not content.strip(): return
        today = datetime.date.today().strftime("%d/%m/%Y %I:%M %p")
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO measurements (date, project_type, details) VALUES (?, ?, ?)",
                      (today, "Door Master", content))
            conn.commit()
            conn.close()
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e: print(e)

class CustomCasementScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {"Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": []}
        self.glass_dict = {}
        self.acc_buckets = {}

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
            bot_cols = int(safe_eval(self.ids.cc_bot_cols.text)) if self.ids.cc_bot_cols.text.strip() else 0
            
            is_mm = ("Millimeter" in self.ids.cc_unit.text)
            h_mm = raw_h if is_mm else raw_h * 25.4
            w_mm = raw_w if is_mm else raw_w * 25.4
            bot_gap_input_mm = bot_h_input if is_mm else bot_h_input * 25.4
            mid_w_mm = mid_w_input if is_mm else mid_w_input * 25.4
            
            series = self.ids.cc_series.text
            overlap = 11  
            glass_m = 65  
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
            top_gaps = []
            
            if mid_w_mm > 0 and top_cols >= 3:
                num_center_gaps = top_cols - 2
                side_w_total = w_mm - outer_2 - (num_center_gaps * mid_w_mm) - (top_v_mullion_qty * mullion)
                top_side_w = side_w_total / 2
                top_gaps.append(("Side Gaps (Qty: 2)", top_side_w))
                top_gaps.append((f"Center Gaps (Qty: {num_center_gaps})", mid_w_mm))
            else:
                top_gap_w = (w_mm - outer_2 - (top_v_mullion_qty * mullion)) / top_cols
                top_gaps.append((f"Equal Gaps (Qty: {top_cols})", top_gap_w))
                
            bot_v_mullion_qty = max(0, bot_cols - 1)
            bot_gap_w = 0
            if bot_cols > 0:
                bot_gap_w = (w_mm - outer_2 - (bot_v_mullion_qty * mullion)) / bot_cols
            
            self.window_count += 1
            def disp(val_mm): 
                return to_mm_str(val_mm / 25.4) if is_mm else to_fraction_inch(val_mm / 25.4)
                
            unit_str = "mm" if is_mm else "Inch"
            out_txt = f"[{series} Win #{self.window_count} | Size: {raw_h} x {raw_w} {unit_str}]\n"
            
            out_txt += "--- 1. OUTER FRAME & MULLIONS ---\n"
            out_txt += f"> Outer Vertical: {disp(h_mm)} (2 pc)\n"
            out_txt += f"> Outer Horizontal: {disp(w_mm)} (2 pc)\n"
            
            self.buckets["Casement Outer"].extend([h_mm/25.4, h_mm/25.4, w_mm/25.4, w_mm/25.4])
            
            if h_mullion_qty > 0:
                out_txt += f"> Horizontal Divider: {disp(w_mm - outer_2)} ({h_mullion_qty} pc)\n"
                self.buckets["Casement Mullion"].extend([(w_mm - outer_2)/25.4] * h_mullion_qty)
            if top_v_mullion_qty > 0:
                out_txt += f"> Top Vert. Mullions: {disp(top_gap_h)} ({top_v_mullion_qty} pc)\n"
                self.buckets["Casement Mullion"].extend([top_gap_h/25.4] * top_v_mullion_qty)
            if bot_v_mullion_qty > 0:
                out_txt += f"> Bot Vert. Mullions: {disp(bot_gap_h)} ({bot_v_mullion_qty} pc)\n\n"
                self.buckets["Casement Mullion"].extend([bot_gap_h/25.4] * bot_v_mullion_qty)
            
            out_txt += f"--- 2. TOP ROW DETAILS ({top_cols} SECTIONS) ---\n"
            for label, w_gap in top_gaps:
                qty_sash = 2 if "Side Gaps" in label else (int(re.search(r'\d+', label).group()) if re.search(r'\d+', label) else 1)
                out_txt += f"[{label} | Clear Gap: {disp(top_gap_h)} x {disp(w_gap)}]\n"
                s1_h, s1_w = top_gap_h + overlap, w_gap + overlap
                g_h, g_w = s1_h - glass_m, s1_w - glass_m
                out_txt += f"  > Sash: {disp(s1_h)} x {disp(s1_w)}\n"
                out_txt += f"  > Glass Size: {disp(g_h)} x {disp(g_w)}\n\n"
                
                glass_key = f"{disp(g_h)} x {disp(g_w)}"
                self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + qty_sash
                self.buckets["Casement Z Handle"].extend([s1_h/25.4]*2*qty_sash + [s1_w/25.4]*2*qty_sash)
            
            if bot_cols > 0 and rows == 2:
                out_txt += f"--- 3. BOTTOM ROW DETAILS ({bot_cols} SECTIONS) ---\n"
                s1_h, s1_w = bot_gap_h + overlap, bot_gap_w + overlap
                g_h, g_w = s1_h - glass_m, s1_w - glass_m
                out_txt += f"  > Sash: {disp(s1_h)} x {disp(s1_w)}\n"
                out_txt += f"  > Glass Size: {disp(g_h)} x {disp(g_w)}\n"
                
                glass_key = f"{disp(g_h)} x {disp(g_w)}"
                self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + bot_cols
                self.buckets["Casement Z Handle"].extend([s1_h/25.4]*2*bot_cols + [s1_w/25.4]*2*bot_cols)
            
            out_txt += "="*35 + "\n\n"
            
            self.ids.cc_out.text = out_txt + self.ids.cc_out.text
            self.ids.cc_mat_out.text = generate_material_list(self.buckets, self.acc_buckets)
            
        except Exception as e: 
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.window_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.acc_buckets.clear()
        self.ids.cc_h.text = ""
        self.ids.cc_w.text = ""
        self.ids.cc_bot_h.text = "0"
        self.ids.cc_mid_w.text = "0"
        self.ids.cc_top_cols.text = "1"
        self.ids.cc_bot_cols.text = "0"
        self.ids.cc_out.text = ""
        self.ids.cc_mat_out.text = ""

    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig
        
    def export_full(self, btn):
        content = "=== CUTTING SIZES ===\n" + self.ids.cc_out.text + "\n\n" + self.ids.cc_mat_out.text
        if export_tabular_pdf("CustomCasement_Material", "Custom Casement Job Card", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def export_glass(self, btn):
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1):
            content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        if export_tabular_pdf("CustomCasement_Glass", "Custom Casement Glass List", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def save_data(self, btn):
        content = self.ids.cc_out.text + "\n" + self.ids.cc_mat_out.text
        if not content.strip(): return
        today = datetime.date.today().strftime("%d/%m/%Y %I:%M %p")
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO measurements (date, project_type, details) VALUES (?, ?, ?)",
                      (today, "Custom Casement", content))
            conn.commit()
            conn.close()
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e: show_message("Error", str(e))

class PartitionScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.part_count = 0
        self.buckets = {"Partition Outer Tube": [], "Partition Inter Tube": [], "Partition Horizontal Tube": [], "Door Sash": []}
        self.glass_dict = {}
        self.acc_buckets = {}

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
            out = f"[Partition #{self.part_count} - {p_type} ({raw_h} x {raw_w} {unit_str})]\n"

            if p_type == "Fixed Partition":
                outer_v, inter_v, outer_h = h, h - 3.0, w - 3.0
                inner_h = (w - ((cols + 1) * 1.5)) / cols

                out += "--- VERTICALS ---\n"
                out += f"> Outer Vertical: {disp(outer_v)} (2 pc)\n"
                self.buckets["Partition Outer Tube"].extend([outer_v, outer_v])
                if cols > 1:
                    out += f"> Intermediate Vertical: {disp(inter_v)} ({cols - 1} pc)\n"
                    self.buckets["Partition Inter Tube"].extend([inter_v] * (cols - 1))

                out += "--- HORIZONTALS ---\n"
                out += f"> Outer Horizontal: {disp(outer_h)} (2 pc)\n"
                self.buckets["Partition Horizontal Tube"].extend([outer_h, outer_h])
                h_qty = cols * (rows - 1)
                if h_qty > 0:
                    out += f"> Internal Horizontal: {disp(inner_h)} ({h_qty} pc)\n"
                    self.buckets["Partition Horizontal Tube"].extend([inner_h] * h_qty)

                gap_h = (h - ((rows + 1) * 1.5)) / rows
                glass_qty = int(cols * rows)
                out += f"--- GLASS / BOARD ---\n> Glass Size: {disp(gap_h - 0.25)} x {disp(inner_h - 0.25)} ({glass_qty} pc)\n"
                
                glass_key = f"{disp(gap_h - 0.25)} x {disp(inner_h - 0.25)}"
                self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + glass_qty

            else: 
                raw_dh, raw_dw = safe_eval(self.ids.d_h.text), safe_eval(self.ids.d_w.text)
                if raw_dh == 0 or raw_dw == 0: 
                    show_message("Input Error", "Please enter Door Size.")
                    return

                dh = raw_dh / 25.4 if is_mm else raw_dh
                dw = raw_dw / 25.4 if is_mm else raw_dw

                outer_v, inter_v, door_side_v = h, h - 3.0, h - 1.5
                outer_h_top, rem_w = w - 3.0, w - (dw + 3.0)
                inner_h = (rem_w - 3.0) / cols

                out += "--- VERTICALS ---\n"
                out += f"> Outer Vertical: {disp(outer_v)} (2 pc)\n"
                out += f"> Door Side Vertical: {disp(door_side_v)} (1 pc)\n"
                self.buckets["Partition Outer Tube"].extend([outer_v, outer_v, door_side_v])
                if cols > 2:
                    out += f"> Intermediate Vertical: {disp(inter_v)} ({cols - 2} pc)\n"
                    self.buckets["Partition Inter Tube"].extend([inter_v] * (cols - 2))

                out += "--- HORIZONTALS ---\n"
                out += f"> Outer Top Horizontal: {disp(outer_h_top)} (1 pc)\n"
                out += f"> Door Top Transom: {disp(rem_w)} (1 pc)\n"
                self.buckets["Partition Horizontal Tube"].extend([outer_h_top, rem_w])
                h_qty = cols * (rows - 1)
                if h_qty > 0:
                    out += f"> Internal Horizontal: {disp(inner_h)} ({h_qty} pc)\n"
                    self.buckets["Partition Horizontal Tube"].extend([inner_h] * h_qty)

                door_v, door_tb = dh - 1.75, dw - 6.75
                out += f"--- DOOR SASH ---\n> Vertical: {disp(door_v)} (2 pc)\n> Top/Bottom: {disp(door_tb)} (2 pc)\n"
                self.buckets["Door Sash"].extend([door_v, door_v, door_tb, door_tb])
                
                dg_h, dg_w = door_v - 5.875 - 0.25, door_tb - 0.25
                transom_g_h, transom_g_w = (h - dh - 1.5) - 0.25, dw - 0.25
                part_g_h, part_g_w = (h - ((rows + 1) * 1.5)) / rows - 0.25, inner_h - 0.25
                part_g_qty = int(cols * rows)
                
                out += f"--- GLASS / BOARD ---\n"
                out += f"> Glass Size: {disp(dg_h)} x {disp(dg_w)} (1 pc)\n"
                out += f"> Glass Size: {disp(transom_g_h)} x {disp(transom_g_w)} (1 pc)\n"
                out += f"> Glass Size: {disp(part_g_h)} x {disp(part_g_w)} ({part_g_qty} pc)\n"
                
                self.glass_dict[f"{disp(dg_h)} x {disp(dg_w)}"] = self.glass_dict.get(f"{disp(dg_h)} x {disp(dg_w)}", 0) + 1
                self.glass_dict[f"{disp(transom_g_h)} x {disp(transom_g_w)}"] = self.glass_dict.get(f"{disp(transom_g_h)} x {disp(transom_g_w)}", 0) + 1
                self.glass_dict[f"{disp(part_g_h)} x {disp(part_g_w)}"] = self.glass_dict.get(f"{disp(part_g_h)} x {disp(part_g_w)}", 0) + part_g_qty
                
            out += "="*35 + "\n\n"
            
            self.ids.part_out.text = out + self.ids.part_out.text
            self.ids.part_mat_out.text = generate_material_list(self.buckets, self.acc_buckets)
        except: 
            show_message("Calculation Error", "Please check your inputs.")
            
    def clear_all(self):
        self.part_count = 0
        for key in self.buckets: self.buckets[key] = []
        self.glass_dict.clear()
        self.acc_buckets.clear()
        self.ids.p_h.text = ""
        self.ids.p_w.text = ""
        self.ids.d_h.text = ""
        self.ids.d_w.text = ""
        self.ids.p_cols.text = "3"
        self.ids.p_rows.text = "3"
        self.ids.part_out.text = ""
        self.ids.part_mat_out.text = ""

    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig

    def export_full(self, btn):
        content = "=== CUTTING SIZES ===\n" + self.ids.part_out.text + "\n\n" + self.ids.part_mat_out.text
        if export_tabular_pdf("Partition_Material", "Partition Job Card", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def export_glass(self, btn):
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1):
            content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        if export_tabular_pdf("Partition_Glass", "Partition Glass List", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def save_data(self, btn):
        content = self.ids.part_out.text + "\n" + self.ids.part_mat_out.text
        if not content.strip(): return
        today = datetime.date.today().strftime("%d/%m/%Y %I:%M %p")
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO measurements (date, project_type, details) VALUES (?, ?, ?)",
                      (today, "Partition & Door", content))
            conn.commit()
            conn.close()
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e: print(e)


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
        except: 
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.ids.c_l.text = ""
        self.ids.c_w.text = ""
        self.ids.c_out.text = ""


class DomalScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {"Domal Track": [], "Domal Sash Top/Bottom": [], "Domal Handle": [], "Domal Interlock Patti": []}
        self.glass_dict = {}
        self.acc_buckets = {"Locks": 0, "Rollers": 0, "Rubber (Ft)": 0, "Wool Pile (Ft)": 0, "Screws": 0}

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
            
            # Updated logic: All vertical frames of the sash use "Sash Handle". 
            # The Interlock is just an add-on "Patti" for the center.
            lock_qty = 1
            if "2-Track (2-Sash)" in t_text:
                h_cut_in, s_c = (w_in - w_minus_2t) / 2, 2
                han_qty, int_qty = 4, 2  # 4 handles, 2 pattis
                lock_qty = 1
            elif "3-Track (3-Sash)" in t_text:
                h_cut_in, s_c = (w_in + w_plus_3t) / 3, 3
                han_qty, int_qty = 6, 4  # 6 handles, 4 pattis
                lock_qty = 2
            elif "4-Track (4-Sash)" in t_text:
                h_cut_in, s_c = (w_in + w_plus_4t) / 4, 4
                han_qty, int_qty = 8, 6  # 8 handles, 6 pattis
                lock_qty = 2
            else: # Center Open
                h_cut_in, s_c = (w_in + w_plus_co) / 4, 4
                han_qty, int_qty = 8, 4  # 8 handles, 4 pattis
                lock_qty = 2

            gh_in, gw_in = v_cut_in - g_minus, h_cut_in - g_minus
            
            # Calculating Accessories
            self.acc_buckets["Locks"] += lock_qty
            self.acc_buckets["Rollers"] += s_c * 2
            self.acc_buckets["Rubber (Ft)"] += ((gh_in + gw_in) * 2 * s_c) / 12
            self.acc_buckets["Wool Pile (Ft)"] += (h_in * 2 * s_c) / 12
            self.acc_buckets["Screws"] += 16 * s_c

            self.window_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            
            sys_short = "27x65" if "27x65" in series else "35x75"
            alu_txt = f"[Win #{self.window_count} - H:{raw_h} x W:{raw_w} ({sys_short})]\n> Sash Top/Bottom: {disp(h_cut_in)} ({s_c*2} pc)\n> Sash Handle: {disp(v_cut_in)} ({han_qty} pc)\n> Interlock Patti: {disp(v_cut_in)} ({int_qty} pc)\n"
            glass_txt = f"--- GLASS SIZES ---\n> Glass Size: {disp(gh_in)} x {disp(gw_in)} ({s_c} pc)\n"
            
            glass_key = f"{disp(gh_in)} x {disp(gw_in)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + s_c
            
            self.buckets["Domal Track"].extend([w_in, w_in, h_in, h_in])
            self.buckets["Domal Sash Top/Bottom"].extend([h_cut_in] * (s_c * 2))
            self.buckets["Domal Handle"].extend([v_cut_in] * han_qty)
            self.buckets["Domal Interlock Patti"].extend([v_cut_in] * int_qty)
            
            self.ids.domal_alu_out.text = alu_txt + glass_txt + "="*35 + "\n\n" + self.ids.domal_alu_out.text
            self.ids.domal_mat_out.text = generate_material_list(self.buckets, self.acc_buckets)
        except: 
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.window_count = 0
        for key in self.buckets: self.buckets[key] = []
        for key in self.acc_buckets: self.acc_buckets[key] = 0
        self.glass_dict.clear()
        self.ids.entry_h_cut.text = ""
        self.ids.entry_w_cut.text = ""
        self.ids.domal_alu_out.text = ""
        self.ids.domal_mat_out.text = ""

    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig

    def export_full(self, btn):
        content = "=== CUTTING SIZES ===\n" + self.ids.domal_alu_out.text + "\n\n" + self.ids.domal_mat_out.text
        if export_tabular_pdf("Domal_Material", "Domal Window Job Card", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def export_glass(self, btn):
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1):
            content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        if export_tabular_pdf("Domal_Glass", "Domal Glass List", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def save_data(self, btn):
        content = self.ids.domal_alu_out.text + "\n" + self.ids.domal_mat_out.text
        if not content.strip(): return
        today = datetime.date.today().strftime("%d/%m/%Y %I:%M %p")
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO measurements (date, project_type, details) VALUES (?, ?, ?)",
                      (today, "Domal Window", content))
            conn.commit()
            conn.close()
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e: print(e)


class SlidingScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.window_count = 0
        self.buckets = {
            "Track Top": [], "Track Bottom": [], "Track Vertical": [],
            "Sash Top": [], "Sash Bottom": [], "Sash Handle": [], "Sash Interlock": []
        }
        self.glass_dict = {}
        self.acc_buckets = {"Locks": 0, "Rollers": 0, "Rubber (Ft)": 0, "Wool Pile (Ft)": 0, "Screws": 0}

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
            lock_qty = 1
            if "2-Track" in t_type: div, g_c = 2, 2; lock_qty = 1
            elif "3-Track" in t_type: div, g_c = 3, 3; han_qty, int_qty = 2, 4; lock_qty = 2
            elif "4-Track" in t_type: div, g_c = 4, 4; han_qty, int_qty = 2, 6; lock_qty = 2
            elif "Center Open" in t_type: div, g_c = 4, 4; han_qty, int_qty = 4, 4; lock_qty = 2
            
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
            
            # Calculating Accessories
            self.acc_buckets["Locks"] += lock_qty
            self.acc_buckets["Rollers"] += g_c * 2
            self.acc_buckets["Rubber (Ft)"] += ((glass_h + glass_w) * 2 * g_c) / 12
            self.acc_buckets["Wool Pile (Ft)"] += (h_in * 2 * g_c) / 12
            self.acc_buckets["Screws"] += 16 * g_c

            self.window_count += 1
            def disp(val_in): return to_mm_str(val_in) if is_mm else to_fraction_inch(val_in)
            
            alu_txt = f"[Win #{self.window_count} - H:{raw_h} x W:{raw_w} ({sys_type.split(' ')[0]})]\n> Track Top/Bottom: {disp(w_in)} (2 pc)\n> Track Vertical: {disp(h_in)} (2 pc)\n> Sash Top/Bottom: {disp(tb_w)} ({g_c*2} pc)\n> Sash Handle: {disp(handle_h)} ({han_qty} pc)\n> Sash Interlock: {disp(handle_h)} ({int_qty} pc)\n"
            glass_txt = f"--- GLASS SIZES ---\n> Glass Size: {disp(glass_h)} x {disp(glass_w)} ({g_c} pc)\n"
            
            glass_key = f"{disp(glass_h)} x {disp(glass_w)}"
            self.glass_dict[glass_key] = self.glass_dict.get(glass_key, 0) + g_c
            
            self.buckets["Track Top"].extend([w_in])
            self.buckets["Track Bottom"].extend([w_in])
            self.buckets["Track Vertical"].extend([h_in, h_in])
            self.buckets["Sash Top"].extend([tb_w] * g_c)
            self.buckets["Sash Bottom"].extend([tb_w] * g_c)
            self.buckets["Sash Handle"].extend([handle_h] * han_qty)
            self.buckets["Sash Interlock"].extend([handle_h] * int_qty)
            
            self.ids.sl_out.text = alu_txt + glass_txt + "="*35 + "\n\n" + self.ids.sl_out.text
            self.ids.sl_mat_out.text = generate_material_list(self.buckets, self.acc_buckets)
        except: 
            show_message("Calculation Error", "Please check your inputs.")

    def clear_all(self):
        self.window_count = 0
        for key in self.buckets: self.buckets[key] = []
        for key in self.acc_buckets: self.acc_buckets[key] = 0
        self.glass_dict.clear()
        self.ids.sl_h.text = ""
        self.ids.sl_w.text = ""
        self.ids.sl_out.text = ""
        self.ids.sl_mat_out.text = ""

    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig

    def export_full(self, btn):
        content = "=== CUTTING SIZES ===\n" + self.ids.sl_out.text + "\n\n" + self.ids.sl_mat_out.text
        if export_tabular_pdf("Sliding_Material", "Sliding Window Job Card", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def export_glass(self, btn):
        content = "[ CONSOLIDATED GLASS LIST ]\n"
        for i, (size, qty) in enumerate(self.glass_dict.items(), 1):
            content += f"> {i}. Glass Size: {size} ({qty} Pcs)\n"
        if export_tabular_pdf("Sliding_Glass", "Sliding Glass List", content):
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)

    def save_data(self, btn):
        content = self.ids.sl_out.text + "\n" + self.ids.sl_mat_out.text
        if not content.strip(): return
        today = datetime.date.today().strftime("%d/%m/%Y %I:%M %p")
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO measurements (date, project_type, details) VALUES (?, ?, ?)",
                      (today, "Sliding Window", content))
            conn.commit()
            conn.close()
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e: print(e)

class QuotationScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.bill_items = []
        
    def add_item(self):
        try:
            h = safe_eval(self.ids.q_h.text)
            w = safe_eval(self.ids.q_w.text)
            qty = max(1, int(safe_eval(self.ids.q_qty.text)))
            rate = safe_eval(self.ids.q_rate.text)
            w_type = self.ids.q_type.text
            
            if h == 0 or w == 0 or rate == 0: 
                show_message("Error", "Height, Width and Rate must not be 0.")
                return
            
            sq_ft = (h * w) / 144
            total_sq_ft = sq_ft * qty
            total_price = total_sq_ft * rate
            
            item = {
                'type': w_type,
                'h': h, 'w': w, 'qty': qty,
                'rate': rate, 'area': total_sq_ft,
                'price': total_price
            }
            self.bill_items.append(item)
            
            self.ids.bill_queue_text.text += f"[{len(self.bill_items)}] {w_type} | {h}x{w} | Qty:{qty} | Rs:{total_price:.2f}\n"
            
            self.ids.q_h.text = ""
            self.ids.q_w.text = ""
            self.ids.q_qty.text = "1"
        except Exception as e: show_message("Error", str(e))

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
        
        c_name = self.ids.q_name.text if self.ids.q_name.text else 'Customer'
        c_phone = self.ids.q_phone.text if self.ids.q_phone.text else 'N/A'
        c_addr = self.ids.q_addr.text if self.ids.q_addr.text else 'N/A'
        today = datetime.date.today().strftime("%d/%m/%Y")
        
        discount = safe_eval(self.ids.q_discount.text)
        gst_pct = safe_eval(self.ids.q_gst.text)
        
        bill = "=================================================\n"
        bill += f"           {shop_name}\n"
        bill += f"           {addr}\n"
        bill += f"           Mob: {contact_info}{email_info}{gst_info}\n"
        bill += "=================================================\n"
        bill += f"Date: {today}\n\n"
        bill += f"Bill To:\nName: {c_name}\nPhone: {c_phone}\nAddress: {c_addr}\n"
        bill += "-------------------------------------------------\n"
        bill += "SN. Description             Qty  Sq.Ft   Amount\n"
        bill += "-------------------------------------------------\n"
        
        grand_total = 0.0
        for i, item in enumerate(self.bill_items, 1):
            desc = f"{item['type']}\n    Size: {item['h']}x{item['w']} @ Rs.{item['rate']}"
            bill += f"{i}. {desc}\n                            {item['qty']}    {item['area']:.1f}   {item['price']:.2f}\n"
            grand_total += item['price']
            
        net_total = grand_total - discount
        gst_amount = net_total * (gst_pct / 100)
        final_total = net_total + gst_amount
            
        bill += "-------------------------------------------------\n"
        bill += f"                               Sub Total: Rs {grand_total:.2f}\n"
        if discount > 0:
            bill += f"                               Discount: -Rs {discount:.2f}\n"
        if gst_pct > 0:
            bill += f"                               GST ({gst_pct}%): +Rs {gst_amount:.2f}\n"
        
        bill += f"                               GRAND TOTAL: Rs {final_total:.2f}\n"
        bill += "=================================================\n"
        bill += "Thank you for your business!\n"
        bill += "           -- App by Smart worker --"
        
        self.ids.bill_output.text = bill

    def clear_items(self):
        self.bill_items.clear()
        self.ids.bill_queue_text.text = ""
        self.ids.bill_output.text = ""
        self.ids.q_rate.text = ""
        self.ids.q_discount.text = "0"
        self.ids.q_gst.text = "0"

    def share_whatsapp(self):
        try:
            bill_text = self.ids.bill_output.text
            if not bill_text.strip(): return
            encoded_text = urllib.parse.quote(bill_text)
            url = f"whatsapp://send?text={encoded_text}"
            webbrowser.open(url)
        except Exception as e: print(f"Error: {e}")
            
    def temp_btn_text(self, dt, btn, orig):
        btn.text = orig
            
    def save_to_db(self, btn):
        bill_text = self.ids.bill_output.text
        if not bill_text.strip(): return
        c_name = self.ids.q_name.text if self.ids.q_name.text else 'Customer'
        today = datetime.date.today().strftime("%d/%m/%Y")
        
        grand_total = sum(item['price'] for item in self.bill_items)
        net_total = grand_total - safe_eval(self.ids.q_discount.text)
        final_total = net_total + (net_total * (safe_eval(self.ids.q_gst.text) / 100))
        
        try:
            conn = sqlite3.connect('smartworker.db')
            c = conn.cursor()
            c.execute("INSERT INTO invoices (date, client, amount, bill_text) VALUES (?, ?, ?, ?)",
                      (today, c_name, final_total, bill_text))
            conn.commit()
            conn.close()
            orig = btn.text
            btn.text = "SAVED!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e:
            show_message("Database Error", str(e))

    def export_bill_pdf(self, btn):
        if not self.bill_items:
            show_message("Empty", "Please add items to generate a bill first.")
            return

        c_name = self.ids.q_name.text if self.ids.q_name.text else 'Customer'
        c_phone = self.ids.q_phone.text if self.ids.q_phone.text else 'N/A'
        c_addr = self.ids.q_addr.text if self.ids.q_addr.text else 'N/A'
        today = datetime.date.today().strftime("%d/%m/%Y")

        base_dir = get_safe_save_path()
            
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"Invoice_{c_name.replace(' ', '_')}_{timestamp}"
        
        if not HAS_REPORTLAB:
            filepath = os.path.join(base_dir, f"{filename}.txt")
            try:
                with open(filepath, 'w') as f:
                    f.write(self.ids.bill_output.text)
                orig = btn.text
                btn.text = "SAVED TXT!"
                Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
            except Exception as e:
                show_message("Error", str(e))
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
            
            if profile and profile.get('email') and profile['email'].strip():
                address_line += f"<br/>Email: {profile['email']}"
            if profile and profile.get('gst') and profile['gst'].strip():
                address_line += f"<br/>GST No: {profile['gst']}"
                
            # Company Details Header
            elements.append(Paragraph(shop_name, styleH))
            elements.append(Paragraph(address_line, styleSub))
            elements.append(Spacer(1, 10))
            
            # Customer Details
            cust_data = [
                [Paragraph(f"<b>Bill To:</b><br/>{c_name}<br/>Phone: {c_phone}<br/>Address: {c_addr}", styleNormal), 
                 Paragraph(f"<b>Invoice Date:</b> {today}<br/><b>Invoice No:</b> SW-{timestamp[-6:]}", styleNormal)]
            ]
            cust_table = Table(cust_data, colWidths=[4*inch, 2.5*inch])
            cust_table.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ]))
            elements.append(cust_table)
            elements.append(Spacer(1, 20))
            
            # Table Header & Data
            table_data = [['SN', 'Description', 'Qty', 'Sq.Ft', 'Rate', 'Amount']]
            grand_total = 0.0
            
            for i, item in enumerate(self.bill_items, 1):
                desc = Paragraph(f"<b>{item['type']}</b><br/>Size: {item['h']} x {item['w']}", styleNormal)
                table_data.append([
                    str(i),
                    desc,
                    str(item['qty']),
                    f"{item['area']:.1f}",
                    f"{item['rate']}",
                    f"{item['price']:.2f}"
                ])
                grand_total += item['price']
            
            # Calculations
            discount = safe_eval(self.ids.q_discount.text)
            gst_pct = safe_eval(self.ids.q_gst.text)
            net_total = grand_total - discount
            gst_amount = net_total * (gst_pct / 100)
            final_total = net_total + gst_amount
            
            # Subtotals and Totals Rows
            total_start_idx = len(table_data)
            table_data.append(['', '', '', '', 'Sub Total:', f"Rs {grand_total:.2f}"])
            if discount > 0:
                table_data.append(['', '', '', '', 'Discount:', f"- Rs {discount:.2f}"])
            if gst_pct > 0:
                table_data.append(['', '', '', '', f'GST ({gst_pct}%):', f"+ Rs {gst_amount:.2f}"])
            table_data.append(['', '', '', '', 'Grand Total:', f"Rs {final_total:.2f}"])
            
            # Table Formatting and Styling
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
            t.setStyle(TableStyle(t_style))
            elements.append(t)
            
            elements.append(Spacer(1, 30))
            elements.append(Paragraph("<b>Thank you for your business!</b><br/><br/><br/><font size=8 color=grey><i>App by Smart worker</i></font>", ParagraphStyle(name='CenterB', parent=styles['Normal'], alignment=1)))
            
            doc.build(elements)
            
            orig = btn.text
            btn.text = "SAVED PDF!"
            Clock.schedule_once(lambda dt: self.temp_btn_text(dt, btn, orig), 2)
        except Exception as e:
            show_message("Error Saving PDF", str(e))

class SmartWorkerApp(App):
    def build(self):
        setup_db()
        Window.clearcolor = (0.15, 0.15, 0.15, 1) 
        self.sm = Builder.load_string(KV)
        self.keypad = KeypadPopup()
        return self.sm

    def on_start(self):
        # Android Storage Permission Request (ক্র্যাশ রোধ করার জন্য)
        if platform == 'android':
            try:
                from android.permissions import request_permissions, Permission
                request_permissions([Permission.WRITE_EXTERNAL_STORAGE, Permission.READ_EXTERNAL_STORAGE])
            except Exception as e:
                pass

        # Check if user profile is already created
        if get_user_profile():
            self.sm.current = 'home'
        else:
            self.sm.current = 'setup'

    def open_keypad(self, target_widget):
        self.keypad.target = target_widget
        self.keypad.display_text = target_widget.text
        self.keypad.open()

if __name__ == '__main__': 
    SmartWorkerApp().run()
