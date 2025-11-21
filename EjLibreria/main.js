import { guardarDatos } from "./guardarDatos.js";
import { libro } from "./libro.js";

const form = document.getElementById("formulario");

let guardarDato = new guardarDatos(sessionStorage, "libros");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const numero = document.getElementById("numero").valueAsNumber;
  const texto = document.getElementById("texto").value;
  const checkbox = document.getElementById("checkbox").checked;

  const libroA = new libro(texto, numero, checkbox);

  guardarDato.add(libroA);
});
