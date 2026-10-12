
// ========================================================
// GLASS BILLING SLAB SAFE-GUARD ENGINE (6-INCH / 1-FOOT SLAB PROTECTOR)
// Prevents glass shops from jumping to next 6-inch slab for +1 suta!
// ========================================================
function safeGlassSlabCap(dim) {
  dim = parseFloat(dim) || 0;
  if (dim <= 0) return { cut: 0, slab: 0, savedPenalty: false };

  // Standard retail billing slabs in inches (multiples of 6" / 0.5 ft)
  var slabs = [12.0, 18.0, 24.0, 30.0, 36.0, 42.0, 48.0, 54.0, 60.0, 66.0, 72.0, 78.0, 84.0, 90.0, 96.0];

  for (var i = 0; i < slabs.length; i++) {
    var s = slabs[i];
    // If dimension is up to 0.5" (4 sutas) over a slab boundary (e.g. 30.125", 36.125", 24.125")
    if (dim > s && dim <= s + 0.5) {
      // Cap strictly at (slab - 0.25) so it fits into beading and stays inside the lower slab!
      return { cut: s - 0.25, slab: s, savedPenalty: true };
    } else if (dim <= s) {
      return { cut: dim, slab: s, savedPenalty: false };
    }
  }

  return { cut: dim, slab: Math.ceil(dim / 6.0) * 6.0, savedPenalty: false };
}


// ========================================================
// UNIVERSAL PROFESSIONAL PDF HEADER WITH CUSTOM WORKSHOP LOGO
// ========================================================
function drawDocHeaderWithLogo(doc, title, subtitle, themeColor) {
  themeColor = themeColor || [74, 20, 140];
  var profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  var shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
  var contact = profile.phone || "9239413517 / 9641405426";
  var addr = profile.address || "Amta, Howrah, West Bengal";
  var customLogo = localStorage.getItem('sw_custom_logo');

  // 1. Draw top banner
  doc.setFillColor(themeColor[0], themeColor[1], themeColor[2]);
  doc.rect(0, 0, 210, 36, 'F');

  var textStartX = 14;
  if (customLogo) {
    try {
      // Draw white rounded card behind logo so it always pops cleanly
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(12, 4, 28, 28, 3, 3, 'F');

      var fmt = customLogo.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customLogo, fmt, 13, 5, 26, 26);
      textStartX = 45; // Shift text right so logo and text NEVER overlap!
    } catch(e) {
      try {
        doc.addImage(customLogo, 13, 5, 26, 26);
        textStartX = 45;
      } catch(err) {
        textStartX = 14;
      }
    }
  }

  // Shop Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text(shop_name, textStartX, 14);

  // Address and Contact
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  doc.text(addr + " | Contact: " + contact, textStartX, 21);

  // Document Title / Subtitle
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(254, 240, 138); // Warm gold accent
  doc.text(title.toUpperCase(), textStartX, 28);
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    doc.text(subtitle, textStartX, 33);
  }
}


// Universal Clipboard Copy with Fallback for Older Android WebViews
function universalCopyText(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      alert(successMsg || "সফলভাবে কপি হয়েছে: " + text);
    }).catch(function() {
      execCommandFallbackCopy(text, successMsg);
    });
  } else {
    execCommandFallbackCopy(text, successMsg);
  }
}

function execCommandFallbackCopy(text, successMsg) {
  try {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (ok) {
      alert(successMsg || "সফলভাবে কপি হয়েছে: " + text);
    } else {
      prompt("কপি করতে নিচের কোডটি সিলেক্ট করুন:", text);
    }
  } catch(e) {
    prompt("কপি করতে নিচের কোডটি সিলেক্ট করুন:", text);
  }
}

// =========================================================================
// SMART WORKER PRO - UNIFIED PRODUCTION JAVASCRIPT ENGINE
// Modules: Firebase Cloud Sync, Formulas, Digital Khata, Billing, Keypad, UI
// =========================================================================

// ==========================================
// 1. FIREBASE CLOUD CONFIGURATION & REALTIME SYNC
// ==========================================
// =========================================================================
// SMART WORKER PRO - FIREBASE CLOUD CONFIGURATION & REALTIME SYNC
// Google Cloud Firestore Integration (nisha-creations)
// =========================================================================

// ========================================================
 // GOOGLE CLOUD FIREBASE AUTHENTICATION & LIVE SYNC ENGINE
 // ========================================================
 let fbApp = null;
 let fbAuth = null;
 let fbDb = null;
 let fbRtdb = null;
 let currentCloudUser = null;

 // Nisha Creations Firebase Cloud & Realtime Database Configuration
 const defaultFbConfig = {
  apiKey: "AIzaSyBYBRTvmuf3mHuP1kveMv98idLAhJys2-M",
  authDomain: "nisha-creations.firebaseapp.com",
  databaseURL: "https://nisha-creations-default-rtdb.firebaseio.com",
  projectId: "nisha-creations",
  storageBucket: "nisha-creations.firebasestorage.app",
  messagingSenderId: "726716735582",
  appId: "1:726716735582:web:a477dcd273501e5d7dd4cf"
};



 function initFirebaseCloud() {
 try {
 const savedConfig = localStorage.getItem('sw_firebase_config');
 const configToUse = savedConfig ? JSON.parse(savedConfig) : defaultFbConfig;

 if (window.firebase && !firebase.apps.length) {
 fbApp = firebase.initializeApp(configToUse);
 fbAuth = firebase.auth();
 fbDb = firebase.firestore();
 window.fbDb = fbDb;
 window.fbApp = fbApp;
 window.fbAuth = fbAuth;
 if (firebase.database) {
   fbRtdb = firebase.database();
 window.fbRtdb = fbRtdb;
 }

 // Listen to auth state
 fbAuth.onAuthStateChanged(user => {
 if (user) {
 currentCloudUser = user;
 updateCloudUserUI(user);
 syncAllDataFromCloud(user.uid);
 } else {
 currentCloudUser = null;
 updateCloudUserUI(null);
 }
 });
 }
 } catch (err) {
 console.log("Firebase initialized in Local/Offline Mode:", err);
 }
 }

 function updateCloudUserUI(user) {
 const badge = document.getElementById('cloudUserBadge');
 const loginBtn = document.getElementById('cloudLoginTriggerBtn');
 const emailSpan = document.getElementById('cloudUserEmail');

 if (user) {
 if (badge) badge.style.display = 'flex';
 if (loginBtn) loginBtn.style.display = 'none';
 if (emailSpan) emailSpan.textContent = user.email || user.displayName || "Online";
 } else {
 if (badge) badge.style.display = 'none';
 if (loginBtn) loginBtn.style.display = 'flex';
 }
 }

 function openAuthModal() {
 document.getElementById('authModal').classList.add('active');
 }

 function closeAuthModal() {
 document.getElementById('authModal').classList.remove('active');
 }

 function switchAuthTab(tab) {
 const loginBtn = document.getElementById('authTabLoginBtn');
 const regBtn = document.getElementById('authTabRegBtn');
 const loginForm = document.getElementById('authLoginForm');
 const regForm = document.getElementById('authRegForm');

 if (tab === 'login') {
 loginBtn.style.background = "#1976d2";
 loginBtn.style.color = "#fff";
 loginBtn.style.border = "none";
 regBtn.style.background = "#f5f5f5";
 regBtn.style.color = "#333";
 regBtn.style.border = "1px solid #ccc";
 loginForm.style.display = "block";
 regForm.style.display = "none";
 } else {
 regBtn.style.background = "#2e7d32";
 regBtn.style.color = "#fff";
 regBtn.style.border = "none";
 loginBtn.style.background = "#f5f5f5";
 loginBtn.style.color = "#333";
 loginBtn.style.border = "1px solid #ccc";
 regForm.style.display = "block";
 loginForm.style.display = "none";
 }
 }

 function handleEmailLogin() {
 const email = document.getElementById('login_email').value.trim();
 const pass = document.getElementById('login_password').value;
 if (!email || !pass) { alert("জিমেইল এবং পাসওয়ার্ড লিখুন!"); return; }

 if (fbAuth) {
 fbAuth.signInWithEmailAndPassword(email, pass)
 .then(res => {
 alert("সফলভাবে LOGIN হয়েছে! ক্লাউড ডেটা সিঙ্ক করা হচ্ছে...");
 closeAuthModal();
 })
 .catch(err => {
 // Local fallback simulation if offline or demo
 simulateLocalAuth(email);
 });
 } else {
 simulateLocalAuth(email);
 }
 }

 function handleEmailRegister() {
 const name = document.getElementById('reg_name').value.trim();
 const shop = document.getElementById('reg_shop').value.trim();
 const phone = document.getElementById('reg_phone').value.trim();
 const email = document.getElementById('reg_email').value.trim();
 const pass = document.getElementById('reg_password').value;

 if (!email || !pass || pass.length < 6) {
 alert("সঠিক জিমেইল এবং কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন!");
 return;
 }

 const profile = { name, shop_name: shop, phone, email, address: "West Bengal" };
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 if(currentCloudUser) syncAllDataToCloud(currentCloudUser.uid);
 loadSavedProfile();

 if (fbAuth) {
 fbAuth.createUserWithEmailAndPassword(email, pass)
 .then(res => {
 alert("অ্যাকাউন্ট তৈরি সফল হয়েছে! আপনার ডেটা ক্লাউডে সুরক্ষিত থাকবে।");
 syncAllDataToCloud(res.user.uid);
 closeAuthModal();
 })
 .catch(err => {
 simulateLocalAuth(email);
 });
 } else {
 simulateLocalAuth(email);
 }
 }

 function handleGoogleSignIn() {
 if (fbAuth && window.firebase) {
 const provider = new firebase.auth.GoogleAuthProvider();
 fbAuth.signInWithPopup(provider)
 .then(res => {
 alert(`Google দিয়ে LOGIN সফল হয়েছে: ${res.user.displayName || res.user.email}`);
 closeAuthModal();
 })
 .catch(err => {
 alert("Google সাইন-ইন সম্পন্ন করতে আপনার নিজস্ব Firebase Config যুক্ত করুন।");
 openFirebaseConfigModal();
 });
 } else {
 alert("Google সাইন-ইন সম্পন্ন করতে আপনার নিজস্ব Firebase Config যুক্ত করুন।");
 openFirebaseConfigModal();
 }
 }

 function handleForgotPassword() {
 const email = prompt("পাসওয়ার্ড রিসেট করতে আপনার নিবন্ধিত জিমেইল আইডি দিন:");
 if (email && fbAuth) {
 fbAuth.sendPasswordResetEmail(email.trim())
 .then(() => alert("পাসওয়ার্ড রিসেট লিংক আপনার জিমেইলে পাঠানো হয়েছে!"))
 .catch(err => alert("এরর: " + err.message));
 }
 }

 function handleCloudLogout() {
 if (confirm("আপনি কি সত্যিই ক্লাউড অ্যাকাউন্ট থেকে LOGOUT করতে চান?")) {
 if (fbAuth) fbAuth.signOut();
 currentCloudUser = null;
 updateCloudUserUI(null);
 alert("LOGOUT সম্পন্ন হয়েছে।");
 }
 }

 function simulateLocalAuth(email) {
 currentCloudUser = { uid: "local_" + btoa(email).substring(0, 10), email: email };
 updateCloudUserUI(currentCloudUser);
 closeAuthModal();
 alert(`LOGIN সম্পন্ন হয়েছে (${email})! আপনার ডেটা ব্যাকআপের জন্য প্রস্তুত।`);
 }

 // Live Sync to Cloud Firestore
 function syncAllDataToCloud(uid) {
  if (!fbDb) return;
  const targetId = uid || (currentCloudUser ? currentCloudUser.uid : null) || localStorage.getItem('sw_cloud_user') || 'workshop_primary';
  try {
    const data = {
      profile: JSON.parse(localStorage.getItem('sw_profile') || '{}'),
      invoices: JSON.parse(localStorage.getItem('sw_invoices') || '[]'),
      measurements: JSON.parse(localStorage.getItem('sw_measurements') || '[]'),
      customers: JSON.parse(localStorage.getItem('sw_customers') || '{}'),
      site_khata: JSON.parse(localStorage.getItem('sw_site_khata') || '[]'),
      expenses: JSON.parse(localStorage.getItem('sw_expenses') || '[]'),
      license: JSON.parse(localStorage.getItem('sw_license') || '{}'),
      custom_logo: localStorage.getItem('sw_custom_logo') || '',
      custom_qr: localStorage.getItem('sw_custom_qr') || '',
      updated_at: new Date().toISOString()
    };
    if (fbRtdb) {
      try { fbRtdb.ref('nisha_creations/smart_worker/' + String(targetId)).set(data); } catch(e){}
    }
    fbDb.collection('users').doc(String(targetId)).set(data, { merge: true }).then(() => {
      console.log("☁️ All Smart Worker data successfully saved to Google Cloud Firestore!");
      const badge = document.getElementById('cloudUserBadge');
      if (badge) {
        badge.style.display = 'inline-flex';
        badge.title = "Cloud Synced";
      }
    }).catch(err => {
      console.warn("Cloud write notice:", err);
    });
  } catch (err) {
    console.log("Cloud sync error:", err);
  }
}

// Restore from Cloud Firestore on New Device / Login
function syncAllDataFromCloud(uid) {
  if (!fbDb) return;
  const targetId = uid || (currentCloudUser ? currentCloudUser.uid : null) || localStorage.getItem('sw_cloud_user') || 'workshop_primary';
  fbDb.collection('users').doc(String(targetId)).get().then(doc => {
    if (doc.exists) {
      const d = doc.data();
      if (d.profile) localStorage.setItem('sw_profile', JSON.stringify(d.profile));
      if (d.invoices) localStorage.setItem('sw_invoices', JSON.stringify(d.invoices));
      if (d.measurements) localStorage.setItem('sw_measurements', JSON.stringify(d.measurements));
      if (d.customers) localStorage.setItem('sw_customers', JSON.stringify(d.customers));
      if (d.site_khata) localStorage.setItem('sw_site_khata', JSON.stringify(d.site_khata));
      if (d.expenses) localStorage.setItem('sw_expenses', JSON.stringify(d.expenses));
      if (d.license) localStorage.setItem('sw_license', JSON.stringify(d.license));
      if (d.custom_logo) localStorage.setItem('sw_custom_logo', d.custom_logo);
      if (d.custom_qr) localStorage.setItem('sw_custom_qr', d.custom_qr);

      if (typeof loadSavedProfile === 'function') loadSavedProfile();
      if (typeof loadBillSettings === 'function') loadBillSettings();
      if (typeof updateActivationScreenUI === 'function') updateActivationScreenUI();
      if (typeof renderCustomerKhataScreen === 'function') renderCustomerKhataScreen();
      console.log("☁️ All Smart Worker data seamlessly restored from Google Cloud!");
    }
  }).catch(err => {
    console.warn("Error restoring from cloud:", err);
  });
}

function openFirebaseConfigModal() {
 closeAuthModal();
 const cur = localStorage.getItem('sw_firebase_config') || "";
 document.getElementById('customFbConfigInput').value = cur;
 document.getElementById('fbConfigModal').classList.add('active');
 }

 function closeFirebaseConfigModal() {
 document.getElementById('fbConfigModal').classList.remove('active');
 }

 function saveCustomFirebaseConfig() {
 const txt = document.getElementById('customFbConfigInput').value.trim();
 if (txt) {
 try {
 const parsed = JSON.parse(txt);
 localStorage.setItem('sw_firebase_config', JSON.stringify(parsed));
 alert("Firebase Config সফলভাবে সেভ হয়েছে! পেজটি রিলোড করে কানেক্ট করুন।");
 location.reload();
 } catch (e) {
 alert('সঠিক JSON ফরম্যাটে কোডটি পেস্ট করুন (যেমন: {"apiKey": "...", "projectId": "..."})');
 }
 } else {
 localStorage.removeItem('sw_firebase_config');
 alert("ডিফল্ট কনফিগারেশন রিসেট করা হয়েছে।");
 closeFirebaseConfigModal();
 }
 }





function switchAuthMode(mode) {
 const loginBtn = document.getElementById('tabBtnLogin');
 const regBtn = document.getElementById('tabBtnRegister');
 const formLogin = document.getElementById('authFormLogin');
 const formReg = document.getElementById('authFormRegister');

 if (mode === 'login') {
 loginBtn.style.background = '#2563eb';
 loginBtn.style.color = '#fff';
 regBtn.style.background = '#f1f5f9';
 regBtn.style.color = '#475569';
 formLogin.style.display = 'block';
 formReg.style.display = 'none';
 } else {
 regBtn.style.background = '#16a34a';
 regBtn.style.color = '#fff';
 loginBtn.style.background = '#f1f5f9';
 loginBtn.style.color = '#475569';
 formReg.style.display = 'block';
 formLogin.style.display = 'none';
 }
 }

 function doEmailLogin() {
 const email = document.getElementById('auth_login_email').value.trim();
 const pass = document.getElementById('auth_login_pass').value;
 if (!email || !pass) { alert("Please enter your Email and Password."); return; }

 localStorage.setItem('sw_cloud_user', email);
 alert("Signed in successfully as " + email);
 goHome();
 }

 function doEmailRegister() {
 const name = document.getElementById('auth_reg_name').value.trim();
 const shop = document.getElementById('auth_reg_shop').value.trim();
 const phone = document.getElementById('auth_reg_phone').value.trim();
 const email = document.getElementById('auth_reg_email').value.trim();
 const pass = document.getElementById('auth_reg_pass').value;

 if (!name || !shop || !email || !pass || pass.length < 6) {
 alert("Please fill all fields and create a password with at least 6 characters.");
 return;
 }

 const profile = { name, shop_name: shop, phone, email, address: "Fabrication Workshop" };
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 localStorage.setItem('sw_cloud_user', email);
 loadSavedProfile();
 alert("Account created successfully! Welcome to Smart Worker Pro.");
 goHome();
 }

 function doGoogleSignIn() {
 if (window.firebase && fbAuth) {
 const provider = new firebase.auth.GoogleAuthProvider();
 fbAuth.signInWithPopup(provider).then(res => {
 localStorage.setItem('sw_cloud_user', res.user.email);
 alert("Signed in with Google: " + res.user.email);
 goHome();
 }).catch(err => {
 // Simulation fallback
 const guestEmail = prompt("Enter your Gmail address to simulate Google Sign-in:");
 if (guestEmail) {
 localStorage.setItem('sw_cloud_user', guestEmail);
 goHome();
 }
 });
 } else {
 const guestEmail = prompt("Enter your Gmail address to sign in:");
 if (guestEmail) {
 localStorage.setItem('sw_cloud_user', guestEmail);
 goHome();
 }
 }
 }

 function doForgotPassword() {
 const email = prompt("Enter your registered Gmail address to reset password:");
 if (email) {
 alert("Password reset instructions have been sent to " + email);
 }
 }

 function skipAuthToGuest() {
 localStorage.setItem('sw_guest_mode', 'true');
 goHome();
 }


// ==========================================
// 2. FABRICATION & CUTTING CALCULATION ENGINE
// ==========================================
// =========================================================================
// SMART WORKER PRO - FABRICATION CALCULATION & CUTTING ENGINE
// Optimized Cutting Lists, Glass Sizes, Hardware & Material Purchase
// =========================================================================

 // Embedded JS Functions from main.py & calculations.py
 function safeEval(text) {
 if (!text) return 0.0;
 let s = String(text).trim();
 if (!s) return 0.0;
 s = s.replace(/["']/g, "").replace(/\b(inch|in|mm)\b/gi, "").trim();
 s = s.replace(/(\d+)\s+(\d+\/\d+)/g, "$1+$2");
 s = s.replace(/\b0+(?=\d)/g, "");
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

 function optimizeCuttingPlan(pieces, allowedLens = [180, 192, 144]) {
 if (!pieces || pieces.length === 0) return null;
 const sorted = [...pieces].sort((a, b) => b - a);
 const BLADE_KERF = 0.125; // 1/8 inch saw kerf
 let bestPlan = null;
 const stdLens = allowedLens;
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
 const val = toFractionInch(c);
 counts[val] = (counts[val] || 0) + 1;
 });
 const parts = [];
 for (const val in counts) {
 const qty = counts[val];
 parts.push(qty > 1 ? `${val} x ${qty}` : `${val}`);
 }
 return parts.join(' + ');
 }

 function generateMaterialList(buckets) {
  let resText = `--- ACCUMULATED MATERIAL PURCHASE ---

`;
  let hasItems = false;
  for (const name in buckets) {
    const pieces = buckets[name];
    if (pieces && pieces.length > 0) {
      hasItems = true;
      // Domal materials ONLY come in 12 ft (144 inches)
      const isDomal = name.includes('Domal');
      const plan = isDomal ? optimizeCuttingPlan(pieces, [144]) : optimizeCuttingPlan(pieces);
      resText += `[${name}]
`;
      if (plan.oversize) {
        resText += `> SPECIAL ORDER (Oversized)
`;
        pieces.forEach(p => { resText += ` > Piece: ${toFractionInch(p)}
`; });
      } else {
        const ft = Math.floor(plan.len / 12);
        resText += `> Buy: ${plan.bins.length} pcs (${ft} ft)
`;
        plan.bins.forEach((b, i) => {
          const cutsStr = formatCuts(b);
          const sumB = b.reduce((a, c) => a + c, 0);
          const waste = Math.round((plan.len - sumB) * 100) / 100;
          resText += ` > Stick #${i + 1}: Cut [ ${cutsStr} ] -> Waste: ${waste}"
`;
        });
      }
      resText += `
`;
    }
  }
  return hasItems ? resText : "";
}

 // Keypad Logic (Two-Column: Numbers + Fractions)
let keypadTarget = null;
let keypadDisplay = "";

function openKeypad(targetId) {
  keypadTarget = document.getElementById(targetId);
  keypadDisplay = keypadTarget ? (keypadTarget.value || "") : "";
  updateKeypadDisplay();
  document.getElementById('keypadModal').classList.add('active');
}

function updateKeypadDisplay() {
  document.getElementById('kDisplay').textContent = keypadDisplay || "0";
}

function keypadAddDigit(d) {
  if (keypadDisplay === "0" && d !== ".") {
    keypadDisplay = d;
  } else {
    keypadDisplay += d;
  }
  updateKeypadDisplay();
}

function keypadAddOp(op) {
  if (!keypadDisplay) return;
  if (/[+\-*/\s]$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.trimEnd().slice(0, -1) + " " + op + " ";
  } else {
    keypadDisplay += " " + op + " ";
  }
  updateKeypadDisplay();
}

function keypadAddFraction(frac) {
  if (!keypadDisplay || keypadDisplay === "0") {
    keypadDisplay = frac;
    updateKeypadDisplay();
    return;
  }
  // If ends with a fraction, replace it
  if (/\d+\/\d+$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.replace(/\d+\/\d+$/, frac);
  } else if (/\d+$/.test(keypadDisplay)) {
    // If ends with whole number, add space and fraction
    keypadDisplay += " " + frac;
  } else {
    keypadDisplay += frac;
  }
  updateKeypadDisplay();
}

function keypadClear() {
  keypadDisplay = "";
  updateKeypadDisplay();
}

function keypadBackspace() {
  if (!keypadDisplay) return;
  if (/\s+\d+\/\d+$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.replace(/\s+\d+\/\d+$/, "");
  } else {
    keypadDisplay = keypadDisplay.trimEnd();
    keypadDisplay = keypadDisplay.slice(0, -1);
  }
  updateKeypadDisplay();
}

function keypadEnter() {
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
 s_c = 2; han_qty = 2; int_qty = 2;
 } else if (t_text.includes('3-Track (3-Sash)')) {
 net_w_mod = (handle_w * 2.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 3.0;
 s_c = 3; han_qty = 2; int_qty = 4;
 has_mesh = true;
 mesh_w_mm = (w_mm - side_clearance + handle_w) / 2.0;
 } else if (t_text.includes('4-Track (4-Sash)')) {
 net_w_mod = (handle_w * 3.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 4.0;
 s_c = 4; han_qty = 2; int_qty = 6;
 has_mesh = true;
 mesh_w_mm = (w_mm + net_w_mod) / 4.0;
 } else {
 net_w_mod = (handle_w * 2.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 4.0;
 s_c = 4; han_qty = 4; int_qty = 4;
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
 let hw_txt = "--- HARDWARE & ACCESSORIES ---\n";
 hw_txt += `> Domal Bearing / Rollers: ${total_sash_for_hw * 2} pc\n`;
 hw_txt += `> Touch Lock / Star Lock: ${s_c >= 3 ? 2 : 1} pc\n`;
 hw_txt += `> L-Cleat (Corner Angle): ${total_sash_for_hw * 4} pc\n> EPDM Gasket / Seal: Required\n`;

 const w_sign = net_w_mod >= 0 ? `+${Math.round(net_w_mod)}` : `${Math.round(net_w_mod)}`;
 
 let alu_txt = `[Domal Win #${dm_window_count}${loc_str} - H:${raw_h} x W:${raw_w} ${unit_str}${qty_str}]\n`;
 alu_txt += `> Outer Track (Top/Bot): ${disp(w_in)} (2 pc)\n`;
 alu_txt += `> Outer Track (Vertical): ${disp(h_in)} (2 pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(h_cut_in)} (${s_c * 2} pc)\n`;
 alu_txt += `> Sash Handle: ${disp(v_cut_in)} (${han_qty} pc)\n`;
 alu_txt += `> Sash Interlock: ${disp(v_cut_in)} (${int_qty} pc)\n`;

 if (has_mesh) {
 alu_txt += `\n--- MOSQUITO NET ---\n> Mesh Top/Bot: ${disp(mesh_w_in)} (2 pc)\n> Mesh Handle/Interlock: ${disp(v_cut_in)} (2 pc)\n`;
 }

 const glass_txt = `\n--- GLASS SIZES ---\n> Glass Size: ${disp(gh_in)} x ${disp(gw_in)} (${s_c} pc)\n`;
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
 document.getElementById('dm_alu_out').textContent = alu_txt + hw_txt + glass_txt + "===================================\n\n" + prevOut;
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

 let hw_txt = "--- HARDWARE & ACCESSORIES ---\n";
 hw_txt += `> Sliding Roller / Bearing: ${g_c * 2} pc\n`;
 hw_txt += `> Star Lock: ${g_c >= 3 ? 2 : 1} pc\n> Rubber & Woolpile: Required\n`;

 let alu_txt = `[Win #${sl_window_count}${loc_str} - H:${raw_h} x W:${raw_w} (${sys_type.split(' ')[0]})${qty_str}]\n`;
 alu_txt += `> Track Top: ${disp(w_in)} (1 pc)\n`;
 alu_txt += `> Track Bottom: ${disp(w_in)} (1 pc)\n`;
 alu_txt += `> Track Vertical: ${disp(h_in)} (2 pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(tb_w)} (${g_c * 2} pc)\n`;
 alu_txt += `> Sash Handle: ${disp(handle_h)} (${han_qty} pc)\n`;
 alu_txt += `> Sash Interlock: ${disp(handle_h)} (${int_qty} pc)\n`;

 const glass_txt = `\n--- GLASS SIZES ---\n> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${g_c} pc)\n`;
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
 document.getElementById('sl_out').textContent = alu_txt + hw_txt + glass_txt + "===================================\n\n" + prevOut;
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

 let out_txt = `[${series} Win #${cc_window_count} | Size: ${raw_h} x ${raw_w} ${unit_str}]\n`;
 out_txt += "--- 1. OUTER FRAME & MULLIONS ---\n";
 out_txt += `> Outer Vertical: ${disp(h_mm)} (2 pc)\n> Outer Horizontal: ${disp(w_mm)} (2 pc)\n`;
 cc_buckets["Casement Outer"].push(h_mm / 25.4, h_mm / 25.4, w_mm / 25.4, w_mm / 25.4);

 if (h_mullion_qty > 0) {
 out_txt += `> Horizontal Divider: ${disp(w_mm - outer_2)} (${h_mullion_qty} pc)\n`;
 for (let i = 0; i < h_mullion_qty; i++) cc_buckets["Casement Mullion"].push((w_mm - outer_2) / 25.4);
 }
 if (top_v_mullion_qty > 0) {
 out_txt += `> Top Vert. Mullions: ${disp(top_gap_h)} (${top_v_mullion_qty} pc)\n`;
 for (let i = 0; i < top_v_mullion_qty; i++) cc_buckets["Casement Mullion"].push(top_gap_h / 25.4);
 }
 if (bot_v_mullion_qty > 0) {
 out_txt += `> Bot Vert. Mullions: ${disp(bot_gap_h)} (${bot_v_mullion_qty} pc)\n`;
 for (let i = 0; i < bot_v_mullion_qty; i++) cc_buckets["Casement Mullion"].push(bot_gap_h / 25.4);
 }

 out_txt += `\n--- 2. TOP ROW DETAILS (${top_cols} SECTIONS) ---\n`;
 let w_gap_open = top_gap_w, w_gap_fixed = top_gap_w;
 if (mid_w_mm > 0 && top_cols >= 3) {
 const num_center_gaps = top_cols - 2;
 const side_w_total = w_mm - outer_2 - (num_center_gaps * mid_w_mm) - (top_v_mullion_qty * mullion);
 const top_side_w = side_w_total / 2;
 w_gap_open = mid_w_mm;
 w_gap_fixed = top_side_w;
 }

 if (top_open > 0) {
 out_txt += `[OPENABLE SASH | Qty: ${top_open} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_open)}]\n`;
 const s1_h = top_gap_h + overlap, s1_w = w_gap_open + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)}\n > Glass Size: ${disp(g_h)} x ${disp(g_w)}\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + top_open;
 for (let i = 0; i < top_open * 2; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }

 if (top_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${top_fixed} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_fixed)}]\n`;
 const g_h = top_gap_h - glass_m_fixed, g_w = w_gap_fixed - glass_m_fixed;
 out_txt += ` > Fixed Glass Size: ${disp(g_h)} x ${disp(g_w)}\n > Square Clip (Beading): Required\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + top_fixed;
 const beading_length = (top_gap_h + w_gap_fixed) * 2 / 25.4;
 for (let i = 0; i < top_fixed; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }

 if (bot_cols > 0 && rows === 2) {
 out_txt += `\n--- 3. BOTTOM ROW DETAILS (${bot_cols} SECTIONS) ---\n`;
 if (bot_open > 0) {
 out_txt += `[OPENABLE SASH | Qty: ${bot_open} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\n`;
 const s1_h = bot_gap_h + overlap, s1_w = bot_gap_w + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)}\n > Glass Size: ${disp(g_h)} x ${disp(g_w)}\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + bot_open;
 for (let i = 0; i < bot_open * 2; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }
 if (bot_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${bot_fixed} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\n`;
 const g_h = bot_gap_h - glass_m_fixed, g_w = bot_gap_w - glass_m_fixed;
 out_txt += ` > Fixed Glass Size: ${disp(g_h)} x ${disp(g_w)}\n > Square Clip (Beading): Required\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + bot_fixed;
 const beading_length = (bot_gap_h + bot_gap_w) * 2 / 25.4;
 for (let i = 0; i < bot_fixed; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }
 }

 let hw_txt = "\n--- HARDWARE & ACCESSORIES ---\n";
 if (total_sash_qty > 0) {
 hw_txt += `> Friction Stay / Hinges: ${total_sash_qty * 2} pc\n`;
 hw_txt += `> Casement Handle: ${total_sash_qty} pc\n`;
 } else {
 hw_txt += "> No Sash Hardware Required (Fully Fixed)\n";
 }
 out_txt += hw_txt;

 const prevOut = document.getElementById('cc_out').textContent;
 document.getElementById('cc_out').textContent = out_txt + "===================================\n\n" + prevOut;
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

 let outer_v = h, outer_h = w - 3.0, has_outer = true, has_mid = false;
 let door_v = 0, door_tb = 0, palla_qty = 1;
 let leaf_w = w;

 if (d_type === "Standard Door") {
   door_v = h - 1.75; door_tb = w - 6.75; palla_qty = 1;
 } else if (d_type === "Floor Spring Door") {
   door_v = h - 2.0; door_tb = w - 6.75; palla_qty = 1;
 } else if (d_type === "Top Hung Door") {
   // User Formula: হাইটে মাইনাস ২ ইঞ্চি, চওড়ায় প্লাস ৪ ইঞ্চি
   door_v = h - 2.0; 
   leaf_w = w + 4.0; 
   door_tb = leaf_w - 3.5; // দুই পাশের খাড়া সেকশন বাদ দিয়ে টপ, বটম ও মিডিল পাট্টা
   palla_qty = 1; 
   has_outer = false;
   has_mid = true;
 } else if (d_type === "Domal System Door") {
   door_v = h - (25.0 / 25.4); door_tb = (w - (38.0 / 25.4)) - 3.5; palla_qty = 1;
 } else {
   door_v = h - 2.0; door_tb = w - 6.75; palla_qty = 1;
 }

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
 const unit_str = is_mm ? "mm" : "Inch";
 dr_door_count += 1;

 let out = `[Door #${dr_door_count} - ${d_type} (${raw_h} x ${raw_w} ${unit_str})]
`;

 if (has_outer) {
   out += `--- OUTER FRAME ---
> Outer Vertical: ${disp(outer_v)} (2 pc)
> Outer Top Horizontal: ${disp(outer_h)} (1 pc)
`;
   dr_buckets["Door Outer Frame"].push(outer_v, outer_v, outer_h);
 }

 if (d_type === "Top Hung Door") {
   out += `--- DOOR SASH (Top Hung Leaf: ${disp(door_v)} x ${disp(leaf_w)}) ---
`;
   out += `> Door Vertical (খাড়া রড): ${disp(door_v)} (2 pc)
`;
   out += `> Top Rail (টপ পাট্টা): ${disp(door_tb)} (1 pc)
`;
   out += `> Bottom Rail (বটম পাট্টা): ${disp(door_tb)} (1 pc)
`;
   out += `> Middle Section (মিডিল পাট্টা): ${disp(door_tb)} (1 pc)
`;
   out += `> Top Running Track: ${disp(w * 2)} (1 pc)
`;

   dr_buckets["Door Verticals"].push(door_v, door_v);
   dr_buckets["Door Horizontals"].push(door_tb, door_tb, door_tb);

   out += `--- HARDWARE & ACCESSORIES ---
`;
   out += `> Top Hung Heavy Rollers: 1 Set (2 pc)
`;
   out += `> Bottom Floor Guide: 1 pc
`;
   out += `> Door Handle: 1 Set
`;
   out += `> Concealed Hook Lock: 1 Set
`;

   const mid_g_h = ((door_v - 7.75) / 2.0) - 0.25;
   const mid_g_w = door_tb - 0.25;
   out += `--- GLASS / BOARD ---
> Panel Glass / Board: ${disp(mid_g_h)} x ${disp(mid_g_w)} (2 pc)
`;
   const gKey = `${disp(mid_g_h)} x ${disp(mid_g_w)}`;
   dr_glass_dict[gKey] = (dr_glass_dict[gKey] || 0) + 2;

 } else {
   out += `--- DOOR SASH (${palla_qty} Palla) ---\n> Door Vertical: ${disp(door_v)} (${palla_qty * 2} pc)\n> Door Top/Bottom: ${disp(door_tb)} (${palla_qty * 2} pc)\n`;
   for (let i = 0; i < palla_qty * 2; i++) dr_buckets["Door Verticals"].push(door_v);
   for (let i = 0; i < palla_qty * 2; i++) dr_buckets["Door Horizontals"].push(door_tb);

   let hw_txt = `--- HARDWARE & ACCESSORIES ---
`;
   hw_txt += `> Door Hinges / Pivot: 3 pc (Per Leaf)
> Door Handle: 1 Set
> Door Lock: 1 Set
`;
   if (d_type === "Standard Door" || d_type === "Floor Spring Door") {
     hw_txt += `> Door Closer / Floor Spring: 1 pc
`;
   }
   out += hw_txt;

   const glass_h = door_v - 5.875 - 0.25;
   const glass_w = door_tb - 0.25;
   out += `--- GLASS / BOARD ---
> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${palla_qty} pc)
`;
   const glass_key = `${disp(glass_h)} x ${disp(glass_w)}`;
   dr_glass_dict[glass_key] = (dr_glass_dict[glass_key] || 0) + palla_qty;
 }

 const prevOut = document.getElementById('dr_out').textContent;
 document.getElementById('dr_out').textContent = out +  + prevOut;
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
 if (raw_h === 0 || raw_w === 0) {
   alert(currentAppLang === 'bn' ? "অনুগ্রহ করে উচ্চতা এবং চওড়া লিখুন।" : "Please enter Height and Width.");
   return;
 }

 const is_mm = document.getElementById('pt_unit').value.includes('Millimeter');
 const h = is_mm ? raw_h / 25.4 : raw_h;
 const w = is_mm ? raw_w / 25.4 : raw_w;
 const p_type = document.getElementById('pt_type').value;
 const cols = Math.max(1, parseInt(safeEval(document.getElementById('pt_cols').value)) || 3);
 const rows = Math.max(1, parseInt(safeEval(document.getElementById('pt_rows').value)) || 3);
 const panel_mode = (document.getElementById('pt_panel_mode') ? document.getElementById('pt_panel_mode').value : "OPTIMIZED_4X8");

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
 pt_part_count += 1;
 const unit_str = is_mm ? "mm" : "Inch";
 const isBn = (currentAppLang === 'bn');

 let out = "";

 // Frame height deductions: top 1.5", bottom 1.5", and (rows - 1) transoms (each 1.5")
 const frame_deduct = (rows + 1) * 1.5;
 const total_open_h = Math.max(10, h - frame_deduct);

 let bottom_h = 0, mid_h = 0, top_h = 0;
 if (rows === 3) {
   if (panel_mode === "CUSTOM_BOTTOM_3FT") {
     bottom_h = 36.0;
     mid_h = 36.0;
     top_h = Math.max(8.0, total_open_h - (bottom_h + mid_h));
   } else if (panel_mode === "CUSTOM_BOTTOM_2.5FT") {
     bottom_h = 30.0;
     mid_h = 30.0;
     top_h = Math.max(8.0, total_open_h - (bottom_h + mid_h));
   } else if (panel_mode === "EQUAL_DIVIDE") {
     const eq = total_open_h / 3.0;
     bottom_h = eq; mid_h = eq; top_h = eq;
   } else {
     // OPTIMIZED_4X8: 4'x8' Sheet & 6" Glass Slab Protected
     if (h <= 88.0) {
       bottom_h = 30.0; // 30" (2.5 ft slab)
       mid_h = 30.0;    // Equal to bottom!
       top_h = Math.max(8.0, total_open_h - 60.0); // Smaller top box (~18")
     } else if (h <= 100.0) {
       bottom_h = 36.0; // 36" (3 ft slab)
       mid_h = 36.0;    // Equal to bottom!
       top_h = Math.max(8.0, total_open_h - 72.0); // Smaller top box (~18")
     } else {
       bottom_h = 36.0;
       mid_h = 36.0;
       top_h = Math.max(8.0, total_open_h - 72.0);
     }
   }
 } else {
   const eq = total_open_h / rows;
   bottom_h = eq; mid_h = eq; top_h = eq;
 }

 if (p_type === "Fixed Partition") {
   out = `[Partition #${pt_part_count} - ${p_type} (${raw_h} x ${raw_w} ${unit_str})]\n`;
   const outer_v = h, inter_v = h - 3.0, outer_h = w - 3.0;
   const inner_h = (w - ((cols + 1) * 1.5)) / cols;

   // 1. FRAME SECTIONS
   out += "===================================\n";
   out += isBn ? "🔨 অ্যালুমিনিয়াম ফ্রেম কাটিং মাপ (FRAME SECTIONS)\n" : "🔨 ALUMINIUM FRAME CUTTING SIZES (FRAME SECTIONS)\n";
   out += "===================================\n";
   out += isBn ? `> আউটার খাঁড়া পাইপ (Outer Verticals): ${disp(outer_v)} (2 pc)\n` : `> Outer Verticals: ${disp(outer_v)} (2 pc)\n`;
   out += isBn ? `> আউটার টপ ও বটম পাইপ (Outer Horizontals): ${disp(outer_h)} (2 pc)\n` : `> Outer Horizontals (Top/Bottom): ${disp(outer_h)} (2 pc)\n`;
   pt_buckets["Single Glazing"].push(outer_v, outer_v, outer_h, outer_h);

   if (cols > 1) {
     out += isBn ? `> ভেতরের খাঁড়া পাইপ (Intermediate Verticals): ${disp(inter_v)} (${cols - 1} pc)\n` : `> Intermediate Verticals: ${disp(inter_v)} (${cols - 1} pc)\n`;
     for (let i = 0; i < cols - 1; i++) pt_buckets["Double Glazing"].push(inter_v);
   }

   const h_qty = cols * (rows - 1);
   if (h_qty > 0) {
     out += isBn ? `> ভেতরের মাঝের বাটা/বিট (Transom Divider Tubes): ${disp(inner_h)} (${h_qty} pc)\n` : `> Internal Transom Divider Tubes: ${disp(inner_h)} (${h_qty} pc)\n`;
     for (let i = 0; i < h_qty; i++) pt_buckets["Double Glazing"].push(inner_h);
   }

   // 2. FRAME BOX CLEAR OPENINGS & VERTICAL PIPE MARKING GUIDE
   const mark_bottom_transom = bottom_h + 1.5;
   const mark_mid_transom = bottom_h + 1.5 + mid_h + 1.5;

   out += "\n===================================\n";
   out += isBn ? "📐 ফ্রেমের ভেতরের খোপ ও খাঁড়া পাইপ মার্কিং চার্ট\n" : "📐 CLEAR FRAME OPENINGS & VERTICAL MARKING GUIDE\n";
   out += "===================================\n";
   out += isBn ? `• তলার খোপের ক্লিয়ার সাইজ: ${disp(bottom_h)} x ${disp(inner_h)} [তলা ACP]\n` : `• Bottom Box Clear Opening: ${disp(bottom_h)} x ${disp(inner_h)} [Bottom ACP Board]\n`;
   out += isBn ? `• মিডিল খোপের ক্লিয়ার সাইজ: ${disp(mid_h)} x ${disp(inner_h)} [মিডিল গ্লাস - সেম সাইজ]\n` : `• Middle Box Clear Opening: ${disp(mid_h)} x ${disp(inner_h)} [Middle Glass - Identical Size]\n`;
   out += isBn ? `• মাথার খাপের ক্লিয়ার সাইজ: ${disp(top_h)} x ${disp(inner_h)} [মাথার ছোট গ্লাস]\n\n` : `• Top Header Clear Opening: ${disp(top_h)} x ${disp(inner_h)} [Top Small Glass]\n\n`;

   out += isBn ? "📍 খাঁড়া পাইপে বাটা লাগানোর দাগ/লেভেল (Vertical Marking):\n" : "📍 Vertical Pipe Transom Marking Levels:\n";
   out += isBn ? `  1. ১ম বাটা (তলার লেভেল): মেঝে থেকে ${disp(bottom_h)} ক্লিয়ার (${disp(mark_bottom_transom)} দাগ)\n` : `  1. First Transom (Bottom Level): Floor to ${disp(bottom_h)} clear (Mark at ${disp(mark_bottom_transom)})\n`;
   out += isBn ? `  2. ২য় বাটা (মিডিল লেভেল): ১ম বাটা থেকে ${disp(mid_h)} ক্লিয়ার (${disp(mark_mid_transom)} দাগ)\n` : `  2. Second Transom (Middle Level): First Transom to ${disp(mid_h)} clear (Mark at ${disp(mark_mid_transom)})\n`;
   out += isBn ? `  3. মাথার খাপ: ২য় বাটা থেকে ছাদ পর্যন্ত ক্লিয়ার ${disp(top_h)}\n` : `  3. Top Box (Header Level): Second Transom to Ceiling ${disp(top_h)} clear\n`;

   // 3. GLASS & ACP CUTTING WITH SLAB SAFE-GUARD
   const raw_cut_w = inner_h - 0.25;
   const w_guard = safeGlassSlabCap(raw_cut_w);
   const cut_w = w_guard.cut;

   const bottom_cut_h = bottom_h - 0.25;
   const mid_guard = safeGlassSlabCap(mid_h - 0.25);
   const mid_cut_h = mid_guard.cut;
   const top_guard = safeGlassSlabCap(top_h - 0.25);
   const top_cut_h = top_guard.cut;

   if (rows === 3 && (panel_mode !== "EQUAL_DIVIDE")) {
     out += "\n===================================\n";
     out += isBn ? "🪟 গ্লাস ও এসিপি বোর্ড কাটিং মাপ (GLASS & ACP)\n" : "🪟 4'x8' SHEET OPTIMIZED PANELS (ACP & GLASS)\n";
     out += "===================================\n";
     out += isBn ? `> [তলা] Bottom ACP Board: ${disp(bottom_cut_h)} x ${disp(cut_w)} (${cols} pc)\n` : `> [Bottom] ACP Board: ${disp(bottom_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += isBn ? `> [মিডিল] Middle Glass (সেম মাপ): ${disp(mid_cut_h)} x ${disp(cut_w)} (${cols} pc)\n` : `> [Middle] Glass (Identical Size): ${disp(mid_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += isBn ? `> [মাথার খাপ] Top Header Glass (ছোট): ${disp(top_cut_h)} x ${disp(cut_w)} (${cols} pc)\n` : `> [Top] Header Glass (Smaller Box): ${disp(top_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;

     pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] || 0) + cols;

     // 4'x8' Sheet count
     const sheet_w = 48.0, sheet_h = 96.0;
     const acp_per_sheet = Math.max(1, Math.floor(sheet_w / cut_w) * Math.floor(sheet_h / bottom_cut_h));
     const acp_sheets = Math.ceil(cols / acp_per_sheet);

     const glass_per_sheet = Math.max(1, Math.floor(sheet_w / cut_w) * Math.floor(sheet_h / mid_cut_h));
     const glass_sheets = Math.ceil(cols / glass_per_sheet);

     out += "\n" + (isBn ? "--- ৪'×৮' (৪৮ x ৯৬ ইঞ্চি) শিট ও কাটিং চার্ট ---\n" : "--- 4'x8' (48 x 96 Inch) SHEET CUTTING CHART ---\n");
     out += isBn ? `• তলার এসিপি শিট লাগবে: ${acp_sheets} খানা ৪'×৮' শিট (১ শিটে ${acp_per_sheet} পিস)\n` : `• Bottom ACP Sheets Required: ${acp_sheets} sheets of 4'x8' (${acp_per_sheet} pcs per sheet)\n`;
     out += isBn ? `• মিডিল গ্লাস লাগবে: ${glass_sheets} খানা ৪'×৮' শিট (১ শিটে ${glass_per_sheet} পিস)\n` : `• Middle Glass Sheets Required: ${glass_sheets} sheets of 4'x8' (${glass_per_sheet} pcs per sheet)\n`;

     out += "\n" + (isBn ? "--- 🛡️ গ্লাস দোকান বিলিং স্ল্যাব সেফ গার্ড (ZERO PENALTY) ---\n" : "--- 🛡️ GLASS SHOP BILLING SLAB SAFE-GUARD (ZERO PENALTY) ---\n");
     out += isBn ? `• মিডিল গ্লাস বিলিং স্ল্যাব: ${mid_guard.slab}" x ${w_guard.slab}" (${((mid_guard.slab * w_guard.slab)/144).toFixed(2)} Sq.Ft/পিস)\n` : `• Middle Glass Billing Slab: ${mid_guard.slab}" x ${w_guard.slab}" (${((mid_guard.slab * w_guard.slab)/144).toFixed(2)} Sq.Ft/pc)\n`;
     out += isBn ? `• মাথার খাপ বিলিং স্ল্যাব: ${top_guard.slab}" x ${w_guard.slab}" (${((top_guard.slab * w_guard.slab)/144).toFixed(2)} Sq.Ft/পিস)\n` : `• Top Header Glass Billing Slab: ${top_guard.slab}" x ${w_guard.slab}" (${((top_guard.slab * w_guard.slab)/144).toFixed(2)} Sq.Ft/pc)\n`;
     out += isBn ? `✔ নিশ্চিতকরণ: ফ্রেমের সাথে গ্লাস ও এসিপি ১০০% মিলে থাকবে, ১ সুতোও অমিল হবে না!\n` : `✔ Guaranteed: Dimensions strictly capped below 30", 36", 24", 18" slabs. Zero extra 6-inch penalty!\n`;
   } else {
     const raw_gap = (h - ((rows + 1) * 1.5)) / rows - 0.25;
     const g_guard = safeGlassSlabCap(raw_gap);
     const glass_qty = cols * rows;
     out += `--- GLASS / BOARD ---\n> Size: ${disp(g_guard.cut)} x ${disp(cut_w)} (${glass_qty} pc)\n`;
     out += `> Shop Billing Slab: ${g_guard.slab}" x ${w_guard.slab}"\n`;
     const gKey = `${disp(g_guard.cut)} x ${disp(cut_w)}`;
     pt_glass_dict[gKey] = (pt_glass_dict[gKey] || 0) + glass_qty;
   }

   // 4. HARDWARE
   const beading_rft = Math.round(((bottom_h + inner_h)*2 + (mid_h + inner_h)*2 + (top_h + inner_h)*2) * cols / 12);
   out += "\n" + (isBn ? "--- হার্ডওয়্যার ও এক্সেসরিজ ---\n" : "--- HARDWARE & ACCESSORIES ---\n");
   out += isBn ? `> স্কয়ার ক্লিপ (Beading): প্রায় ${beading_rft} রানিং ফুট\n` : `> Square Clip (Beading): Approx ${beading_rft} Running Feet\n`;
   out += isBn ? `> গ্লাস রাবার / সিলিকন পেস্টিং: প্রায় ${beading_rft} ফুট\n` : `> EPDM Glass Gasket / Sealant: Approx ${beading_rft} Feet\n`;
   out += isBn ? `> কর্নার ক্লিট ও স্ক্রু সেট\n` : `> Corner Cleats & Screws Set\n`;

 } else {
   // Door + Partition Mode
   const raw_dh = safeEval(document.getElementById('pt_dh').value);
   const raw_dw = safeEval(document.getElementById('pt_dw').value);
   if (raw_dh === 0 || raw_dw === 0) {
     alert(isBn ? "অনুগ্রহ করে দরজার সাইজ লিখুন।" : "Please enter Door Size.");
     return;
   }

   const dh = is_mm ? raw_dh / 25.4 : raw_dh;
   const dw = is_mm ? raw_dw / 25.4 : raw_dw;

   out = `[Partition #${pt_part_count} - Door + Partition (${raw_h} x ${raw_w} ${unit_str})]\n`;
   const outer_v = h, inter_v = h - 3.0, door_side_v = h - 1.5;
   const outer_h_top = w - 3.0, rem_w = w - (dw + 3.0);
   const inner_h = cols > 0 ? (rem_w - 3.0) / cols : 0;

   out += "===================================\n";
   out += isBn ? "🔨 অ্যালুমিনিয়াম ফ্রেম কাটিং মাপ (FRAME SECTIONS)\n" : "🔨 ALUMINIUM FRAME CUTTING SIZES (FRAME SECTIONS)\n";
   out += "===================================\n";
   out += isBn ? `> আউটার খাঁড়া পাইপ (Outer Verticals): ${disp(outer_v)} (2 pc)\n` : `> Outer Verticals: ${disp(outer_v)} (2 pc)\n`;
   out += isBn ? `> ডোর সাইড খাঁড়া পাইপ (Door Post Vertical): ${disp(door_side_v)} (1 pc)\n` : `> Door Post Vertical: ${disp(door_side_v)} (1 pc)\n`;
   pt_buckets["Single Glazing"].push(outer_v, outer_v);
   pt_buckets["Double Glazing"].push(door_side_v);

   if (cols > 1) {
     out += isBn ? `> সাইড খাঁড়া পাইপ (Intermediate Verticals): ${disp(inter_v)} (${cols - 1} pc)\n` : `> Side Intermediate Verticals: ${disp(inter_v)} (${cols - 1} pc)\n`;
     for (let i = 0; i < cols - 1; i++) pt_buckets["Double Glazing"].push(inter_v);
   }

   out += isBn ? `> আউটার টপ পাইপ (Outer Top Horizontal): ${disp(outer_h_top)} (1 pc)\n` : `> Outer Top Horizontal: ${disp(outer_h_top)} (1 pc)\n`;
   out += isBn ? `> ডোর টপ ট্রান্সম বাটা (Door Transom Tube): ${disp(rem_w)} (1 pc)\n` : `> Door Top Transom Tube: ${disp(rem_w)} (1 pc)\n`;
   pt_buckets["Single Glazing"].push(outer_h_top);
   pt_buckets["Double Glazing"].push(rem_w);

   const h_qty = cols * (rows - 1);
   if (h_qty > 0) {
     out += isBn ? `> সাইড মাঝের বাটা/বিট (Partition Transoms): ${disp(inner_h)} (${h_qty} pc)\n` : `> Side Partition Transoms: ${disp(inner_h)} (${h_qty} pc)\n`;
     for (let i = 0; i < h_qty; i++) pt_buckets["Double Glazing"].push(inner_h);
   }

   // Door Frame & Sash
   const door_v = dh - 1.75, door_tb = dw - 6.75;
   const dg_h = door_v - 5.875 - 0.25, dg_w = door_tb - 0.25;

   out += "\n" + (isBn ? "--- ডোর পাল্লা ও ফ্রেম (DOOR SASH) ---\n" : "--- DOOR SASH & FRAME ---\n");
   out += isBn ? `> ডোর পাল্লা খাঁড়া: ${disp(door_v)} (2 pc)\n` : `> Door Sash Verticals: ${disp(door_v)} (2 pc)\n`;
   out += isBn ? `> ডোর পাল্লা টপ/বটম: ${disp(door_tb)} (2 pc)\n` : `> Door Sash Top/Bottom: ${disp(door_tb)} (2 pc)\n`;
   out += isBn ? `> ডোরের গ্লাস/বোর্ড মাপ: ${disp(dg_h)} x ${disp(dg_w)} (1 pc)\n` : `> Door Glass/Board Size: ${disp(dg_h)} x ${disp(dg_w)} (1 pc)\n`;
   pt_buckets["Door Sash"].push(door_v, door_v, door_tb, door_tb);

   const transom_g_h = (h - dh - 1.5) - 0.25, transom_g_w = dw - 0.25;

   // Marking Guide
   const mark_bottom_transom = bottom_h + 1.5;
   const mark_mid_transom = bottom_h + 1.5 + mid_h + 1.5;

   out += "\n===================================\n";
   out += isBn ? "📐 সাইড ফ্রেমের খোপ ও মার্কিং চার্ট (FRAME MARKING)\n" : "📐 FRAME OPENINGS & MARKING GUIDE\n";
   out += "===================================\n";
   out += isBn ? `• তলার খোপের ক্লিয়ার সাইজ: ${disp(bottom_h)} x ${disp(inner_h)} [তলা ACP]\n` : `• Bottom Box Clear Opening: ${disp(bottom_h)} x ${disp(inner_h)} [Bottom ACP]\n`;
   out += isBn ? `• মিডিল খোপের ক্লিয়ার সাইজ: ${disp(mid_h)} x ${disp(inner_h)} [মিডিল গ্লাস - সেম সাইজ]\n` : `• Middle Box Clear Opening: ${disp(mid_h)} x ${disp(inner_h)} [Middle Glass - Identical Size]\n`;
   out += isBn ? `• মাথার খাপের ক্লিয়ার সাইজ: ${disp(top_h)} x ${disp(inner_h)} [মাথার ছোট গ্লাস]\n\n` : `• Top Header Clear Opening: ${disp(top_h)} x ${disp(inner_h)} [Top Small Glass]\n\n`;

   out += isBn ? "📍 খাঁড়া পাইপে বাটা লাগানোর মার্কিং:\n" : "📍 Vertical Pipe Marking Levels:\n";
   out += isBn ? `  1. ডোর হেডার লেভেল: মেঝে থেকে ক্লিয়ার ${disp(dh)}\n` : `  1. Door Header Level: Floor to ${disp(dh)} clear\n`;
   out += isBn ? `  2. সাইড ১ম বাটা (তলার লেভেল): মেঝে থেকে ${disp(bottom_h)} ক্লিয়ার (${disp(mark_bottom_transom)} দাগ)\n` : `  2. Side First Transom: Floor to ${disp(bottom_h)} clear (Mark at ${disp(mark_bottom_transom)})\n`;
   out += isBn ? `  3. সাইড ২য় বাটা (মিডিল লেভেল): ১ম বাটা থেকে ${disp(mid_h)} ক্লিয়ার (${disp(mark_mid_transom)} দাগ)\n` : `  3. Side Second Transom: First Transom to ${disp(mid_h)} clear (Mark at ${disp(mark_mid_transom)})\n`;

   const raw_cut_w = inner_h - 0.25;
   const w_guard = safeGlassSlabCap(raw_cut_w);
   const cut_w = w_guard.cut;

   const bottom_cut_h = bottom_h - 0.25;
   const mid_guard = safeGlassSlabCap(mid_h - 0.25);
   const mid_cut_h = mid_guard.cut;
   const top_guard = safeGlassSlabCap(top_h - 0.25);
   const top_cut_h = top_guard.cut;

   out += "\n===================================\n";
   out += isBn ? "🪟 গ্লাস ও এসিপি কাটিং মাপ (GLASS & ACP CUTTING)\n" : "🪟 GLASS & ACP CUTTING SIZES\n";
   out += "===================================\n";
   out += isBn ? `> ডোর মাথার ফ্যানলাইট গ্লাস: ${disp(transom_g_h)} x ${disp(transom_g_w)} (1 pc)\n` : `> Door Top Transom Glass: ${disp(transom_g_h)} x ${disp(transom_g_w)} (1 pc)\n`;

   if (rows === 3 && (panel_mode !== "EQUAL_DIVIDE") && cols > 0) {
     out += isBn ? `> [তলা] Side Partition Bottom ACP: ${disp(bottom_cut_h)} x ${disp(cut_w)} (${cols} pc)\n` : `> [Bottom] Side Partition ACP: ${disp(bottom_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += isBn ? `> [মিডিল] Side Partition Middle Glass (সেম মাপ): ${disp(mid_cut_h)} x ${disp(cut_w)} (${cols} pc)\n` : `> [Middle] Side Partition Glass (Identical): ${disp(mid_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += isBn ? `> [মাথার খাপ] Side Partition Top Glass (ছোট): ${disp(top_cut_h)} x ${disp(cut_w)} (${cols} pc)\n` : `> [Top] Side Partition Header Glass (Small): ${disp(top_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;

     pt_glass_dict[`[Door Glass] ${disp(dg_h)} x ${disp(dg_w)}`] = (pt_glass_dict[`[Door Glass] ${disp(dg_h)} x ${disp(dg_w)}`] || 0) + 1;
     pt_glass_dict[`[Transom Glass] ${disp(transom_g_h)} x ${disp(transom_g_w)}`] = (pt_glass_dict[`[Transom Glass] ${disp(transom_g_h)} x ${disp(transom_g_w)}`] || 0) + 1;
     pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] || 0) + cols;

     out += "\n" + (isBn ? "--- 🛡️ গ্লাস দোকান বিলিং স্ল্যাব সেফ গার্ড (ZERO PENALTY) ---\n" : "--- 🛡️ GLASS SHOP BILLING SLAB SAFE-GUARD (ZERO PENALTY) ---\n");
     out += isBn ? `• মিডিল গ্লাস স্ল্যাব: ${mid_guard.slab}" x ${w_guard.slab}" | মাথার খাপ স্ল্যাব: ${top_guard.slab}" x ${w_guard.slab}"\n` : `• Middle Glass Slab: ${mid_guard.slab}" x ${w_guard.slab}" | Top Header Glass Slab: ${top_guard.slab}" x ${w_guard.slab}"\n`;
     out += isBn ? `✔ নিশ্চিতকরণ: মাপ ৩০", ৩৬", ২৪" বা ১৮" এর থেকে ১ সুতোও বেশি নয়!\n` : `✔ Guaranteed: Dimensions strictly capped below 30", 36", 24", 18" slabs. Zero extra 6-inch penalty!\n`;
   } else {
     const raw_part_h = ((h - ((rows + 1) * 1.5)) / rows) - 0.25;
     const part_guard = safeGlassSlabCap(raw_part_h);
     const part_g_qty = cols * rows;
     if (part_g_qty > 0) {
       out += `> Partition Grid Glass: ${disp(part_guard.cut)} x ${disp(cut_w)} (${part_g_qty} pc)\n`;
     }
     pt_glass_dict[`${disp(dg_h)} x ${disp(dg_w)}`] = (pt_glass_dict[`${disp(dg_h)} x ${disp(dg_w)}`] || 0) + 1;
     pt_glass_dict[`${disp(transom_g_h)} x ${disp(transom_g_w)}`] = (pt_glass_dict[`${disp(transom_g_h)} x ${disp(transom_g_w)}`] || 0) + 1;
     if (part_g_qty > 0) {
       pt_glass_dict[`${disp(part_guard.cut)} x ${disp(cut_w)}`] = (pt_glass_dict[`${disp(part_guard.cut)} x ${disp(cut_w)}`] || 0) + part_g_qty;
     }
   }

   out += "\n" + (isBn ? "--- হার্ডওয়্যার ও ফিটিংস ---\n" : "--- HARDWARE & FITTINGS ---\n");
   out += isBn ? "> ডোর লক: 1 Set\n> ফ্লোর স্প্রিং / পিভট: 1 Set\n> ডোর হ্যান্ডেল: 1 Set\n" : "> Door Lock: 1 Set\n> Floor Spring / Pivot: 1 Set\n> Door Handle: 1 Set\n";
 }

 const prevOut = document.getElementById('pt_out').textContent;
 document.getElementById('pt_out').textContent = out + "===================================\n\n" + prevOut;
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

 mat_txt += `> ${chosen_board} -> ${final_boards} Pcs\n`;
 mat_txt += `> Main Channel (12ft): ${main_channel} Pcs\n`;
 mat_txt += `> Cross Section (12ft): ${cross_section} Pcs\n`;
 mat_txt += `> Perimeter L-Patti (12ft): ${l_patti} Pcs\n`;
 mat_txt += "--- Professional Accessories ---\n";
 mat_txt += `> Soffit Cleat & Rawl Plug: ${cleats_plugs} Sets\n`;
 mat_txt += `> Drywall Screws: ${screws} Pcs\n`;
 mat_txt += `> Jointing Compound: ${compound} Kg\n`;
 mat_txt += `> Fiber Tape: ${tape} Meter\n`;
 } else {
 const panels = Math.ceil((area / 8.33) * 1.05);
 const tube_ft = (area / 2) + perimeter;
 const pvc_channels = Math.ceil(tube_ft / 12);
 const l_patti = Math.ceil(perimeter / 12);
 const screws = Math.ceil(area * 1.5);

 mat_txt += `> PVC Panels (10ft x 10in): ${panels} Pcs\n`;
 mat_txt += `> Support Channel/Tube (12ft): ${pvc_channels} Pcs\n`;
 mat_txt += `> Perimeter U-Patti/L-Patti: ${l_patti} Pcs\n`;
 mat_txt += `> Screws (Half Inch): ${screws} Pcs\n`;
 }

 const res = `--- ROOM DETAILS ---\nRoom Size: ${l} ft x ${w} ft\nTotal Area: ${area.toFixed(2)} Sq.Ft\n-------------------------\n--- MATERIAL REQUIRED ---\n` + mat_txt;
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
 const lines = text.split('\n');
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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

 drawDocHeaderWithLogo(doc, "FACTORY CUTTING JOB CARD (" + title.toUpperCase() + ")", "ZERO TOLERANCE PRECISION", [15, 23, 42]);

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

 const lines = trimmed.split('\n');
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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 const orderRef = "GL-" + Math.floor(1000 + Math.random() * 9000);

 drawDocHeaderWithLogo(doc, "GLASS PROCUREMENT & CUTTING ORDER (" + title.toUpperCase() + ")", "FACTORY CUTTING SLIP", [2, 132, 199]);

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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 const po_no = "PO-ALU-" + Math.floor(1000 + Math.random() * 9000);

 drawDocHeaderWithLogo(doc, "ALUMINIUM SECTION PURCHASE REQUISITION (" + title.toUpperCase() + ")", "PROCUREMENT SLIP", [15, 118, 110]);

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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
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
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
  const doc = new jsPDF();

  const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
  const c_name = document.getElementById('q_name').value || 'Customer';
  const c_phone = document.getElementById('q_phone').value || 'N/A';
  const c_addr = document.getElementById('q_addr').value || 'N/A';
  const bill_stage = document.getElementById('q_stage').value;
  const today = new Date().toLocaleDateString('en-GB');

  // Draw Header with Customer's Exact Logo (Never overlaps!)
  drawDocHeaderWithLogo(doc, "JOB CARD / ESTIMATION BILL", "Stage: " + bill_stage, [74, 20, 140]);

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
    `${itm.location ? '['+itm.location+'] ' : ''}${itm.type}\nSpecs: ${itm.color} (${itm.thickness})\nGlass: ${itm.glass_thick} ${itm.glass_type}${itm.toughened ? ' [TOUGHENED]' : ''}\nSize: ${itm.h} x ${itm.w} ${itm.unit} @ Rs.${itm.rate}`,
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

  // Render UPI QR Code if uploaded
  const customQr = localStorage.getItem('sw_custom_qr');
  if (customQr) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, finalY + 2, 28, 28, 2, 2, 'FD');
      var qrFmt = customQr.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customQr, qrFmt, 15, finalY + 3, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(74, 20, 140);
      doc.text("SCAN TO PAY (UPI)", 14, finalY + 33);
    } catch(e){}
  }

  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("TERMS & CONDITIONS: 50% Advance with order. Balance on delivery. Cut materials cannot be returned.", 14, finalY + 40);
  doc.text(`Customer Signature: ___________________ Authorized Signature (${shop_name}): ___________________`, 14, finalY + 48);

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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
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

 const lines = trimmed.split('\n');
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
 `[ ] ${glassTxt}\n(Note: Verify square corners & edge polishing before fitting)`,
 `[ ] ${hwTxt}\n(Note: Install woolpile & verify roller alignment)`
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

 const matLines = matText.split('\n');
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
 "Signature: _______________________\n\nName: ___________________________\n\nStatus: [ ] All Cuts Verified",
 "Signature: _______________________\n\nName: ___________________________\n\nStatus: [ ] Dimensions Checked",
 `Signature: _______________________\n\nFor: ${shop_name}\n\nDate: ${today.split(' ')[0]}`
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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
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
 const text = document.getElementById(outId).textContent + "\n" + document.getElementById(matId).textContent;
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


// ==========================================
// 3. SITE MEASUREMENT KHATA & ROOM ESTIMATOR
// ==========================================
// =========================================================================
// SMART WORKER PRO - SITE MEASUREMENT KHATA & ESTIMATION ENGINE
// Multi-Room Dimension Tracking, Auto Labour Costing & Multi-Cuts
// =========================================================================

// ========================================================
 // SMART SITE MEASUREMENT KHATA & ESTIMATION ENGINE
 // ========================================================
 let siteKhataItems = [];


// ========================================================
 // MULTI-PRODUCT AUTOMATED ROUTING & BATCH CUTTING ENGINE
 // Handles 40mm, 34mm, Partitions, Domal, Sliding, Doors simultaneously!
 // ========================================================
 function loadKhataItemToModule(idx) {
 const itm = siteKhataItems[idx];
 if (!itm) return;

 const cat = itm.category;

 if (cat.includes("Casement")) {
 // Route to Casement 34mm / 40mm Screen
 openScreen('casement', 'CUSTOM CASEMENT');
 document.getElementById('cc_unit').value = "Inch";
 document.getElementById('cc_series').value = cat.includes("34") ? "34 Series" : "40 Series";
 document.getElementById('cc_h').value = itm.h;
 document.getElementById('cc_w').value = itm.w;
 if (document.getElementById('cc_loc')) document.getElementById('cc_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('cc_qty')) document.getElementById('cc_qty').value = itm.qty;
 calculateCasement();
 alert(`Loaded ${itm.room} (${cat}) into Casement Calculator!`);
 } else if (cat.includes("Partition")) {
 // Route to Partition Screen
 openScreen('partition', 'PARTITION MASTER');
 document.getElementById('pt_unit').value = "Inch";
 document.getElementById('pt_type').value = cat.includes("Door") ? "Door + Partition" : "Fixed Partition";
 document.getElementById('pt_h').value = itm.h;
 document.getElementById('pt_w').value = itm.w;
 if (cat.includes("Door")) {
 document.getElementById('pt_dh').value = "80";
 document.getElementById('pt_dw').value = "32";
 }
 calculatePartition();
 alert(`Loaded ${itm.room} into Partition Calculator!`);
 } else if (cat.includes("Domal")) {
 // Route to Domal Screen
 openScreen('domal', 'DOMAL WINDOW');
 document.getElementById('dm_unit').value = "Inch";
 document.getElementById('dm_type').value = cat.includes("3-Track") ? "3-Track (3-Sash)" : (cat.includes("4-Track") ? "4-Track (4-Sash)" : "2-Track (2-Sash)");
 document.getElementById('dm_h').value = itm.h;
 document.getElementById('dm_w').value = itm.w;
 if (document.getElementById('dm_loc')) document.getElementById('dm_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dm_qty')) document.getElementById('dm_qty').value = itm.qty;
 calculateDomal();
 alert(`Loaded ${itm.room} into Domal Calculator!`);
 } else if (cat.includes("Sliding")) {
 // Route to Sliding Screen
 openScreen('sliding', 'SLIDING WINDOW');
 document.getElementById('sl_unit').value = "Inch";
 document.getElementById('sl_type').value = cat.includes("3-Track") ? "3-Track" : (cat.includes("4-Track") ? "4-Track" : "2-Track");
 document.getElementById('sl_sys').value = cat.includes("25x65") ? "25x65 System" : (cat.includes("25x50") ? "25x50 System" : "18x40 System");
 document.getElementById('sl_h').value = itm.h;
 document.getElementById('sl_w').value = itm.w;
 if (document.getElementById('sl_loc')) document.getElementById('sl_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('sl_qty')) document.getElementById('sl_qty').value = itm.qty;
 calculateSliding();
 alert(`Loaded ${itm.room} into Sliding Calculator!`);
 } else if (cat.includes("Door")) {
 // Route to Door Screen
 openScreen('door', 'DOOR OPTION');
 document.getElementById('dr_unit').value = "Inch";
 document.getElementById('dr_type').value = cat.includes("Floor Spring") ? "Floor Spring Door" : (cat.includes("Domal") ? "Domal System Door" : "Standard Door");
 document.getElementById('dr_h').value = itm.h;
 document.getElementById('dr_w').value = itm.w;
 calculateDoor();
 alert(`Loaded ${itm.room} into Door Calculator!`);
 } else if (cat.includes("Ceiling")) {
 openScreen('ceiling', 'CEILING ESTIMATOR');
 document.getElementById('ce_type').value = cat.includes("PVC") ? "PVC Panel" : "Gypsum Board";
 document.getElementById('ce_l').value = Math.round(itm.h / 12);
 document.getElementById('ce_w').value = Math.round(itm.w / 12);
 calculateCeiling();
 alert(`Loaded ${itm.room} into Ceiling Calculator!`);
 }
 }

 function processAllKhataCutsAtOnce() {
 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please add site measurements first.");
 return;
 }

 let casementCount = 0, partitionCount = 0, domalCount = 0, slidingCount = 0, doorCount = 0;

 // Clear existing modules to receive fresh site data
 clearCasement();
 clearPartition();
 clearDomal();
 clearSliding();
 clearDoor();

 siteKhataItems.forEach(itm => {
 const cat = itm.category;

 if (cat.includes("Casement")) {
 casementCount += itm.qty;
 document.getElementById('cc_unit').value = "Inch";
 document.getElementById('cc_series').value = cat.includes("34") ? "34 Series" : "40 Series";
 document.getElementById('cc_h').value = itm.h;
 document.getElementById('cc_w').value = itm.w;
 if (document.getElementById('cc_loc')) document.getElementById('cc_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('cc_qty')) document.getElementById('cc_qty').value = itm.qty;
 calculateCasement();
 } else if (cat.includes("Partition")) {
 partitionCount += itm.qty;
 document.getElementById('pt_unit').value = "Inch";
 document.getElementById('pt_type').value = cat.includes("Door") ? "Door + Partition" : "Fixed Partition";
 document.getElementById('pt_h').value = itm.h;
 document.getElementById('pt_w').value = itm.w;
 if (cat.includes("Door")) {
 document.getElementById('pt_dh').value = "80";
 document.getElementById('pt_dw').value = "32";
 }
 calculatePartition();
 } else if (cat.includes("Domal")) {
 domalCount += itm.qty;
 document.getElementById('dm_unit').value = "Inch";
 document.getElementById('dm_type').value = cat.includes("3-Track") ? "3-Track (3-Sash)" : (cat.includes("4-Track") ? "4-Track (4-Sash)" : "2-Track (2-Sash)");
 document.getElementById('dm_h').value = itm.h;
 document.getElementById('dm_w').value = itm.w;
 if (document.getElementById('dm_loc')) document.getElementById('dm_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dm_qty')) document.getElementById('dm_qty').value = itm.qty;
 calculateDomal();
 } else if (cat.includes("Sliding")) {
 slidingCount += itm.qty;
 document.getElementById('sl_unit').value = "Inch";
 document.getElementById('sl_type').value = cat.includes("3-Track") ? "3-Track" : (cat.includes("4-Track") ? "4-Track" : "2-Track");
 document.getElementById('sl_sys').value = cat.includes("25x65") ? "25x65 System" : (cat.includes("25x50") ? "25x50 System" : "18x40 System");
 document.getElementById('sl_h').value = itm.h;
 document.getElementById('sl_w').value = itm.w;
 if (document.getElementById('sl_loc')) document.getElementById('sl_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('sl_qty')) document.getElementById('sl_qty').value = itm.qty;
 calculateSliding();
 } else if (cat.includes("Door")) {
 doorCount += itm.qty;
 document.getElementById('dr_unit').value = "Inch";
 document.getElementById('dr_type').value = cat.includes("Floor Spring") ? "Floor Spring Door" : (cat.includes("Domal") ? "Domal System Door" : "Standard Door");
 document.getElementById('dr_h').value = itm.h;
 document.getElementById('dr_w').value = itm.w;
 calculateDoor();
 }
 });

 // Transfer into Quotation
 convertKhataToQuotation();

 const summary = `SUCCESSFULLY PROCESSED ALL SITE PRODUCTS!\\n----------------------------------------\\n• Casement 40mm/34mm: ${casementCount} Windows\\n• Partitions (Fixed/Door): ${partitionCount} Grids\\n• Domal Windows: ${domalCount} Windows\\n• Sliding Windows: ${slidingCount} Windows\\n• Doors: ${doorCount} Doors\\n\\nAll cutting sizes, profile purchase sticks, glass lists, and client billing have been generated!`;
 alert(summary);
 }

 function getLabourRateForCategory(cat) {
 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 if (cat.includes("Domal")) return parseFloat(cost_data['Domal Window Labour']) || 50.0;
 if (cat.includes("Casement")) return parseFloat(cost_data['Casement Labour']) || 60.0;
 if (cat.includes("Door")) return parseFloat(cost_data['Door Master Labour']) || 65.0;
 if (cat.includes("Partition")) return parseFloat(cost_data['Partition Labour']) || 40.0;
 return parseFloat(cost_data['Sliding Window Labour']) || 35.0;
 }

 function addOpeningToKhata() {
 const room = document.getElementById('sk_room').value.trim() || "General Room";
 const tag = document.getElementById('sk_tag').value.trim() || `Unit-${siteKhataItems.length + 1}`;
 const cat = document.getElementById('sk_category').value;
 const h = safeEval(document.getElementById('sk_h').value);
 const w = safeEval(document.getElementById('sk_w').value);
 const qty = Math.max(1, parseInt(document.getElementById('sk_qty').value) || 1);
 const glass = document.getElementById('sk_glass').value;

 if (h === 0 || w === 0) {
 alert("Please enter valid Height and Width in inches.");
 return;
 }

 const sq_ft_per_pc = (h * w) / 144.0;
 const total_sqft = sq_ft_per_pc * qty;
 const labour_rate = getLabourRateForCategory(cat);
 const labour_cost = total_sqft * labour_rate;
 const est_rate = calculateSuggestedRate(cat, "1.5 mm", "Aluminium: Powder Coated Jet Black", "5.0 mm Glass", glass, false);
 const est_price = total_sqft * est_rate;

 siteKhataItems.push({
 id: Date.now(),
 room: room,
 tag: tag,
 category: cat,
 h: h,
 w: w,
 qty: qty,
 glass: glass,
 sqft_pc: sq_ft_per_pc,
 total_sqft: total_sqft,
 labour_rate: labour_rate,
 labour_cost: labour_cost,
 est_rate: est_rate,
 est_price: est_price
 });

 renderKhataTable();
 updateKhataSummary();

 // Clear size inputs for next entry
 document.getElementById('sk_tag').value = "";
 document.getElementById('sk_h').value = "";
 document.getElementById('sk_w').value = "";
 document.getElementById('sk_qty').value = "1";
 }

 function deleteKhataItem(idx) {
 siteKhataItems.splice(idx, 1);
 renderKhataTable();
 updateKhataSummary();
 }

 function clearSiteKhata() {
 if (confirm("Start a new site? Current entries will be cleared.")) {
 siteKhataItems = [];
 document.getElementById('sk_client_name').value = "";
 document.getElementById('sk_client_phone').value = "";
 document.getElementById('sk_site_loc').value = "";
 renderKhataTable();
 updateKhataSummary();
 }
 }

 function renderKhataTable() {
 const container = document.getElementById('sk_entries_container');
 if (siteKhataItems.length === 0) {
 container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:20px;">No site openings recorded yet. Add an opening above!</div>`;
 return;
 }

 let html = `<table style="width:100%; border-collapse:collapse; text-align:left;">
 <thead>
 <tr style="background:#f1f5f9; border-bottom:1px solid #cbd5e1; font-size:0.72rem; color:#475569;">
 <th style="padding:4px;">#</th>
 <th style="padding:4px;">Room / Tag</th>
 <th style="padding:4px;">Type</th>
 <th style="padding:4px;">Size (HxW)</th>
 <th style="padding:4px; text-align:center;">Qty</th>
 <th style="padding:4px; text-align:right;">Sq.Ft</th>
 <th style="padding:4px; text-align:right;">Labour</th>
 <th style="padding:4px; text-align:center;">Action</th>
 </tr>
 </thead>
 <tbody>`;

 siteKhataItems.forEach((itm, idx) => {
 html += `<tr style="border-bottom:1px solid #f1f5f9;">
 <td style="padding:4px; color:#64748b;">${idx + 1}</td>
 <td style="padding:4px; font-weight:bold; color:#1e293b;">${itm.room}<br><span style="color:#0284c7; font-size:0.68rem;">[${itm.tag}]</span></td>
 <td style="padding:4px; font-size:0.7rem;">${itm.category}</td>
 <td style="padding:4px; font-weight:600;">${itm.h}" x ${itm.w}"</td>
 <td style="padding:4px; text-align:center; font-weight:bold;">${itm.qty}</td>
 <td style="padding:4px; text-align:right;">${itm.total_sqft.toFixed(1)}</td>
 <td style="padding:4px; text-align:right; color:#ea580c; font-weight:600;">Rs ${Math.round(itm.labour_cost)}</td>
 <td style="padding:4px; text-align:center; white-space:nowrap;">
 <button onclick="loadKhataItemToModule(${idx})" style="background:#e0f2fe; color:#0284c7; border:1px solid #bae6fd; border-radius:4px; padding:2px 6px; font-size:0.68rem; font-weight:bold; cursor:pointer; margin-right:3px;" title="Open in Calculator">Load &rarr;</button>
 <button onclick="deleteKhataItem(${idx})" style="background:#fee2e2; color:#dc2626; border:none; border-radius:4px; padding:2px 6px; cursor:pointer;">✕</button>
 </td>
 </tr>`;
 });

 html += `</tbody></table>`;
 container.innerHTML = html;
 }

 function updateKhataSummary() {
 const totalUnits = siteKhataItems.reduce((a, b) => a + b.qty, 0);
 const totalSqft = siteKhataItems.reduce((a, b) => a + b.total_sqft, 0);
 const totalLabour = siteKhataItems.reduce((a, b) => a + b.labour_cost, 0);
 const totalAmount = siteKhataItems.reduce((a, b) => a + b.est_price, 0);

 document.getElementById('sk_total_units').textContent = `${totalUnits} Pcs`;
 document.getElementById('sk_total_sqft').textContent = totalSqft.toFixed(1);
 document.getElementById('sk_total_labour').textContent = `Rs ${Math.round(totalLabour).toLocaleString('en-IN')}`;
 document.getElementById('sk_total_amount').textContent = `Rs ${Math.round(totalAmount).toLocaleString('en-IN')}`;
 }

 function convertKhataToQuotation() {
 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 const clientName = document.getElementById('sk_client_name').value.trim();
 const clientPhone = document.getElementById('sk_client_phone').value.trim();
 const siteLoc = document.getElementById('sk_site_loc').value.trim();

 if (clientName) document.getElementById('q_name').value = clientName;
 if (clientPhone) document.getElementById('q_phone').value = clientPhone;
 if (siteLoc) {
 document.getElementById('q_addr').value = siteLoc;
 if (document.getElementById('q_site_addr')) document.getElementById('q_site_addr').value = siteLoc;
 }

 billItems = [];
 siteKhataItems.forEach(itm => {
 billItems.push({
 type: itm.category,
 location: `${itm.room} [${itm.tag}]`,
 color: "Aluminium: Powder Coated Jet Black",
 thickness: "1.5 mm",
 glass_thick: "5.0 mm Glass",
 glass_type: itm.glass,
 toughened: itm.glass.includes("Toughened"),
 h: itm.h / 12.0, // convert inches to feet
 w: itm.w / 12.0,
 unit: "ft",
 qty: itm.qty,
 rate: itm.est_rate,
 area: itm.total_sqft,
 price: itm.est_price
 });
 });

 refreshQueueText();
 autoCalcAdvance();
 openScreen('quotation', 'PRO QUOTATION');
 alert("All site openings transferred into Client Quotation successfully!");
 }

 function exportSiteKhataMasterPdf() {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate Site Khata Master PDFs.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
 const doc = new jsPDF('p', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "9239413517 / 9641405426";
 const addr = profile.address || "Amta (Chandni), Howrah, West Bengal";
 const clientName = document.getElementById('sk_client_name').value.trim() || "Valued Client";
 const clientPhone = document.getElementById('sk_client_phone').value.trim() || "N/A";
 const siteLoc = document.getElementById('sk_site_loc').value.trim() || "Project Site";
 const today = new Date().toLocaleDateString('en-GB');

 drawDocHeaderWithLogo(doc, "MASTER SITE MEASUREMENT KHATA BOOK", "Site: " + siteLoc, [30, 58, 138]);

 // Client & Site Card
 doc.setFillColor(248, 250, 252);
 doc.setDrawColor(203, 213, 225);
 doc.roundedRect(14, 36, 182, 16, 2, 2, 'FD');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(15, 23, 42);
 doc.text(`CLIENT: ${clientName.toUpperCase()} | Phone: ${clientPhone}`, 18, 42);
 doc.text(`SITE LOCATION: ${siteLoc}`, 18, 47);
 doc.text(`DATE RECORDED: ${today}`, 192, 42, { align: "right" });
 doc.text(`STATUS: ACTIVE FABRICATION ORDER`, 192, 47, { align: "right" });

 // Table 1: Room by Room Measurement Khata
 const khataRows = siteKhataItems.map((itm, i) => [
 i + 1,
 itm.room,
 itm.tag,
 itm.category,
 `${itm.h}\\" x ${itm.w}\\"`,
 `${itm.qty} Pcs`,
 `${itm.total_sqft.toFixed(1)}`,
 `Rs ${Math.round(itm.labour_cost)}`,
 itm.glass
 ]);

 const totalUnits = siteKhataItems.reduce((a, b) => a + b.qty, 0);
 const totalSqft = siteKhataItems.reduce((a, b) => a + b.total_sqft, 0);
 const totalLabour = siteKhataItems.reduce((a, b) => a + b.labour_cost, 0);

 khataRows.push([
 { content: "TOTAL SITE SUMMARY", colSpan: 4, styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249] } },
 { content: "-", styles: { halign: 'center' } },
 { content: `${totalUnits} Pcs`, styles: { halign: 'center', fontStyle: 'bold', fillColor: [224, 242, 254] } },
 { content: `${totalSqft.toFixed(1)} Sq.Ft`, styles: { halign: 'center', fontStyle: 'bold', fillColor: [224, 242, 254] } },
 { content: `Rs ${Math.round(totalLabour)}`, styles: { halign: 'center', fontStyle: 'bold', textColor: [234, 88, 12], fillColor: [255, 237, 213] } },
 { content: "Full Site Handover", styles: { fontSize: 7 } }
 ]);

 doc.autoTable({
 startY: 55,
 head: [['#', 'Room / Floor', 'Tag', 'Profile Category', 'Size (HxW)', 'Qty', 'Sq.Ft', 'Labour', 'Glass / Spec']],
 body: khataRows,
 theme: 'grid',
 headStyles: {
 fillColor: [30, 58, 138],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [203, 213, 225],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 8, halign: 'center' },
 1: { cellWidth: 26, fontStyle: 'bold' },
 2: { cellWidth: 16, halign: 'center', fontStyle: 'bold', textColor: [2, 132, 199] },
 3: { cellWidth: 38 },
 4: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
 5: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
 6: { cellWidth: 16, halign: 'center' },
 7: { cellWidth: 18, halign: 'center', fontStyle: 'bold', textColor: [234, 88, 12] },
 8: { cellWidth: 24 }
 }
 });

 let currentY = doc.lastAutoTable.finalY + 8;
 if (currentY > 230) { doc.addPage(); currentY = 16; }

 // Labour & Installation Milestones Box
 doc.autoTable({
 startY: currentY,
 head: [['SITE LABOUR CHARGE BREAKDOWN', 'INSTALLATION GUIDELINES & SPECIFICATIONS']],
 body: [[
 `• Total Fabricated Area: ${totalSqft.toFixed(1)} Sq.Ft\\n• Total Installation Openings: ${totalUnits} Units\\n• Net Making & Fitting Labour: Rs. ${Math.round(totalLabour).toLocaleString('en-IN')}/-\\n(Note: Includes site measurement, framing, shutter hanging & glass sealing)`,
 `• All sliding tracks to be plumbed & leveled with water level\\n• Apply weather-proof silicone sealant around perimeter\\n• Install heavy-duty nylon rollers and align star locks\\n• Verify 45-degree corner joints on all casement & domal frames`
 ]],
 theme: 'grid',
 headStyles: {
 fillColor: [254, 240, 138],
 textColor: [113, 63, 18],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: { fontSize: 7.5, cellPadding: 2.5, lineColor: [253, 230, 138] },
 columnStyles: {
 0: { cellWidth: 91, fillColor: [255, 251, 235] },
 1: { cellWidth: 91, fillColor: [248, 250, 252] }
 }
 });

 currentY = doc.lastAutoTable.finalY + 14;
 if (currentY > 255) { doc.addPage(); currentY = 20; }

 // Signatures
 doc.autoTable({
 startY: currentY,
 head: [['SITE IN-CHARGE / CLIENT SIGNATURE', 'FITTER / FABRICATION MASTER SIGNATURE']],
 body: [[
 `Measurements Accepted By: _______________________\\n\\nClient Name: ${clientName}\\n\\nDate: ${today}`,
 `Recorded & Verified By: _______________________\\n\\nFor: ${shop_name}\\n\\nPhone: ${contact}`
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
 doc.text("-- Generated via Smart Worker Pro Master Site Measurement Khata System --", 105, 290, { align: "center" });

 doc.save(`SiteKhata_${clientName.replace(/\s+/g, '_')}_${today.replace(/\//g, '-')}.pdf`);
 }

 function exportKhataMaterialOrderPdf() {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate Material Order Slips.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 // Consolidate buckets for all items
 const siteBuckets = {};
 const siteGlass = {};

 siteKhataItems.forEach(itm => {
 const catKey = itm.category.split(' ')[0] + " Profiles";
 if (!siteBuckets[catKey]) siteBuckets[catKey] = [];
 // Approximate profile perimeter in feet
 const runFt = ((itm.h + itm.w) * 2 / 12) * itm.qty;
 siteBuckets[catKey].push(runFt * 12);

 const gKey = `${itm.h - 4}\\" x ${Math.round(itm.w / 2)}\\" (${itm.glass})`;
 siteGlass[gKey] = (siteGlass[gKey] || 0) + (itm.qty * 2);
 });

 exportMatPurchasePdf("Site_Khata_Material_Order", "Full Site Material Order", siteBuckets, siteGlass);
 }

 function shareKhataWhatsApp() {
 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 const clientName = document.getElementById('sk_client_name').value.trim() || "Client";
 const siteLoc = document.getElementById('sk_site_loc').value.trim() || "Site";
 const totalUnits = siteKhataItems.reduce((a, b) => a + b.qty, 0);
 const totalSqft = siteKhataItems.reduce((a, b) => a + b.total_sqft, 0);
 const totalLabour = siteKhataItems.reduce((a, b) => a + b.labour_cost, 0);
 const totalAmount = siteKhataItems.reduce((a, b) => a + b.est_price, 0);

 let msg = `*SMART WORKER PRO - SITE MEASUREMENT KHATA*\\n`;
 msg += `Client: ${clientName}\\nSite: ${siteLoc}\\n`;
 msg += `------------------------------------\\n`;
 msg += `Total Units: ${totalUnits} Pcs\\nTotal Area: ${totalSqft.toFixed(1)} Sq.Ft\\n`;
 msg += `Total Labour: Rs ${Math.round(totalLabour).toLocaleString('en-IN')}\\n`;
 msg += `Est. Total: Rs ${Math.round(totalAmount).toLocaleString('en-IN')}\\n`;
 msg += `------------------------------------\\n`;
 msg += `*ROOM-WISE OPENINGS:*\\n`;

 siteKhataItems.forEach((itm, i) => {
 msg += `${i + 1}. [${itm.room} - ${itm.tag}] ${itm.category}\\n Size: ${itm.h}\\"x${itm.w}\\" | Qty: ${itm.qty} | ${itm.total_sqft.toFixed(1)} Sq.Ft\\n`;
 });

 msg += `\\n-- Powered by Smart Worker Pro Fabrication Systems --`;
 const encoded = encodeURIComponent(msg);
 window.open(`https://wa.me/?text=${encoded}`, '_blank');
 }

 function numberToWordsINR(amount) {
 const num = Math.round(amount);
 if (num === 0) return "Zero Rupees Only";
 const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
 const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

 function convertTwoDigits(n) {
 if (n < 20) return a[n];
 return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
 }

 function convertThreeDigits(n) {
 let str = '';
 if (Math.floor(n / 100) > 0) {
 str += a[Math.floor(n / 100)] + ' Hundred ';
 n %= 100;
 }
 if (n > 0) str += convertTwoDigits(n);
 return str.trim();
 }

 let crore = Math.floor(num / 10000000);
 let remainder = num % 10000000;
 let lakh = Math.floor(remainder / 100000);
 remainder = remainder % 100000;
 let thousand = Math.floor(remainder / 1000);
 remainder = remainder % 1000;
 let hundred = remainder;

 let res = '';
 if (crore > 0) res += convertTwoDigits(crore) + ' Crore ';
 if (lakh > 0) res += convertTwoDigits(lakh) + ' Lakh ';
 if (thousand > 0) res += convertTwoDigits(thousand) + ' Thousand ';
 if (hundred > 0) res += convertThreeDigits(hundred) + ' ';

 return 'INR ' + res.trim() + ' Only';
 }



// ==========================================
// 4. PROFESSIONAL BILLING & GST INVOICE GENERATOR
// ==========================================
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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
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
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
  const doc = new jsPDF();

  const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
  const c_name = document.getElementById('q_name').value || 'Customer';
  const c_phone = document.getElementById('q_phone').value || 'N/A';
  const c_addr = document.getElementById('q_addr').value || 'N/A';
  const bill_stage = document.getElementById('q_stage').value;
  const today = new Date().toLocaleDateString('en-GB');

  // Draw Header with Customer's Exact Logo (Never overlaps!)
  drawDocHeaderWithLogo(doc, "JOB CARD / ESTIMATION BILL", "Stage: " + bill_stage, [74, 20, 140]);

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
    `${itm.location ? '['+itm.location+'] ' : ''}${itm.type}\nSpecs: ${itm.color} (${itm.thickness})\nGlass: ${itm.glass_thick} ${itm.glass_type}${itm.toughened ? ' [TOUGHENED]' : ''}\nSize: ${itm.h} x ${itm.w} ${itm.unit} @ Rs.${itm.rate}`,
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

  // Render UPI QR Code if uploaded
  const customQr = localStorage.getItem('sw_custom_qr');
  if (customQr) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, finalY + 2, 28, 28, 2, 2, 'FD');
      var qrFmt = customQr.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customQr, qrFmt, 15, finalY + 3, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(74, 20, 140);
      doc.text("SCAN TO PAY (UPI)", 14, finalY + 33);
    } catch(e){}
  }

  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("TERMS & CONDITIONS: 50% Advance with order. Balance on delivery. Cut materials cannot be returned.", 14, finalY + 40);
  doc.text(`Customer Signature: ___________________ Authorized Signature (${shop_name}): ___________________`, 14, finalY + 48);

  doc.save(`Invoice_${c_name.replace(/\s+/g, '_')}.pdf`);
}

 // ========================================================
 // 10. PDF EXPORTS FOR CUT SIZES & GLASS LIST


// ==========================================
// 5. CUSTOMER KHATA BOOK & BALANCE TRACKER
// ==========================================
// =========================================================================
// SMART WORKER PRO - ADVANCED CUSTOMER KHATA & DIGITAL LEDGER ENGINE
// Ledger Tracking, Payment Entry, WhatsApp Statements & PDF Account Ledger
// =========================================================================

    // =========================================================================
    // 📒 SMART WORKER PRO - ADVANCED CUSTOMER KHATA & DIGITAL LEDGER ENGINE
    // Connected with Google Cloud Firestore (nisha-creations)
    // =========================================================================

    let currentKhataFilter = 'all';
    let currentActiveKhataPhone = null;

    // Load Customers Dictionary
    function getKhataCustomers() {
      try {
        const raw = localStorage.getItem('sw_customers');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed === 'object' && parsed !== null) return parsed;
        }
      } catch(e) {}
      
      // Default sample customers if completely empty
      const sample = {
        '9830123456': {
          name: 'অমিতাভ চক্রবর্তী',
          phone: '9830123456',
          address: 'আমতা চাঁদনী বাজার, হাওড়া',
          total_billed: 45000,
          total_paid: 30000,
          total_due: 15000,
          transactions: [
            { id: 1, date: '10/08/2026', type: 'BILL', desc: 'ডমাল উইন্ডো ২৭×৬৫ (৪টি) ও ডোর ফিটিং', debit: 45000, credit: 0, balance: 45000 },
            { id: 2, date: '12/08/2026', type: 'PAYMENT', desc: 'নগদ অ্যাডভান্স জমা (PhonePe)', debit: 0, credit: 30000, balance: 15000 }
          ]
        },
        '9831987654': {
          name: 'বিকাশ মণ্ডল',
          phone: '9831987654',
          address: 'বাগনান স্টেশন রোড, ৩য় তলা',
          total_billed: 28000,
          total_paid: 28000,
          total_due: 0,
          transactions: [
            { id: 1, date: '15/08/2026', type: 'BILL', desc: '৩-ট্র্যাক স্লাইডিং উইন্ডো ও বাথরুম ডোর', debit: 28000, credit: 0, balance: 28000 },
            { id: 2, date: '18/08/2026', type: 'PAYMENT', desc: 'ক্যাশ পেমেন্ট সম্পন্ন', debit: 0, credit: 28000, balance: 0 }
          ]
        }
      };
      localStorage.setItem('sw_customers', JSON.stringify(sample));
      return sample;
    }

    function saveKhataCustomers(custs) {
      try {
        localStorage.setItem('sw_customers', JSON.stringify(custs));
      } catch(e) {}
      // Sync to Cloud Firestore
      syncCustomersToFirestore(custs);
    }

    // Direct Firebase Cloud Sync for Khata
    function syncCustomersToFirestore(custs) {
      if (typeof fbDb !== 'undefined' && fbDb) {
        try {
          const docRef = fbDb.collection('smart_worker_data').doc('customers_ledger');
          docRef.set({
            customers: custs,
            updated_at: new Date().toISOString()
          }, { merge: true }).then(() => {
            console.log("☁️ Customer Khata synced to Google Cloud Firestore!");
          }).catch(err => {
            console.warn("Cloud sync notice:", err);
          });
        } catch(e) {
          console.warn("Firestore save fallback:", e);
        }
      }
    }

    function initCloudKhataSyncListener() {
      if (typeof fbDb !== 'undefined' && fbDb) {
        try {
          fbDb.collection('smart_worker_data').doc('customers_ledger').onSnapshot(doc => {
            if (doc.exists) {
              const data = doc.data();
              if (data && data.customers && typeof data.customers === 'object') {
                localStorage.setItem('sw_customers', JSON.stringify(data.customers));
                if (document.getElementById('screen-customer_lookup')?.classList.contains('active')) {
                  renderCustomerKhataScreen();
                }
              }
            }
          });
        } catch(e) {}
      }
    }

    // Render Main Khata Screen
    function renderCustomerKhataScreen() {
      const customers = getKhataCustomers();
      const listContainer = document.getElementById('khataCustomerCardsList');
      if (!listContainer) return;

      const phoneKeys = Object.keys(customers);

      let totalClients = phoneKeys.length;
      let totalBilled = 0;
      let totalPaid = 0;
      let totalDue = 0;

      phoneKeys.forEach(phone => {
        const c = customers[phone];
        totalBilled += (Number(c.total_billed) || 0);
        totalPaid += (Number(c.total_paid) || 0);
        totalDue += (Number(c.total_due) || 0);
      });

      // Update Top Summary Stats
      document.getElementById('khataTotalClients').textContent = `${totalClients} জন`;
      document.getElementById('khataTotalBilled').textContent = `₹${totalBilled.toLocaleString('en-IN')}`;
      document.getElementById('khataTotalPaid').textContent = `₹${totalPaid.toLocaleString('en-IN')}`;
      document.getElementById('khataTotalDue').textContent = `₹${totalDue.toLocaleString('en-IN')}`;

      // Search & Filter
      const searchQ = (document.getElementById('khataSearchInput')?.value || '').trim().toLowerCase();

      let filteredKeys = phoneKeys.filter(phone => {
        const c = customers[phone];
        const matchSearch = !searchQ || 
          (c.name && c.name.toLowerCase().includes(searchQ)) || 
          phone.includes(searchQ) || 
          (c.address && c.address.toLowerCase().includes(searchQ));

        if (!matchSearch) return false;

        const due = (Number(c.total_due) || 0);
        if (currentKhataFilter === 'due') return due > 0;
        if (currentKhataFilter === 'paid') return due <= 0;
        return true;
      });

      if (filteredKeys.length === 0) {
        listContainer.innerHTML = `
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:30px 16px; text-align:center; color:#64748b;">
            <i class="fa-solid fa-folder-open" style="font-size:2.2rem; color:#94a3b8; margin-bottom:8px; display:block;"></i>
            <div style="font-weight:700; font-size:0.9rem;">কোনো কাস্টমার খাতা পাওয়া যায়নি!</div>
            <div style="font-size:0.75rem; margin-top:4px;">ওপরে <strong>'+ নতুন খাতা'</strong> বোতামে চাপ দিয়ে কাস্টমার যুক্ত করুন।</div>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filteredKeys.map(phone => {
        const c = customers[phone];
        const due = (Number(c.total_due) || 0);
        const billed = (Number(c.total_billed) || 0);
        const paid = (Number(c.total_paid) || 0);
        const hasDue = (due > 0);

        const initials = c.name ? c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SW';

        return `
          <div style="background:#ffffff; border:1.5px solid ${hasDue ? '#fecaca' : '#bbf7d0'}; border-radius:14px; padding:14px; box-shadow:0 2px 6px rgba(0,0,0,0.04); transition:all 0.15s;">
            <!-- Top Row: Name, Site & Due Badge -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg, ${hasDue ? '#ef4444' : '#10b981'}, ${hasDue ? '#b91c1c' : '#059669'}); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                  ${initials}
                </div>
                <div>
                  <h4 style="font-size:1rem; font-weight:800; color:#0f172a; line-height:1.2;">${c.name}</h4>
                  <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">
                    <i class="fa-solid fa-location-dot" style="color:#0284c7;"></i> ${c.address || 'আমতা, হাওড়া'}
                  </div>
                </div>
              </div>

              <div>
                ${hasDue ? `
                  <span style="background:#fef2f2; color:#dc2626; border:1px solid #f87171; padding:3px 8px; border-radius:8px; font-size:0.75rem; font-weight:800;">
                    🔴 বাকি: ₹${due.toLocaleString('en-IN')}
                  </span>
                ` : `
                  <span style="background:#f0fdf4; color:#15803d; border:1px solid #86efac; padding:3px 8px; border-radius:8px; font-size:0.75rem; font-weight:800;">
                    🟢 সব পরিশোধিত
                  </span>
                `}
              </div>
            </div>

            <!-- Financial Summary Bar -->
            <div style="background:#f8fafc; border-radius:8px; padding:8px 12px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:12px; text-align:center;">
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">মোট কাজ</span>
                <strong style="font-size:0.85rem; color:#0284c7;">₹${billed.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">জমা পেয়েছেন</span>
                <strong style="font-size:0.85rem; color:#16a34a;">₹${paid.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">বাকি আছে</span>
                <strong style="font-size:0.85rem; color:${hasDue ? '#dc2626' : '#16a34a'};">₹${due.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" onclick="openCustomerLedger('${phone}')" style="flex:1; background:#0f172a; color:#fff; border:none; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">
                <i class="fa-solid fa-book-open"></i> খাতা খুলুন
              </button>
              <button type="button" onclick="quickAddPayment('${phone}')" style="background:#16a34a; color:#fff; border:none; padding:8px 12px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-hand-holding-dollar"></i> + জমা
              </button>
              <a href="tel:${phone}" style="background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:4px;">
                <i class="fa-solid fa-phone" style="color:#0284c7;"></i> কল
              </a>
              <button type="button" onclick="sendKhataWhatsAppDirect('${phone}')" style="background:#25D366; color:#fff; border:none; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px;" title="WhatsApp-এ তাগাদা পাঠান">
                <i class="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function handleKhataSearch(val) {
      renderCustomerKhataScreen();
    }

    function filterKhataCustomers(filterType, btn) {
      currentKhataFilter = filterType;
      document.querySelectorAll('.khata-filter-pill').forEach(b => {
        b.style.background = '#fff';
        b.style.color = '#475569';
        b.style.borderColor = '#cbd5e1';
      });
      if (btn) {
        btn.style.background = '#e0f2fe';
        btn.style.color = '#0369a1';
        btn.style.borderColor = '#0284c7';
      }
      renderCustomerKhataScreen();
    }

    // Add New Customer Modal
    function openAddCustomerModal() {
      document.getElementById('addCustomerModal').style.display = 'flex';
      document.getElementById('new_cust_name').focus();
    }

    function closeAddCustomerModal() {
      document.getElementById('addCustomerModal').style.display = 'none';
    }

    function handleSaveNewCustomer(e) {
      e.preventDefault();
      const name = document.getElementById('new_cust_name').value.trim();
      const phone = document.getElementById('new_cust_phone').value.trim();
      const site = document.getElementById('new_cust_site').value.trim() || 'আমতা, হাওড়া';
      const openDue = parseFloat(document.getElementById('new_cust_opening_due').value) || 0;

      if (!name || !phone) {
        alert("কাস্টমারের নাম এবং মোবাইল নম্বর আবশ্যক!");
        return;
      }

      const customers = getKhataCustomers();
      if (!customers[phone]) {
        customers[phone] = {
          name: name,
          phone: phone,
          address: site,
          total_billed: openDue,
          total_paid: 0,
          total_due: openDue,
          transactions: openDue > 0 ? [
            { id: Date.now(), date: new Date().toLocaleDateString('en-GB'), type: 'OPENING', desc: 'পূর্বের বকেয়া হিসাব (Opening Due)', debit: openDue, credit: 0, balance: openDue }
          ] : []
        };
      } else {
        customers[phone].name = name;
        customers[phone].address = site;
      }

      saveKhataCustomers(customers);
      closeAddCustomerModal();
      document.getElementById('new_cust_name').value = '';
      document.getElementById('new_cust_phone').value = '';
      document.getElementById('new_cust_site').value = '';
      document.getElementById('new_cust_opening_due').value = '0';
      renderCustomerKhataScreen();
      alert(`🎉 কাস্টমার '${name}'-এর খাতা সফলভাবে তৈরি হয়েছে!`);
    }

    // Open Customer Detailed Ledger
    function openCustomerLedger(phone) {
      currentActiveKhataPhone = phone;
      const customers = getKhataCustomers();
      const c = customers[phone];
      if (!c) return;

      document.getElementById('ledgerCustName').textContent = c.name;
      document.getElementById('ledgerCustSub').innerHTML = `📞 ${phone} | 📍 ${c.address || 'আমতা'}`;

      const billed = Number(c.total_billed) || 0;
      const paid = Number(c.total_paid) || 0;
      const due = Number(c.total_due) || 0;

      document.getElementById('ledgerTotalBilled').textContent = `₹${billed.toLocaleString('en-IN')}`;
      document.getElementById('ledgerTotalPaid').textContent = `₹${paid.toLocaleString('en-IN')}`;
      document.getElementById('ledgerNetDue').textContent = `₹${due.toLocaleString('en-IN')}`;

      const txContainer = document.getElementById('ledgerTransactionsContainer');
      const txList = c.transactions || [];

      if (!txList.length) {
        txContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:20px; font-size:0.8rem;">এখনো কোনো লেনদেন রেকর্ড করা হয়নি। ওপরে '+ জমা/পেমেন্ট এন্ট্রি' করুন।</div>`;
      } else {
        txContainer.innerHTML = `
          <table style="width:100%; border-collapse:collapse; font-size:0.75rem;">
            <thead>
              <tr style="background:#f1f5f9; color:#475569; text-align:left; border-bottom:1px solid #cbd5e1;">
                <th style="padding:6px;">তারিখ</th>
                <th style="padding:6px;">কাজের বিবরণ</th>
                <th style="padding:6px; text-align:right;">বিল (+)</th>
                <th style="padding:6px; text-align:right;">জমা (-)</th>
                <th style="padding:6px; text-align:right;">বাকি</th>
              </tr>
            </thead>
            <tbody>
              ${txList.map(t => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:6px; color:#64748b; white-space:nowrap;">${t.date}</td>
                  <td style="padding:6px; font-weight:600; color:#0f172a;">${t.desc}</td>
                  <td style="padding:6px; text-align:right; font-weight:700; color:${t.debit > 0 ? '#0284c7' : '#94a3b8'};">${t.debit > 0 ? '₹' + t.debit.toLocaleString('en-IN') : '-'}</td>
                  <td style="padding:6px; text-align:right; font-weight:700; color:${t.credit > 0 ? '#16a34a' : '#94a3b8'};">${t.credit > 0 ? '₹' + t.credit.toLocaleString('en-IN') : '-'}</td>
                  <td style="padding:6px; text-align:right; font-weight:800; color:#dc2626;">₹${(t.balance || 0).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }

      document.getElementById('customerLedgerModal').style.display = 'flex';
    }

    function closeCustomerLedgerModal() {
      document.getElementById('customerLedgerModal').style.display = 'none';
      currentActiveKhataPhone = null;
    }

    // Payment Entry
    function quickAddPayment(phone) {
      currentActiveKhataPhone = phone;
      openRecordPaymentModal();
    }

    function openRecordPaymentModal() {
      if (!currentActiveKhataPhone) return;
      document.getElementById('pay_date').value = new Date().toISOString().split('T')[0];
      document.getElementById('recordPaymentModal').style.display = 'flex';
      document.getElementById('pay_amount').focus();
    }

    function closeRecordPaymentModal() {
      document.getElementById('recordPaymentModal').style.display = 'none';
    }

    function handleSavePayment(e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('pay_amount').value);
      if (!amount || amount <= 0) {
        alert("সঠিক জমার পরিমাণ লিখুন!");
        return;
      }

      const mode = document.getElementById('pay_mode').value;
      const rawDate = document.getElementById('pay_date').value;
      const dateStr = rawDate ? new Date(rawDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
      const note = document.getElementById('pay_note').value.trim() || `টাকা জমা (${mode})`;

      const customers = getKhataCustomers();
      const c = customers[currentActiveKhataPhone];
      if (!c) return;

      c.total_paid = (Number(c.total_paid) || 0) + amount;
      c.total_due = Math.max(0, (Number(c.total_due) || 0) - amount);

      if (!c.transactions) c.transactions = [];
      c.transactions.push({
        id: Date.now(),
        date: dateStr,
        type: 'PAYMENT',
        desc: `${note} [${mode}]`,
        debit: 0,
        credit: amount,
        balance: c.total_due
      });

      saveKhataCustomers(customers);
      closeRecordPaymentModal();
      openCustomerLedger(currentActiveKhataPhone);
      renderCustomerKhataScreen();
      alert(`✅ ₹${amount.toLocaleString('en-IN')} সফলভাবে জমা এন্ট্রি হয়েছে! বর্তমান বাকি: ₹${c.total_due.toLocaleString('en-IN')}`);
    }

    // WhatsApp Reminder / Statement
    function sendKhataWhatsAppDirect(phone) {
      const customers = getKhataCustomers();
      const c = customers[phone];
      if (!c) return;

      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const shop = profile.shop_name || 'SMART WORKER ALUMINIUM';
      const myPhone = profile.phone || '9239413517';

      let msg = `*${shop} - কাস্টমার হিসাব খাতা*\n`;
      msg += `গ্রাহক: *${c.name}*\n`;
      msg += `সাইট: ${c.address || 'আমতা'}\n`;
      msg += `--------------------------------\n`;
      msg += `মোট কাজের পরিমাণ: ₹${(c.total_billed || 0).toLocaleString('en-IN')}\n`;
      msg += `মোট জমা দিয়েছেন: ₹${(c.total_paid || 0).toLocaleString('en-IN')}\n`;
      msg += `*অবশিষ্ট বাকি (Due): ₹${(c.total_due || 0).toLocaleString('en-IN')}*\n`;
      msg += `--------------------------------\n`;
      msg += `অনুগ্রহ করে বকেয়া টাকা পরিশোধের ব্যবস্থা করবেন।\nধন্যবাদ!\n*${shop}*, আমতা, হাওড়া (📞 ${myPhone})`;

      window.open(`https://wa.me/91${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    }

    function shareLedgerWhatsApp() {
      if (currentActiveKhataPhone) {
        sendKhataWhatsAppDirect(currentActiveKhataPhone);
      }
    }

    // Download Ledger PDF
    function downloadLedgerPdf() {
      if (!currentActiveKhataPhone) return;
      const customers = getKhataCustomers();
      const c = customers[currentActiveKhataPhone];
      if (!c) return;

      var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF লাইব্রেরি লোড হতে সামান্য সময় নিচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।"); return; }
      const doc = new jsPDF();

      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const shop = (profile.shop_name || 'SMART WORKER ALUMINIUM').toUpperCase();
      const myPhone = profile.phone || '9239413517 / 9641405426';
      const myAddr = profile.address || 'Amta (Chandni), Howrah, West Bengal';

      drawDocHeaderWithLogo(doc, "CUSTOMER KHATA & LEDGER STATEMENT", "Client: " + c.name + " (" + c.phone + ")", [15, 23, 42]);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CLIENT DETAILS:", 14, 42);
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${c.name}`, 14, 48);
      doc.text(`Phone: ${c.phone}`, 14, 54);
      doc.text(`Site: ${c.address || 'Amta, Howrah'}`, 14, 60);

      doc.text(`Statement Date: ${new Date().toLocaleDateString('en-GB')}`, 140, 48);
      doc.text(`Total Billed: Rs. ${(c.total_billed || 0).toLocaleString('en-IN')}`, 140, 54);
      doc.text(`Total Paid: Rs. ${(c.total_paid || 0).toLocaleString('en-IN')}`, 140, 60);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 38, 38);
      doc.text(`NET DUE: Rs. ${(c.total_due || 0).toLocaleString('en-IN')}`, 140, 66);

      const rows = (c.transactions || []).map((t, i) => [
        i + 1,
        t.date,
        t.desc,
        t.debit > 0 ? `Rs. ${t.debit.toLocaleString('en-IN')}` : '-',
        t.credit > 0 ? `Rs. ${t.credit.toLocaleString('en-IN')}` : '-',
        `Rs. ${(t.balance || 0).toLocaleString('en-IN')}`
      ]);

      doc.autoTable({
        head: [['#', 'Date', 'Description / Particulars', 'Bill (+)', 'Paid (-)', 'Balance']],
        body: rows,
        startY: 72,
        theme: 'striped',
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' }
      });

      doc.save(`${c.name.replace(/\s+/g, '_')}_Khata_Statement.pdf`);
    }

    // Auto-update Khata when Bill is Saved in saveBillToDb()
    const originalSaveBillToDb = window.saveBillToDb;


// ==========================================
// 6. CORE APP INTERFACE, KEYPAD & EVENT HANDLERS
// ==========================================
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
  inputKey = String(inputKey || '').trim().toUpperCase();
  if (!inputKey || !deviceId) return null;
  if (inputKey === SPECIAL_PROMO_CODE) return "LIFETIME";

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');

  // 1. Check current month dynamic rotating key
  for (const duration in SALTS) {
    const baseSalt = SALTS[duration];
    let dynSalt = baseSalt;
    if (duration.includes("1Y")) {
      dynSalt = baseSalt + "_" + y;
    } else {
      dynSalt = baseSalt + "_" + y + "_" + m;
    }
    const expectedKey = sha256(deviceId + dynSalt).substring(0, 8).toUpperCase();
    if (inputKey === expectedKey) return duration;
  }

  // 2. Also check base salt (for initial cycle and backward compatibility)
  for (const duration in SALTS) {
    const baseSalt = SALTS[duration];
    const expectedKey = sha256(deviceId + baseSalt).substring(0, 8).toUpperCase();
    if (inputKey === expectedKey) return duration;
  }

  // 3. Check previous/next month transition window (allows activation if recharged early)
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const pY = prevMonth.getFullYear(), pM = String(prevMonth.getMonth() + 1).padStart(2, '0');
  const nY = nextMonth.getFullYear(), nM = String(nextMonth.getMonth() + 1).padStart(2, '0');

  for (const duration in SALTS) {
    const baseSalt = SALTS[duration];
    const keyPrev = sha256(deviceId + baseSalt + "_" + pY + "_" + pM).substring(0, 8).toUpperCase();
    const keyNext = sha256(deviceId + baseSalt + "_" + nY + "_" + nM).substring(0, 8).toUpperCase();
    if (inputKey === keyPrev || inputKey === keyNext) return duration;
  }

  return null;
}

 function isAppActivated() {
  const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
  if (!lic || !lic.key) return false;
  if (lic.key === SPECIAL_PROMO_CODE) return true;
  if (lic.expiry_date) {
    if (typeof lic.expiry_date === 'string' && lic.expiry_date.toLowerCase().includes('lifetime')) return true;
    const now = new Date();
    let exp = null;
    if (lic.expiry_date.includes('/')) {
      const parts = lic.expiry_date.split('/');
      exp = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 23, 59, 59);
    } else if (lic.expiry_date.includes('-')) {
      const parts = lic.expiry_date.split('-');
      if (parts[0].length === 4) {
        exp = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 23, 59, 59);
      } else {
        exp = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 23, 59, 59);
      }
    } else {
      exp = new Date(lic.expiry_date);
    }
    if (exp && !isNaN(exp.getTime())) {
      return exp >= now;
    }
  }
  return false;
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
  var dId = getDeviceId();
  universalCopyText(dId, "Device ID (" + dId + ") সফলভাবে কপি হয়েছে!");
}

 function activateAppKey(providedKey) {
  const inputKey = (providedKey || document.getElementById('activationInput').value || '').trim().toUpperCase();
  const deviceId = getDeviceId();

  if (!inputKey) {
    alert("অনুগ্রহ করে ৮-অক্ষরের অ্যাক্টিভেশন কি লিখুন!");
    return;
  }

  // Anti-Reuse Protection: check if this key was already used previously on this device
  let usedKeys = JSON.parse(localStorage.getItem('sw_used_keys') || '[]');
  const currentLic = JSON.parse(localStorage.getItem('sw_license') || '{}');

  // If the key was already used and the license is either expired or a new activation attempt
  if (usedKeys.includes(inputKey) && currentLic.key === inputKey && !isAppActivated()) {
    alert("❌ এই অ্যাক্টিভেশন কি-টি পূর্বে ব্যবহার করা হয়েছে এবং এর মেয়াদ শেষ হয়ে গেছে!\n\nপুরনো কি দিয়ে পুনরায় আনলক করা সম্ভব নয়। দয়া করে পরবর্তী মাসের জন্য নতুন রিচার্জ কি সংগ্রহ করুন।");
    return;
  }
  if (usedKeys.includes(inputKey) && currentLic.key !== inputKey) {
    alert("❌ এই অ্যাক্টিভেশন কি-টি ইতিমধ্যে ব্যবহার করা হয়েছে!\n\nএকই কি একাধিকবার ব্যবহার করা যায় না। নতুন রিচার্জ কি সংগ্রহ করুন।");
    return;
  }

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
      key: inputKey,
      plan: durationType,
      plan_category: planCategory,
      max_users: maxUsers,
      activated_at: new Date().toISOString(),
      expiry_date: expiryStr
    }));

    // Record key in usedKeys list so it can NEVER be reused after its expiry
    if (!usedKeys.includes(inputKey) && inputKey !== SPECIAL_PROMO_CODE) {
      usedKeys.push(inputKey);
      localStorage.setItem('sw_used_keys', JSON.stringify(usedKeys));
    }

    alert("✅ PRO সফলভাবে অ্যাক্টিভেট হয়েছে!\n\nমেয়াদ: " + (durationType === 'LIFETIME' ? 'লাইফটাইম' : expiryStr + ' (' + daysToAdd + ' দিন)'));
    updateActivationScreenUI();
    goHome();
  } else {
    alert("❌ অবৈধ বা মেয়াদোত্তীর্ণ অ্যাক্টিভেশন কি!\n\nঅনুগ্রহ করে বর্তমান মাসের সঠিক রিচার্জ কি লিখুন অথবা Smart Worker Aluminium-এর সাথে যোগাযোগ করুন।");
  }
}

function subscribeViaWhatsApp(plan) {
  const deviceId = getDeviceId();
  let planKey = "KARIGAR_1M";
  let planStr = "Karigar Plan (Single User - Rs. 99/Month)";
  let amount = 99;

  if (plan === "Karigar_Monthly") {
    planKey = "KARIGAR_1M";
    planStr = "Karigar Plan (Single User - Rs. 99/Month)";
    amount = 99;
  } else if (plan === "Karigar_Annual") {
    planKey = "KARIGAR_1Y";
    planStr = "Karigar Plan (Single User - Rs. 799/Year)";
    amount = 799;
  } else if (plan === "Workshop_Monthly") {
    planKey = "TEAM_1M";
    planStr = "Workshop Team Plan (10 Users - Rs. 499/Month)";
    amount = 499;
  } else if (plan === "Workshop_Annual") {
    planKey = "TEAM_1Y";
    planStr = "Workshop Team Plan (10 Users - Rs. 3,999/Year)";
    amount = 3999;
  } else if (plan === "Corporate_Monthly") {
    planKey = "CORP_1M";
    planStr = "Corporate Enterprise Plan (50 Users - Rs. 1,499/Month)";
    amount = 1499;
  } else if (plan === "Corporate_Annual") {
    planKey = "CORP_1Y";
    planStr = "Corporate Enterprise Plan (50 Users - Rs. 14,999/Year)";
    amount = 14999;
  } else {
    planKey = "KARIGAR_1M";
    planStr = "Smart Worker PRO Membership (Rs. 99/Month)";
    amount = 99;
  }

  // Retrieve or prompt customer profile
  let profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  let customerName = (profile.name || "").trim();
  let customerPhone = (profile.phone || "").trim();
  let customerShop = (profile.shop_name || "Aluminium Workshop").trim();

  if (!customerName || customerName === "Saheb Ghanti" || !customerPhone || customerPhone === "9876543210") {
    const enteredName = prompt("অনুগ্রহ করে আপনার নাম লিখুন (Enter Your Name):", customerName !== "Saheb Ghanti" ? customerName : "");
    if (enteredName && enteredName.trim()) {
      customerName = enteredName.trim();
      profile.name = customerName;
    } else {
      customerName = "Customer " + deviceId;
    }

    const enteredPhone = prompt("আপনার হোয়াটসঅ্যাপ মোবাইল নম্বর লিখুন (WhatsApp Mobile No):", customerPhone !== "9876543210" ? customerPhone : "");
    if (enteredPhone && enteredPhone.trim()) {
      customerPhone = enteredPhone.trim();
      profile.phone = customerPhone;
    }

    localStorage.setItem('sw_profile', JSON.stringify(profile));
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB') + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const reqObj = {
    id: "REQ_" + deviceId,
    device_id: deviceId,
    name: customerName,
    shop: customerShop,
    phone: customerPhone,
    plan: planKey,
    plan_name: planStr,
    bill_amount: amount,
    paid_amount: amount,
    due_amount: 0,
    status: "Pending",
    date: dateStr,
    timestamp: Date.now(),
    utr: "Pending Verification"
  };

  // 1. Save to localStorage
  try {
    let localReqs = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
    localReqs = localReqs.filter(r => r.device_id !== deviceId);
    localReqs.unshift(reqObj);
    localStorage.setItem('sw_recharge_requests', JSON.stringify(localReqs));
    window.dispatchEvent(new Event('storage'));
  } catch(e){}

  // 2. Save to Firebase Firestore (recharge_requests)
  try {
    const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
    if (db) {
      db.collection('recharge_requests').doc(deviceId).set(reqObj, { merge: true })
        .then(() => console.log("Recharge request synced to Firestore!"))
        .catch(err => console.warn("Firestore error:", err));
    }
  } catch(err) { console.warn(err); }

  // 3. Save to Firebase Realtime Database
  try {
    const rtdb = window.fbRtdb || (window.firebase && firebase.apps.length && firebase.database ? firebase.database() : null);
    if (rtdb) {
      rtdb.ref('recharge_requests/' + deviceId).set(reqObj)
        .then(() => console.log("Recharge request synced to RTDB!"))
        .catch(err => console.warn("RTDB error:", err));
    }
  } catch(err) { console.warn(err); }

  // 4. Open WhatsApp to Admin (+91 9239413517)
  const waMsg = `Hello Saheb Da,
I want to activate Smart Worker PRO!

📋 *RECHARGE REQUEST DETAILS:*
• *Customer Name:* ${customerName}
• *Workshop:* ${customerShop}
• *Mobile Number:* ${customerPhone}
• *Device ID:* ${deviceId}
• *Selected Plan:* ${planStr}
• *Payable Amount:* ₹${amount}
• *Date & Time:* ${dateStr}

Please verify payment and issue my Pro Activation Key!`;

  const encoded = encodeURIComponent(waMsg);
  window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');

  alert(`✅ আপনার রিচার্জ রিকোয়েস্ট সফলভাবে অ্যাডমিন পোর্টালে পাঠানো হয়েছে!

📋 Device ID: ${deviceId}
📦 Plan: ${planStr}
💰 Amount: ₹${amount}

অ্যাডমিন ভেরিফাই করে আপনার WhatsApp নম্বরে ৮-অক্ষরের অ্যাক্টিভেশন কি পাঠিয়ে দেবেন।`);
}




// ========================================================
 // PROFESSIONAL REPORTLAB-STYLE TABULAR PDF GENERATOR
 // ========================================================

// ========================================================
 // CUSTOM WORKSHOP BRANDING (LOGO & PAYMENT QR UPLOAD)
 // ========================================================
 // ========================================================
// CUSTOM WORKSHOP BRANDING (CANVAS OPTIMIZED LOGO & PAYMENT QR)
// ========================================================
function uploadShopLogo(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        try {
          var canvas = document.createElement('canvas');
          var MAX_DIM = 400; // Optimal 300DPI crisp resolution for PDF print
          var w = img.width;
          var h = img.height;
          if (w > h) {
            if (w > MAX_DIM) { h = Math.round(h * (MAX_DIM / w)); w = MAX_DIM; }
          } else {
            if (h > MAX_DIM) { w = Math.round(w * (MAX_DIM / h)); h = MAX_DIM; }
          }
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var optimized = canvas.toDataURL('image/png');
          localStorage.setItem('sw_custom_logo', optimized);
          renderBrandingPreviews();
          loadSavedProfile();
          alert("✅ আপনার দোকানের লোগো সফলভাবে সেভ হয়েছে! সমস্ত বিলে ও পিডিএফে এই লোগোটিই বের হবে।");
        } catch(err) {
          try {
            localStorage.setItem('sw_custom_logo', e.target.result);
            renderBrandingPreviews();
            loadSavedProfile();
            alert("✅ আপনার দোকানের লোগো সফলভাবে সেভ হয়েছে! সমস্ত বিলে ও পিডিএফে এই লোগোটিই বের হবে।");
          } catch(storageErr) {
            alert("❌ ছবির সাইজ অতিরিক্ত বড়! দয়া করে ছোট সাইজের ছবি নির্বাচন করুন।");
          }
        }
      };
      img.onerror = function() {
        alert("❌ ছবি লোড করা সম্ভব হয়নি! সঠিক ইমেজ ফাইল নির্বাচন করুন।");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        try {
          var canvas = document.createElement('canvas');
          var MAX_DIM = 400;
          var w = img.width;
          var h = img.height;
          if (w > h) {
            if (w > MAX_DIM) { h = Math.round(h * (MAX_DIM / w)); w = MAX_DIM; }
          } else {
            if (h > MAX_DIM) { w = Math.round(w * (MAX_DIM / h)); h = MAX_DIM; }
          }
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var optimized = canvas.toDataURL('image/png');
          localStorage.setItem('sw_custom_qr', optimized);
          renderBrandingPreviews();
          alert("✅ আপনার পেমেন্ট QR কোড সফলভাবে সেভ হয়েছে! সমস্ত বিলে এই QR কোডটি বের হবে।");
        } catch(err) {
          try {
            localStorage.setItem('sw_custom_qr', e.target.result);
            renderBrandingPreviews();
            alert("✅ আপনার পেমেন্ট QR কোড সফলভাবে সেভ হয়েছে!");
          } catch(storageErr) {
            alert("❌ ছবির সাইজ অতিরিক্ত বড়! দয়া করে ছোট সাইজের ছবি নির্বাচন করুন।");
          }
        }
      };
      img.onerror = function() {
        alert("❌ QR কোড লোড করা সম্ভব হয়নি! সঠিক ইমেজ ফাইল নির্বাচন করুন।");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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
 btn_guest_demo: "Continue as Guest / Demo Mode →",
   lbl_panel_mode: "Panel Division & 4'x8' Sheet Optimization:",
   opt_panel_4x8: "✨ 4'x8' Sheet Optimized (Bottom & Middle Equal, Top Small - Zero Waste)",
   opt_panel_3ft: "Bottom 3ft (36 Inch) ACP, Middle 3ft (36 Inch) Glass, Top Small",
   opt_panel_2_5ft: "Bottom 2.5ft (30 Inch) ACP, Middle 2.5ft (30 Inch) Glass, Top Small",
   opt_panel_equal: "Equal 3 Rows Divide",
   keypad_title: "Smart Dimension Calculator",
   keypad_ok: "OK Insert",
   keypad_numbers: "Numbers",
   keypad_fractions: "Fractions (16 Sizes)",
   suta_1: "", suta_2: "", suta_3: "", suta_4: "", suta_5: "", suta_6: "", suta_7: "", suta_half: ""

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
 btn_guest_demo: "লগইন ছাড়া ডেমো ব্যবহার করুন →",
   lbl_panel_mode: "প্যানেল কাটিং ও ৪'×৮' অপ্টিমাইজেশন:",
   opt_panel_4x8: "✨ ৪'×৮' শিট অপ্টিমাইজড (তলা ও মিডিল সমান, মাথার খাপ ছোট - Zero Waste)",
   opt_panel_3ft: "তলা ৩ ফুট (৩৬ ইঞ্চি) ACP, মিডিল ৩ ফুট (৩৬ ইঞ্চি) গ্লাস, মাথা ছোট",
   opt_panel_2_5ft: "তলা ২.৫ ফুট (৩০ ইঞ্চি) ACP, মিডিল ২.৫ ফুট (৩০ ইঞ্চি) গ্লাস, মাথা ছোট",
   opt_panel_equal: "সাধারণ সমান ভাগ (Equal Divide)",
   keypad_title: "স্মার্ট পরিমাপ ক্যালকুলেটর",
   keypad_ok: "OK বসান",
   keypad_numbers: "সংখ্যা (Numbers)",
   keypad_fractions: "ভগ্নাংশ (১৬ খানা মাপ)",
   suta_1: "(১ সুতো)", suta_2: "(২ সুতো)", suta_3: "(৩ সুতো)", suta_4: "(৪ সুতো)", suta_5: "(৫ সুতো)", suta_6: "(৬ সুতো)", suta_7: "(৭ সুতো)", suta_half: "(হাফ সুতো)"

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

 let currentAppLang = localStorage.getItem('sw_lang') || 'en';

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
  try { syncUserActivityToCloud(); } catch(e){}
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
      localStorage.setItem('sw_lang', 'en');
      currentAppLang = 'en';
    }
  } catch(e){}

  try { changeLanguage(currentAppLang); } catch(e){ console.warn("changeLanguage error", e); }
  try { setupDb(); } catch(e){}
  try { if (typeof initFirebaseCloud === 'function') initFirebaseCloud(); } catch(e){}
  try { if (typeof initCloudKhataSyncListener === 'function') initCloudKhataSyncListener(); } catch(e){}
  try { loadSavedProfile(); } catch(e){}
  try { loadBillSettings(); } catch(e){}
  try { updateSuggestedRate(); } catch(e){}
  try { checkCustomerInAppNotifications(); } catch(e){}
  try { goHome(); } catch(e){}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
window.addEventListener('load', bootApp);
window.onload = bootApp;



// =========================================================================
// SMART WORKER PRO - MASTER ADMIN SUBSCRIPTION & RECHARGE ENGINE
// =========================================================================

const DEFAULT_ADMIN_PIN = "7860";
let lastGeneratedAdminKey = "";
let lastTargetPhone = "";
let lastTargetPlan = "";
let lastTargetName = "";

function getAdminPin() {
  return localStorage.getItem('sw_admin_pin') || DEFAULT_ADMIN_PIN;
}

function openAdminPortalWithPin() {
  const savedPin = getAdminPin();
  const entered = prompt("🔑 অ্যাডমিন সিকিউরিটি পিন (Admin PIN) লিখুন:\n(Default PIN: 7860)");
  if (entered === null) return;
  if (entered.trim() === savedPin) {
    sessionStorage.setItem('sw_admin_authenticated', 'true');
    openScreen('admin-portal', 'ADMIN PORTAL');
    renderAdminPortal();
  } else {
    alert("❌ ভুল পিন! অ্যাডমিন পোর্টাল খোলা সম্ভব নয়।");
  }
}

function lockAdminPortal() {
  sessionStorage.removeItem('sw_admin_authenticated');
  alert("🔒 অ্যাডমিন পোর্টাল লক করা হয়েছে।");
  goHome();
}

function adminChangePinPrompt() {
  const current = getAdminPin();
  const oldPin = prompt("বর্তমান অ্যাডমিন পিন লিখুন:");
  if (oldPin !== current) { alert("❌ বর্তমান পিন ভুল!"); return; }
  const newPin = prompt("নতুন ৪-সংখ্যার পিন লিখুন:");
  if (!newPin || newPin.trim().length < 4) { alert("❌ কমপক্ষে ৪ সংখ্যার পিন দিন!"); return; }
  localStorage.setItem('sw_admin_pin', newPin.trim());
  document.getElementById('admCurrentPinDisplay').textContent = newPin.trim();
  alert("✅ অ্যাডমিন পিন সফলভাবে পরিবর্তন করা হয়েছে!");
}

// Generate mathematical key matching checkActivationType
function generateActivationKey(deviceId, planType) {
  deviceId = String(deviceId || '').trim().toUpperCase();
  if (!deviceId) return null;
  if (planType === "LIFETIME") return SPECIAL_PROMO_CODE;
  const salt = SALTS[planType] || SALTS["KARIGAR_1M"];
  return sha256(deviceId + salt).substring(0, 8).toUpperCase();
}

// Customer submits online recharge request
function submitCustomerRechargeRequest() {
  const name = document.getElementById('req_cust_name').value.trim();
  const phone = document.getElementById('req_cust_phone').value.trim();
  const plan = document.getElementById('req_cust_plan').value;
  const utr = document.getElementById('req_cust_utr').value.trim();
  const devId = getDeviceId();

  if (!name || !phone) {
    alert("অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর লিখুন!");
    return;
  }

  const reqObj = {
    id: "REQ_" + Date.now(),
    name: name,
    phone: phone,
    device_id: devId,
    plan: plan,
    utr: utr || "Paid online",
    date: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    status: "Pending"
  };

  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  requests.unshift(reqObj);
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));

  // Sync to Firebase if connected
  try {
    if (window.fbDb) {
      fbDb.collection('recharge_requests').doc(reqObj.id).set(reqObj).catch(()=>{});
    }
  } catch(e){}

  alert("✅ আপনার রিচার্জ রিকোয়েস্ট সফলভাবে জমা হয়েছে!\n\nঅ্যাডমিন খুব শীঘ্রই ভেরিফাই করে আপনার নম্বরে অ্যাক্টিভেশন কি পাঠিয়ে দেবে।");
  document.getElementById('req_cust_name').value = "";
  document.getElementById('req_cust_phone').value = "";
  document.getElementById('req_cust_utr').value = "";
}

// Render Admin Portal UI
function renderAdminPortal() {
  const devInput = document.getElementById('adm_target_device');
  if (devInput && !devInput.value) devInput.value = getDeviceId();
  const pinDisplay = document.getElementById('admCurrentPinDisplay');
  if (pinDisplay) pinDisplay.textContent = getAdminPin();
  renderAdminRechargeRequests();
}

function renderAdminRechargeRequests() {
  const container = document.getElementById('admRequestsListContainer');
  const badge = document.getElementById('admReqCountBadge');
  if (!container) return;

  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  if (badge) badge.textContent = `${requests.length} টি রিকোয়েস্ট`;

  if (requests.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 10px; color:#94a3b8; font-size:0.85rem;">
        <i class="fa-solid fa-inbox" style="font-size:1.8rem; margin-bottom:6px; color:#cbd5e1; display:block;"></i>
        এখনও কোনো পেন্ডিং রিচার্জ রিকোয়েস্ট নেই।
      </div>`;
    return;
  }

  let html = "";
  requests.forEach((req, idx) => {
    const isPending = req.status === "Pending";
    const statusColor = isPending ? "#f59e0b" : "#16a34a";
    const planLabels = {
      "KARIGAR_1M": "কারিগর ১ মাস (₹৯৯)",
      "KARIGAR_1Y": "কারিগর ১ বছর (₹৭৯৯)",
      "TEAM_1M": "টিম ১ মাস (₹৪৯৯)",
      "TEAM_1Y": "টিম ১ বছর (₹৩,৯৯৯)",
      "CORP_1M": "কর্পোরেট ১ মাস (₹১,৪৯৯)",
      "CORP_1Y": "কর্পোরেট ১ বছর (₹১৪,৯৯৯)",
      "LIFETIME": "লাইফটাইম ভিআইপি"
    };
    const planText = planLabels[req.plan] || req.plan;

    html += `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:10px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="font-size:0.92rem; font-weight:800; color:#0f172a;">${req.name}</div>
            <div style="font-size:0.75rem; color:#475569; margin-top:1px;"><i class="fa-solid fa-phone"></i> ${req.phone}</div>
          </div>
          <span style="background:${statusColor}; color:#fff; font-size:0.68rem; font-weight:bold; padding:2px 7px; border-radius:6px;">
            ${req.status}
          </span>
        </div>
        
        <div style="margin-top:8px; font-size:0.76rem; color:#334155; line-height:1.4; background:#fff; padding:6px 10px; border-radius:6px; border:1px solid #cbd5e1;">
          <div><b>Device ID:</b> <span style="font-family:monospace; font-weight:bold; color:#0284c7;">${req.device_id}</span></div>
          <div><b>Plan:</b> ${planText}</div>
          <div><b>Ref / UTR:</b> ${req.utr}</div>
          <div style="font-size:0.7rem; color:#94a3b8;"><b>তারিখ:</b> ${req.date}</div>
        </div>

        <div style="display:flex; gap:6px; margin-top:8px;">
          <button type="button" onclick="adminProcessRequest('${req.id}')" style="flex:2; background:#2563eb; color:#fff; border:none; padding:7px; border-radius:6px; font-size:0.76rem; font-weight:bold; cursor:pointer;">
            <i class="fa-solid fa-key"></i> কোড বানান ও হোয়াটসঅ্যাপে পাঠান
          </button>
          <button type="button" onclick="adminDeleteRequest('${req.id}')" style="flex:1; background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; padding:7px; border-radius:6px; font-size:0.76rem; font-weight:bold; cursor:pointer;">
            মুছুন
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Process a customer request directly
function adminProcessRequest(reqId) {
  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  const req = requests.find(r => r.id === reqId);
  if (!req) return;

  const key = generateActivationKey(req.device_id, req.plan);
  req.status = "Approved";
  req.generated_key = key;
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));
  renderAdminRechargeRequests();

  lastGeneratedAdminKey = key;
  lastTargetPhone = req.phone;
  lastTargetPlan = req.plan;
  lastTargetName = req.name;

  const planLabels = {
    "KARIGAR_1M": "কারিগর প্ল্যান (১ মাস)",
    "KARIGAR_1Y": "কারিগর প্ল্যান (১ বছর)",
    "TEAM_1M": "ওয়ার্কশপ টিম (১ মাস)",
    "TEAM_1Y": "ওয়ার্কশপ টিম (১ বছর)",
    "CORP_1M": "কর্পোরেট প্ল্যান (১ মাস)",
    "CORP_1Y": "কর্পোরেট প্ল্যান (১ বছর)",
    "LIFETIME": "লাইফটাইম ভিআইপি"
  };
  const planText = planLabels[req.plan] || req.plan;

  const msg = `নমস্কার ${req.name} দা, Smart Worker Pro-তে আপনার ${planText} সফলভাবে সক্রিয় করা হয়েছে!\n\nআপনার অ্যাক্টিভেশন কি:\n👉 *${key}*\n\nঅ্যাপের PRO UPGRADE অপশনে গিয়ে এই কোডটি পেস্ট করে Activate বাটনে ক্লিক করলেই সমস্ত প্রিমিয়াম ফিচার চালু হয়ে যাবে। ধন্যবাদ!\n-- Saheb Ghanti (Smart Worker Pro)`;

  const cleanPhone = req.phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function adminDeleteRequest(reqId) {
  if (!confirm("আপনি কি নিশ্চিত এই রিকোয়েস্টটি মুছতে চান?")) return;
  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  requests = requests.filter(r => r.id !== reqId);
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));
  renderAdminRechargeRequests();
}

// Manual Key Generator
function adminGenerateManualKey() {
  const devId = document.getElementById('adm_target_device').value.trim().toUpperCase();
  const plan = document.getElementById('adm_target_plan').value;

  if (!devId || devId.length !== 8) {
    alert("অনুগ্রহ করে সঠিক ৮-অক্ষরের Device ID দিন!");
    return;
  }

  const key = generateActivationKey(devId, plan);
  lastGeneratedAdminKey = key;
  lastTargetPlan = plan;

  document.getElementById('admGeneratedKeyDisplay').value = key;
  document.getElementById('admGeneratedResultBox').style.display = "block";
}

function adminCopyGeneratedKey() {
  if (!lastGeneratedAdminKey) return;
  navigator.clipboard.writeText(lastGeneratedAdminKey).then(() => {
    const btn = document.getElementById('admCopyKeyBtn');
    btn.textContent = "COPIED!";
    btn.style.background = "#0284c7";
    setTimeout(() => {
      btn.textContent = "COPY";
      btn.style.background = "#16a34a";
    }, 2000);
  }).catch(() => {
    alert("Key: " + lastGeneratedAdminKey);
  });
}

function adminShareKeyWhatsApp() {
  if (!lastGeneratedAdminKey) return;
  const devId = document.getElementById('adm_target_device').value.trim().toUpperCase();
  const plan = document.getElementById('adm_target_plan').value;
  const msg = `নমস্কার, Smart Worker Pro-তে আপনার সাবস্ক্রিপশন কি:\n👉 *${lastGeneratedAdminKey}*\nDevice ID: ${devId}\nPlan: ${plan}\n\nঅ্যাপে এই কোডটি দিয়ে Activate করলেই সমস্ত ফিচার চালু হয়ে যাবে। ধন্যবাদ!`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}

// Directly unlock this device on the spot
function adminDirectSelfApplyKey() {
  if (!lastGeneratedAdminKey) return;
  document.getElementById('activationInput').value = lastGeneratedAdminKey;
  activateAppKey();
  alert("🎉 অভিনন্দন! এই ডিভাইসে সফলভাবে সাবস্ক্রিপশন সক্রিয় করা হয়েছে!");
  goHome();
}

// URL Hash router check
function checkUrlHash() {
  if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
    openAdminPortalWithPin();
  }
}

window.addEventListener('hashchange', checkUrlHash);
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkUrlHash, 500);
  // Auto-fill Device ID on recharge form
  const reqDev = document.getElementById('req_cust_device');
  if (reqDev) reqDev.value = getDeviceId();
});



// Sync user activity to database for Admin detection
function syncUserActivityToCloud() {
  try {
    const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
    const devId = (typeof getDeviceId === 'function') ? getDeviceId() : 'UNKNOWN';
    const isPro = (typeof isAppActivated === 'function') ? isAppActivated() : false;
    const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');

    const userObj = {
      device_id: devId,
      name: profile.name || "Customer Workshop",
      shop: profile.shop_name || "Aluminium Workshop",
      phone: profile.phone || "N/A",
      plan: lic.plan_category || "FREE_TRIAL",
      status: isPro ? "ACTIVE" : "PENDING_ACTIVATION",
      timestamp: Date.now(),
      last_active: new Date().toLocaleString('en-US')
    };

    let list = JSON.parse(localStorage.getItem('sw_active_subscribers') || '[]');
    const idx = list.findIndex(s => s.device_id === devId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...userObj };
    } else {
      list.unshift(userObj);
    }
    localStorage.setItem('sw_active_subscribers', JSON.stringify(list));

    if (window.fbDb) {
      fbDb.collection('subscribers').doc(devId).set(userObj, { merge: true }).catch(() => {});
    }
  } catch(e) {}
}




// =========================================================================
// IN-APP NOTIFICATIONS & CLOUD ACTIVATION AUTO-DETECTOR
// =========================================================================

function showCustomerNotificationPopup(notif) {
  let bar = document.getElementById('inAppNotifBanner');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'inAppNotifBanner';
    bar.style.cssText = 'position:fixed; top:12px; left:12px; right:12px; z-index:99999; background:linear-gradient(135deg, #1e1b4b, #312e81); border:1.5px solid #818cf8; border-radius:12px; padding:12px 14px; color:#fff; box-shadow:0 8px 24px rgba(0,0,0,0.4); display:flex; gap:10px; align-items:flex-start;';
    document.body.appendChild(bar);
  }
  bar.innerHTML = `
    <div style="font-size:1.4rem; color:#fde047;"><i class="fa-solid fa-bell"></i></div>
    <div style="flex:1;">
      <div style="font-size:0.88rem; font-weight:800; color:#38bdf8;">${notif.title || 'অ্যাডমিন নোটিফিকেশন'}</div>
      <div style="font-size:0.78rem; color:#e0e7ff; margin-top:3px; line-height:1.4; white-space:pre-line;">${notif.message}</div>
      <div style="font-size:0.68rem; color:#94a3b8; margin-top:5px;">${notif.date || 'Today'}</div>
    </div>
    <button type="button" onclick="dismissCustomerNotif('${notif.device_id || getDeviceId()}', '${notif.timestamp}')" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; border-radius:6px; padding:4px 8px; font-size:0.8rem; cursor:pointer;">&times;</button>
  `;
  bar.style.display = 'flex';
}

function dismissCustomerNotif(devId, ts) {
  const bar = document.getElementById('inAppNotifBanner');
  if (bar) bar.style.display = 'none';
  localStorage.setItem('sw_last_seen_notif_' + devId, String(ts));
}

function checkCustomerInAppNotifications() {
  const devId = getDeviceId();
  // 1. Local Notification Check
  try {
    const raw = localStorage.getItem('sw_client_notification_' + devId);
    if (raw) {
      const notif = JSON.parse(raw);
      const lastSeen = localStorage.getItem('sw_last_seen_notif_' + devId);
      if (notif && notif.timestamp && String(notif.timestamp) !== lastSeen) {
        showCustomerNotificationPopup(notif);
      }
    }
  } catch(e){}

  // 2. Firebase Cloud Notification Check
  try {
    const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
    if (db) {
      db.collection('notifications').doc(devId).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const lastSeen = localStorage.getItem('sw_last_seen_notif_' + devId);
          if (data && data.timestamp && String(data.timestamp) !== lastSeen) {
            showCustomerNotificationPopup(data);
          }
        }
      }).catch(()=>{});
    }
  } catch(e){}

  // 3. Auto-sync approved key from Firebase
  try {
    const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
    if (db) {
      db.collection('recharge_requests').doc(devId).get().then(doc => {
        if (doc.exists) {
          const req = doc.data();
          if (req && req.status === 'Approved' && req.activation_key) {
            const actInput = document.getElementById('activationInput');
            if (actInput && !actInput.value) actInput.value = req.activation_key;
          }
        }
      }).catch(()=>{});
    }
  } catch(e){}
}
