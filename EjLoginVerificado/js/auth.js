import { GuardarDatos } from "../guardarDatos.js";
import { UserFactory } from "./UserFactory.js";

const userStorage = new GuardarDatos(localStorage, "users");

// Regex for password: At least 8 chars, 1 uppercase, 1 number, 1 special char
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
    setupValidation(loginForm);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
    setupValidation(registerForm);
  }
});

function setupValidation(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateInput(input));
    // Clear error on input and reset validity
    input.addEventListener("input", () => {
      input.setCustomValidity("");
      input.checkValidity(); // Update validity state
      input.style.borderColor = "";
      
      // Hide specific error messages if they exist
      const errorId = input.id + "Error";
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.style.display = "none";
    });
  });
}

function validateInput(input) {
  // Reset validity first to allow fresh check
  input.setCustomValidity("");
  
  const value = input.value.trim();
  let isValid = true;

  // Basic empty check for required fields
  if (input.hasAttribute("required") && value === "") {
    input.setCustomValidity("Este campo es obligatorio.");
    isValid = false;
  }

  // Specific checks based on ID or Name
  if (input.type === "email" || input.id === "email") {
    if (!value.includes("@")) {
      input.setCustomValidity("Por favor, introduce un email válido.");
      isValid = false;
    }
  }

  if (input.id === "password" && input.closest("#registerForm")) {
    if (!passwordRegex.test(value)) {
      input.setCustomValidity("La contraseña debe cumplir con los requisitos.");
      isValid = false;
    }
  }

  if (input.id === "confirmPassword") {
    const password = document.getElementById("password").value;
    if (value !== password) {
      input.setCustomValidity("Las contraseñas no coinciden.");
      isValid = false;
    }
  }

  // Visual feedback
  if (!input.checkValidity()) {
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = ""; // Or green
  }

  return input.checkValidity();
}

function handleRegister(e) {
  e.preventDefault();
  const form = e.target;

  // Trigger validation on all inputs to ensure custom validity is set
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => validateInput(input));

  if (!form.checkValidity()) {
    // Show custom error messages for specific fields if invalid
    if (!document.getElementById("password").validity.valid) {
      const pwdError = document.getElementById("passwordError");
      if (pwdError) pwdError.style.display = "block";
    }
    
    if (!document.getElementById("confirmPassword").validity.valid) {
      const confirmError = document.getElementById("confirmPasswordError");
      if (confirmError) confirmError.style.display = "block";
    }

    form.reportValidity(); // Shows browser native bubbles
    return;
  }

  const name = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value || "user";

  const users = userStorage.load();
  if (users.some((u) => u.email === email)) {
    const emailInput = document.getElementById("email");
    emailInput.setCustomValidity("El email ya está registrado.");
    
    const emailError = document.getElementById("emailError");
    if (emailError) {
      emailError.textContent = "El email ya está registrado.";
      emailError.style.display = "block";
    }
    
    form.reportValidity();
    return;
  }

  const newUser = UserFactory.createUser(name, email, password, role);

  userStorage.add(newUser);
  alert("Registro exitoso. Por favor inicia sesión.");
  window.location.href = "login.html";
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;

  // Trigger validation
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => validateInput(input));

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("loginError");

  const users = userStorage.load();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    if (errorMsg) errorMsg.style.display = "block";
  }
}
