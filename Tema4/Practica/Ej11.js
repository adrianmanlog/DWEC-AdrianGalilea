function mostrarCuatroCuadrados(n) {
  const lim = Math.floor(Math.sqrt(n));
  for (let i = 0; i <= lim; i++) {
    for (let j = 0; j <= lim; j++) {
      for (let k = 0; k <= lim; k++) {
        for (let l = 0; l <= lim; l++) {
          if (i * i + j * j + k * k + l * l === n) {
            const arr = [i, j, k, l].sort((a, b) => a - b);
            console.log(arr.map((x) => `${x}^2`).join(",") + "*");
            return;
          }
        }
      }
    }
  }
  console.log("No se encontró solución");
}

mostrarCuatroCuadrados(31);
