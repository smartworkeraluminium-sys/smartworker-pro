// =========================================================================
// SMART WORKER PRO - FABRICATION CALCULATION & CUTTING ENGINE
// Optimized Cutting Lists, Glass Sizes, Hardware & Material Purchase
// =========================================================================

 // Embedded JS Functions from main.py & calculations.py
 function safeEval(text) {
 if (!text) return 0.0;
 let s = String(text).trim();
 if (!s) return 0.0;
 s = s.replace(/(\d+)\s+(\d+\/\d+)/g, '+');
 s = s.replace(/\b0+(?=\d)/g, '');
 try {
 if (!/^[0-9+*/. ()-]+$/.test(s)) return 0.0;
 return Function('"use strict";return (' + s + ')')() || 0.0;
 } catch (e) { return 0.0; }
 }

 function toFractionInch(inchVal) {
 const roundedVal = Math.floor(inchVal * 16 + 0.5) / 16;
 const wholeNumber = Math.floor(roundedVal);
 const fracPart = roundedVal - wholeNumber;
 if (fracPart === 0) return `${wholeNumber}"`;
 const sixteenths = Math.round(fracPart * 16);
 if (sixteenths === 0) return `${wholeNumber}"`;
 if (sixteenths === 16) return `${wholeNumber + 1}"`;
 let num = sixteenths, den = 16;
 if (num % 8 === 0) { num /= 8; den /= 8; }
 else if (num % 4 === 0) { num /= 4; den /= 4; }
 else if (num % 2 === 0) { num /= 2; den /= 2; }
 if (wholeNumber === 0) return `${num}/${den}"`;
 return `${wholeNumber} ${num}/${den}"`;
 }

 function toMmStr(inchVal) {
 const mmVal = Math.floor((inchVal * 25.4) + 0.5);
 return `${mmVal} mm`;
 }

 function optimizeCuttingPlan(pieces) {
 if (!pieces || pieces.length === 0) return null;
 const sorted = [...pieces].sort((a, b) => b - a);
 const BLADE_KERF = 0.125; // 1/8 inch saw kerf
 let bestPlan = null;
 const stdLens = [180, 192, 144];
 for (const stdLen of stdLens) {
 const bins = [];
 let valid = true;
 for (const p of sorted) {
 if (p > stdLen) { valid = false; break; }
 let placed = false;
 for (const b of bins) {
 const sumB = b.reduce((a, c) => a + c, 0) + (b.length * BLADE_KERF);
 if (sumB + p <= stdLen) { b.push(p); placed = true; break; }
 }
 if (!placed) bins.push([p]);
 }
 if (valid) {
 const totalWaste = (bins.length * stdLen) - pieces.reduce((a, c) => a + c, 0);
 if (!bestPlan || bins.length < bestPlan.bins.length) {
 bestPlan = { len: stdLen, bins: bins, waste: totalWaste };
 } else if (bins.length === bestPlan.bins.length && totalWaste < bestPlan.waste) {
 bestPlan = { len: stdLen, bins: bins, waste: totalWaste };
 }
 }
 }
 if (!bestPlan) {
 bestPlan = { len: 0, bins: sorted.map(p => [p]), waste: 0, oversize: true };
 }
 return bestPlan;
 }

 function formatCuts(cuts) {
 const counts = {};
 cuts.forEach(c => {
 const val = Math.round(c * 100) / 100;
 counts[val] = (counts[val] || 0) + 1;
 });
 const sortedKeys = Object.keys(counts).map(Number).sort((a, b) => b - a);
 const parts = [];
 sortedKeys.forEach(val => {
 const qty = counts[val];
 parts.push(qty > 1 ? `${val}" x ${qty}` : `${val}"`);
 });
 return parts.join(' + ');
 }

 function generateMaterialList(buckets) {
 let resText = "--- ACCUMULATED MATERIAL PURCHASE ---\\\\n\\\\n";
 let hasItems = false;
 for (const name in buckets) {
 const pieces = buckets[name];
 if (pieces && pieces.length > 0) {
 hasItems = true;
 const plan = optimizeCuttingPlan(pieces);
 resText += `[${name}]\\\\n`;
 if (plan.oversize) {
 resText += "> SPECIAL ORDER (Oversized)\\\\n";
 pieces.forEach(p => { resText += ` > Piece: ${(Math.round(p * 100) / 100)}\\"\\\\n`; });
 } else {
 const ft = Math.floor(plan.len / 12);
 resText += `> Buy: ${plan.bins.length} pcs (${ft} ft)\\\\n`;
 plan.bins.forEach((b, i) => {
 const cutsStr = formatCuts(b);
 const sumB = b.reduce((a, c) => a + c, 0);
 const waste = Math.round((plan.len - sumB) * 100) / 100;
 resText += ` > Stick #${i + 1}: Cut [ ${cutsStr} ] -> Waste: ${waste}\\"\\\\n`;
 });
 }
 }
 }
 return hasItems ? resText : "";
 }

 // Keypad Logic
 let keypadTarget = null;
 let keypadDisplay = "";
 let keypadLastPad = "none";

 function openKeypad(targetId) {
 keypadTarget = document.getElementById(targetId);
 keypadDisplay = keypadTarget.value || "";
 keypadLastPad = "none";
 updateKeypadDisplay();
 document.getElementById('keypadModal').classList.add('active');
 }

 function updateKeypadDisplay() {
 document.getElementById('kDisplay').textContent = keypadDisplay || "0";
 }

 function keypadAddWhole(val) {
 keypadDisplay += val;
 keypadLastPad = "whole";
 updateKeypadDisplay();
 }

 function keypadAddNum(val) {
 if (keypadLastPad === 'whole' && keypadDisplay && /\d$/.test(keypadDisplay)) {
 keypadDisplay += "+" + val;
 } else {
 keypadDisplay += val;
 }
 keypadLastPad = "num";
 updateKeypadDisplay();
 }

 function keypadAddDenom(val) {
 if (keypadLastPad !== 'denom' && keypadDisplay && /\d$/.test(keypadDisplay)) {
 keypadDisplay += "/" + val;
 } else {
 keypadDisplay += val;
 }
 keypadLastPad = "denom";
 updateKeypadDisplay();
 }

 function keypadCalcResult() {
 try {
 let ans = String(Math.round(safeEval(keypadDisplay) * 1000) / 1000);
 if (ans.endsWith('.0')) ans = ans.slice(0, -2);
 keypadDisplay = ans;
 keypadLastPad = "whole";
 } catch (e) {}
 updateKeypadDisplay();
 }

 function keypadClear() {
 keypadDisplay = "";
 keypadLastPad = "none";
 updateKeypadDisplay();
 }

 function keypadBackspace() {
 keypadDisplay = keypadDisplay.slice(0, -1);
 updateKeypadDisplay();
 }

 function keypadEnter() {
 keypadCalcResult();
 if (keypadTarget) {
 keypadTarget.value = keypadDisplay;
 if (keypadTarget.oninput) keypadTarget.oninput();
 if (keypadTarget.onchange) keypadTarget.onchange();
 }
 document.getElementById('keypadModal').classList.remove('active');
 }

 // Screen Nav
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
 document.getElementById('screen-home').classList.add('active');
 // Restore Centered Logo & App Title
 document.getElementById('screenTitle').innerHTML = `<div style="display:flex; align-items:center; justify-content:center; gap:6px;"><img src="logo.png?v=2" alt="SWA" onerror="this.style.display='none';" style="height:28px; width:auto; border-radius:4px; background:#fff; padding:1px;"> <span id="titleText" style="font-size:0.95rem; font-weight:800; color:#fbbf24; white-space:nowrap;">SMART WORKER PRO</span></div>`;
 document.getElementById('topBackBtn').style.display = 'none';
 // Show Language Selector, Login & PRO badge ONLY on Home screen
 const rightActions = document.getElementById('topBarRightActions');
 if (rightActions) rightActions.style.display = 'flex';
 document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
 document.querySelectorAll('.nav-item')[0].classList.add('active');
 window.scrollTo({ top: 0, behavior: 'smooth' });
 }

 // Save and Load Settings

// ========================================================
 // 3. DOMAL WINDOW MODULE
 // ========================================================
 let dm_window_count = 0;
 let dm_buckets = {};
 let dm_glass_dict = {};

 function calculateDomal() {
 const raw_h = safeEval(document.getElementById('dm_h').value);
 const raw_w = safeEval(document.getElementById('dm_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('dm_unit').value.includes('Millimeter');
 const h_mm = is_mm ? raw_h : raw_h * 25.4;
 const w_mm = is_mm ? raw_w : raw_w * 25.4;
 const t_text = document.getElementById('dm_type').value;

 let track_h = 45.0;
 const thMatch = document.getElementById('dm_track_h').value.match(/[0-9]+(?:\\.[0-9]+)?/);
 if (thMatch) track_h = parseFloat(thMatch[0]);

 let handle_h = 27.0, handle_w = 65.0;
 const hwMatch = document.getElementById('dm_handle_hw').value.match(/[0-9]+(?:\\.[0-9]+)?/g);
 if (hwMatch && hwMatch.length >= 2) {
 handle_h = parseFloat(hwMatch[0]);
 handle_w = parseFloat(hwMatch[1]);
 }

 const v_cut_mm = h_mm - (track_h * 2.0) + 22.0;
 const h_deduct_mm = (track_h * 2.0) - 22.0;
 const side_clearance = (track_h * 2.0) - 12.0;

 let net_w_mod = 0, h_cut_mm = 0, s_c = 2, han_qty = 4, int_qty = 2;
 let has_mesh = false, mesh_w_mm = 0;

 if (t_text.includes('2-Track (2-Sash)')) {
 net_w_mod = handle_w - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 2.0;
 s_c = 2; han_qty = 4; int_qty = 2;
 } else if (t_text.includes('3-Track (3-Sash)')) {
 net_w_mod = (handle_w * 2.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 3.0;
 s_c = 3; han_qty = 6; int_qty = 4;
 has_mesh = true;
 mesh_w_mm = (w_mm - side_clearance + handle_w) / 2.0;
 } else if (t_text.includes('4-Track (4-Sash)')) {
 net_w_mod = (handle_w * 3.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 4.0;
 s_c = 4; han_qty = 8; int_qty = 6;
 has_mesh = true;
 mesh_w_mm = (w_mm + net_w_mod) / 4.0;
 } else {
 net_w_mod = (handle_w * 2.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 4.0;
 s_c = 4; han_qty = 8; int_qty = 4;
 }

 const g_deduct_mm = (handle_w * 2.0) - 26.0;
 const gh_mm = v_cut_mm - g_deduct_mm;
 const gw_mm = h_cut_mm - g_deduct_mm;

 const h_in = h_mm / 25.4;
 const w_in = w_mm / 25.4;
 const v_cut_in = v_cut_mm / 25.4;
 const h_cut_in = h_cut_mm / 25.4;
 const mesh_w_in = mesh_w_mm / 25.4;
 const gh_in = gh_mm / 25.4;
 const gw_in = gw_mm / 25.4;

 dm_window_count += 1;
 const win_loc = document.getElementById('dm_loc') ? document.getElementById('dm_loc').value.trim() : "";
 const win_qty = document.getElementById('dm_qty') ? Math.max(1, parseInt(document.getElementById('dm_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
 const unit_str = is_mm ? "mm" : "Inch";

 const total_sash_for_hw = s_c + (has_mesh ? 1 : 0);
 let hw_txt = "--- HARDWARE & ACCESSORIES ---\\n";
 hw_txt += `> Domal Bearing / Rollers: ${total_sash_for_hw * 2} pc\\n`;
 hw_txt += `> Touch Lock / Star Lock: ${s_c >= 3 ? 2 : 1} pc\\n`;
 hw_txt += `> L-Cleat (Corner Angle): ${total_sash_for_hw * 4} pc\\n> EPDM Gasket / Seal: Required\\n`;

 const w_sign = net_w_mod >= 0 ? `+${Math.round(net_w_mod)}` : `${Math.round(net_w_mod)}`;
 let spec_info = `--- JINDAL SPECS (Track H:${Math.round(track_h)}mm | Handle:${Math.round(handle_h)}x${Math.round(handle_w)}mm) ---\\n`;
 spec_info += `> Height Formula: (H - ${Math.round(h_deduct_mm)} mm) [+22mm overlap]\\n`;
 spec_info += `> Width Formula: (W ${w_sign} mm) / ${s_c} [-12mm clearance]\\n`;
 spec_info += `> Glass Deduction: Sash - ${Math.round(g_deduct_mm)} mm [13mm pocket each side]\\n`;

 let alu_txt = `[Domal Win #${dm_window_count}${loc_str} - H:${raw_h} x W:${raw_w} ${unit_str}${qty_str}]\\n`;
 alu_txt += spec_info;
 alu_txt += `> Outer Track (Top/Bot): ${disp(w_in)} (2 pc)\\n`;
 alu_txt += `> Outer Track (Vertical): ${disp(h_in)} (2 pc)\\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(h_cut_in)} (${s_c * 2} pc)\\n`;
 alu_txt += `> Sash Handle: ${disp(v_cut_in)} (${han_qty} pc)\\n`;
 alu_txt += `> Sash Interlock: ${disp(v_cut_in)} (${int_qty} pc)\\n`;

 if (has_mesh) {
 alu_txt += `\\n--- MOSQUITO NET ---\\n> Mesh Top/Bot: ${disp(mesh_w_in)} (2 pc)\\n> Mesh Handle/Interlock: ${disp(v_cut_in)} (2 pc)\\n`;
 }

 const glass_txt = `\\n--- GLASS SIZES ---\\n> Glass Size: ${disp(gh_in)} x ${disp(gw_in)} (${s_c} pc)\\n`;
 const glass_key = `${disp(gh_in)} x ${disp(gw_in)}`;
 dm_glass_dict[glass_key] = (dm_glass_dict[glass_key] || 0) + (s_c * win_qty);

 let track_type = t_text.split(' ')[0];
 if (t_text.includes("Center")) track_type = "2-Track CO";

 const outer_key = `Domal Outer Frame (${track_type})`;
 const sash_handle_key = `Domal Sash Patta & Handle (${track_type})`;
 const interlock_key = `Domal Interlock (${track_type})`;

 [outer_key, sash_handle_key, interlock_key].forEach(k => {
 if (!dm_buckets[k]) dm_buckets[k] = [];
 });

 for(let q=0; q<win_qty; q++) dm_buckets[outer_key].push(w_in, w_in, h_in, h_in);
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < s_c * 2; i++) dm_buckets[sash_handle_key].push(h_cut_in); }
 if (has_mesh) dm_buckets[sash_handle_key].push(mesh_w_in, mesh_w_in);
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < han_qty; i++) dm_buckets[sash_handle_key].push(v_cut_in); }
 if (has_mesh) dm_buckets[sash_handle_key].push(v_cut_in);
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < int_qty; i++) dm_buckets[interlock_key].push(v_cut_in); }
 if (has_mesh) dm_buckets[interlock_key].push(v_cut_in);

 const prevOut = document.getElementById('dm_alu_out').textContent;
 document.getElementById('dm_alu_out').textContent = alu_txt + hw_txt + glass_txt + "===================================\\n\\n" + prevOut;
 document.getElementById('dm_mat_out').textContent = generateMaterialList(dm_buckets);
 }

 function clearDomal() {
 dm_window_count = 0;
 dm_buckets = {};
 dm_glass_dict = {};
 document.getElementById('dm_h').value = "";
 document.getElementById('dm_w').value = "";
 document.getElementById('dm_alu_out').textContent = "";
 document.getElementById('dm_mat_out').textContent = "";
 }

 // ========================================================
 // 4. SLIDING WINDOW MODULE
 // ========================================================
 let sl_window_count = 0;
 let sl_buckets = {};
 let sl_glass_dict = {};

 function calculateSliding() {
 const raw_h = safeEval(document.getElementById('sl_h').value);
 const raw_w = safeEval(document.getElementById('sl_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('sl_unit').value.includes('Millimeter');
 const h_in = is_mm ? raw_h / 25.4 : raw_h;
 const w_in = is_mm ? raw_w / 25.4 : raw_w;
 const sys_type = document.getElementById('sl_sys').value;
 const t_type = document.getElementById('sl_type').value;

 let h_minus = 0, w_mod = 0, div = 2, g_h_minus = 0, g_w_mod = 0, g_c = 2;
 let han_qty = 2, int_qty = 2;

 if (t_type.includes('2-Track')) { div = 2; g_c = 2; han_qty = 2; int_qty = 2; }
 else if (t_type.includes('3-Track')) { div = 3; g_c = 3; han_qty = 2; int_qty = 4; }
 else if (t_type.includes('4-Track')) { div = 4; g_c = 4; han_qty = 2; int_qty = 6; }
 else if (t_type.includes('Center Open')) { div = 4; g_c = 4; han_qty = 4; int_qty = 4; }

 if (sys_type.includes('18x40')) {
 h_minus = 1.625; g_h_minus = 2.75; g_w_mod = 0.625;
 w_mod = (div === 2) ? -6.0 : (div === 3 ? -8.0 : -11.0);
 } else if (sys_type.includes('18x50')) {
 h_minus = 1.625; g_h_minus = 2.75; g_w_mod = 0.625;
 w_mod = (div === 2) ? -7.0 : (div === 3 ? -9.5 : -12.5);
 } else if (sys_type.includes('18x60')) {
 h_minus = 1.5; g_h_minus = 4.125; g_w_mod = -4.125;
 w_mod = (div === 2) ? 0.625 : (div === 3 ? 2.75 : 5.125);
 } else if (sys_type.includes('25x50')) {
 h_minus = 1.125; g_h_minus = 4.125; g_w_mod = 0.75;
 if (t_type.includes('Center')) w_mod = -13.5;
 else w_mod = (div === 2) ? -7.5 : (div === 3 ? -9.25 : -11.5);
 } else if (sys_type.includes('25x65')) {
 h_minus = 1.125; g_h_minus = 5.5; g_w_mod = 0.75;
 if (t_type.includes('Center')) w_mod = -16.625;
 else w_mod = (div === 2) ? -8.75 : (div === 3 ? -11.25 : -14.0);
 } else if (sys_type.includes('Door Sliding Master')) {
 h_minus = 43 / 25.4; g_h_minus = 121 / 25.4; g_w_mod = -8 / 25.4;
 w_mod = (div === 2) ? -169 / 25.4 : (div === 3 ? -204 / 25.4 : -169 / 25.4);
 }

 const tb_w = (w_in + w_mod) / div;
 const handle_h = h_in - h_minus;
 const glass_h = handle_h - g_h_minus;
 const glass_w = tb_w + g_w_mod;

 sl_window_count += 1;
 const win_loc = document.getElementById('sl_loc') ? document.getElementById('sl_loc').value.trim() : "";
 const win_qty = document.getElementById('sl_qty') ? Math.max(1, parseInt(document.getElementById('sl_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);

 let hw_txt = "--- HARDWARE & ACCESSORIES ---\\n";
 hw_txt += `> Sliding Roller / Bearing: ${g_c * 2} pc\\n`;
 hw_txt += `> Star Lock: ${g_c >= 3 ? 2 : 1} pc\\n> Rubber & Woolpile: Required\\n`;

 let alu_txt = `[Win #${sl_window_count}${loc_str} - H:${raw_h} x W:${raw_w} (${sys_type.split(' ')[0]})${qty_str}]\\n`;
 alu_txt += `> Track Top: ${disp(w_in)} (1 pc)\\n`;
 alu_txt += `> Track Bottom: ${disp(w_in)} (1 pc)\\n`;
 alu_txt += `> Track Vertical: ${disp(h_in)} (2 pc)\\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(tb_w)} (${g_c * 2} pc)\\n`;
 alu_txt += `> Sash Handle: ${disp(handle_h)} (${han_qty} pc)\\n`;
 alu_txt += `> Sash Interlock: ${disp(handle_h)} (${int_qty} pc)\\n`;

 const glass_txt = `\\n--- GLASS SIZES ---\\n> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${g_c} pc)\\n`;
 const glass_key = `${disp(glass_h)} x ${disp(glass_w)}`;
 sl_glass_dict[glass_key] = (sl_glass_dict[glass_key] || 0) + (g_c * win_qty);

 const track_type = t_type.split(' ')[0];
 const top_vert_track_key = `Track Top/Vertical (${track_type})`;
 const bot_track_key = `Track Bottom (${track_type})`;
 const sash_tb_key = "Sash Top/Bottom";
 const sash_handle_key = "Sash Handle";
 const sash_interlock_key = "Sash Interlock";

 [top_vert_track_key, bot_track_key, sash_tb_key, sash_handle_key, sash_interlock_key].forEach(k => {
 if (!sl_buckets[k]) sl_buckets[k] = [];
 });

 for(let q=0; q<win_qty; q++) sl_buckets[top_vert_track_key].push(w_in, h_in, h_in);
 for(let q=0; q<win_qty; q++) sl_buckets[bot_track_key].push(w_in);
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < g_c * 2; i++) sl_buckets[sash_tb_key].push(tb_w); }
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < han_qty; i++) sl_buckets[sash_handle_key].push(handle_h); }
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < int_qty; i++) sl_buckets[sash_interlock_key].push(handle_h); }

 const prevOut = document.getElementById('sl_out').textContent;
 document.getElementById('sl_out').textContent = alu_txt + hw_txt + glass_txt + "===================================\\n\\n" + prevOut;
 document.getElementById('sl_mat_out').textContent = generateMaterialList(sl_buckets);
 }

 function clearSliding() {
 sl_window_count = 0;
 sl_buckets = {};
 sl_glass_dict = {};
 document.getElementById('sl_h').value = "";
 document.getElementById('sl_w').value = "";
 document.getElementById('sl_out').textContent = "";
 document.getElementById('sl_mat_out').textContent = "";
 }

 // ========================================================
 // 5. CUSTOM CASEMENT MODULE
 // ========================================================
 let cc_window_count = 0;
 let cc_buckets = { "Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": [], "Square Clip (Beading)": [] };
 let cc_glass_dict = {};

 function calculateCasement() {
 const raw_h = safeEval(document.getElementById('cc_h').value);
 const raw_w = safeEval(document.getElementById('cc_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const bot_h_input = safeEval(document.getElementById('cc_bot_h').value);
 const mid_w_input = safeEval(document.getElementById('cc_mid_w').value);

 const top_cols = Math.max(1, parseInt(safeEval(document.getElementById('cc_top_cols').value)) || 1);
 let top_open = parseInt(safeEval(document.getElementById('cc_top_open').value)) || 0;
 if (top_open > top_cols) top_open = top_cols;
 const top_fixed = top_cols - top_open;

 const bot_cols_str = document.getElementById('cc_bot_cols').value.trim();
 let bot_cols = bot_cols_str ? parseInt(safeEval(bot_cols_str)) || 0 : 0;
 const bot_open_str = document.getElementById('cc_bot_open').value.trim();
 let bot_open = bot_open_str ? parseInt(safeEval(bot_open_str)) || 0 : 0;
 if (bot_open > bot_cols) bot_open = bot_cols;
 const bot_fixed = bot_cols - bot_open;

 const is_mm = document.getElementById('cc_unit').value.includes('Millimeter');
 const h_mm = is_mm ? raw_h : raw_h * 25.4;
 const w_mm = is_mm ? raw_w : raw_w * 25.4;
 const bot_gap_input_mm = is_mm ? bot_h_input : bot_h_input * 25.4;
 const mid_w_mm = is_mm ? mid_w_input : mid_w_input * 25.4;

 const series = document.getElementById('cc_series').value;
 const overlap = 11;
 const glass_m_open = 65;
 const glass_m_fixed = 7;

 const outer_2 = series.includes("34") ? 56 : 46;
 const mullion = series.includes("34") ? 25 : 27;

 const rows = bot_gap_input_mm > 0 ? 2 : 1;
 const h_mullion_qty = rows === 2 ? 1 : 0;

 let bot_gap_h = 0, top_gap_h = 0;
 if (rows === 2) {
 bot_gap_h = bot_gap_input_mm;
 top_gap_h = h_mm - outer_2 - mullion - bot_gap_h;
 } else {
 top_gap_h = h_mm - outer_2;
 }

 const top_v_mullion_qty = top_cols - 1;
 const bot_v_mullion_qty = Math.max(0, bot_cols - 1);

 const top_gap_w = (w_mm - outer_2 - (top_v_mullion_qty * mullion)) / top_cols;
 let bot_gap_w = 0;
 if (bot_cols > 0) {
 bot_gap_w = (w_mm - outer_2 - (bot_v_mullion_qty * mullion)) / bot_cols;
 }

 cc_window_count += 1;
 const disp = (mmVal) => is_mm ? toMmStr(mmVal / 25.4) : toFractionInch(mmVal / 25.4);
 const unit_str = is_mm ? "mm" : "Inch";
 const total_sash_qty = top_open + bot_open;

 let out_txt = `[${series} Win #${cc_window_count} | Size: ${raw_h} x ${raw_w} ${unit_str}]\\n`;
 out_txt += "--- 1. OUTER FRAME & MULLIONS ---\\n";
 out_txt += `> Outer Vertical: ${disp(h_mm)} (2 pc)\\n> Outer Horizontal: ${disp(w_mm)} (2 pc)\\n`;
 cc_buckets["Casement Outer"].push(h_mm / 25.4, h_mm / 25.4, w_mm / 25.4, w_mm / 25.4);

 if (h_mullion_qty > 0) {
 out_txt += `> Horizontal Divider: ${disp(w_mm - outer_2)} (${h_mullion_qty} pc)\\n`;
 for (let i = 0; i < h_mullion_qty; i++) cc_buckets["Casement Mullion"].push((w_mm - outer_2) / 25.4);
 }
 if (top_v_mullion_qty > 0) {
 out_txt += `> Top Vert. Mullions: ${disp(top_gap_h)} (${top_v_mullion_qty} pc)\\n`;
 for (let i = 0; i < top_v_mullion_qty; i++) cc_buckets["Casement Mullion"].push(top_gap_h / 25.4);
 }
 if (bot_v_mullion_qty > 0) {
 out_txt += `> Bot Vert. Mullions: ${disp(bot_gap_h)} (${bot_v_mullion_qty} pc)\\n`;
 for (let i = 0; i < bot_v_mullion_qty; i++) cc_buckets["Casement Mullion"].push(bot_gap_h / 25.4);
 }

 out_txt += `\\n--- 2. TOP ROW DETAILS (${top_cols} SECTIONS) ---\\n`;
 let w_gap_open = top_gap_w, w_gap_fixed = top_gap_w;
 if (mid_w_mm > 0 && top_cols >= 3) {
 const num_center_gaps = top_cols - 2;
 const side_w_total = w_mm - outer_2 - (num_center_gaps * mid_w_mm) - (top_v_mullion_qty * mullion);
 const top_side_w = side_w_total / 2;
 w_gap_open = mid_w_mm;
 w_gap_fixed = top_side_w;
 }

 if (top_open > 0) {
 out_txt += `[OPENABLE SASH | Qty: ${top_open} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_open)}]\\n`;
 const s1_h = top_gap_h + overlap, s1_w = w_gap_open + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)}\\n > Glass Size: ${disp(g_h)} x ${disp(g_w)}\\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + top_open;
 for (let i = 0; i < top_open * 2; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }

 if (top_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${top_fixed} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_fixed)}]\\n`;
 const g_h = top_gap_h - glass_m_fixed, g_w = w_gap_fixed - glass_m_fixed;
 out_txt += ` > Fixed Glass Size: ${disp(g_h)} x ${disp(g_w)}\\n > Square Clip (Beading): Required\\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + top_fixed;
 const beading_length = (top_gap_h + w_gap_fixed) * 2 / 25.4;
 for (let i = 0; i < top_fixed; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }

 if (bot_cols > 0 && rows === 2) {
 out_txt += `\\n--- 3. BOTTOM ROW DETAILS (${bot_cols} SECTIONS) ---\\n`;
 if (bot_open > 0) {
 out_txt += `[OPENABLE SASH | Qty: ${bot_open} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\\n`;
 const s1_h = bot_gap_h + overlap, s1_w = bot_gap_w + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)}\\n > Glass Size: ${disp(g_h)} x ${disp(g_w)}\\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + bot_open;
 for (let i = 0; i < bot_open * 2; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }
 if (bot_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${bot_fixed} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\\n`;
 const g_h = bot_gap_h - glass_m_fixed, g_w = bot_gap_w - glass_m_fixed;
 out_txt += ` > Fixed Glass Size: ${disp(g_h)} x ${disp(g_w)}\\n > Square Clip (Beading): Required\\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + bot_fixed;
 const beading_length = (bot_gap_h + bot_gap_w) * 2 / 25.4;
 for (let i = 0; i < bot_fixed; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }
 }

 let hw_txt = "\\n--- HARDWARE & ACCESSORIES ---\\n";
 if (total_sash_qty > 0) {
 hw_txt += `> Friction Stay / Hinges: ${total_sash_qty * 2} pc\\n`;
 hw_txt += `> Casement Handle: ${total_sash_qty} pc\\n`;
 } else {
 hw_txt += "> No Sash Hardware Required (Fully Fixed)\\n";
 }
 out_txt += hw_txt;

 const prevOut = document.getElementById('cc_out').textContent;
 document.getElementById('cc_out').textContent = out_txt + "===================================\\n\\n" + prevOut;
 document.getElementById('cc_mat_out').textContent = generateMaterialList(cc_buckets);
 }

 function clearCasement() {
 cc_window_count = 0;
 cc_buckets = { "Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": [], "Square Clip (Beading)": [] };
 cc_glass_dict = {};
 document.getElementById('cc_h').value = "";
 document.getElementById('cc_w').value = "";
 document.getElementById('cc_bot_h').value = "0";
 document.getElementById('cc_mid_w').value = "0";
 document.getElementById('cc_top_cols').value = "1";
 document.getElementById('cc_top_open').value = "1";
 document.getElementById('cc_bot_cols').value = "0";
 document.getElementById('cc_bot_open').value = "0";
 document.getElementById('cc_out').textContent = "";
 document.getElementById('cc_mat_out').textContent = "";
 }

 // ========================================================
 // 6. DOOR MASTER MODULE
 // ========================================================
 let dr_door_count = 0;
 let dr_buckets = { "Door Outer Frame": [], "Door Verticals": [], "Door Horizontals": [] };
 let dr_glass_dict = {};

 function calculateDoor() {
 const raw_h = safeEval(document.getElementById('dr_h').value);
 const raw_w = safeEval(document.getElementById('dr_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('dr_unit').value.includes('Millimeter');
 const h = is_mm ? raw_h / 25.4 : raw_h;
 const w = is_mm ? raw_w / 25.4 : raw_w;
 const d_type = document.getElementById('dr_type').value;

 let outer_v = h, outer_h = w - 3.0, has_outer = true;
 let door_v = 0, door_tb = 0, palla_qty = 1;

 if (d_type === "Standard Door") {
 door_v = h - 1.75; door_tb = w - 6.75; palla_qty = 1;
 } else if (d_type === "Floor Spring Door") {
 door_v = h - 2.0; door_tb = w - 6.75; palla_qty = 1;
 } else if (d_type === "Top Hung Door") {
 door_v = h; door_tb = w - 6.75; palla_qty = 1; has_outer = false;
 } else if (d_type === "Domal System Door") {
 door_v = h - (25.0 / 25.4); door_tb = (w - (38.0 / 25.4)) - 3.5; palla_qty = 1;
 } else {
 door_v = h - 2.0; door_tb = w - 6.75; palla_qty = 1;
 }

 const glass_h = door_v - 5.875 - 0.25;
 const glass_w = door_tb - 0.25;

 dr_door_count += 1;
 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
 const unit_str = is_mm ? "mm" : "Inch";

 let hw_txt = "--- HARDWARE & ACCESSORIES ---\\n";
 hw_txt += `> Door Hinges / Pivot: 3 pc (Per Leaf)\\n> Door Handle: 1 Set\\n> Door Lock: 1 Set\\n`;
 if (d_type === "Standard Door" || d_type === "Floor Spring Door") {
 hw_txt += "> Door Closer / Floor Spring: 1 pc\\n";
 }

 let out = `[Door #${dr_door_count} - ${d_type} (${raw_h} x ${raw_w} ${unit_str})]\\n`;
 if (has_outer) {
 out += `--- OUTER FRAME ---\\n> Outer Vertical: ${disp(outer_v)} (2 pc)\\n> Outer Top Horizontal: ${disp(outer_h)} (1 pc)\\n`;
 dr_buckets["Door Outer Frame"].push(outer_v, outer_v, outer_h);
 }
 out += `--- DOOR SASH (${palla_qty} Palla) ---\\n> Door Vertical: ${disp(door_v)} (${palla_qty * 2} pc)\\n> Door Top/Bottom: ${disp(door_tb)} (${palla_qty * 2} pc)\\n`;
 for (let i = 0; i < palla_qty * 2; i++) dr_buckets["Door Verticals"].push(door_v);
 for (let i = 0; i < palla_qty * 2; i++) dr_buckets["Door Horizontals"].push(door_tb);

 out += hw_txt;
 out += `--- GLASS / BOARD ---\\n> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${palla_qty} pc)\\n`;
 const glass_key = `${disp(glass_h)} x ${disp(glass_w)}`;
 dr_glass_dict[glass_key] = (dr_glass_dict[glass_key] || 0) + palla_qty;

 const prevOut = document.getElementById('dr_out').textContent;
 document.getElementById('dr_out').textContent = out + "===================================\\n\\n" + prevOut;
 document.getElementById('dr_mat_out').textContent = generateMaterialList(dr_buckets);
 }

 function clearDoor() {
 dr_door_count = 0;
 dr_buckets = { "Door Outer Frame": [], "Door Verticals": [], "Door Horizontals": [] };
 dr_glass_dict = {};
 document.getElementById('dr_h').value = "";
 document.getElementById('dr_w').value = "";
 document.getElementById('dr_out').textContent = "";
 document.getElementById('dr_mat_out').textContent = "";
 }

 // ========================================================
 // 7. PARTITION MODULE
 // ========================================================
 let pt_part_count = 0;
 let pt_buckets = { "Single Glazing": [], "Double Glazing": [], "Door Sash": [] };
 let pt_glass_dict = {};

 function calculatePartition() {
 const raw_h = safeEval(document.getElementById('pt_h').value);
 const raw_w = safeEval(document.getElementById('pt_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('pt_unit').value.includes('Millimeter');
 const h = is_mm ? raw_h / 25.4 : raw_h;
 const w = is_mm ? raw_w / 25.4 : raw_w;
 const p_type = document.getElementById('pt_type').value;
 const cols = Math.max(1, parseInt(safeEval(document.getElementById('pt_cols').value)) || 3);
 const rows = Math.max(1, parseInt(safeEval(document.getElementById('pt_rows').value)) || 3);

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
 pt_part_count += 1;
 const unit_str = is_mm ? "mm" : "Inch";

 let hw_txt = "--- HARDWARE & ACCESSORIES ---\\n> Square Clip (Beading) Required\\n> Rubber/Sealant as per perimeter\\n";
 let out = "";

 if (p_type === "Fixed Partition") {
 out = `[Partition #${pt_part_count} - ${p_type} (${raw_h} x ${raw_w} ${unit_str})]\\n`;
 const outer_v = h, inter_v = h - 3.0, outer_h = w - 3.0;
 const inner_h = (w - ((cols + 1) * 1.5)) / cols;

 out += "--- SINGLE GLAZING ---\\n";
 out += `> Vertical: ${disp(outer_v)} (2 pc)\\n> Horizontal: ${disp(outer_h)} (2 pc)\\n`;
 pt_buckets["Single Glazing"].push(outer_v, outer_v, outer_h, outer_h);

 out += "--- DOUBLE GLAZING ---\\n";
 if (cols > 1) {
 out += `> Vertical: ${disp(inter_v)} (${cols - 1} pc)\\n`;
 for (let i = 0; i < cols - 1; i++) pt_buckets["Double Glazing"].push(inter_v);
 }
 const h_qty = cols * (rows - 1);
 if (h_qty > 0) {
 out += `> Horizontal: ${disp(inner_h)} (${h_qty} pc)\\n`;
 for (let i = 0; i < h_qty; i++) pt_buckets["Double Glazing"].push(inner_h);
 }

 const gap_h = (h - ((rows + 1) * 1.5)) / rows;
 const glass_qty = cols * rows;
 out += hw_txt;
 out += `--- GLASS / BOARD ---\\n> Size: ${disp(gap_h - 0.25)} x ${disp(inner_h - 0.25)} (${glass_qty} pc)\\n`;
 const gKey = `${disp(gap_h - 0.25)} x ${disp(inner_h - 0.25)}`;
 pt_glass_dict[gKey] = (pt_glass_dict[gKey] || 0) + glass_qty;

 } else {
 const raw_dh = safeEval(document.getElementById('pt_dh').value);
 const raw_dw = safeEval(document.getElementById('pt_dw').value);
 if (raw_dh === 0 || raw_dw === 0) { alert("Please enter Door Size."); return; }

 const dh = is_mm ? raw_dh / 25.4 : raw_dh;
 const dw = is_mm ? raw_dw / 25.4 : raw_dw;

 out = `[Partition #${pt_part_count} - Door + Partition (${raw_h} x ${raw_w} ${unit_str})]\\n`;
 const outer_v = h, inter_v = h - 3.0, door_side_v = h - 1.5;
 const outer_h_top = w - 3.0, rem_w = w - (dw + 3.0);
 const inner_h = cols > 0 ? (rem_w - 3.0) / cols : 0;

 out += "--- VERTICALS ---\\n";
 out += `> Outer Vertical: ${disp(outer_v)} (2 pc)\\n> Door Side Vertical: ${disp(door_side_v)} (1 pc)\\n`;
 pt_buckets["Single Glazing"].push(outer_v, outer_v);
 pt_buckets["Double Glazing"].push(door_side_v);

 if (cols > 1) {
 out += `> Intermediate Vertical: ${disp(inter_v)} (${cols - 1} pc)\\n`;
 for (let i = 0; i < cols - 1; i++) pt_buckets["Double Glazing"].push(inter_v);
 }

 out += "--- HORIZONTALS ---\\n";
 out += `> Outer Top Horizontal: ${disp(outer_h_top)} (1 pc)\\n> Door Top Transom: ${disp(rem_w)} (1 pc)\\n`;
 pt_buckets["Single Glazing"].push(outer_h_top);
 pt_buckets["Double Glazing"].push(rem_w);

 const h_qty = cols * (rows - 1);
 if (h_qty > 0) {
 out += `> Internal Horizontal: ${disp(inner_h)} (${h_qty} pc)\\n`;
 for (let i = 0; i < h_qty; i++) pt_buckets["Double Glazing"].push(inner_h);
 }

 const door_v = dh - 1.75, door_tb = dw - 6.75;
 const dg_h = door_v - 5.875 - 0.25, dg_w = door_tb - 0.25;

 out += `--- DOOR SASH ---\\n> Vertical: ${disp(door_v)} (2 pc)\\n> Top/Bottom: ${disp(door_tb)} (2 pc)\\n> Glass Size: ${disp(dg_h)} x ${disp(dg_w)} (1 pc)\\n`;
 pt_buckets["Door Sash"].push(door_v, door_v, door_tb, door_tb);

 const transom_g_h = (h - dh - 1.5) - 0.25, transom_g_w = dw - 0.25;
 const part_g_h = ((h - ((rows + 1) * 1.5)) / rows) - 0.25, part_g_w = inner_h - 0.25;
 const part_g_qty = cols * rows;

 hw_txt += "> Door Lock: 1 Set\\n> Door Pivot / Floor Spring: 1 Set\\n> Door Handle: 1 Set\\n";
 out += hw_txt;
 out += `--- FIXED GLASS / BOARD ---\\n> Top Transom Glass: ${disp(transom_g_h)} x ${disp(transom_g_w)} (1 pc)\\n`;
 if (part_g_qty > 0) {
 out += `> Partition Grid Glass: ${disp(part_g_h)} x ${disp(part_g_w)} (${part_g_qty} pc)\\n`;
 }

 pt_glass_dict[`${disp(dg_h)} x ${disp(dg_w)}`] = (pt_glass_dict[`${disp(dg_h)} x ${disp(dg_w)}`] || 0) + 1;
 pt_glass_dict[`${disp(transom_g_h)} x ${disp(transom_g_w)}`] = (pt_glass_dict[`${disp(transom_g_h)} x ${disp(transom_g_w)}`] || 0) + 1;
 if (part_g_qty > 0) {
 pt_glass_dict[`${disp(part_g_h)} x ${disp(part_g_w)}`] = (pt_glass_dict[`${disp(part_g_h)} x ${disp(part_g_w)}`] || 0) + part_g_qty;
 }
 }

 const prevOut = document.getElementById('pt_out').textContent;
 document.getElementById('pt_out').textContent = out + "===================================\\n\\n" + prevOut;
 document.getElementById('pt_mat_out').textContent = generateMaterialList(pt_buckets);
 }

 function clearPartition() {
 pt_part_count = 0;
 pt_buckets = { "Single Glazing": [], "Double Glazing": [], "Door Sash": [] };
 pt_glass_dict = {};
 document.getElementById('pt_h').value = "";
 document.getElementById('pt_w').value = "";
 document.getElementById('pt_dh').value = "";
 document.getElementById('pt_dw').value = "";
 document.getElementById('pt_out').textContent = "";
 document.getElementById('pt_mat_out').textContent = "";
 }

 // ========================================================
 // 8. CEILING ESTIMATOR MODULE
 // ========================================================
 function calculateCeiling() {
 const l = safeEval(document.getElementById('ce_l').value);
 const w = safeEval(document.getElementById('ce_w').value);
 if (l === 0 || w === 0) { alert("Please enter Length and Width."); return; }

 const area = l * w;
 const perimeter = 2 * (l + w);
 let mat_txt = "";

 if (document.getElementById('ce_type').value === "Gypsum Board") {
 const area_sqm = area / 10.764;
 const safe_area = area * 1.05;
 const pcs_6x4 = Math.ceil(safe_area / 24);
 const waste_6x4 = (pcs_6x4 * 24) - safe_area;
 const pcs_8x4 = Math.ceil(safe_area / 32);
 const waste_8x4 = (pcs_8x4 * 32) - safe_area;

 let chosen_board = "Gypsum Board (6ft x 4ft)", final_boards = pcs_6x4;
 if (waste_8x4 < waste_6x4) {
 chosen_board = "Gypsum Board (8ft x 4ft)";
 final_boards = pcs_8x4;
 }

 const main_channel = Math.ceil((area_sqm * 0.83 * 3.28) / 12);
 const cross_section = Math.ceil((area_sqm * 3.23 * 3.28) / 12);
 const l_patti = Math.ceil(perimeter / 12);
 const cleats_plugs = Math.ceil(area_sqm * 0.77);
 const screws = Math.ceil(area_sqm * 14);
 const compound = Math.round(area_sqm * 0.35 * 10) / 10;
 const tape = Math.round(area_sqm * 1.2 * 10) / 10;

 mat_txt += `> ${chosen_board} -> ${final_boards} Pcs\\n`;
 mat_txt += `> Main Channel (12ft): ${main_channel} Pcs\\n`;
 mat_txt += `> Cross Section (12ft): ${cross_section} Pcs\\n`;
 mat_txt += `> Perimeter L-Patti (12ft): ${l_patti} Pcs\\n`;
 mat_txt += "--- Professional Accessories ---\\n";
 mat_txt += `> Soffit Cleat & Rawl Plug: ${cleats_plugs} Sets\\n`;
 mat_txt += `> Drywall Screws: ${screws} Pcs\\n`;
 mat_txt += `> Jointing Compound: ${compound} Kg\\n`;
 mat_txt += `> Fiber Tape: ${tape} Meter\\n`;
 } else {
 const panels = Math.ceil((area / 8.33) * 1.05);
 const tube_ft = (area / 2) + perimeter;
 const pvc_channels = Math.ceil(tube_ft / 12);
 const l_patti = Math.ceil(perimeter / 12);
 const screws = Math.ceil(area * 1.5);

 mat_txt += `> PVC Panels (10ft x 10in): ${panels} Pcs\\n`;
 mat_txt += `> Support Channel/Tube (12ft): ${pvc_channels} Pcs\\n`;
 mat_txt += `> Perimeter U-Patti/L-Patti: ${l_patti} Pcs\\n`;
 mat_txt += `> Screws (Half Inch): ${screws} Pcs\\n`;
 }

 const res = `--- ROOM DETAILS ---\\nRoom Size: ${l} ft x ${w} ft\\nTotal Area: ${area.toFixed(2)} Sq.Ft\\n-------------------------\\n--- MATERIAL REQUIRED ---\\n` + mat_txt;
 document.getElementById('ce_out').textContent = res;
 }

 function clearCeiling() {
 document.getElementById('ce_l').value = "";
 document.getElementById('ce_w').value = "";
 document.getElementById('ce_out').textContent = "";
 }


// ================================================================
 // 4 DEDICATED WORKSHOP PDF GENERATORS (CUTTING, GLASS, ALU, HARDWARE)
 // ================================================================

 // Helper: Parse hardware items from output text
 function extractHardwareList(text) {
 const hwTotals = {};
 const lines = text.split('\\n');
 let inHw = false;
 lines.forEach(l => {
 l = l.trim();
 if (l.includes('HARDWARE')) { inHw = true; return; }
 if (inHw) {
 if (l.startsWith('---') || l.startsWith('[') || l.startsWith('===')) { inHw = false; return; }
 if (l.startsWith('>')) {
 const itemLine = l.replace(/^>\s*/, '');
 if (itemLine.includes(':')) {
 const parts = itemLine.split(':');
 const name = parts[0].trim();
 const valStr = parts.slice(1).join(':').trim();
 const numMatch = valStr.match(/[0-9]+(?:\\.[0-9]+)?/);
 const unit = valStr.replace(/[0-9]+(?:\\.[0-9]+)?/, '').trim() || 'Pcs';
 if (numMatch) {
 const qty = parseFloat(numMatch[0]);
 if (!hwTotals[name]) hwTotals[name] = { qty: 0, unit: unit };
 hwTotals[name].qty += qty;
 } else {
 if (!hwTotals[name]) hwTotals[name] = { qty: valStr, unit: '' };
 }
 }
 }
 }
 });
 return hwTotals;
 }

 // 1. DEDICATED CUTTING JOB CARD PDF (For Cutting Karigar / Workshop Operator)
 function exportCutPdf(filename, title, outId, matId) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate PDF documents.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const outText = document.getElementById(outId).textContent.trim();
 if (!outText || outText.includes("here")) {
 alert("Please calculate at least one window cutting size first!");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

 // Banner Header (Deep Navy)
 doc.setFillColor(15, 23, 42); // Slate 900
 doc.rect(0, 0, 210, 30, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(15);
 doc.setTextColor(251, 191, 36); // Amber
 doc.text(shop_name, 105, 10, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(226, 232, 240);
 doc.text(`${addr} | Contact: ${contact}`, 105, 16, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(10);
 doc.setTextColor(255, 255, 255);
 doc.text(`1. FACTORY CUTTING JOB CARD (${title.toUpperCase()})`, 105, 24, { align: "center" });

 // Sub-bar
 doc.setFillColor(241, 245, 249);
 doc.rect(14, 32, 182, 6.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(30, 41, 59);
 doc.text(`DATE ISSUED: ${today}`, 18, 36.5);
 doc.text(`CUTTING STANDARD: ZERO TOLERANCE PRECISION`, 192, 36.5, { align: "right" });

 const rawWindows = outText.split(/={10,}/);
 let currentY = 41;

 rawWindows.forEach((rw, winIdx) => {
 const trimmed = rw.trim();
 if (!trimmed || trimmed.includes("ACCUMULATED MATERIAL PURCHASE")) return;

 let winTitle = `Window Unit #${winIdx + 1}`;
 const titleMatch = trimmed.match(/\\[(.*?)\\]/);
 if (titleMatch) winTitle = titleMatch[1];

 const lines = trimmed.split('\\n');
 const profiles = [];
 let section = "profiles";

 lines.forEach(l => {
 l = l.trim();
 if (!l || l.startsWith('[') || l.startsWith('===')) return;
 if (l.includes("HARDWARE") || l.includes("GLASS")) { section = "other"; return; }
 if (l.startsWith('---') || l.startsWith('> Height Formula') || l.startsWith('> Width Formula') || l.startsWith('> Glass Deduction')) return;

 const clean = l.replace(/^>\s*/, '');
 if (section === "profiles" && clean.includes(':')) {
 const parts = clean.split(':');
 const name = parts[0].trim();
 const spec = parts.slice(1).join(':').trim();

 let angle = "90° সোজা (Straight)";
 if ((winTitle.includes("Domal") || winTitle.includes("Casement") || winTitle.includes("Door")) &&
(name.includes("Outer") || name.includes("Frame") || name.includes("Sash") || name.includes("Z-Handle"))) {
 angle = "45° কোণ (Miter)";
 }

 // Extract Cut Length vs Quantity
 let lengthStr = spec;
 let qtyStr = "1 Pc";
 const qMatch = spec.match(/\\(([0-9]+)\s*pc\\)/i);
 if (qMatch) {
 qtyStr = `${qMatch[1]} Pcs`;
 lengthStr = spec.replace(/\\([0-9]+\s*pc\\)/i, '').trim();
 }

 profiles.push(["[ ]", name, lengthStr, qtyStr, angle]);
 }
 });

 if (profiles.length === 0) return;

 if (currentY > 230) { doc.addPage(); currentY = 16; }

 // Window Unit Header Box
 doc.setFillColor(30, 58, 138); // Blue 900
 doc.roundedRect(14, currentY, 182, 7.5, 1.5, 1.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(8.5);
 doc.setTextColor(255, 255, 255);
 doc.text(`UNIT #${winIdx + 1}: ${winTitle.toUpperCase()}`, 18, currentY + 5);

 currentY += 9;

 // 5-Column Cutting Table
 doc.autoTable({
 startY: currentY,
 head: [['Check', 'Section / Profile Name', 'Cut Length (কাটার মাপ)', 'Qty', 'Cut Angle (কোণ)']],
 body: profiles,
 theme: 'grid',
 headStyles: {
 fillColor: [226, 232, 240],
 textColor: [15, 23, 42],
 fontStyle: 'bold',
 fontSize: 7.5,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [203, 213, 225],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
 1: { cellWidth: 62, fontStyle: 'bold' },
 2: { cellWidth: 45, halign: 'center', fontStyle: 'bold', textColor: [15, 23, 42] },
 3: { cellWidth: 25, halign: 'center', fontStyle: 'bold', textColor: [37, 99, 235] },
 4: { cellWidth: 35, halign: 'center', fontStyle: 'bold', textColor: [217, 119, 6] }
 }
 });

 currentY = doc.lastAutoTable.finalY + 6;
 });

 // Signatures
 if (currentY > 250) { doc.addPage(); currentY = 16; }
 currentY = Math.max(currentY, 260);
 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(71, 85, 105);
 doc.text("Cutting Operator Sign: ____________________", 16, currentY);
 doc.text("Workshop Manager Sign: ____________________", 125, currentY);

 doc.save(`${filename}_Cutting_JobCard.pdf`);
 }

 // 2. DEDICATED GLASS PROCUREMENT & CUTTING ORDER PDF (For Glass Shop / Vendor)
 function exportGlassPdf(filename, title, glassDict, outId) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate PDF documents.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const keys = Object.keys(glassDict || {});
 if (keys.length === 0) {
 alert("No glass sizes calculated yet! Please calculate windows first.");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 const orderRef = "GL-" + Math.floor(1000 + Math.random() * 9000);

 // Sky Blue Banner
 doc.setFillColor(2, 132, 199); // Sky 600
 doc.rect(0, 0, 210, 30, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(15);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 105, 10, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(224, 242, 254);
 doc.text(`${addr} | Contact: ${contact}`, 105, 16, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(10);
 doc.setTextColor(254, 240, 138); // Light Gold
 doc.text(`2. GLASS PROCUREMENT & CUTTING ORDER SLIP (${title.toUpperCase()})`, 105, 24, { align: "center" });

 // Sub-bar
 doc.setFillColor(240, 249, 255);
 doc.rect(14, 32, 182, 6.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(3, 105, 161);
 doc.text(`ORDER REF: ${orderRef}`, 18, 36.5);
 doc.text(`DATE OF ORDER: ${today}`, 192, 36.5, { align: "right" });

 let currentY = 42;
 let totalPanes = 0;
 let totalSqFt = 0;

 const glassRows = keys.map((sz, idx) => {
 const qty = glassDict[sz];
 totalPanes += qty;

 // Calculate SqFt
 let sqftPerPc = 0;
 const dimMatch = sz.match(/([0-9]+(?:\.[0-9]+)?|[0-9]+\s+[0-9]+\/[0-9]+)\s*x\s*([0-9]+(?:\.[0-9]+)?|[0-9]+\s+[0-9]+\/[0-9]+)/);
 if (dimMatch) {
 const hVal = safeEval(dimMatch[1].trim());
 const wVal = safeEval(dimMatch[2].trim());
 sqftPerPc = Math.round(((hVal * wVal) / 144) * 100) / 100;
 }
 const rowTotalSqFt = Math.round((sqftPerPc * qty) * 100) / 100;
 totalSqFt += rowTotalSqFt;

 return [
 idx + 1,
 "5mm Float Glass (Clear / Frosted / Tinted)",
 sz,
 `${qty} Pcs`,
 `${sqftPerPc} Sq.Ft`,
 `${rowTotalSqFt} Sq.Ft`,
 "[ ]"
 ];
 });

 // Total Summary Row
 glassRows.push([
 { content: "TOTAL GLASS REQUIREMENT", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 249, 255] } },
 { content: `${totalPanes} Pcs`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [186, 230, 253] } },
 { content: "-", styles: { halign: 'center', fillColor: [240, 249, 255] } },
 { content: `${Math.round(totalSqFt * 100) / 100} Sq.Ft`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [254, 240, 138] } },
 { content: "", styles: { fillColor: [240, 249, 255] } }
 ]);

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Glass Specifications / Type', 'Cutting Size (H x W)', 'Quantity', 'Sq.Ft / Pc', 'Total Sq.Ft', 'Check']],
 body: glassRows,
 theme: 'grid',
 headStyles: {
 fillColor: [2, 132, 199],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2.2,
 lineColor: [186, 230, 253],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 10, halign: 'center' },
 1: { cellWidth: 60, fontStyle: 'bold' },
 2: { cellWidth: 40, halign: 'center', fontStyle: 'bold' },
 3: { cellWidth: 20, halign: 'center', fontStyle: 'bold', textColor: [2, 132, 199] },
 4: { cellWidth: 20, halign: 'center' },
 5: { cellWidth: 20, halign: 'center', fontStyle: 'bold', textColor: [15, 23, 42] },
 6: { cellWidth: 12, halign: 'center' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 12;

 // Note for Glass Vendor
 doc.setFillColor(248, 250, 252);
 doc.rect(14, currentY, 182, 16, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(51, 65, 85);
 doc.text("INSTRUCTIONS FOR GLASS VENDOR:", 18, currentY + 5);
 doc.setFont("helvetica", "normal");
 doc.text("1. Cutting accuracy must be within 1 mm diamond tolerance.", 18, currentY + 9);
 doc.text("2. Edges must be smoothly polished/arrissed to prevent rubber gasket cuts.", 18, currentY + 13);

 currentY += 25;
 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(71, 85, 105);
 doc.text("Glass Vendor Signature: ____________________", 16, currentY);
 doc.text("Order Authorized By: Saheb Ghati", 125, currentY);

 doc.save(`${filename}_Glass_Order.pdf`);
 }

 // 3. DEDICATED ALUMINIUM SECTION PURCHASE REQUISITION PDF (For Wholesale Dealer)
 function exportAluPurchasePdf(filename, title, buckets) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate purchase requisitions.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const keys = Object.keys(buckets || {});
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
 const po_no = "PO-ALU-" + Math.floor(1000 + Math.random() * 9000);

 // Emerald Green Header
 doc.setFillColor(15, 118, 110); // Teal 700
 doc.rect(0, 0, 210, 30, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(15);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 105, 10, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(204, 251, 241);
 doc.text(`${addr} | Contact: ${contact}`, 105, 16, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(10);
 doc.setTextColor(254, 240, 138); // Yellow
 doc.text(`3. ALUMINIUM SECTION PURCHASE REQUISITION (${title.toUpperCase()})`, 105, 24, { align: "center" });

 // Sub-bar
 doc.setFillColor(240, 253, 250);
 doc.rect(14, 32, 182, 6.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(19, 78, 74);
 doc.text(`PO NUMBER: ${po_no}`, 18, 36.5);
 doc.text(`DATE OF REQUISITION: ${today}`, 192, 36.5, { align: "right" });

 let currentY = 42;
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
 const estWeight = Math.round((runFt * 0.45) * 10) / 10;

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
 { content: "TOTAL SECTION REQUIREMENT", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 253, 250] } },
 { content: `${totalSticks} Sticks`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } },
 { content: `${Math.round(totalRunningFt)} Ft`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } },
 { content: `~${Math.round(totalRunningFt * 0.45)} Kg`, styles: { fontStyle: 'bold', halign: 'center', fillColor: [254, 240, 138] } }
 ]);

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Aluminium Section / Profile Name', 'Color / Finish', 'Sticks To Buy (16 Ft)', 'Total Running Ft', 'Est. Weight']],
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
 1: { cellWidth: 60, fontStyle: 'bold' },
 2: { cellWidth: 38 },
 3: { cellWidth: 32, fontStyle: 'bold', halign: 'center', textColor: [15, 118, 110] },
 4: { cellWidth: 22, halign: 'center' },
 5: { cellWidth: 18, halign: 'center', fontStyle: 'bold' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 14;

 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(71, 85, 105);
 doc.text("Aluminium Dealer Sign: ____________________", 16, currentY);
 doc.text("Requisition By: Saheb Ghati (9239413517)", 120, currentY);

 doc.save(`${filename}_Alu_Purchase_Order.pdf`);
 }

 // 4. DEDICATED HARDWARE & ACCESSORIES PURCHASE REQUISITION PDF (For Hardware Store)
 function exportHardwarePdf(filename, title, outId) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate hardware requisitions.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const outText = document.getElementById(outId).textContent.trim();
 if (!outText || outText.includes("here")) {
 alert("Please calculate at least one window first!");
 return;
 }

 const hwMap = extractHardwareList(outText);
 const hwKeys = Object.keys(hwMap);

 if (hwKeys.length === 0) {
 alert("No hardware items found in the current calculation.");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 const hwNo = "HW-" + Math.floor(1000 + Math.random() * 9000);

 // Amber / Bronze Banner Header
 doc.setFillColor(180, 83, 9); // Amber 700
 doc.rect(0, 0, 210, 30, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(15);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 105, 10, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(254, 243, 199);
 doc.text(`${addr} | Contact: ${contact}`, 105, 16, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(10);
 doc.setTextColor(254, 240, 138); // Yellow
 doc.text(`4. HARDWARE & FITTINGS PROCUREMENT REQUISITION (${title.toUpperCase()})`, 105, 24, { align: "center" });

 // Sub-bar
 doc.setFillColor(254, 243, 199);
 doc.rect(14, 32, 182, 6.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(146, 64, 14);
 doc.text(`REQUISITION NO: ${hwNo}`, 18, 36.5);
 doc.text(`DATE: ${today}`, 192, 36.5, { align: "right" });

 let currentY = 42;

 const hwRows = hwKeys.map((item, idx) => {
 const d = hwMap[item];
 let specNote = "Standard Heavy Grade";
 if (item.includes("Bearing") || item.includes("Rollers")) specNote = "Nylon / Brass Smooth Ball Bearing";
 else if (item.includes("Lock")) specNote = "Concealed Touch / Crescent Lock with Keys";
 else if (item.includes("Cleat") || item.includes("Corner")) specNote = "Aluminium L-Cleat Joint Bracket";
 else if (item.includes("Gasket")) specNote = "EPDM Weatherproof Rubber Strip";
 else if (item.includes("Woolpile")) specNote = "High-Density Brush Seal Strip";
 else if (item.includes("Screw")) specNote = "Stainless Steel Star Head Screws";

 return [
 idx + 1,
 item,
 specNote,
 d.qty,
 d.unit || "Pcs",
 "[ ]"
 ];
 });

 doc.autoTable({
 startY: currentY,
 head: [['#', 'Hardware / Fitting Item Name', 'Specification / Use', 'Required Qty', 'Unit', 'Store Check']],
 body: hwRows,
 theme: 'grid',
 headStyles: {
 fillColor: [180, 83, 9],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 8,
 cellPadding: 2.5,
 lineColor: [253, 230, 138],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 12, halign: 'center' },
 1: { cellWidth: 65, fontStyle: 'bold' },
 2: { cellWidth: 55 },
 3: { cellWidth: 22, halign: 'center', fontStyle: 'bold', textColor: [180, 83, 9] },
 4: { cellWidth: 15, halign: 'center' },
 5: { cellWidth: 13, halign: 'center' }
 }
 });

 currentY = doc.lastAutoTable.finalY + 16;

 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(71, 85, 105);
 doc.text("Hardware Store Sign: ____________________", 16, currentY);
 doc.text("Requisition By: Saheb Ghati (9239413517)", 120, currentY);

 doc.save(`${filename}_Hardware_Order.pdf`);
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

 function exportCutPdf(filename, title, outId, matId) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate PDF bills.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const outText = document.getElementById(outId).textContent.trim();
 const matText = document.getElementById(matId).textContent.trim();

 if (!outText || outText.includes("here") || false) {
 alert("Please calculate at least one window cutting size first!");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

 // 1. Main Header Banner
 doc.setFillColor(25, 42, 74); // Deep Navy
 doc.rect(0, 0, 210, 32, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(16);
 doc.setTextColor(251, 191, 36); // Amber Gold
 doc.text(shop_name, 105, 12, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8.5);
 doc.setTextColor(226, 232, 240);
 doc.text(`${addr} | Contact: ${contact}`, 105, 18, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(10.5);
 doc.setTextColor(255, 255, 255);
 doc.text(`WORKSHOP CUTTING JOB CARD & FABRICATION SCHEDULE (${title.toUpperCase()})`, 105, 26, { align: "center" });

 // Sub-bar
 doc.setFillColor(241, 245, 249);
 doc.rect(14, 34, 182, 7, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(7.5);
 doc.setTextColor(30, 41, 59);
 doc.text(`DATE ISSUED: ${today}`, 18, 39);
 doc.text(`CUTTING STANDARD: ZERO TOLERANCE PRECISION`, 192, 39, { align: "right" });

 // Parse Window-by-Window Blocks
 const rawWindows = outText.split(/={10,}/);
 let currentY = 44;

 rawWindows.forEach((rw, winIdx) => {
 const trimmed = rw.trim();
 if (!trimmed || trimmed.includes("ACCUMULATED MATERIAL PURCHASE")) return;

 let winTitle = `Window Unit #${winIdx + 1}`;
 const titleMatch = trimmed.match(/\\[(.*?)\\]/);
 if (titleMatch) winTitle = titleMatch[1];

 const lines = trimmed.split('\\n');
 const profiles = [];
 const hardware = [];
 const glass = [];
 let section = "profiles";

 lines.forEach(l => {
 l = l.trim();
 if (!l || l.startsWith('[') || l.startsWith('===')) return;
 if (l.includes("HARDWARE")) { section = "hardware"; return; }
 if (l.includes("GLASS")) { section = "glass"; return; }
 if (l.startsWith('---') || l.startsWith('> Height Formula') || l.startsWith('> Width Formula') || l.startsWith('> Glass Deduction')) return;

 const clean = l.replace(/^>\s*/, '');
 if (section === "profiles") {
 if (clean.includes(':')) {
 const parts = clean.split(':');
 const name = parts[0].trim();
 const spec = parts.slice(1).join(':').trim();

 // Feature 2: Determine Cut Angle / Degree
 let angle = "90° Straight";
 if ((winTitle.includes("Domal") || winTitle.includes("Casement") || winTitle.includes("Door")) && (name.includes("Outer") || name.includes("Frame") || name.includes("Sash") || name.includes("Z-Handle"))) {
 angle = "45° Miter (Miter)";
 } else if (name.includes("Outer") && winTitle.includes("Domal")) {
 angle = "45° Miter (Miter)";
 } else {
 angle = "90° Straight (Straight)";
 }

 const tag = `W${winIdx + 1}-P${profiles.length + 1}`;
 // Feature 3: Checkbox [ ]
 profiles.push(["[ ]", name, spec, angle, tag]);
 }
 } else if (section === "hardware") {
 hardware.push(clean);
 } else if (section === "glass") {
 glass.push(clean);
 }
 });

 if (profiles.length === 0 && glass.length === 0) return;

 // Check if page break is needed
 if (currentY > 230) {
 doc.addPage();
 currentY = 16;
 }

 // Feature 1: Window by Window Header Block
 doc.setFillColor(36, 58, 99);
 doc.roundedRect(14, currentY, 182, 7.5, 1.5, 1.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(8.5);
 doc.setTextColor(255, 255, 255);
 doc.text(`UNIT #${winIdx + 1}: ${winTitle.toUpperCase()}`, 18, currentY + 5);

 currentY += 9;

 // Profiles Table for this Window
 doc.autoTable({
 startY: currentY,
 head: [['Check', 'Section / Profile Name', 'Cutting Size & Qty', 'Cut Angle / Degree', 'Mark Tag']],
 body: profiles,
 theme: 'grid',
 headStyles: {
 fillColor: [226, 232, 240],
 textColor: [15, 23, 42],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 8,
 cellPadding: 2,
 lineColor: [203, 213, 225],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
 1: { cellWidth: 58 },
 2: { cellWidth: 52, fontStyle: 'bold' },
 3: { cellWidth: 42, halign: 'center', fontStyle: 'bold' },
 4: { cellWidth: 16, halign: 'center', fontSize: 7 }
 }
 });

 currentY = doc.lastAutoTable.finalY + 3;

 // Feature 5: Glass & Hardware Highlighted Box
 if (glass.length > 0 || hardware.length > 0) {
 const glassTxt = glass.length > 0 ? "• " + glass.join(" • ") : "Standard Float Glass";
 const hwTxt = hardware.length > 0 ? "• " + hardware.join(" • ") : "Standard Accessories";

 doc.autoTable({
 startY: currentY,
 head: [['GLASS DEPARTMENT SPECIFICATIONS', 'FITTINGS & HARDWARE CHECKLIST']],
 body: [[
 `[ ] ${glassTxt}\\n(Note: Verify square corners & edge polishing before fitting)`,
 `[ ] ${hwTxt}\\n(Note: Install woolpile & verify roller alignment)`
 ]],
 theme: 'grid',
 headStyles: {
 fillColor: [186, 230, 253], // Sky blue
 textColor: [3, 105, 161],
 fontStyle: 'bold',
 fontSize: 7.5,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2.5,
 lineColor: [186, 230, 253]
 },
 columnStyles: {
 0: { cellWidth: 91, fillColor: [240, 249, 255] },
 1: { cellWidth: 91, fillColor: [255, 251, 235] }
 }
 });
 currentY = doc.lastAutoTable.finalY + 8;
 } else {
 currentY += 5;
 }
 });

 // Feature 4: Stick-by-Stick Cutting Sequence (Material Optimization)
 if (matText && !false) {
 if (currentY > 210) {
 doc.addPage();
 currentY = 16;
 }

 doc.setFillColor(22, 101, 52); // Green Banner
 doc.roundedRect(14, currentY, 182, 7.5, 1.5, 1.5, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(8.5);
 doc.setTextColor(255, 255, 255);
 doc.text("ALUMINIUM STICK CUTTING OPTIMIZATION PLAN (STEP-BY-STEP SEQUENCES)", 18, currentY + 5);

 currentY += 9;

 const matLines = matText.split('\\n');
 const stickRows = [];
 let curProfile = "";

 matLines.forEach(ml => {
 ml = ml.trim();
 if (!ml || ml.startsWith('===')) return;
 if (ml.startsWith('[') && ml.endsWith(']')) {
 curProfile = ml.replace(/\\[|\\]/g, '');
 return;
 }
 if (ml.startsWith('> Buy:')) {
 const buyQty = ml.replace('> Buy:', '').trim();
 stickRows.push([
 { content: `PROFILE: ${curProfile.toUpperCase()} — Total to Buy: ${buyQty}`, colSpan: 3, styles: { fillColor: [220, 252, 231], fontStyle: 'bold', textColor: [20, 83, 45] } }
 ]);
 return;
 }
 if (ml.includes("Stick #")) {
 const clean = ml.replace(/^>\s*/, '');
 const stickMatch = clean.match(/Stick\s*#(\d+):/);
 const stickNum = stickMatch ? `Stick #${stickMatch[1]}` : "Stick";

 // Extract cuts sequence
 const cutMatch = clean.match(/Cut\s*\\[(.*?)\\]/);
 let seq = "Cut as per size";
 if (cutMatch) {
 const rawParts = cutMatch[1].split('+');
 const seqParts = rawParts.map(p => p.trim());
 seq = "Cut " + seqParts.join(" ➔ Cut ");
 }

 // Extract waste
 const wasteMatch = clean.match(/Waste:\s*([0-9.]+)"?/);
 let wasteStr = '0"';
 if (wasteMatch) {
 const wVal = parseFloat(wasteMatch[1]);
 const tag = wVal >= 24 ? "(Usable Offcut / Usable Offcut)" : (wVal >= 10 ? "(Short Offcut)" : "(Scrap)");
 wasteStr = `${wVal}" ${tag}`;
 }

 stickRows.push([`[ ] ${stickNum}`, seq, wasteStr]);
 }
 });

 if (stickRows.length > 0) {
 doc.autoTable({
 startY: currentY,
 head: [['Stick #', 'Step-by-Step Cutting Sequence (Cutting Sequence)', 'Waste / Remaining Balance']],
 body: stickRows,
 theme: 'grid',
 headStyles: {
 fillColor: [187, 247, 208],
 textColor: [20, 83, 45],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [187, 247, 208],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 28, fontStyle: 'bold' },
 1: { cellWidth: 94, fontStyle: 'bold' },
 2: { cellWidth: 60, fontStyle: 'bold', textColor: [180, 83, 9] }
 }
 });
 currentY = doc.lastAutoTable.finalY + 8;
 }
 }

 // Feature 6: Quality Check & Master Signatures
 if (currentY > 245) {
 doc.addPage();
 currentY = 20;
 }

 doc.autoTable({
 startY: currentY,
 head: [['CUTTING MASTER / OPERATOR', 'ASSEMBLY FITTER / CHECKER', 'AUTHORIZED WORKSHOP SIGN-OFF']],
 body: [[
 "Signature: _______________________\\n\\nName: ___________________________\\n\\nStatus: [ ] All Cuts Verified",
 "Signature: _______________________\\n\\nName: ___________________________\\n\\nStatus: [ ] Dimensions Checked",
 `Signature: _______________________\\n\\nFor: ${shop_name}\\n\\nDate: ${today.split(' ')[0]}`
 ]],
 theme: 'grid',
 headStyles: {
 fillColor: [241, 245, 249],
 textColor: [51, 65, 85],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 3,
 lineColor: [203, 213, 225]
 }
 });

 doc.setFontSize(7);
 doc.setTextColor(100, 116, 139);
 doc.text("-- Generated automatically by Smart Worker Pro Fabrication Systems • Zero-Error Precision Standards --", 105, 290, { align: "center" });

 doc.save(`${filename}.pdf`);
 }

 function exportGlassPdf(filename, title, glassDict) {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate PDF bills.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 const keys = Object.keys(glassDict);
 if (keys.length === 0) {
 alert("No glass sizes calculated yet!");
 return;
 }

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

 // Banner
 doc.setFillColor(2, 119, 189);
 doc.rect(0, 0, 210, 32, 'F');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(16);
 doc.setTextColor(255, 255, 255);
 doc.text(shop_name, 105, 12, { align: "center" });

 doc.setFont("helvetica", "normal");
 doc.setFontSize(8.5);
 doc.setTextColor(225, 245, 254);
 doc.text(`${addr} | Contact: ${contact}`, 105, 18, { align: "center" });

 doc.setFont("helvetica", "bold");
 doc.setFontSize(11);
 doc.setTextColor(255, 235, 59);
 doc.text(`CONSOLIDATED GLASS CUTTING SCHEDULE (${title.toUpperCase()})`, 105, 26, { align: "center" });

 // Sub-bar
 doc.setFillColor(235, 245, 251);
 doc.rect(14, 35, 182, 7, 'F');
 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(30, 41, 59);
 doc.text(`ISSUE DATE: ${today}`, 18, 40);
 doc.text(`STATUS: READY FOR GLASS FACTORY / CUTTING`, 192, 40, { align: "right" });

 // Rows
 let totalPcs = 0;
 const tableRows = keys.map((size, idx) => {
 const qty = glassDict[size];
 totalPcs += qty;
 return [
 idx + 1,
 "Standard Float / Tinted Glass",
 size,
 `${qty} Pcs`
 ];
 });

 // Total Row
 tableRows.push([
 { content: "TOTAL GLASS REQUIREMENT", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 240, 240] } },
 { content: `${totalPcs} Pcs`, styles: { fontStyle: 'bold', fillColor: [255, 236, 179] } }
 ]);

 doc.autoTable({
 startY: 45,
 head: [['#', 'Glass Description / Specification', 'Exact Cutting Size (Height x Width)', 'Total Qty']],
 body: tableRows,
 theme: 'grid',
 headStyles: {
 fillColor: [2, 119, 189],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 9,
 halign: 'center'
 },
 styles: {
 fontSize: 8.5,
 cellPadding: 3,
 lineColor: [180, 210, 230],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 15, halign: 'center' },
 1: { cellWidth: 70 },
 2: { cellWidth: 65, fontStyle: 'bold', halign: 'center' },
 3: { cellWidth: 32, fontStyle: 'bold', halign: 'center' }
 }
 });

 const finalY = Math.min(doc.lastAutoTable.finalY + 15, 265);
 doc.setFont("helvetica", "normal");
 doc.setFontSize(8);
 doc.setTextColor(80, 80, 80);
 doc.text("Glass Supplier / Factory Signature: _______________________", 16, finalY);
 doc.text(`Authorized Signatory (${shop_name}): _______________________`, 194, finalY, { align: "right" });

 doc.setFontSize(7);
 doc.text("-- Generated automatically by Smart Worker Pro Fabrication Systems --", 105, 290, { align: "center" });

 doc.save(`${filename}.pdf`);
 }


function saveMeasurementData(projectType, outId, matId) {
 const text = document.getElementById(outId).textContent + "\\n" + document.getElementById(matId).textContent;
 if (!text.trim()) return;
 const measurements = JSON.parse(localStorage.getItem('sw_measurements') || '[]');
 const today = new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 measurements.unshift({
 id: Date.now(),
 date: today,
 project_type: projectType,
 details: text
 });
 localStorage.setItem('sw_measurements', JSON.stringify(measurements));
 if(currentCloudUser) syncAllDataToCloud(currentCloudUser.uid);
 alert("Measurement data saved successfully!");
 }
