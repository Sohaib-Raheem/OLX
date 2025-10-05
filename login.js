class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = firstName + " " + lastName;
    this.email = email;
    this.password = password;
  }
}

// Load users from localStorage
let usersList = JSON.parse(localStorage.getItem("sign")) || [];
var message = document.getElementById("message");
var signUpDiv = document.getElementById("sign-up");
var logInDiv = document.getElementById("log-in");

function saveToLocalStorage() {
  localStorage.setItem("sign", JSON.stringify(usersList));
}

// ------------------ SIGN UP ------------------
function signUp(event) {
  event.preventDefault();

  let firstName = document.getElementById("first-name").value.trim();
  let lastName = document.getElementById("last-name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!firstName || !lastName || !email || !password) {
    message.style.color = "red";
    message.textContent = "⚠️ Please fill all fields!";
    return;
  }

  let existingUser = usersList.find(user => user.email === email);

  if (existingUser) {
    // ✅ Agar email already registered hai → direct login
    localStorage.setItem("currentUser", existingUser.email);
    message.style.color = "green";
    message.textContent = `Welcome back, ${existingUser.firstName}! Redirecting...`;
    setTimeout(() => window.location.href = "index.html", 1000);
    return;
  }

  // ✅ Naya user → save
  let newUser = new User(firstName, lastName, email, password);
  usersList.push(newUser);
  saveToLocalStorage();

  localStorage.setItem("currentUser", email);

  message.style.color = "green";
  message.textContent = "✅ Signup successful! Redirecting...";
  setTimeout(() => window.location.href = "index.html", 1000);
}

// ------------------ LOGIN ------------------
function logIn(event) {
  event.preventDefault();

  let email = document.getElementById("login-email").value.trim();
  let password = document.getElementById("login-password").value.trim();

  let foundUser = usersList.find(user => user.email === email && user.password === password);

  if (foundUser) {
    localStorage.setItem("currentUser", foundUser.email);
    message.style.color = "green";
    message.textContent = `Welcome, ${foundUser.firstName} ${foundUser.lastName}! 🎉 Redirecting...`;
    setTimeout(() => window.location.href = "index.html", 1000);
  } else {
    message.style.color = "red";
    message.textContent = "❌ Invalid email or password!";
  }
}
