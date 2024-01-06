const socket = io();

const botonChat = document.querySelector('#botonChat');
const parrafosMensajes = document.querySelector('#parrafosMensajes');
const valInput = document.querySelector('#chatBox');

let email;
Swal.fire({
    title: 'Identificaion de usuario',
    text: 'Por favor ingrese su email',
    input: 'text',

    inputValidator: valor => {
        return !valor && 'Ingrese un email válido';
    },
    allowOutsideClick: false,
}).then(resultado => {
    email = resultado.value;
});

botonChat.addEventListener('click', () => {
    if (valInput.value.trim().length > 0) {
        socket.emit('mensaje', {
            email: email,
            message: valInput.value,
        });
        valInput.value = '';
    }
});

socket.on ('mensajes', arrayMensajes => {
    parrafosMensajes.innerHTML = '';
    arrayMensajes.forEach(msj => {
        const { email, message } = msj;
        parrafosMensajes.innerHTML += `<p>${email} escribió: </p> <p>${message}</p>`;
    });
});