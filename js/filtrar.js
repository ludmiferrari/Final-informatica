// Botones
let botonT = document.querySelector("#todosB");
let botonT1 = document.querySelector("#temp1B");
let botonT2 = document.querySelector("#temp2B");
let botonT3 = document.querySelector("#temp3B");

// Categorías (Elementos de la grilla)
let temporada1 = document.querySelectorAll(".temp1");
let temporada2 = document.querySelectorAll(".temp2");
let temporada3 = document.querySelectorAll(".temp3");

// Función para ocultar todo
function ocultarTodo() {
    document.querySelectorAll(".temp1, .temp2, .temp3").forEach(el => {
        el.style.display = "none";
    });
}

// Mostrar categoría seleccionada
function mostrarCategoria(categoria) {
    ocultarTodo();
    categoria.forEach(el => {
        el.style.display = "block"; 
    });
}

// Eventos
botonT1.addEventListener("click", () => mostrarCategoria(temporada1));
botonT2.addEventListener("click", () => mostrarCategoria(temporada2));
botonT3.addEventListener("click", () => mostrarCategoria(temporada3));

// Mostrar todos
botonT.addEventListener("click", () => {
    document.querySelectorAll(".temp1, .temp2, .temp3").forEach(el => {
        el.style.display = "block"; 
    });
});