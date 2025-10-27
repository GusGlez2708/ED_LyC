function reemplazarPila(pila, nuevo, viejo) {
  // Simulamos la pila: arreglo, el tope es el final
  let nuevaPila = [];
  for (let i = 0; i < pila.length; i++) {
    if (pila[i] === viejo) {
      nuevaPila.push(nuevo);
    } else {
      nuevaPila.push(pila[i]);
    }
  }
  return nuevaPila;
}

document.getElementById('formPila').addEventListener('submit', function(e){
  e.preventDefault();
  let numerosStr = document.getElementById('pilaValores').value.trim();
  let viejo = parseInt(document.getElementById('viejo').value, 10);
  let nuevo = parseInt(document.getElementById('nuevo').value, 10);

  let pila = numerosStr.split(',').map(x => parseInt(x.trim(),10)).filter(x => !isNaN(x));
  if (pila.length === 0) {
    document.getElementById('resultadoPila').innerText = "¡Debes ingresar números válidos!";
    return;
  }

  // Validar que el valor viejo exista en la pila original
  if (!pila.includes(viejo)) {
    document.getElementById('resultadoPila').innerText = "El valor a reemplazar no existe en la pila original.";
    return;
  }

  let pilaAntes = [...pila];
  let pilaDespues = reemplazarPila(pila, nuevo, viejo);
  document.getElementById('resultadoPila').innerHTML =
    `<b>Pila antes:</b> ${pilaAntes.join(', ')}<br><b>Pila después:</b> ${pilaDespues.join(', ')}`;
});