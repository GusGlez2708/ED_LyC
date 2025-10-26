class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
  }
}
let listaProductos = [];

function ordenarLista() {
  listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function actualizarTabla() {
  ordenarLista();
  const tbody = document.getElementById('lista');
  tbody.innerHTML = "";
  listaProductos.forEach(prod => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prod.nombre}</td>
      <td>$${prod.precio.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  const costoTotal = listaProductos.reduce((acc,p)=>acc+p.precio,0);
  document.getElementById('costoTotal').innerHTML = `<b> Costo total:</b> $${costoTotal.toFixed(2)}`;
}

document.getElementById('formProducto').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = document.getElementById('precio').value;

  if (!nombre || isNaN(parseFloat(precio))) return;

  listaProductos.push(new Producto(nombre, precio));
  actualizarTabla();
  document.getElementById('nombre').value = "";
  document.getElementById('precio').value = "";
});

document.getElementById('formBorrar').addEventListener('submit', function(e){
  e.preventDefault();
  const clave = document.getElementById('claveEliminar').value.trim();
  const antes = listaProductos.length;
  listaProductos = listaProductos.filter(p => p.nombre.toLowerCase() !== clave.toLowerCase());
  actualizarTabla();
  document.getElementById('claveEliminar').value = '';
});

actualizarTabla();
