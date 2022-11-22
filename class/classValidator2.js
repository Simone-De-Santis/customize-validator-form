// oggetto js con le regex per i codici postali 
import { postalCodeRegex } from './regex/postalCodeRegex.js';
// oggetto js con i controlli regex sulle 'partite iva'
import { taxIdRegex } from './regex/taxIdRegex.js';
// oggetto js per dove avremo i parametri di validazione in base alla localizzazione 
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
                let resultValidation;
                let messsageValidation;
                let country = param.localization
                let elVal = $.trim(element.value)

                // ?
                //! Se viene settato che tutti i campi devono essere required
                if (param.isAllRequired.isActive) {

                    // if (!$.trim(element.value)) {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    //     isValid = false;
                    // } else {
                    //     isValid = true
                    // }
                    isValid = !$.trim(element.value) ? false : true;
                    insertMessage(element, isValid, (isValid ? param.isAllRequired.message.validMessage : param.isAllRequired.message.invalidMessage))
                }
                // ?
                //!  Controllo email 
                if (param.validationMail.isActive && element.getAttribute("data-validate-type") == 'email' && elVal) {
                    resultValidation = validationEmail(elVal)
                    isValid = resultValidation.isValid;
                    messsageValidation = (resultValidation.message ? resultValidation.message : (isValid ? param.validationMail.message.validMessage : param.validationMail.message.invalidMessage));

                    insertMessage(element, isValid, messsageValidation)
                }
                // ?
                //! Postal code
                if (param.validationPostalCode.isActive && element.getAttribute("data-validate-type") == 'postalCode' && elVal) {
                    resultValidation = checkPostalCode(elVal, country)
                    isValid = resultValidation.isValid;
                    messsageValidation = (resultValidation.message ? resultValidation.message : (isValid ? param.validationPostalCode.message.validMessage : param.validationPostalCode.message.invalidMessage));

                    insertMessage(element, isValid, messsageValidation)




                    // isValid = checkPostalCode(elVal, country);
                    // insertMessage(element, isValid, param.validationPostalCode)
                }
                // ?
                //! TaxId
                if (param.validationTaxId.isActive && element.getAttribute("data-validate-type") == 'taxId' && elVal) {
                    // isValid = checkTaxId(elVal, country);
                    // insertMessage(element, isValid, param.validationTaxId)
                    resultValidation = checkTaxId(elVal, country)
                    isValid = resultValidation.isValid;
                    messsageValidation = (resultValidation.message ? resultValidation.message : (isValid ? param.validationTaxId.message.validMessage : param.validationTaxId.message.invalidMessage));

                    insertMessage(element, isValid, messsageValidation)
                }
                //! Validazione numero di telefono
                if (param.validationPhone.isActive && element.getAttribute("data-validate-type") == 'phone' && elVal) {

                    resultValidation = validationPhonNumber(elVal, country, element.getAttribute("data-value-type"), param.validationPhone)
                    isValid = resultValidation.isValid;
                    messsageValidation = (resultValidation.message ? resultValidation.message : (isValid ? param.validationPhone.message.validMessage : param.validationPhone.message.invalidMessage));

                    insertMessage(element, isValid, messsageValidation)


                }
                //^ andiamo ad inserire o a togliere la classe css bootstrap isValid
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
    function myIsNumber(x) {
        return /^-?\d+$/.test(x)
    }

    function log(testo) {
        console.log('aa')
    }
    // assegniamo la classe is-invalid all campo che non ha passato la validazione
    function toggleClass(el, isValid) {
        $(el).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
    }
    //^ inseriamo nel html il messaggio di errore o di success
    function insertMessage(el, isValid, messageValidation) {
        // console.log('start', $(el).nextAll('.invalid-feedback'));

        isValid ? $(el).nextAll('.valid-feedback').html(`${messageValidation}`) : $(el).nextAll('.invalid-feedback').html(`${messageValidation}`)
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
        let result;
        let resultChecked = false;
        let errorMessage;
        // variabile che in base al type andremo a settare per navigare nell'oggetto di validazione
        let objPathTypePrefix;
        let numberArr = value.split('')

        //#1 in base al type settimo una variabile per andare a fare il ciclo e il controllo 
        if (type == 'cellular') {
            objPathTypePrefix = 'prefixCompanyCellular';
        } else if (type == 'homePhone') {
            objPathTypePrefix = 'prefixRegionHomePhone';
        }


        //! caso 1 
        //* l'utente può inserire solo numeri (no prefisso no altri caratteri)
        //? Non eseguiamo un controllo sul prefisso delle compagnie o il prefisso regionale
        //? Non eseguiamo un controllo sul prefisso internazionale
        //? valore non normalizzato
        //# eseguiamo un controllo solo sul length 
        //# eseguiamo un controllo inserito solo numeri
        if (param.normalizationNumber === false && param.cutPrefixInternationalToResault === false && param.acceptNumberWithInternationalCode === false && param.validationPrefixCompanyPhoneOrRegion === false) {

            // tramite regex controlliamo se tutto quello inserito è un numero
            resultChecked = myIsNumber(numberArr.join(''));
            errorMessage = resultChecked ? 'numero valido' : 'inserire solo numeri';
            //^ controlliamo il length
            if (resultChecked) {
                resultChecked = numberArr.length >= objLocalizationPath[country][type].minLength && numberArr.length <= objLocalizationPath[country][type].maxLength ? true : false;
                errorMessage = resultChecked ? 'numero valido' : `'lunghezza minima dei caratteri ${objLocalizationPath[country][type].minLength} massima ${objLocalizationPath[country][type].maxLength}'`;
            }

        }


        //! caso 2
        //* l'utente può inserire solo numeri (no prefisso no altri caratteri)
        //? Non eseguiamo un controllo sul prefisso delle compagnie o il prefisso regionale
        //- Non eseguiamo un controllo sul prefisso internazionale
        //? valore non normalizzato
        //# eseguiamo un controllo sul prefisso internazionale (accettiamo il prefisso internazionale e i numeri successivi rispettano il caso 1 )
        //# eseguiamo un controllo solo sul length 
        //# eseguiamo un controllo inserito solo numeri
        if (param.normalizationNumber === false && param.cutPrefixInternationalToResault === false && param.acceptNumberWithInternationalCode === true && param.validationPrefixCompanyPhoneOrRegion === false) {

            let numberOriginal = numberArr;
            let numberValidation = numberValidation.push(numberOriginal);

            let checkPrefixInternationalUser = false;
            // cicliamo sui prefissi internazionali e controlliamo se è stato inserito lo tagliamo e eseguiamo il controllo sul numero restante e restituiamo il numero completo o il numero senza prefisso 
            let arrPrefix = [];
            objLocalizationPath[country].prefixInternational.map((items, index) => {
                for (let i = 0; i < items.length; i++) {
                    arrPrefix.push(numberArr[i])
                }

                if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items) && param.acceptNumberWithInternationalCode) {
                    // eliminiamo il prefisso internazionale dal' array
                    checkPrefixInternationalUser = true
                    numberOriginal.splice(items.length);

                }
            });
            console.log('number validation', numberValidation)
            console.log('number original', numberOriginal)
            console.log('number Arr', numberArr)



            // tramite regex controlliamo se tutto quello inserito è un numero
            resultChecked = myIsNumber(numberValidation.join(''));
            errorMessage = resultChecked ? 'numero valido' : 'inserire solo numeri';

            //^ controlliamo il length

            if (resultChecked) {

                resultChecked = numberValidation.length >= objLocalizationPath[country][type].minLength && numberValidation.length <= objLocalizationPath[country][type].maxLength ? true : false;
                errorMessage = resultChecked ? 'numero valido' : `'lunghezza minima dei caratteri ${objLocalizationPath[country][type].minLength} massima ${objLocalizationPath[country][type].maxLength}'`;
            }

        }























        // //#(2) cicliamo e tagliamo il prefisso internazionale se è inserito
        // if (param.acceptNumberWithInternationalCode) {
        //     let checkPrefixInternationalUser = false;
        //     objLocalizationPath[country].prefixInternational.map((items, index) => {
        //         //^ ciclando sul prefisso internazionale nell'oggetto di validazione andiamo a fare un check sul numero inserito dall'utente ed eventualmente andiamo a talgiare lo stessa quantità di numeri per farci tornare un numero pulito senza prefisso internazionale
        //         let arrPrefix = [];
        //         for (let i = 0; i < items.length; i++) {
        //             arrPrefix.push(numberArr[i])
        //         }
        //         if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items) && param.acceptNumberWithInternationalCode) {
        //             // eliminiamo il prefisso internazionale dal' array
        //             if (param.cutPrefixInternationalToResault) {

        //                 numberArr.splice(0, items.length);
        //             }
        //             checkPrefixInternationalUser = true
        //         }
        //     });
        //     if (checkPrefixInternationalUser || myIsNumber(numberArr.join(''))) {
        //         resultChecked = true;
        //         errorMessage = 'numero inserito valido ';
        //     } else {
        //         resultChecked = false;
        //         errorMessage = 'il numero con prefisso internazionale non è valido prova a toglierlo';
        //     }
        // } else if (/^-?\d+$/.test(numberArr.join(''))) {
        //     console.log('ciao', myIsNumber(numberArr.join('')))
        //     resultChecked = true
        //     errorMessage = 'numero inserito valido e senza prefisso'
        // } else {
        //     resultChecked = false;
        //     errorMessage = 'il numero inserito non è valido prova a togliere il prefisso internazionale ed inserire solo numeri'
        // }

        // if (param.normalizationNumber) {
        //     //^ filtriamo l'arr per ripulirlo restituendoci numberArr con solo numeri
        //     numberArr.filter((value) => filterNumberNotZero(value));
        // }

        // //^ check del prefisso di cellulare o del prefisso regionale per validare il numero
        // if (param.validationPrefixCompanyPhoneOrRegion) {
        //     console.log('validation prefix')
        //     objLocalizationPath[country][type][objPathTypePrefix].forEach((items) => {
        //         // creiamo un array con i campi con la quale andare a fare il confronto
        //         let arrPrefix = [];
        //         for (let i = 0; i < items.length; i++) {
        //             arrPrefix.push(numberArr[i])
        //         }
        //         if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
        //             resultChecked = true;
        //         }
        //     });
        // }


        // //^ check length finale se sono stai passati i precedenti controlli verifichiamo il length 
        // if (resultChecked) {
        //     resultChecked = numberArr.length >= objLocalizationPath[country][type].minLength && numberArr.length <= objLocalizationPath[country][type].maxLength ? true : false;
        // }

        //! return

        return result = {
            isValid: resultChecked,
            // message: (errorMessage ? errorMessage : resultChecked ? 'telefono approvato (validator)' : 'telefono non approvato  (validator)')
            message: errorMessage

        }
        // return isValid;
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
    // ######old######

    // ! in use
    //^ validazione del length 'numero'
    function isValidLength(numberValidation, country, type,) {
        return numberValidation.length >= objLocalizationPath[country][type].minLength && numberValidation.length <= objLocalizationPath[country][type].maxLength ? true : false;
    }
    //^ sett messagio di errore
    function setErrorMessage(resultChecked, texTrue, country, type) {
        return resultChecked ? texTrue : `'lunghezza minima dei caratteri ${objLocalizationPath[country][type].minLength} massima ${objLocalizationPath[country][type].maxLength}'`
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
        let result, resultChecked = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
        return result = {
            isValid: resultChecked,
            message: resultChecked ? 'email approvata (validator)' : 'inserire caratteri validi  (validator)'
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
        let result, resultChecked = RegExp(postalCodeRegex[country]).test(value);
        return result = {
            isValid: resultChecked,
            message: (resultChecked ? 'Success  (validator)' : 'Not matched  (validator)')
        }

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
        let result, resultChecked = RegExp(taxIdRegex[country]).test(value) || RegExp(taxIdRegex[country]).test(country + value);
        //^ CONTROLLO 1  mech con regex
        //^ CONTROLLO 2  mech con regex con aggiunta della localizzazione (IT,DE ecc.. )
        //^ ritorniamo sempre true perché anche se è un campo obbligatorio non ha bisogno di validazione stringente (PER ORA)

        // if (RegExp(taxIdRegex[country]).test(value)) {
        //     return true;
        // } else if ((RegExp(taxIdRegex[country]).test(country + value))) {
        //     return true;
        // } else {
        //     //! Facciamo ritornare true perché anche se è importante inserirlo perciò sarà require in questa fase non intendiamo fare una validazione stringente
        //     return false
        // }
        // return true;
        return result = {
            isValid: resultChecked,
            message: resultChecked ? 'Success  (validator)' : 'Not matched  (validator)'
        }




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






