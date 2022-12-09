// import class da un file esterno
import Validator from '../class/classValidator.js';

// Utilizzo:
// new Validator('.form').validationForm;


// $(document).ready(function () {

//     'use strict'
//     let paramForm = {
//         selectorForm: "form",
//         localization: 'IT',
//         isAllRequired: {
//             isActive: true,
//             message: {
//                 validMessage: 'Campo convalidato (client)',
//                 invalidMessage: 'Il campo non può essere vuoto (client)'
//             }
//         },
//         validationMail: {
//             isActive: true,
//             message: {
//                 validMessage: 'Email ok (client)',
//                 invalidMessage: 'Inserire una email valida (client)'
//             }
//         },
//         validationPostalCode: {
//             isActive: true,
//             message: {
//                 validMessage: 'Postal cod ok (client)',
//                 invalidMessage: 'Postal code non valido (client)'
//             }
//         },
//         validationTaxId: {
//             isActive: true,
//             message: {
//                 validMessage: 'Tax ID ok (client) ',
//                 invalidMessage: 'Tax ID non valido (client)'
//             }
//         },
//         validationPhone: {
//             isActive: true,
//             // normalizationNumber: anche se vengono inseriti valori non numerici o caratteri speciali la funzione li escluderà andando a controllare solo i numeri
//             normalizationNumber: false,

//             // accettiamo che l'utente inserisca un prefisso internazionale nel numero
//             acceptNumberWithInternationalCode: true,

//             // eliminiamo dal value il prefisso internazionale (se validato in precedenza) per tornare il numero senza  di esso
//             cutPrefixInternationalToResault: true,

//             // validiamo il prefisso della compagnia telefonica o della regione
//             validationPrefixCompanyPhoneOrRegion: true,

//             // validazione del length parametro preso nell'oggetto objLocalizationPath
//             validationLength: true,



//             message: {
//                 validMessage: 'Telefono valido (client)',
//                 invalidMessage: 'Numero di telefono non valido (client)',
//                 errorLengthMessage: 'lunghezza minima dei caratteri x massima y (client)',
//                 errorPrefixCompanyRegion: 'il numero inserito non è valido causa prefisso regionale o company phone non valido (client)',
//             }
//         },



//     };

//     $(paramForm.selectorForm).submit((e) => {
//         let isValidForm = new Validator(paramForm, e).validationForm


//         if (!isValidForm) {

//             e.preventDefault();
//             e.stopPropagation();
//             console.log('errore')


//         } else {
//             e.preventDefault();
//             e.stopPropagation();

//         }







//     })
// });



$(document).ready(function () {


    var fieldCompare = [$('input[data-validate-type="email"]'), $('input[data-validate-type="email-confirm"]')]

    console.log('fieldCompare', fieldCompare)
})