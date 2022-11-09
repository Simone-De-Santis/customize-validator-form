import { postalCodeRegex } from './regex/postalCodeRegex.js';
import { taxIdRegex } from './regex/taxIdRegex.js';
import { objLocalizationPath } from './path/localizationPath.js';


export default function (params) {

    let param_x = 1;

    let param_y = {
        1: "a",
        2: "b"
    };

    this.init = function (param) {
        $(param).submit(function (e) {
            e.preventDefault();
            console.log('event', e.target[1])
        })
        console.log(param);

        // todo: Add try catch statement
        // Popolo la struttura dello shipment con i dati  ricevuti
        $.extend(params);

        this.funzione("test");

    };

    this.funzione = function (foo) {

        //.....

    }


    this.init(params);
    return this;
};




// $(document).ready(function () {

//     let param_1 = {
//         john: "doe",
//         foo: "bar"
//     };

//     var form_ship = new esempioClasse(
//         param_1
//     );

// });






