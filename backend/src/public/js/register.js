import { showErrorMessage, showSuccessMessage } from "./swalfire.js";

const socket = io();

const form = document.getElementById('formRegister');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);

    const obj = {};
    dataForm.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            showSuccessMessage('Usuario creado', "Iniciar Sesion")
                .then(() => {
                    window.location.replace('/static/login');
                });
        } else {
            showErrorMessage('Error al crear usuario');
        }
    })
    e.target.reset();
})