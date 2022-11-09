// import class da un file esterno
import Validator from '../class/classValidator.js';

// Utilizzo:
// new Validator('.form').validationForm;


$(document).ready(function () {
    'use strict'
    $(".form").submit(function (e) {
        e.preventDefault();
        $(".form input").each(function (index, items) {
            let isValid = false
            if (items.value) {
                isValid = new Validator(items, 'IT').validationForm;
            }
            $(items).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
        });
    });
});




