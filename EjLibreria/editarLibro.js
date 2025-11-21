import { guardarDatos } from "./guardarDatos.js";

let store = new guardarDatos(sessionStorage, "libros");
const params = new URLSearchParams(window.location.search);
const idLibro = params.get("nombre");
const nombre = document.getElementById("nombre");
const numPaginas = document.getElementById("numPaginas");
const leido = document.getElementById("leido");
const form = document.getElementById("formEditar");

// Cargar datos del libro
const libro = store.load().find((l) => l.nombre == idLibro);

if (!libro) {
  alert("Libro no encontrado");
  window.location.href = "ConsultarLibros.html";
}

// Mostrar datos en formulario
nombre.value = libro.nombre;
numPaginas.value = libro.numPaginas;
leido.value = libro.leido;

// Guardar cambios
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const actualizado = {
    nombre: nombre.value,
    numPaginas: Number(numPaginas.value),
    leido: leido.value,
  };

  store.update(idLibro, actualizado);

  alert("Libro actualizado correctamente ✅");
  window.location.href = "ConsultarLibros.html";
});
