
/*SELECCIÓN DE ELEMENTOS DEL DOM */

let contactForm = document.querySelector('#contactForm');
let nameInput = document.querySelector('#name');
let nameValidation = document.querySelector('#nameValidation');
let emailInput = document.querySelector('#email');
let emailValidation = document.querySelector('#emailValidation');
let subjectInput = document.querySelector('#subject');
let subjectValidation = document.querySelector('#subjectValidation');
let messageInput = document.querySelector('#message');
let messageValidation = document.querySelector('#messageValidation');
const messageBox = document.querySelector('#messageBox');
const inputs = [nameInput, emailInput, subjectInput, messageInput];



const validateInput = (input, validationElement, validationFunction) => {
    const isValid = validationFunction(input.value.trim());

    if (!isValid) {
        //validamos campos
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.remove('is-invalid');
        //se quita la clase is invalid se agrega la clase is valid para que aparezaca que el cmapo esta correcto en verde
        input.classList.add('is-valid'); 
    }
    return isValid;
};

//validaciones individuales
const validateName = () => validateInput(nameInput, nameValidation, (name) => name !== '');
const validateEmail = () => validateInput(emailInput, emailValidation, (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
//validamos que el mail sea algo asi algo@algo.algo
const validateSubject = () => validateInput(subjectInput, subjectValidation, (subject) => subject !== '');
const validateMessage = () => validateInput(messageInput, messageValidation, (message) => message !== '');

const validateForm = () => {
    //La función solo retorna true si TODAS las validaciones individuales (validateName, validateEmail, etc.) retornan true
    return validateName() && validateEmail() && validateSubject() && validateMessage(); 
};

contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // paramos la funcion predeterminada del navegador (evitamos que se recargue la página).
    messageBox.classList.add('d-none');// mensaje de exito 

    if (validateForm()) {

        messageBox.classList.remove('d-none'); 
        this.reset(); // limiamos todos los campos del formulario
        
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');// sacamos las validaciones de los campos (rojo/verde)
        });

        setTimeout(() => {
            messageBox.classList.add('d-none');
        }, 5000);
    }
});


inputs.forEach(input => {
    input.addEventListener('input', function () {
        switch (input.id) {
            //llamamos a las validaciones
            case 'name':
                validateName();
                break;
            case 'email':
                validateEmail();
                break;
            case 'subject':
                validateSubject();
                break;
            case 'message':
                validateMessage();
                break;
            default:
                break;
        }
        //feedback visual (rojo/verde) al usuario en tiempo real.
    });
});



