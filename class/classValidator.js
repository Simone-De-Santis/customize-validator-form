// oggetto js con le regex per i codici postali
import { postalCodeRegex } from './regex/postalCodeRegex.js';

// oggetto js con i controlli regex sulle 'partite iva'
import { taxIdRegex } from './regex/taxIdRegex.js';

// oggetto js per dove avremo i parametri di validazione in base alla localizzazione 
import { objLocalizationPath } from './path/localizationPath.js';





/**
 * @param  {object} param oggetto di configurazione passato lato client
 * @param  {object} param nodo html della form soggetta a validazione 
 * 
 * @return {boolean} validationForm retiorna il valore del parametro this.isValidForm
 *
 */
export default class Validator {
    constructor(param, e) {
        this.param = param
        this.e = e
        this.isValidForm = true
    }





    //# Getter
    get validationForm() {
        const params = this.param;

        $.each(this.e.target, (index, element) => {
            let isValid = true;
            // Oggetto di ritorno dalla validazione 
            let resultValidation;
            // variabile per il settaggio dell country
            const country = params.localization
            const elVal = $.trim(element.value)

            // eseguiamo la validazione solo sui campi con un data-validate-type settato
            if (element.getAttribute("data-validate-type")) {
                // ^ ----OK---
                //! Se viene settato che tutti i campi devono essere required
                if (params.isAllRequired.isActive) {
                    isValid = !$.trim(element.value) ? false : true;
                    this.insertMessage(element, isValid, (isValid ? params.isAllRequired.message.validMessage : params.isAllRequired.message.invalidMessage))
                }
                // ^ ----OK---
                //!  Controllo email 
                if (params.validationMail.isActive && element.getAttribute("data-validate-type") == 'email' && elVal) {

                    resultValidation = this.validationEmail(elVal, params)

                    isValid = resultValidation.isValid;


                    this.insertMessage(element, isValid, resultValidation.message)
                }
                // ^ ----OK---
                //! Postal code
                if (params.validationPostalCode.isActive && element.getAttribute("data-validate-type") == 'postalCode' && elVal) {

                    resultValidation = this.checkPostalCode(elVal, country, params)

                    isValid = resultValidation.isValid;


                    this.insertMessage(element, isValid, resultValidation.message)

                }
                // ^ ----OK---
                //! TaxId
                if (params.validationTaxId.isActive && element.getAttribute("data-validate-type") == 'taxId' && elVal) {

                    resultValidation = this.checkTaxId(elVal, country, params)

                    isValid = resultValidation.isValid;

                    this.insertMessage(element, isValid, resultValidation.message)
                }
                // ^ ----OK---
                //! Validazione numero di telefono
                if (params.validationPhone.isActive && element.getAttribute("data-validate-type") == 'phone' && elVal) {

                    resultValidation = this.validationPhonNumber(elVal, country, element.getAttribute("data-value-type"), params.validationPhone);

                    isValid = resultValidation.isValid;


                    //^ Sostituiamo il valore inserito dall'utente con il valore sistemato (trim spazzi ecc...)
                    element.value = resultValidation.valueReturn



                    this.insertMessage(element, isValid, resultValidation.message)

                }
                //^ andiamo ad inserire o a togliere la classe css bootstrap isValid
                this.toggleClass(element, isValid)
            }


            // cambiamo il valore in false di isValidForm per andare a fare il submit in caso di true
            if (isValid === false) {
                // console.log('is valid(validatore) false')
                this.isValidForm = false;
            }
        })
        // console.log('nel validatore', this.isValidForm)
        return this.isValidForm
    };



    //# #### METODI DI VALIDAZIONE #####

    //^ validazione numero di telefono
    /**
         * @todo funzione unica per il check dei prefissi per cellular e per home
         * @param  {array} value valore inserito nel campo 
         * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..)
         * @param  {string} type stringa passata dal data attribute dell'elemento 
         * @param  {object} param oggetto con i parametri client di validazione
         * 
         * @return {boolean} isValid valore di ritorno se l'array ha passato la validazione (TRUE||FALSE)
         * 
         * @author Enomis
         * @version 1.0
      */
    validationPhonNumber(value, country, type, param) {
        //^ oggetto contentente i valori di ritorno della funzione
        let result;

        //^ valore che cambia in base al controllo eseguito
        let resultChecked = false;

        //^ variabile contentente i m esaaggio di errore 
        let errorMessage;

        //^ variabile che in base al type andremo a settare per navigare nell'oggetto di validazione
        let objPathTypePrefix;

        //^ dividiamo il value in un array per andare ad eseguire i vari controlli
        //^ filtriamo i valori vuoti
        let numberArr = value.split('').filter((currentValue) => { return currentValue != ' ' });

        //^ creiamo una variabile dove inseriremo i prefissi se presenti internazionali
        let internationalPrefixValue = [];

        //^ true o false se è stato trovato un prefisso 
        let checkPrefixInternationalUser;

        //^ array con i prefissi delle compagnie o regionali trovati
        let companyPrefixValue = []

        //^ true o false se è stato trovato un prefisso company o region 
        let checkPrefixCompanyRegionUser;

        //^ variabile true o false se viene eseguito almeno un controllo sul numero per validazione finale 
        let performedCheck = false;

        //^ valore di ritorno che andrà a modificare il value nel front
        let valueReturn;








        //# in base al type settimo una variabile per andare a fare il ciclo e il controllo 
        if (type == 'cellular') {
            objPathTypePrefix = 'prefixCompanyCellular';
        } else if (type == 'homePhone') {
            objPathTypePrefix = 'prefixRegionHomePhone';
        }

        // cicliamo sui prefissi internazionali e puschiamo nella variabile i primi numeri dell
        objLocalizationPath[country].prefixInternational.map((items, index) => {
            let prefixCurrent = [];
            for (let i = 0; i < items.length; i++) {
                prefixCurrent.push(numberArr[i])
            }
            if (param.acceptNumberWithInternationalCode) {
                console.log('entrato accept prefix international');
                if (JSON.stringify(prefixCurrent.join("")) == JSON.stringify(items)) {
                    // controlliamo se il prefisso internazionale inserito è corretto
                    checkPrefixInternationalUser = true
                    numberArr.splice(0, items.length);
                    internationalPrefixValue = [...prefixCurrent]
                }
            }
        });
        //^ check del prefisso di cellulare o del prefisso regionale per validare il numero
        if (param.validationPrefixCompanyPhoneOrRegion) {
            console.log('entrato check prefix company e region ');
            performedCheck = true;

            objLocalizationPath[country][type][objPathTypePrefix].forEach((items) => {
                let arrPrefixCompany = [];
                for (let i = 0; i < items.length; i++) {
                    arrPrefixCompany.push(numberArr[i])
                }
                if (!checkPrefixCompanyRegionUser) {

                    if (JSON.stringify(arrPrefixCompany.join("")) == JSON.stringify(items)) {
                        resultChecked = param.validationPrefixCompanyPhoneOrRegion ? true : resultChecked;
                        companyPrefixValue = [...arrPrefixCompany];
                        checkPrefixCompanyRegionUser = true;
                        resultChecked = true;
                        errorMessage = param.message.validMessage;
                        console.log('prefisso company trovato')

                    } else {

                        resultChecked = false;
                        errorMessage = param.message.errorPrefixCompanyRegion;
                        console.log('prefisso company non trovato')
                    }

                }

            });
        }
        //^ controlliamo il length number
        if (param.validationLength) {
            console.log('entrato controllo length');
            performedCheck = true;
            resultChecked = this.isValidLengthNumber(numberArr, country, type)
            errorMessage = resultChecked ? param.message.validMessage : param.message.errorLengthMessage;
        }



        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!performedCheck) {
            console.log('nessun controllo eseguito precedentemente, controllo isNumber');
            resultChecked = regexIsNumber(numberArr.join(''));
            errorMessage = errorMessage ? errorMessage : (resultChecked ? param.message.validMessage : param.message.invalidMessage);
        } else {
            console.log('almeno un controllo eseguito precedentemente, controllo isNumber');
            //^ tramite regex controlliamo se tutto quello inserito è un numero 
            //# valido solo se è stato applicato almeno un controllo precedentemente
            resultChecked = resultChecked ? this.regexIsNumber(numberArr.join('')) : resultChecked;
            errorMessage = errorMessage ? errorMessage : (resultChecked ? param.message.validMessage : param.message.invalidMessage);
        }
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



        // modifica del valore di ritorno
        if (param.acceptNumberWithInternationalCode) {
            valueReturn = (param.cutPrefixInternationalToResault ? numberArr : internationalPrefixValue.concat(numberArr)).join('');
        } else {
            valueReturn = numberArr.join('')
        }

        //! return
        result = {
            isValid: resultChecked,
            message: errorMessage,
            valueReturn: valueReturn
        }
        console.log('result', result)
        return result
        // return isValid;


    }
    //^ validazione email
    /**
     * @param  {string} email valore che ci arriva dal value facciamo mechare con la Regex 
     * @param  {object} param oggetto con i parametri client di validazione
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione
     * 
     * @author Enomis
     * @version 1.0
    */
    validationEmail(value, param) {
        let result, resultChecked = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
        return result = {
            isValid: resultChecked,
            message: resultChecked ? param.validationMail.message.validMessage : param.validationMail.message.invalidMessage
        }
    }


    //^ check postal code
    /**
     * @param  {string} value valore dell'items 
     * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..) che  utilizzeremo per navigare nell'oggetto di validazione e rilevare il campo da validare
     * @param  {object} param oggetto con i parametri client di validazione
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione Regex
     * 
     * @author Enomis
     * @version 1.0
    */
    checkPostalCode(value, country, param) {
        let result, resultChecked = RegExp(postalCodeRegex[country]).test(value);
        return result = {
            isValid: resultChecked,
            message: resultChecked ? param.validationPostalCode.message.validMessage : param.validationPostalCode.message.invalidMessage
        }

    }

    //^ check tax ID
    /**
     * @param  {string} value valore dell'items 
     * @param  {string} country localizzazione passata dal costruttore (IT,EN,FR..ecc..) che utilizzeremo per navigare nell'oggetto di validazione e rilevare il campo da validare
     * @param  {object} param oggetto con i parametri client di validazione
     * @return {boolean} (TRUE|False) per validazione
     * @return {boolean} (TRUE) per validazione *** ora ritornerà sempre True nonostante il controllo 
     * 
     * @author Enomis
     * @version 1.0 *
    */
    checkTaxId(value, country, param) {
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
            message: resultChecked ? param.validationTaxId.message.validMessage : param.validationTaxId.message.invalidMessage
        }
    }

    //^ Check regex is Number
    /**
    * @param  {string} number valore di confronto accetta solo una stringa per il controllo
    * @return {boolean} (TRUE||FALSE) se trova anche solo un valore che non sia un numero
    * 
    * @author Enomis
    * @version 1.0 *
    */
    regexIsNumber(number) {
        return /^-?\d+$/.test(number)
    }

    //#### FUNZIONI ####
    //^ validazione del length 'numero'
    isValidLengthNumber(numberValidation, country, type,) {
        return numberValidation.length >= objLocalizationPath[country][type].minLength && numberValidation.length <= objLocalizationPath[country][type].maxLength ? true : false;
    }
    //^ assegniamo la classe is-invalid all campo che non ha passato la validazione
    toggleClass(el, isValid) {
        $(el).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
    }
    //^ inseriamo nel html il messaggio di errore o di success
    insertMessage(el, isValid, messageValidation) {
        isValid ? $(el).nextAll('.valid-feedback').html(`${messageValidation}`) : $(el).nextAll('.invalid-feedback').html(`${messageValidation}`)
    }
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

}