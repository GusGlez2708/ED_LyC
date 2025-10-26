document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const formCliente = document.getElementById('formCliente');
    const nombreClienteInput = document.getElementById('nombreCliente');
    const tipoMovimientoSelect = document.getElementById('tipoMovimiento');
    const atenderBtn = document.getElementById('atenderBtn');
    const tablaClientes = document.getElementById('tablaClientes');
    const frenteColaSpan = document.getElementById('frenteCola');
    const finalColaSpan = document.getElementById('finalCola');

    // Elementos del Modal
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalAcceptBtn = document.getElementById('modal-accept-btn');

    // Estado de la aplicación
    let colaClientes = [];
    let turnoCounter = 0;
    const MAX_CLIENTES = 10; // Límite de la cola

    class Cliente {
        constructor(turno, nombre, tipoMovimiento, horaLlegada) {
            this.turno = turno;
            this.nombre = nombre;
            this.tipoMovimiento = tipoMovimiento;
            this.horaLlegada = horaLlegada;
        }
    }

    // --- Lógica del Modal ---
    const showModal = (title, bodyContent) => {
        modalTitle.textContent = title;
        modalBody.innerHTML = bodyContent;
        modalBackdrop.style.display = 'flex';
    };

    const hideModal = () => {
        modalBackdrop.style.display = 'none';
    };

    modalAcceptBtn.addEventListener('click', hideModal);

    // --- Métodos de la Cola ---
    const colaLlena = () => colaClientes.length >= MAX_CLIENTES;
    const colaVacia = () => colaClientes.length === 0;

    const actualizarVista = () => {
        tablaClientes.innerHTML = '';
        colaClientes.forEach(cliente => {
            const fila = tablaClientes.insertRow();
            fila.innerHTML = `
                <td>${cliente.turno}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.tipoMovimiento}</td>
                <td>${cliente.horaLlegada.toLocaleTimeString()}</td>
            `;
        });

        frenteColaSpan.textContent = !colaVacia() ? `${colaClientes[0].nombre} (Turno ${colaClientes[0].turno})` : 'N/A';
        finalColaSpan.textContent = !colaVacia() ? `${colaClientes[colaClientes.length - 1].nombre} (Turno ${colaClientes[colaClientes.length - 1].turno})` : 'N/A';
    };

    // --- Event Listeners ---
    formCliente.addEventListener('submit', (e) => {
        e.preventDefault();

        if (colaLlena()) {
            // Esta alerta se mantiene como la original, según lo pedido
            alert('Error de sobreflujo: La cola del banco está llena. Por favor, espere.');
            return;
        }

        const nombre = nombreClienteInput.value.trim();
        const tipoMovimiento = tipoMovimientoSelect.value;

        // Las validaciones de campos vacíos y patrón las maneja el navegador

        turnoCounter++;
        const horaLlegada = new Date();
        const nuevoCliente = new Cliente(turnoCounter, nombre, tipoMovimiento, horaLlegada);

        colaClientes.push(nuevoCliente);
        actualizarVista(); // Actualizar la tabla ANTES de mostrar el modal

        const modalContent = `
            <p><strong>No. Turno:</strong> ${nuevoCliente.turno}</p>
            <p><strong>Nombre:</strong> ${nuevoCliente.nombre}</p>
            <p><strong>Tipo de movimiento:</strong> ${nuevoCliente.tipoMovimiento}</p>
            <p><strong>Hora de llegada:</strong> ${nuevoCliente.horaLlegada.toLocaleString()}</p>
        `;
        showModal('Cliente Formado en la Cola', modalContent);

        formCliente.reset();
        nombreClienteInput.focus();
    });

    atenderBtn.addEventListener('click', () => {
        if (colaVacia()) {
            // Esta alerta se mantiene
            alert('La cola está vacía. No hay clientes para atender.');
            return;
        }

        const clienteAtendido = colaClientes.shift();
        const horaAtencion = new Date();
        const tiempoEsperaSegundos = Math.round((horaAtencion - clienteAtendido.horaLlegada) / 1000);

        actualizarVista(); // Actualizar la tabla INMEDIATAMENTE

        const modalContent = `
            <p><strong>Tiempo de espera en la cola:</strong> ${tiempoEsperaSegundos} segundos</p>
        `;
        showModal(`Cliente Atendido: ${clienteAtendido.nombre}`, modalContent);
    });

    // --- Inyección de Estilos para el Modal ---
    const style = document.createElement('style');
    style.innerHTML = `
        .modal-backdrop {
            display: none; /* Oculto por defecto */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: var(--panel-bg);
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            width: 400px;
            max-width: 90%;
            text-align: center;
        }
        .modal-content h2 {
            font-size: 1.5rem;
            margin-top: 0;
            color: var(--accent2);
        }
        .modal-content p {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            text-align: left;
        }
        #modal-accept-btn {
            margin-top: 1.5rem;
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Inicializar
    actualizarVista();
});