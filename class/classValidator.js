import { postalCodeRegex } from './regex/postalCodeRegex.js';
import { taxIdRegex } from './regex/taxIdRegex.js';
import { objLocalizationPath } from './path/localizationPath.js';





/**
 * @param  {} items elemento html sula quale andare ad eseguire la validazione, avrà bisogno del settaggio di un 'data-validate-type' con uno dei seguenti valori (cellular||homePhone||email||postalCode||taxID||fiscalCode)
 * @param  {} localization stinga Uppercase unicode della localizzazione (IT,EN,FR..ecc..)
 */
export default class Validator {
    constructor(items, localization) {
        this.items = items
        this.localization = localization


    }
    //# Getter
    get validationForm() {
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
    filterNumberNotZero(value) {
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
    prefixCutCheckAll(arr, country, type) {
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
        console.log(objLocalizationPath[country][type][objPathType])
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
    validazioneEmail(email) {
        ////se non ho inserito nulla nel campo return false
        //// if (email == '') { return false; }
        //^ verifico se è un indirizzo valido
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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
    checkPostalCode(value, country) {
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
    checkTaxID(value, country) {
        //^ CONTROLLO 1  mech con regex
        //^ CONTROLLO 2  mech con regex con aggiunta della localizzazione (IT,DE ecc.. )
        //^ ritorniamo sempre true perché anche se è un campo obbligatorio non ha bisogno di validazione stringente (PER ORA)

        if (RegExp(taxIdRegex[country]).test(value)) {
            return true;
        } else if ((RegExp(taxIdRegex[country]).test(country + value))) {
            return true;
        } else {
            //! Facciamo ritornare true perché anche se è importante inserirlo perciò sarà require in questa fase non intendiamo fare una validazione stringente
            return true
        }
        // return true;

    }


}