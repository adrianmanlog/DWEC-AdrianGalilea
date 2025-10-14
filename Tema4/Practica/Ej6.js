let contFinal = 0;
function EJ6(numerin) {
  let cont1 = 0;
  let numeroString = numerin.toString();
  let partes = numeroString.split("", numeroString.lenght);

  if (partes.length > 1) {
    contFinal++;
    partes.forEach((element) => {
      if (cont1 === 0) {
        cont1 = element;
      } else {
        cont1 *= element;
      }
    });
    return EJ6(cont1);
  } else {
    return contFinal;
  }
}

console.log(EJ6(999));
