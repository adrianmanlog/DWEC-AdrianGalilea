/*Ejercicio colorear triángulo
Un triángulo de color se crea a partir de una fila de colores, cada uno de los
cuales es rojo, verde o azul. Las filas sucesivas, cada una con un color
menos que la anterior, se generan considerando los dos colores que se
tocan en la fila anterior.
Si estos colores son idénticos, se utiliza el mismo color en la nueva fila. Si
son diferentes, se utiliza el color que falta en la nueva fila. Así se continúa
hasta que se genera la última fila, con un solo color.*/
function triangulo(colores) {
  const n = colores.length;
  const tabla = Array.from({ length: n }, () => Array(n).fill(""));

  // Rellenar la primera fila de la tabla con los colores iniciales
  for (let i = 0; i < n; i++) {
    tabla[0][i] = colores[i];
  }

  // Generar las filas sucesivas
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      const color1 = tabla[i - 1][j];
      const color2 = tabla[i - 1][j + 1];
      if (color1 === color2) {
        tabla[i][j] = color1;
      } else {
        tabla[i][j] = ["rojo", "verde", "azul"].find(
          (c) => c !== color1 && c !== color2
        );
      }
    }
  }

  return tabla;
}
console.log(triangulo(["rojo", "verde", "azul", "rojo", "verde"]));
