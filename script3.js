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
                invalidMessage: 'Il campo non può essere vuoto (client)',
                validMessage: 'Campo convalidato (client)'
            }
        },
        validationMail: {
            isActive: true,
            message: {
                invalidMessage: 'Inserire una email valida (client)',
                validMessage: 'Email ok (client)'
            }
        },
        validationPostalCode: {
            isActive: true,
            message: {
                invalidMessage: 'Postal code non valido (client)',
                validMessage: 'Postal cod ok (client)'
            }
        },
        validationTaxId: {
            isActive: true,
            message: {
                invalidMessage: 'Tax ID non valido (client)',
                validMessage: 'Tax ID ok (client) '
            }
        },
        validationPhone: {
            isActive: true,
            validationPrefixCompanyPhoneOrRegion: false,
            acceptNumberWithInternationalCode: true,
            cutPrefixInternationalToResault: false,
            // normalizationNumber: anche se vengono inseriti valori non numerici o caratteri speciali la funzione li escluderà andando a controllare solo i numeri
            normalizationNumber: false,
            message: {
                validMessage: 'Telefono valido (client)',
                invalidMessage: 'Numero di telefono non valido (client)'
            }
        },



    };

    var form_ship = new Validator(
        paramForm
    );
});




