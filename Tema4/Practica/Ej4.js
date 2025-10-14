function contarNumeros(array) {
  const mapa = new Map();
  let contfinal = 1000000000;
  let cont = 0;
  let keyFinal = 0;
  let arrayImpares = [];

  array.forEach((element) => {
    if (mapa.has(element)) {
      mapa.set(element, mapa.get(element) + 1);
    } else {
      mapa.set(element, 1);
    }
  });

  mapa.forEach((value, key) => {
    cont = value;
    keyFinal = key;
    if (value % 2 != 0) {
      arrayImpares.push(key);
    }
  });
  return arrayImpares;
}

let arrayFun = [1, 2, 3, 4, 2, 2, 7, 9, 1, 1, 1, 3, 4, 7, 9];
let resutado = contarNumeros(arrayFun);
console.log(resutado);
