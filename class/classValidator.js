/**
* @author Enomis
*
* @todo Nella versione 1.0 è richiesto l'utilizzo di jQuery
* @todo Nella versione 1.0 il tutto è stato ottimizzato per l'utilizzo con bootstrap
* @param {element} items è l'elemento html (input) con tutte le sue proprietà (data) e i valori (value) sulla quale andiamo a fare la validazione
* @param 
* @param 
*
* @return {boolean} Ritorniamo un booleano come check di valutazione
* @version 0.1
*/
import { postalCodeRegex } from './regex/postalCodeRegex.js';
import { taxIdRegex } from './regex/taxIdRegex.js';
import { objLocalizationPath } from './path/localizationPath.js';

export default class Validator {
    constructor(items, localization) {
        this.items = items
        this.localization = localization


    }
    //# Getter
    get validationForm() {
        this.clog('siamo nella classe')

        // ! VALIDAZIONE NUMERO DI CELLULARE
        if (this.items.getAttribute("data-validate-type") == 'cellular') {
            let arrPhoneNumber = this.items.value.trim().split("");
            return this.prefixCutCheckAll(
                arrPhoneNumber,
                this.items.getAttribute("data-validate-country"),
                this.items.getAttribute("data-validate-type")
            )
        }
        // ! VALIDAZIONE NUMERO DI FISSO
        if (this.items.getAttribute("data-validate-type") == 'homePhone') {
            let arrPhoneNumber = this.items.value.trim().split("");
            return this.prefixCutCheckAll(
                arrPhoneNumber,
                this.items.getAttribute("data-validate-country"),
                this.items.getAttribute("data-validate-type")
            )
        }
        // ! VALIDAZIONE EMAIL
        if (this.items.getAttribute("data-validate-type") == 'email') {
            return this.validazioneEmail(this.items.value.trim())
        }
        // ! VALIDAZIONE postalcode
        //^ per il momento il postal code dipende dalla selezione della regione nel form
        if (this.items.getAttribute("data-validate-type") == 'postalCode') {
            return this.checkPostalCode(this.items.value.trim(), this.localization)
        }
        // ! validazione TaxID (P.IVA)
        if (this.items.getAttribute("data-validate-type") == 'taxID') {
            return this.checkTaxID(this.items.value.trim(), this.localization)
        }
        //! validazione ctf
        if (this.items.getAttribute("data-validate-type") == 'fiscalCode') {
            //! torniamo true perche il controllo non è obbligatorio
            return true
        }

        this.clog(this.items)
    }



    //# Metodi

    //^ cONSOLE.LOG
    clog(testo) {
        console.log(testo)
    }
    //^ sanitize number
    filterNumberNotZero(value) {
        if (value == '0') {
            return value
        } else if (Number(value)) {
            return value
        } else {
            return
        }
    }
    //^ creiamo una funzione unica per iil check dei prefissi per per cellular che per home 
    prefixCutCheckAll(arr, country, type) {
        let numberArr = arr
        let objPathType;
        let isValid = false;
        //^ in base all type settima una variabile per andare a fare il ciclo e il controllo 
        if (type == 'cellular') {
            objPathType = 'prefixCompanyCellular';
        } else if (type == 'homePhone') {
            objPathType = 'prefixRegionHomePhone';
        }
        console.log('oggetto', objLocalizationPath)
        console.log('country', [country])

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

        numberArr = arr.filter((value) => this.filterNumberNotZero(value));
        console.log('dovrebbe essere solo number', type)

        //^ eseguimao il check del prefisso di cellulare o del prefisso regionale per validare il numero
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


        isValid = numberArr.length >= objLocalizationPath[country][type].minLength && numberArr.length <= objLocalizationPath[country][type].maxLength ? true : false

        console.log('validation', isValid);
        return isValid;
    }
    //^ validazione email
    validazioneEmail(email) {
        //^ se non ho inserito nulla nel campo
        if (email == '') { return false; }
        //^ verifico se è un indirizzo valido
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        else {
            return false;
        }

    }
    //^ check postal code
    checkPostalCode(valore, regionPostalCode) {
        return (RegExp(postalCodeRegex[regionPostalCode]).test(valore) ? true : false)
    }
    //^ check tax ID
    checkTaxID(valore, regionTaxId) {

        //^ CONTROLLO 1  mech con regex
        //^ CONTROLLO 2  mech con regex con aggiunta della localizzazione (IT,DE ecc.. )
        //^ ritorniamo sempre true perché anche se è un campo obbligatorio non ha bisogno di validazione stringente (PER ORA)

        if (RegExp(taxIdRegex[regionTaxId]).test(valore)) {
            return true;
        } else if ((RegExp(taxIdRegex[regionTaxId]).test(regionTaxId + valore))) {
            return true;
        } else {
            //! Facciamo ritornare true perché anche se è importante inserirlo perciò sarà require in questa fase non intendiamo fare una validazione stringente
            return true
        }
        // return true;

    }


}