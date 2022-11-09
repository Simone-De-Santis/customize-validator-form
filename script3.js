// import class da un file esterno
import Validator from '../class/classValidator2.js';

// Utilizzo:
// new Validator('.form').validationForm;


$(document).ready(function () {
    'use strict'

    let param_1 = {
        selectorForm: "form",
        foo: "bar"
    };

    var form_ship = new Validator(
        param_1.selectorForm
    );
});




