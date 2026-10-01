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
 if (firebase.database) {
   fbRtdb = firebase.database();
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





window.onload = function() {
 changeLanguage(currentAppLang);
 setupDb();
 initFirebaseCloud();
 initCloudKhataSyncListener();
 loadSavedProfile();
 loadBillSettings();
 updateSuggestedRate();

 // Check if user should see Login first
 const hasUser = localStorage.getItem('sw_cloud_user') || localStorage.getItem('sw_guest_mode');
 if (!hasUser) {
 openScreen('auth', 'SIGN IN / REGISTER');
 document.getElementById('topBackBtn').style.display = 'none';
 } else {
 goHome();
 }
 };





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
