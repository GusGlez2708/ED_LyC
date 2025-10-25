function sumarGrandes(numero1, numero2) {
  let pila1 = numero1.split('').reverse();
  let pila2 = numero2.split('').reverse();
  let resultado = [];
  let carry = 0;

  let maxLen = Math.max(pila1.length, pila2.length);

  for (let i = 0; i < maxLen; i++) {
    let n1 = parseInt(pila1[i] || '0', 10);
    let n2 = parseInt(pila2[i] || '0', 10);
    let suma = n1 + n2 + carry;
    resultado.push(suma % 10);
    carry = Math.floor(suma / 10);
  }

  if (carry > 0) resultado.push(carry);

  return resultado.reverse().join('');
}

document.getElementById('formSuma').addEventListener('submit', function(e){
  e.preventDefault();
  let num1 = document.getElementById('num1').value.trim();
  let num2 = document.getElementById('num2').value.trim();

  if (!num1.match(/^\d+$/) || !num2.match(/^\d+$/)) {
    document.getElementById('resultado').innerText = "Ingresa sólo números positivos válidos.";
    return;
  }

  const res = sumarGrandes(num1, num2);
  document.getElementById('resultado').innerText = `Resultado: ${res}`;
});
