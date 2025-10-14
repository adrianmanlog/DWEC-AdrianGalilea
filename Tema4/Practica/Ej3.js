function contarNumeros(array) {
  const mapa = new Map();
  let contfinal = 1000000000;
  let cont = 0;
  let keyFinal = 0;
  array.forEach((element) => {
    if (mapa.has(element)) {
      mapa.set(element, mapa.get(element) + 1);
    } else {
      mapa.set(element, 1);
    }
  });

  mapa.forEach((value, key) => {
    cont = value;
    if (cont < contfinal) {
      contfinal = cont;
      keyFinal = key;
    } else if (cont === contfinal) {
      if (key < keyFinal) {
        keyFinal = key;
      }
    }
  });
  return keyFinal;
}

let arrayFun = [1, 2, 3, 4, 2, 2, 7, 9, 1, 1, 1, 3, 4];
let resutado = contarNumeros(arrayFun);
console.log(resutado);
