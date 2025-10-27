document.addEventListener('DOMContentLoaded', () => {
    const agregarBtn = document.getElementById('agregarBtn');
    const tablaDisponibles = document.getElementById('tablaDisponibles');
    const tablaRetirados = document.getElementById('tablaRetirados');
    const disponiblesCount = document.getElementById('disponiblesCount');
    const retiradosCount = document.getElementById('retiradosCount');

    let productosDisponibles = [];
    let productosRetirados = [];
    let contadorProductos = 0;

    class Producto {
        constructor(nombre, cantidad, precio) {
            this.nombre = nombre;
            this.cantidad = cantidad;
            this.precio = precio;
        }
    }

    const actualizarVista = () => {
        tablaDisponibles.innerHTML = '';
        tablaRetirados.innerHTML = '';

        productosDisponibles.forEach((producto, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><button class="retirar-btn" data-index="${index}">Retirar</button></td>
            `;
            tablaDisponibles.appendChild(fila);
        });

        productosRetirados.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio.toFixed(2)}</td>
            `;
            tablaRetirados.appendChild(fila);
        });

        disponiblesCount.textContent = productosDisponibles.length;
        retiradosCount.textContent = productosRetirados.length;

        document.querySelectorAll('.retirar-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                retirarProducto(index);
            });
        });
    };

    const agregarProducto = () => {
        contadorProductos++;
        const nombre = `Producto ${contadorProductos}`;
        const cantidad = Math.floor(Math.random() * 100) + 1; 
        const precio = Math.random() * 500 + 10; 

        const nuevoProducto = new Producto(nombre, cantidad, precio);
        productosDisponibles.push(nuevoProducto);
        actualizarVista();
    };

    const retirarProducto = (index) => {
        if (index >= 0 && index < productosDisponibles.length) {
            const [productoRetirado] = productosDisponibles.splice(index, 1);
            productosRetirados.push(productoRetirado);
            actualizarVista();
        }
    };

    agregarBtn.addEventListener('click', agregarProducto);

    actualizarVista();
});