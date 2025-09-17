// adminLogin.js
const form = document.getElementById("admin-login-form");
const errorMsg = document.getElementById("error-msg");

// Dummy credentials (replace with real auth later)
const ADMIN_EMAIL = "admin@laundry.com";
const ADMIN_PASSWORD = "admin123";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // success: store fake token
    sessionStorage.setItem("jwtTokenAdmin", "mock-admin-token-123");
    sessionStorage.setItem("sessionTokenAdmin", "mock-session-token-456");

    window.location.href = "../AdminDashboard/adminDashboard.html";
  } else {
    errorMsg.textContent = "Invalid admin credentials!";
  }
});
