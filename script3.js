// import class da un file esterno
import Validator from '../class/classValidator2.js';

// Utilizzo:
// new Validator('.form').validationForm;


$(document).ready(function () {
    'use strict'

    let paramForm = {
        selectorForm: "form",
        localization: 'IT',
        isAllRequired: {
            isActive: true,
            message: {
                invalidMessage: 'Il campo non può essere vuoto',
                validMessage: 'Campo convalidato'
            }
        },
        validationMail: {
            isActive: true,
            message: {
                invalidMessage: 'Inserire una email valida',
                validMessage: 'Email ok'
            }
        },
        validationPostalCode: {
            isActive: true,
            message: {
                invalidMessage: 'Postal code non valido',
                validMessage: 'Postal cod ok '
            }
        },
        validationTaxId: {
            isActive: true,
            message: {
                invalidMessage: 'Tax ID non valido',
                validMessage: 'Tax ID ok '
            }
        },
        validationPhone: {
            isActive: true,
            message: {
                invalidMessage: 'Numero di telefono non valido',
                validMessage: 'Telefono non valido '
            }
        },



    };

    var form_ship = new Validator(
        paramForm
    );
});




