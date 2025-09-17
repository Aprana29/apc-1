// document.getElementById("login-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const errorMsg = document.getElementById("login-error");

//   try {
//     const response = await fetch("http://localhost:8080/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     if (!response.ok) {
//       errorMsg.style.display = "block";
//       return;
//     }

//     const data = await response.json();

//     // Save JWT token in localStorage
//     localStorage.setItem("jwtToken", data.token);

//     // Redirect to User Dashboard
//     window.location.href = "../UserDashboard/userDashboard.html";
//   } catch (error) {
//     console.error("Login error:", error);
//     errorMsg.style.display = "block";
//   }
// });
