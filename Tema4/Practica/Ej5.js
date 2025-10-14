let sinRepes = new Set();
function devolverSinRepetidos(cadena) {
  for (let index = 0; index < cadena.length; index++) {
    const d = cadena[index];
    sinRepes.add(d);
  }
  return sinRepes;
}
let cadena = "1233";
devolverSinRepetidos(cadena);
console.log(sinRepes);
