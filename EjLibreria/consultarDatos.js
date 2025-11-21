import { guardarDatos } from "./guardarDatos.js";
import { libro } from "./libro.js";

const consultarBtn = document.getElementById("consultarBtn");
const historial = document.getElementById("historial");
let guardarDato = new guardarDatos(sessionStorage, "libros");

consultarBtn.addEventListener("click", function () {
  const librosSinConvertir = guardarDato.load();
  const libros = librosSinConvertir.map(
    (a) => new libro(a.nombre, a.numPaginas, a.leido)
  );

  historial.replaceChildren();

  const titulo = document.createElement("h2");
  titulo.textContent = "Libros guardados:";
  historial.appendChild(titulo);

  if (libros.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay libros guardados.";
    historial.appendChild(mensaje);
    return;
  }

  librosSinConvertir.forEach((l) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${l.nombre} - ${l.numPaginas} - ${l.leido}</p>
      <button class="editarBtn">Editar</button>
    `;
    historial.appendChild(div);

    const btn = div.querySelector(".editarBtn");

    btn.addEventListener("click", () => {
      window.location.href = `editarLibro.html?nombre=${l.nombre}`;
    });
  });
});
