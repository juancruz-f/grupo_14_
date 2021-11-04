const userNameEl = document.querySelector('#nombre');
const lastNameEl = document.querySelector('#apellido');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#password2');

const form = document.querySelector('#signup');


const checkUserName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const userName = userNameEl.value.trim();

    if (!isRequired(userName)) {
        showError(userNameEl, 'Nombre no puede estar vacío.');
    } else if (!isBetween(userName.length, min, max)) {
        showError(userNameEl, `El nombre debe tener entre ${min} y ${max} carácteres.`)
    } else {
        showSuccess(userNameEl);
        valid = true;
    }
    return valid;
};
const checkLastName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const lastName = lastNameEl.value.trim();

    if (!isRequired(lastName)) {
        showError(lastNameEl, 'Apellido no puede estar vacío.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastNameEl, `El apellido debe tener entre ${min} y ${max} carácteres.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};


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

const checkConfirmPassword = () => {
    let valid = false;
    // chequea la confirmacion de la contraseña
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Ingrese la contraseña nuevamente');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'La contraseña no coincide');
    } else {
        showSuccess(confirmPasswordEl);
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
    let isUserNameValid = checkUserName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUserNameValid && 
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

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
        case 'nombre':
            checkUserName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'password2':
            checkConfirmPassword();
            break;
    }
}));