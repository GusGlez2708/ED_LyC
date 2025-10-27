document.addEventListener('DOMContentLoaded', () => {
    const formAlumno = document.getElementById('formAlumno');
    const nombreInput = document.getElementById('nombre');
    const calificacionInput = document.getElementById('calificacion');
    const tablaAprobados = document.getElementById('tablaAprobados');
    const tablaReprobados = document.getElementById('tablaReprobados');

    let todosLosAlumnos = [];

    class Alumno {
        constructor(nombre, calificacion) {
            this.nombre = nombre;
            this.calificacion = calificacion;
        }
    }

    const actualizarListas = () => {
        
        tablaAprobados.innerHTML = '';
        tablaReprobados.innerHTML = '';

        const aprobados = todosLosAlumnos.filter(alumno => alumno.calificacion >= 7);
        const reprobados = todosLosAlumnos.filter(alumno => alumno.calificacion < 7);

        aprobados.forEach(alumno => {
            const fila = tablaAprobados.insertRow();
            fila.innerHTML = `<td>${alumno.nombre}</td><td>${alumno.calificacion}</td>`;
        });

        reprobados.forEach(alumno => {
            const fila = tablaReprobados.insertRow();
            fila.innerHTML = `<td>${alumno.nombre}</td><td>${alumno.calificacion}</td>`;
        });
    };

    formAlumno.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const calificacionValue = calificacionInput.value;

       
        if (nombre === '') {
            alert('Por favor, ingrese el nombre del alumno.');
            return;
        }
        if (calificacionValue === '') {
            alert('Por favor, ingrese la calificación.');
            return;
        }

        const calificacion = parseFloat(calificacionValue);

        if (isNaN(calificacion)) {
            alert('La calificación debe ser un número.');
            return;
        }

        if (calificacion < 0 || calificacion > 10) {
            alert('La calificación debe estar en un rango de 0 a 10.');
            return;
        }

        const nuevoAlumno = new Alumno(nombre, calificacion);
        todosLosAlumnos.push(nuevoAlumno);

        actualizarListas();

       
        nombreInput.value = '';
        calificacionInput.value = '';
        nombreInput.focus();
    });

    
    actualizarListas();
});