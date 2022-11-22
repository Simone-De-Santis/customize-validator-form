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
                validMessage: 'Campo convalidato (client)',
                invalidMessage: 'Il campo non può essere vuoto (client)'
            }
        },
        validationMail: {
            isActive: true,
            message: {
                validMessage: 'Email ok (client)',
                invalidMessage: 'Inserire una email valida (client)'
            }
        },
        validationPostalCode: {
            isActive: true,
            message: {
                validMessage: 'Postal cod ok (client)',
                invalidMessage: 'Postal code non valido (client)'
            }
        },
        validationTaxId: {
            isActive: true,
            message: {
                validMessage: 'Tax ID ok (client) ',
                invalidMessage: 'Tax ID non valido (client)'
            }
        },
        validationPhone: {
            isActive: true,
            // normalizationNumber: anche se vengono inseriti valori non numerici o caratteri speciali la funzione li escluderà andando a controllare solo i numeri
            normalizationNumber: false,
            validationPrefixCompanyPhoneOrRegion: false,
            acceptNumberWithInternationalCode: true,
            cutPrefixInternationalToResault: true,
            message: {
                validMessage: 'Telefono valido (client)',
                invalidMessage: 'Numero di telefono non valido (client)',
                errorLengthMessage: 'lunghezza minima dei caratteri x massima y (client) ',
            }
        },



    };

    var form_ship = new Validator(
        paramForm
    );
});




