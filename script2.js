// import class da un file esterno
import User from '../class/userClass.js';

// Utilizzo:
$(document).ready(function () {
    'use strict'

    $(".form").submit(function (e) {

        e.preventDefault();

        $(".form input").each(function (index, items) {
            //^ controlliamo che valore è richiesto nel labeel e attiviamo la validazione di riferimento 
            const isValid = new User(items).cLog();


            console.log('isValid?', isValid)
            //^ cambiamo la classe sul front end in basse all check della funzione utilizzando bootstrap

        });
    });
});


