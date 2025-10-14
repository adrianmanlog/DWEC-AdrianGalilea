"use strict";
let cadena = "adrian";

function contarVocales(cadena) {
  let cont = 0;
  let vocales = ["a", "e", "i", "o", "u"];
  for (let index = 0; index < cadena.length; index++) {
    for (let index2 = 0; index2 < vocales.length; index2++) {
      let compararVocal = vocales[index2];
      if (cadena[index] == compararVocal) {
        cont++;
      }
    }
  }
  return cont;
}
let numVocales = contarVocales(cadena);
console.log(numVocales);
