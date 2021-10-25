
const emailEl = document.querySelector('#mail');
const passwordEl = document.querySelector('#contrasenia');


const form = document.querySelector('#signup');





const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'El email no puede estar en blanco.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'El email no es válido.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Debes ingresar una contraseña');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'La contraseña debe tener al menos 8 caracteres que incluyan al menos 1 carácter en minúscula, 1 carácter en mayúscula, 1 número y 1 carácter especial en (! @ # $% ^ & *)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};



const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // atrapas el elemento form-field
    const formField = input.parentElement;
    // añade la clase error
    formField.classList.remove('success');
    formField.classList.add('error');

    // muestra el mensaje de error
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // atrapas el elemento form-field
    const formField = input.parentElement;

    // remueve la clase error y añade success
    formField.classList.remove('error');
    formField.classList.add('success');

    // oculta el mensaje de error
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // previene el submit del formulario
    e.preventDefault();

    // validan los campos
    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();
       
    let isFormValid = isEmailValid &&
    
    isPasswordValid

    // hace el submit si el formulario es valido
    if (isFormValid) {

    }
});

// pone un delay en los colores
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancela el timer anterior
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // añade un nuevo timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
      
    }
}));