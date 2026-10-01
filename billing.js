// =========================================================================
// SMART WORKER PRO - PRO QUOTATION & GST INVOICE BILLING ENGINE
// Item Queuing, Live Discounts, GST (18%), Milestones & PDF Bill Printing
// =========================================================================

 // ========================================================
 // 9. PRO QUOTATION & DYNAMIC COSTING ENGINE
 // ========================================================
 let billItems = [];

 function calculateSuggestedRate(w_type, thickness, color, glass_thick, glass_type, toughened) {
 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 let thick_val = 1.5;
 try { thick_val = parseFloat(thickness.replace('mm', '').trim()) || 1.5; } catch(e){}

 const is_domal = w_type.includes('Domal');
 let base_wt = 0.90;

 if (w_type.includes('4-Track') || w_type.includes('Center Open')) base_wt = (is_domal ? 1.80 : 1.40) * (thick_val / 1.5);
 else if (w_type.includes('3-Track')) base_wt = (is_domal ? 1.45 : 1.10) * (thick_val / 1.5);
 else if (w_type.includes('2-Track')) base_wt = (is_domal ? 1.05 : 0.80) * (thick_val / 1.5);
 else if (w_type.includes('Casement')) base_wt = 1.15 * (thick_val / 1.5);
 else if (w_type.includes('Door')) base_wt = 1.35 * (thick_val / 1.5);
 else if (w_type.includes('Partition')) base_wt = 0.90 * (thick_val / 1.5);
 else if (w_type.includes('Ceiling')) return w_type.includes('Gypsum') ? 110.0 : 95.0;

 let alu_kg_rate = 260.0;
 if (is_domal) {
 if (color.includes('Wooden')) alu_kg_rate = parseFloat(cost_data['Domal Wooden Finish (Rs/Kg)']) || 365.0;
 else if (['Powder Coated', 'Black', 'White', 'Brown', 'Grey', 'Ivory', 'Charcoal'].some(c => color.includes(c))) alu_kg_rate = parseFloat(cost_data['Domal Powder Coated (Rs/Kg)']) || 310.0;
 else if (['Stainless Steel', 'SS', 'Gold'].some(c => color.includes(c))) alu_kg_rate = (parseFloat(cost_data['Domal Anodized (Rs/Kg)']) || 295.0) + 20.0;
 else if (['Anodized', 'Bronze', 'Champagne'].some(c => color.includes(c))) alu_kg_rate = parseFloat(cost_data['Domal Anodized (Rs/Kg)']) || 295.0;
 else alu_kg_rate = parseFloat(cost_data['Domal Mill/Natural (Rs/Kg)']) || 280.0;
 } else if (w_type.includes('Door')) {
 alu_kg_rate = parseFloat(cost_data['Door Master Material (Rs/Kg)']) || 270.0;
 if (color.includes('Wooden')) alu_kg_rate += 75.0;
 else if (color.includes('Powder')) alu_kg_rate += 25.0;
 } else if (w_type.includes('Partition')) {
 alu_kg_rate = parseFloat(cost_data['Partition Material (Rs/Kg)']) || 265.0;
 if (color.includes('Wooden')) alu_kg_rate += 75.0;
 else if (color.includes('Powder')) alu_kg_rate += 25.0;
 } else if (w_type.includes('Casement')) {
 alu_kg_rate = parseFloat(cost_data['Casement Material (Rs/Kg)']) || 275.0;
 if (color.includes('Wooden')) alu_kg_rate += 75.0;
 else if (color.includes('Powder')) alu_kg_rate += 25.0;
 } else {
 if (color.includes('Wooden')) alu_kg_rate = parseFloat(cost_data['Sliding Wooden Finish (Rs/Kg)']) || 345.0;
 else if (['Powder Coated', 'Black', 'White', 'Brown', 'Grey', 'Ivory', 'Charcoal'].some(c => color.includes(c))) alu_kg_rate = parseFloat(cost_data['Sliding Powder Coated (Rs/Kg)']) || 290.0;
 else if (['Stainless Steel', 'SS', 'Gold'].some(c => color.includes(c))) alu_kg_rate = (parseFloat(cost_data['Sliding Anodized (Rs/Kg)']) || 275.0) + 15.0;
 else if (['Anodized', 'Bronze', 'Champagne'].some(c => color.includes(c))) alu_kg_rate = parseFloat(cost_data['Sliding Anodized (Rs/Kg)']) || 275.0;
 else alu_kg_rate = parseFloat(cost_data['Sliding Mill/Natural (Rs/Kg)']) || 260.0;
 }

 const alu_cost = base_wt * alu_kg_rate;
 const clean_g_thick = String(glass_thick).replace('Glass', '').replace('mm', '').trim();
 const glass_multipliers = { '3.5': 0.80, '4.0': 0.88, '5.0': 1.00, '6.0': 1.25, '8.0': 1.80, '10.0': 2.35, '12.0': 3.00 };
 const g_mult = glass_multipliers[clean_g_thick] || 1.0;
 const base_clear_sqft = parseFloat(cost_data['Clear Glass (Rs/Sq.Ft)']) || 35.0;

 let glass_cost = base_clear_sqft * g_mult;
 if (String(glass_thick).includes('DGU') || String(glass_type).includes('DGU') || String(glass_type).includes('Double')) {
 glass_cost = 195.0;
 } else {
 if (String(glass_type).includes('Reflective')) {
 const refl_base = parseFloat(cost_data['Reflective Glass (Rs/Sq.Ft)']) || 55.0;
 glass_cost += Math.max(15.0, refl_base - base_clear_sqft);
 } else if (String(glass_type).includes('Tinted')) {
 glass_cost += 12.0;
 } else if (String(glass_type).includes('Frosted') || String(glass_type).includes('Pinhead')) {
 glass_cost += 10.0;
 }
 }

 const is_toughened = typeof toughened === 'boolean' ? toughened : ['Toughened', 'Yes', 'True', '1'].some(w => String(toughened).includes(w));
 const tough_extra = parseFloat(cost_data['Toughened Extra (Rs/Sq.Ft)']) || 25.0;
 if (is_toughened) {
 if (['8.0', '10.0', '12.0'].some(g => clean_g_thick.includes(g))) glass_cost += tough_extra * 1.4;
 else glass_cost += tough_extra;
 }

 const hw_cost = is_domal ? 55.0 : 35.0;
 let labour_cost = 35.0, margin = 0.15;
 if (is_domal) {
 labour_cost = parseFloat(cost_data['Domal Window Labour']) || 50.0;
 margin = (parseFloat(cost_data['Domal Profit (%)']) || 20.0) / 100.0;
 } else if (w_type.includes('Casement')) {
 labour_cost = parseFloat(cost_data['Casement Labour']) || 60.0;
 margin = (parseFloat(cost_data['Casement Profit (%)']) || 25.0) / 100.0;
 } else if (w_type.includes('Door')) {
 labour_cost = parseFloat(cost_data['Door Master Labour']) || 65.0;
 margin = (parseFloat(cost_data['Door Profit (%)']) || 20.0) / 100.0;
 } else if (w_type.includes('Partition')) {
 labour_cost = parseFloat(cost_data['Partition Labour']) || 40.0;
 margin = (parseFloat(cost_data['Door Profit (%)']) || 18.0) / 100.0;
 } else {
 labour_cost = parseFloat(cost_data['Sliding Window Labour']) || 35.0;
 margin = (parseFloat(cost_data['Sliding Profit (%)']) || 15.0) / 100.0;
 }

 const sub_cost = alu_cost + glass_cost + hw_cost + labour_cost;
 const final_rate = Math.round((sub_cost * (1.0 + margin)) / 10) * 10;
 return Math.max(150.0, final_rate);
 }

 function updateSuggestedRate() {
 const w_type = document.getElementById('q_type').value;
 const color = document.getElementById('q_color').value;
 const thick = document.getElementById('q_thick').value;
 const g_thick = document.getElementById('q_g_thick').value;
 const g_type = document.getElementById('q_g_type').value;
 const tough = document.getElementById('q_tough').value.includes("Toughened");

 const rate = calculateSuggestedRate(w_type, thick, color, g_thick, g_type, tough);
 document.getElementById('q_rate').value = rate;
 }

 function autofillCustomer() {
 const phoneInput = document.getElementById('q_phone').value.trim();
 if (!phoneInput) { alert("Please enter Phone or PIN (last 4 digits) first."); return; }
 const customers = JSON.parse(localStorage.getItem('sw_customers') || '{}');
 for (const p in customers) {
 if (p.endsWith(phoneInput)) {
 document.getElementById('q_name').value = customers[p].name || "";
 document.getElementById('q_phone').value = p;
 document.getElementById('q_addr').value = customers[p].address || "";
 return;
 }
 }
 alert("No customer found with this number.");
 }

 function addBillItem() {
 const h = safeEval(document.getElementById('q_h').value);
 const w = safeEval(document.getElementById('q_w').value);
 const qty = Math.max(1, parseInt(safeEval(document.getElementById('q_qty').value)) || 1);
 const w_type = document.getElementById('q_type').value;
 const color = document.getElementById('q_color').value;
 const thick = document.getElementById('q_thick').value;
 const g_thick = document.getElementById('q_g_thick').value;
 const g_type = document.getElementById('q_g_type').value;
 const toughened = document.getElementById('q_tough').value.includes("Toughened");
 const loc = document.getElementById('q_loc').value.trim();
 let rate = safeEval(document.getElementById('q_rate').value);
 if (rate <= 0) rate = calculateSuggestedRate(w_type, thick, color, g_thick, g_type, toughened);

 if (h === 0 || w === 0) { alert("Please enter valid Height and Width."); return; }

 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 const unit = cost_data['Default Unit'] || "Feet";
 let sq_ft = 0;
 if (unit === "Feet") sq_ft = h * w;
 else if (unit === "Millimeters") sq_ft = (h * w) / 92903.04;
 else sq_ft = (h * w) / 144;

 const total_sq_ft = sq_ft * qty;
 const total_price = total_sq_ft * rate;
 const unit_str = unit === "Feet" ? "ft" : (unit === "Millimeters" ? "mm" : "in");

 billItems.push({
 type: w_type, location: loc, color: color, thickness: thick, glass_thick: g_thick,
 glass_type: g_type, toughened: toughened, h: h, w: w, unit: unit_str, qty: qty,
 rate: rate, area: total_sq_ft, price: total_price
 });

 refreshQueueText();
 autoCalcAdvance();
 document.getElementById('q_h').value = "";
 document.getElementById('q_w').value = "";
 document.getElementById('q_qty').value = "1";
 document.getElementById('q_loc').value = "";
 }

 function removeLastBillItem() {
 if (billItems.length === 0) { alert("No items in bill to remove."); return; }
 billItems.pop();
 refreshQueueText();
 autoCalcAdvance();
 updateLiveDue();
 }

 function clearBillItems() {
 billItems = [];
 document.getElementById('bill_queue_text').textContent = "";
 document.getElementById('bill_output').textContent = "";
 document.getElementById('q_advance').value = "0";
 document.getElementById('q_due_label').textContent = "Rs. 0.00";
 }

 function refreshQueueText() {
 const lines = [];
 billItems.forEach((itm, i) => {
 const loc_lbl = itm.location ? `[${itm.location}] ` : "";
 lines.push(`[${i + 1}] ${loc_lbl}${itm.type} | ${itm.h}x${itm.w} ${itm.unit} | Qty:${itm.qty} @ Rs.${itm.rate.toFixed(0)} | Rs:${itm.price.toFixed(2)}`);
 });
 document.getElementById('bill_queue_text').textContent = lines.join('\\n');
 }

 function getDiscountAndGst() {
 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 const gst = parseFloat(cost_data['GST']) || 0.0;
 const disc = parseFloat(cost_data['Discount']) || 0.0;
 return [disc, gst];
 }

 function autoCalcAdvance() {
 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const net_total = grand_total - discount;
 const final_total = net_total + (net_total * (gst_pct / 100)) + extra_charge;
 const adv_50 = Math.round(final_total * 0.5);
 document.getElementById('q_advance').value = adv_50;
 updateLiveDue();
 }

 function set50PercentAdvance() {
 autoCalcAdvance();
 }

 function updateLiveDue() {
 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const net_total = grand_total - discount;
 const final_total = net_total + (net_total * (gst_pct / 100)) + extra_charge;
 const adv = safeEval(document.getElementById('q_advance').value);
 const due = final_total - adv;
 document.getElementById('q_due_label').textContent = `Rs. ${due.toFixed(2)} (Total: Rs. ${final_total.toFixed(2)})`;
 }

 function generateBillText() {
 if (billItems.length === 0) { alert("Please add items to generate bill."); return; }

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact_info = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const email_info = profile.email ? `\\n Email: ${profile.email}` : "";
 const gst_info = profile.gst ? `\\n GST No: ${profile.gst}` : "";

 const bill_stage = document.getElementById('q_stage').value;
 const c_name = document.getElementById('q_name').value || 'Customer';
 const c_phone = document.getElementById('q_phone').value || 'N/A';
 const c_addr = document.getElementById('q_addr').value || 'N/A';
 const today = new Date().toLocaleDateString('en-GB');

 const [discount, gst_pct] = getDiscountAndGst();
 const advance_paid = safeEval(document.getElementById('q_advance').value);
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);

 let bill = "=================================================\\n";
 bill += ` ${shop_name}\\n`;
 bill += ` ${addr}\\n`;
 bill += ` Mob: ${contact_info}${email_info}${gst_info}\\n`;
 bill += "=================================================\\n";
 bill += `Invoice Type: ${bill_stage}\\nDate: ${today}\\n\\n`;
 bill += `Bill To:\\nName: ${c_name}\\nPhone: ${c_phone}\\nAddress: ${c_addr}\\n`;
 bill += "-------------------------------------------------\\n";
 bill += "SN. Description Qty Sq.Ft Amount\\n";
 bill += "-------------------------------------------------\\n";

 let grand_total = 0.0;
 billItems.forEach((item, i) => {
 const color = item.color || 'Jet Black';
 const thick = item.thickness || '1.5 mm';
 const g_thick = item.glass_thick || '5.0 mm';
 const g_type = item.glass_type || 'Clear Float';
 const tough_txt = item.toughened ? " [TOUGHENED: YES]" : "";
 const loc_txt = item.location ? `[${item.location}] ` : "";
 const desc = `${loc_txt}${item.type}\\n Specs: ${color} (${thick}) | ${g_thick} ${g_type}${tough_txt}\\n Size: ${item.h}x${item.w} ${item.unit} @ Rs.${item.rate}`;
 bill += `${i + 1}. ${desc}\\n ${item.qty} ${item.area.toFixed(1)} ${item.price.toFixed(2)}\\n`;
 grand_total += item.price;
 });

 const net_total = grand_total - discount;
 const gst_amount = net_total * (gst_pct / 100);
 const final_total = net_total + gst_amount + extra_charge;
 const due_amount = final_total - advance_paid;

 bill += "-------------------------------------------------\\n";
 bill += ` Sub Total: Rs ${grand_total.toFixed(2)}\\n`;
 if (discount > 0) bill += ` Discount: -Rs ${discount.toFixed(2)}\\n`;
 if (gst_pct > 0) bill += ` GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}\\n`;
 if (extra_charge > 0) bill += ` Transport/Labor: +Rs ${extra_charge.toFixed(2)}\\n`;

 bill += ` GRAND TOTAL: Rs ${final_total.toFixed(2)}\\n`;
 bill += ` Advance Received: -Rs ${advance_paid.toFixed(2)}\\n`;
 bill += ` DUE AMOUNT: Rs ${due_amount.toFixed(2)}\\n`;
 bill += "-------------------------------------------------\\n";
 bill += "TERMS & CONDITIONS:\\n";
 bill += "1. 50% Advance with official work order.\\n";
 bill += "2. Balance payment must be cleared on delivery / fitting.\\n";
 bill += "3. Quotation is valid for 15 days from issue date.\\n";
 bill += "4. Glass & cut sections cannot be returned once processed.\\n";
 bill += "-------------------------------------------------\\n\\n";
 bill += "Customer Signature: Authorized Signature:\\n";
 bill += "___________________ _____________________\\n";
 bill += ` (${shop_name})\\n`;
 bill += "=================================================\\n";
 bill += "Thank you for your business!\\n -- App by Smart worker --\\n";

 document.getElementById('bill_output').textContent = bill;
 }

 function saveBillToDb() {
 const bill_text = document.getElementById('bill_output').textContent;
 if (!bill_text.trim()) { alert("Please generate a bill first!"); return; }

 const c_name = document.getElementById('q_name').value.trim() || 'Customer';
 const c_phone = document.getElementById('q_phone').value.trim();
 const c_addr = document.getElementById('q_addr').value.trim();
 const bill_stage = document.getElementById('q_stage').value;
 const today = new Date().toLocaleDateString('en-GB');

 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const advance_paid = safeEval(document.getElementById('q_advance').value);
 const net_total = grand_total - discount;
 const final_total = net_total + (net_total * (gst_pct / 100)) + extra_charge;
 const due_amount = Math.max(0, final_total - advance_paid);

 // 1. Update Customers Khata
 if (c_phone && c_phone !== 'N/A') {
   const customers = getKhataCustomers();
   if (!customers[c_phone]) {
     customers[c_phone] = {
       name: c_name,
       phone: c_phone,
       address: c_addr,
       total_billed: final_total,
       total_paid: advance_paid,
       total_due: due_amount,
       transactions: [
         { id: Date.now(), date: today, type: 'BILL', desc: `বিল তৈরি: ${bill_stage}`, debit: final_total, credit: advance_paid, balance: due_amount }
       ]
     };
   } else {
     const cust = customers[c_phone];
     cust.name = c_name;
     if (c_addr) cust.address = c_addr;
     cust.total_billed = (Number(cust.total_billed) || 0) + final_total;
     cust.total_paid = (Number(cust.total_paid) || 0) + advance_paid;
     cust.total_due = (Number(cust.total_due) || 0) + due_amount;
     if (!cust.transactions) cust.transactions = [];
     cust.transactions.push({
       id: Date.now(),
       date: today,
       type: 'BILL',
       desc: `বিল তৈরি: ${bill_stage}`,
       debit: final_total,
       credit: advance_paid,
       balance: cust.total_due
     });
   }
   saveKhataCustomers(customers);
 }

 // 2. Save Invoice
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 invoices.unshift({
   id: Date.now(),
   date: today,
   client: c_name,
   phone: c_phone || 'N/A',
   amount: final_total,
   advance: advance_paid,
   due: due_amount,
   bill_text: bill_text
 });
 localStorage.setItem('sw_invoices', JSON.stringify(invoices));
 if (typeof syncCustomersToFirestore === 'function') {
   syncCustomersToFirestore(getKhataCustomers());
 }
 if (typeof syncAllDataToCloud === 'function') {
   syncAllDataToCloud();
 }
 alert("🎉 বিল সফলভাবে তৈরি ও কাস্টমার খাতায় সেভ করা হয়েছে!");
}

 function shareToWhatsApp() {
 const bill_text = document.getElementById('bill_output').textContent;
 if (!bill_text.trim()) { alert("Please generate a bill first to share."); return; }
 const encoded = encodeURIComponent(bill_text);
 window.open(`https://wa.me/?text=${encoded}`, '_blank');
 }



// ========================================================
 // SEPARATE SUPPLIER MATERIAL REQUISITION / PURCHASE ORDER SLIP
 // ========================================================
 function exportMatPurchasePdf(filename, title, buckets, glassDict) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate material purchase orders.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const keys = Object.keys(buckets);
 if (keys.length === 0) {
 alert("No material calculated yet! Please calculate windows first.");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 const po_no = "PO-" + Math.floor(1000 + Math.random() * 9000);

 // Header Banner (Teal / Forest Theme)
 doc.setFillColor(15, 118, 110);
 doc.rect(0, 0, 210, 32, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(16);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 105, 12, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8.5);
 doc.setTextColor(204, 251, 241);
 doc.text(`${addr} | Contact: ${contact}`, 105, 18, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(11);
 doc.setTextColor(254, 240, 138); // Yellow
 doc.text(`MATERIAL PURCHASE ORDER & REQUISITION SLIP (${title.toUpperCase()})`, 105, 26, { align: "center" });

 // Sub-bar
 doc.setFillColor(240, 253, 250);
 doc.rect(14, 34, 182, 7, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(19, 78, 74);
 doc.text(`ORDER REF NO: ${po_no}`, 18, 39);
 doc.text(`DATE OF REQUISITION: ${today}`, 192, 39, { align: "right" });

 let currentY = 44;

 // Table 1: Aluminium Profile Sticks To Buy
 const profileRows = [];
 let totalSticks = 0;
 let totalRunningFt = 0;

 keys.forEach((pName, idx) => {
 const pieces = buckets[pName];
 if (!pieces || pieces.length === 0) return;
 const plan = optimizeCuttingPlan(pieces);
 totalSticks += plan.sticks_needed;
 const runFt = Math.round((pieces.reduce((a, b) => a + b, 0) / 12) * 10) / 10;
 totalRunningFt += runFt;
 const estWeight = Math.round((runFt * 0.45) * 10) / 10; // Approx 0.45 kg per ft

 profileRows.push([
 idx + 1,
 pName,
 "Powder Coated / Anodized",
 `${plan.sticks_needed} Pcs (${plan.standard_length_ft} Ft / stick)`,
 `${runFt} Ft`,
 `~${estWeight} Kg`
 ]);
 });

 profileRows.push([
 { content: "TOTAL PROFILE REQUIREMENT", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 253, 250] } },
 { content: `${totalSticks} Sticks`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } },
 { content: `${Math.round(totalRunningFt)} Ft`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } },
 { content: `~${Math.round(totalRunningFt * 0.45)} Kg`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [254, 240, 138] } }
 ]);

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Aluminium Section / Profile Name', 'Color / Finish', 'Sticks To Buy', 'Total Running Ft', 'Est. Weight']],
 body: profileRows,
 theme: 'grid',
 headStyles: {
 fillColor: [15, 118, 110],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [153, 246, 228],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 55, fontStyle: 'bold' },
 2: { cellWidth: 40 },
 3: { cellWidth: 35, fontStyle: 'bold', halign: 'center' },
 4: { cellWidth: 22, halign: 'center' },
 5: { cellWidth: 18, halign: 'center', fontStyle: 'bold' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 8;

 // Table 2: Glass Requirement Breakdown (if available)
 const gKeys = Object.keys(glassDict || {});
 if (gKeys.length > 0) {
 if (currentY > 220) { doc.addPage(); currentY = 16; }

 const glassRows = gKeys.map((sz, i) => {
 const qty = glassDict[sz];
 return [i + 1, "Float / Clear / Tinted Glass", sz, `${qty} Pcs`];
 });

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Glass Order Specifications', 'Glass Size (H x W)', 'Quantity Needed']],
 body: glassRows,
 theme: 'grid',
 headStyles: {
 fillColor: [2, 132, 199],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 2, lineColor: [186, 230, 253] },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 70 },
 2: { cellWidth: 65, fontStyle: 'bold', halign: 'center' },
 3: { cellWidth: 35, fontStyle: 'bold', halign: 'center' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 8;
 }

 // Hardware Requisition Checklist
 if (currentY > 230) { doc.addPage(); currentY = 16; }

 const hwItems = [
 ["1", "Heavy Bearing Rollers / Nylon Wheels", "As per shutter count (2 per sash)", "Verified [ ]"],
 ["2", "Star Lock / Concealed Touch Lock", "1 per window / 2 for center open", "Verified [ ]"],
 ["3", "EPDM Gasket / Rubber Beading", "Perimeter coverage as per glass size", "Verified [ ]"],
 ["4", "Silicon Sealant Tubes (Clear / Black)", "Weather sealing as required", "Verified [ ]"],
 ["5", "Self-Tapping SS Screws / Fasteners", "1 Box (1/2 inch & 1 inch Screws)", "Verified [ ]"],
 ];

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Hardware & Accessories Item', 'Estimated Requirement', 'Warehouse Check']],
 body: hwItems,
 theme: 'grid',
 headStyles: {
 fillColor: [217, 119, 6], // Amber
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 2, lineColor: [253, 230, 138] },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 75, fontStyle: 'bold' },
 2: { cellWidth: 65 },
 3: { cellWidth: 30, halign: 'center', fontStyle: 'bold' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 12;
 if (currentY > 255) { doc.addPage(); currentY = 20; }

 // Signatures
 doc.autoTable({
 startY: currentY,
 head: [['STORE IN-CHARGE / REQUISITION BY', 'WHOLESALE SUPPLIER / DISPATCH STAMP']],
 body: [[
 `Prepared By: _______________________\\n\\nFor: ${shop_name}\\n\\nPhone: ${contact}`,
 "Received & Dispatched By: _______________________\\n\\nSupplier Stamp / Memo No: _______________________\\n\\nDate: _______________________"
 ]],
 theme: 'grid',
 headStyles: {
 fillColor: [241, 245, 249],
 textColor: [51, 65, 85],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 3, lineColor: [203, 213, 225] }
 });

 doc.setFontSize(7);
 doc.setTextColor(100, 116, 139);
 doc.text("-- Generated via Smart Worker Pro Material Requisition Management System --", 105, 290, { align: "center" });

 doc.save(`${filename}.pdf`);
 }

 function exportBillPdf() {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate PDF bills.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 if (billItems.length === 0) { alert("Please add items to generate a bill first."); return; }
 const { jsPDF } = window.jspdf;
 const doc = new jsPDF();

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact_info = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";

 const c_name = document.getElementById('q_name').value || 'Customer';
 const c_phone = document.getElementById('q_phone').value || 'N/A';
 const c_addr = document.getElementById('q_addr').value || 'N/A';
 const bill_stage = document.getElementById('q_stage').value;
 const today = new Date().toLocaleDateString('en-GB');

 doc.setFillColor(74, 20, 140);
 doc.rect(0, 0, 210, 36, 'F');
 const customLogo = localStorage.getItem('sw_custom_logo');
 if (customLogo) {
 try {
 doc.addImage(customLogo, 14, 5, 26, 26);
 } catch (e) {}
 }
 doc.setFont("helvetica", "bold");
 doc.setFontSize(16);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 14, 15);

 doc.setFont("helvetica", "normal");
 doc.setFontSize(9);
 doc.setTextColor(220, 220, 220);
 doc.text(`${addr} | Contact: ${contact_info}`, 14, 22);
 doc.text("JOB CARD / ESTIMATION BILL", 14, 28);

 doc.setTextColor(0, 0, 0);
 doc.setFont("helvetica", "bold");
 doc.setFontSize(10);
 doc.text("Bill To:", 14, 46);
 doc.setFont("helvetica", "normal");
 doc.text(`Name: ${c_name}`, 14, 52);
 doc.text(`Phone: ${c_phone}`, 14, 57);
 doc.text(`Address: ${c_addr}`, 14, 62);

 doc.text(`Date: ${today}`, 150, 46);
 doc.text(`Stage: ${bill_stage}`, 150, 52);
 doc.text(`Invoice No: SW-${Math.floor(1000 + Math.random() * 9000)}`, 150, 57);

 const tableData = billItems.map((itm, i) => [
 i + 1,
 `${itm.location ? '['+itm.location+'] ' : ''}${itm.type}\\nSpecs: ${itm.color} (${itm.thickness})\\nGlass: ${itm.glass_thick} ${itm.glass_type}${itm.toughened ? ' [TOUGHENED]' : ''}\\nSize: ${itm.h} x ${itm.w} ${itm.unit} @ Rs.${itm.rate}`,
 itm.qty,
 itm.area.toFixed(1),
 `Rs ${itm.rate}`,
 `Rs ${itm.price.toFixed(2)}`
 ]);

 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const net_total = grand_total - discount;
 const gst_amount = net_total * (gst_pct / 100);
 const final_total = net_total + gst_amount + extra_charge;
 const advance_paid = safeEval(document.getElementById('q_advance').value);
 const due_amount = final_total - advance_paid;

 doc.autoTable({
 startY: 68,
 head: [['SN', 'Description', 'Qty', 'Sq.Ft', 'Rate', 'Amount']],
 body: tableData,
 theme: 'striped',
 headStyles: { fillColor: [225, 190, 231], textColor: [0, 0, 0], fontStyle: 'bold' },
 styles: { fontSize: 8.5 }
 });

 const finalY = doc.lastAutoTable.finalY + 8;
 doc.setFontSize(9);
 doc.text(`Sub Total: Rs ${grand_total.toFixed(2)}`, 140, finalY);
 if (discount > 0) doc.text(`Discount: -Rs ${discount.toFixed(2)}`, 140, finalY + 5);
 if (gst_pct > 0) doc.text(`GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}`, 140, finalY + 10);
 if (extra_charge > 0) doc.text(`Transport/Labor: +Rs ${extra_charge.toFixed(2)}`, 140, finalY + 15);

 doc.setFont("helvetica", "bold");
 doc.text(`GRAND TOTAL: Rs ${final_total.toFixed(2)}`, 140, finalY + 22);
 doc.setFont("helvetica", "normal");
 doc.text(`Advance Paid: -Rs ${advance_paid.toFixed(2)}`, 140, finalY + 27);
 doc.setFont("helvetica", "bold");
 doc.setTextColor(200, 0, 0);
 doc.text(`DUE AMOUNT: Rs ${due_amount.toFixed(2)}`, 140, finalY + 34);

 doc.setTextColor(120, 120, 120);
 doc.setFont("helvetica", "normal");
 doc.setFontSize(7.5);
 doc.text("TERMS & CONDITIONS: 50% Advance with order. Balance on delivery. Cut materials cannot be returned.", 14, finalY + 44);
 doc.text(`Customer Signature: ___________________ Authorized Signature (${shop_name}): ___________________`, 14, finalY + 52);

 doc.save(`Invoice_${c_name.replace(/\s+/g, '_')}.pdf`);
 }

 // ========================================================
 // 10. PDF EXPORTS FOR CUT SIZES & GLASS LIST
 // ========================================================

// ========================================================
 // PURE JS SHA256 & ACTIVATION LICENSING CORE (100% PYTHON EQUIVALENT)
 // ========================================================
 function sha256(ascii) {
 function rightRotate(value, amount) { return (value>>>amount) | (value<<(32 - amount)); }
 var mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length', i, j, result = '', words = [];
 var asciiBitLength = ascii[lengthProperty]*8, hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [];
 var primeCounter = k[lengthProperty], isComposite = {};
 for (var candidate = 2; primeCounter < 64; candidate++) {
 if (!isComposite[candidate]) {
 for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
 hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
 k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
 }
 }
 ascii += '\\x80';
 while (ascii[lengthProperty]%64 - 56) ascii += '\\x00';
 for (i = 0; i < ascii[lengthProperty]; i++) {
 j = ascii.charCodeAt(i);
 if (j>>8) return;
 words[i>>2] |= j << ((3 - i)%4)*8;
 }
 words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
 words[words[lengthProperty]] = (asciiBitLength);
 for (j = 0; j < words[lengthProperty];) {
 var w = words.slice(j, j += 16), oldHash = hash;
 hash = hash.slice(0, 8);
 for (i = 0; i < 64; i++) {
 var i2 = i + j;
 var w15 = w[i - 15], w2 = w[i - 2];
 var a = hash[0], e = hash[4];
 var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e&hash[5])^((~e)&hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)))|0);
 var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
 hash = [(temp1 + temp2)|0].concat(hash);
 hash[4] = (hash[4] + temp1)|0;
 }
 for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i])|0;
 }
 for (i = 0; i < 8; i++) {
 for (j = 3; j + 1; j--) {
 var b = (hash[i]>>(j*8))&255;
 result += ((b < 16) ? 0 : '') + b.toString(16);
 }
 }
 return result;
 }

 const ADMIN_WHATSAPP_NUMBER = "919239413517";
 const SALTS = {
 "KARIGAR_1M": "SAHEB_1M_PRO",
 "KARIGAR_1Y": "SAHEB_1Y_PRO",
 "TEAM_1M": "SAHEB_TEAM_1M_PRO",
 "TEAM_1Y": "SAHEB_TEAM_1Y_PRO",
 "CORP_1M": "SAHEB_CORP_1M_PRO",
 "CORP_1Y": "SAHEB_CORP_1Y_PRO",
 "1M": "SAHEB_1M_PRO",
 "1Y": "SAHEB_1Y_PRO"
 };
 const SPECIAL_PROMO_CODE = "SMARTWORKER_ADMIN_100";


function addTeamMember() {
 const name = document.getElementById('team_member_name').value.trim();
 const phone = document.getElementById('team_member_phone').value.trim();
 if (!name || !phone) { alert("Please enter member name and phone/gmail."); return; }

 let members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 if (members.length >= 50) { alert("Maximum 50 team members limit reached!"); return; }

 members.push({ name, phone, added_on: new Date().toLocaleDateString('en-GB') });
 localStorage.setItem('sw_team_members', JSON.stringify(members));

 document.getElementById('team_member_name').value = "";
 document.getElementById('team_member_phone').value = "";
 renderTeamMembers();
 alert(`Team member ${name} added successfully! (${members.length}/50)`);
 }

 function removeTeamMember(idx) {
 let members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 members.splice(idx, 1);
 localStorage.setItem('sw_team_members', JSON.stringify(members));
 renderTeamMembers();
 }

 function renderTeamMembers() {
 const members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 const container = document.getElementById('teamMemberList');
 const badge = document.getElementById('teamCountBadge');

 if (badge) badge.textContent = `${members.length} / 50 Active`;
 if (!container) return;

 if (members.length === 0) {
 container.innerHTML = "No team members added yet.";
 return;
 }

 let html = "";
 members.forEach((m, i) => {
 html += `<div style="display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid #1e293b;">
 <span>${i+1}. <b>${m.name}</b> (${m.phone})</span>
 <button onclick="removeTeamMember(${i})" style="background:#ef4444; color:#fff; border:none; border-radius:3px; padding:1px 5px; font-size:0.65rem; cursor:pointer;">✕</button>
 </div>`;
 });
 container.innerHTML = html;
 }

 function getDeviceId() {
 let devId = localStorage.getItem('sw_device_id');
 if (!devId) {
 const raw = navigator.userAgent + Date.now() + Math.random().toString();
 devId = sha256(raw).substring(0, 8).toUpperCase();
 localStorage.setItem('sw_device_id', devId);
 }
 return devId;
 }

 function checkActivationType(deviceId, inputKey) {
 inputKey = inputKey.trim().toUpperCase();
 if (inputKey === SPECIAL_PROMO_CODE) return "LIFETIME";
 for (const duration in SALTS) {
 const expectedKey = sha256(deviceId + SALTS[duration]).substring(0, 8).toUpperCase();
 if (inputKey === expectedKey) return duration;
 }
 return null;
 }

 function isAppActivated() {
  return true; // Lifetime Pro Licensed for Saheb Ghanti
}

 function updateActivationScreenUI() {
 const devId = getDeviceId();
 const dIdElem = document.getElementById('actDeviceId');
 if (dIdElem) dIdElem.value = devId;

 const banner = document.getElementById('actStatusBanner');
 if (banner) {
 if (isAppActivated()) {
 banner.style.background = "#2e7d32";
 const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
 const expStr = lic.key === SPECIAL_PROMO_CODE ? "Lifetime" : lic.expiry_date;
 const cat = lic.plan_category || (lic.is_corp ? "CORPORATE" : "KARIGAR");
 const maxU = lic.max_users || 1;
 const teamSec = document.getElementById('corporateTeamSection');

 if (cat === "CORPORATE" || cat === "LIFETIME") {
 banner.style.background = "#7c3aed";
 banner.textContent = `Status: CORPORATE PRO (50 USERS) - Active till ${expStr}`;
 if (teamSec) teamSec.style.display = 'block';
 renderTeamMembers();
 } else if (cat === "WORKSHOP_TEAM") {
 banner.style.background = "#16a34a";
 banner.textContent = `Status: WORKSHOP TEAM PRO (10 USERS) - Active till ${expStr}`;
 if (teamSec) teamSec.style.display = 'block';
 renderTeamMembers();
 } else {
 banner.style.background = "#0284c7";
 banner.textContent = `Status: KARIGAR PRO (Single User) - Active till ${expStr}`;
 if (teamSec) teamSec.style.display = 'none';
 }
 } else {
 banner.style.background = "#37474f";
 banner.textContent = "Status: FREE PLAN (Limited Features)";
 }
 }
 }

 function copyDeviceId() {
 const dId = getDeviceId();
 navigator.clipboard.writeText(dId).then(() => {
 const btn = document.getElementById('actCopyBtn');
 btn.textContent = "COPIED!";
 btn.style.background = "#2e7d32";
 setTimeout(() => {
 btn.textContent = "COPY";
 btn.style.background = "#1976d2";
 }, 2000);
 }).catch(() => {
 alert(`Your Device ID: ${dId}`);
 });
 }

 function activateAppKey() {
 const inputKey = document.getElementById('activationInput').value.trim();
 const deviceId = getDeviceId();
 const durationType = checkActivationType(deviceId, inputKey);

 if (durationType) {
 let daysToAdd = 30;
 let planCategory = "KARIGAR";
 let maxUsers = 1;

 if (durationType === "KARIGAR_1M" || durationType === "1M") { daysToAdd = 30; maxUsers = 1; planCategory = "KARIGAR"; }
 else if (durationType === "KARIGAR_1Y" || durationType === "1Y") { daysToAdd = 365; maxUsers = 1; planCategory = "KARIGAR"; }
 else if (durationType === "TEAM_1M") { daysToAdd = 30; maxUsers = 10; planCategory = "WORKSHOP_TEAM"; }
 else if (durationType === "TEAM_1Y") { daysToAdd = 365; maxUsers = 10; planCategory = "WORKSHOP_TEAM"; }
 else if (durationType === "CORP_1M") { daysToAdd = 30; maxUsers = 50; planCategory = "CORPORATE"; }
 else if (durationType === "CORP_1Y") { daysToAdd = 365; maxUsers = 50; planCategory = "CORPORATE"; }
 else if (durationType === "LIFETIME") { daysToAdd = 36500; maxUsers = 50; planCategory = "LIFETIME"; }

 const expiry = new Date();
 expiry.setDate(expiry.getDate() + daysToAdd);
 const expiryStr = expiry.toISOString().split('T')[0];

 localStorage.setItem('sw_license', JSON.stringify({
 key: inputKey.toUpperCase(),
 plan: durationType,
 plan_category: planCategory,
 max_users: maxUsers,
 expiry_date: expiryStr
 }));

 alert(`PRO Activated Successfully! Valid till: ${durationType === 'LIFETIME' ? 'Lifetime' : expiryStr}`);
 updateActivationScreenUI();
 goHome();
 } else {
 alert("Invalid Activation Key! Please contact Smart Worker Aluminium.");
 }
 }

 function subscribeViaWhatsApp(plan) {
 const deviceId = getDeviceId();
 let planStr = "Smart Worker PRO";
 if (plan === "Karigar_Monthly") planStr = "Karigar Plan (Single User - Rs. 99/Month)";
 else if (plan === "Karigar_Annual") planStr = "Karigar Plan (Single User - Rs. 799/Year)";
 else if (plan === "Workshop_Monthly") planStr = "Workshop Team Plan (10 Users - Rs. 499/Month)";
 else if (plan === "Workshop_Annual") planStr = "Workshop Team Plan (10 Users - Rs. 3,999/Year)";
 else if (plan === "Corporate_Monthly") planStr = "Corporate Enterprise Plan (50 Users - Rs. 1,499/Month)";
 else if (plan === "Corporate_Annual") planStr = "Corporate Enterprise Plan (50 Users - Rs. 14,999/Year)";

 const msg = `Hello Saheb Da, I want to activate Smart Worker PRO (${planStr}). My Device ID: ${deviceId}`;
 const encoded = encodeURIComponent(msg);
 window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
 }



// ========================================================
 // PROFESSIONAL REPORTLAB-STYLE TABULAR PDF GENERATOR
 // ========================================================

// ========================================================
 // CUSTOM WORKSHOP BRANDING (LOGO & PAYMENT QR UPLOAD)
 // ========================================================
 function uploadShopLogo(input) {
 if (input.files && input.files[0]) {
 const reader = new FileReader();
 reader.onload = function(e) {
 const base64 = e.target.result;
 localStorage.setItem('sw_custom_logo', base64);
 renderBrandingPreviews();
 loadSavedProfile();
 alert("Shop logo uploaded successfully!");
 };
 reader.readAsDataURL(input.files[0]);
 }
 }

 function removeShopLogo() {
 localStorage.removeItem('sw_custom_logo');
 renderBrandingPreviews();
 loadSavedProfile();
 alert("Shop logo removed successfully.");
 }

 function uploadPaymentQr(input) {
 if (input.files && input.files[0]) {
 const reader = new FileReader();
 reader.onload = function(e) {
 const base64 = e.target.result;
 localStorage.setItem('sw_custom_qr', base64);
 renderBrandingPreviews();
 alert("Payment QR Code uploaded successfully!");
 };
 reader.readAsDataURL(input.files[0]);
 }
 }

 function removePaymentQr() {
 localStorage.removeItem('sw_custom_qr');
 renderBrandingPreviews();
 alert("Payment QR Code removed successfully.");
 }

 function renderBrandingPreviews() {
 const logo = localStorage.getItem('sw_custom_logo');
 const logoBox = document.getElementById('logoPreviewBox');
 const logoImg = document.getElementById('logoPreviewImg');
 if (logo && logoBox && logoImg) {
 logoImg.src = logo;
 logoBox.style.display = 'flex';
 } else if (logoBox) {
 logoBox.style.display = 'none';
 }

 const qr = localStorage.getItem('sw_custom_qr');
 const qrBox = document.getElementById('qrPreviewBox');
 const qrImg = document.getElementById('qrPreviewImg');
 if (qr && qrBox && qrImg) {
 qrImg.src = qr;
 qrBox.style.display = 'flex';
 } else if (qrBox) {
 qrBox.style.display = 'none';
 }
 }


 // ========================================================
 // ADVANCED WORKSHOP CUTTING JOB CARD (ALL 6 SPECIFICATIONS)
 // 1. Window-by-Window Blocks
 // 2. Cut Angle / Degree (45° Miter vs 90° Straight)
 // 3. Pencil Tick Checkboxes [ ]
 // 4. Step-by-Step Stick Cutting Sequences
 // 5. Highlighted Glass & Hardware Boxes
 // 6. Quality Check & Master Signatures
 // ========================================================



 // ========================================================
 // PROFESSIONAL GST INVOICE & QUOTATION BILL PDF
 // ========================================================

// ========================================================
 // SEPARATE SUPPLIER MATERIAL REQUISITION / PURCHASE ORDER SLIP
 // ========================================================
 function exportMatPurchasePdf(filename, title, buckets, glassDict) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate material purchase orders.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const keys = Object.keys(buckets);
 if (keys.length === 0) {
 alert("No material calculated yet! Please calculate windows first.");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 const po_no = "PO-" + Math.floor(1000 + Math.random() * 9000);

 // Header Banner (Teal / Forest Theme)
 doc.setFillColor(15, 118, 110);
 doc.rect(0, 0, 210, 32, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(16);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 105, 12, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8.5);
 doc.setTextColor(204, 251, 241);
 doc.text(`${addr} | Contact: ${contact}`, 105, 18, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(11);
 doc.setTextColor(254, 240, 138); // Yellow
 doc.text(`MATERIAL PURCHASE ORDER & REQUISITION SLIP (${title.toUpperCase()})`, 105, 26, { align: "center" });

 // Sub-bar
 doc.setFillColor(240, 253, 250);
 doc.rect(14, 34, 182, 7, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(19, 78, 74);
 doc.text(`ORDER REF NO: ${po_no}`, 18, 39);
 doc.text(`DATE OF REQUISITION: ${today}`, 192, 39, { align: "right" });

 let currentY = 44;

 // Table 1: Aluminium Profile Sticks To Buy
 const profileRows = [];
 let totalSticks = 0;
 let totalRunningFt = 0;

 keys.forEach((pName, idx) => {
 const pieces = buckets[pName];
 if (!pieces || pieces.length === 0) return;
 const plan = optimizeCuttingPlan(pieces);
 totalSticks += plan.sticks_needed;
 const runFt = Math.round((pieces.reduce((a, b) => a + b, 0) / 12) * 10) / 10;
 totalRunningFt += runFt;
 const estWeight = Math.round((runFt * 0.45) * 10) / 10; // Approx 0.45 kg per ft

 profileRows.push([
 idx + 1,
 pName,
 "Powder Coated / Anodized",
 `${plan.sticks_needed} Pcs (${plan.standard_length_ft} Ft / stick)`,
 `${runFt} Ft`,
 `~${estWeight} Kg`
 ]);
 });

 profileRows.push([
 { content: "TOTAL PROFILE REQUIREMENT", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 253, 250] } },
 { content: `${totalSticks} Sticks`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } },
 { content: `${Math.round(totalRunningFt)} Ft`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } },
 { content: `~${Math.round(totalRunningFt * 0.45)} Kg`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [254, 240, 138] } }
 ]);

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Aluminium Section / Profile Name', 'Color / Finish', 'Sticks To Buy', 'Total Running Ft', 'Est. Weight']],
 body: profileRows,
 theme: 'grid',
 headStyles: {
 fillColor: [15, 118, 110],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [153, 246, 228],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 55, fontStyle: 'bold' },
 2: { cellWidth: 40 },
 3: { cellWidth: 35, fontStyle: 'bold', halign: 'center' },
 4: { cellWidth: 22, halign: 'center' },
 5: { cellWidth: 18, halign: 'center', fontStyle: 'bold' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 8;

 // Table 2: Glass Requirement Breakdown (if available)
 const gKeys = Object.keys(glassDict || {});
 if (gKeys.length > 0) {
 if (currentY > 220) { doc.addPage(); currentY = 16; }

 const glassRows = gKeys.map((sz, i) => {
 const qty = glassDict[sz];
 return [i + 1, "Float / Clear / Tinted Glass", sz, `${qty} Pcs`];
 });

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Glass Order Specifications', 'Glass Size (H x W)', 'Quantity Needed']],
 body: glassRows,
 theme: 'grid',
 headStyles: {
 fillColor: [2, 132, 199],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 2, lineColor: [186, 230, 253] },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 70 },
 2: { cellWidth: 65, fontStyle: 'bold', halign: 'center' },
 3: { cellWidth: 35, fontStyle: 'bold', halign: 'center' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 8;
 }

 // Hardware Requisition Checklist
 if (currentY > 230) { doc.addPage(); currentY = 16; }

 const hwItems = [
 ["1", "Heavy Bearing Rollers / Nylon Wheels", "As per shutter count (2 per sash)", "Verified [ ]"],
 ["2", "Star Lock / Concealed Touch Lock", "1 per window / 2 for center open", "Verified [ ]"],
 ["3", "EPDM Gasket / Rubber Beading", "Perimeter coverage as per glass size", "Verified [ ]"],
 ["4", "Silicon Sealant Tubes (Clear / Black)", "Weather sealing as required", "Verified [ ]"],
 ["5", "Self-Tapping SS Screws / Fasteners", "1 Box (1/2 inch & 1 inch Screws)", "Verified [ ]"],
 ];

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Hardware & Accessories Item', 'Estimated Requirement', 'Warehouse Check']],
 body: hwItems,
 theme: 'grid',
 headStyles: {
 fillColor: [217, 119, 6], // Amber
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 2, lineColor: [253, 230, 138] },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 75, fontStyle: 'bold' },
 2: { cellWidth: 65 },
 3: { cellWidth: 30, halign: 'center', fontStyle: 'bold' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 12;
 if (currentY > 255) { doc.addPage(); currentY = 20; }

 // Signatures
 doc.autoTable({
 startY: currentY,
 head: [['STORE IN-CHARGE / REQUISITION BY', 'WHOLESALE SUPPLIER / DISPATCH STAMP']],
 body: [[
 `Prepared By: _______________________\\n\\nFor: ${shop_name}\\n\\nPhone: ${contact}`,
 "Received & Dispatched By: _______________________\\n\\nSupplier Stamp / Memo No: _______________________\\n\\nDate: _______________________"
 ]],
 theme: 'grid',
 headStyles: {
 fillColor: [241, 245, 249],
 textColor: [51, 65, 85],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 3, lineColor: [203, 213, 225] }
 });

 doc.setFontSize(7);
 doc.setTextColor(100, 116, 139);
 doc.text("-- Generated via Smart Worker Pro Material Requisition Management System --", 105, 290, { align: "center" });

 doc.save(`${filename}.pdf`);
 }

 function exportBillPdf() {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate PDF bills.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 if (billItems.length === 0) {
 alert("Please add items to generate a bill first.");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact_info = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const gst_no = profile.gst ? ` | GSTIN: ${profile.gst}` : "";
 const email_id = profile.email ? ` | Email: ${profile.email}` : "";

 const c_name = document.getElementById('q_name').value || 'Valued Customer';
 const c_phone = document.getElementById('q_phone').value || 'N/A';
 const c_addr = document.getElementById('q_addr').value || 'N/A';
 const client_gst = document.getElementById('q_client_gst') ? document.getElementById('q_client_gst').value.trim() : "";
 const site_addr = document.getElementById('q_site_addr') ? document.getElementById('q_site_addr').value.trim() : "";
 const pay_terms = document.getElementById('q_payment_terms') ? document.getElementById('q_payment_terms').value : "Standard Retail: 50% Advance with order, Balance on delivery";
 const bill_stage = document.getElementById('q_stage').value;
 const today = new Date().toLocaleDateString('en-GB');
 const inv_no = `SW-${Math.floor(1000 + Math.random() * 9000)}`;

 // 1. Royal Purple Header Banner
 doc.setFillColor(74, 20, 140);
 doc.rect(0, 0, 210, 36, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(17);
 doc.setTextColor(255, 215, 0); // Gold
 doc.text(shop_name, 105, 14, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8.5);
 doc.setTextColor(240, 240, 240);
 doc.text(`${addr} | Contact: ${contact_info}${email_id}${gst_no}`, 105, 21, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(11);
 doc.setTextColor(255, 255, 255);
 doc.text(`TAX INVOICE / ESTIMATION BILL (${bill_stage.toUpperCase()})`, 105, 29, { align: "center" });

 // 2. Customer & Invoice Details Cards
 doc.setFillColor(248, 250, 252);
 doc.setDrawColor(203, 213, 225);
 doc.roundedRect(14, 40, 105, 24, 3, 3, 'FD');
 doc.roundedRect(123, 40, 73, 24, 3, 3, 'FD');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(8.5);
 doc.setTextColor(74, 20, 140);
 doc.text("BILLED TO / CUSTOMER DETAILS:", 18, 46);
 doc.text("INVOICE SUMMARY:", 127, 46);

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(30, 41, 59);
 doc.text(`Client: ${c_name}`, 18, 51);
 doc.text(`Contact: ${c_phone}${client_gst ? ' | GSTIN: ' + client_gst : ''}`, 18, 55.5);
 doc.text(`Billing: ${c_addr}`, 18, 60);
 if (site_addr) doc.text(`Site: ${site_addr}`, 18, 64.5);

 doc.text(`Invoice No: ${inv_no}`, 127, 51);
 doc.text(`Date of Issue: ${today}`, 127, 55.5);
 doc.text(`Type: ${bill_stage.toUpperCase()}`, 127, 60);
 doc.text(`State Code: 19 (WB)`, 127, 64.5);

 // 3. Items Table
 const tableData = billItems.map((itm, i) => {
 let hsn = "HSN 7610";
 if (itm.type.includes("Ceiling")) hsn = "HSN 6809";
 else if (itm.type.includes("Glass")) hsn = "HSN 7005";

 return [
 i + 1,
 `${itm.location ? '[' + itm.location + '] ' : ''}${itm.type}\\n• Technical: ${itm.color} (${itm.thickness})\\n• Glass: ${itm.glass_thick} ${itm.glass_type}${itm.toughened ? ' [TOUGHENED]' : ''}\\n• Size: ${itm.h}' x ${itm.w}' ${itm.unit}`,
 hsn,
 itm.qty,
 `${itm.area.toFixed(1)} Sq.Ft`,
 `Rs. ${itm.rate.toFixed(0)}`,
 `Rs. ${itm.price.toFixed(2)}`
 ];
 });

 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const net_total = grand_total - discount;
 const gst_amount = net_total * (gst_pct / 100);
 const final_total = net_total + gst_amount + extra_charge;
 const advance_paid = safeEval(document.getElementById('q_advance').value);
 const due_amount = final_total - advance_paid;

 doc.autoTable({
 startY: 68,
 head: [['SN', 'Item Description & Technical Specifications', 'HSN/SAC', 'Qty', 'Sq.Ft', 'Rate / Sq.Ft', 'Total Amount']],
 body: tableData,
 theme: 'grid',
 headStyles: {
 fillColor: [225, 190, 231],
 textColor: [49, 13, 90],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [216, 180, 254],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 8, halign: 'center' },
 1: { cellWidth: 70 },
 2: { cellWidth: 18, halign: 'center', fontSize: 7 },
 3: { cellWidth: 12, halign: 'center' },
 4: { cellWidth: 20, halign: 'center' },
 5: { cellWidth: 24, halign: 'right' },
 6: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
 }
 });

 // 4. Financial Calculations Box
 const finalY = doc.lastAutoTable.finalY + 6;
 doc.setFillColor(250, 245, 255);
 doc.setDrawColor(225, 190, 231);
 doc.roundedRect(115, finalY, 81, 38, 2, 2, 'FD');
 const customQr = localStorage.getItem('sw_custom_qr');
 if (customQr) {
 try {
 doc.setFillColor(255, 255, 255);
 doc.setDrawColor(225, 190, 231);
 doc.roundedRect(14, finalY, 34, 38, 2, 2, 'FD');
 doc.addImage(customQr, 15, finalY + 2, 32, 32);
 doc.setFontSize(6.5);
 doc.setTextColor(74, 20, 140);
 doc.setFont("helvetica", "bold");
 doc.text("SCAN & PAY (UPI)", 31, finalY + 36, { align: "center" });
 } catch (e) {}
 }

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(50, 50, 50);

 let calcY = finalY + 5;
 doc.text("Items Sub Total:", 118, calcY);
 doc.text(`Rs. ${grand_total.toFixed(2)}`, 192, calcY, { align: "right" });

 if (discount > 0) {
 calcY += 5;
 doc.text("Special Discount:", 118, calcY);
 doc.text(`- Rs. ${discount.toFixed(2)}`, 192, calcY, { align: "right" });
 }
 if (gst_pct > 0) {
 calcY += 5;
 doc.text(`GST (${gst_pct}%):`, 118, calcY);
 doc.text(`+ Rs. ${gst_amount.toFixed(2)}`, 192, calcY, { align: "right" });
 }
 if (extra_charge > 0) {
 calcY += 5;
 doc.text("Transport / Labor:", 118, calcY);
 doc.text(`+ Rs. ${extra_charge.toFixed(2)}`, 192, calcY, { align: "right" });
 }

 calcY += 6;
 doc.setFont("helvetica", "bold");
 doc.setFontSize(9);
 doc.setTextColor(74, 20, 140);
 doc.text("NET GRAND TOTAL:", 118, calcY);
 doc.text(`Rs. ${final_total.toFixed(2)}`, 192, calcY, { align: "right" });

 calcY += 5;
 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(40, 40, 40);
 doc.text("Advance Received:", 118, calcY);
 doc.text(`- Rs. ${advance_paid.toFixed(2)}`, 192, calcY, { align: "right" });

 calcY += 6;
 doc.setFont("helvetica", "bold");
 doc.setFontSize(10);
 doc.setTextColor(198, 40, 40); // Red
 doc.text("BALANCE DUE:", 118, calcY);
 doc.text(`Rs. ${due_amount.toFixed(2)}`, 192, calcY, { align: "right" });

 // 5. Terms & Conditions Box
 // Amount in Words
 const wordsTxt = numberToWordsINR(final_total);
 doc.setFillColor(245, 243, 255);
 doc.rect(14, finalY + 40, 182, 6, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(74, 20, 140);
 doc.text(`Amount in Words: ${wordsTxt}`, 16, finalY + 44.5);

 // Bank Details Card (Left side under Amount in words)
 const bankY = finalY + 48;
 const bName = profile.bank_name || "State Bank of India";
 const bHolder = profile.bank_holder || shop_name;
 const bAcc = profile.bank_acc || "Not Configured";
 const bIfsc = profile.bank_ifsc || "SBIN0001234";
 const bBranch = profile.bank_branch || "Amta Branch";
 const upiVpa = profile.upi_id || contact.split(' ')[0] + "@upi";

 doc.setFillColor(250, 250, 250);
 doc.setDrawColor(203, 213, 225);
 doc.roundedRect(14, bankY, 95, 26, 2, 2, 'FD');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(30, 41, 59);
 doc.text("BANK DETAILS FOR NEFT / RTGS / CHEQUE:", 17, bankY + 4.5);
 doc.setFont("helvetica", "normal");
 doc.setFontSize(7);
 doc.text(`Bank: ${bName} | Branch: ${bBranch}`, 17, bankY + 9);
 doc.text(`Account Name: ${bHolder}`, 17, bankY + 13.5);
 doc.text(`Account No: ${bAcc}`, 17, bankY + 18);
 doc.text(`IFSC Code: ${bIfsc} | UPI: ${upiVpa}`, 17, bankY + 22.5);

 // Payment Terms Box (Right side)
 doc.roundedRect(112, bankY, 84, 26, 2, 2, 'FD');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(30, 41, 59);
 doc.text("PAYMENT MILESTONES & TERMS:", 115, bankY + 4.5);
 doc.setFont("helvetica", "normal");
 doc.setFontSize(6.8);
 const splitTerms = doc.splitTextToSize(pay_terms, 78);
 doc.text(splitTerms, 115, bankY + 9);
 doc.text("• Quotation validity: 15 Days from issue date.", 115, bankY + 20);
 doc.text("• Goods once cut/processed cannot be returned.", 115, bankY + 23.5);

 // Signatures
 const sigY = bankY + 33;
 doc.setFont("helvetica", "normal");
 doc.setFontSize(7.5);
 doc.setTextColor(70, 70, 70);
 doc.text("Customer / Architect Signature: _______________________", 16, sigY);
 doc.text(`Authorized Signatory (${shop_name}): _______________________`, 194, sigY, { align: "right" });

 doc.setFontSize(6.5);
 doc.setTextColor(100, 116, 139);
 doc.text("-- Computer Generated Commercial Tax Invoice • Smart Worker Pro Fabrication Systems --", 105, 290, { align: "center" });

 doc.save(`Invoice_${c_name.replace(/\s+/g, '_')}.pdf`);
 return;

 }
