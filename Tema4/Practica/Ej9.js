function ordenarNumerosMayorAMenor(numero) {
  let numeros = numero.toString().split("").map(Number);
  numeros.sort((a, b) => b - a);
  return numeros.join("");
}
let numero = 42145;
console.log(ordenarNumerosMayorAMenor(numero));
