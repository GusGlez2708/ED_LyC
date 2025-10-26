document.addEventListener('DOMContentLoaded', () => {
    const formPalabra = document.getElementById('formPalabra');
    const palabraInput = document.getElementById('palabra');
    const contenedorListas = document.getElementById('contenedorListas');
    const notificationContainer = document.getElementById('notification-container');

    let palabrasAgrupadas = {};
    let notificationTimeout;

    const showNotification = (message) => {
        clearTimeout(notificationTimeout);
        notificationContainer.textContent = message;
        notificationContainer.style.display = 'block';
        notificationTimeout = setTimeout(() => {
            notificationContainer.style.display = 'none';
        }, 3000);
    };

    const actualizarVista = () => {
        contenedorListas.innerHTML = '';
        const letras = Object.keys(palabrasAgrupadas).sort();

        letras.forEach(letra => {
            const divLista = document.createElement('div');
            divLista.classList.add('lista-palabras');

            const titulo = document.createElement('h2');
            titulo.textContent = `Palabras que empiezan con "${letra}"`;
            divLista.appendChild(titulo);

            const lista = document.createElement('p');
            lista.textContent = palabrasAgrupadas[letra].join(', ');
            divLista.appendChild(lista);

            contenedorListas.appendChild(divLista);
        });
    };

    formPalabra.addEventListener('submit', (e) => {
        e.preventDefault();
        const palabra = palabraInput.value.trim();
        const primeraLetra = palabra.charAt(0).toUpperCase();

        if (!palabrasAgrupadas[primeraLetra]) {
            palabrasAgrupadas[primeraLetra] = [];
        }

        if (!palabrasAgrupadas[primeraLetra].includes(palabra)) {
            palabrasAgrupadas[primeraLetra].push(palabra);
            palabrasAgrupadas[primeraLetra].sort();
        } else {
            showNotification(`La palabra "${palabra}" ya ha sido agregada.`);
        }

        actualizarVista();
        palabraInput.value = '';
        palabraInput.focus();
    });

    const style = document.createElement('style');
    style.innerHTML = `
        #notification-container {
            display: none; /* Oculto por defecto */
            background-color: #e2b822; /* Tono amarillo */
            color: #15181b; /* Texto oscuro para contraste */
            padding: 0.8rem 1rem;
            border-radius: var(--border-radius);
            margin-bottom: 1rem;
            width: 100%;
            text-align: center;
            font-weight: 700;
            box-sizing: border-box;
        }
        .lista-palabras {
            margin-top: 1.5rem;
            padding: 1rem;
            background: #1c1f23;
            border-radius: var(--border-radius);
            width: 100%;
        }
        .lista-palabras h2 {
            font-size: 1.2rem;
            color: var(--accent2);
            margin-bottom: 0.5rem;
        }
        .lista-palabras p {
            font-size: 1rem;
            word-break: break-word;
        }
    `;
    document.head.appendChild(style);

    actualizarVista();
});