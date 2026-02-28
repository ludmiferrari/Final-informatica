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

//DOM
const cartaJ1 = document.querySelector('.cartaJugador1');
const cartaJ2 = document.querySelector('.cartaJugador2');
const reiniciar = document.querySelector('#boton-reiniciar');
const botonJugar = document.querySelector("#boton-jugar");
const puntajeJugador = document.querySelector('#puntaje-jugador');
const fraseDisplay = document.querySelector('#frase-texto');
const nombre0 = document.querySelector('#nombre-0');
const nombre1 = document.querySelector('#nombre-1');

function iniciarRonda() {
    // Si se acaban las frases o reiniciamos, mezclamos el mazo
    if (indiceMazo >= mazo.length) {
        indiceMazo = 0;
        mazo.sort(() => Math.random() - 0.5); 
    }

    let actual = mazo[indiceMazo];
    fraseDisplay.innerText = `"${actual.frase}"`;

    // Filtro para que la opción incorrecta no sea el mismo autor
    let posiblesIncorrectos = mazo.filter(m => m.autor !== actual.autor);
    let incorrecto = posiblesIncorrectos[Math.floor(Math.random() * posiblesIncorrectos.length)];
    
    // Mezclar las dos opciones para que la correcta no esté siempre en el mismo lado
    let opciones = [actual, incorrecto].sort(() => Math.random() - 0.5);

    // mostar tarjetas con imágenes y nombres
    cartaJ1.style.backgroundImage = `url('${opciones[0].imagen}')`;
    cartaJ1.dataset.autor = opciones[0].autor;
    nombre0.innerText = opciones[0].autor;

    cartaJ2.style.backgroundImage = `url('${opciones[1].imagen}')`;
    cartaJ2.dataset.autor = opciones[1].autor;
    nombre1.innerText = opciones[1].autor;

    // Ocultamos el botón de jugar una vez que ya empezó la partida
    botonJugar.style.display = "none";
}

function verificarRespuesta(indice) {
    if (!fraseDisplay.innerText.includes('"')) return;

    let autorCorrecto = mazo[indiceMazo].autor;
    let autorSeleccionado = (indice === 0) ? cartaJ1.dataset.autor : cartaJ2.dataset.autor;

    if (autorSeleccionado === autorCorrecto) {
        puntosJugador++;
        puntajeJugador.innerText = puntosJugador;
        indiceMazo++; 
        
        if (puntosJugador >= 5) {
            alert("¡Felicidades! Eres una verdadera Derry Girl.");
            
            //Mostramos Reiniciar y bloqueamos clics en las cartas
            reiniciar.classList.remove('d-none');
            reiniciar.disabled = false; 
            cartaJ1.style.pointerEvents = "none";
            cartaJ2.style.pointerEvents = "none";
        } else {
            iniciarRonda(); 
        }
    } else {
        alert("¡Error! Madre de Dios... 🤦‍♀️");
    }
}

// Event Listeners
botonJugar.addEventListener('click', iniciarRonda);
reiniciar.addEventListener("click", () => location.reload());
cartaJ1.addEventListener('click', () => verificarRespuesta(0));
cartaJ2.addEventListener('click', () => verificarRespuesta(1));

// Mezcla inicial al cargar la página
mazo.sort(() => Math.random() - 0.5);