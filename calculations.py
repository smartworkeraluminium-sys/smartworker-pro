import math
import fractions
import re
import os
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

# ফোল্ডার থেকে emoji.ttf ফন্ট লোড করা
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
EMOJI_FONT_PATH = os.path.join(CURRENT_DIR, 'emoji.ttf')

if os.path.exists(EMOJI_FONT_PATH):
    pdfmetrics.registerFont(TTFont('EmojiFont', EMOJI_FONT_PATH))
    EMOJI_AVAILABLE = True
else:
    EMOJI_AVAILABLE = False

def format_pdf_text_with_emoji(text):
    """
    টেক্সটের মধ্যে থাকা ইমোজিগুলোকে সনাক্ত করে স্বয়ংক্রিয়ভাবে
    EmojiFont ট্যাগে রূপান্তর করে যাতে ReportLab ক্র্যাশ না করে।
    """
    if not text:
        return ""
    if not EMOJI_AVAILABLE:
        return str(text)
    
    # রেগুলার টেক্সট ও সাধারণ চিহ্ন বাদে বাকিগুলোকে EmojiFont এ মোড়ানো
    def wrap_emoji(match):
        return f'<font name="EmojiFont">{match.group(0)}</font>'
    
    formatted = re.sub(r'[^\u0000-\u007F\u0980-\u09FF\s.,!?;:\'"+-/%&()=<>#@]', wrap_emoji, str(text))
    return formatted

def draw_styled_text(canvas, text, x, y, font_size=11, leading=13, font_name="Helvetica"):
    """
    PDF ক্যানভাসে বাংলা/ইংরেজি এবং ইমোজি একসঙ্গে ড্র করার হেল্পার ফাংশন
    """
    style = ParagraphStyle(
        name='PDFTextStyle',
        fontName=font_name,
        fontSize=font_size,
        leading=leading
    )
    safe_content = format_pdf_text_with_emoji(text)
    p = Paragraph(safe_content, style)
    p.wrapOn(canvas, 500, 100)
    p.drawOn(canvas, x, y)

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
    if not str(text).strip(): return 0.0
    try:
        text = re.sub(r'\b0+(?=\d)', '', str(text))
        return float(eval(text))
    except:
        return 0.0

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
            if not placed: bins.append([p])
        if valid:
            total_waste = (len(bins) * std_len) - sum(pieces)
            if best_plan is None or len(bins) < len(best_plan['bins']):
                best_plan = {'len': std_len, 'bins': bins, 'waste': total_waste}
            elif len(bins) == len(best_plan['bins']) and total_waste < best_plan['waste']:
                best_plan = {'len': std_len, 'bins': bins, 'waste': total_waste}
    if not best_plan: best_plan = {'len': 0, 'bins': [[p] for p in pieces], 'waste': 0, 'oversize': True}
    return best_plan

def format_cuts(cuts):
    counts = {}
    for c in cuts:
        val = round(c, 2)
        counts[val] = counts.get(val, 0) + 1
    parts = []
    for val in sorted(counts.keys(), reverse=True):
        qty = counts[val]
        if qty > 1: parts.append(f"{val}\" x {qty}")
        else: parts.append(f"{val}\"")
    return " + ".join(parts)

def generate_material_list(buckets):
    res_text = "--- ACCUMULATED MATERIAL PURCHASE ---\n\n"
    has_items = False
    for name, pieces in buckets.items():
        if pieces:
            has_items = True
            plan = optimize_cutting_plan(pieces)
            res_text += f"[{name}]\n"
            if plan.get('oversize'):
                res_text += "> SPECIAL ORDER (Oversized)\n"
                for p in pieces: res_text += f"  > Piece: {round(p, 2)}\"\n"
            else:
                ft = int(plan['len'] / 12)
                res_text += f"> Buy: {len(plan['bins'])} pcs ({ft} ft)\n"
                for i, b in enumerate(plan['bins'], 1):
                    cuts_str = format_cuts(b)
                    waste = round(plan['len'] - sum(b), 2)
                    res_text += f"  > Stick #{i}: Cut [ {cuts_str} ] -> Waste: {waste}\"\n"
    if not has_items: return ""
    return res_text
