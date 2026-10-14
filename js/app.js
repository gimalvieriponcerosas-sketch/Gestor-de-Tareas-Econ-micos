const formulario = document.getElementById("formulario-tarea");
const campoTitulo = document.getElementById("titulo");
const campoResponsable = document.getElementById("responsable");
const listaTareas = document.getElementById("lista-tareas");
const contador = document.getElementById("contador");

let tareas = [];
let siguienteId = 1;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const responsable = campoResponsable.value.trim();

    if (!titulo || !responsable) {
        alert("Completa el título y el responsable.");
        return;
    }

    tareas.push({
        id: siguienteId++,
        titulo,
        responsable,
        completada: false
    });

    formulario.reset();
    mostrarTareas();
});

function mostrarTareas() {
    listaTareas.replaceChildren();

    if (tareas.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay tareas registradas.";
        listaTareas.appendChild(mensaje);
    }

    tareas.forEach(function (tarea) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarea";

        if (tarea.completada) {
            tarjeta.classList.add("completada");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarea.titulo;

        const responsable = document.createElement("p");
        responsable.textContent = "Responsable: " + tarea.responsable;

        const estado = document.createElement("p");
        estado.textContent = tarea.completada
            ? "Estado: Completada"
            : "Estado: Pendiente";

        const acciones = document.createElement("div");
        acciones.className = "acciones";

        const completar = document.createElement("button");
        completar.textContent = tarea.completada
            ? "Marcar pendiente"
            : "Completar";

        completar.addEventListener("click", function () {
            tarea.completada = !tarea.completada;
            mostrarTareas();
        });

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.className = "btn-eliminar";

        eliminar.addEventListener("click", function () {
            tareas = tareas.filter(item => item.id !== tarea.id);
            mostrarTareas();
        });

        acciones.append(completar, eliminar);
        tarjeta.append(titulo, responsable, estado, acciones);
        listaTareas.appendChild(tarjeta);
    });

    contador.textContent = "Total de tareas: " + tareas.length;
}