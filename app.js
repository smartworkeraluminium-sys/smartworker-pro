// =========================================================================
// SMART WORKER PRO - APPLICATION CONTROLLER & LIFECYCLE ROUTER
// Navigation, Workshop Profile, Language Engine, Lifetime License & Init
// =========================================================================

 function openScreen(screenName, title) {
 document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
 const target = document.getElementById(`screen-${screenName}`);
 if (target) target.classList.add('active');
 if (screenName === 'customer_lookup') {
   if (typeof renderCustomerKhataScreen === 'function') renderCustomerKhataScreen();
 }
 // Perfectly Centered Screen Title
 document.getElementById('screenTitle').innerHTML = `<span style="font-size:1.02rem; font-weight:800; color:#fbbf24; letter-spacing:0.4px; white-space:nowrap; text-align:center;">${title}</span>`;
 document.getElementById('topBackBtn').style.display = 'flex';
 // Hide Language Selector, Login & PRO badge on inner screens
 const rightActions = document.getElementById('topBarRightActions');
 if (rightActions) rightActions.style.display = 'none';
 document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
 if (screenName === 'dashboard') document.querySelectorAll('.nav-item')[1].classList.add('active');
 else if (screenName === 'history') document.querySelectorAll('.nav-item')[2].classList.add('active');
 else if (screenName === 'profile') document.querySelectorAll('.nav-item')[3].classList.add('active');
 window.scrollTo({ top: 0, behavior: 'smooth' });
 }

 function goHome() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const home = document.getElementById('screen-home');
  if (home) home.classList.add('active');
  const title = document.getElementById('screenTitle');
  if (title) title.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; gap:6px;"><img src="logo.png?v=2" alt="SWA" onerror="this.style.display=\'none\';" style="height:28px; width:auto; border-radius:4px; background:#fff; padding:1px;"> <span id="titleText" style="font-size:0.95rem; font-weight:800; color:#fbbf24; white-space:nowrap;">SMART WORKER PRO</span></div>';
  const back = document.getElementById('topBackBtn');
  if (back) back.style.display = 'none';
  const rightActions = document.getElementById('topBarRightActions');
  if (rightActions) rightActions.style.display = 'flex';
  const navItems = document.querySelectorAll('.nav-item');
  if (navItems && navItems.length > 0) {
    navItems.forEach(n => n.classList.remove('active'));
    navItems[0].classList.add('active');
  }
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e){}
}

 // Save and Load Settings

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
 // 11. DASHBOARD, HISTORY & PROFILE MANAGEMENT
 // ========================================================
 function loadDashboard() {
 const targetMonth = document.getElementById('dash_month').value;
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 const expenses = JSON.parse(localStorage.getItem('sw_expenses') || '[]');

 let sales_sum = 0.0, exp_sum = 0.0;
 let details_txt = `--- DETAILS FOR ${targetMonth} ---\\n\\n>> CUSTOMER BILLS (INCOME):\\n`;

 invoices.forEach(inv => {
 details_txt += `- ${inv.date} | ${inv.client} | Rs ${parseFloat(inv.amount).toFixed(2)}\\n`;
 sales_sum += parseFloat(inv.amount) || 0;
 });

 details_txt += `\\n>> MATERIAL PURCHASES (EXPENSE):\\n`;
 expenses.forEach(exp => {
 details_txt += `- ${exp.date} | ${exp.category} | ${exp.supplier} (Memo:${exp.memo_no}) | Rs ${parseFloat(exp.amount).toFixed(2)}\\n`;
 exp_sum += parseFloat(exp.amount) || 0;
 });

 document.getElementById('dashTotalSales').textContent = `Rs ${sales_sum.toLocaleString('en-IN', {minimumFractionDigits:2})}`;
 document.getElementById('dashTotalPurchases').textContent = `Rs ${exp_sum.toLocaleString('en-IN', {minimumFractionDigits:2})}`;
 document.getElementById('dashNetBalance').textContent = `Rs ${(sales_sum - exp_sum).toLocaleString('en-IN', {minimumFractionDigits:2})}`;
 document.getElementById('dash_details').textContent = details_txt;
 }

 function openExpenseModal() {
 document.getElementById('exp_supplier').value = "";
 document.getElementById('exp_memo').value = "";
 document.getElementById('exp_amt').value = "";
 document.getElementById('expenseModal').classList.add('active');
 }

 function closeExpenseModal() {
 document.getElementById('expenseModal').classList.remove('active');
 }

 function saveExpense() {
 const cat = document.getElementById('exp_cat').value;
 const supplier = document.getElementById('exp_supplier').value.trim() || "Unknown";
 const memo = document.getElementById('exp_memo').value.trim() || "N/A";
 const amt = safeEval(document.getElementById('exp_amt').value);
 if (amt === 0) { alert("Please enter a valid amount."); return; }

 const today = new Date().toLocaleDateString('en-GB');
 const expenses = JSON.parse(localStorage.getItem('sw_expenses') || '[]');
 expenses.unshift({ date: today, category: cat, supplier: supplier, memo_no: memo, amount: amt });
 localStorage.setItem('sw_expenses', JSON.stringify(expenses));

 closeExpenseModal();
 alert("Purchase saved successfully!");
 loadDashboard();
 }

 function loadHistory() {
 const h_type = document.getElementById('hist_spinner').value;
 let out_text = "";
 if (h_type === "Saved Measurements") {
 const rows = JSON.parse(localStorage.getItem('sw_measurements') || '[]');
 if (rows.length === 0) out_text = "No saved measurements found.";
 rows.forEach(row => {
 out_text += `Project ID #${row.id} | Date: ${row.date} | Type: ${row.project_type}\\n---------------------------------------------\\n${row.details}\\n=============================================\\n\\n`;
 });
 } else {
 const rows = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 if (rows.length === 0) out_text = "No saved bills found.";
 rows.forEach(row => {
 out_text += `Invoice #${row.id} | Date: ${row.date} | Client: ${row.client} | Total: Rs ${parseFloat(row.amount).toFixed(2)}\\n---------------------------------------------\\n${row.bill_text}\\n=============================================\\n\\n`;
 });
 }
 document.getElementById('history_out').textContent = out_text;
 }

 function backupDb() {
 const data = {
 profile: JSON.parse(localStorage.getItem('sw_profile') || '{}'),
 bill_settings: JSON.parse(localStorage.getItem('sw_bill_settings') || '{}'),
 measurements: JSON.parse(localStorage.getItem('sw_measurements') || '[]'),
 invoices: JSON.parse(localStorage.getItem('sw_invoices') || '[]'),
 customers: JSON.parse(localStorage.getItem('sw_customers') || '{}'),
 expenses: JSON.parse(localStorage.getItem('sw_expenses') || '[]')
 };
 const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
 const a = document.createElement('a');
 a.href = URL.createObjectURL(blob);
 a.download = `smartworker_backup_${Date.now()}.json`;
 a.click();
 }

 function confirmDeleteHistory() {
 const h_type = document.getElementById('hist_spinner').value;
 if (confirm(`Are you sure you want to delete all ${h_type}?`)) {
 if (h_type === "Saved Measurements") localStorage.removeItem('sw_measurements');
 else localStorage.removeItem('sw_invoices');
 loadHistory();
 }
 }

 function searchCustomer() {
 const pin = document.getElementById('lookup_pin').value.trim();
 if (!pin || pin.length < 4) { alert("Please enter at least a 4-digit PIN."); return; }
 const customers = JSON.parse(localStorage.getItem('sw_customers') || '{}');
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');

 let out_text = "";
 let found = false;
 for (const phone in customers) {
 if (phone.endsWith(pin)) {
 found = true;
 const cust = customers[phone];
 out_text += `--- CUSTOMER DETAILS ---\\nName: ${cust.name}\\nPhone: ${phone}\\nAddress: ${cust.address}\\n\\n--- PREVIOUS BILLS ---\\n`;
 const custBills = invoices.filter(inv => inv.phone === phone);
 if (custBills.length > 0) {
 custBills.forEach(b => {
 out_text += `Date: ${b.date} | Total: Rs ${parseFloat(b.amount).toFixed(2)}\\n${b.bill_text}\\n========================================\\n\\n`;
 });
 } else {
 out_text += "No saved bills found for this customer.\\n\\n";
 }
 }
 }
 if (!found) out_text = "No customer found with this PIN.";
 document.getElementById('lookup_results').textContent = out_text;
 }

 

 function loadSavedProfile() {

 const customLogo = localStorage.getItem('sw_custom_logo');
 if (customLogo) {
 const logoImgs = document.querySelectorAll('img[alt*="Logo"], img[alt="SWA"]');
 logoImgs.forEach(img => { img.src = customLogo; img.style.display = 'inline-block'; });
 }
 renderBrandingPreviews();

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (profile.name) {
 document.getElementById('homeGreeting').textContent = `Welcome, ${profile.name}!`;
 document.getElementById('set_name').value = profile.name;
 }
 if (profile.shop_name) {
 document.getElementById('homeShop').textContent = profile.shop_name.toUpperCase();
 document.getElementById('set_shop').value = profile.shop_name;
 }
 if (profile.phone) document.getElementById('set_phone').value = profile.phone;
 if (profile.email) document.getElementById('set_email').value = profile.email;
 if (profile.gst) document.getElementById('set_gst').value = profile.gst;
 if (profile.address) document.getElementById('set_address').value = profile.address;
 if (profile.bank_name && document.getElementById('set_bank_name')) document.getElementById('set_bank_name').value = profile.bank_name;
 if (profile.bank_holder && document.getElementById('set_bank_holder')) document.getElementById('set_bank_holder').value = profile.bank_holder;
 if (profile.bank_acc && document.getElementById('set_bank_acc')) document.getElementById('set_bank_acc').value = profile.bank_acc;
 if (profile.bank_ifsc && document.getElementById('set_bank_ifsc')) document.getElementById('set_bank_ifsc').value = profile.bank_ifsc;
 if (profile.bank_branch && document.getElementById('set_bank_branch')) document.getElementById('set_bank_branch').value = profile.bank_branch;
 if (profile.upi_id && document.getElementById('set_upi_id')) document.getElementById('set_upi_id').value = profile.upi_id;

 }

 function saveBillSettings() {
 const settings = {
 'Default Unit': document.getElementById('bs_unit').value,
 'GST': document.getElementById('bs_gst').value,
 'Discount': document.getElementById('bs_discount').value,
 'Sliding Mill/Natural (Rs/Kg)': document.getElementById('bs_sl_mill').value,
 'Sliding Anodized (Rs/Kg)': document.getElementById('bs_sl_anod').value,
 'Sliding Powder Coated (Rs/Kg)': document.getElementById('bs_sl_powder').value,
 'Sliding Wooden Finish (Rs/Kg)': document.getElementById('bs_sl_wooden').value,
 'Domal Mill/Natural (Rs/Kg)': document.getElementById('bs_dm_mill').value,
 'Domal Anodized (Rs/Kg)': document.getElementById('bs_dm_anod').value,
 'Domal Powder Coated (Rs/Kg)': document.getElementById('bs_dm_powder').value,
 'Domal Wooden Finish (Rs/Kg)': document.getElementById('bs_dm_wooden').value,
 'Door Master Material (Rs/Kg)': document.getElementById('bs_alu_door').value,
 'Partition Material (Rs/Kg)': document.getElementById('bs_alu_partition').value,
 'Casement Material (Rs/Kg)': document.getElementById('bs_alu_casement').value,
 'Clear Glass (Rs/Sq.Ft)': document.getElementById('bs_glass_clear').value,
 'Reflective Glass (Rs/Sq.Ft)': document.getElementById('bs_glass_refl').value,
 'Toughened Extra (Rs/Sq.Ft)': document.getElementById('bs_glass_tough').value,
 'Sliding Window Labour': document.getElementById('bs_labour_sliding').value,
 'Domal Window Labour': document.getElementById('bs_labour_domal').value,
 'Casement Labour': document.getElementById('bs_labour_casement').value,
 'Door Master Labour': document.getElementById('bs_labour_door').value,
 'Partition Labour': document.getElementById('bs_labour_partition').value,
 'Sliding Profit (%)': document.getElementById('bs_profit_sliding').value,
 'Domal Profit (%)': document.getElementById('bs_profit_domal').value,
 'Casement Profit (%)': document.getElementById('bs_profit_casement').value,
 'Door Profit (%)': document.getElementById('bs_profit_door').value
 };
 localStorage.setItem('sw_bill_settings', JSON.stringify(settings));
 alert("All Settings Saved Successfully!");
 }


function setupDb() {
 const defaultSettings = {
 'Default Unit': 'Feet',
 'GST': '0.0',
 'Discount': '0.0',
 'Sliding Mill/Natural (Rs/Kg)': '260.0',
 'Sliding Anodized (Rs/Kg)': '275.0',
 'Sliding Powder Coated (Rs/Kg)': '290.0',
 'Sliding Wooden Finish (Rs/Kg)': '345.0',
 'Domal Mill/Natural (Rs/Kg)': '280.0',
 'Domal Anodized (Rs/Kg)': '295.0',
 'Domal Powder Coated (Rs/Kg)': '310.0',
 'Domal Wooden Finish (Rs/Kg)': '365.0',
 'Door Master Material (Rs/Kg)': '270.0',
 'Partition Material (Rs/Kg)': '265.0',
 'Casement Material (Rs/Kg)': '275.0',
 'Clear Glass (Rs/Sq.Ft)': '35.0',
 'Reflective Glass (Rs/Sq.Ft)': '55.0',
 'Toughened Extra (Rs/Sq.Ft)': '25.0',
 'Sliding Window Labour': '35.0',
 'Domal Window Labour': '50.0',
 'Casement Labour': '60.0',
 'Door Master Labour': '65.0',
 'Partition Labour': '40.0',
 'Sliding Profit (%)': '15.0',
 'Domal Profit (%)': '20.0',
 'Casement Profit (%)': '25.0',
 'Door Profit (%)': '20.0'
 };
 let currentSettings = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 let changed = false;
 for (const k in defaultSettings) {
 if (currentSettings[k] === undefined) {
 currentSettings[k] = defaultSettings[k];
 changed = true;
 }
 }
 if (changed || !localStorage.getItem('sw_bill_settings')) {
 localStorage.setItem('sw_bill_settings', JSON.stringify(currentSettings));
 }
 }

 function loadBillSettings() {
 const s = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 if (s['Default Unit']) document.getElementById('bs_unit').value = s['Default Unit'];
 if (s['GST']) document.getElementById('bs_gst').value = s['GST'];
 if (s['Discount']) document.getElementById('bs_discount').value = s['Discount'];
 if (s['Sliding Mill/Natural (Rs/Kg)']) document.getElementById('bs_sl_mill').value = s['Sliding Mill/Natural (Rs/Kg)'];
 if (s['Sliding Anodized (Rs/Kg)']) document.getElementById('bs_sl_anod').value = s['Sliding Anodized (Rs/Kg)'];
 if (s['Sliding Powder Coated (Rs/Kg)']) document.getElementById('bs_sl_powder').value = s['Sliding Powder Coated (Rs/Kg)'];
 if (s['Sliding Wooden Finish (Rs/Kg)']) document.getElementById('bs_sl_wooden').value = s['Sliding Wooden Finish (Rs/Kg)'];
 if (s['Domal Mill/Natural (Rs/Kg)']) document.getElementById('bs_dm_mill').value = s['Domal Mill/Natural (Rs/Kg)'];
 if (s['Domal Anodized (Rs/Kg)']) document.getElementById('bs_dm_anod').value = s['Domal Anodized (Rs/Kg)'];
 if (s['Domal Powder Coated (Rs/Kg)']) document.getElementById('bs_dm_powder').value = s['Domal Powder Coated (Rs/Kg)'];
 if (s['Domal Wooden Finish (Rs/Kg)']) document.getElementById('bs_dm_wooden').value = s['Domal Wooden Finish (Rs/Kg)'];
 if (s['Door Master Material (Rs/Kg)']) document.getElementById('bs_alu_door').value = s['Door Master Material (Rs/Kg)'];
 if (s['Partition Material (Rs/Kg)']) document.getElementById('bs_alu_partition').value = s['Partition Material (Rs/Kg)'];
 if (s['Casement Material (Rs/Kg)']) document.getElementById('bs_alu_casement').value = s['Casement Material (Rs/Kg)'];
 if (s['Clear Glass (Rs/Sq.Ft)']) document.getElementById('bs_glass_clear').value = s['Clear Glass (Rs/Sq.Ft)'];
 if (s['Reflective Glass (Rs/Sq.Ft)']) document.getElementById('bs_glass_refl').value = s['Reflective Glass (Rs/Sq.Ft)'];
 if (s['Toughened Extra (Rs/Sq.Ft)']) document.getElementById('bs_glass_tough').value = s['Toughened Extra (Rs/Sq.Ft)'];
 if (s['Sliding Window Labour']) document.getElementById('bs_labour_sliding').value = s['Sliding Window Labour'];
 if (s['Domal Window Labour']) document.getElementById('bs_labour_domal').value = s['Domal Window Labour'];
 if (s['Casement Labour']) document.getElementById('bs_labour_casement').value = s['Casement Labour'];
 if (s['Door Master Labour']) document.getElementById('bs_labour_door').value = s['Door Master Labour'];
 if (s['Partition Labour']) document.getElementById('bs_labour_partition').value = s['Partition Labour'];
 if (s['Sliding Profit (%)']) document.getElementById('bs_profit_sliding').value = s['Sliding Profit (%)'];
 if (s['Domal Profit (%)']) document.getElementById('bs_profit_domal').value = s['Domal Profit (%)'];
 if (s['Casement Profit (%)']) document.getElementById('bs_profit_casement').value = s['Casement Profit (%)'];
 if (s['Door Profit (%)']) document.getElementById('bs_profit_door').value = s['Door Profit (%)'];
 }



 // COMPLETE 3-LANGUAGE TRANSLATION ENGINE (EN / BN / HI)
 // 100% Pure Language Segregation - No Mixed Text
 // ========================================================
 const I18N_DICT = {
 en: {
 title_app: "SMART WORKER PRO",
 nav_home: "Home",
 nav_dashboard: "Dashboard",
 nav_records: "Records",
 nav_profile: "Profile",
 nav_login: "LOGIN",
 welcome_prefix: "Welcome,",
 sec_fab_systems: "WINDOW & DOOR SYSTEMS",
 sec_business_billing: "BUSINESS & BILLING",
 mod_khata_title: "Site Measurement Khata",
 mod_khata_sub: "Digital Khata Book: Room Tracking, Auto Labour & Billing",
 mod_domal: "Domal Window",
 mod_sliding: "Sliding Window",
 mod_casement: "Custom Casement",
 mod_partition: "Partition & Door",
 mod_door: "Simple Door Option",
 mod_quotation: "Pro Quotation",
 mod_ceiling: "Ceiling Estimator",
 btn_open: "OPEN", btn_edit: "Edit",
 sub_domal: "27×65 / 45mm Section Cuts",
 sub_sliding: "2, 3, 4 Track & Interlock",
 sub_casement: "Z-Section & Openable Window",
 sub_partition: "Office Partition & Sheet Cuts",
 sub_door: "Hinged & Bathroom Door",
 sub_ceiling: "False Ceiling Grid & Perimeter",
 sub_quotation: "Client GST Invoice & PDF Bill",
 sub_customer_khata: "Client Balance & Records",
 mod_customer_khata: "Customer Khata",
 btn_clear: "CLEAR",
 btn_calculate: "+ CALCULATE",
 btn_save: "SAVE",
 btn_cut_pdf: "CUT PDF",
 btn_glass_pdf: "GLASS PDF",
 btn_order_slip: "ORDER SLIP",
 lbl_cutting_sizes: "CUTTING SIZES:",
 lbl_mat_purchase: "MATERIAL PURCHASE (AUTO-OPTIMIZED):",
 lbl_height: "Height:",
 lbl_width: "Width:",
 lbl_qty: "Quantity (Pcs):",
 lbl_unit: "Input Unit:",
 lbl_room_tag: "Room / Location Tag:",
 btn_add_khata: "ADD TO SITE KHATA",
 btn_process_all: "PROCESS ALL MULTI-PRODUCT CUTS",
 btn_khata_master_pdf: "GENERATE SITE KHATA MASTER PDF",
 btn_client_bill: "CLIENT BILL",
 btn_generate_bill: "GENERATE BILL",
 btn_save_bill: "SAVE BILL",
 btn_pdf_bill: "PDF BILL",
 lbl_client_details: "CUSTOMER & BILL DETAILS",
 lbl_add_item: "ADD BILL ITEM",
 lbl_rate_sqft: "Rate (Rs/Sq.Ft):",
 lbl_advance: "Advance (Rs):",
 lbl_due_balance: "Due Balance:",
 lbl_total_sales: "TOTAL SALES",
 lbl_purchases: "PURCHASES",
 lbl_balance: "BALANCE",
 btn_add_purchase: "+ ADD MATERIAL PURCHASE",
 btn_update_profile: "UPDATE PROFILE",
 btn_save_settings: "SAVE ALL SETTINGS",
 auth_heading: "SMART WORKER PRO",
 auth_subheading: "Aluminium & UPVC Fabrication Management",
 tab_signin: "Sign In",
 tab_register: "Register Workshop",
 btn_signin_acc: "Sign In to Account",
 btn_create_acc: "Create Account & Cloud Sync",
 btn_guest_demo: "Continue as Guest / Demo Mode →"
 },
 bn: {
 title_app: "SMART WORKER PRO",
 nav_home: "হোম",
 nav_dashboard: "ড্যাশবোর্ড",
 nav_records: "হিস্ট্রি",
 nav_profile: "প্রোফাইল",
 nav_login: "লগইন",
 welcome_prefix: "Welcome,",
 sec_fab_systems: "উইন্ডো ও ডোর সিস্টেম",
 sec_business_billing: "ব্যবসা ও বিলিং",
 mod_khata_title: "সাইট মেজারমেন্ট খাতা",
 mod_khata_sub: "ডিজিটাল খাতা বুক: রুম ট্র্যাকিং, অটো লেবার ও বিলিং",
 mod_domal: "ডমাল উইন্ডো",
 mod_sliding: "স্লাইডিং উইন্ডো",
 mod_casement: "কাস্টম কেসমেন্ট",
 mod_partition: "পার্টিশন ও ডোর",
 mod_door: "সিম্পল ডোর অপশন",
 mod_quotation: "প্রো কোটেশন",
 mod_ceiling: "সিলিং এস্টিমেটর",
 btn_open: "খুলুন", btn_edit: "এডিট",
 sub_domal: "২৭×৬৫ / ৪৫ মিমি সেকশন কাটিং",
 sub_sliding: "২, ৩, ৪ ট্র্যাক ও ইন্টারলক মাপ",
 sub_casement: "জেড-সেকশন ও খোলা পাল্লার জানালা",
 sub_partition: "অফিস পার্টিশন ও শিট কাটিং",
 sub_door: "হিঞ্জ ডোর ও বাথরুম পাল্লা",
 sub_ceiling: "ফলস সিলিং গ্রিড ও পেরিমিটার",
 sub_quotation: "ক্লায়েন্ট জিএসটি ইনভয়েস ও পিডিএফ বিল",
 sub_customer_khata: "ক্লায়েন্ট ব্যালেন্স ও রেকর্ডস",
 mod_customer_khata: "কাস্টমার খাতা",
 btn_clear: "ক্লিয়ার",
 btn_calculate: "+ হিসাব করুন",
 btn_save: "সেভ করুন",
 btn_cut_pdf: "কাটিং PDF",
 btn_glass_pdf: "গ্লাস PDF",
 btn_order_slip: "অর্ডার স্লিপ",
 lbl_cutting_sizes: "কাটিং মাপসমূহ:",
 lbl_mat_purchase: "মেটেরিয়াল খরিদ (অটো-অপ্টিমাইজড):",
 lbl_height: "উচ্চতা (Height):",
 lbl_width: "প্রস্থ (Width):",
 lbl_qty: "জানালার সংখ্যা (Pcs):",
 lbl_unit: "মাপের একক (Unit):",
 lbl_room_tag: "রুম / লোকেশন ট্যাগ:",
 btn_add_khata: "+ সাইট খাতায় যোগ করুন",
 btn_process_all: "⚡ সব প্রোডাক্ট একসাথে কাটিং প্রসেস",
 btn_khata_master_pdf: "📄 সাইট খাতা মাস্টার PDF তৈরি করুন",
 btn_client_bill: "ক্লায়েন্ট বিলিং",
 btn_generate_bill: "বিল তৈরি করুন",
 btn_save_bill: "বিল সেভ করুন",
 btn_pdf_bill: "PDF বিল ডাউনলোড",
 lbl_client_details: "গ্রাহক ও বিলের বিবরণ",
 lbl_add_item: "বিলের আইটেম যোগ করুন",
 lbl_rate_sqft: "দর (টাকা / স্কয়ার ফিট):",
 lbl_advance: "অ্যাডভান্স জমা (টাকা):",
 lbl_due_balance: "বকেয়া টাকা:",
 lbl_total_sales: "মোট বিক্রি",
 lbl_purchases: "মাল খরিদ খরচ",
 lbl_balance: "মোট ব্যালেন্স",
 btn_add_purchase: "+ মেটেরিয়াল খরিদ যোগ করুন",
 btn_update_profile: "প্রোফাইল আপডেট করুন",
 btn_save_settings: "সব সেটিংস সেভ করুন",
 auth_heading: "স্মার্ট ওয়ার্কার প্রো",
 auth_subheading: "অ্যালুমিনিয়াম ও ইউপিভিসি ফেব্রیکیشن ম্যানেজমেন্ট",
 tab_signin: "সাইন-ইন (লগইন)",
 tab_register: "ওয়ার্কশপ রেজিস্ট্রেশন",
 btn_signin_acc: "অ্যাকাউন্টে লগইন করুন",
 btn_create_acc: "অ্যাকাউন্ট তৈরি ও সিঙ্ক করুন",
 btn_guest_demo: "লগইন ছাড়া ডেমো ব্যবহার করুন →"
 },
 hi: {
 title_app: "स्मार्ट वर्कर प्रो",
 nav_home: "होम",
 nav_dashboard: "डैशबोर्ड",
 nav_records: "रिकॉर्ड्स",
 nav_profile: "प्रोफाइल",
 nav_login: "लॉगिन",
 welcome_prefix: "नमस्ते,",
 sec_fab_systems: "विंडो और डोर सिस्टम",
 sec_business_billing: "बिजनेस और बिलिंग",
 mod_khata_title: "साइट मेजरमेंट खाता",
 mod_khata_sub: "डिजिटल खाता बुक: रूम ट्रैकिंग, ऑटो लेबर और बिलिंग",
 mod_domal: "डोमल विंडो",
 mod_sliding: "स्लाइडिंग विंडो",
 mod_casement: "कस्टम केसमेंट",
 mod_partition: "पार्टीशन और डोर",
 mod_door: "सिंपल डोर विकल्प",
 mod_quotation: "प्रो कोटेशन",
 mod_ceiling: "सीलिंग एस्टीमेटर",
 btn_open: "खोलें", btn_edit: "एडिट",
 sub_domal: "27×65 / 45mm सेक्शन कटिंग",
 sub_sliding: "2, 3, 4 ट्रैक और इंटरलॉक कटिंग",
 sub_casement: "Z-सेक्शन और खुली खिड़की",
 sub_partition: "ऑफिस पार्टीशन और शीट कटिंग",
 sub_door: "कब्जा दरवाजा और बाथरूम डोर",
 sub_ceiling: "फॉल्स सीलिंग ग्रिड और परिमाप",
 sub_quotation: "ग्राहक जीएसटी बिल और चालान",
 sub_customer_khata: "ग्राहक बकाया खाता और बही",
 mod_customer_khata: "ग्राहक खाता बुक",
 btn_clear: "साफ करें",
 btn_calculate: "+ गणना करें",
 btn_save: "सेव करें",
 btn_cut_pdf: "कटिंग PDF",
 btn_glass_pdf: "ग्लास PDF",
 btn_order_slip: "ऑर्डर स्लिप",
 lbl_cutting_sizes: "कटिंग साइज विवरण:",
 lbl_mat_purchase: "मटेरियल खरीद (ऑटो-ऑप्टिमाइज्ड):",
 lbl_height: "ऊंचाई (Height):",
 lbl_width: "चौड़ाई (Width):",
 lbl_qty: "खिड़कियों की संख्या:",
 lbl_unit: "माप इकाई (Unit):",
 lbl_room_tag: "रूम / लोकेशन टैग:",
 btn_add_khata: "+ साइट खाते में जोड़ें",
 btn_process_all: "⚡ सभी प्रोडक्ट एक साथ कटिंग प्रोसेस करें",
 btn_khata_master_pdf: "📄 साइट खाता मास्टर PDF तैयार करें",
 btn_client_bill: "क्लाइंट बिलिंग",
 btn_generate_bill: "बिल जनरेट करें",
 btn_save_bill: "बिल सेव करें",
 btn_pdf_bill: "PDF बिल डाउनलोड",
 lbl_client_details: "ग्राहक और बिल विवरण",
 lbl_add_item: "बिल आइटम जोड़ें",
 lbl_rate_sqft: "दर (रु / वर्ग फीट):",
 lbl_advance: "अग्रिम जमा (रु):",
 lbl_due_balance: "बकाया राशि:",
 lbl_total_sales: "कुल बिक्री",
 lbl_purchases: "मटेरियल खरीद",
 lbl_balance: "नेट बैलेंस",
 btn_add_purchase: "+ मटेरियल खरीद जोड़ें",
 btn_update_profile: "प्रोफाइल अपडेट करें",
 btn_save_settings: "सभी सेटिंग्स सेव करें",
 auth_heading: "स्मार्ट वर्कर प्रो",
 auth_subheading: "एल्यूमिनियम और यूपीवीसी फैब्रिकेशन मैनेजमेंट",
 tab_signin: "साइन-इन (लॉगिन)",
 tab_register: "वर्कशॉप रजिस्ट्रेशन",
 btn_signin_acc: "अकाउंट में लॉगिन करें",
 btn_create_acc: "अकाउंट बनाएं और सिंक करें",
 btn_guest_demo: "बिना लॉगिन डेमो शुरू करें →"
 }
 };

 let currentAppLang = localStorage.getItem('sw_lang') || 'bn';

 function changeLanguage(lang) {
 if (!I18N_DICT[lang]) lang = 'en';
 currentAppLang = lang;
 localStorage.setItem('sw_lang', lang);

 const selector = document.getElementById('langSelector');
 if (selector) selector.value = lang;

 applyLanguageTranslations(lang);
 }

 function applyLanguageTranslations(lang) {
 // Update Gemini Settings Language Switcher
 const sEn = document.getElementById('setLangEn');
 const sBn = document.getElementById('setLangBn');
 const sHi = document.getElementById('setLangHi');
 const badge = document.getElementById('currentLangBadge');
 if (sEn && sBn && sHi) {
 [sEn, sBn, sHi].forEach(b => b.classList.remove('active'));
 if (lang === 'en') {
 sEn.classList.add('active');
 if (badge) badge.textContent = 'English';
 } else if (lang === 'bn') {
 sBn.classList.add('active');
 if (badge) badge.textContent = 'বাংলা';
 } else if (lang === 'hi') {
 sHi.classList.add('active');
 if (badge) badge.textContent = 'हिन्दी';
 }
 }

 // Update Language Switcher Pill Active State
 const btnEn = document.getElementById('btnLangEn');
 const btnBn = document.getElementById('btnLangBn');
 const btnHi = document.getElementById('btnLangHi');
 if (btnEn && btnBn && btnHi) {
 [btnEn, btnBn, btnHi].forEach(b => {
 b.style.background = 'transparent';
 b.style.color = '#94a3b8';
 b.style.fontWeight = '700';
 });
 if (lang === 'en') {
 btnEn.style.background = '#f59e0b';
 btnEn.style.color = '#0f172a';
 btnEn.style.fontWeight = '800';
 } else if (lang === 'bn') {
 btnBn.style.background = '#f59e0b';
 btnBn.style.color = '#0f172a';
 btnBn.style.fontWeight = '800';
 } else if (lang === 'hi') {
 btnHi.style.background = '#f59e0b';
 btnHi.style.color = '#0f172a';
 btnHi.style.fontWeight = '800';
 }
 }

 const d = I18N_DICT[lang] || I18N_DICT['en'];

 // App Title
 const titleElem = document.getElementById('titleText');
 if (titleElem) titleElem.textContent = d.title_app;

 // Menu Section Headers
 const secHeaders = document.querySelectorAll('.menu-section-title');
 if (secHeaders.length >= 2) {
 secHeaders[0].textContent = d.sec_fab_systems;
 secHeaders[1].textContent = d.sec_business_billing;
 }

 // Bottom Navigation
 const navItems = document.querySelectorAll('.bottom-nav .nav-item span');
 if (navItems.length >= 4) {
 navItems[0].textContent = d.nav_home;
 navItems[1].textContent = d.nav_dashboard;
 navItems[2].textContent = d.nav_records;
 navItems[3].textContent = d.nav_profile;
 }

 // Home Header Welcome
 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const greetingElem = document.getElementById('homeGreeting');
 if (greetingElem) {
 let pName = profile.name || (lang === 'bn' ? "ভাই" : (lang === 'hi' ? "भाई" : "Brother"));
 greetingElem.textContent = `${d.welcome_prefix} ${pName}!`;
 }

 // Translate all data-i18n elements
 document.querySelectorAll('[data-i18n]').forEach(el => {
 const key = el.getAttribute('data-i18n');
 if (d[key]) {
 el.textContent = d[key];
 }
 });

 // Update selector value cleanly
 const selector = document.getElementById('langSelector');
 if (selector) selector.value = lang;
 }


function updateProfile() {
 const profile = {
 name: document.getElementById('set_name').value.trim(),
 shop_name: document.getElementById('set_shop').value.trim(),
 phone: document.getElementById('set_phone').value.trim(),
 email: document.getElementById('set_email').value.trim(),
 gst: document.getElementById('set_gst').value.trim(),
 address: document.getElementById('set_address').value.trim()
 };
 if (!profile.name || !profile.shop_name || !profile.phone || !profile.address) {
 alert("Please fill Name, Shop Name, Phone and Address.");
 return;
 }
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 if(currentCloudUser) syncAllDataToCloud(currentCloudUser.uid);
 loadSavedProfile();
 updateActivationScreenUI();
 alert("Profile updated successfully!");
 goHome();
 }

 // ==========================================
 // PWA & APP INSTALLATION MANAGEMENT
 // ==========================================
 let deferredPrompt = null;
 window.addEventListener('beforeinstallprompt', (e) => {
 e.preventDefault();
 deferredPrompt = e;
 const installBox = document.getElementById('pwaInstallPrompt');
 if (installBox) installBox.style.display = 'flex';
 });

 function triggerPwaInstall() {
 if (deferredPrompt) {
 deferredPrompt.prompt();
 deferredPrompt.userChoice.then((choiceResult) => {
 if (choiceResult.outcome === 'accepted') {
 console.log('User installed Smart Worker Pro app');
 }
 deferredPrompt = null;
 const installBox = document.getElementById('pwaInstallPrompt');
 if (installBox) installBox.style.display = 'none';
 });
 } else {
 alert("মোবাইলে অ্যাপ হিসেবে সেভ করতে:\\n১. ব্রাউজারের ওপরে ৩টি ডটে (⋮) চাপ দিন।\\n২. 'Install app' অথবা 'Add to Home screen' (হোম স্ক্রিনে যোগ করুন) চাপুন!");
 }
 }

 if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
 navigator.serviceWorker.register('./sw.js').catch(err => {
 console.log('ServiceWorker registration optional', err);
 });
 });
 }

 function bootApp() {
  try {
    const home = document.getElementById('screen-home');
    if (home) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      home.classList.add('active');
    }
  } catch(e){}

  try {
    if (!localStorage.getItem('sw_profile')) {
      const defaultProfile = {
        name: "Saheb Ghanti",
        shop_name: "SMART WORKER ALUMINIUM",
        phone: "9876543210",
        email: "sahebghanti669@gmail.com",
        address: "Amta, Howrah • Fabrication Workshop"
      };
      localStorage.setItem('sw_profile', JSON.stringify(defaultProfile));
    }
  } catch(e){}

  try {
    if (!localStorage.getItem('sw_lang')) {
      localStorage.setItem('sw_lang', 'bn');
      currentAppLang = 'bn';
    }
  } catch(e){}

  try { changeLanguage(currentAppLang); } catch(e){ console.warn("changeLanguage error", e); }
  try { setupDb(); } catch(e){}
  try { if (typeof initFirebaseCloud === 'function') initFirebaseCloud(); } catch(e){}
  try { if (typeof initCloudKhataSyncListener === 'function') initCloudKhataSyncListener(); } catch(e){}
  try { loadSavedProfile(); } catch(e){}
  try { loadBillSettings(); } catch(e){}
  try { updateSuggestedRate(); } catch(e){}
  try { goHome(); } catch(e){}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
window.addEventListener('load', bootApp);
window.onload = bootApp;
