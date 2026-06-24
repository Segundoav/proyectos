// Localiza el input de texto mediante su ID y lo guarda en la constante campoTarea
const campoTarea = document.getElementById("campoTarea");
// Localiza el botón de agregar mediante su ID y lo guarda en la constante btnAgregar
const btnAgregar = document.getElementById("btnAgregar");
// Localiza la lista desordenada (ul) donde se inyectarán las tareas y la guarda en listaTareas
const listaTareas = document.getElementById("listaTareas");

// Bloque de función declarativa: Se encarga de construir y empaquetar una nueva tarea en el DOM
function agregarNuevaTarea() {
    // Almacena el texto del input eliminando espacios vacíos accidentales al inicio o final con .trim()
    const textoTarea = campoTarea.value.trim();

    // Estructura Condicional (if): Verifica si el usuario intentó enviar la caja vacía
    if (textoTarea === "") {
        // Alerta nativa del navegador para indicar que debe escribir algo válido
        alert("Por favor, escribe una tarea antes de agregar.");
        // Interrumpe la ejecución del código de la función inmediatamente
        return;
    }

    // Creación de Nodos en Tiempo Real: Genera una etiqueta <li> vacía en la memoria del navegador
    const nuevaFila = document.createElement("li");

    // Creación de Nodos para el texto: Genera un contenedor span para aislar el título de la tarea
    const contenedorTexto = document.createElement("span");
    // Asigna el texto limpio que capturamos del input dentro de este nuevo span
    contenedorTexto.innerText = textoTarea;

    // Añade un sensor de escucha al texto de la tarea para detectar si el usuario hace clic sobre él
    contenedorTexto.addEventListener("click", function() {
        // Alterna (añade si no existe, remueve si existe) la clase CSS ".completada" para tachar la tarea
        contenedorTexto.classList.toggle("completada");
    });

    // Creación del Control de Borrado: Genera un botón físico exclusivo para eliminar esta fila
    const botonEliminar = document.createElement("button");
    // Añade el texto visible del botón de destrucción
    botonEliminar.innerText = "Eliminar";
    // Asigna la clase CSS estilizada para botones rojos definidos en la hoja de estilos
    botonEliminar.className = "btn-eliminar";

    // Añade un sensor de escucha al botón de eliminación para reaccionar al clic del usuario
    botonEliminar.addEventListener("click", function() {
        // Remueve por completo el nodo <li> del árbol HTML destruyendo el elemento de la pantalla
        nuevaFila.remove();
    });

    // Ensamblaje Estructural: Introduce el span de texto dentro del nodo <li> principal
    nuevaFila.appendChild(contenedorTexto);
    // Ensamblaje Estructural: Introduce el botón de borrar al lado del texto dentro del nodo <li>
    nuevaFila.appendChild(botonEliminar);

    // Inyección Final al DOM: Inserta la fila armada al final de la lista desordenada (ul) visible en pantalla
    listaTareas.appendChild(nuevaFila);

    // Limpieza de interfaz: Borra el texto escrito por el usuario en el input dejándolo vacío para la siguiente tarea
    campoTarea.value = "";
    // Devuelve el foco del cursor automáticamente al input de texto para seguir escribiendo de forma fluida
    campoTarea.focus();
}

// Asigna un sensor de escucha al botón principal "Agregar" para ejecutar la lógica al hacer clic
btnAgregar.addEventListener("click", agregarNuevaTarea);

// Captura de Eventos de Teclado global para mejorar la experiencia de usuario
campoTarea.addEventListener("keydown", function(evento) {
    // Estructura Condicional: Verifica con precisión si la tecla física presionada fue la tecla 'Enter'
    if (evento.key === "Enter") {
        // Ejecuta la función de inserción simulando mecánicamente el clic del botón principal
        agregarNuevaTarea();
    }
});