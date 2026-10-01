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
