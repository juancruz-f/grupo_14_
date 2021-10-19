let formulario = document.forms('caja--register');

formulario.addEventListener('submit', function(event){});

formulario.onsubmit = (event) => {};




let errores = [];
let campoNombre = document.querySelector("imput.nombre");
if (campoNombre.value == "") {
    alert("El campo nombre no debe estar vacío")
}
if (errores.length > 0){
    event.preventDefault();
}


