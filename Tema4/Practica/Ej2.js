function pinCorrecto(pin) {
  if (pin.length === 4 || pin.length === 6) {
    return true;
  } else {
    return false;
  }
}

console.log(pinCorrecto("4567"));
