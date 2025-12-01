import { GuardarDatos } from "./guardarDatos.js";
const datos = new GuardarDatos(localStorage, "filas");
const contenedor = document.getElementById("idMain");
const reiniciar = document.getElementById("reiniciar");
let vidas = 3;
let contMinas = 0;
pintar();
function pintar() {
  let filCol = datos.load();
  let filasA = filCol[0];
  let filasL = filasA[0];
  let columnasL = filasA[1];
  let cont = 1;
  for (let filas = 0; filas < filasL; filas++) {
    let div = document.createElement("div");
    div.id = filas;
    for (let columnas = 0; columnas < columnasL; columnas++) {
      let btn = createButton(cont);
      div.appendChild(btn);
      cont++;
    }
    contenedor.appendChild(div);
  }
}
reiniciar.addEventListener("click", (e) => {
  window.location.href = "juego.html";
});
function createButton(id) {
  const btn = document.createElement("img");

  let mina = Math.round(Math.random() * 3);
  if (mina === 2) {
    btn.mina = true;
    contMinas++;
  }
  btn.src = "circle.png";
  btn.alt = "Ciculos";
  btn.id = id;
  btn.addEventListener("click", clickMe);
  return btn;
}

function clickMe(event) {
  if (event.target.mina) {
    event.target.src = "error.png";
    vidas--;
    contMinas--;
  } else {
    event.target.src = "boat.jpg";
  }

  if (vidas === 0) {
    alert("Se acabo el juego te has comido todas las minas");
    datos.clear();
    window.location.href = "index.html";
  }
  if (contMinas === 0) {
    alert("Has ganado el juego");
    datos.clear();
    window.location.href = "index.html";
  }
}
