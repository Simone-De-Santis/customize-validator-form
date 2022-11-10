import { postalCodeRegex } from './regex/postalCodeRegex.js';
import { taxIdRegex } from './regex/taxIdRegex.js';
import { objLocalizationPath } from './path/localizationPath.js';


export default function (params, testo) {

    // let param_x = 1;

    // let param_y = {
    //     1: "a",
    //     2: "b"
    // };
    // # 1- intercettiamo l'evento submit di una form il quale "selettore" verrà passato alla classe come partametro
    //# 2- attuiamo un primo controllo sul length del valore e restituiamo un errore custom


    this.init = function (param) {
        $(param.selectorForm).submit(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $.each(e.target, function (index, element) {
                let isValid = true;
                let country = param.localization
                let elVal = $.trim(element.value)
                //! Se viene settato che tutti i campi devono essere required
                if (param.isAllRequired.isActive) {
                    if (!$.trim(element.value)) {
                        e.preventDefault();
                        e.stopPropagation();
                        isValid = false;
                        // scriviamo il messaaggio di errore Custom all'interno del div invalid-feedback
                        setMessage(element, isValid, param.isAllRequired)
                    } else {
                        isValid = true
                        setMessage(element, isValid, param.isAllRequired)
                    }
                }
                //!  Controllo email 
                if (param.validationMail.isActive && element.getAttribute("data-validate-type") == 'email' && elVal) {
                    isValid = validationEmail(elVal);
                    setMessage(element, isValid, param.validationMail)
                }
                //! Postal code
                if (param.validationPostalCode.isActive && element.getAttribute("data-validate-type") == 'postalCode' && elVal) {
                    isValid = checkPostalCode(elVal, country);
                    setMessage(element, isValid, param.validationPostalCode)
                }
                //! TaxId
                if (param.validationTaxId.isActive && element.getAttribute("data-validate-type") == 'taxId' && elVal) {
                    isValid = checkTaxId(elVal, country);
                    setMessage(element, isValid, param.validationTaxId)
                }
                //! Validazione numero di telefono
                if (param.validationPhone.isActive && element.getAttribute("data-validate-type") == 'phone' && elVal) {
                    isValid = validationPhonNumber(elVal, country, element.getAttribute("data-value-type"), param.validationPhone);
                    setMessage(element, isValid, param.validationPhone)
                }




                toggleClass(element, isValid)

                console.log('element', element)
            })
            console.log('event', e.target)





        })
        // console.log(param);

        // todo: Add try catch statement
        // Popolo la struttura dello shipment con i dati  ricevuti
        // $.extend(params);

        // this.funzione("test");


    };


    function log(testo) {
        console.log('aa')
    }
    // assegniamo la classe is-invalid all campo che non ha passato la validazione
    function toggleClass(el, isValid) {
        $(el).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
    }
    function setMessage(el, isValid, ValidationCase) {
        // console.log('start', $(el).nextAll('.invalid-feedback'));

        isValid ? $(el).nextAll('.valid-feedback').html(`${ValidationCase.message.validMessage}`) : $(el).nextAll('.invalid-feedback').html(`${ValidationCase.message.invalidMessage}`)

    }

    //# Metodi

    //^ sanitize number

    /**
     * @todo La funzione prende un valore e lo restituisce se è uguale a zero o se è un numero
     * @todo Funzione usata in concomitanza di un filter
     * 
     * @param  {*} value 
     * @return valore che ha passato il controllo
     * 
     * @author Enomis
     * @version 1.0
    */
    function filterNumberNotZero(value) {
        if (value == '0') {
            return value
        } else if (Number(value)) {
            return value
        } else {
            return
        }
    }


    //^ validazione numero di telefono
    /**
  * @todo funzione unica per il check dei prefissi per cellular e per home
  * @param  {Array} arr array con tutti i valori inseriti nei campi cellular o homPhone
  * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..) che utilizzeremo per navigare nell'oggetto di validazione e rilevare il campo da validare
  * @param  {string} type stringa passata dal data attribute dell'elemento che useremo per navigare nell'oggetto di validazione
  * @return {boolean} isValid valore di ritorno se l'array ha passato la validazione (TRUE||FALSE)
  * 
  * @author Enomis
  * @version 1.0
 */
    function validationPhonNumber(value, country, type, param) {
        let numberArr = value.split('')
        console.log('type', type)
        console.log('number arr', numberArr)

        // variabile che in base al type andremo a settare per navigare nell'oggetto di validazione
        let objPathTypePrefix;
        let isValid = false;

        //^ in base all type settimo una variabile per andare a fare il ciclo e il controllo 
        if (type == 'cellular') {
            objPathTypePrefix = 'prefixCompanyCellular';
        } else if (type == 'homePhone') {
            objPathTypePrefix = 'prefixRegionHomePhone';
        }

        //^  cicliamo e tagliamo il prefisso internazionale se è inserito
        objLocalizationPath[country].prefixInternational.map((items, index) => {
            //^ ciclando sul prefisso internazionale nell'oggetto di validazione andiamo a fare un check sul numero inserito dall'utente ed eventualmente andiamo a talgiare lo stessa quantità di numeri per farci tornare un numero pulito senza prefisso internazionale
            let arrPrefix = [];
            for (let i = 0; i < items.length; i++) {
                arrPrefix.push(numberArr[i])
            }
            if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
                numberArr.splice(0, items.length);
            }
        });

        //^ filtriamo l'arr per ripulirlo restituendoci numberArr con solo numeri
        numberArr.filter((value) => filterNumberNotZero(value));


        //^ check del prefisso di cellulare o del prefisso regionale per validare il numero
        if (param.validationPrefixCompanyPhoneOrRegion) {
            console.log('validation prefisso')
            objLocalizationPath[country][type][objPathTypePrefix].forEach((items) => {
                let arrPrefix = [];
                for (let i = 0; i < items.length; i++) {
                    arrPrefix.push(numberArr[i])
                }
                if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
                    isValid = true;
                }
            });
        }


        //^ check length numero senza prefisso spazzi e caratteri non numerici
        if (isValid) {
            isValid = numberArr.length >= objLocalizationPath[country][type].minLength && numberArr.length <= objLocalizationPath[country][type].maxLength ? true : false;
        }

        //! return
        return isValid;
    }
    // ######old######
    /**
     * @todo funzione unica per il check dei prefissi per cellular e per home
     * @param  {Array} arr array con tutti i valori inseriti nei campi cellular o homPhone
     * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..) che utilizzeremo per navigare nell'oggetto di validazione e rilevare il campo da validare
     * @param  {string} type stringa passata dal data attribute dell'elemento che useremo per navigare nell'oggetto di validazione
     * @return {boolean} isValid valore di ritorno se l'array ha passato la validazione (TRUE||FALSE)
     * 
     * @author Enomis
     * @version 1.0
    */
    function prefixCutCheckAll(arr, country, type) {
        let numberArr = arr

        // variabile che in base al type andremo a settare per navigare nell'oggetto di validazione
        let objPathType;

        let isValid = false;
        //^ in base all type settimo una variabile per andare a fare il ciclo e il controllo 
        if (type == 'cellular') {
            objPathType = 'prefixCompanyCellular';
        } else if (type == 'homePhone') {
            objPathType = 'prefixRegionHomePhone';
        }

        //^  cicliamo e tagliamo il prefisso internazionale se è inserito
        objLocalizationPath[country].prefixInternational.map((items, index) => {
            //^ ciclando sul prefisso internazionale nell'oggetto di validazione andiamo a fare un check sul numero inserito dall'utente ed eventualmente andiamo a talgiare lo stessa quantità di numeri per farci tornare un numero pulito senza prefisso internazionale
            let arrPrefix = [];
            for (let i = 0; i < items.length; i++) {
                arrPrefix.push(numberArr[i])
            }
            if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
                numberArr.splice(0, items.length);
            }
        });
        //^ filtriamo l'arr per ripulirlo restituendoci numberArr con solo numeri
        numberArr = arr.filter((value) => this.filterNumberNotZero(value));


        //^ check del prefisso di cellulare o del prefisso regionale per validare il numero
        objLocalizationPath[country][type][objPathType].forEach((items) => {
            let arrPrefix = [];
            for (let i = 0; i < items.length; i++) {
                arrPrefix.push(numberArr[i])
            }
            if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
                isValid = true;
            }
        });


        //^ check length numero senza prefisso spazzi e caratteri non numerici
        if (isValid) {
            isValid = numberArr.length >= objLocalizationPath[country][type].minLength && numberArr.length <= objLocalizationPath[country][type].maxLength ? true : false;
        }

        //! return
        return isValid;
    }


    //^ validazione email
    /**
     * @param  {string} email valore che ci arriva dal value facciamo mechare con la Regex 
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione
     * 
     * @author Enomis
     * @version 1.0
    */
    function validationEmail(value) {
        ////se non ho inserito nulla nel campo return false
        //// if (email == '') { return false; }
        //^ verifico se è un indirizzo valido
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        }
        else {
            return false;
        }

    }


    //^ check postal code
    /**
     * @param  {string} value valore dell'items 
     * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..) che  utilizzeremo per navigare nell'oggetto di validazione e rilevare il campo da validare
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione Regex
     * 
     * @author Enomis
     * @version 1.0
    */
    function checkPostalCode(value, country) {
        return (RegExp(postalCodeRegex[country]).test(value) ? true : false)
    }


    //^ check tax ID
    /**
     * @param  {string} value valore dell'items 
     * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..) che utilizzeremo per navigare nell'oggetto di validazione e rilevare il campo da validare
     * @return {boolean} (TRUE|False) per validazione
     * @return {boolean} (TRUE) per validazione *** ora ritornerà sempre True nonostante il controllo 
     * 
     * @author Enomis
     * @version 1.0 *
    */
    function checkTaxId(value, country) {
        //^ CONTROLLO 1  mech con regex
        //^ CONTROLLO 2  mech con regex con aggiunta della localizzazione (IT,DE ecc.. )
        //^ ritorniamo sempre true perché anche se è un campo obbligatorio non ha bisogno di validazione stringente (PER ORA)

        if (RegExp(taxIdRegex[country]).test(value)) {
            return true;
        } else if ((RegExp(taxIdRegex[country]).test(country + value))) {
            return true;
        } else {
            //! Facciamo ritornare true perché anche se è importante inserirlo perciò sarà require in questa fase non intendiamo fare una validazione stringente
            return false
        }
        // return true;

    }

    // this.cLog(testo)
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






