function pasarABinario(entero) {
  if (entero < 0) {
    return "El número debe ser positivo";
  } else {
    let binario = entero.toString(2);
    return binario;
  }
}
function contarUnosDelBinario(binario) {
  let contador = 0;
  for (let i = 0; i < binario.length; i++) {
    if (binario[i] === "1") {
      contador++;
    }
  }
  return contador;
}
console.log(pasarABinario(10));
console.log(contarUnosDelBinario(pasarABinario(10)));
