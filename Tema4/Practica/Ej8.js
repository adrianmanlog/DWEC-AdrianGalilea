function diferenciaArray(array1, array2) {
  let arrayFinal = [];

  array1.forEach((elemento) => {
    if (!array2.includes(elemento)) {
      arrayFinal.push(elemento);
    }
  });
  return arrayFinal;
}

let array1 = [1, 2, 3, 4];
let array2 = [1, 2];

console.log(diferenciaArray(array1, array2));
