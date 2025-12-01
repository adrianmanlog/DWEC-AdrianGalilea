import { GuardarDatos } from "./guardarDatos.js";
const form = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const datos = new GuardarDatos(localStorage, "filas");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const filas = document.getElementById("numeroFilas").value;
  const columnas = document.getElementById("numeroColumnas").value;
  const filCol = [filas, columnas];

  datos.add(filCol);
  window.location.href = "juego.html";
});
