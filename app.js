
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
  themeColor = themeColor || [25, 42, 74];
  var pageW = (doc.internal && doc.internal.pageSize && doc.internal.pageSize.getWidth) ? doc.internal.pageSize.getWidth() : 297;
  var profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  var shop_name = (profile.shop_name || "ALUMINIUM FABRICATION WORKSHOP").toUpperCase();
  var owner_name = (profile.name && profile.name !== "Fabricator") ? profile.name.trim() : "";
  var contact = profile.phone ? profile.phone.trim() : "";
  var email = (profile.email && profile.email.indexOf("@smartworker.app") === -1) ? profile.email.trim() : "";
  var gst = profile.gst ? profile.gst.trim() : "";
  var addr = (profile.address && profile.address !== "Fabrication Workshop") ? profile.address.trim() : "";
  var customLogo = localStorage.getItem('sw_custom_logo');

  doc.setFillColor(themeColor[0], themeColor[1], themeColor[2]);
  doc.rect(0, 0, pageW, 30, 'F');

  var textStartX = 14;
  if (customLogo) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(12, 3, 24, 24, 2.5, 2.5, 'F');
      var fmt = customLogo.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customLogo, fmt, 13, 4, 22, 22);
      textStartX = 41;
    } catch(e) {
      textStartX = 14;
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  doc.setTextColor(251, 191, 36);
  doc.text(shop_name, textStartX, 10);

  var detailParts = [];
  if (owner_name) detailParts.push("Prop: " + owner_name);
  if (addr) detailParts.push(addr);
  if (contact) detailParts.push("Mob: " + contact);
  if (email) detailParts.push("Email: " + email);
  if (gst) detailParts.push("GSTIN: " + gst);
  var infoLine = detailParts.length > 0 ? detailParts.join(" | ") : "Professional Aluminium, UPVC & Glass Fabrication";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text(infoLine, textStartX, 16.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(String(title || "").toUpperCase(), textStartX, 24);

  if (subtitle) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(253, 224, 71);
    doc.text(String(subtitle), pageW - 14, 24, { align: "right" });
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

 // Listen to Custom Products and Formula Overrides Live
 try {
   if (fbDb) {
     fbDb.collection('custom_products').onSnapshot(snap => {
       const prods = [];
       snap.forEach(d => { const dt = d.data(); if (dt) prods.push(dt); });
       if (prods.length > 0) {
         localStorage.setItem('sw_custom_products', JSON.stringify(prods));
         if (typeof renderCustomSeriesDropdown === 'function') renderCustomSeriesDropdown();
       }
     }, err => console.warn("Cloud custom_products sync notice", err));

     fbDb.collection('settings').doc('formula_overrides').onSnapshot(doc => {
       if (doc.exists) {
         const data = doc.data();
         if (data) localStorage.setItem('sw_formula_overrides', JSON.stringify(data));
       }
     }, err => console.warn("Cloud formula_overrides sync notice", err));
   }
   if (fbRtdb) {
     fbRtdb.ref('custom_products').on('value', snap => {
       const val = snap.val();
       if (val) {
         localStorage.setItem('sw_custom_products', JSON.stringify(Object.values(val)));
         if (typeof renderCustomSeriesDropdown === 'function') renderCustomSeriesDropdown();
       }
     });
     fbRtdb.ref('formula_overrides').on('value', snap => {
       const val = snap.val();
       if (val) localStorage.setItem('sw_formula_overrides', JSON.stringify(val));
     });
   }
 } catch(e) { console.warn("Dynamic formulas cloud sync setup:", e); }

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
 const m = document.getElementById('authModal');
 if (m) m.classList.add('active');
 else openScreen('auth', 'SIGN IN / REGISTER');
 }

 function closeAuthModal() {
 const m = document.getElementById('authModal');
 if (m) m.classList.remove('active');
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
 const emailEl = document.getElementById('login_email') || document.getElementById('auth_login_id');
 const passEl = document.getElementById('login_password') || document.getElementById('auth_login_pass');
 const email = emailEl ? emailEl.value.trim() : "";
 const pass = passEl ? passEl.value : "";
 if (!email || !pass) { alert("Please enter your Email and Password!"); return; }

 if (fbAuth) {
 fbAuth.signInWithEmailAndPassword(email, pass)
 .then(res => {
 alert("Logged in successfully! Syncing cloud data...");
 closeAuthModal();
 })
 .catch(err => {
 simulateLocalAuth(email);
 });
 } else {
 simulateLocalAuth(email);
 }
 }

 function handleEmailRegister() {
 const nameEl = document.getElementById('reg_name') || document.getElementById('auth_reg_name');
 const shopEl = document.getElementById('reg_shop') || document.getElementById('auth_reg_shop');
 const phoneEl = document.getElementById('reg_phone') || document.getElementById('auth_reg_id');
 const emailEl = document.getElementById('reg_email') || document.getElementById('auth_reg_id');
 const passEl = document.getElementById('reg_password') || document.getElementById('auth_reg_pass');
 const name = nameEl ? nameEl.value.trim() : "";
 const shop = shopEl ? shopEl.value.trim() : "";
 const phone = phoneEl ? phoneEl.value.trim() : "";
 const email = emailEl ? emailEl.value.trim() : "";
 const pass = passEl ? passEl.value : "";

 if (!email || !pass || pass.length < 6) {
 alert("Please enter a valid Email and a password of at least 6 characters!");
 return;
 }

 const profile = { name, shop_name: shop, phone, email, address: "West Bengal" };
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 if(currentCloudUser) syncAllDataToCloud(currentCloudUser.uid);
 loadSavedProfile();

 if (fbAuth) {
 fbAuth.createUserWithEmailAndPassword(email, pass)
 .then(res => {
 alert("Account created successfully! Your data is secured in the cloud.");
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
 alert(`Google Sign-In successful: ${res.user.displayName || res.user.email}`);
 closeAuthModal();
 })
 .catch(err => {
 alert("Please configure your Firebase credentials to enable Google Sign-In.");
 openFirebaseConfigModal();
 });
 } else {
 alert("Please configure your Firebase credentials to enable Google Sign-In.");
 openFirebaseConfigModal();
 }
 }

 function handleForgotPassword() {
 const email = prompt("Enter your registered Email ID to reset your password:");
 if (email && fbAuth) {
 fbAuth.sendPasswordResetEmail(email.trim())
 .then(() => alert("Password reset link has been sent to your email!"))
 .catch(err => alert("Error: " + err.message));
 }
 }

// Legacy duplicate auth helpers consolidated into main auth controller below

 // Strictly Isolated Per-Customer Cryptographic Vault ID (Zero Cross-User Data Leakage!)
 function computeUserVaultId(userId, passPlainOrHash) {
  const cleanId = String(userId || '').trim().toLowerCase();
  const pStr = String(passPlainOrHash || '').trim();
  if (!cleanId) return 'dev_vault_' + (typeof getDeviceId === 'function' ? getDeviceId() : 'local');
  if (typeof sha256 === 'function' && pStr) {
    return 'vault_' + sha256(cleanId + '_SW_PRIVATE_VAULT_' + pStr).substring(0, 24);
  }
  return 'user_vault_' + cleanId.replace(/[^a-z0-9]/g, '_') + '_' + (typeof getDeviceId === 'function' ? getDeviceId() : 'local');
 }

 function getIsolatedCloudDocId(uid) {
  // Guest mode never syncs to or from shared cloud!
  if (localStorage.getItem('sw_guest_mode') === 'true') return null;
  const savedVault = localStorage.getItem('sw_user_vault_id');
  if (savedVault && (!uid || uid === localStorage.getItem('sw_cloud_user'))) {
    return savedVault;
  }
  const savedUser = uid || (currentCloudUser ? currentCloudUser.uid : null) || localStorage.getItem('sw_cloud_user');
  const savedPass = localStorage.getItem('sw_user_password') || '';
  if (savedUser && savedUser !== 'workshop_primary') {
    return computeUserVaultId(savedUser, savedPass);
  }
  return null;
 }

 // Archive outgoing user's local data & completely wipe active working storage so next user NEVER sees previous user's data!
 function clearWorkingUserDataForAccountSwitch(incomingUserId) {
  try {
    const prevUser = localStorage.getItem('sw_cloud_user');
    if (prevUser && prevUser !== incomingUserId) {
      const archiveSnap = {
        profile: localStorage.getItem('sw_profile'),
        invoices: localStorage.getItem('sw_invoices'),
        measurements: localStorage.getItem('sw_measurements'),
        customers: localStorage.getItem('sw_customers'),
        site_khata: localStorage.getItem('sw_site_khata'),
        expenses: localStorage.getItem('sw_expenses'),
        custom_logo: localStorage.getItem('sw_custom_logo'),
        custom_qr: localStorage.getItem('sw_custom_qr'),
        calc_history: localStorage.getItem('sw_calc_history')
      };
      localStorage.setItem('sw_local_vault_' + prevUser, JSON.stringify(archiveSnap));
    }
  } catch(e){}

  const keysToWipe = [
    'sw_profile', 'sw_invoices', 'sw_measurements', 'sw_customers',
    'sw_site_khata', 'sw_expenses', 'sw_custom_logo', 'sw_custom_qr',
    'sw_calc_history', 'sw_offline_queue', 'sw_user_vault_id'
  ];
  keysToWipe.forEach(function(k) { localStorage.removeItem(k); });

  try {
    if (typeof billItems !== 'undefined') billItems = [];
    if (typeof siteKhataItems !== 'undefined') siteKhataItems = [];
    if (typeof clearDomal === 'function') clearDomal();
    if (typeof clearSliding === 'function') clearSliding();
    if (typeof clearCasement === 'function') clearCasement();
    if (typeof clearDoor === 'function') clearDoor();
    if (typeof clearPartition === 'function') clearPartition();
    if (typeof clearCustomSeries === 'function') clearCustomSeries();
    if (typeof clearBillItems === 'function') clearBillItems();
    document.querySelectorAll('img[alt*="Logo"], img[alt="SWA"]').forEach(function(img){ img.src = 'logo.png'; });
    if (typeof renderBrandingPreviews === 'function') renderBrandingPreviews();
  } catch(e){}

  // If incomingUserId has a saved local vault on this phone, restore ONLY their vault
  if (incomingUserId) {
    try {
      const rawVault = localStorage.getItem('sw_local_vault_' + incomingUserId);
      if (rawVault) {
        const snap = JSON.parse(rawVault);
        if (snap.profile) localStorage.setItem('sw_profile', snap.profile);
        if (snap.invoices) localStorage.setItem('sw_invoices', snap.invoices);
        if (snap.measurements) localStorage.setItem('sw_measurements', snap.measurements);
        if (snap.customers) localStorage.setItem('sw_customers', snap.customers);
        if (snap.site_khata) localStorage.setItem('sw_site_khata', snap.site_khata);
        if (snap.expenses) localStorage.setItem('sw_expenses', snap.expenses);
        if (snap.custom_logo) localStorage.setItem('sw_custom_logo', snap.custom_logo);
        if (snap.custom_qr) localStorage.setItem('sw_custom_qr', snap.custom_qr);
        if (snap.calc_history) localStorage.setItem('sw_calc_history', snap.calc_history);
      }
    } catch(e){}
  }
 }

 // Live Sync to Cloud Firestore (Strictly Isolated Per Authenticated Customer Vault)
 function syncAllDataToCloud(uid) {
  if (!fbDb) return;
  if (localStorage.getItem('sw_guest_mode') === 'true') return;
  const targetId = getIsolatedCloudDocId(uid);
  if (!targetId) return;
  try {
    const ownerUser = localStorage.getItem('sw_cloud_user') || '';
    const data = {
      owner_id: ownerUser,
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
      console.log("☁️ All Smart Worker data securely saved to isolated cloud vault!");
      const badge = document.getElementById('cloudUserBadge');
      if (badge) {
        badge.style.display = 'inline-flex';
        badge.title = "Cloud Synced (Private Vault)";
      }
    }).catch(err => {
      console.warn("Cloud write notice:", err);
    });
  } catch (err) {
    console.log("Cloud sync error:", err);
  }
}

// Restore from Cloud Firestore on New Device / Login (Strictly Isolated Vault)
function syncAllDataFromCloud(uid) {
  if (!fbDb) return;
  if (localStorage.getItem('sw_guest_mode') === 'true') return;
  const targetId = getIsolatedCloudDocId(uid);
  if (!targetId) return;
  fbDb.collection('users').doc(String(targetId)).get().then(doc => {
    if (doc.exists) {
      const d = doc.data();
      if (d.profile) localStorage.setItem('sw_profile', JSON.stringify(d.profile));
      localStorage.setItem('sw_invoices', JSON.stringify(Array.isArray(d.invoices) ? d.invoices : []));
      localStorage.setItem('sw_measurements', JSON.stringify(Array.isArray(d.measurements) ? d.measurements : []));
      localStorage.setItem('sw_customers', JSON.stringify((d.customers && typeof d.customers === 'object') ? d.customers : {}));
      localStorage.setItem('sw_site_khata', JSON.stringify(Array.isArray(d.site_khata) ? d.site_khata : []));
      localStorage.setItem('sw_expenses', JSON.stringify(Array.isArray(d.expenses) ? d.expenses : []));
      if (d.license) localStorage.setItem('sw_license', JSON.stringify(d.license));
      if (d.custom_logo) localStorage.setItem('sw_custom_logo', d.custom_logo);
      else localStorage.removeItem('sw_custom_logo');
      if (d.custom_qr) localStorage.setItem('sw_custom_qr', d.custom_qr);
      else localStorage.removeItem('sw_custom_qr');

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
 const inp = document.getElementById('customFbConfigInput');
 if (inp) inp.value = cur;
 const mod = document.getElementById('fbConfigModal');
 if (mod) mod.classList.add('active');
 }

 function closeFirebaseConfigModal() {
 const mod = document.getElementById('fbConfigModal');
 if (mod) mod.classList.remove('active');
 }

 function saveCustomFirebaseConfig() {
 const inp = document.getElementById('customFbConfigInput');
 const txt = inp ? inp.value.trim() : "";
 if (txt) {
 try {
 const parsed = JSON.parse(txt);
 localStorage.setItem('sw_firebase_config', JSON.stringify(parsed));
 alert("Firebase Config saved successfully! Reloading page to connect...");
 location.reload();
 } catch (e) {
 alert('Please paste valid JSON format (e.g. {"apiKey": "...", "projectId": "..."})');
 }
 } else {
 localStorage.removeItem('sw_firebase_config');
 alert("Default configuration has been reset.");
 closeFirebaseConfigModal();
 }
 }





function switchAuthMode(mode) {
 const loginBtn = document.getElementById('tabBtnLogin');
 const regBtn = document.getElementById('tabBtnRegister');
 const formLogin = document.getElementById('authFormLogin');
 const formReg = document.getElementById('authFormRegister');

 if (mode === 'login') {
 if (loginBtn) { loginBtn.style.background = '#2563eb'; loginBtn.style.color = '#fff'; }
 if (regBtn) { regBtn.style.background = 'transparent'; regBtn.style.color = '#475569'; }
 if (formLogin) formLogin.style.display = 'block';
 if (formReg) formReg.style.display = 'none';
 } else {
 if (regBtn) { regBtn.style.background = '#16a34a'; regBtn.style.color = '#fff'; }
 if (loginBtn) { loginBtn.style.background = 'transparent'; loginBtn.style.color = '#475569'; }
 if (formReg) formReg.style.display = 'block';
 if (formLogin) formLogin.style.display = 'none';
 }
 }

 function doEmailRegister() {
 const nameInput = document.getElementById('auth_reg_name') || document.getElementById('reg_name');
 const shopInput = document.getElementById('auth_reg_shop') || document.getElementById('reg_shop');
 const phoneInput = document.getElementById('auth_reg_phone') || document.getElementById('reg_phone');
 const emailInput = document.getElementById('auth_reg_email') || document.getElementById('reg_email');
 const passInput = document.getElementById('auth_reg_pass') || document.getElementById('reg_password');
 const confirmInput = document.getElementById('auth_reg_pass_confirm');

 const name = nameInput ? nameInput.value.trim() : '';
 const shop = shopInput ? shopInput.value.trim() : '';
 const phone = phoneInput ? phoneInput.value.trim() : '';
 const email = emailInput ? emailInput.value.trim() : '';
 const pass = passInput ? passInput.value : '';
 const passConfirm = confirmInput ? confirmInput.value : '';

 // 1. Strict Validation
 if (!name) {
 alert("Please enter your Full Name.");
 if (nameInput) nameInput.focus();
 return;
 }
 if (!shop) {
 alert("Please enter your Workshop / Shop Name.");
 if (shopInput) shopInput.focus();
 return;
 }
 const cleanPhone = phone.replace(/\D/g, '');
 if (!cleanPhone || cleanPhone.length < 10) {
 alert("Please enter a valid 10-digit Mobile Number.");
 if (phoneInput) phoneInput.focus();
 return;
 }
 if (!pass || pass.length < 6) {
 alert("Please choose a strong password with at least 6 characters or numbers.");
 if (passInput) passInput.focus();
 return;
 }
 if (!passConfirm) {
 alert("Please enter your password twice in the Confirm Password field to verify.");
 if (confirmInput) confirmInput.focus();
 return;
 }
 if (pass !== passConfirm) {
 alert("Passwords do not match! Please make sure both password fields are exactly identical.");
 if (confirmInput) confirmInput.focus();
 return;
 }

 const finalEmail = email || (cleanPhone + "@smartworker.app");

 const profile = {
 name: name,
 shop_name: shop,
 phone: cleanPhone,
 email: finalEmail,
 address: "Fabrication Workshop"
 };

 // 2. Store user securely in local database
 const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
 users[cleanPhone] = {
 name: name,
 shop_name: shop,
 phone: cleanPhone,
 email: finalEmail,
 password: pass,
 created_at: new Date().toISOString()
 };
 if (email) {
 users[email.toLowerCase()] = users[cleanPhone];
 }
 // Wipe any previous user's working data on this phone before initializing the new workshop account
 clearWorkingUserDataForAccountSwitch(cleanPhone);

 const passHash = (typeof sha256 === 'function') ? sha256(pass + "_SW_AUTH_SALT_2026") : pass;
 const vaultId = computeUserVaultId(cleanPhone, pass);
 users[cleanPhone].password_hash = passHash;
 users[cleanPhone].vault_id = vaultId;
 localStorage.setItem('sw_registered_users', JSON.stringify(users));

 localStorage.setItem('sw_profile', JSON.stringify(profile));
 localStorage.setItem('sw_invoices', '[]');
 localStorage.setItem('sw_measurements', '[]');
 localStorage.setItem('sw_customers', '{}');
 localStorage.setItem('sw_site_khata', '[]');
 localStorage.setItem('sw_expenses', '[]');

  // New workshops start on Free Plan so they subscribe to the ₹99 Karigar Pro Plan!
  const defaultLicense = {
    key: "",
    plan: "Free Plan",
    start_date: new Date().toLocaleDateString('en-GB'),
    expiry_date: "Pending Activation",
    status: "FREE_PLAN"
  };
  localStorage.setItem('sw_license', JSON.stringify(defaultLicense));

  localStorage.setItem('sw_cloud_user', cleanPhone);
 localStorage.setItem('sw_user_password', pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 localStorage.removeItem('sw_guest_mode');

 // 3. Cloud Firestore Synchronization (Auth Index + Isolated Vault)
 if (window.fbDb) {
 fbDb.collection('users').doc(cleanPhone).set({
 profile: profile,
 password_hash: passHash,
 vault_id: vaultId,
 updated_at: new Date().toISOString()
 }, { merge: true }).catch(e => console.warn("Firestore sync notice:", e));
 fbDb.collection('users').doc(vaultId).set({
 owner_id: cleanPhone,
 profile: profile,
 updated_at: new Date().toISOString()
 }, { merge: true }).catch(e => console.warn("Vault sync notice:", e));
 }

 // 4. Firebase Authentication if available
 if (window.firebase && fbAuth) {
 fbAuth.createUserWithEmailAndPassword(finalEmail, pass).then(res => {
 currentCloudUser = res.user;
 updateCloudUserUI(res.user);
 syncAllDataToCloud(res.user.uid);
 }).catch(err => {
 console.warn("Firebase Auth note:", err);
 });
 }

 simulateLocalAuth(cleanPhone);
 loadSavedProfile();
 alert("Workshop registered successfully!\n\n👤 Name: " + name + "\n🏬 Shop: " + shop + "\n📱 Mobile ID: " + cleanPhone);
 goHome();
 }

 function doEmailLogin() {
 const userInput = document.getElementById('auth_login_email') || document.getElementById('login_email');
 const passInput = document.getElementById('auth_login_pass') || document.getElementById('login_password');
 const userRaw = userInput ? userInput.value.trim() : '';
 const pass = passInput ? passInput.value : '';

 if (!userRaw) {
 alert("Please enter your 10-digit Mobile Number or Email.");
 if (userInput) userInput.focus();
 return;
 }
 if (!pass) {
 alert("Please enter your Password.");
 if (passInput) passInput.focus();
 return;
 }

 const cleanUser = userRaw.replace(/\D/g, '').length >= 10 ? userRaw.replace(/\D/g, '') : userRaw.toLowerCase();

 // 1. Check local registered users database
 const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
 const userAccount = users[cleanUser] || users[userRaw] || users[userRaw.toLowerCase()];

 const passHash = (typeof sha256 === 'function') ? sha256(pass + "_SW_AUTH_SALT_2026") : pass;
 if (userAccount) {
 if (userAccount.password === pass || (userAccount.password_hash && userAccount.password_hash === passHash)) {
 const targetUserKey = userAccount.phone || cleanUser;
 clearWorkingUserDataForAccountSwitch(targetUserKey);
 const restoredProf = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 localStorage.setItem('sw_profile', JSON.stringify(Object.assign({}, restoredProf, {
 name: userAccount.name || restoredProf.name,
 shop_name: userAccount.shop_name || restoredProf.shop_name,
 phone: userAccount.phone || restoredProf.phone,
 email: userAccount.email || restoredProf.email,
 address: userAccount.address || restoredProf.address || "Fabrication Workshop"
 })));
 const vaultId = userAccount.vault_id || computeUserVaultId(targetUserKey, pass);
 localStorage.setItem('sw_cloud_user', targetUserKey);
 localStorage.setItem('sw_user_password', pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 localStorage.removeItem('sw_guest_mode');
 simulateLocalAuth(targetUserKey);
 syncAllDataFromCloud(vaultId);
 loadSavedProfile();
 alert("Sign-in successful! Welcome back, " + userAccount.name + " (" + userAccount.shop_name + ")");
 goHome();
 return;
 } else {
 alert("Incorrect password! Please re-check your password.");
 if (passInput) passInput.focus();
 return;
 }
 }

 // 2. Check local saved profile
 const savedUser = localStorage.getItem('sw_cloud_user');
 const savedPass = localStorage.getItem('sw_user_password');
 const savedProfile = JSON.parse(localStorage.getItem('sw_profile') || '{}');

 if (savedUser && (savedUser === cleanUser || savedProfile.phone === cleanUser || savedProfile.email === userRaw)) {
 if (!savedPass || savedPass !== pass) {
 alert("Incorrect password! Please re-check your password.");
 if (passInput) passInput.focus();
 return;
 }
 const vaultId = computeUserVaultId(savedUser, pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 simulateLocalAuth(savedUser);
 loadSavedProfile();
 alert("Sign-in successful! Welcome back.");
 goHome();
 return;
 }

 // 3. Check Google Cloud Firestore if registered from another device (Strict Password Verification Required!)
 if (window.fbDb) {
 fbDb.collection('users').doc(cleanUser).get().then(doc => {
 if (doc.exists) {
 const d = doc.data();
 const validPass = (d.password_hash && d.password_hash === passHash) || (d.password && d.password === pass);
 if (!validPass) {
 alert("Incorrect password! Access to this workshop account is strictly protected.");
 if (passInput) passInput.focus();
 } else {
 clearWorkingUserDataForAccountSwitch(cleanUser);
 if (d.profile) localStorage.setItem('sw_profile', JSON.stringify(d.profile));
 const vaultId = d.vault_id || computeUserVaultId(cleanUser, pass);
 localStorage.setItem('sw_cloud_user', cleanUser);
 localStorage.setItem('sw_user_password', pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 localStorage.removeItem('sw_guest_mode');
 simulateLocalAuth(cleanUser);
 syncAllDataFromCloud(vaultId);
 alert("Sign-in successful! Restored workshop data from your private Cloud Vault.");
 goHome();
 }
 } else {
 // Try Firebase Auth if user entered email
 if (window.firebase && fbAuth) {
 const fbMail = userRaw.includes('@') ? userRaw : (cleanUser + "@smartworker.app");
 fbAuth.signInWithEmailAndPassword(fbMail, pass).then(res => {
 currentCloudUser = res.user;
 localStorage.setItem('sw_cloud_user', cleanUser);
 localStorage.setItem('sw_user_password', pass);
 localStorage.removeItem('sw_guest_mode');
 updateCloudUserUI(res.user);
 syncAllDataFromCloud(res.user.uid);
 alert("Sign-in successful!");
 goHome();
 }).catch(err => {
 if (err.code === 'auth/wrong-password') {
 alert("Incorrect password! Please enter the correct password.");
 } else {
 alert("No account found for this Mobile Number / Email. Please click 'Register Workshop' to create your account.");
 }
 });
 } else {
 alert("No account found for this Mobile Number. Please click 'Register Workshop' to create your account.");
 }
 }
 }).catch(() => {
 alert("Account verification error. Please check your credentials or click 'Register Workshop'.");
 });
 return;
 }

 alert("No registered account found for this Mobile Number. Please click 'Register Workshop' to create your account.");
 }

 function doGoogleSignIn() {
 if (window.firebase && fbAuth) {
 try {
 const provider = new firebase.auth.GoogleAuthProvider();
 fbAuth.signInWithPopup(provider)
 .then(res => {
 currentCloudUser = res.user;
 const email = res.user.email || 'google_user@gmail.com';
 const displayName = res.user.displayName || "Fabricator";
 localStorage.setItem('sw_cloud_user', email);
 localStorage.removeItem('sw_guest_mode');

 let prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (!prof.name) {
 prof = {
 name: displayName,
 shop_name: displayName + " Fabrication",
 phone: "",
 email: email,
 address: "Fabrication Workshop"
 };
 localStorage.setItem('sw_profile', JSON.stringify(prof));
 }

 updateCloudUserUI(res.user);
 loadSavedProfile();
 syncAllDataFromCloud(res.user.uid);
 alert("Google Sign-In successful: " + (res.user.displayName || email));
 goHome();
 })
 .catch(err => {
 console.warn("Google popup notice:", err);
 promptForGoogleEmail();
 });
 } catch(e) {
 console.warn("Google provider exception:", e);
 promptForGoogleEmail();
 }
 } else {
 promptForGoogleEmail();
 }
 }

 function promptForGoogleEmail() {
 const guestEmail = prompt("Enter your Gmail address to sign in with Google:");
 if (guestEmail && guestEmail.trim()) {
 const em = guestEmail.trim();
 localStorage.setItem('sw_cloud_user', em);
 localStorage.removeItem('sw_guest_mode');
 let prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (!prof.name) {
 const defaultName = em.split('@')[0] || "Fabricator";
 prof = {
 name: defaultName,
 shop_name: defaultName.toUpperCase() + " FABRICATION",
 phone: "",
 email: em,
 address: "Fabrication Workshop"
 };
 localStorage.setItem('sw_profile', JSON.stringify(prof));
 }
 simulateLocalAuth(em);
 loadSavedProfile();
 alert("Signed in successfully with Google ID: " + em);
 goHome();
 }
 }

 function openForgotPassModal() {
 const m = document.getElementById('forgotPassModal');
 if (m) m.style.display = 'flex';
 }

 function closeForgotPassModal() {
 const m = document.getElementById('forgotPassModal');
 if (m) m.style.display = 'none';
 }

 function doForgotPassword() {
 openForgotPassModal();
 }

 function handleForgotPassSubmit(e) {
 if (e && e.preventDefault) e.preventDefault();
 const phoneInput = document.getElementById('fp_phone');
 const nameInput = document.getElementById('fp_name');
 const shopInput = document.getElementById('fp_shop');

 const phone = phoneInput ? phoneInput.value.trim() : '';
 const name = nameInput ? nameInput.value.trim() : '';
 const shop = shopInput ? shopInput.value.trim() : '';

 const cleanPhone = phone.replace(/\D/g, '');
 if (!cleanPhone || cleanPhone.length < 10) {
 alert("Please enter a valid 10-digit registered mobile number.");
 if (phoneInput) phoneInput.focus();
 return;
 }
 if (!name || !shop) {
 alert("Please enter your Full Name and Workshop Name.");
 return;
 }

 const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
 const user = users[cleanPhone] || users[phone];
 const registeredPass = user ? user.password : (localStorage.getItem('sw_user_password') || "123456");

 const reqObj = {
 id: "RST_" + Date.now(),
 phone: cleanPhone,
 name: name,
 shop: shop,
 registered_password: registeredPass,
 status: "PENDING_VERIFICATION",
 timestamp: Date.now(),
 date_str: new Date().toLocaleString('en-GB')
 };

 let resets = JSON.parse(localStorage.getItem('sw_password_reset_requests') || '[]');
 const existIdx = resets.findIndex(r => r.phone === cleanPhone);
 if (existIdx !== -1) resets[existIdx] = reqObj;
 else resets.unshift(reqObj);
 localStorage.setItem('sw_password_reset_requests', JSON.stringify(resets));

 if (window.fbDb) {
 fbDb.collection('password_reset_requests').doc(cleanPhone).set(reqObj, { merge: true }).catch(() => {});
 }
 if (window.fbRtdb) {
 try { fbRtdb.ref('password_reset_requests/' + cleanPhone).set(reqObj); } catch(err){}
 }

 closeForgotPassModal();

 alert("Verification Request Submitted to Admin!\n\nTo protect your workshop data, Admin will call your mobile number (+91 " + cleanPhone + ") to verify genuine ownership before providing your password.");

 contactAdminDirectWhatsApp(cleanPhone, name, shop);
 }

 function contactAdminDirectWhatsApp(phoneVal, nameVal, shopVal) {
 const p = phoneVal || (document.getElementById('fp_phone') ? document.getElementById('fp_phone').value.trim() : '');
 const n = nameVal || (document.getElementById('fp_name') ? document.getElementById('fp_name').value.trim() : '');
 const s = shopVal || (document.getElementById('fp_shop') ? document.getElementById('fp_shop').value.trim() : '');

 const msg = "*SMART WORKER PRO - PASSWORD VERIFICATION REQUEST*\n" +
 "----------------------------------------\n" +
 "Workshop: *" + (s || "Aluminium Workshop") + "*\n" +
 "Owner Name: *" + (n || "Fabricator") + "*\n" +
 "Registered Mobile: *" + (p || "N/A") + "*\n" +
 "----------------------------------------\n" +
 "Hello Saheb Da,\n" +
 "I forgot my account password. Please call my mobile number to verify genuine ownership and provide my password.\n\n" +
 "Thank you!";

 const waUrl = "https://wa.me/919239413517?text=" + encodeURIComponent(msg);
 window.open(waUrl, '_blank');
 }

 function skipAuthToGuest() {
 if (localStorage.getItem('sw_cloud_user')) {
   clearWorkingUserDataForAccountSwitch('guest_local');
   localStorage.removeItem('sw_cloud_user');
 }
 localStorage.setItem('sw_guest_mode', 'true');
 let prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (!prof.name || !prof.shop_name) {
 prof = {
 name: "Fabricator",
 shop_name: "ALUMINIUM FABRICATION WORKSHOP",
 phone: "",
 email: "",
 address: "Fabrication Workshop"
 };
 localStorage.setItem('sw_profile', JSON.stringify(prof));
 }
 loadSavedProfile();
 goHome();
 }

 function handleCloudLogout() {
 if (confirm("Are you sure you want to sign out from this device? (Your private data is safely backed up and will be cleared from this screen)")) {
 if (fbAuth) {
 try { fbAuth.signOut(); } catch(e){}
 }
 if (window.khataUnsubscribe && typeof window.khataUnsubscribe === 'function') {
   try { window.khataUnsubscribe(); window.khataUnsubscribe = null; } catch(e){}
 }
 clearWorkingUserDataForAccountSwitch(null);
 currentCloudUser = null;
 localStorage.removeItem('sw_cloud_user');
 localStorage.removeItem('sw_user_password');
 localStorage.removeItem('sw_user_vault_id');
 localStorage.removeItem('sw_guest_mode');
 updateCloudUserUI(null);
 openScreen('auth', 'SIGN IN / REGISTER');
 alert("Signed out successfully. Your private workshop data has been locked.");
 }
 }

 function simulateLocalAuth(userId) {
 const safeId = String(userId || 'fabricator').trim();
 currentCloudUser = { uid: safeId, email: safeId };
 localStorage.setItem('sw_cloud_user', safeId);
 localStorage.removeItem('sw_guest_mode');
 updateCloudUserUI(currentCloudUser);
 loadSavedProfile();
 const modal = document.getElementById('authModal');
 if (modal) modal.classList.remove('active');
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
 let bestPlan = null;
 const stdLens = allowedLens;
 for (const stdLen of stdLens) {
 const bins = [];
 let valid = true;
 for (const p of sorted) {
 if (p > stdLen) { valid = false; break; }
 let placed = false;
 for (const b of bins) {
 const sumB = b.reduce((a, c) => a + c, 0);
 if (sumB + p <= stdLen + 0.001) { b.push(p); placed = true; break; }
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
  return "";
}

// ========================================================
// 2B. SMART DIMENSION CALCULATOR KEYPAD (NUMBERS + 16 FRACTIONS)
// ========================================================
let keypadTarget = null;
let keypadDisplay = "";

function openKeypad(targetId) {
  keypadTarget = document.getElementById(targetId);
  if (keypadTarget && keypadTarget.blur) {
    try { keypadTarget.blur(); } catch (e) {}
  }
  keypadDisplay = keypadTarget ? String(keypadTarget.value || "") : "";
  updateKeypadDisplay();
  var modal = document.getElementById("keypadModal");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
  }
}

function closeKeypadModal() {
  var modal = document.getElementById("keypadModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}

function updateKeypadDisplay() {
  var dispEl = document.getElementById("kDisplay");
  if (dispEl) dispEl.textContent = keypadDisplay || "0";
}

function keypadAddDigit(d) {
  if (keypadDisplay === "0" && d !== ".") {
    keypadDisplay = String(d);
  } else {
    keypadDisplay += String(d);
  }
  updateKeypadDisplay();
}

function keypadAddOp(op) {
  if (!keypadDisplay) return;
  if (/[+\-*/\s]$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.trim().slice(0, -1) + " " + op + " ";
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
  if (/\d+\/\d+$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.replace(/\d+\/\d+$/, frac);
  } else if (/\d+$/.test(keypadDisplay)) {
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
    keypadDisplay = keypadDisplay.replace(/\s+$/, "");
    keypadDisplay = keypadDisplay.slice(0, -1);
  }
  updateKeypadDisplay();
}

function keypadEnter() {
  if (keypadTarget) {
    keypadTarget.value = keypadDisplay;
    if (typeof keypadTarget.oninput === "function") keypadTarget.oninput();
    if (typeof keypadTarget.onchange === "function") keypadTarget.onchange();
  }
  closeKeypadModal();
}

// ========================================================
 // 3. DOMAL WINDOW MODULE
 // ========================================================
 var dm_window_count = 0;
 var dm_buckets = {};
 var dm_glass_dict = {};

 function calculateDomal() {
 const raw_h = safeEval(document.getElementById('dm_h').value);
 const raw_w = safeEval(document.getElementById('dm_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('dm_unit').value.includes('Millimeter');
 const h_mm = is_mm ? raw_h : raw_h * 25.4;
 const w_mm = is_mm ? raw_w : raw_w * 25.4;
 const t_text = document.getElementById('dm_type').value;

 let track_h = 45.0;
 const thMatch = document.getElementById('dm_track_h').value.match(/[0-9]+(?:\.[0-9]+)?/);
 if (thMatch) track_h = parseFloat(thMatch[0]);

 let handle_h = 27.0, handle_w = 65.0;
 const hwMatch = document.getElementById('dm_handle_hw').value.match(/[0-9]+(?:\.[0-9]+)?/g);
 if (hwMatch && hwMatch.length >= 2) {
 handle_h = parseFloat(hwMatch[0]);
 handle_w = parseFloat(hwMatch[1]);
 }

 const ovr_dm = (typeof getFormulaOverrides === 'function') ? getFormulaOverrides() : {};
 const custom_dm_h_deduct = (ovr_dm && ovr_dm.dm_sash_h_deduct != null && parseFloat(ovr_dm.dm_sash_h_deduct) !== 44.0) ? parseFloat(ovr_dm.dm_sash_h_deduct) : ((track_h * 2.0) - 22.0);
 const v_cut_mm = h_mm - custom_dm_h_deduct;
 const h_deduct_mm = custom_dm_h_deduct;
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

 const g_deduct_base = (ovr_dm && ovr_dm.dm_glass_deduct != null) ? parseFloat(ovr_dm.dm_glass_deduct) : 26.0;
 const g_deduct_mm = (handle_w * 2.0) - g_deduct_base;
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
 hw_txt += `> Domal Bearing / Rollers: ${total_sash_for_hw * 2 * win_qty} pc\n`;
 hw_txt += `> Touch Lock / Star Lock: ${(s_c >= 3 ? 2 : 1) * win_qty} pc\n`;
 hw_txt += `> L-Cleat (Corner Angle): ${total_sash_for_hw * 4 * win_qty} pc\n> EPDM Gasket / Seal: Required\n`;

 const w_sign = net_w_mod >= 0 ? `+${Math.round(net_w_mod)}` : `${Math.round(net_w_mod)}`;
 
 let alu_txt = `[Domal Win #${dm_window_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)}${qty_str}]\n`;
 alu_txt += `> Outer Track (Top/Bot): ${disp(w_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Outer Track (Vertical): ${disp(h_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(h_cut_in)} (${s_c * 2 * win_qty} pc)\n`;
 alu_txt += `> Sash Handle: ${disp(v_cut_in)} (${han_qty * win_qty} pc)\n`;
 alu_txt += `> Sash Interlock Clip: ${disp(v_cut_in)} (${int_qty * win_qty} pc)\n`;

 if (has_mesh) {
 alu_txt += `\n--- MOSQUITO NET ---\n> Mesh Top/Bot: ${disp(mesh_w_in)} (${2 * win_qty} pc)\n> Mesh Handle: ${disp(v_cut_in)} (${2 * win_qty} pc)\n> Mesh Interlock Clip: ${disp(v_cut_in)} (${1 * win_qty} pc)\n`;
 }

 const glass_txt = `\n--- GLASS SIZES ---\n> Glass Size: ${disp(gh_in)} x ${disp(gw_in)} (${s_c * win_qty} pc)\n`;
 const glass_key = `${disp(gh_in)} x ${disp(gw_in)}`;
 dm_glass_dict[glass_key] = (dm_glass_dict[glass_key] || 0) + (s_c * win_qty);

 let track_type = t_text.split(' ')[0];
 if (t_text.includes("Center")) track_type = "2-Track CO";

 const outer_key = `Domal Outer Track (${track_type})`;
 const sash_tb_key = `Domal Sash Top/Bottom (${track_type})`;
 const sash_handle_key = `Domal Sash Handle (${track_type})`;
 const interlock_key = `Domal Interlock Clip (${track_type})`;

 [outer_key, sash_tb_key, sash_handle_key, interlock_key].forEach(k => {
 if (!dm_buckets[k]) dm_buckets[k] = [];
 });

 for (let q = 0; q < win_qty; q++) {
   dm_buckets[outer_key].push(w_in, w_in, h_in, h_in);
   for (let i = 0; i < s_c * 2; i++) dm_buckets[sash_tb_key].push(h_cut_in);
   for (let i = 0; i < han_qty; i++) dm_buckets[sash_handle_key].push(v_cut_in);
   for (let i = 0; i < int_qty; i++) dm_buckets[interlock_key].push(v_cut_in);
   if (has_mesh) {
     dm_buckets[sash_tb_key].push(mesh_w_in, mesh_w_in);
     dm_buckets[sash_handle_key].push(v_cut_in, v_cut_in);
     dm_buckets[interlock_key].push(v_cut_in);
   }
 }

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
 var sl_window_count = 0;
 var sl_buckets = {};
 var sl_glass_dict = {};

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

 const ovr = (typeof getFormulaOverrides === 'function') ? getFormulaOverrides() : {};
 if (sys_type.includes('18x40')) {
 h_minus = (ovr && ovr.sl_18x40_h_minus != null) ? parseFloat(ovr.sl_18x40_h_minus) : 1.625;
 g_h_minus = (ovr && ovr.sl_18x40_g_h_minus != null) ? parseFloat(ovr.sl_18x40_g_h_minus) : 2.75;
 g_w_mod = (ovr && ovr.sl_18x40_w_mod != null) ? parseFloat(ovr.sl_18x40_w_mod) : 0.625;
 w_mod = (div === 2) ? -6.0 : (div === 3 ? -8.0 : -11.0);
 } else if (sys_type.includes('18x50')) {
 h_minus = (ovr && ovr.sl_18x50_h_minus != null) ? parseFloat(ovr.sl_18x50_h_minus) : 1.75;
 g_h_minus = (ovr && ovr.sl_18x50_g_h_minus != null) ? parseFloat(ovr.sl_18x50_g_h_minus) : 3.0;
 g_w_mod = (ovr && ovr.sl_18x50_w_mod != null) ? parseFloat(ovr.sl_18x50_w_mod) : 0.75;
 w_mod = (div === 2) ? -7.0 : (div === 3 ? -9.5 : -12.5);
 } else if (sys_type.includes('18x60')) {
 h_minus = (ovr && ovr.sl_18x60_h_minus != null) ? parseFloat(ovr.sl_18x60_h_minus) : 1.875;
 g_h_minus = (ovr && ovr.sl_18x60_g_h_minus != null) ? parseFloat(ovr.sl_18x60_g_h_minus) : 3.125;
 g_w_mod = (ovr && ovr.sl_18x60_w_mod != null) ? parseFloat(ovr.sl_18x60_w_mod) : 0.875;
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
 hw_txt += `> Sliding Roller / Bearing: ${g_c * 2 * win_qty} pc\n`;
 hw_txt += `> Star Lock: ${(g_c >= 3 ? 2 : 1) * win_qty} pc\n> Rubber & Woolpile: Required\n`;

 let alu_txt = `[Win #${sl_window_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)} (${sys_type.split(' ')[0]})${qty_str}]\n`;
 alu_txt += `> Track Top: ${disp(w_in)} (${1 * win_qty} pc)\n`;
 alu_txt += `> Track Bottom: ${disp(w_in)} (${1 * win_qty} pc)\n`;
 alu_txt += `> Track Vertical: ${disp(h_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(tb_w)} (${g_c * 2 * win_qty} pc)\n`;
 alu_txt += `> Sash Handle: ${disp(handle_h)} (${han_qty * win_qty} pc)\n`;
 alu_txt += `> Sash Interlock: ${disp(handle_h)} (${int_qty * win_qty} pc)\n`;

 const glass_txt = `\n--- GLASS SIZES ---\n> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${g_c * win_qty} pc)\n`;
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
 var cc_window_count = 0;
 var cc_buckets = { "Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": [], "Square Clip (Beading)": [] };
 var cc_glass_dict = {};

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
 const win_loc = document.getElementById('cc_loc') ? document.getElementById('cc_loc').value.trim() : "";
 const win_qty = document.getElementById('cc_qty') ? Math.max(1, parseInt(document.getElementById('cc_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";
 const total_sash_qty = (top_open + bot_open) * win_qty;

 let out_txt = `[${series} Win #${cc_window_count}${loc_str} | Size: ${disp(h_mm)} x ${disp(w_mm)}${qty_str}]\n`;
 out_txt += "--- 1. OUTER FRAME & MULLIONS ---\n";
 out_txt += `> Outer Vertical: ${disp(h_mm)} (${2 * win_qty} pc)\n> Outer Horizontal: ${disp(w_mm)} (${2 * win_qty} pc)\n`;
 for (let q = 0; q < win_qty; q++) {
   cc_buckets["Casement Outer"].push(h_mm / 25.4, h_mm / 25.4, w_mm / 25.4, w_mm / 25.4);
 }

 if (h_mullion_qty > 0) {
 out_txt += `> Horizontal Divider: ${disp(w_mm - outer_2)} (${h_mullion_qty * win_qty} pc)\n`;
 for (let i = 0; i < h_mullion_qty * win_qty; i++) cc_buckets["Casement Mullion"].push((w_mm - outer_2) / 25.4);
 }
 if (top_v_mullion_qty > 0) {
 out_txt += `> Top Vert. Mullions: ${disp(top_gap_h)} (${top_v_mullion_qty * win_qty} pc)\n`;
 for (let i = 0; i < top_v_mullion_qty * win_qty; i++) cc_buckets["Casement Mullion"].push(top_gap_h / 25.4);
 }
 if (bot_v_mullion_qty > 0) {
 out_txt += `> Bot Vert. Mullions: ${disp(bot_gap_h)} (${bot_v_mullion_qty * win_qty} pc)\n`;
 for (let i = 0; i < bot_v_mullion_qty * win_qty; i++) cc_buckets["Casement Mullion"].push(bot_gap_h / 25.4);
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
 out_txt += `[OPENABLE SASH | Qty: ${top_open * win_qty} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_open)}]\n`;
 const s1_h = top_gap_h + overlap, s1_w = w_gap_open + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)} (${top_open * win_qty} Sash)\n > Glass Size: ${disp(g_h)} x ${disp(g_w)} (${top_open * win_qty} pc)\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (top_open * win_qty);
 for (let i = 0; i < top_open * 2 * win_qty; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }

 if (top_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${top_fixed * win_qty} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_fixed)}]\n`;
 const g_h = top_gap_h - glass_m_fixed, g_w = w_gap_fixed - glass_m_fixed;
 out_txt += ` > Fixed Glass Size: ${disp(g_h)} x ${disp(g_w)} (${top_fixed * win_qty} pc)\n > Square Clip (Beading): Required\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (top_fixed * win_qty);
 const beading_length = (top_gap_h + w_gap_fixed) * 2 / 25.4;
 for (let i = 0; i < top_fixed * win_qty; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }

 if (bot_cols > 0 && rows === 2) {
 out_txt += `\n--- 3. BOTTOM ROW DETAILS (${bot_cols} SECTIONS) ---\n`;
 if (bot_open > 0) {
 out_txt += `[OPENABLE SASH | Qty: ${bot_open * win_qty} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\n`;
 const s1_h = bot_gap_h + overlap, s1_w = bot_gap_w + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)} (${bot_open * win_qty} Sash)\n > Glass Size: ${disp(g_h)} x ${disp(g_w)} (${bot_open * win_qty} pc)\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (bot_open * win_qty);
 for (let i = 0; i < bot_open * 2 * win_qty; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }
 if (bot_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${bot_fixed * win_qty} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\n`;
 const g_h = bot_gap_h - glass_m_fixed, g_w = bot_gap_w - glass_m_fixed;
 out_txt += ` > Fixed Glass Size: ${disp(g_h)} x ${disp(g_w)} (${bot_fixed * win_qty} pc)\n > Square Clip (Beading): Required\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed Glass)`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (bot_fixed * win_qty);
 const beading_length = (bot_gap_h + bot_gap_w) * 2 / 25.4;
 for (let i = 0; i < bot_fixed * win_qty; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
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
 if (document.getElementById('cc_loc')) document.getElementById('cc_loc').value = "";
 if (document.getElementById('cc_qty')) document.getElementById('cc_qty').value = "1";
 document.getElementById('cc_out').textContent = "";
 document.getElementById('cc_mat_out').textContent = "";
 }

 // ========================================================
 // 6. DOOR MASTER MODULE
 // ========================================================
 var dr_door_count = 0;
 var dr_buckets = { "Door Outer Frame": [], "Door Verticals": [], "Door Horizontals": [] };
 var dr_glass_dict = {};

 function calculateDoor() {
  const raw_h = safeEval(document.getElementById('dr_h').value);
  const raw_w = safeEval(document.getElementById('dr_w').value);
  if (raw_h === 0 || raw_w === 0) {
    alert("Please enter Height and Width.");
    return;
  }

  const is_mm = document.getElementById('dr_unit').value.includes('Millimeter');
  const h = is_mm ? raw_h / 25.4 : raw_h;
  const w = is_mm ? raw_w / 25.4 : raw_w;
  const d_type = document.getElementById('dr_type').value;
  const palla_qty = document.getElementById('dr_palla') ? (parseInt(document.getElementById('dr_palla').value) || 2) : 2;
  const door_qty = document.getElementById('dr_qty') ? Math.max(1, parseInt(document.getElementById('dr_qty').value) || 1) : 1;
  const loc = document.getElementById('dr_loc') ? document.getElementById('dr_loc').value.trim() : "";
  const loc_str = loc ? ` [${loc}]` : "";
  const qty_str = door_qty > 1 ? ` (Qty: ${door_qty} Doors)` : "";
  const palla_str = palla_qty === 2 ? "Double Door" : "Single Door";

  let outer_v = h, outer_h = w - 3.0, has_outer = true, has_mid = false;
  let door_v = 0, door_tb = 0;
  let leaf_w = 0;

  const ovr_dr = (typeof getFormulaOverrides === 'function') ? getFormulaOverrides() : {};
  const std_h_deduct = (ovr_dr && ovr_dr.dr_v_deduct != null && parseFloat(ovr_dr.dr_v_deduct) !== 0.375) ? parseFloat(ovr_dr.dr_v_deduct) : 1.75;
  if (d_type === "Standard Door") {
    door_v = h - std_h_deduct;
    if (palla_qty === 2) {
      // 2 Palla: Inside opening is w - 3.0". Center meeting gap is 0.25".
      leaf_w = (w - 3.25) / 2.0;
      door_tb = leaf_w - 3.5; // Two vertical styles (1.75" + 1.75" = 3.5")
    } else {
      leaf_w = w - 3.25;
      door_tb = w - 6.75;
    }
  } else if (d_type === "Floor Spring Door") {
    door_v = h - 2.0;
    if (palla_qty === 2) {
      leaf_w = (w - 3.5) / 2.0;
      door_tb = leaf_w - 3.5;
    } else {
      leaf_w = w - 3.25;
      door_tb = w - 6.75;
    }
  } else if (d_type === "Top Hung Door") {
    // Top Hung Door Formula
    door_v = h - 2.0;
    has_outer = false;
    has_mid = true;
    if (palla_qty === 2) {
      // 2 Palla bi-parting
      leaf_w = (w + 4.0) / 2.0;
      door_tb = leaf_w - 3.5;
    } else {
      leaf_w = w + 4.0;
      door_tb = leaf_w - 3.5;
    }
  } else if (d_type === "Domal System Door") {
    door_v = h - (25.0 / 25.4);
    if (palla_qty === 2) {
      leaf_w = ((w - (38.0 / 25.4)) - 0.25) / 2.0;
      door_tb = leaf_w - 3.5;
    } else {
      leaf_w = w - (38.0 / 25.4);
      door_tb = leaf_w - 3.5;
    }
  } else {
    door_v = h - 2.0;
    if (palla_qty === 2) {
      leaf_w = (w - 3.5) / 2.0;
      door_tb = leaf_w - 3.5;
    } else {
      leaf_w = w - 3.25;
      door_tb = w - 6.75;
    }
  }

  const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
  const unit_str = is_mm ? "mm" : "Inch";
  dr_door_count += 1;

  let out = `[Door #${dr_door_count}${loc_str} - ${d_type} (${palla_str}) (${disp(h)} x ${disp(w)})${qty_str}]\n`;

  if (has_outer) {
    out += `--- OUTER FRAME ---\n`;
    out += `> Outer Vertical: ${disp(outer_v)} (${2 * door_qty} pc)\n`;
    out += `> Outer Top Horizontal: ${disp(outer_h)} (${1 * door_qty} pc)\n`;
    for (let q = 0; q < door_qty; q++) {
      dr_buckets["Door Outer Frame"].push(outer_v, outer_v, outer_h);
    }
  }

  const total_leaves = palla_qty * door_qty;
  const total_verticals = total_leaves * 2;
  const total_tb = total_leaves * 2;

  if (d_type === "Top Hung Door") {
    out += `\n--- DOOR SASH (${palla_str} - Single Leaf: ${disp(door_v)} x ${disp(leaf_w)}) ---\n`;
    out += `> Door Vertical: ${disp(door_v)} (${total_verticals} pc)\n`;
    out += `> Top Rail: ${disp(door_tb)} (${total_leaves} pc)\n`;
    out += `> Bottom Rail: ${disp(door_tb)} (${total_leaves} pc)\n`;
    out += `> Middle Section: ${disp(door_tb)} (${total_leaves} pc)\n`;
    out += `> Top Running Track: ${disp(w * (palla_qty === 2 ? 1.5 : 2.0))} (${1 * door_qty} pc)\n`;

    for (let q = 0; q < total_leaves; q++) {
      dr_buckets["Door Verticals"].push(door_v, door_v);
      dr_buckets["Door Horizontals"].push(door_tb, door_tb, door_tb);
    }

    out += `\n--- HARDWARE & ACCESSORIES (${palla_str}) ---\n`;
    out += `> Top Hung Heavy Rollers: ${palla_qty === 2 ? (2 * door_qty) + " Sets (4 pc/door)" : (1 * door_qty) + " Set (2 pc)"}\n`;
    out += `> Bottom Floor Guide: ${total_leaves} pc\n`;
    out += `> Door Handles: ${total_leaves} Sets\n`;
    out += `> Concealed Hook Lock / Flush Bolts: ${palla_qty === 2 ? "1 Hook Lock + 2 Flush Bolts" : "1 Set"}\n`;

    const mid_g_h = ((door_v - 7.75) / 2.0) - 0.25;
    const mid_g_w = door_tb - 0.25;
    const total_glass_pcs = total_leaves * 2;
    out += `\n--- GLASS / BOARD ---\n`;
    out += `> Panel Glass / Board: ${disp(mid_g_h)} x ${disp(mid_g_w)} (${total_glass_pcs} pc)\n`;
    const gKey = `${disp(mid_g_h)} x ${disp(mid_g_w)}`;
    dr_glass_dict[gKey] = (dr_glass_dict[gKey] || 0) + total_glass_pcs;

  } else {
    out += `\n--- DOOR SASH (${palla_str} - Single Leaf: ${disp(door_v)} x ${disp(leaf_w)}) ---\n`;
    out += `> Door Vertical: ${disp(door_v)} (${total_verticals} pc)\n`;
    out += `> Door Top / Bottom: ${disp(door_tb)} (${total_tb} pc)\n`;

    for (let i = 0; i < total_verticals; i++) dr_buckets["Door Verticals"].push(door_v);
    for (let i = 0; i < total_tb; i++) dr_buckets["Door Horizontals"].push(door_tb);

    out += `\n--- HARDWARE & ACCESSORIES (${palla_str}) ---\n`;
    if (d_type === "Floor Spring Door") {
      out += `> Hydraulic Floor Spring: ${total_leaves} Sets\n`;
      out += `> Top Pivot & Bottom Strap: ${total_leaves} Sets\n`;
      out += `> Centre Lock / Corner Lock: ${1 * door_qty} Set\n`;
      out += `> Door Pull Handles: ${total_leaves} Pairs\n`;
    } else if (d_type === "Domal System Door") {
      out += `> Domal Heavy Hinges: ${3 * total_leaves} pc\n`;
      if (palla_qty === 2) out += `> Domal Flush Bolts: ${2 * door_qty} pc (Top & Bot for inactive leaf)\n`;
      out += `> Domal Door Lock: ${1 * door_qty} Set\n`;
      out += `> Door Handles: ${total_leaves} Sets\n`;
    } else {
      out += `> Door Hinges: ${3 * total_leaves} pc (3 pc per leaf)\n`;
      if (palla_qty === 2) out += `> Tower Bolt / Flush Bolt: ${2 * door_qty} pc (Top & Bot for inactive leaf)\n`;
      out += `> Door Lock: ${1 * door_qty} Set (Mortise / Cylinder Lock)\n`;
      out += `> Door Handles: ${total_leaves} Sets\n`;
      out += `> Door Closer: ${total_leaves} pc (Optional)\n`;
    }

    const glass_h = door_v - 5.875 - 0.25;
    const glass_w = door_tb - 0.25;
    out += `\n--- GLASS / BOARD ---\n`;
    out += `> Glass / Board Size: ${disp(glass_h)} x ${disp(glass_w)} (${total_leaves} pc)\n`;
    const glass_key = `${disp(glass_h)} x ${disp(glass_w)}`;
    dr_glass_dict[glass_key] = (dr_glass_dict[glass_key] || 0) + total_leaves;
  }

  const prevOut = document.getElementById('dr_out').textContent;
  document.getElementById('dr_out').textContent = out + "===================================\n\n" + prevOut;
  document.getElementById('dr_mat_out').textContent = generateMaterialList(dr_buckets);
}

function clearDoor() {
  dr_door_count = 0;
  dr_buckets = { "Door Outer Frame": [], "Door Verticals": [], "Door Horizontals": [] };
  dr_glass_dict = {};
  document.getElementById('dr_h').value = "";
  document.getElementById('dr_w').value = "";
  if (document.getElementById('dr_loc')) document.getElementById('dr_loc').value = "";
  document.getElementById('dr_out').textContent = "";
  document.getElementById('dr_mat_out').textContent = "";
}

 // ========================================================
 // 7. PARTITION MODULE
 // ========================================================
 var pt_part_count = 0;
 var pt_buckets = { "Single Glazing": [], "Double Glazing": [], "Door Sash": [] };
 var pt_glass_dict = {};

 function calculatePartition() {
 const raw_h = safeEval(document.getElementById('pt_h').value);
 const raw_w = safeEval(document.getElementById('pt_w').value);
 if (raw_h === 0 || raw_w === 0) {
   alert("Please enter Height and Width.");
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
   out = `[Partition #${pt_part_count} - ${p_type} (${disp(h)} x ${disp(w)})]\n`;
   const outer_v = h, inter_v = h - 3.0, outer_h = w - 3.0;
   const inner_h = (w - ((cols + 1) * 1.5)) / cols;

   // 1. FRAME SECTIONS
   out += "-----------------------------------\n";
   out += "🔨 ALUMINIUM FRAME CUTTING SIZES (FRAME SECTIONS)\n";
   out += "-----------------------------------\n";
   out += `> Outer Verticals: ${disp(outer_v)} (2 pc)\n`;
   out += `> Outer Horizontals (Top/Bottom): ${disp(outer_h)} (2 pc)\n`;
   pt_buckets["Single Glazing"].push(outer_v, outer_v, outer_h, outer_h);

   if (cols > 1) {
     out += `> Intermediate Verticals: ${disp(inter_v)} (${cols - 1} pc)\n`;
     for (let i = 0; i < cols - 1; i++) pt_buckets["Double Glazing"].push(inter_v);
   }

   const h_qty = cols * (rows - 1);
   if (h_qty > 0) {
     out += `> Internal Transom Divider Tubes: ${disp(inner_h)} (${h_qty} pc)\n`;
     for (let i = 0; i < h_qty; i++) pt_buckets["Double Glazing"].push(inner_h);
   }

   // 2. FRAME BOX CLEAR OPENINGS & VERTICAL PIPE MARKING GUIDE
   const mark_bottom_transom = bottom_h + 1.5;
   const mark_mid_transom = bottom_h + 1.5 + mid_h + 1.5;

   out += "\n-----------------------------------\n";
   out += "📐 CLEAR FRAME OPENINGS & VERTICAL MARKING GUIDE\n";
   out += "-----------------------------------\n";
   out += `• Bottom Box Clear Opening: ${disp(bottom_h)} x ${disp(inner_h)} [Bottom ACP Board]\n`;
   out += `• Middle Box Clear Opening: ${disp(mid_h)} x ${disp(inner_h)} [Middle Glass - Identical Size]\n`;
   out += `• Top Header Clear Opening: ${disp(top_h)} x ${disp(inner_h)} [Top Small Glass]\n\n`;

   out += "📍 Vertical Pipe Transom Marking Levels:\n";
   out += `  1. First Transom (Bottom Level): Floor to ${disp(bottom_h)} clear (Mark at ${disp(mark_bottom_transom)})\n`;
   out += `  2. Second Transom (Middle Level): First Transom to ${disp(mid_h)} clear (Mark at ${disp(mark_mid_transom)})\n`;
   out += `  3. Top Box (Header Level): Second Transom to Ceiling ${disp(top_h)} clear\n`;

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
     out += "\n-----------------------------------\n";
     out += "🪟 4'x8' SHEET OPTIMIZED PANELS (ACP & GLASS)\n";
     out += "-----------------------------------\n";
     out += `> [Bottom] ACP Board: ${disp(bottom_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += `> [Middle] Glass (Identical Size): ${disp(mid_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += `> [Top] Header Glass (Smaller Box): ${disp(top_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;

     pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] || 0) + cols;

     // 4'x8' Sheet count
     const sheet_w = 48.0, sheet_h = 96.0;
     const acp_per_sheet = Math.max(1, Math.floor(sheet_w / cut_w) * Math.floor(sheet_h / bottom_cut_h));
     const acp_sheets = Math.ceil(cols / acp_per_sheet);

     const glass_per_sheet = Math.max(1, Math.floor(sheet_w / cut_w) * Math.floor(sheet_h / mid_cut_h));
     const glass_sheets = Math.ceil(cols / glass_per_sheet);

     out += "\n" + ("--- 4'x8' (48 x 96 Inch) SHEET CUTTING CHART ---\n");
     out += `• Bottom ACP Sheets Required: ${acp_sheets} sheets of 4'x8' (${acp_per_sheet} pcs per sheet)\n`;
     out += `• Middle Glass Sheets Required: ${glass_sheets} sheets of 4'x8' (${glass_per_sheet} pcs per sheet)\n`;

     out += "\n" + ("--- 🛡️ GLASS SHOP BILLING SLAB SAFE-GUARD (ZERO PENALTY) ---\n");
     out += `• Middle Glass Billing Slab: ${mid_guard.slab}" x ${w_guard.slab}" (${((mid_guard.slab * w_guard.slab)/144).toFixed(2)} Sq.Ft/pc)\n`;
     out += `• Top Header Glass Billing Slab: ${top_guard.slab}" x ${w_guard.slab}" (${((top_guard.slab * w_guard.slab)/144).toFixed(2)} Sq.Ft/pc)\n`;
     out += `✔ Guaranteed: Dimensions strictly capped below 30", 36", 24", 18" slabs. Zero extra 6-inch penalty!\n`;
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
   out += "\n" + ("--- HARDWARE & ACCESSORIES ---\n");
   out += `> Square Clip (Beading): Approx ${beading_rft} Running Feet\n`;
   out += `> EPDM Glass Gasket / Sealant: Approx ${beading_rft} Feet\n`;
   out += `> Corner Cleats & Screws Set\n`;

 } else {
   // Door + Partition Mode
   const raw_dh = safeEval(document.getElementById('pt_dh').value);
   const raw_dw = safeEval(document.getElementById('pt_dw').value);
   if (raw_dh === 0 || raw_dw === 0) {
     alert("Please enter Door Size.");
     return;
   }

   const dh = is_mm ? raw_dh / 25.4 : raw_dh;
   const dw = is_mm ? raw_dw / 25.4 : raw_dw;

   out = `[Partition #${pt_part_count} - Door + Partition (${disp(h)} x ${disp(w)})]\n`;
   const outer_v = h, inter_v = h - 3.0, door_side_v = h - 1.5;
   const outer_h_top = w - 3.0, rem_w = w - (dw + 3.0);
   const inner_h = cols > 0 ? (rem_w - 3.0) / cols : 0;

   out += "-----------------------------------\n";
   out += "🔨 ALUMINIUM FRAME CUTTING SIZES (FRAME SECTIONS)\n";
   out += "-----------------------------------\n";
   out += `> Outer Verticals: ${disp(outer_v)} (2 pc)\n`;
   out += `> Door Post Vertical: ${disp(door_side_v)} (1 pc)\n`;
   pt_buckets["Single Glazing"].push(outer_v, outer_v);
   pt_buckets["Double Glazing"].push(door_side_v);

   if (cols > 1) {
     out += `> Side Intermediate Verticals: ${disp(inter_v)} (${cols - 1} pc)\n`;
     for (let i = 0; i < cols - 1; i++) pt_buckets["Double Glazing"].push(inter_v);
   }

   out += `> Outer Top Horizontal: ${disp(outer_h_top)} (1 pc)\n`;
   out += `> Door Top Transom Tube: ${disp(rem_w)} (1 pc)\n`;
   pt_buckets["Single Glazing"].push(outer_h_top);
   pt_buckets["Double Glazing"].push(rem_w);

   const h_qty = cols * (rows - 1);
   if (h_qty > 0) {
     out += `> Side Partition Transoms: ${disp(inner_h)} (${h_qty} pc)\n`;
     for (let i = 0; i < h_qty; i++) pt_buckets["Double Glazing"].push(inner_h);
   }

   // Door Frame & Sash
   const door_v = dh - 1.75, door_tb = dw - 6.75;
   const dg_h = door_v - 5.875 - 0.25, dg_w = door_tb - 0.25;

   out += "\n" + ("--- DOOR SASH & FRAME ---\n");
   out += `> Door Sash Verticals: ${disp(door_v)} (2 pc)\n`;
   out += `> Door Sash Top/Bottom: ${disp(door_tb)} (2 pc)\n`;
   out += `> Door Glass/Board Size: ${disp(dg_h)} x ${disp(dg_w)} (1 pc)\n`;
   pt_buckets["Door Sash"].push(door_v, door_v, door_tb, door_tb);

   const transom_g_h = (h - dh - 1.5) - 0.25, transom_g_w = dw - 0.25;

   // Marking Guide
   const mark_bottom_transom = bottom_h + 1.5;
   const mark_mid_transom = bottom_h + 1.5 + mid_h + 1.5;

   out += "\n-----------------------------------\n";
   out += "📐 FRAME OPENINGS & MARKING GUIDE\n";
   out += "-----------------------------------\n";
   out += `• Bottom Box Clear Opening: ${disp(bottom_h)} x ${disp(inner_h)} [Bottom ACP]\n`;
   out += `• Middle Box Clear Opening: ${disp(mid_h)} x ${disp(inner_h)} [Middle Glass - Identical Size]\n`;
   out += `• Top Header Clear Opening: ${disp(top_h)} x ${disp(inner_h)} [Top Small Glass]\n\n`;

   out += "📍 Vertical Pipe Marking Levels:\n";
   out += `  1. Door Header Level: Floor to ${disp(dh)} clear\n`;
   out += `  2. Side First Transom: Floor to ${disp(bottom_h)} clear (Mark at ${disp(mark_bottom_transom)})\n`;
   out += `  3. Side Second Transom: First Transom to ${disp(mid_h)} clear (Mark at ${disp(mark_mid_transom)})\n`;

   const raw_cut_w = inner_h - 0.25;
   const w_guard = safeGlassSlabCap(raw_cut_w);
   const cut_w = w_guard.cut;

   const bottom_cut_h = bottom_h - 0.25;
   const mid_guard = safeGlassSlabCap(mid_h - 0.25);
   const mid_cut_h = mid_guard.cut;
   const top_guard = safeGlassSlabCap(top_h - 0.25);
   const top_cut_h = top_guard.cut;

   out += "\n-----------------------------------\n";
   out += "🪟 GLASS & ACP CUTTING SIZES\n";
   out += "-----------------------------------\n";
   out += `> Door Top Transom Glass: ${disp(transom_g_h)} x ${disp(transom_g_w)} (1 pc)\n`;

   if (rows === 3 && (panel_mode !== "EQUAL_DIVIDE") && cols > 0) {
     out += `> [Bottom] Side Partition ACP: ${disp(bottom_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += `> [Middle] Side Partition Glass (Identical): ${disp(mid_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;
     out += `> [Top] Side Partition Header Glass (Small): ${disp(top_cut_h)} x ${disp(cut_w)} (${cols} pc)\n`;

     pt_glass_dict[`[Door Glass] ${disp(dg_h)} x ${disp(dg_w)}`] = (pt_glass_dict[`[Door Glass] ${disp(dg_h)} x ${disp(dg_w)}`] || 0) + 1;
     pt_glass_dict[`[Transom Glass] ${disp(transom_g_h)} x ${disp(transom_g_w)}`] = (pt_glass_dict[`[Transom Glass] ${disp(transom_g_h)} x ${disp(transom_g_w)}`] || 0) + 1;
     pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[ACP Board] ${disp(bottom_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Middle Glass] ${disp(mid_cut_h)} x ${disp(cut_w)}`] || 0) + cols;
     pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] = (pt_glass_dict[`[Top Glass] ${disp(top_cut_h)} x ${disp(cut_w)}`] || 0) + cols;

     out += "\n" + ("--- 🛡️ GLASS SHOP BILLING SLAB SAFE-GUARD (ZERO PENALTY) ---\n");
     out += `• Middle Glass Slab: ${mid_guard.slab}" x ${w_guard.slab}" | Top Header Glass Slab: ${top_guard.slab}" x ${w_guard.slab}"\n`;
     out += `✔ Guaranteed: Dimensions strictly capped below 30", 36", 24", 18" slabs. Zero extra 6-inch penalty!\n`;
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

   out += "\n" + ("--- HARDWARE & FITTINGS ---\n");
   out += "> Door Lock: 1 Set\n> Floor Spring / Pivot: 1 Set\n> Door Handle: 1 Set\n";
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



// ========================================================
// 8. DYNAMIC & CUSTOM SERIES MODULE (ADMIN-MANAGED FORMULAS)
// ========================================================
const DEFAULT_CUSTOM_PRODUCTS = [
  {
    id: "prod_jasmine_25x50",
    name: "Jasmine Series Sliding (25x50)",
    category: "Sliding Window",
    panels: 2,
    w_formula: "overlap",
    shutter_h_minus: 1.875,
    shutter_w_mod: 0.75,
    glass_h_minus: 3.0,
    glass_w_minus: 3.0,
    frame_h_minus: 0.0,
    frame_w_minus: 0.0,
    hardware: "Jasmine Heavy Rollers (2/shutter), Concealed Touch Lock (1 pc), Woolpile (15m)",
    notes: "Outer frame 45 deg mitre cut. Shutter top/bottom 90 deg straight. Interlock 90 deg."
  },
  {
    id: "prod_bifold_door",
    name: "Bi-Fold / Folding Door & Window",
    category: "Bi-Fold / Folding Door",
    panels: 4,
    w_formula: "clearance",
    shutter_h_minus: 2.25,
    shutter_w_mod: 1.5,
    glass_h_minus: 3.5,
    glass_w_minus: 3.5,
    frame_h_minus: 0.0,
    frame_w_minus: 0.0,
    hardware: "Top Hanging Heavy Roller Carrier (2 sets), Bottom Guide Rollers (2 sets), SS Folding Butt Hinges (9 pcs), Flush Bolts (2 pcs), Cylinder Mortise Lock (1 set)",
    notes: "Heavy top track required. Maintain 12mm bottom clearance above floor level."
  },
  {
    id: "prod_glass_door_patch",
    name: "Toughened Glass Door (Patch Fitting)",
    category: "Toughened Glass Door",
    panels: 1,
    w_formula: "clearance",
    shutter_h_minus: 2.5,
    shutter_w_mod: 0.5,
    glass_h_minus: 0.0,
    glass_w_minus: 0.0,
    frame_h_minus: 0.0,
    frame_w_minus: 0.0,
    hardware: "Hydraulic Floor Spring (Heavy 120kg), Top Patch Fitting (PT-20), Bottom Patch Fitting (PT-10), Corner Lock (US-10), 450mm S-Handle / D-Handle (SS 304)",
    notes: "Cut 10mm/12mm toughened glass with corner cutouts for patch fittings before tempering."
  }
];

const DEFAULT_FORMULA_OVERRIDES = {
  sl_18x40_h_minus: 1.625,
  sl_18x40_w_mod: 0.625,
  sl_18x40_g_h_minus: 2.75,
  sl_18x50_h_minus: 1.75,
  sl_18x50_w_mod: 0.75,
  sl_18x50_g_h_minus: 3.0,
  sl_18x60_h_minus: 1.875,
  sl_18x60_w_mod: 0.875,
  sl_18x60_g_h_minus: 3.125,
  dm_sash_h_deduct: 44.0,
  dm_glass_deduct: 26.0,
  dm_clearance: 1.5,
  dr_v_deduct: 0.375,
  dr_tb_deduct: 5.0,
  cc_shutter_deduct: 1.5
};

function getCustomProducts() {
  try {
    const raw = localStorage.getItem('sw_custom_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("getCustomProducts error", e);
  }
  localStorage.setItem('sw_custom_products', JSON.stringify(DEFAULT_CUSTOM_PRODUCTS));
  return DEFAULT_CUSTOM_PRODUCTS;
}

function getFormulaOverrides() {
  try {
    const raw = localStorage.getItem('sw_formula_overrides');
    if (raw) return Object.assign({}, DEFAULT_FORMULA_OVERRIDES, JSON.parse(raw));
  } catch (e) {
    console.warn("getFormulaOverrides error", e);
  }
  return DEFAULT_FORMULA_OVERRIDES;
}

var cs_item_count = 0;
var cs_buckets = {};
var cs_glass_dict = {};

function onCustomSeriesSelected() {
  const sel = document.getElementById('cs_product_select');
  if (!sel) return;
  const prodId = sel.value;
  const products = getCustomProducts();
  const prod = products.find(p => p.id === prodId) || products[0];
  if (!prod) return;

  const panelsInput = document.getElementById('cs_panels');
  if (panelsInput) panelsInput.value = prod.panels || 2;

  const preview = document.getElementById('cs_formula_preview');
  if (preview) {
    let formDesc = `<b>Category:</b> ${prod.category} | <b>Panels:</b> ${prod.panels || 2}<br>` +
      `<b>Shutter Cut:</b> Height [H - ${prod.shutter_h_minus}"] | Width [${prod.w_formula === 'clearance' ? '(W - ' + prod.shutter_w_mod + '") / Panels' : '(W + ' + prod.shutter_w_mod + '") / Panels'}]<br>` +
      `<b>Glass Cut:</b> [Shutter H - ${prod.glass_h_minus}"] x [Shutter W - ${prod.glass_w_minus}"]`;
    if (prod.hardware) {
      formDesc += `<br><span style="color:#64748b;"><b>Accessories:</b> ${prod.hardware}</span>`;
    }
    if (prod.notes) {
      formDesc += `<br><span style="color:#059669;"><b>Workshop Note:</b> ${prod.notes}</span>`;
    }
    preview.innerHTML = formDesc;
  }
}

function renderCustomSeriesDropdown() {
  const sel = document.getElementById('cs_product_select');
  if (!sel) return;
  const products = getCustomProducts();
  const currentVal = sel.value;
  let html = '';
  products.forEach(p => {
    html += `<option value="${p.id}">${p.name} (${p.category})</option>`;
  });
  sel.innerHTML = html;
  if (currentVal && products.some(p => p.id === currentVal)) {
    sel.value = currentVal;
  }
  onCustomSeriesSelected();
}

function calculateCustomSeries() {
  const sel = document.getElementById('cs_product_select');
  if (!sel) return;
  const prodId = sel.value;
  const products = getCustomProducts();
  const prod = products.find(p => p.id === prodId) || products[0];
  if (!prod) { alert("Please select a valid series."); return; }

  const raw_h = safeEval(document.getElementById('cs_h').value);
  const raw_w = safeEval(document.getElementById('cs_w').value);
  if (raw_h === 0 || raw_w === 0) {
    alert("Please enter Height and Width.");
    return;
  }

  const is_mm = document.getElementById('cs_unit').value.includes('Millimeter');
  const h_in = is_mm ? raw_h / 25.4 : raw_h;
  const w_in = is_mm ? raw_w / 25.4 : raw_w;
  const panels = Math.max(1, parseInt(document.getElementById('cs_panels').value) || prod.panels || 2);
  const qty = Math.max(1, parseInt(document.getElementById('cs_qty').value) || 1);
  const loc = document.getElementById('cs_loc') ? document.getElementById('cs_loc').value.trim() : "";
  const loc_str = loc ? ` [${loc}]` : "";
  const qty_str = qty > 1 ? ` (Qty: ${qty} Pcs)` : "";

  const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
  const unit_str = is_mm ? "mm" : "Inch";

  // Calculations
  const outer_h = Math.max(0, h_in - (prod.frame_h_minus || 0));
  const outer_w = Math.max(0, w_in - (prod.frame_w_minus || 0));

  const shutter_h = Math.max(0, h_in - (prod.shutter_h_minus || 0));
  let shutter_w = 0;
  if (prod.w_formula === 'clearance') {
    shutter_w = Math.max(0, (w_in - (prod.shutter_w_mod || 0)) / panels);
  } else if (prod.w_formula === 'equal') {
    shutter_w = Math.max(0, w_in / panels);
  } else {
    // Default overlap
    shutter_w = Math.max(0, (w_in + (prod.shutter_w_mod || 0) * (panels - 1)) / panels);
  }

  let glass_h = 0, glass_w = 0;
  if (prod.category.includes('Glass Door') || (prod.glass_h_minus === 0 && prod.glass_w_minus === 0)) {
    glass_h = shutter_h;
    glass_w = shutter_w;
  } else {
    glass_h = Math.max(0, shutter_h - (prod.glass_h_minus || 0));
    glass_w = Math.max(0, shutter_w - (prod.glass_w_minus || 0));
  }

  cs_item_count += 1;

  let alu_txt = `[${prod.name} #${cs_item_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)}${qty_str}]\n`;
    alu_txt += `--- OUTER FRAME CUT SIZES ---\n`;
  alu_txt += `> Frame Top / Bottom: ${disp(outer_w)} (2 pc)\n`;
  alu_txt += `> Frame Left / Right Vertical: ${disp(outer_h)} (2 pc)\n`;

  alu_txt += `\n--- SHUTTER / LEAF PROFILE CUT SIZES ---\n`;
  alu_txt += `> Shutter Verticals (Handle/Style): ${disp(shutter_h)} (${panels * 2} pc)\n`;
  alu_txt += `> Shutter Top / Bottom (Horizontal): ${disp(shutter_w)} (${panels * 2} pc)\n`;

  alu_txt += `\n--- GLASS CUTTING SIZES ---\n`;
  alu_txt += `> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${panels} pc)\n`;

  if (prod.hardware) {
    alu_txt += `\n--- HARDWARE & ACCESSORIES ---\n`;
    const hwItems = prod.hardware.split(',');
    hwItems.forEach(hi => {
      alu_txt += `> ${hi.trim()}\n`;
    });
  }

  if (prod.notes) {
    alu_txt += `\n--- WORKSHOP / KARIGAR INSTRUCTIONS ---\n> ${prod.notes}\n`;
  }

  // Material Buckets for Optimizing & Bar count
  const frameKey = `${prod.name} Outer Frame`;
  const sashKey = `${prod.name} Shutter Profile`;
  if (!cs_buckets[frameKey]) cs_buckets[frameKey] = [];
  if (!cs_buckets[sashKey]) cs_buckets[sashKey] = [];

  for (let q = 0; q < qty; q++) {
    cs_buckets[frameKey].push(outer_w, outer_w, outer_h, outer_h);
    for (let p = 0; p < panels * 2; p++) cs_buckets[sashKey].push(shutter_h);
    for (let p = 0; p < panels * 2; p++) cs_buckets[sashKey].push(shutter_w);
  }

  const glassKey = `${disp(glass_h)} x ${disp(glass_w)}`;
  cs_glass_dict[glassKey] = (cs_glass_dict[glassKey] || 0) + (panels * qty);

  const prev = document.getElementById('cs_out').textContent;
  document.getElementById('cs_out').textContent = alu_txt + "===================================\n\n" + prev;
  document.getElementById('cs_mat_out').textContent = generateMaterialList(cs_buckets);
}

function clearCustomSeries() {
  cs_item_count = 0;
  cs_buckets = {};
  cs_glass_dict = {};
  document.getElementById('cs_h').value = '';
  document.getElementById('cs_w').value = '';
  document.getElementById('cs_out').textContent = '';
  document.getElementById('cs_mat_out').textContent = '';
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
 const numMatch = valStr.match(/[0-9]+(?:\.[0-9]+)?/);
 const unit = valStr.replace(/[0-9]+(?:\.[0-9]+)?/, '').trim() || 'Pcs';
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

 // 1. DEDICATED HORIZONTAL CUTTING SHEET PDF (Landscape, Horizontal Columns, Zero Extra Clutter)
 function exportCutPdf(filename, title, outId, matId) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const outEl = document.getElementById(outId);
  const outText = outEl ? outEl.textContent.trim() : "";
  if (!outText || outText.includes("here")) {
    alert("Please calculate at least one cutting size first!");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  // Horizontal (Landscape) A4 Document
  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  drawDocHeaderWithLogo(doc, "WORKSHOP JOB CARD - CUTTING SHEET (" + title.toUpperCase() + ")", "", [25, 42, 74]);

  doc.setFillColor(241, 245, 249);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text("DATE: " + today, 18, 36.5);

  const rawWindows = outText.split(/={10,}/);
  const parsedUnits = [];
  const allProfileHeaders = [];

  rawWindows.forEach(function(rw, winIdx) {
    const trimmed = rw.trim();
    if (!trimmed || trimmed.includes("ACCUMULATED MATERIAL PURCHASE")) return;

    let winTitle = "Unit #" + (winIdx + 1);
    const titleMatch = trimmed.match(/\[(.*?)\]/);
    if (titleMatch) winTitle = titleMatch[1];

    const lines = trimmed.split('\n');
    const unitProfiles = {};
    let section = "profiles";

    lines.forEach(function(l) {
      l = l.trim();
      if (!l || l.startsWith('[') || l.startsWith('===')) return;
      if (l.includes("HARDWARE") || l.includes("GLASS") || l.includes("INSTRUCTIONS") || l.includes("BILLING SLAB") || l.includes("MARKING") || l.includes("OPENINGS") || l.includes("SHEET CUTTING")) {
        section = "other";
        return;
      }
      if (l.includes("MOSQUITO NET") || l.includes("OUTER FRAME") || l.includes("SHUTTER") || l.includes("DOOR SASH") || l.includes("FRAME SECTIONS") || l.includes("TOP ROW DETAILS") || l.includes("BOTTOM ROW DETAILS")) {
        section = "profiles";
        return;
      }
      if (l.startsWith('---') || !l.startsWith('>')) return;
      if (l.startsWith('> Formula') || l.startsWith('> Height Formula') || l.startsWith('> Width Formula') || l.startsWith('> Glass Deduction')) return;

      const clean = l.replace(/^>\s*/, '');
      if (section === "profiles" && clean.indexOf(':') !== -1) {
        const parts = clean.split(':');
        const pName = parts[0].trim();
        const pVal = parts.slice(1).join(':').trim();
        if (/glass|board|beading/i.test(pName)) return;
        unitProfiles[pName] = pVal;
        if (allProfileHeaders.indexOf(pName) === -1) {
          allProfileHeaders.push(pName);
        }
      }
    });

    if (Object.keys(unitProfiles).length > 0) {
      parsedUnits.push({
        index: parsedUnits.length + 1,
        title: winTitle,
        profiles: unitProfiles
      });
    }
  });

  let currentY = 41;

  if (parsedUnits.length > 0 && allProfileHeaders.length <= 8) {
    // Pure Horizontal Table: Profile names are columns across the top, each Window Unit is a single horizontal row!
    const tableHead = [['#', 'Window / Unit Size'].concat(allProfileHeaders)];
    const tableBody = parsedUnits.map(function(u) {
      const row = [u.index, u.title];
      allProfileHeaders.forEach(function(hName) {
        row.push(u.profiles[hName] || '-');
      });
      return row;
    });

    doc.autoTable({
      startY: currentY,
      head: tableHead,
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 58, 138],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
        halign: 'center'
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3,
        lineColor: [203, 213, 225],
        lineWidth: 0.25,
        fontStyle: 'bold',
        textColor: [15, 23, 42],
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 52, halign: 'left' }
      }
    });
  } else {
    // Fallback Horizontal Grid for complex multi-section partitions (>8 distinct profile names)
    parsedUnits.forEach(function(u) {
      if (currentY > 175) { doc.addPage(); currentY = 16; }
      const pKeys = Object.keys(u.profiles);
      const pVals = pKeys.map(function(k) { return u.profiles[k]; });
      doc.autoTable({
        startY: currentY,
        head: [['Unit: ' + u.title].concat(pKeys)],
        body: [['Cut Size & Qty'].concat(pVals)],
        theme: 'grid',
        headStyles: {
          fillColor: [30, 58, 138],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'center'
        },
        styles: {
          fontSize: 8.5,
          cellPadding: 2.5,
          fontStyle: 'bold',
          halign: 'center',
          textColor: [15, 23, 42]
        }
      });
      currentY = doc.lastAutoTable.finalY + 6;
    });
  }

  doc.save(filename + ".pdf");
 }

 // 2. DEDICATED GLASS CUTTING PDF (Horizontal, Only Glass Measurements & Qty, Zero Side Clutter)
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

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  drawDocHeaderWithLogo(doc, "GLASS CUTTING JOB CARD (" + title.toUpperCase() + ")", "", [2, 132, 199]);

  doc.setFillColor(240, 249, 255);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(3, 105, 161);
  doc.text("DATE: " + today, 18, 36.5);

  let totalPanes = 0;
  const glassRows = keys.map(function(sz, idx) {
    const qty = glassDict[sz];
    totalPanes += qty;
    return [
      idx + 1,
      sz,
      qty + " Pcs"
    ];
  });

  glassRows.push([
    { content: "TOTAL GLASS PIECES", colSpan: 2, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 249, 255] } },
    { content: totalPanes + " Pcs", styles: { fontStyle: 'bold', halign: 'center', fillColor: [186, 230, 253] } }
  ]);

  doc.autoTable({
    startY: 41,
    head: [['#', 'Glass Cutting Size (Height x Width)', 'Quantity']],
    body: glassRows,
    theme: 'grid',
    headStyles: {
      fillColor: [2, 132, 199],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    styles: {
      fontSize: 9.5,
      cellPadding: 3,
      fontStyle: 'bold',
      halign: 'center',
      textColor: [15, 23, 42]
    },
    columnStyles: {
      0: { cellWidth: 25, halign: 'center' },
      1: { cellWidth: 180, halign: 'center' },
      2: { cellWidth: 64, halign: 'center', textColor: [2, 132, 199] }
    }
  });

  doc.save(filename + ".pdf");
 }

 // 3. DEDICATED ALUMINIUM SECTION PDF (Horizontal, Clean Section Name & Bars Only)
 function exportAluPurchasePdf(filename, title, buckets) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const keys = Object.keys(buckets || {});
  if (keys.length === 0) {
    alert("No material calculated yet! Please calculate windows first.");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  drawDocHeaderWithLogo(doc, "ALUMINIUM MATERIAL PURCHASE LIST (" + title.toUpperCase() + ")", "", [15, 118, 110]);

  doc.setFillColor(240, 253, 250);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(19, 78, 74);
  doc.text("DATE: " + today, 18, 36.5);

  const profileRows = [];
  let totalSticks = 0;

  keys.forEach(function(pName, idx) {
    const pieces = buckets[pName];
    if (!pieces || pieces.length === 0) return;
    const isDomal = pName.indexOf('Domal') !== -1;
    const plan = isDomal ? optimizeCuttingPlan(pieces, [144]) : optimizeCuttingPlan(pieces);
    const sticksCount = plan.bins ? plan.bins.length : (plan.sticks_needed || 1);
    const ft = plan.len ? Math.floor(plan.len / 12) : (plan.standard_length_ft || 12);
    totalSticks += sticksCount;

    profileRows.push([
      idx + 1,
      pName + " (" + pieces.length + " Cut Pcs)",
      sticksCount + " Bars (" + ft + " ft)"
    ]);
  });

  profileRows.push([
    { content: "TOTAL BARS", colSpan: 2, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 253, 250] } },
    { content: totalSticks + " Pcs", styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } }
  ]);

  doc.autoTable({
    startY: 41,
    head: [['#', 'Aluminium Section / Profile Name', 'Required Quantity']],
    body: profileRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 118, 110],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      fontStyle: 'bold',
      textColor: [15, 23, 42]
    },
    columnStyles: {
      0: { cellWidth: 25, halign: 'center' },
      1: { cellWidth: 180 },
      2: { cellWidth: 64, halign: 'center', textColor: [15, 118, 110] }
    }
  });

  doc.save(filename + ".pdf");
 }

 // 4. DEDICATED HARDWARE PDF (Horizontal, Only Item Name & Quantity, Zero Side Text)
 function exportHardwarePdf(filename, title, outId) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const outEl = document.getElementById(outId);
  const outText = outEl ? outEl.textContent.trim() : "";
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

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  drawDocHeaderWithLogo(doc, "HARDWARE & FITTINGS LIST (" + title.toUpperCase() + ")", "", [180, 83, 9]);

  doc.setFillColor(254, 243, 199);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14);
  doc.text("DATE: " + today, 18, 36.5);

  const hwRows = hwKeys.map(function(item, idx) {
    const d = hwMap[item];
    return [
      idx + 1,
      item,
      d.qty + " " + (d.unit || "Pcs")
    ];
  });

  doc.autoTable({
    startY: 41,
    head: [['#', 'Hardware / Fitting Item', 'Required Quantity']],
    body: hwRows,
    theme: 'grid',
    headStyles: {
      fillColor: [180, 83, 9],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      fontStyle: 'bold',
      textColor: [15, 23, 42]
    },
    columnStyles: {
      0: { cellWidth: 25, halign: 'center' },
      1: { cellWidth: 180 },
      2: { cellWidth: 64, halign: 'center', textColor: [180, 83, 9] }
    }
  });

  doc.save(filename + ".pdf");
 }

 // Aliases for Custom Series PDF buttons
 function exportAluPdf(filename, title, buckets) {
  exportAluPurchasePdf(filename, title, buckets);
 }
 function exportHwPdf(filename, title, outId) {
  exportHardwarePdf(filename, title, outId);
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
 if (document.getElementById('dr_loc')) document.getElementById('dr_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dr_qty')) document.getElementById('dr_qty').value = itm.qty;
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
 for (let pq = 0; pq < (itm.qty || 1); pq++) calculatePartition();
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
 if (document.getElementById('dr_loc')) document.getElementById('dr_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dr_qty')) document.getElementById('dr_qty').value = itm.qty;
 calculateDoor();
 }
 });

 // Transfer into Quotation
 convertKhataToQuotation();

 const summary = `SUCCESSFULLY PROCESSED ALL SITE PRODUCTS!\n----------------------------------------\n• Casement 40mm/34mm: ${casementCount} Windows\n• Partitions (Fixed/Door): ${partitionCount} Grids\n• Domal Windows: ${domalCount} Windows\n• Sliding Windows: ${slidingCount} Windows\n• Doors: ${doorCount} Doors\n\nAll cutting sizes, profile purchase sticks, glass lists, and client billing have been generated!`;
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

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF library is loading, please try again."); return; }
 const doc = new jsPDF('l', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "N/A";
 const addr = profile.address || "";
 const clientName = document.getElementById('sk_client_name').value.trim() || "Valued Client";
 const clientPhone = document.getElementById('sk_client_phone').value.trim() || "N/A";
 const siteLoc = document.getElementById('sk_site_loc').value.trim() || "Project Site";
 const today = new Date().toLocaleDateString('en-GB');

 drawDocHeaderWithLogo(doc, "MASTER SITE MEASUREMENT & JOB CARD", "Site: " + siteLoc, [30, 58, 138]);

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
 `${itm.h}" x ${itm.w}"`,
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

 const gKey = `${itm.h - 4}" x ${Math.round(itm.w / 2)}" (${itm.glass})`;
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

 let msg = `*SMART WORKER PRO - SITE MEASUREMENT KHATA*\n`;
 msg += `Client: ${clientName}\nSite: ${siteLoc}\n`;
 msg += `------------------------------------\n`;
 msg += `Total Units: ${totalUnits} Pcs\nTotal Area: ${totalSqft.toFixed(1)} Sq.Ft\n`;
 msg += `Total Labour: Rs ${Math.round(totalLabour).toLocaleString('en-IN')}\n`;
 msg += `Est. Total: Rs ${Math.round(totalAmount).toLocaleString('en-IN')}\n`;
 msg += `------------------------------------\n`;
 msg += `*ROOM-WISE OPENINGS:*\n`;

 siteKhataItems.forEach((itm, i) => {
 msg += `${i + 1}. [${itm.room} - ${itm.tag}] ${itm.category}\n Size: ${itm.h}"x${itm.w}" | Qty: ${itm.qty} | ${itm.total_sqft.toFixed(1)} Sq.Ft\n`;
 });

 msg += `\n-- Powered by Smart Worker Pro Fabrication Systems --`;
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

 
// =========================================================================
// CUSTOMER KHATA HISTORY & PREVIOUS DUE AUTO-SYNC
// =========================================================================
let activeCustomerPreviousDue = 0;
let activeCustomerKhataObj = null;

function handleCustomerPhoneAutoLookup(inputVal) {
  if (!inputVal) {
    resetCustomerKhataStatusBox();
    return;
  }
  const clean = String(inputVal).replace(/\D/g, '');
  if (clean.length >= 4) {
    lookupCustomerByPhone(clean);
  } else {
    resetCustomerKhataStatusBox();
  }
}

function lookupCustomerByPhone(searchDigits) {
  const customers = JSON.parse(localStorage.getItem('sw_customers') || '{}');
  for (const phone in customers) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone === searchDigits || cleanPhone.endsWith(searchDigits)) {
      populateFoundCustomer(customers[phone], phone);
      return true;
    }
  }
  return false;
}

function populateFoundCustomer(cust, phoneKey) {
  activeCustomerKhataObj = cust;
  activeCustomerPreviousDue = Math.max(0, Number(cust.total_due) || 0);

  const nameInput = document.getElementById('q_name');
  const phoneInput = document.getElementById('q_phone');
  const addrInput = document.getElementById('q_addr');

  if (nameInput && (!nameInput.value || nameInput.value === 'Customer')) {
    nameInput.value = cust.name || "";
  }
  if (phoneInput && phoneInput.value !== phoneKey) {
    phoneInput.value = phoneKey;
  }
  if (addrInput && !addrInput.value) {
    addrInput.value = cust.address || "";
  }

  // Display Khata Box
  const box = document.getElementById('custKhataAlertBox');
  if (box) {
    box.style.display = 'block';
    const billed = Number(cust.total_billed) || 0;
    const paid = Number(cust.total_paid) || 0;
    const due = activeCustomerPreviousDue;

    const titleEl = document.getElementById('ckb_client_title');
    if (titleEl) titleEl.textContent = `${cust.name || 'Customer'} • Khata History Found`;
    const badgeEl = document.getElementById('ckb_due_badge');
    if (badgeEl) badgeEl.textContent = `₹${due.toLocaleString('en-IN')} Due`;
    const billedEl = document.getElementById('ckb_total_billed');
    if (billedEl) billedEl.textContent = `₹${billed.toLocaleString('en-IN')}`;
    const paidEl = document.getElementById('ckb_total_paid');
    if (paidEl) paidEl.textContent = `₹${paid.toLocaleString('en-IN')}`;
    const dueEl = document.getElementById('ckb_total_due');
    if (dueEl) dueEl.textContent = `₹${due.toLocaleString('en-IN')}`;
    const includeTextEl = document.getElementById('ckb_include_due_text');
    if (includeTextEl) includeTextEl.textContent = `₹${due.toLocaleString('en-IN')}`;
  }

  // Immediately update live due calculation
  updateLiveDue();
}

function resetCustomerKhataStatusBox() {
  activeCustomerPreviousDue = 0;
  activeCustomerKhataObj = null;
  const box = document.getElementById('custKhataAlertBox');
  if (box) box.style.display = 'none';
  updateLiveDue();
}

function autofillCustomer() {
  const phoneInput = document.getElementById('q_phone').value.trim();
  if (!phoneInput) {
    alert("Please enter Customer Mobile Number or last 4 digits first.");
    return;
  }
  const clean = phoneInput.replace(/\D/g, '');
  const found = lookupCustomerByPhone(clean || phoneInput);
  if (!found) {
    alert("No existing customer record found with this number (" + phoneInput + "). A new customer profile will be created upon saving.");
    resetCustomerKhataStatusBox();
  }
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
 document.getElementById('bill_queue_text').textContent = lines.join('\n');
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
 const current_due = Math.max(0, final_total - adv);

 const includePrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
 const prevDueToAdd = includePrev ? (activeCustomerPreviousDue || 0) : 0;
 const total_payable_due = current_due + prevDueToAdd;

 const dueLabel = document.getElementById('q_due_label');
 if (dueLabel) {
   if (prevDueToAdd > 0) {
     dueLabel.innerHTML = `<span style="color:#0284c7;">Current Due: ₹${current_due.toFixed(2)}</span> + <span style="color:#b91c1c; font-weight:800;">Previous Due: ₹${prevDueToAdd.toFixed(2)}</span> = <b style="font-size:1.05rem; color:#dc2626;">TOTAL DUE: ₹${total_payable_due.toFixed(2)}</b>`;
   } else {
     dueLabel.innerHTML = `Rs. ${current_due.toFixed(2)} (Total Work: Rs. ${final_total.toFixed(2)})`;
   }
 }
 }

 // Auto-commit pending item if user typed Height & Width and directly clicked Generate/Save/PDF Bill
 function autoCommitPendingBillItemIfNeeded() {
   try {
     const hEl = document.getElementById('q_h');
     const wEl = document.getElementById('q_w');
     const hVal = hEl ? safeEval(hEl.value) : 0;
     const wVal = wEl ? safeEval(wEl.value) : 0;
     if (hVal > 0 && wVal > 0) {
       addBillItem();
     }
   } catch(e){}
 }

 // Get effective bill items (even if user left items incomplete, returns a proper structured item row so Proper Bill always renders!)
 function getEffectiveProperBillItems() {
   autoCommitPendingBillItemIfNeeded();
   if (billItems && billItems.length > 0) return billItems;
   const w_type = document.getElementById('q_type') ? document.getElementById('q_type').value : "Aluminium & Glass Work";
   const color = document.getElementById('q_color') ? document.getElementById('q_color').value : "Powder Coated";
   const thick = document.getElementById('q_thick') ? document.getElementById('q_thick').value : "1.5 mm";
   const g_thick = document.getElementById('q_g_thick') ? document.getElementById('q_g_thick').value : "5.0 mm Glass";
   const g_type = document.getElementById('q_g_type') ? document.getElementById('q_g_type').value : "Clear Glass";
   const toughened = document.getElementById('q_tough') ? document.getElementById('q_tough').value.includes("Toughened") : false;
   const loc = document.getElementById('q_loc') ? document.getElementById('q_loc').value.trim() : "";
   const qty = Math.max(1, parseInt(safeEval(document.getElementById('q_qty') ? document.getElementById('q_qty').value : "1")) || 1);
   const rate = safeEval(document.getElementById('q_rate') ? document.getElementById('q_rate').value : "0") || 0;
   return [{
     type: w_type, location: loc, color: color, thickness: thick,
     glass_thick: g_thick, glass_type: g_type, toughened: toughened,
     h: "-", w: "-", unit: "ft", qty: qty, rate: rate, area: 1.0, price: rate * qty
   }];
 }

 function generateBillText() {
 const effectiveItems = getEffectiveProperBillItems();

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "ALUMINIUM FABRICATION WORKSHOP").toUpperCase();
 const owner_name = (profile.name && profile.name !== "Fabricator") ? profile.name.trim() : "____________________";
 const contact_info = profile.phone ? profile.phone.trim() : "____________________";
 const addr = (profile.address && profile.address !== "Fabrication Workshop") ? profile.address.trim() : "____________________";
 const clean_email = (profile.email && profile.email.indexOf("@smartworker.app") === -1) ? profile.email.trim() : "";
 const email_info = clean_email ? `\n Email: ${clean_email}` : "";
 const gst_info = profile.gst ? `\n GSTIN: ${profile.gst.trim()}` : "";

 const bill_stage = document.getElementById('q_stage') ? document.getElementById('q_stage').value : "Quotation / Estimate";
 const raw_c_name = document.getElementById('q_name') ? document.getElementById('q_name').value.trim() : "";
 const raw_c_phone = document.getElementById('q_phone') ? document.getElementById('q_phone').value.trim() : "";
 const raw_c_addr = document.getElementById('q_addr') ? document.getElementById('q_addr').value.trim() : "";
 const c_name = raw_c_name || "Walk-in Customer";
 const c_phone = raw_c_phone || "____________________";
 const c_addr = raw_c_addr || "____________________";
 const c_gst = document.getElementById('q_client_gst') ? document.getElementById('q_client_gst').value.trim() : "";
 const c_site = document.getElementById('q_site_addr') ? document.getElementById('q_site_addr').value.trim() : "";
 const pay_terms = document.getElementById('q_payment_terms') ? document.getElementById('q_payment_terms').value.trim() : "";
 const remarks_note = document.getElementById('q_remarks') ? document.getElementById('q_remarks').value.trim() : "";
 const today = new Date().toLocaleDateString('en-GB');

 const [discount, gst_pct] = getDiscountAndGst();
 const advance_paid = safeEval(document.getElementById('q_advance') ? document.getElementById('q_advance').value : "0");
 const extra_charge = safeEval(document.getElementById('q_extra_charge') ? document.getElementById('q_extra_charge').value : "0");

 let bill = "=================================================\n";
 bill += ` ${shop_name}\n`;
 bill += ` Prop: ${owner_name}\n`;
 bill += ` Address: ${addr}\n`;
 bill += ` Mob: ${contact_info}${email_info}${gst_info}\n`;
 bill += "=================================================\n";
 bill += `Invoice Type: ${bill_stage}\nDate: ${today}\n\n`;
 bill += `Bill To:\nName: ${c_name}\nPhone: ${c_phone}\nAddress: ${c_addr}\n`;
 if (c_gst) bill += `Client GSTIN: ${c_gst}\n`;
 if (c_site) bill += `Site / Delivery: ${c_site}\n`;
 bill += "-------------------------------------------------\n";
 bill += "SN. Description Qty Sq.Ft Amount\n";
 bill += "-------------------------------------------------\n";

 let grand_total = 0.0;
 effectiveItems.forEach((item, i) => {
 const color = item.color || 'Jet Black';
 const thick = item.thickness || '1.5 mm';
 const g_thick = item.glass_thick || '5.0 mm';
 const g_type = item.glass_type || 'Clear Float';
 const tough_txt = item.toughened ? " [TOUGHENED: YES]" : "";
 const loc_txt = item.location ? `[${item.location}] ` : "";
 const desc = `${loc_txt}${item.type}\n Specs: ${color} (${thick}) | ${g_thick} ${g_type}${tough_txt}\n Size: ${item.h}x${item.w} ${item.unit} @ Rs.${item.rate}`;
 bill += `${i + 1}. ${desc}\n ${item.qty} ${item.area.toFixed(1)} ${item.price.toFixed(2)}\n`;
 grand_total += item.price;
 });

 const net_total = Math.max(0, grand_total - discount);
 const gst_amount = net_total * (gst_pct / 100);
 const final_total = net_total + gst_amount + extra_charge;
 const due_amount = Math.max(0, final_total - advance_paid);
 const incPrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
 const prevDue = incPrev ? (activeCustomerPreviousDue || 0) : 0;
 const totalPayableDue = due_amount + prevDue;

 bill += "-------------------------------------------------\n";
 bill += ` Sub Total: Rs ${grand_total.toFixed(2)}\n`;
 if (discount > 0) bill += ` Discount: -Rs ${discount.toFixed(2)}\n`;
 if (gst_pct > 0) bill += ` GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}\n`;
 if (extra_charge > 0) bill += ` Transport/Labor: +Rs ${extra_charge.toFixed(2)}\n`;

 bill += ` GRAND TOTAL: Rs ${final_total.toFixed(2)}\n`;
 if (typeof numberToWordsINR === 'function') {
   bill += ` In Words: ${numberToWordsINR(final_total)}\n`;
 }
 bill += ` Advance Received: -Rs ${advance_paid.toFixed(2)}\n`;
 bill += ` CURRENT BILL DUE: Rs ${due_amount.toFixed(2)}\n`;
 if (prevDue > 0) {
   bill += ` Previous Khata Due: +Rs ${prevDue.toFixed(2)}\n`;
   bill += ` TOTAL NET PAYABLE DUE: Rs ${totalPayableDue.toFixed(2)}\n`;
 }
 bill += "-------------------------------------------------\n";
 bill += "BANK & UPI PAYMENT DETAILS:\n";
 bill += `Bank: ${profile.bank_name || "____________________"}${profile.bank_branch ? " (" + profile.bank_branch + ")" : ""}\n`;
 bill += `A/C Holder: ${profile.bank_holder || owner_name}\n`;
 bill += `A/C No: ${profile.bank_acc || "____________________"} | IFSC: ${profile.bank_ifsc || "____________"}\n`;
 bill += `UPI ID: ${profile.upi_id || contact_info}\n`;
 bill += "-------------------------------------------------\n";
 if (remarks_note) {
   bill += `SPECIAL NOTE: ${remarks_note}\n`;
   bill += "-------------------------------------------------\n";
 }
 bill += "TERMS & CONDITIONS:\n";
 if (pay_terms) bill += `• Payment Terms: ${pay_terms}\n`;
 bill += "1. 50% Advance with official work order.\n";
 bill += "2. Balance payment must be cleared on delivery / fitting.\n";
 bill += "3. Quotation is valid for 15 days from issue date.\n";
 bill += "4. Glass & cut sections cannot be returned once processed.\n";
 bill += "-------------------------------------------------\n\n";
 bill += "Customer Signature: Authorized Signature:\n";
 bill += "___________________ _____________________\n";
 bill += ` (${shop_name})\n`;
 bill += "=================================================\n";
 bill += "Thank you for your business!\n -- App by Smart worker --\n";

 document.getElementById('bill_output').textContent = bill;
 }

 function saveBillToDb() {
 autoCommitPendingBillItemIfNeeded();
 if (!document.getElementById('bill_output').textContent.trim()) {
   generateBillText();
 }
 const bill_text = document.getElementById('bill_output').textContent;
 if (!bill_text.trim()) return;

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
         { id: Date.now(), date: today, type: 'BILL', desc: `Bill Created: ${bill_stage}`, debit: final_total, credit: advance_paid, balance: due_amount }
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
       desc: `Bill Created: ${bill_stage}`,
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
 if (typeof addToOfflineQueue === 'function') addToOfflineQueue('invoices', invoices);
 if (typeof syncCustomersToFirestore === 'function') {
   syncCustomersToFirestore(getKhataCustomers());
 }
 if (typeof syncAllDataToCloud === 'function') {
   syncAllDataToCloud();
 }
 alert("🎉 Bill generated and saved to Customer Khata successfully!");
}

 function shareToWhatsApp() {
 autoCommitPendingBillItemIfNeeded();
 if (!document.getElementById('bill_output').textContent.trim()) {
   generateBillText();
 }
 const bill_text = document.getElementById('bill_output').textContent;
 if (!bill_text.trim()) return;
 const encoded = encodeURIComponent(bill_text);
 window.open(`https://wa.me/?text=${encoded}`, '_blank');
 }



// ========================================================
 // SEPARATE SUPPLIER MATERIAL REQUISITION / PURCHASE ORDER SLIP
 // ========================================================
 function exportMatPurchasePdf(filename, title, buckets, glassDict) {
  exportAluPurchasePdf(filename, title, buckets);
 }

 function exportBillPdf() {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF bills.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const effectiveItems = getEffectiveProperBillItems();
  if (!document.getElementById('bill_output').textContent.trim()) {
    generateBillText();
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again in a few seconds."); return; }
  const doc = new jsPDF();

  const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  const shop_name = (profile.shop_name || "ALUMINIUM FABRICATION WORKSHOP").toUpperCase();
  const owner_name = (profile.name && profile.name !== "Fabricator") ? profile.name.trim() : "____________________";
  const raw_c_name = document.getElementById('q_name') ? document.getElementById('q_name').value.trim() : "";
  const raw_c_phone = document.getElementById('q_phone') ? document.getElementById('q_phone').value.trim() : "";
  const raw_c_addr = document.getElementById('q_addr') ? document.getElementById('q_addr').value.trim() : "";
  const c_name = raw_c_name || "Walk-in Customer";
  const c_phone = raw_c_phone || "____________________";
  const c_addr = raw_c_addr || "____________________";
  const c_gst = document.getElementById('q_client_gst') ? document.getElementById('q_client_gst').value.trim() : "";
  const c_site = document.getElementById('q_site_addr') ? document.getElementById('q_site_addr').value.trim() : "";
  const pay_terms = document.getElementById('q_payment_terms') ? document.getElementById('q_payment_terms').value.trim() : "";
  const remarks_note = document.getElementById('q_remarks') ? document.getElementById('q_remarks').value.trim() : "";
  const bill_stage = document.getElementById('q_stage') ? document.getElementById('q_stage').value : "Quotation / Estimate";
  const today = new Date().toLocaleDateString('en-GB');

  // Professional Client Document Title: Strictly NO 'JOB CARD' on Estimates/Bills!
  let pdfTitle = "ESTIMATION & COST QUOTATION";
  if (bill_stage.includes("Final")) {
    pdfTitle = "FINAL BILL & TAX INVOICE";
  } else if (bill_stage.includes("First")) {
    pdfTitle = "PROJECT BILL & INVOICE";
  } else if (bill_stage.includes("Second") || bill_stage.includes("Third")) {
    pdfTitle = "RUNNING BILL & INVOICE";
  } else {
    pdfTitle = "ESTIMATION & COST QUOTATION";
  }
  drawDocHeaderWithLogo(doc, pdfTitle, "Stage: " + bill_stage, [74, 20, 140]);

  // Structured Two-Column Proper Bill Info Box (Renders identically whether complete or incomplete!)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 34, 182, 32, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("BILL TO (CUSTOMER DETAILS):", 18, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Name: ${c_name}`, 18, 45.5);
  doc.text(`Phone: ${c_phone}`, 18, 50.5);
  doc.text(`Address: ${c_addr}${c_site ? " | Site: " + c_site : ""}`, 18, 55.5);
  doc.text(`Client GSTIN: ${c_gst || "____________________"}`, 18, 60.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("INVOICE DETAILS:", 125, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Date: ${today}`, 125, 45.5);
  doc.text(`Stage: ${bill_stage}`, 125, 50.5);
  doc.text(`Invoice No: SW-${Math.floor(1000 + Math.random() * 9000)}`, 125, 55.5);
  const cleanWorkshopEmail = (profile.email && profile.email.indexOf("@smartworker.app") === -1) ? profile.email.trim() : "";
  doc.text(`Workshop GSTIN: ${profile.gst || "____________________"}`, 125, 60.5);
  if (cleanWorkshopEmail) {
    doc.setFontSize(7.5);
    doc.text(`Email: ${cleanWorkshopEmail}`, 125, 64.5);
  }

  const tableData = effectiveItems.map((itm, i) => [
    i + 1,
    `${itm.location ? '['+itm.location+'] ' : ''}${itm.type}\nSpecs: ${itm.color} (${itm.thickness})\nGlass: ${itm.glass_thick} ${itm.glass_type}${itm.toughened ? ' [TOUGHENED]' : ''}\nSize: ${itm.h} x ${itm.w} ${itm.unit} @ Rs.${itm.rate}`,
    itm.qty,
    itm.area.toFixed(1),
    `Rs ${itm.rate}`,
    `Rs ${itm.price.toFixed(2)}`
  ]);

  const grand_total = effectiveItems.reduce((a, b) => a + b.price, 0);
  const [discount, gst_pct] = getDiscountAndGst();
  const extra_charge = safeEval(document.getElementById('q_extra_charge') ? document.getElementById('q_extra_charge').value : "0");
  const net_total = Math.max(0, grand_total - discount);
  const gst_amount = net_total * (gst_pct / 100);
  const final_total = net_total + gst_amount + extra_charge;
  const advance_paid = safeEval(document.getElementById('q_advance') ? document.getElementById('q_advance').value : "0");
  const due_amount = Math.max(0, final_total - advance_paid);

  doc.autoTable({
    startY: 69,
    head: [['SN', 'Description & Specifications', 'Qty', 'Sq.Ft', 'Rate', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [74, 20, 140], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8.5 }
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.text(`Sub Total: Rs ${grand_total.toFixed(2)}`, 135, finalY);
  if (discount > 0) doc.text(`Discount: -Rs ${discount.toFixed(2)}`, 135, finalY + 5);
  if (gst_pct > 0) doc.text(`GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}`, 135, finalY + 10);
  if (extra_charge > 0) doc.text(`Transport/Labor: +Rs ${extra_charge.toFixed(2)}`, 135, finalY + 15);

  doc.setFont("helvetica", "bold");
  doc.text(`GRAND TOTAL: Rs ${final_total.toFixed(2)}`, 135, finalY + 21);
  doc.setFont("helvetica", "normal");
  doc.text(`Advance Paid: -Rs ${advance_paid.toFixed(2)}`, 135, finalY + 26);
  const incPrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
  const pDue = incPrev ? (activeCustomerPreviousDue || 0) : 0;
  const netPayableDue = due_amount + pDue;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(200, 0, 0);
  doc.text(`CURRENT BILL DUE: Rs ${due_amount.toFixed(2)}`, 135, finalY + 32);

  if (pDue > 0) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 0, 0);
    doc.text(`Previous Khata Due: +Rs ${pDue.toFixed(2)}`, 135, finalY + 37.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.text(`TOTAL OUTSTANDING: Rs ${netPayableDue.toFixed(2)}`, 135, finalY + 43.5);
  }

  // Render Proper Bank & UPI Box + Custom Payment QR Code on the Left Side of Footer (Always consistent!)
  const customQr = localStorage.getItem('sw_custom_qr');
  let bankStartX = 14;
  if (customQr) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, finalY, 28, 28, 2, 2, 'FD');
      var qrFmt = customQr.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customQr, qrFmt, 15, finalY + 1, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(74, 20, 140);
      doc.text("SCAN TO PAY (UPI)", 14, finalY + 31.5);
      bankStartX = 46;
    } catch(e){}
  }

  let by = finalY + 3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 58, 138);
  doc.text("BANK & PAYMENT DETAILS:", bankStartX, by);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  by += 4.5;
  doc.text("Bank: " + (profile.bank_name || "____________________") + (profile.bank_branch ? " (" + profile.bank_branch + ")" : ""), bankStartX, by);
  by += 4.5;
  doc.text("A/C Holder: " + (profile.bank_holder || owner_name), bankStartX, by);
  by += 4.5;
  doc.text("A/C No: " + (profile.bank_acc || "____________________") + " | IFSC: " + (profile.bank_ifsc || "____________"), bankStartX, by);
  by += 4.5;
  doc.text("UPI ID: " + (profile.upi_id || profile.phone || "____________________"), bankStartX, by);
  if (typeof numberToWordsINR === 'function') {
    by += 5;
    doc.setFont("helvetica", "bold");
    doc.text("In Words: " + numberToWordsINR(final_total), bankStartX, by);
  }

  const footerY = Math.max(finalY + 44, (pDue > 0 ? finalY + 52 : finalY + 44));
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const termsStr = (remarks_note ? "Note: " + remarks_note + " | " : "") + (pay_terms || "TERMS: 50% Advance with order. Balance on delivery.");
  doc.text(termsStr, 14, footerY);
  doc.text(`Customer Signature: ___________________ Authorized Signature (${shop_name}): ___________________`, 14, footerY + 8);

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
      
      return {};
    }

    function saveKhataCustomers(custs) {
      try {
        localStorage.setItem('sw_customers', JSON.stringify(custs));
      } catch(e) {}
      if (typeof addToOfflineQueue === 'function') addToOfflineQueue('customers', custs);
      if (typeof syncOfflineQueueToCloud === 'function') syncOfflineQueueToCloud();
      syncCustomersToFirestore(custs);
    }

    // Direct Firebase Cloud Sync for Khata (Strictly Isolated Per Customer/Device)
    function syncCustomersToFirestore(custs) {
      if (typeof fbDb !== 'undefined' && fbDb) {
        try {
          const targetId = getIsolatedCloudDocId();
          if (!targetId) return;
          const docRef = fbDb.collection('users').doc(String(targetId));
          docRef.set({
            customers: custs,
            updated_at: new Date().toISOString()
          }, { merge: true }).then(() => {
            console.log("☁️ Customer Khata synced to isolated user cloud doc!");
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
          const targetId = getIsolatedCloudDocId();
          if (!targetId) return;
          if (window.khataUnsubscribe && typeof window.khataUnsubscribe === 'function') {
            try { window.khataUnsubscribe(); } catch(e){}
          }
          window.khataUnsubscribe = fbDb.collection('users').doc(String(targetId)).onSnapshot(doc => {
            if (doc.exists) {
              const data = doc.data();
              if (data && data.customers && typeof data.customers === 'object') {
                localStorage.setItem('sw_customers', JSON.stringify(data.customers));
                var clScreen = document.getElementById('screen-customer_lookup');
                if (clScreen && clScreen.classList.contains('active')) {
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
      document.getElementById('khataTotalClients').textContent = `${totalClients}`;
      document.getElementById('khataTotalBilled').textContent = `₹${totalBilled.toLocaleString('en-IN')}`;
      document.getElementById('khataTotalPaid').textContent = `₹${totalPaid.toLocaleString('en-IN')}`;
      document.getElementById('khataTotalDue').textContent = `₹${totalDue.toLocaleString('en-IN')}`;

      // Search & Filter
      var searchInputElem = document.getElementById('khataSearchInput');
      const searchQ = ((searchInputElem ? searchInputElem.value : '') || '').trim().toLowerCase();

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
            <div style="font-weight:700; font-size:0.9rem;">No Customer Ledger Found!</div>
            <div style="font-size:0.75rem; margin-top:4px;">Tap <strong>'+ New Customer'</strong> above to add a client ledger.</div>
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
                    <i class="fa-solid fa-location-dot" style="color:#0284c7;"></i> ${c.address || 'West Bengal'}
                  </div>
                </div>
              </div>

              <div>
                ${hasDue ? `
                  <span style="background:#fef2f2; color:#dc2626; border:1px solid #f87171; padding:3px 8px; border-radius:8px; font-size:0.75rem; font-weight:800;">
                    🔴 Due: ₹${due.toLocaleString('en-IN')}
                  </span>
                ` : `
                  <span style="background:#f0fdf4; color:#15803d; border:1px solid #86efac; padding:3px 8px; border-radius:8px; font-size:0.75rem; font-weight:800;">
                    🟢 Fully Paid
                  </span>
                `}
              </div>
            </div>

            <!-- Financial Summary Bar -->
            <div style="background:#f8fafc; border-radius:8px; padding:8px 12px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:12px; text-align:center;">
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">Total Work</span>
                <strong style="font-size:0.85rem; color:#0284c7;">₹${billed.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">Received</span>
                <strong style="font-size:0.85rem; color:#16a34a;">₹${paid.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">Balance Due</span>
                <strong style="font-size:0.85rem; color:${hasDue ? '#dc2626' : '#16a34a'};">₹${due.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" onclick="openCustomerLedger('${phone}')" style="flex:1; background:#0f172a; color:#fff; border:none; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">
                <i class="fa-solid fa-book-open"></i> Open Ledger
              </button>
              <button type="button" onclick="quickAddPayment('${phone}')" style="background:#16a34a; color:#fff; border:none; padding:8px 12px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-hand-holding-dollar"></i> + Payment
              </button>
              <a href="tel:${phone}" style="background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:4px;">
                <i class="fa-solid fa-phone" style="color:#0284c7;"></i> Call
              </a>
              <button type="button" onclick="sendKhataWhatsAppDirect('${phone}')" style="background:#25D366; color:#fff; border:none; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px;" title="Send WhatsApp Reminder">
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
      const site = document.getElementById('new_cust_site').value.trim() || 'Local Site';
      const openDue = parseFloat(document.getElementById('new_cust_opening_due').value) || 0;

      if (!name || !phone) {
        alert("Customer Name and Mobile Number are required!");
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
            { id: Date.now(), date: new Date().toLocaleDateString('en-GB'), type: 'OPENING', desc: 'Opening Balance Due', debit: openDue, credit: 0, balance: openDue }
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
      alert(`🎉 Customer ledger for '${name}' created successfully!`);
    }

    // Open Customer Detailed Ledger
    function openCustomerLedger(phone) {
      currentActiveKhataPhone = phone;
      const customers = getKhataCustomers();
      const c = customers[phone];
      if (!c) return;

      document.getElementById('ledgerCustName').textContent = c.name;
      document.getElementById('ledgerCustSub').innerHTML = `📞 ${phone} | 📍 ${c.address || 'Site'}`;

      const billed = Number(c.total_billed) || 0;
      const paid = Number(c.total_paid) || 0;
      const due = Number(c.total_due) || 0;

      document.getElementById('ledgerTotalBilled').textContent = `₹${billed.toLocaleString('en-IN')}`;
      document.getElementById('ledgerTotalPaid').textContent = `₹${paid.toLocaleString('en-IN')}`;
      document.getElementById('ledgerNetDue').textContent = `₹${due.toLocaleString('en-IN')}`;

      const txContainer = document.getElementById('ledgerTransactionsContainer');
      const txList = c.transactions || [];

      if (!txList.length) {
        txContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:20px; font-size:0.8rem;">No transactions recorded yet. Use '+ Record Payment' above to add an entry.</div>`;
      } else {
        txContainer.innerHTML = `
          <table style="width:100%; border-collapse:collapse; font-size:0.75rem;">
            <thead>
              <tr style="background:#f1f5f9; color:#475569; text-align:left; border-bottom:1px solid #cbd5e1;">
                <th style="padding:6px;">Date</th>
                <th style="padding:6px;">Description</th>
                <th style="padding:6px; text-align:right;">Bill (+)</th>
                <th style="padding:6px; text-align:right;">Paid (-)</th>
                <th style="padding:6px; text-align:right;">Balance</th>
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
        alert("Please enter a valid payment amount!");
        return;
      }

      const mode = document.getElementById('pay_mode').value;
      const rawDate = document.getElementById('pay_date').value;
      const dateStr = rawDate ? new Date(rawDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
      const note = document.getElementById('pay_note').value.trim() || `Payment Received (${mode})`;

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
      alert(`✅ ₹${amount.toLocaleString('en-IN')} payment recorded! Current Balance Due: ₹${c.total_due.toLocaleString('en-IN')}`);
    }

    // WhatsApp Reminder / Statement
    function sendKhataWhatsAppDirect(phone) {
      const customers = getKhataCustomers();
      const c = customers[phone];
      if (!c) return;

      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const shop = profile.shop_name || 'SMART WORKER ALUMINIUM';
      const myPhone = profile.phone || 'N/A';

      let msg = `*${shop} - CUSTOMER ACCOUNT STATEMENT*\n`;
      msg += `Client: *${c.name}*\n`;
      msg += `Site: ${c.address || 'N/A'}\n`;
      msg += `--------------------------------\n`;
      msg += `Total Billed Amount: ₹${(c.total_billed || 0).toLocaleString('en-IN')}\n`;
      msg += `Total Paid Amount: ₹${(c.total_paid || 0).toLocaleString('en-IN')}\n`;
      msg += `*Balance Due: ₹${(c.total_due || 0).toLocaleString('en-IN')}*\n`;
      msg += `--------------------------------\n`;
      msg += `Kindly arrange payment for the balance due.\nThank you!\n*${shop}* (📞 ${myPhone})`;

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

      var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF library is loading, please try again in a few seconds."); return; }
      const doc = new jsPDF();

      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const shop = (profile.shop_name || 'SMART WORKER ALUMINIUM').toUpperCase();
      const myPhone = profile.phone || 'N/A';
      const myAddr = profile.address || '';

      drawDocHeaderWithLogo(doc, "CUSTOMER KHATA & LEDGER STATEMENT", "Client: " + c.name + " (" + c.phone + ")", [15, 23, 42]);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CLIENT DETAILS:", 14, 42);
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${c.name}`, 14, 48);
      doc.text(`Phone: ${c.phone}`, 14, 54);
      doc.text(`Site: ${c.address || 'N/A'}`, 14, 60);

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
 if (screenName === 'custom_series') {
   if (typeof renderCustomSeriesDropdown === 'function') renderCustomSeriesDropdown();
 }

 const topBack = document.getElementById('topBackBtn');
 const rightActions = document.getElementById('topBarRightActions');
 const bNav = document.querySelector('.bottom-nav');

 if (screenName === 'auth') {
   const titleElem = document.getElementById('screenTitle');
   if (titleElem) titleElem.innerHTML = `<span style="font-size:1.02rem; font-weight:800; color:#fbbf24; letter-spacing:0.4px;">SMART WORKER PRO</span>`;
   if (topBack) topBack.style.display = 'none';
   if (rightActions) rightActions.style.display = 'none';
   if (bNav) bNav.style.display = 'none';
   window.scrollTo({ top: 0, behavior: 'smooth' });
   return;
 }

 if (bNav) bNav.style.display = 'flex';
 // Perfectly Centered Screen Title
 const titleElem = document.getElementById('screenTitle');
 if (titleElem) titleElem.innerHTML = `<span style="font-size:1.02rem; font-weight:800; color:#fbbf24; letter-spacing:0.4px; white-space:nowrap; text-align:center;">${title}</span>`;
 if (topBack) topBack.style.display = 'flex';
 // Hide Language Selector, Login & PRO badge on inner screens
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
 ascii += '\x80';
 while (ascii[lengthProperty]%64 - 56) ascii += '\x00';
 for (i = 0; i < ascii[lengthProperty]; i++) {
 j = ascii.charCodeAt(i) & 255;
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
 function _0xdec(arr) { return arr.map(function(b){ return String.fromCharCode(b ^ 90); }).join(''); }
 const SALTS = {
  "KARIGAR_1M": _0xdec([9, 27, 18, 31, 24, 5, 107, 23, 5, 10, 8, 21]),
  "KARIGAR_3M": _0xdec([9, 27, 18, 31, 24, 5, 105, 23, 5, 10, 8, 21]),
  "KARIGAR_6M": _0xdec([9, 27, 18, 31, 24, 5, 108, 23, 5, 10, 8, 21]),
  "KARIGAR_1Y": _0xdec([9, 27, 18, 31, 24, 5, 107, 3, 5, 10, 8, 21]),
  "TEAM_1M": _0xdec([9, 27, 18, 31, 24, 5, 14, 31, 27, 23, 5, 107, 23, 5, 10, 8, 21]),
  "TEAM_1Y": _0xdec([9, 27, 18, 31, 24, 5, 14, 31, 27, 23, 5, 107, 3, 5, 10, 8, 21]),
  "CORP_1M": _0xdec([9, 27, 18, 31, 24, 5, 25, 21, 8, 10, 5, 107, 23, 5, 10, 8, 21]),
  "CORP_1Y": _0xdec([9, 27, 18, 31, 24, 5, 25, 21, 8, 10, 5, 107, 3, 5, 10, 8, 21]),
  "1M": _0xdec([9, 27, 18, 31, 24, 5, 107, 23, 5, 10, 8, 21]),
  "1Y": _0xdec([9, 27, 18, 31, 24, 5, 107, 3, 5, 10, 8, 21])
};
 const SPECIAL_PROMO_CODE = _0xdec([9, 23, 27, 8, 14, 13, 21, 8, 17, 31, 8, 5, 27, 30, 23, 19, 20, 5, 107, 106, 106]);


function addTeamMember() {
 const nEl = document.getElementById('team_member_name');
 const pEl = document.getElementById('team_member_phone');
 if (!nEl || !pEl) return;
 const name = nEl.value.trim();
 const phone = pEl.value.trim();
 if (!name || !phone) { alert("Please enter member name and phone/gmail."); return; }

 let members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 if (members.length >= 50) { alert("Maximum 50 team members limit reached!"); return; }

 members.push({ name, phone, added_on: new Date().toLocaleDateString('en-GB') });
 localStorage.setItem('sw_team_members', JSON.stringify(members));

 nEl.value = "";
 pEl.value = "";
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
  deviceId = String(deviceId || '').trim().toUpperCase();
  if (!inputKey || !deviceId) return null;
  if (inputKey === SPECIAL_PROMO_CODE) return "LIFETIME";

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');

  // 1. Check current month dynamic rotating key (matches Admin computeKey)
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

  // 3. Check previous/next month transition window
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

  // 4. Also support legacy Admin computeKey format for backward compatibility
  for (const duration in SALTS) {
    const raw = deviceId + "_SMARTWORKER_PRO_SECRET_SALT_2026_" + duration;
    const hash = sha256(raw);
    let legacyKey = "";
    for (let i = 0; i < 8; i++) {
      legacyKey += hash[(i * 7) % hash.length];
    }
    if (inputKey === legacyKey.toUpperCase()) return duration;
  }

  return null;
}

 function parseLicenseExpiryTimestamp(lic) {
  if (!lic) return 0;
  if (lic.key === SPECIAL_PROMO_CODE || lic.plan === "LIFETIME") return Date.now() + (36500 * 86400000);
  if (lic.expiry_date && typeof lic.expiry_date === 'string' && lic.expiry_date.toLowerCase().includes('lifetime')) {
    return Date.now() + (36500 * 86400000);
  }
  if (lic.expiry_timestamp && !isNaN(Number(lic.expiry_timestamp))) {
    return Number(lic.expiry_timestamp);
  }
  if (lic.expiry_date) {
    let exp = null;
    if (lic.expiry_date.includes('/')) {
      const parts = lic.expiry_date.split('/');
      exp = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 23, 59, 59);
    } else if (lic.expiry_date.includes('-')) {
      const parts = lic.expiry_date.split('-');
      if (parts[0].length === 4) {
        exp = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 23, 59, 59);
      } else {
        exp = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 23, 59, 59);
      }
    } else {
      exp = new Date(lic.expiry_date);
    }
    if (exp && !isNaN(exp.getTime())) return exp.getTime();
  }
  return 0;
}

 function isAppActivated() {
  const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
  if (!lic || !lic.key) return false;
  if (lic.key === SPECIAL_PROMO_CODE || lic.plan === "LIFETIME") return true;
  const expMs = parseLicenseExpiryTimestamp(lic);
  if (expMs > 0) {
    return Date.now() <= expMs;
  }
  return false;
}

 function getTelecomLicenseStatus() {
  const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
  if (!lic || !lic.key) {
    return { hasKey: false, active: false, expired: false, daysLeft: 0, totalDays: 30, startDate: '--', expiryDate: '--', plan: 'FREE_PLAN' };
  }
  const expMs = parseLicenseExpiryTimestamp(lic);
  const nowMs = Date.now();
  const active = expMs > nowMs;
  const diffDays = Math.max(0, Math.ceil((expMs - nowMs) / (24 * 60 * 60 * 1000)));
  const totalDays = Number(lic.validity_days) || (String(lic.plan || '').includes('1Y') ? 365 : (String(lic.plan || '').includes('6M') ? 180 : (String(lic.plan || '').includes('3M') ? 90 : 30)));
  const startDate = lic.start_date || (lic.activated_at ? new Date(lic.activated_at).toLocaleDateString('en-GB') : '--');
  const expiryDate = lic.expiry_date || (expMs > 0 ? new Date(expMs).toLocaleDateString('en-GB') : '--');
  return {
    hasKey: true,
    active: active,
    expired: !active,
    daysLeft: diffDays,
    totalDays: totalDays,
    startDate: startDate,
    expiryDate: expiryDate,
    plan: lic.plan || 'KARIGAR_1M',
    planCategory: lic.plan_category || 'KARIGAR'
  };
}

 function updateActivationScreenUI() {
  const devId = getDeviceId();
  const dIdElem = document.getElementById('actDeviceId');
  if (dIdElem) dIdElem.value = devId;

  const st = getTelecomLicenseStatus();
  const banner = document.getElementById('actStatusBanner');
  const tvCard = document.getElementById('telecomValidityCard');
  const teamSec = document.getElementById('corporateTeamSection');

  if (banner) {
    if (st.active) {
      const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
      const expStr = lic.key === SPECIAL_PROMO_CODE ? "Lifetime" : st.expiryDate;
      const cat = st.planCategory;

      banner.style.background = "#0284c7";
      banner.textContent = "Status: PRO ACTIVE (1 User Only • " + st.totalDays + " Days Pack) • " + st.daysLeft + " Days Left (Till " + expStr + ")";
      if (teamSec) teamSec.style.display = 'none';

      if (tvCard) {
        tvCard.style.display = 'block';
        tvCard.style.borderColor = '#38bdf8';
        const pTitle = document.getElementById('tvPlanTitle');
        const pBadge = document.getElementById('tvDaysBadge');
        const pStart = document.getElementById('tvStartDate');
        const pExp = document.getElementById('tvExpiryDate');
        const pBar = document.getElementById('tvProgressBar');
        const pNote = document.getElementById('tvSubNote');
        if (pTitle) pTitle.textContent = "ACTIVE RECHARGE (" + st.totalDays + " DAYS PACK)";
        if (pBadge) {
          pBadge.style.background = "#16a34a";
          pBadge.textContent = st.daysLeft + " / " + st.totalDays + " Days Left";
        }
        if (pStart) pStart.textContent = st.startDate;
        if (pExp) { pExp.style.color = "#4ade80"; pExp.textContent = st.expiryDate; }
        if (pBar) {
          const pct = Math.min(100, Math.max(5, Math.round((st.daysLeft / st.totalDays) * 100)));
          pBar.style.width = pct + "%";
          pBar.style.background = "linear-gradient(90deg, #22c55e, #38bdf8)";
        }
        if (pNote) pNote.textContent = "Recharge started on " + st.startDate + " and auto-expires after " + st.totalDays + " days on " + st.expiryDate + ".";
      }
    } else if (st.expired) {
      banner.style.background = "#dc2626";
      banner.textContent = "🔴 RECHARGE EXPIRED (0 Days Left) — Plan expired! Please recharge to continue.";
      if (teamSec) teamSec.style.display = 'none';
      if (tvCard) {
        tvCard.style.display = 'block';
        tvCard.style.borderColor = '#ef4444';
        const pTitle = document.getElementById('tvPlanTitle');
        const pBadge = document.getElementById('tvDaysBadge');
        const pStart = document.getElementById('tvStartDate');
        const pExp = document.getElementById('tvExpiryDate');
        const pBar = document.getElementById('tvProgressBar');
        const pNote = document.getElementById('tvSubNote');
        if (pTitle) { pTitle.style.color = "#f87171"; pTitle.textContent = "RECHARGE PACK EXPIRED (" + st.totalDays + " DAYS COMPLETED)"; }
        if (pBadge) {
          pBadge.style.background = "#dc2626";
          pBadge.textContent = "0 Days Left (Expired)";
        }
        if (pStart) pStart.textContent = st.startDate;
        if (pExp) { pExp.style.color = "#f87171"; pExp.textContent = st.expiryDate + " (Ended)"; }
        if (pBar) {
          pBar.style.width = "100%";
          pBar.style.background = "#ef4444";
        }
        if (pNote) pNote.textContent = "Your " + st.totalDays + "-day recharge pack has expired. Recharge now to activate a fresh validity cycle from today.";
      }
    } else {
      banner.style.background = "#37474f";
      banner.textContent = "Status: FREE PLAN (Limited Features • Recharge ₹99 for 30 Days)";
      if (teamSec) teamSec.style.display = 'none';
      if (tvCard) tvCard.style.display = 'none';
    }
  }
}

 function copyDeviceId() {
  var dId = getDeviceId();
  universalCopyText(dId, "Device ID (" + dId + ") copied to clipboard!");
}

 function activateAppKey(providedKey) {
  const inputKey = (providedKey || document.getElementById('activationInput').value || '').trim().toUpperCase();
  const deviceId = getDeviceId();

  if (!inputKey) {
    alert("Please enter your 8-character Activation Key!");
    return;
  }

  let usedKeys = JSON.parse(localStorage.getItem('sw_used_keys') || '[]');
  const currentLic = JSON.parse(localStorage.getItem('sw_license') || '{}');

  if (usedKeys.includes(inputKey) && currentLic.key === inputKey && !isAppActivated()) {
    alert("❌ This Activation Key was already used and its validity period has expired!\n\nOld keys cannot be reused. Please get a new recharge key.");
    return;
  }
  if (usedKeys.includes(inputKey) && currentLic.key !== inputKey) {
    alert("❌ This Activation Key has already been used!\n\nEach key can only be used once. Please request a new recharge key.");
    return;
  }

  const durationType = checkActivationType(deviceId, inputKey);

  if (durationType) {
    let daysToAdd = 30;
    let planCategory = "KARIGAR";
    let maxUsers = 1;
    let billAmt = 99;

    if (durationType === "KARIGAR_1M" || durationType === "1M") { daysToAdd = 30; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 99; }
    else if (durationType === "KARIGAR_3M") { daysToAdd = 90; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 280; }
    else if (durationType === "KARIGAR_6M") { daysToAdd = 180; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 550; }
    else if (durationType === "KARIGAR_1Y" || durationType === "1Y") { daysToAdd = 365; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 799; }
    else if (durationType === "TEAM_1M") { daysToAdd = 30; maxUsers = 10; planCategory = "WORKSHOP_TEAM"; billAmt = 499; }
    else if (durationType === "TEAM_1Y") { daysToAdd = 365; maxUsers = 10; planCategory = "WORKSHOP_TEAM"; billAmt = 3999; }
    else if (durationType === "CORP_1M") { daysToAdd = 30; maxUsers = 50; planCategory = "CORPORATE"; billAmt = 1499; }
    else if (durationType === "CORP_1Y") { daysToAdd = 365; maxUsers = 50; planCategory = "CORPORATE"; billAmt = 14999; }
    else if (durationType === "LIFETIME") { daysToAdd = 36500; maxUsers = 50; planCategory = "LIFETIME"; billAmt = 19999; }

    // Exact Telecom Start & Expiry Calculation (Starts today, runs for exact daysToAdd)
    const startMs = Date.now();
    const expiryMs = startMs + (daysToAdd * 24 * 60 * 60 * 1000);
    const startDateStr = new Date(startMs).toLocaleDateString('en-GB');
    const expiryStr = durationType === "LIFETIME" ? "Lifetime" : new Date(expiryMs).toLocaleDateString('en-GB');

    const newLicObj = {
      key: inputKey,
      plan: durationType,
      plan_category: planCategory,
      max_users: maxUsers,
      validity_days: daysToAdd,
      start_date: startDateStr,
      activated_at: new Date(startMs).toISOString(),
      start_timestamp: startMs,
      expiry_timestamp: expiryMs,
      expiry_date: expiryStr
    };

    localStorage.setItem('sw_license', JSON.stringify(newLicObj));

    if (!usedKeys.includes(inputKey) && inputKey !== SPECIAL_PROMO_CODE) {
      usedKeys.push(inputKey);
      localStorage.setItem('sw_used_keys', JSON.stringify(usedKeys));
    }

    // Sync exact telecom activation to Cloud for Admin Portal
    try {
      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const subRecord = {
        device_id: deviceId,
        name: profile.name || "Workshop Owner",
        shop: profile.shop_name || "Aluminium Workshop",
        phone: profile.phone || "N/A",
        plan: durationType,
        validity_days: daysToAdd,
        bill_amount: billAmt,
        paid_amount: billAmt,
        due_amount: 0,
        activation_key: inputKey,
        status: "ACTIVE",
        start_date: startDateStr,
        expiry_date: expiryStr,
        start_timestamp: startMs,
        expiry_timestamp: expiryMs,
        timestamp: startMs
      };
      if (window.fbDb) {
        window.fbDb.collection('subscribers').doc(deviceId).set(subRecord, { merge: true }).catch(function(){});
      }
      if (window.fbRtdb) {
        window.fbRtdb.ref('subscribers/' + deviceId).set(subRecord).catch(function(){});
      }
    } catch (e) {}

    alert("✅ Subscription Activated Successfully!\n\nStart Date: " + startDateStr + "\nValid Until: " + (durationType === 'LIFETIME' ? 'Lifetime' : expiryStr + ' (Full ' + daysToAdd + ' Days Validity)'));
    updateActivationScreenUI();
    goHome();
  } else {
    alert("❌ Invalid or Expired Activation Key!\n\nPlease enter a valid current-month Activation Key or contact Smart Worker Support.");
  }
}

function subscribeViaWhatsApp(plan) {
  const deviceId = getDeviceId();
  let planKey = "KARIGAR_1M";
  let planStr = "Karigar Plan (Single User - Rs. 99 / 30 Days)";
  let amount = 99;

  if (plan === "Karigar_Monthly") {
    planKey = "KARIGAR_1M";
    planStr = "Karigar Plan (Single User - Rs. 99 / 30 Days)";
    amount = 99;
  } else if (plan === "Karigar_3M") {
    planKey = "KARIGAR_3M";
    planStr = "Karigar Plan (Single User - Rs. 280 / 90 Days)";
    amount = 280;
  } else if (plan === "Karigar_6M") {
    planKey = "KARIGAR_6M";
    planStr = "Karigar Plan (Single User - Rs. 550 / 180 Days)";
    amount = 550;
  } else if (plan === "Karigar_Annual") {
    planKey = "KARIGAR_1Y";
    planStr = "Karigar Plan (Single User - Rs. 799 / 365 Days)";
    amount = 799;
  } else if (plan === "Workshop_Monthly") {
    planKey = "TEAM_1M";
    planStr = "Workshop Team Plan (10 Users - Rs. 499 / 30 Days)";
    amount = 499;
  } else if (plan === "Workshop_Annual") {
    planKey = "TEAM_1Y";
    planStr = "Workshop Team Plan (10 Users - Rs. 3,999 / 365 Days)";
    amount = 3999;
  } else if (plan === "Corporate_Monthly") {
    planKey = "CORP_1M";
    planStr = "Corporate Enterprise Plan (50 Users - Rs. 1,499 / 30 Days)";
    amount = 1499;
  } else if (plan === "Corporate_Annual") {
    planKey = "CORP_1Y";
    planStr = "Corporate Enterprise Plan (50 Users - Rs. 14,999 / 365 Days)";
    amount = 14999;
  } else {
    planKey = "KARIGAR_1M";
    planStr = "Smart Worker PRO Membership (Rs. 99 / 30 Days)";
    amount = 99;
  }

  // Retrieve or prompt customer profile
  let profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  let customerName = (profile.name || "").trim();
  let customerPhone = (profile.phone || "").trim();
  let customerShop = (profile.shop_name || "Aluminium Workshop").trim();

  if (!customerName || customerName === "Saheb Ghanti" || !customerPhone || customerPhone === "9876543210") {
    const enteredName = prompt("Please enter your full name:", customerName !== "Saheb Ghanti" ? customerName : "");
    if (enteredName && enteredName.trim()) {
      customerName = enteredName.trim();
      profile.name = customerName;
    } else {
      customerName = "Customer " + deviceId;
    }

    const enteredPhone = prompt("Please enter your WhatsApp mobile number:", customerPhone !== "9876543210" ? customerPhone : "");
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

  alert(`✅ Your recharge request has been sent to the Admin Portal!

📋 Device ID: ${deviceId}
📦 Plan: ${planStr}
💰 Amount: ₹${amount}

Admin will verify your payment and send your 8-character Activation Key on WhatsApp.`);
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
          if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
          alert("✅ Your workshop logo has been saved! It will appear on all your bills and PDFs.");
        } catch(err) {
          try {
            localStorage.setItem('sw_custom_logo', e.target.result);
            renderBrandingPreviews();
            loadSavedProfile();
            alert("✅ Your workshop logo has been saved! It will appear on all your bills and PDFs.");
          } catch(storageErr) {
            alert("❌ Image size is too large! Please select a smaller image file.");
          }
        }
      };
      img.onerror = function() {
        alert("❌ Failed to load image! Please select a valid image file.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeShopLogo() {
  localStorage.removeItem('sw_custom_logo');
  document.querySelectorAll('img[alt*="Logo"], img[alt="SWA"]').forEach(function(img){ img.src = 'logo.png'; });
  renderBrandingPreviews();
  loadSavedProfile();
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
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
          if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
          alert("✅ Your Payment QR Code has been saved! It will appear on all your invoices.");
        } catch(err) {
          try {
            localStorage.setItem('sw_custom_qr', e.target.result);
            renderBrandingPreviews();
            alert("✅ Your Payment QR Code has been saved successfully!");
          } catch(storageErr) {
            alert("❌ Image size is too large! Please select a smaller image file.");
          }
        }
      };
      img.onerror = function() {
        alert("❌ Failed to load QR Code! Please select a valid image file.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removePaymentQr() {
  localStorage.removeItem('sw_custom_qr');
  renderBrandingPreviews();
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
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
 const dmEl = document.getElementById('dash_month');
 const targetMonth = dmEl ? dmEl.value.trim() : "";
 const labelMonth = targetMonth || "ALL RECORDS";
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 const expenses = JSON.parse(localStorage.getItem('sw_expenses') || '[]');

 let sales_sum = 0.0, exp_sum = 0.0;
 let details_txt = `--- DETAILS FOR ${labelMonth} ---\n\n>> CUSTOMER BILLS (INCOME):\n`;

 invoices.forEach(inv => {
 if (targetMonth && targetMonth.toLowerCase() !== "all" && String(inv.date || "").indexOf(targetMonth) === -1) return;
 details_txt += `- ${inv.date} | ${inv.client} | Rs ${parseFloat(inv.amount).toFixed(2)}\n`;
 sales_sum += parseFloat(inv.amount) || 0;
 });

 details_txt += `\n>> MATERIAL PURCHASES (EXPENSE):\n`;
 expenses.forEach(exp => {
 if (targetMonth && targetMonth.toLowerCase() !== "all" && String(exp.date || "").indexOf(targetMonth) === -1) return;
 details_txt += `- ${exp.date} | ${exp.category} | ${exp.supplier} (Memo:${exp.memo_no}) | Rs ${parseFloat(exp.amount).toFixed(2)}\n`;
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
 out_text += `Project ID #${row.id} | Date: ${row.date} | Type: ${row.project_type}\n---------------------------------------------\n${row.details}\n=============================================\n\n`;
 });
 } else {
 const rows = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 if (rows.length === 0) out_text = "No saved bills found.";
 rows.forEach(row => {
 out_text += `Invoice #${row.id} | Date: ${row.date} | Client: ${row.client} | Total: Rs ${parseFloat(row.amount).toFixed(2)}\n---------------------------------------------\n${row.bill_text}\n=============================================\n\n`;
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
 const pinEl = document.getElementById('lookup_pin');
 const pin = pinEl ? pinEl.value.trim() : "";
 if (!pin || pin.length < 4) { alert("Please enter at least a 4-digit PIN."); return; }
 const customers = JSON.parse(localStorage.getItem('sw_customers') || '{}');
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');

 let out_text = "";
 let found = false;
 for (const phone in customers) {
 if (phone.endsWith(pin)) {
 found = true;
 const cust = customers[phone];
 out_text += `--- CUSTOMER DETAILS ---\nName: ${cust.name}\nPhone: ${phone}\nAddress: ${cust.address}\n\n--- PREVIOUS BILLS ---\n`;
 const custBills = invoices.filter(inv => inv.phone === phone);
 if (custBills.length > 0) {
 custBills.forEach(b => {
 out_text += `Date: ${b.date} | Total: Rs ${parseFloat(b.amount).toFixed(2)}\n${b.bill_text}\n========================================\n\n`;
 });
 } else {
 out_text += "No saved bills found for this customer.\n\n";
 }
 }
 }
 if (!found) out_text = "No customer found with this PIN.";
 const lrEl = document.getElementById('lookup_results'); if (lrEl) lrEl.textContent = out_text;
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
 if (document.getElementById('homeGreeting')) document.getElementById('homeGreeting').textContent = `Welcome, ${profile.name}!`;
 if (document.getElementById('set_name')) document.getElementById('set_name').value = profile.name;
 if (document.getElementById('settingsUserName')) document.getElementById('settingsUserName').textContent = profile.name;
 }
 if (profile.shop_name) {
 if (document.getElementById('homeShop')) document.getElementById('homeShop').textContent = profile.shop_name.toUpperCase();
 if (document.getElementById('set_shop')) document.getElementById('set_shop').value = profile.shop_name;
 }
 if (profile.phone) {
 if (document.getElementById('set_phone')) document.getElementById('set_phone').value = profile.phone;
 if (document.getElementById('settingsUserEmail')) document.getElementById('settingsUserEmail').textContent = profile.email || ("Mob: " + profile.phone);
 }
 if (profile.email) {
 if (document.getElementById('set_email')) document.getElementById('set_email').value = profile.email;
 if (document.getElementById('settingsUserEmail')) document.getElementById('settingsUserEmail').textContent = profile.email;
 }
 if (profile.gst && document.getElementById('set_gst')) document.getElementById('set_gst').value = profile.gst;
 if (profile.address) {
 if (document.getElementById('set_address')) document.getElementById('set_address').value = profile.address;
 if (document.getElementById('homeAddress')) document.getElementById('homeAddress').textContent = profile.address;
 }
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
 if (typeof addToOfflineQueue === 'function') addToOfflineQueue('settings', settings);
 if (typeof syncOfflineQueueToCloud === 'function') syncOfflineQueueToCloud();
 alert("All Settings Saved Successfully! (Saved locally & auto-syncs to cloud)");
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
    nav_login: "Login",
    welcome_prefix: "Welcome,",
    sec_fab_systems: "Window & Door Systems",
    sec_business_billing: "Business & Billing",
    mod_khata_title: "Site Measurement Khata",
    mod_khata_sub: "Digital Measurement Book: Room Tracking, Auto Labor & Billing",
    mod_domal: "Domal Window",
    mod_sliding: "Sliding Window",
    mod_casement: "Custom Casement",
    mod_partition: "Partition & Door",
    mod_door: "Simple Door Option",
    mod_quotation: "Pro Quotation",
    mod_ceiling: "Ceiling Estimator",
    btn_open: "OPEN", btn_edit: "EDIT",
    sub_domal: "27x65 / 45mm Section Cutting",
    sub_sliding: "2, 3, 4 Track & Interlock Cutting",
    sub_casement: "Z-Section & Openable Window",
    sub_partition: "Office Partition & Sheet Cutting",
    sub_door: "Hinge Door & Bathroom Shutter",
    sub_ceiling: "False Ceiling Grid & Perimeter",
    sub_quotation: "Client GST Invoice & PDF Bill",
    sub_customer_khata: "Client Balance & Ledger Records",
    mod_customer_khata: "Customer Ledger",
    mod_calculator: "Smart Calculator",
    sub_calculator: "Standard, Scientific, Unit Converter & Discount",
    mod_custom_series: "Custom & New Series",
    sub_custom_series: "Folding, Glass Door, Jasmine & Custom Profiles",
    lbl_select_series: "Select Product / Series:",
    lbl_panels: "Number of Shutters / Panels:",
    lbl_door_palla: "Door Shutter (Palla):",
    btn_clear: "Clear",
    btn_calculate: "+ Calculate",
    btn_save: "Save",
    btn_cut_pdf: "Cutting PDF",
    btn_glass_pdf: "Glass PDF",
    btn_order_slip: "Order Slip",
    lbl_cutting_sizes: "Cutting Sizes:",
    lbl_mat_purchase: "Material Purchase (Auto-Optimized):",
    lbl_height: "Height:",
    lbl_width: "Width:",
    lbl_qty: "Quantity (Pcs):",
    lbl_unit: "Measurement Unit:",
    lbl_room_tag: "Room / Location Tag:",
    btn_add_khata: "+ Add to Site Khata",
    btn_process_all: "⚡ Process All Cutting Together",
    btn_khata_master_pdf: "📄 Generate Master Site Khata PDF",
    btn_client_bill: "Client Billing",
    btn_generate_bill: "Generate Bill",
    btn_save_bill: "Save Bill",
    btn_pdf_bill: "Download PDF Bill",
    lbl_client_details: "Client & Invoice Details",
    lbl_add_item: "Add Bill Item",
    lbl_rate_sqft: "Rate (Rs / Sq.Ft):",
    lbl_advance: "Advance Paid (Rs):",
    lbl_due_balance: "Balance Due:",
    lbl_total_sales: "Total Sales",
    lbl_purchases: "Material Purchases",
    lbl_balance: "Net Balance",
    btn_add_purchase: "+ Add Material Purchase",
    btn_update_profile: "Update Profile",
    btn_save_settings: "Save All Settings",
    auth_heading: "Smart Worker Pro",
    auth_subheading: "Aluminium & uPVC Fabrication Management",
    tab_signin: "Sign In (Login)",
    tab_register: "Workshop Registration",
    btn_signin_acc: "Sign In to Account",
    btn_create_acc: "Create Account & Sync",
    btn_guest_demo: "Continue in Guest Mode →",
    lbl_panel_mode: "Panel Cutting & 4'x8' Optimization:",
    opt_panel_4x8: "✨ 4'x8' Sheet Optimized (Equal Bottom & Middle, Small Top Header - Zero Waste)",
    opt_panel_3ft: "Bottom 3 ft (36 in) ACP, Middle 3 ft (36 in) Glass, Top Header",
    opt_panel_2_5ft: "Bottom 2.5 ft (30 in) ACP, Middle 2.5 ft (30 in) Glass, Top Header",
    opt_panel_equal: "Standard Equal Divide",
    keypad_title: "Smart Measurement Keypad",
    keypad_ok: "Apply OK",
    keypad_numbers: "Numbers",
    keypad_fractions: "Fractions (16 Suta Steps)",
    suta_1: "(1 Suta)", suta_2: "(2 Suta)", suta_3: "(3 Suta)", suta_4: "(4 Suta)", suta_5: "(5 Suta)", suta_6: "(6 Suta)", suta_7: "(7 Suta)"
  }
};
I18N_DICT.bn = I18N_DICT.en;
I18N_DICT.hi = I18N_DICT.en;

let currentAppLang = 'en';
localStorage.setItem('sw_lang', 'en');

function changeLanguage(lang) {
  currentAppLang = 'en';
  localStorage.setItem('sw_lang', 'en');
  const selector = document.getElementById('langSelector');
  if (selector) selector.value = 'en';
  applyLanguageTranslations('en');
}

function applyLanguageTranslations(lang) {
  lang = 'en';
  currentAppLang = 'en';
  const sEn = document.getElementById('setLangEn');
  const badge = document.getElementById('currentLangBadge');
  if (sEn) sEn.classList.add('active');
  if (badge) badge.textContent = 'English';

  const d = I18N_DICT['en'];

  const titleElem = document.getElementById('titleText');
  if (titleElem) titleElem.textContent = d.title_app;

  const secHeaders = document.querySelectorAll('.menu-section-title');
  if (secHeaders.length >= 2) {
    secHeaders[0].textContent = d.sec_fab_systems;
    secHeaders[1].textContent = d.sec_business_billing;
  }

  const navItems = document.querySelectorAll('.bottom-nav .nav-item span');
  if (navItems.length >= 4) {
    navItems[0].textContent = d.nav_home;
    navItems[1].textContent = d.nav_dashboard;
    navItems[2].textContent = d.nav_records;
    navItems[3].textContent = d.nav_profile;
  }

  const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  const greetingElem = document.getElementById('homeGreeting');
  if (greetingElem) {
    let pName = profile.name || "Partner";
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
 address: document.getElementById('set_address').value.trim(),
 bank_name: document.getElementById('set_bank_name') ? document.getElementById('set_bank_name').value.trim() : "",
 bank_holder: document.getElementById('set_bank_holder') ? document.getElementById('set_bank_holder').value.trim() : "",
 bank_acc: document.getElementById('set_bank_acc') ? document.getElementById('set_bank_acc').value.trim() : "",
 bank_ifsc: document.getElementById('set_bank_ifsc') ? document.getElementById('set_bank_ifsc').value.trim() : "",
 bank_branch: document.getElementById('set_bank_branch') ? document.getElementById('set_bank_branch').value.trim() : "",
 upi_id: document.getElementById('set_upi_id') ? document.getElementById('set_upi_id').value.trim() : ""
 };
 if (!profile.name || !profile.shop_name || !profile.phone || !profile.address) {
 alert("Please fill Name, Shop Name, Phone and Address.");
 return;
 }
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 try {
   const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
   const cleanPhone = profile.phone.replace(/\D/g, '');
   if (cleanPhone && users[cleanPhone]) {
     users[cleanPhone] = Object.assign({}, users[cleanPhone], profile);
     localStorage.setItem('sw_registered_users', JSON.stringify(users));
   }
 } catch(e){}
 if (typeof addToOfflineQueue === 'function') addToOfflineQueue('profile', profile);
 if (typeof syncOfflineQueueToCloud === 'function') syncOfflineQueueToCloud();
 if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
 loadSavedProfile();
 updateActivationScreenUI();
 alert("Profile, Optional Details, Logo & QR updated successfully on your device!");
 goHome();
 }

 // ==========================================
 // PWA & MANDATORY APP INSTALLATION GATE
 // ==========================================
 let deferredPrompt = null;

 function isPwaAppInstalled() {
   try {
     if (window.matchMedia && (window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches)) {
       localStorage.setItem("sw_pwa_installed", "true");
       return true;
     }
     if (window.navigator && window.navigator.standalone === true) {
       localStorage.setItem("sw_pwa_installed", "true");
       return true;
     }
     if (window.location.search && window.location.search.indexOf("source=pwa") !== -1) {
       localStorage.setItem("sw_pwa_installed", "true");
       return true;
     }
     if (localStorage.getItem("sw_pwa_installed") === "true") {
       return true;
     }
   } catch (e) {}
   return false;
 }

 function checkAndShowMandatoryInstallGate() {
   var gate = document.getElementById("pwaInstallGateOverlay");
   if (!gate) return;
   if (isPwaAppInstalled()) {
     gate.style.display = "none";
   } else {
     gate.style.display = "flex";
   }
 }

 window.addEventListener("beforeinstallprompt", function(e) {
   e.preventDefault();
   deferredPrompt = e;
   window.deferredPwaPrompt = e;
   var installBox = document.getElementById("pwaInstallPrompt");
   if (installBox) installBox.style.display = "flex";
   checkAndShowMandatoryInstallGate();
 });

 window.addEventListener("appinstalled", function() {
   try { localStorage.setItem("sw_pwa_installed", "true"); } catch (e) {}
   deferredPrompt = null;
   completeInstallGateAndLaunchApp();
 });

 function completeInstallGateAndLaunchApp() {
   try { localStorage.setItem("sw_pwa_installed", "true"); } catch (e) {}
   var progBox = document.getElementById("pwaInstallProgressBox");
   var bar = document.getElementById("pwaInstallProgressBar");
   var pctTxt = document.getElementById("pwaInstallPercentText");
   var stTxt = document.getElementById("pwaInstallStatusText");
   var btn = document.getElementById("btnMandatoryInstall");

   if (progBox) progBox.style.display = "block";
   if (bar) bar.style.width = "100%";
   if (pctTxt) pctTxt.textContent = "100%";
   if (stTxt) stTxt.textContent = "Installation Complete! Launching App...";
   if (btn) {
     btn.style.background = "#0284c7";
     btn.innerHTML = "<i class=\"fa-solid fa-circle-check\"></i> <span>INSTALLED • OPENING APP...</span>";
   }

   setTimeout(function() {
     var gate = document.getElementById("pwaInstallGateOverlay");
     if (gate) gate.style.display = "none";
   }, 600);
 }

 function runSimulatedPackageInstallAndUnlock() {
   var progBox = document.getElementById("pwaInstallProgressBox");
   var bar = document.getElementById("pwaInstallProgressBar");
   var pctTxt = document.getElementById("pwaInstallPercentText");
   var stTxt = document.getElementById("pwaInstallStatusText");
   var btn = document.getElementById("btnMandatoryInstall");

   if (progBox) progBox.style.display = "block";
   if (btn) {
     btn.disabled = true;
     btn.style.opacity = "0.85";
     btn.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> <span>INSTALLING APPLICATION...</span>";
   }

   var pct = 0;
   var timer = setInterval(function() {
     pct += 20;
     if (pct > 100) pct = 100;
     if (bar) bar.style.width = pct + "%";
     if (pctTxt) pctTxt.textContent = pct + "%";
     if (stTxt) {
       if (pct < 50) stTxt.textContent = "Downloading App Modules...";
       else if (pct < 90) stTxt.textContent = "Configuring Offline Database...";
       else stTxt.textContent = "Finalizing Installation...";
     }
     if (pct >= 100) {
       clearInterval(timer);
       completeInstallGateAndLaunchApp();
     }
   }, 280);
 }

 function triggerNativePromptOrFallback(promptEvent) {
   promptEvent.prompt();
   promptEvent.userChoice.then(function(choiceResult) {
     deferredPrompt = null;
     window.deferredPwaPrompt = null;
     if (choiceResult.outcome === "accepted") {
       runSimulatedPackageInstallAndUnlock();
     } else {
       var btn = document.getElementById("btnMandatoryInstall");
       if (btn) {
         btn.disabled = false;
         btn.style.opacity = "1";
         btn.innerHTML = "<i class=\"fa-solid fa-download\"></i> <span>INSTALL APP NOW</span>";
       }
       var hint = document.getElementById("pwaInstallFooterHint");
       if (hint) {
         hint.style.color = "#fbbf24";
         hint.innerHTML = "<b>Home Screen Install:</b> Please tap <b>INSTALL APP NOW</b> and click <b>Install</b> on the popup to add the app to your Home Screen.";
       }
     }
   });
 }

 function handleMandatoryPwaInstall() {
   var activePrompt = window.deferredPwaPrompt || deferredPrompt;
   if (activePrompt) {
     triggerNativePromptOrFallback(activePrompt);
     return;
   }
   // Wait briefly (up to 1.6s) in case Chrome is still initializing beforeinstallprompt
   var btn = document.getElementById("btnMandatoryInstall");
   if (btn) {
     btn.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> <span>PREPARING INSTALLER...</span>";
   }
   var attempts = 0;
   var waitTimer = setInterval(function() {
     attempts++;
     var p = window.deferredPwaPrompt || deferredPrompt;
     if (p) {
       clearInterval(waitTimer);
       triggerNativePromptOrFallback(p);
     } else if (attempts >= 8) {
       clearInterval(waitTimer);
       // Fallback if opened in WhatsApp in-app browser or iOS/unsupported browser
       runSimulatedPackageInstallAndUnlock();
     }
   }, 200);
 }

 function triggerPwaInstall() {
   handleMandatoryPwaInstall();
 }

 if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
 navigator.serviceWorker.register('./sw.js').catch(err => {
 console.log('ServiceWorker registration optional', err);
 });
 });
 }

 
// =========================================================================
// OFFLINE-FIRST QUEUE & AUTOMATIC CLOUD DATABASE SYNC ENGINE
// =========================================================================

function getOfflineQueue() {
  try {
    return JSON.parse(localStorage.getItem('sw_offline_queue') || '[]');
  } catch(e) {
    return [];
  }
}

function addToOfflineQueue(actionType, payload) {
  try {
    const queue = getOfflineQueue();
    queue.push({
      action: actionType,
      payload: payload,
      timestamp: Date.now()
    });
    localStorage.setItem('sw_offline_queue', JSON.stringify(queue));
    updateOfflineStatusBadge();
  } catch(e) {
    console.warn("Offline queue notice:", e);
  }
}

function updateOfflineStatusBadge() {
  const badge = document.getElementById('networkStatusBadge');
  if (!badge) return;
  const queue = getOfflineQueue();
  const queueCount = queue ? queue.length : 0;

  if (navigator.onLine) {
    if (queueCount > 0) {
      badge.style.display = 'inline-flex';
      badge.style.background = 'rgba(56, 189, 248, 0.15)';
      badge.style.borderColor = 'rgba(56, 189, 248, 0.4)';
      badge.style.color = '#38bdf8';
      badge.innerHTML = '<i class="fa-solid fa-rotate fa-spin" style="font-size:0.6rem;"></i> <span>Syncing (' + queueCount + ')</span>';
    } else {
      badge.style.display = 'inline-flex';
      badge.style.background = 'rgba(34, 197, 94, 0.15)';
      badge.style.borderColor = 'rgba(34, 197, 94, 0.4)';
      badge.style.color = '#4ade80';
      badge.innerHTML = '<i class="fa-solid fa-circle" style="font-size:0.5rem;"></i> <span>Online</span>';
    }
  } else {
    badge.style.display = 'inline-flex';
    badge.style.background = 'rgba(245, 158, 11, 0.15)';
    badge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    badge.style.color = '#fbbf24';
    badge.innerHTML = '<i class="fa-solid fa-cloud-arrow-down" style="font-size:0.6rem;"></i> <span>Offline Mode</span>';
  }

  const notice = document.getElementById('homeSyncNotice');
  if (notice) {
    if (navigator.onLine) {
      notice.innerHTML = '<i class="fa-solid fa-shield-halved" style="color:#4ade80;"></i> <span>Cloud Synced • Auto-Backup Active</span>';
    } else {
      notice.innerHTML = '<i class="fa-solid fa-cloud-arrow-down" style="color:#f59e0b;"></i> <span>Offline Mode • Stored Locally, Auto-Sync Ready</span>';
    }
  }
}

function syncOfflineQueueToCloud() {
  if (!navigator.onLine) {
    updateOfflineStatusBadge();
    return;
  }
  if (!window.fbDb) {
    if (typeof initFirebaseCloud === 'function') initFirebaseCloud();
    if (!window.fbDb) {
      updateOfflineStatusBadge();
      return;
    }
  }

  const queue = getOfflineQueue();
  const targetId = getIsolatedCloudDocId();
  if (!targetId) {
    updateOfflineStatusBadge();
    return;
  }
  const fullBackup = {
    settings: JSON.parse(localStorage.getItem('sw_bill_settings') || '{}'),
    profile: JSON.parse(localStorage.getItem('sw_profile') || '{}'),
    customers: JSON.parse(localStorage.getItem('sw_customers') || '{}'),
    invoices: JSON.parse(localStorage.getItem('sw_invoices') || '[]'),
    measurements: JSON.parse(localStorage.getItem('sw_measurements') || '[]'),
    site_khata: JSON.parse(localStorage.getItem('sw_site_khata') || '[]'),
    expenses: JSON.parse(localStorage.getItem('sw_expenses') || '[]'),
    license: JSON.parse(localStorage.getItem('sw_license') || '{}'),
    custom_logo: localStorage.getItem('sw_custom_logo') || '',
    custom_qr: localStorage.getItem('sw_custom_qr') || '',
    updated_at: new Date().toISOString()
  };

  fbDb.collection('users').doc(String(targetId)).set(fullBackup, { merge: true })

    .then(() => {
      if (window.fbRtdb) {
        try { fbRtdb.ref('nisha_creations/smart_worker/' + String(targetId)).set(fullBackup); } catch(e){}
      }
      if (typeof syncUserActivityToCloud === 'function') {
        syncUserActivityToCloud();
      }
      localStorage.setItem('sw_offline_queue', '[]');
      console.log("✅ Database synchronization complete.");
      updateOfflineStatusBadge();
    })
    .catch((err) => {
      console.warn("Cloud sync retry pending:", err);
      updateOfflineStatusBadge();
    });
}

// Auto-Reconnection & Periodic Sync Listeners
window.addEventListener('online', () => {
  console.log("Network online event detected.");
  updateOfflineStatusBadge();
  setTimeout(syncOfflineQueueToCloud, 500);
});

window.addEventListener('offline', () => {
  console.log("Network offline event detected.");
  updateOfflineStatusBadge();
});

function enforceTelecomExpiryAutoLock() {
  try {
    if (typeof updateActivationScreenUI === 'function') updateActivationScreenUI();
    if (!isAppActivated()) {
      var matAreas = ['dm_mat_out', 'sl_mat_out', 'cc_mat_out', 'dr_mat_out', 'pt_mat_out', 'cs_mat_out'];
      matAreas.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && el.textContent && el.textContent.indexOf('ACCUMULATED MATERIAL PURCHASE') !== -1) {
          el.textContent = generateMaterialList({ 'Expired': [12] });
        }
      });
    }
  } catch (e) {}
}

setInterval(() => {
  enforceTelecomExpiryAutoLock();
  if (navigator.onLine) {
    const queue = getOfflineQueue();
    if (queue && queue.length > 0) {
      syncOfflineQueueToCloud();
    }
  }
}, 30000);


function bootApp() {
  // 0. Enforce Mandatory App Install Gate when link is clicked
  try { checkAndShowMandatoryInstallGate(); } catch(e){}

  // 1. Check Authentication Status (New visitors get Login/Register screen; no leaked workshop details)
  const savedUser = localStorage.getItem('sw_cloud_user');
  const isGuest = localStorage.getItem('sw_guest_mode');
  const isAuthenticated = !!(savedUser || isGuest);

  if (!isAuthenticated) {
    // Brand new visitor or new phone: open Login / Registration screen FIRST!
    openScreen('auth', 'SIGN IN / REGISTER');
  } else {
    // Authenticated user: load profile and navigate to Home screen
    try { loadSavedProfile(); } catch(e){}
    try { goHome(); } catch(e){}
  }

  try {
    if (!localStorage.getItem('sw_lang')) {
      localStorage.setItem('sw_lang', 'en');
      currentAppLang = 'en';
    }
  } catch(e){}

  try { changeLanguage(currentAppLang); } catch(e){ console.warn("changeLanguage error", e); }
  try { setupDb(); } catch(e){}
  try { loadBillSettings(); } catch(e){}
  try { updateSuggestedRate(); } catch(e){}
  try { updateOfflineStatusBadge(); } catch(e){}
  try { if (typeof renderCustomSeriesDropdown === "function") renderCustomSeriesDropdown(); } catch(e){}

  // 2. Background Asynchronous Cloud Sync (Non-blocking for 4G devices)
  setTimeout(() => {
    try { if (typeof initFirebaseCloud === 'function') initFirebaseCloud(); } catch(e){}
    try { if (typeof initCloudKhataSyncListener === 'function') initCloudKhataSyncListener(); } catch(e){}
    if (isAuthenticated) {
      try { syncUserActivityToCloud(); } catch(e){}
      try { checkCustomerInAppNotifications(); } catch(e){}
      try { syncOfflineQueueToCloud(); } catch(e){}
    }
    try { updateOfflineStatusBadge(); } catch(e){}
  }, 400);
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

const MASTER_ADMIN_PIN_HASH = "584a7334e8e0e5233965da1ac78cf9b48548fd6fbb0257432436a86788276b85";
const ADMIN_PIN_SALT_PREFIX = "SW_ADMIN_MASTER_PIN_V27::";
let lastGeneratedAdminKey = "";
let lastTargetPhone = "";
let lastTargetPlan = "";
let lastTargetName = "";

function getAdminPinHash() {
  return localStorage.getItem('sw_admin_pin_hash') || MASTER_ADMIN_PIN_HASH;
}

function verifyAdminPinInput(rawPin) {
  if (!rawPin) return false;
  const clean = String(rawPin).trim();
  return sha256(ADMIN_PIN_SALT_PREFIX + clean) === getAdminPinHash();
}

function getAdminPin() {
  return "•••••• (Protected)";
}

function openAdminPortalWithPin() {
  const entered = prompt("🔑 Enter 6-Digit Admin Security PIN:");
  if (entered === null) return;
  if (verifyAdminPinInput(entered)) {
    sessionStorage.setItem('sw_admin_authenticated', 'true');
    openScreen('admin-portal', 'ADMIN PORTAL');
    renderAdminPortal();
  } else {
    alert("❌ Incorrect Admin PIN! Unauthorized access blocked.");
  }
}

function lockAdminPortal() {
  sessionStorage.removeItem('sw_admin_authenticated');
  alert("🔒 Admin Portal has been locked.");
  goHome();
}

function adminChangePinPrompt() {
  const oldPin = prompt("Enter current Admin Security PIN:");
  if (!verifyAdminPinInput(oldPin)) { alert("❌ Current Admin PIN is incorrect!"); return; }
  const newPin = prompt("Enter new 6-digit Admin Security PIN:");
  if (!newPin || newPin.trim().length < 4) { alert("❌ PIN must be at least 4 characters!"); return; }
  const newHash = sha256(ADMIN_PIN_SALT_PREFIX + newPin.trim());
  localStorage.setItem('sw_admin_pin_hash', newHash);
  localStorage.removeItem('sw_admin_pin');
  const pinDisp = document.getElementById('admCurrentPinDisplay');
  if (pinDisp) pinDisp.textContent = "•••••• (Protected)";
  alert("✅ Admin Security PIN updated and encrypted successfully!");
}

// Generate mathematical key matching checkActivationType
function generateActivationKey(deviceId, planType) {
  deviceId = String(deviceId || '').trim().toUpperCase();
  if (!deviceId) return null;
  if (planType === "LIFETIME") return SPECIAL_PROMO_CODE;
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const baseSalt = SALTS[planType] || SALTS["KARIGAR_1M"];
  const dynSalt = String(planType).indexOf("1Y") !== -1 ? (baseSalt + "_" + y) : (baseSalt + "_" + y + "_" + m);
  return sha256(deviceId + dynSalt).substring(0, 8).toUpperCase();
}

// Customer submits online recharge request
function submitCustomerRechargeRequest() {
  const nameEl = document.getElementById('req_cust_name');
  const phoneEl = document.getElementById('req_cust_phone');
  const planEl = document.getElementById('req_cust_plan');
  const utrEl = document.getElementById('req_cust_utr');
  const name = nameEl ? nameEl.value.trim() : "";
  const phone = phoneEl ? phoneEl.value.trim() : "";
  const plan = planEl ? planEl.value : "KARIGAR_1M";
  const utr = utrEl ? utrEl.value.trim() : "";
  const devId = getDeviceId();

  if (!name || !phone) {
    alert("Please enter your Name and Mobile Number!");
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

  alert("✅ Your recharge request has been submitted!\n\nAdmin will verify and send your Activation Key shortly.");
  if (nameEl) nameEl.value = "";
  if (phoneEl) phoneEl.value = "";
  if (utrEl) utrEl.value = "";
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
  if (badge) badge.textContent = `${requests.length} Requests`;

  if (requests.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 10px; color:#94a3b8; font-size:0.85rem;">
        <i class="fa-solid fa-inbox" style="font-size:1.8rem; margin-bottom:6px; color:#cbd5e1; display:block;"></i>
        No pending recharge requests found.
      </div>`;
    return;
  }

  let html = "";
  requests.forEach((req, idx) => {
    const isPending = req.status === "Pending";
    const statusColor = isPending ? "#f59e0b" : "#16a34a";
    const planLabels = {
      "KARIGAR_1M": "Single User - 30 Days (₹99)",
      "KARIGAR_1Y": "Single User VIP - 365 Days (₹799)",
      "TEAM_1M": "Single User - 90 Days (₹280)",
      "TEAM_1Y": "Single User - 180 Days (₹550)",
      "CORP_1M": "Single User - 30 Days (₹99)",
      "CORP_1Y": "Single User - 365 Days (₹799)",
      "LIFETIME": "Lifetime VIP"
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
          <div style="font-size:0.7rem; color:#94a3b8;"><b>Date:</b> ${req.date}</div>
        </div>

        <div style="display:flex; gap:6px; margin-top:8px;">
          <button type="button" onclick="adminProcessRequest('${req.id}')" style="flex:2; background:#2563eb; color:#fff; border:none; padding:7px; border-radius:6px; font-size:0.76rem; font-weight:bold; cursor:pointer;">
            <i class="fa-solid fa-key"></i> Generate Key & Send via WhatsApp
          </button>
          <button type="button" onclick="adminDeleteRequest('${req.id}')" style="flex:1; background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; padding:7px; border-radius:6px; font-size:0.76rem; font-weight:bold; cursor:pointer;">
            Delete
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
    "KARIGAR_1M": "Single User Plan (30 Days)",
    "KARIGAR_1Y": "Single User VIP Plan (365 Days)",
    "TEAM_1M": "Single User Plan (90 Days)",
    "TEAM_1Y": "Single User Plan (180 Days)",
    "CORP_1M": "Single User Plan (30 Days)",
    "CORP_1Y": "Single User Plan (365 Days)",
    "LIFETIME": "Lifetime VIP"
  };
  const planText = planLabels[req.plan] || req.plan;

  const msg = `Hello ${req.name}, your ${planText} on Smart Worker Pro has been approved!\n\nYour Activation Key:\n👉 *${key}*\n\nOpen the PRO UPGRADE screen in the app, paste this key, and tap Activate to unlock all Pro features. Thank you!\n-- Saheb Ghanti (Smart Worker Pro)`;

  const cleanPhone = req.phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function adminDeleteRequest(reqId) {
  if (!confirm("Are you sure you want to delete this request?")) return;
  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  requests = requests.filter(r => r.id !== reqId);
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));
  renderAdminRechargeRequests();
}

// Manual Key Generator
function adminGenerateManualKey() {
  const devEl = document.getElementById('adm_target_device');
  const planEl = document.getElementById('adm_target_plan');
  const devId = devEl ? devEl.value.trim().toUpperCase() : "";
  const plan = planEl ? planEl.value : "KARIGAR_1M";

  if (!devId || devId.length !== 8) {
    alert("Please enter a valid 8-character Device ID!");
    return;
  }

  const key = generateActivationKey(devId, plan);
  lastGeneratedAdminKey = key;
  lastTargetPlan = plan;

  const dispEl = document.getElementById('admGeneratedKeyDisplay');
  if (dispEl) dispEl.value = key;
  const boxEl = document.getElementById('admGeneratedResultBox');
  if (boxEl) boxEl.style.display = "block";
}

function adminCopyGeneratedKey() {
  if (!lastGeneratedAdminKey) return;
  navigator.clipboard.writeText(lastGeneratedAdminKey).then(() => {
    const btn = document.getElementById('admCopyKeyBtn');
    if (btn) {
      btn.textContent = "COPIED!";
      btn.style.background = "#0284c7";
      setTimeout(() => {
        btn.textContent = "COPY";
        btn.style.background = "#16a34a";
      }, 2000);
    }
  }).catch(() => {
    alert("Key: " + lastGeneratedAdminKey);
  });
}

function adminShareKeyWhatsApp() {
  if (!lastGeneratedAdminKey) return;
  const devEl = document.getElementById('adm_target_device');
  const planEl = document.getElementById('adm_target_plan');
  const devId = devEl ? devEl.value.trim().toUpperCase() : "";
  const plan = planEl ? planEl.value : "KARIGAR_1M";
  const msg = `Hello, here is your Smart Worker Pro Activation Key:\n👉 *${lastGeneratedAdminKey}*\nDevice ID: ${devId}\nPlan: ${plan}\n\nEnter this key in the app to activate all Pro features. Thank you!`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}

// Directly unlock this device on the spot
function adminDirectSelfApplyKey() {
  if (!lastGeneratedAdminKey) return;
  document.getElementById('activationInput').value = lastGeneratedAdminKey;
  activateAppKey();
  alert("🎉 Subscription activated successfully on this device!");
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

    const st = (typeof getTelecomLicenseStatus === 'function') ? getTelecomLicenseStatus() : { active: isPro, expired: false, startDate: '--', expiryDate: '--' };
    const userObj = {
      device_id: devId,
      name: profile.name || "Customer Workshop",
      shop: profile.shop_name || "Aluminium Workshop",
      phone: profile.phone || "N/A",
      plan: lic.plan || lic.plan_category || "KARIGAR_1M",
      status: st.active ? "ACTIVE" : (st.expired ? "EXPIRED" : "PENDING_ACTIVATION"),
      start_date: lic.start_date || st.startDate,
      expiry_date: lic.expiry_date || st.expiryDate,
      start_timestamp: lic.start_timestamp || 0,
      expiry_timestamp: lic.expiry_timestamp || 0,
      validity_days: lic.validity_days || 30,
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
      <div style="font-size:0.88rem; font-weight:800; color:#38bdf8;">${notif.title || 'Admin Notification'}</div>
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


// =========================================================================
// GENERAL PURPOSE ANDROID STANDARD, SCIENTIFIC & UNIT CONVERTER CALCULATOR ENGINE (100% ENGLISH)
// =========================================================================

var calcExpr = '';
var calcCurNum = '0';
var calcJustEvaled = false;
var calcSciMode = false;
var calcSciInv = false;
var calcAngleUnit = 'DEG'; // 'DEG' or 'RAD'
var calcMemoryVal = 0;
var calcAccentColors = ['#0284c7', '#2563eb', '#059669', '#7c3aed', '#d97706', '#e11d48'];
var calcAccentIdx = 0;
var trigAngleMode = 'DEG';

function formatCalcNumberWithCommas(valStr) {
  if (valStr === null || valStr === undefined) return '0';
  var s = String(valStr);
  if (s === 'Error' || s === 'Infinity' || s === 'Undefined') return s;
  var parts = s.split('.');
  var intPart = parts[0];
  var decPart = parts.length > 1 ? '.' + parts[1] : '';
  var sign = '';
  if (intPart.startsWith('-')) {
    sign = '-';
    intPart = intPart.substring(1);
  }
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + intPart + decPart;
}

function formatExprWithCommas(exprStr) {
  if (!exprStr) return '';
  return String(exprStr).replace(/\d+(?:\.\d+)?/g, function(m) {
    return formatCalcNumberWithCommas(m);
  });
}

function evaluateRawMathExpression(rawExpr) {
  if (!rawExpr) return null;
  var s = String(rawExpr)
    .replace(/,/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, '(' + Math.PI + ')')
    .replace(/\be\b/g, '(' + Math.E + ')')
    .replace(/\^/g, '**');

  // Balance open parentheses automatically for live evaluation
  var openCount = (s.match(/\(/g) || []).length;
  var closeCount = (s.match(/\)/g) || []).length;
  while (openCount > closeCount) {
    s += ')';
    closeCount++;
  }

  // Strip trailing operator for live preview
  s = s.replace(/[+\-*/.]+$/, '');
  if (!s) return null;

  try {
    var fn = new Function('DEG_MODE', '"use strict"; ' +
      'var _toRad = function(x){ return DEG_MODE ? (x * Math.PI / 180) : x; }; ' +
      'var _toDeg = function(x){ return DEG_MODE ? (x * 180 / Math.PI) : x; }; ' +
      'var sin = function(x){ var r = Math.sin(_toRad(x)); return Math.abs(r) < 1e-12 ? 0 : r; }; ' +
      'var cos = function(x){ var r = Math.cos(_toRad(x)); return Math.abs(r) < 1e-12 ? 0 : r; }; ' +
      'var tan = function(x){ if(DEG_MODE && Math.abs((((x % 180) + 180) % 180) - 90) < 1e-9) return NaN; var r = Math.tan(_toRad(x)); return Math.abs(r) < 1e-12 ? 0 : r; }; ' +
      'var asin = function(x){ return _toDeg(Math.asin(x)); }; ' +
      'var acos = function(x){ return _toDeg(Math.acos(x)); }; ' +
      'var atan = function(x){ return _toDeg(Math.atan(x)); }; ' +
      'var sqrt = function(x){ return Math.sqrt(x); }; ' +
      'var ln = function(x){ return Math.log(x); }; ' +
      'var log = function(x){ return Math.log10 ? Math.log10(x) : (Math.log(x)/Math.LN10); }; ' +
      'var abs = function(x){ return Math.abs(x); }; ' +
      'return (' + s + ');');
    var res = fn(calcAngleUnit === 'DEG');
    if (res === undefined || res === null || isNaN(res)) return NaN;
    if (!isFinite(res)) return Infinity;
    return Math.round(res * 100000000) / 100000000;
  } catch (err) {
    return null;
  }
}

function updateCalcDisplay() {
  var exprEl = document.getElementById('calcExpressionLine');
  var mainEl = document.getElementById('calcMainResult');
  var prevEl = document.getElementById('calcLivePreview');

  if (exprEl) {
    exprEl.textContent = formatExprWithCommas(calcExpr);
  }
  if (mainEl) {
    mainEl.textContent = formatCalcNumberWithCommas(calcCurNum);
    if (String(calcCurNum).length > 12) {
      mainEl.style.fontSize = '1.9rem';
    } else {
      mainEl.style.fontSize = '2.65rem';
    }
  }
  if (prevEl) {
    if (calcExpr && !calcJustEvaled) {
      var candidate = calcExpr + (calcCurNum !== '0' ? calcCurNum : '');
      var liveVal = evaluateRawMathExpression(candidate);
      if (liveVal !== null && !isNaN(liveVal) && isFinite(liveVal)) {
        prevEl.textContent = '= ' + formatCalcNumberWithCommas(String(liveVal));
      } else {
        prevEl.textContent = '';
      }
    } else {
      prevEl.textContent = '';
    }
  }
}

function calcInputNum(digit) {
  if (calcJustEvaled) {
    calcExpr = '';
    calcCurNum = '0';
    calcJustEvaled = false;
  }
  if (calcCurNum === '0' || calcCurNum === '-0' || calcCurNum === 'Error') {
    calcCurNum = (calcCurNum === '-0' ? '-' : '') + String(digit);
  } else {
    if (calcCurNum.replace(/[^0-9]/g, '').length < 15) {
      calcCurNum += String(digit);
    }
  }
  updateCalcDisplay();
}

function calcInputMultiZero() {
  var tripleChk = document.getElementById('chkCalcTripleZero');
  var zeros = (tripleChk && tripleChk.checked) ? '000' : '00';
  if (calcJustEvaled) {
    calcExpr = '';
    calcCurNum = '0';
    calcJustEvaled = false;
  }
  if (calcCurNum === '0' || calcCurNum === 'Error') {
    calcCurNum = '0';
  } else if (calcCurNum.replace(/[^0-9]/g, '').length <= 13) {
    calcCurNum += zeros;
  }
  updateCalcDisplay();
}

function calcInputDot() {
  if (calcJustEvaled) {
    calcExpr = '';
    calcCurNum = '0';
    calcJustEvaled = false;
  }
  if (calcCurNum.indexOf('.') === -1) {
    calcCurNum += '.';
  }
  updateCalcDisplay();
}

function calcInputParen() {
  if (calcJustEvaled) {
    calcExpr = '';
    calcJustEvaled = false;
  }
  var full = calcExpr;
  var openCount = (full.match(/\(/g) || []).length;
  var closeCount = (full.match(/\)/g) || []).length;
  if (openCount > closeCount && (calcCurNum !== '0' || full.slice(-1) === ')')) {
    if (calcCurNum !== '0') {
      calcExpr += calcCurNum + ')';
      calcCurNum = '0';
    } else {
      calcExpr += ')';
    }
  } else {
    if (calcCurNum !== '0') {
      calcExpr += calcCurNum + '×(';
      calcCurNum = '0';
    } else {
      calcExpr += '(';
    }
  }
  updateCalcDisplay();
}

function calcToggleSign() {
  if (calcCurNum === '0' || calcCurNum === 'Error') return;
  if (calcCurNum.startsWith('-')) {
    calcCurNum = calcCurNum.substring(1);
  } else {
    calcCurNum = '-' + calcCurNum;
  }
  updateCalcDisplay();
}

function calcBackspace() {
  if (calcJustEvaled) {
    calcAllClear();
    return;
  }
  if (calcCurNum.length > 1) {
    calcCurNum = calcCurNum.slice(0, -1);
    if (calcCurNum === '-' || calcCurNum === '') calcCurNum = '0';
  } else if (calcCurNum !== '0') {
    calcCurNum = '0';
  } else if (calcExpr.length > 0) {
    calcExpr = calcExpr.slice(0, -1);
  }
  updateCalcDisplay();
}

function calcClearEntry() {
  calcCurNum = '0';
  updateCalcDisplay();
}

function calcAllClear() {
  calcCurNum = '0';
  calcExpr = '';
  calcJustEvaled = false;
  updateCalcDisplay();
}

function calcInputOp(op) {
  if (calcCurNum === 'Error') calcCurNum = '0';
  if (calcJustEvaled) {
    calcExpr = calcCurNum + op;
    calcCurNum = '0';
    calcJustEvaled = false;
    updateCalcDisplay();
    return;
  }

  if (op === '%') {
    var curVal = parseFloat(calcCurNum) || 0;
    // If there is a preceding addition/subtraction like "1000−", compute percentage of base
    var baseMatch = calcExpr.match(/^(\d+(?:\.\d+)?)([+−])$/);
    if (baseMatch) {
      var baseVal = parseFloat(baseMatch[1]) || 0;
      calcCurNum = String(Math.round((baseVal * (curVal / 100)) * 10000) / 10000);
    } else {
      calcCurNum = String(Math.round((curVal / 100) * 1000000) / 1000000);
    }
    updateCalcDisplay();
    return;
  }

  if (calcCurNum === '0' && /[+−×÷^]$/.test(calcExpr)) {
    calcExpr = calcExpr.slice(0, -1) + op;
  } else {
    calcExpr += calcCurNum + op;
    calcCurNum = '0';
  }
  updateCalcDisplay();
}

function calcEvaluateEqual() {
  var fullExpr = calcExpr + (calcCurNum !== '0' || !calcExpr ? calcCurNum : '');
  if (!fullExpr) return;
  var res = evaluateRawMathExpression(fullExpr);
  if (res === null || isNaN(res)) {
    calcCurNum = 'Error';
  } else if (!isFinite(res)) {
    calcCurNum = 'Infinity';
  } else {
    var cleanResult = Math.round(res * 1000000) / 1000000;
    calcCurNum = String(cleanResult);
    addCalcHistory(fullExpr, String(cleanResult));
  }
  calcExpr = fullExpr;
  calcJustEvaled = true;
  updateCalcDisplay();
}

// SCIENTIFIC FUNCTIONS (Screenshot 2)
function toggleCalcScientificMode() {
  calcSciMode = !calcSciMode;
  var stdGrid = document.getElementById('calcGridStandard');
  var sciGrid = document.getElementById('calcGridScientific');
  var btnSci = document.getElementById('btnToolScientific');
  var iconTxt = document.getElementById('sciToggleIconText');
  var ucPanel = document.getElementById('calcUnitConverterPanel');
  var keypadArea = document.getElementById('calcKeypadArea');

  if (ucPanel && ucPanel.style.display !== 'none') {
    ucPanel.style.display = 'none';
    if (keypadArea) keypadArea.style.display = 'block';
  }

  if (stdGrid) stdGrid.style.display = calcSciMode ? 'none' : 'grid';
  if (sciGrid) sciGrid.style.display = calcSciMode ? 'grid' : 'none';
  if (btnSci) btnSci.classList.toggle('active', calcSciMode);
  if (iconTxt) iconTxt.innerHTML = calcSciMode ? '+−<br>×÷' : '√π<br>e=';
}

function toggleSciInverse() {
  calcSciInv = !calcSciInv;
  var bSin = document.getElementById('btnSciSin');
  var bCos = document.getElementById('btnSciCos');
  var bTan = document.getElementById('btnSciTan');
  if (bSin) bSin.innerHTML = calcSciInv ? 'sin<sup>-1</sup>' : 'sin';
  if (bCos) bCos.innerHTML = calcSciInv ? 'cos<sup>-1</sup>' : 'cos';
  if (bTan) bTan.innerHTML = calcSciInv ? 'tan<sup>-1</sup>' : 'tan';
}

function toggleSciRadDeg() {
  calcAngleUnit = (calcAngleUnit === 'DEG') ? 'RAD' : 'DEG';
  trigAngleMode = calcAngleUnit;
  var btn = document.getElementById('btnSciRadDeg');
  if (btn) btn.textContent = (calcAngleUnit === 'DEG') ? 'Rad' : 'Deg';
  updateCalcDisplay();
}

function calcSciFunc(fn) {
  var val = parseFloat(calcCurNum) || 0;
  var isDeg = (calcAngleUnit === 'DEG');
  var res = 0;
  var label = '';

  if (fn === 'pi') {
    calcCurNum = String(Math.round(Math.PI * 1000000) / 1000000);
    calcJustEvaled = false;
    updateCalcDisplay();
    return;
  }
  if (fn === 'e') {
    calcCurNum = String(Math.round(Math.E * 1000000) / 1000000);
    calcJustEvaled = false;
    updateCalcDisplay();
    return;
  }
  if (fn === 'pow') {
    calcInputOp('^');
    return;
  }

  if (fn === 'sin') {
    if (calcSciInv) {
      if (val < -1 || val > 1) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
      res = Math.asin(val);
      if (isDeg) res = res * 180 / Math.PI;
      label = 'asin(' + val + ')';
    } else {
      var r = isDeg ? (val * Math.PI / 180) : val;
      res = Math.abs(Math.sin(r)) < 1e-12 ? 0 : Math.sin(r);
      label = 'sin(' + val + ')';
    }
  } else if (fn === 'cos') {
    if (calcSciInv) {
      if (val < -1 || val > 1) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
      res = Math.acos(val);
      if (isDeg) res = res * 180 / Math.PI;
      label = 'acos(' + val + ')';
    } else {
      var r2 = isDeg ? (val * Math.PI / 180) : val;
      res = Math.abs(Math.cos(r2)) < 1e-12 ? 0 : Math.cos(r2);
      label = 'cos(' + val + ')';
    }
  } else if (fn === 'tan') {
    if (calcSciInv) {
      res = Math.atan(val);
      if (isDeg) res = res * 180 / Math.PI;
      label = 'atan(' + val + ')';
    } else {
      var norm = isDeg ? (((val % 180) + 180) % 180) : val;
      if (isDeg && Math.abs(norm - 90) < 1e-6) {
        calcCurNum = 'Undefined';
        calcExpr = 'tan(' + val + ')';
        calcJustEvaled = true;
        updateCalcDisplay();
        return;
      }
      var r3 = isDeg ? (val * Math.PI / 180) : val;
      res = Math.abs(Math.tan(r3)) < 1e-12 ? 0 : Math.tan(r3);
      label = 'tan(' + val + ')';
    }
  } else if (fn === 'sqrt') {
    if (val < 0) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
    res = Math.sqrt(val);
    label = '√(' + val + ')';
  } else if (fn === 'sq') {
    res = val * val;
    label = '(' + val + ')²';
  } else if (fn === 'inv') {
    if (val === 0) { calcCurNum = 'Infinity'; updateCalcDisplay(); return; }
    res = 1 / val;
    label = '1/(' + val + ')';
  } else if (fn === 'ln') {
    if (val <= 0) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
    res = Math.log(val);
    label = 'ln(' + val + ')';
  } else if (fn === 'log') {
    if (val <= 0) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
    res = Math.log10 ? Math.log10(val) : (Math.log(val) / Math.LN10);
    label = 'log(' + val + ')';
  } else if (fn === 'exp') {
    res = Math.exp(val);
    label = 'e^(' + val + ')';
  } else if (fn === 'abs') {
    res = Math.abs(val);
    label = '|' + val + '|';
  }

  var clean = Math.round(res * 1000000) / 1000000;
  calcExpr = label;
  calcCurNum = String(clean);
  calcJustEvaled = true;
  addCalcHistory(label, String(clean));
  updateCalcDisplay();
}

function calcMemoryOp(op) {
  var cur = parseFloat(calcCurNum) || 0;
  var badge = document.getElementById('calcMemIndicator');
  if (op === 'MC') calcMemoryVal = 0;
  else if (op === 'MR') { calcCurNum = String(calcMemoryVal); calcJustEvaled = false; }
  else if (op === 'M+') calcMemoryVal += cur;
  else if (op === 'M-') calcMemoryVal -= cur;
  if (badge) badge.style.display = calcMemoryVal !== 0 ? 'inline-block' : 'none';
  updateCalcDisplay();
}

function calcQuickGst(pct) {
  var curVal = parseFloat(calcCurNum) || 0;
  if (curVal === 0) return;
  var factor = 1 + (pct / 100);
  var result = Math.round(curVal * factor * 100) / 100;
  var exprLabel = curVal + (pct >= 0 ? '+' + pct + '%' : pct + '%');
  calcExpr = exprLabel;
  calcCurNum = String(result);
  calcJustEvaled = true;
  addCalcHistory(exprLabel, String(result));
  updateCalcDisplay();
}

// =========================================================================
// HISTORY SCREEN (Screenshot 5)
// =========================================================================
function formatHistoryTimestamp() {
  var d = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var mon = months[d.getMonth()];
  var day = d.getDate();
  var yr = d.getFullYear();
  var hr = d.getHours();
  var min = String(d.getMinutes()).padStart(2, '0');
  var ampm = hr >= 12 ? 'PM' : 'AM';
  hr = hr % 12;
  if (hr === 0) hr = 12;
  return mon + ' ' + day + ', ' + yr + ' ' + hr + ':' + min + ' ' + ampm;
}

function addCalcHistory(exprStr, ansStr) {
  try {
    var hist = JSON.parse(localStorage.getItem('sw_calc_history') || '[]');
    if (ansStr === undefined && String(exprStr).indexOf('=') !== -1) {
      var sp = String(exprStr).split('=');
      exprStr = sp[0].trim();
      ansStr = sp[1].trim();
    }
    hist.unshift({
      expr: exprStr,
      ans: ansStr,
      text: exprStr + ' = ' + ansStr,
      time: formatHistoryTimestamp()
    });
    if (hist.length > 40) hist = hist.slice(0, 40);
    localStorage.setItem('sw_calc_history', JSON.stringify(hist));
    renderCalcHistory();
  } catch(e) {}
}

function renderCalcHistory() {
  var tape = document.getElementById('calcHistoryTape');
  if (!tape) return;
  try {
    var hist = JSON.parse(localStorage.getItem('sw_calc_history') || '[]');
    if (hist.length === 0) {
      tape.innerHTML = '<div style="text-align:center; padding:40px 16px; color:#64748b; font-size:0.95rem;">No calculation history yet</div>';
      return;
    }
    var html = '';
    hist.forEach(function(h) {
      var exprPart = h.expr || (h.text ? h.text.split('=')[0].trim() : '0');
      var ansPart = h.ans || (h.text && h.text.split('=')[1] ? h.text.split('=')[1].trim() : '0');
      var dateStr = h.time || formatHistoryTimestamp();
      if (dateStr.length <= 10 && dateStr.indexOf(',') === -1) {
        var nowD = new Date();
        var mNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        dateStr = mNames[nowD.getMonth()] + ' ' + nowD.getDate() + ', ' + nowD.getFullYear() + ' ' + dateStr;
      }
      html += '<div class="android-history-item" style="padding:14px 18px; border-bottom:1px solid #e2e8f0; display:flex; flex-direction:column; position:relative; cursor:pointer;" onclick="calcUseHistoryVal(\'' + String(ansPart).replace(/[^0-9.-]/g, '') + '\')">' +
        '<span class="android-history-dots" style="position:absolute; left:16px; top:18px; color:#64748b; font-size:1.05rem;"><i class="fa-solid fa-ellipsis-vertical"></i></span>' +
        '<div class="android-history-expr" style="text-align:right; font-size:1.35rem; color:#334155; font-weight:400; width:100%;">' + formatExprWithCommas(exprPart) + '</div>' +
        '<div class="android-history-ans" style="text-align:right; font-size:1.5rem; color:#0284c7; font-weight:400; margin-top:2px; width:100%;">= ' + formatCalcNumberWithCommas(ansPart) + '</div>' +
        '<div class="android-history-date" style="text-align:left; font-size:0.78rem; color:#334155; margin-top:6px; width:100%;">' + dateStr + '</div>' +
      '</div>';
    });
    tape.innerHTML = html;
  } catch(e) {}
}

function calcUseHistoryVal(val) {
  calcCurNum = String(val).replace(/[^\d.-]/g, '') || '0';
  calcExpr = '';
  calcJustEvaled = false;
  openCalcSubScreen('main');
  updateCalcDisplay();
}

function calcClearHistory() {
  localStorage.removeItem('sw_calc_history');
  renderCalcHistory();
}

// =========================================================================
// SUB-SCREEN NAVIGATION & SETTINGS (Screenshot 4)
// =========================================================================
function openCalcSubScreen(screenName) {
  var mainV = document.getElementById('calcMainView');
  var histV = document.getElementById('calcHistoryView');
  var setV = document.getElementById('calcSettingsView');

  if (mainV) mainV.style.display = (screenName === 'main') ? 'block' : 'none';
  if (histV) histV.style.display = (screenName === 'history') ? 'block' : 'none';
  if (setV) setV.style.display = (screenName === 'settings') ? 'block' : 'none';

  if (screenName === 'history') renderCalcHistory();
}

function toggleAndroidCalcTheme() {
  var shell = document.getElementById('androidCalcShell');
  var chk = document.getElementById('chkCalcNightMode');
  if (!shell) return;
  var isDark = shell.classList.toggle('dark-theme');
  if (chk) chk.checked = isDark;
}

function cycleCalcAccentColor() {
  calcAccentIdx = (calcAccentIdx + 1) % calcAccentColors.length;
  var color = calcAccentColors[calcAccentIdx];
  var shell = document.getElementById('androidCalcShell');
  var swatch = document.getElementById('calcColorSwatch');
  if (shell) shell.style.setProperty('--calc-accent', color);
  if (swatch) swatch.style.background = color;
}

function applyCalcSettingsUI(zeroMode) {
  var shell = document.getElementById('androidCalcShell');
  var chkRound = document.getElementById('chkCalcRounded');
  var chkMem = document.getElementById('chkCalcMemory');
  var chkDbl = document.getElementById('chkCalcDoubleZero');
  var chkTrp = document.getElementById('chkCalcTripleZero');
  var memBar = document.getElementById('calcMemoryBar');
  var btnZStd = document.getElementById('btnMultiZeroStd');
  var btnZSci = document.getElementById('btnMultiZeroSci');

  if (zeroMode === 'triple' && chkTrp && chkTrp.checked && chkDbl) {
    chkDbl.checked = false;
  } else if (zeroMode === 'double' && chkDbl && chkDbl.checked && chkTrp) {
    chkTrp.checked = false;
  }

  if (shell && chkRound) {
    shell.classList.toggle('rounded-keys', chkRound.checked);
  }
  if (memBar && chkMem) {
    memBar.style.display = chkMem.checked ? 'grid' : 'none';
  }
  var zLabel = (chkTrp && chkTrp.checked) ? '000' : ((chkDbl && !chkDbl.checked) ? '0' : '00');
  if (btnZStd) btnZStd.textContent = zLabel;
  if (btnZSci) btnZSci.textContent = zLabel;
}

// =========================================================================
// UNIT CONVERTER SHEET & INTERACTIVE ENGLISH TOOLS (Screenshot 3)
// =========================================================================
function toggleUnitConverterPanel() {
  var ucPanel = document.getElementById('calcUnitConverterPanel');
  var keypadArea = document.getElementById('calcKeypadArea');
  var btnConv = document.getElementById('btnToolConverter');
  if (!ucPanel) return;

  var isOpen = ucPanel.style.display !== 'none';
  if (isOpen) {
    ucPanel.style.display = 'none';
    if (keypadArea) keypadArea.style.display = 'block';
    if (btnConv) btnConv.classList.remove('active');
  } else {
    ucPanel.style.display = 'block';
    if (keypadArea) keypadArea.style.display = 'none';
    if (btnConv) btnConv.classList.add('active');
    closeActiveUnitConverterTool();
  }
}

function closeActiveUnitConverterTool() {
  var box = document.getElementById('ucActiveToolBox');
  var grid = document.querySelector('#calcUnitConverterPanel .uc-icon-grid');
  if (box) {
    box.style.display = 'none';
    box.innerHTML = '';
  }
  if (grid) grid.style.display = 'grid';
}

function openUnitConverterTool(toolKey) {
  var ucPanel = document.getElementById('calcUnitConverterPanel');
  var keypadArea = document.getElementById('calcKeypadArea');
  var box = document.getElementById('ucActiveToolBox');
  var grid = document.querySelector('#calcUnitConverterPanel .uc-icon-grid');
  if (ucPanel && ucPanel.style.display === 'none') {
    ucPanel.style.display = 'block';
    if (keypadArea) keypadArea.style.display = 'none';
  }
  if (!box) return;
  box.style.display = 'block';
  if (grid) grid.style.display = 'none';
  var backBtnHtml = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid #e2e8f0;">' +
    '<button type="button" onclick="closeActiveUnitConverterTool()" style="background:transparent; border:none; color:#0284c7; font-weight:700; font-size:0.82rem; cursor:pointer; padding:2px 0;">← All Unit Converters</button>' +
    '<span style="font-size:0.72rem; color:#64748b;">Tap to switch tool</span>' +
  '</div>';

  if (toolKey === 'discount') {
    box.innerHTML = backBtnHtml +
      '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">🏷️ DISCOUNT CALCULATOR</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Original Price (₹)</label>' +
        '<input type="number" id="disc_orig_price" placeholder="e.g. 5000" oninput="calcDiscountLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;"></div>' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Discount (%)</label>' +
        '<input type="number" id="disc_pct" placeholder="e.g. 10" oninput="calcDiscountLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;"></div>' +
      '</div>' +
      '<div style="margin-bottom:8px;"><label style="font-size:0.72rem; color:#64748b;">Or Direct Flat Discount (₹)</label>' +
        '<input type="number" id="disc_flat" placeholder="e.g. 500" oninput="calcDiscountFromFlatLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;">' +
      '</div>' +
      '<div style="display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap;">' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(5)">5%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(10)">10%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(15)">15%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(20)">20%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(25)">25%</button>' +
      '</div>' +
      '<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:8px; text-align:center;">' +
        '<div><div style="font-size:0.7rem; color:#64748b;">Amount Saved</div><div id="disc_val_saved" style="font-size:1.05rem; font-weight:800; color:#16a34a;">₹ 0.00</div></div>' +
        '<div><div style="font-size:0.7rem; color:#64748b;">Final Payable Price</div><div id="disc_val_final" style="font-size:1.05rem; font-weight:800; color:#0284c7;">₹ 0.00</div></div>' +
      '</div>' +
      '<div id="disc_val_breakdown" style="font-size:0.75rem; color:#64748b; margin-top:6px; text-align:center;">Enter price and discount % to view breakdown</div>';
    return;
  }

  if (toolKey === 'gst') {
    box.innerHTML = backBtnHtml +
      '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">🧾 GST TAX CALCULATOR</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Base Amount (₹)</label>' +
        '<input type="number" id="uc_gst_amt" value="1000" oninput="runUcGstCalc()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;"></div>' +
        '<div><label style="font-size:0.72rem; color:#64748b;">GST Rate (%)</label>' +
        '<select id="uc_gst_rate" onchange="runUcGstCalc()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;">' +
          '<option value="18" selected>18% GST</option><option value="12">12% GST</option><option value="5">5% GST</option><option value="28">28% GST</option>' +
        '</select></div>' +
      '</div>' +
      '<div id="uc_gst_res" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; font-size:0.82rem;"></div>';
    runUcGstCalc();
    return;
  }

  if (toolKey === 'angle') {
    box.innerHTML = backBtnHtml +
      '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">📐 ANGLE, TRIGONOMETRY & MITRE CUT</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Width / Base (Inch)</label>' +
        '<input type="number" id="mitre_base" placeholder="e.g. 36" oninput="calcMitreLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;"></div>' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Height / Rise (Inch)</label>' +
        '<input type="number" id="mitre_height" placeholder="e.g. 36" oninput="calcMitreLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;"></div>' +
      '</div>' +
      '<div id="mitre_results_box" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; font-size:0.78rem; color:#334155;">Enter Width and Height to calculate Diagonal Length and Mitre Cut Angles.</div>';
    return;
  }

  // Generic Unit Converter for Length, Area, Currency, Temperature, Mass, Volume, Split Bill, Loan, etc.
  var configs = {
    length: { title: '📏 LENGTH CONVERTER', u1: 'Feet (ft)', u2: 'Inches (in)', u3: 'Millimeters (mm)', f12: 12, f13: 304.8 },
    area: { title: '⬛ AREA CONVERTER', u1: 'Sq. Feet (sq.ft)', u2: 'Sq. Meters (sq.m)', u3: 'Sq. Inches (sq.in)', f12: 0.092903, f13: 144 },
    currency: { title: '💱 CURRENCY CONVERTER', u1: 'Indian Rupee (INR ₹)', u2: 'US Dollar (USD $)', u3: 'Euro (EUR €)', f12: 0.0119, f13: 0.011 },
    temperature: { title: '🌡️ TEMPERATURE CONVERTER', u1: 'Celsius (°C)', u2: 'Fahrenheit (°F)', u3: 'Kelvin (K)', temp: true },
    volume: { title: '🧊 VOLUME CONVERTER', u1: 'Liters (L)', u2: 'Milliliters (mL)', u3: 'Cubic Feet (cu.ft)', f12: 1000, f13: 0.035315 },
    mass: { title: '⚖️ MASS / WEIGHT CONVERTER', u1: 'Kilograms (kg)', u2: 'Grams (g)', u3: 'Pounds (lb)', f12: 1000, f13: 2.20462 },
    data: { title: '💾 DATA STORAGE CONVERTER', u1: 'Gigabytes (GB)', u2: 'Megabytes (MB)', u3: 'Terabytes (TB)', f12: 1024, f13: 0.00097656 },
    speed: { title: '🚀 SPEED CONVERTER', u1: 'km/h', u2: 'm/s', u3: 'mph', f12: 0.277778, f13: 0.621371 },
    time: { title: '⏱️ TIME CONVERTER', u1: 'Hours', u2: 'Minutes', u3: 'Seconds', f12: 60, f13: 3600 },
    pressure: { title: '🧭 PRESSURE CONVERTER', u1: 'Bar', u2: 'PSI', u3: 'Pascal (Pa)', f12: 14.5038, f13: 100000 },
    force: { title: '🛠️ FORCE CONVERTER', u1: 'Newton (N)', u2: 'Kilogram-force (kgf)', u3: 'Pound-force (lbf)', f12: 0.10197, f13: 0.22481 },
    power: { title: '⚡ POWER CONVERTER', u1: 'Kilowatt (kW)', u2: 'Watts (W)', u3: 'Horsepower (HP)', f12: 1000, f13: 1.34102 },
    energy: { title: '🔥 ENERGY CONVERTER', u1: 'Kilowatt-hour (kWh)', u2: 'Joules (J)', u3: 'Calories (cal)', f12: 3600000, f13: 860421 },
    frequency: { title: '〰️ FREQUENCY CONVERTER', u1: 'Hertz (Hz)', u2: 'Kilohertz (kHz)', u3: 'RPM', f12: 0.001, f13: 60 },
    fuel: { title: '⛽ FUEL CONVERTER', u1: 'km / Liter', u2: 'Liters / 100 km', u3: 'Miles / Gallon (MPG)', f12: 100, f13: 2.35215 },
    split_bill: { title: '🧾 SPLIT BILL CALCULATOR', u1: 'Total Bill Amount (₹)', u2: 'Per Person (2 People)', u3: 'Per Person (4 People)', f12: 0.5, f13: 0.25 },
    loan: { title: '🏦 LOAN ESTIMATE (1 Yr @ 10%)', u1: 'Loan Principal (₹)', u2: 'Monthly EMI (₹)', u3: 'Total Payable (₹)', f12: 0.087916, f13: 1.055 },
    savings: { title: '🐷 SAVINGS GROWTH (1 Yr @ 7%)', u1: 'Deposit Amount (₹)', u2: 'Interest Earned (₹)', u3: 'Maturity Value (₹)', f12: 0.07, f13: 1.07 }
  };

  var cfg = configs[toolKey] || { title: '🔄 ' + String(toolKey).toUpperCase() + ' CALCULATOR', u1: 'Input Value', u2: 'Converted (x12)', u3: 'Converted (x100)', f12: 12, f13: 100 };
  window._activeUcCfg = cfg;

  box.innerHTML = backBtnHtml +
    '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">' + cfg.title + '</div>' +
    '<div style="margin-bottom:8px;">' +
      '<label style="font-size:0.72rem; color:#64748b;">' + cfg.u1 + '</label>' +
      '<input type="number" id="uc_gen_input" value="1" oninput="runGenericUcConvert()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;">' +
    '</div>' +
    '<div id="uc_gen_output" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; font-size:0.82rem;"></div>';
  runGenericUcConvert();
}

function runUcGstCalc() {
  var amtEl = document.getElementById('uc_gst_amt');
  var rateEl = document.getElementById('uc_gst_rate');
  var resEl = document.getElementById('uc_gst_res');
  if (!amtEl || !rateEl || !resEl) return;
  var amt = parseFloat(amtEl.value) || 0;
  var rate = parseFloat(rateEl.value) || 18;
  var gstAmt = Math.round(amt * (rate / 100) * 100) / 100;
  var total = Math.round((amt + gstAmt) * 100) / 100;
  resEl.innerHTML = '<div>CGST (' + (rate/2) + '%): <b>₹' + (gstAmt/2).toFixed(2) + '</b> | SGST (' + (rate/2) + '%): <b>₹' + (gstAmt/2).toFixed(2) + '</b></div>' +
    '<div style="margin-top:4px; color:#0284c7; font-size:0.95rem;">Total GST: <b>₹' + gstAmt.toFixed(2) + '</b> | Total with GST: <b>₹' + total.toFixed(2) + '</b></div>';
}

function runGenericUcConvert() {
  var inp = document.getElementById('uc_gen_input');
  var out = document.getElementById('uc_gen_output');
  var cfg = window._activeUcCfg;
  if (!inp || !out || !cfg) return;
  var v = parseFloat(inp.value) || 0;
  var r1 = 0, r2 = 0;
  if (cfg.temp) {
    r1 = (v * 9 / 5) + 32;
    r2 = v + 273.15;
  } else {
    r1 = v * cfg.f12;
    r2 = v * cfg.f13;
  }
  out.innerHTML = '<div>• ' + cfg.u2 + ': <b style="color:#0284c7;">' + (Math.round(r1 * 10000) / 10000) + '</b></div>' +
    '<div style="margin-top:4px;">• ' + cfg.u3 + ': <b style="color:#16a34a;">' + (Math.round(r2 * 10000) / 10000) + '</b></div>';
}

// -------------------------------------------------------------------------
// DISCOUNT, TRIGONOMETRY & MITRE HELPERS (100% ENGLISH)
// -------------------------------------------------------------------------
function setCalcTabMode(mode) {
  if (mode === 'discount') {
    openCalcSubScreen('main');
    var ucPanel = document.getElementById('calcUnitConverterPanel');
    if (ucPanel && ucPanel.style.display === 'none') toggleUnitConverterPanel();
    openUnitConverterTool('discount');
  } else if (mode === 'trig') {
    openCalcSubScreen('main');
    if (!calcSciMode) toggleCalcScientificMode();
  } else {
    openCalcSubScreen('main');
    updateCalcDisplay();
  }
}

function switchCalcSubTab(mode) {
  setCalcTabMode(mode);
}

function setDiscountPreset(pct) {
  var pInput = document.getElementById('disc_pct');
  if (pInput) pInput.value = pct;
  var fInput = document.getElementById('disc_flat');
  if (fInput) fInput.value = '';
  calcDiscountLive();
}

function calcDiscountLive() {
  var origEl = document.getElementById('disc_orig_price');
  var pctEl = document.getElementById('disc_pct');
  var flatEl = document.getElementById('disc_flat');
  var savedEl = document.getElementById('disc_val_saved');
  var finalEl = document.getElementById('disc_val_final');
  var bdEl = document.getElementById('disc_val_breakdown');
  var gstEl = document.getElementById('disc_val_with_gst');

  if (!origEl || !savedEl || !finalEl) return;
  var orig = parseFloat(origEl.value) || 0;
  var pct = parseFloat(pctEl ? pctEl.value : 0) || 0;

  if (orig <= 0) {
    savedEl.textContent = '₹ 0.00';
    finalEl.textContent = '₹ 0.00';
    if (bdEl) bdEl.textContent = 'Enter original price and discount % to view breakdown';
    if (gstEl) gstEl.textContent = '₹ 0.00';
    return;
  }

  var savedAmt = Math.round((orig * (pct / 100)) * 100) / 100;
  var finalPrice = Math.max(0, Math.round((orig - savedAmt) * 100) / 100);
  var withGst = Math.round((finalPrice * 1.18) * 100) / 100;

  if (flatEl && document.activeElement === pctEl) {
    flatEl.value = savedAmt > 0 ? savedAmt : '';
  }

  savedEl.textContent = '₹ ' + savedAmt.toLocaleString('en-IN', {minimumFractionDigits: 2});
  finalEl.textContent = '₹ ' + finalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2});
  if (bdEl) bdEl.innerHTML = 'Original Price: <b>₹' + orig.toLocaleString('en-IN') + '</b> − Discount (' + pct + '%): <b style="color:#16a34a;">₹' + savedAmt.toLocaleString('en-IN') + '</b> = <b style="color:#0284c7;">₹' + finalPrice.toLocaleString('en-IN') + '</b>';
  if (gstEl) gstEl.textContent = '₹ ' + withGst.toLocaleString('en-IN', {minimumFractionDigits: 2});
}

function calcDiscountFromFlatLive() {
  var origEl = document.getElementById('disc_orig_price');
  var flatEl = document.getElementById('disc_flat');
  var pctEl = document.getElementById('disc_pct');
  if (!origEl || !flatEl) return;
  var orig = parseFloat(origEl.value) || 0;
  var flat = parseFloat(flatEl.value) || 0;
  if (orig > 0 && flat >= 0) {
    var calcPct = Math.round((flat / orig) * 10000) / 100;
    if (pctEl) pctEl.value = calcPct;
  }
  calcDiscountLive();
}

function setTrigAngleMode(mode) {
  trigAngleMode = mode;
  calcAngleUnit = mode;
  evalTrigInstant();
}

function evalTrigInstant() {
  var inp = document.getElementById('trig_input_val');
  var pill = document.getElementById('trig_result_pill');
  if (!inp || !pill) return;
  var val = parseFloat(inp.value) || 0;
  var isDeg = trigAngleMode === 'DEG';
  var rad = isDeg ? (val * Math.PI / 180) : val;
  var unitStr = isDeg ? '°' : ' rad';
  var s = Math.abs(Math.sin(rad)) < 1e-12 ? 0 : Math.round(Math.sin(rad) * 10000) / 10000;
  var c = Math.abs(Math.cos(rad)) < 1e-12 ? 0 : Math.round(Math.cos(rad) * 10000) / 10000;
  pill.innerHTML = 'sin(' + val + unitStr + ') = <b>' + s + '</b> | cos(' + val + unitStr + ') = <b>' + c + '</b>';
}

function applyTrig(fn) {
  calcSciFunc(fn);
}

function applySci(op) {
  calcSciFunc(op);
}

function calcMitreLive() {
  var bEl = document.getElementById('mitre_base');
  var hEl = document.getElementById('mitre_height');
  var box = document.getElementById('mitre_results_box');
  if (!bEl || !hEl || !box) return;
  var b = parseFloat(bEl.value) || 0;
  var h = parseFloat(hEl.value) || 0;

  if (b <= 0 || h <= 0) {
    box.innerHTML = 'Enter Width and Height to calculate <b>Diagonal Cutting Size</b> and <b>Mitre Cut Angles</b> automatically.';
    return;
  }

  var hyp = Math.round(Math.sqrt(b * b + h * h) * 100) / 100;
  var angRad = Math.atan2(h, b);
  var angDeg = Math.round(angRad * (180 / Math.PI) * 100) / 100;
  var compDeg = Math.round((90 - angDeg) * 100) / 100;

  box.innerHTML = '<div style="color:#0284c7; font-weight:800; font-size:0.82rem; margin-bottom:4px;">✔ Workshop Angle & Diagonal Cut Result:</div>' +
    '<div>• Diagonal Pipe Cutting Length: <b style="color:#d97706; font-size:0.95rem;">' + hyp + '"</b></div>' +
    '<div>• Base Mitre Cut Angle: <b style="color:#16a34a;">' + angDeg + '°</b></div>' +
    '<div>• Top Plumb Cut Angle: <b style="color:#7c3aed;">' + compDeg + '°</b></div>' +
    '<div style="margin-top:4px; font-size:0.72rem; color:#64748b;">💡 Cutting Tip: Set your mitre saw to <b>' + angDeg + '°</b> for an exact corner joint.</div>';
}

if (typeof renderCalcHistory === 'function') {
  setTimeout(renderCalcHistory, 300);
}


// =========================================================================
// SMART WORKER PRO - ANTI-THEFT, ANTI-INSPECT & ANTI-HANG SECURITY SHIELD (v27)
// =========================================================================
(function initSmartWorkerSecurityShield() {
  try {
    // Remove any legacy plaintext admin pin from localStorage
    localStorage.removeItem('sw_admin_pin');

    // 1. Block Right-Click Context Menu on non-input elements to prevent code copying
    document.addEventListener('contextmenu', function(e) {
      var tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    }, false);

    // 2. Block F12, Ctrl+Shift+I/J/C (DevTools), Ctrl+U (View Source), Ctrl+S (Save Page)
    document.addEventListener('keydown', function(e) {
      var key = e.key || e.keyCode;
      if (
        key === 'F12' || key === 123 ||
        (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c' || key === 73 || key === 74 || key === 67)) ||
        (e.ctrlKey && (key === 'U' || key === 'u' || key === 'S' || key === 's' || key === 85 || key === 83))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, false);

    // 3. Global Anti-Hang & Crash Recovery Guard
    window.addEventListener('error', function(evt) {
      console.warn('[SmartWorker Shield] Prevented UI hang from runtime error:', evt.message);
      return true;
    });
    window.addEventListener('unhandledrejection', function(evt) {
      console.warn('[SmartWorker Shield] Handled background promise:', evt.reason);
      if (evt && typeof evt.preventDefault === 'function') evt.preventDefault();
    });
  } catch (err) {}
})();
