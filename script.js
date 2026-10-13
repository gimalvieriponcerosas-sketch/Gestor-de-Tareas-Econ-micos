const formulario = document.getElementById("formulario-tarea");
const campoTitulo = document.getElementById("titulo");
const campoResponsable = document.getElementById("responsable");
const listaTareas = document.getElementById("lista-tareas");
const contador = document.getElementById("contador");

// Las tareas se guardan en memoria mientras la página está abierta.
let tareas = [];
let siguienteId = 1;

// Registrar una tarea nueva.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const responsable = campoResponsable.value.trim();

    if (!titulo || !responsable) {
        alert("Completa el título y el responsable.");
        return;
    }

    const tarea = {
        id: siguienteId++,
        titulo: titulo,
        responsable: responsable,
        completada: false
    };

    tareas.push(tarea);

    formulario.reset();
    campoTitulo.focus();

    mostrarTareas();
});

// Mostrar todas las tareas en pantalla.
function mostrarTareas() {
    listaTareas.replaceChildren();

    if (tareas.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "vacio";
        mensaje.textContent = "Todavía no hay tareas registradas.";
        listaTareas.appendChild(mensaje);
    }

    tareas.forEach(function (tarea) {
        const elemento = document.createElement("article");
        elemento.className = "tarea";

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        const informacion = document.createElement("div");
        informacion.className = "info-tarea";

        const titulo = document.createElement("h3");
        titulo.textContent = tarea.titulo;

        const responsable = document.createElement("p");
        responsable.textContent = "Responsable: " + tarea.responsable;

        const estado = document.createElement("span");
        estado.className = "estado";
        estado.textContent = tarea.completada
            ? "Completada"
            : "Pendiente";

        informacion.append(titulo, responsable, estado);

        const acciones = document.createElement("div");
        acciones.className = "acciones";

        const botonCompletar = document.createElement("button");
        botonCompletar.className = "btn-completar";
        botonCompletar.textContent = tarea.completada
            ? "Reabrir"
            : "Completar";

        botonCompletar.addEventListener("click", function () {
            cambiarEstado(tarea.id);
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn-eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            eliminarTarea(tarea.id);
        });

        acciones.append(botonCompletar, botonEliminar);
        elemento.append(informacion, acciones);
        listaTareas.appendChild(elemento);
    });

    const pendientes = tareas.filter(function (tarea) {
        return !tarea.completada;
    }).length;

    contador.textContent =
        tareas.length + (tareas.length === 1 ? " tarea" : " tareas") +
        " · " + pendientes + " pendientes";
}

// Marcar una tarea como completada o volver a abrirla.
function cambiarEstado(id) {
    tareas = tareas.map(function (tarea) {
        if (tarea.id === id) {
            return {
                ...tarea,
                completada: !tarea.completada
            };
        }

        return tarea;
    });

    mostrarTareas();
}

// Eliminar una tarea.
function eliminarTarea(id) {
    tareas = tareas.filter(function (tarea) {
        return tarea.id !== id;
    });

    mostrarTareas();
}

// Dibujar el estado inicial de la aplicación.
mostrarTareas();