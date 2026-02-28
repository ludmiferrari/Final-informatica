let mazo = [
    {   
        frase: "Llegar tarde por un asesinato no es excusa.", 
        autor: "Hermana Michael", 
        imagen: "../img/hermanamichael.jpg" 
    },
    { 
        frase: "No me importa la bomba, ¡pero no puedo soportar el tráfico!", 
        autor: "Tía Sarah", 
        imagen: "../img/tiasarah.jpg" 
    },
    { 
        frase: "Soy una pequeña lesbiana ansiosa.", 
        autor: "Clare Devlin", 
        imagen: "../img/clare.jpg" 
    },
    { 
        frase: "¡Si alguien intenta tocar mi comida, le morderé la cara!", 
        autor: "Orla McCool", 
        imagen: "../img/orla.jpg" 
    },
    { 
        frase: "Llegarás lejos en la vida, Jenny, pero no serás muy querida.", 
        autor: "Hermana Michael", 
        imagen: "../img/hermanamichael.jpg" 
    },
    { 
        frase: "¡Cristo, pero estoy sudando como una prostituta en misa!", 
        autor: "Michelle Mallon", 
        imagen: "../img/michelle.jpg" 
    },
    { 
        frase: "No puedes llamar a la línea infantil cada vez que tu madre te amenace con matarte.", 
        autor: "Michelle Mallon", 
        imagen: "../img/michelle.jpg" 
    },
    { 
        frase: "No me importa un poco de brisa, si acaso la prefiero. Pero aquello era agresivo.", 
        autor: "Tío Colm", 
        imagen: "../img/tiocolm.jpg" 
    },
    { 
        frase: "¡Macaulay Culkin no es protestante, mamá!", 
        autor: "Erin Quinn", 
        imagen: "../img/erin.jpg" 
    },
    { 
        frase: "Ahora eres una Derry Girl", 
        autor: "Michelle Mallon", 
        imagen: "../img/michelle.jpg" 
    },
    { 
        frase: "¿Cuántas hostias crees que tendrías que tragar para comerte a un Jesús entero?", 
        autor: "Michelle Mallon", 
        imagen: "../img/michelle.jpg" 
    },
    { 
        frase: "Si eres así de guapa, al menos deberías tener la decencia de ser un poco tonta.", 
        autor: "Erin Quinn", 
        imagen: "../img/erin.jpg" 
    }
];

let indiceMazo = 0;
let puntosJugador = 0;

// Referencias al DOM con querySelector
const cartaJ1 = document.querySelector('.cartaJugador1');
const cartaJ2 = document.querySelector('.cartaJugador2');
const reiniciar = document.querySelector('#boton-reiniciar');
const botonJugar = document.querySelector("#boton-jugar");
const puntajeJugador = document.querySelector('#puntaje-jugador');
const fraseDisplay = document.querySelector('#frase-texto');
const nombre0 = document.querySelector('#nombre-0');
const nombre1 = document.querySelector('#nombre-1');

function iniciarRonda() {
    // Si se acaban las frases, volvemos a empezar
    if (indiceMazo >= mazo.length) {
        indiceMazo = 0;
        mazo.sort(() => Math.random() - 0.5); // Mezclamos el mazo al reiniciar
    }

    let actual = mazo[indiceMazo];
    fraseDisplay.innerText = `"${actual.frase}"`;
    
    // --- SOLUCIÓN AL PROBLEMA DE LA HERMANA MICHAEL ---
    // Filtramos todos los personajes que NO son el autor correcto
    let posiblesIncorrectos = mazo.filter(m => m.autor !== actual.autor);
    
    // Elegimos uno de esos de forma aleatoria
    let incorrecto = posiblesIncorrectos[Math.floor(Math.random() * posiblesIncorrectos.length)];
    
    // Mezclamos las dos opciones (correcta e incorrecta)
    let opciones = [actual, incorrecto].sort(() => Math.random() - 0.5);

    // Renderizar tarjeta 1
    cartaJ1.style.backgroundImage = `url('${opciones[0].imagen}')`;
    cartaJ1.dataset.autor = opciones[0].autor;
    nombre0.innerText = opciones[0].autor;

    // Renderizar tarjeta 2
    cartaJ2.style.backgroundImage = `url('${opciones[1].imagen}')`;
    cartaJ2.dataset.autor = opciones[1].autor;
    nombre1.innerText = opciones[1].autor;

    botonJugar.innerText = "Siguiente frase";
}

function verificarRespuesta(indice) {
    // Evita errores si hacen clic antes de empezar
    if (!fraseDisplay.innerText.includes('"')) return;

    let autorCorrecto = mazo[indiceMazo].autor;
    let autorSeleccionado = (indice === 0) ? cartaJ1.dataset.autor : cartaJ2.dataset.autor;

    if (autorSeleccionado === autorCorrecto) {
        puntosJugador++;
        puntajeJugador.innerText = puntosJugador;
        indiceMazo++; // Pasamos a la siguiente frase del mazo
        
        if (puntosJugador >= 5) {
            alert("¡Felicidades! Eres una verdadera Derry Girl. 🇮🇪");
            reiniciar.disabled = false;
            botonJugar.disabled = true;
        } else {
            iniciarRonda(); // Siguiente frase sin alert
        }
    } else {
        alert("¡Error! Madre de Dios... 🤦‍♀️");
        // No sumamos puntos ni avanzamos el índice para que lo intente de nuevo
    }
}

// Event Listeners
botonJugar.addEventListener('click', iniciarRonda);
reiniciar.addEventListener("click", () => location.reload());
cartaJ1.addEventListener('click', () => verificarRespuesta(0));
cartaJ2.addEventListener('click', () => verificarRespuesta(1));

// Mezcla el mazo completo apenas carga el juego
mazo.sort(() => Math.random() - 0.5);