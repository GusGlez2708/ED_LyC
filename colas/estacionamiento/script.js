class Auto {
  constructor(placas, propietario, horaEntrada) {
    this.placas = placas;
    this.propietario = propietario;
    this.horaEntrada = horaEntrada;
  }
}

class Estacionamiento {
  constructor() {
    this.cola = [];
  }
  entrada(auto) {
    this.cola.push(auto);
  }
  salida() {
    return this.cola.length > 0 ? this.cola.shift() : null;
  }
  autos() {
    return this.cola;
  }
}

const estacionamiento = new Estacionamiento();

function formatearHora(date) {
  return date.toLocaleTimeString();
}

function actualizarTabla() {
  const tbody = document.getElementById('listaAutos');
  tbody.innerHTML = "";
  estacionamiento.autos().forEach(auto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${auto.placas}</td>
      <td>${auto.propietario}</td>
      <td>${formatearHora(auto.horaEntrada)}</td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById('formEntrada').addEventListener('submit', function(e){
  e.preventDefault();
  const placas = document.getElementById('placas').value.trim().toUpperCase();
  const propietario = document.getElementById('propietario').value.trim();
  if (!placas || !propietario) return;

  const horaEntrada = new Date();
  const auto = new Auto(placas, propietario, horaEntrada);
  estacionamiento.entrada(auto);

  actualizarTabla();

  document.getElementById('placas').value = '';
  document.getElementById('propietario').value = '';
  document.getElementById('infoSalida').innerText = '';
});

document.getElementById('salidaBtn').addEventListener('click', function(){
  const auto = estacionamiento.salida();
  if (!auto) {
    document.getElementById('infoSalida').innerText = 'No hay autos para salir.';
    return;
  }
  const horaSalida = new Date();
  const segundos = Math.max(1, Math.floor((horaSalida - auto.horaEntrada) / 1000));
  const costo = segundos * 2;
  document.getElementById('infoSalida').innerText =
    `Auto: ${auto.placas} | Propietario: ${auto.propietario}\n` +
    `Entrada: ${formatearHora(auto.horaEntrada)}\n` +
    `Salida: ${formatearHora(horaSalida)}\n` +
    `Tiempo: ${segundos}s | Total: $${costo}.00 MXN`;
  actualizarTabla();
});

actualizarTabla();
