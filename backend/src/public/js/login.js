import { showSuccessMessage, showErrorMessage } from './swalfire.js';

const form = document.getElementById('formLogin');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);

    const obj = {};

    dataForm.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json())
        .then(json => {
            if (json.resultado === 'Login valido') {
                showSuccessMessage(json.resultado, "Acceder")
                    .then(() => {
                        window.location.replace('/static/home');
                    });
            } else {
                showErrorMessage(json.resultado);
            }
        })
})