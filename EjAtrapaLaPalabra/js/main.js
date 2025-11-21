import { GuardarDatos } from "./guardarDatos.js";

const storage = new GuardarDatos(localStorage, "user_data");
const form = document.getElementById("loginForm");
const title = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");

// Check if user exists
const existingData = storage.load();
const isRegistered = existingData && existingData.user;

if (isRegistered) {
  title.textContent = "Iniciar Sesión";
  submitBtn.textContent = "Entrar";
} else {
  title.textContent = "Registro";
  submitBtn.textContent = "Registrar";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuarioInput = document.getElementById("usuario").value;
  const passwordInput = document.getElementById("contraseña").value;

  if (isRegistered) {
    // Login Mode
    if (
      existingData.user === usuarioInput &&
      existingData.password === passwordInput
    ) {
      window.location.href = "juego.html";
    } else {
      showError("Usuario o contraseña incorrectos.");
    }
  } else {
    // Register Mode
    if (usuarioInput && passwordInput) {
      storage.save({ user: usuarioInput, password: passwordInput });
      alert("Registro completado. Ahora puedes iniciar sesión.");
      location.reload();
    } else {
      showError("Por favor, completa todos los campos.");
    }
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}
