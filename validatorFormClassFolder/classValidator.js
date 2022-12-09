/**
 * @param  {object} param oggetto di configurazione passato lato client
 * @param  {object} param nodo html della form soggetta a validazione
 *
 * @return {boolean} validationForm retiorna il valore del parametro this.isValidForm
 *
 */
var Validator = function (param, eTarget) {

    // let isValid = false;
    this.isValidForm;
    //# Getter
    this.validationForm = function (param, eTarget) {
        const params = param;


        // !!!!
        console.log('start validation in class validation');
        // !!!!
        // $.extend(param, eTarget)
        // console.log('param', param.compare.field)
        // //! check compare field
        // param.compare.field.forEach(e => this.compare(e))
        if (param.compare) {

            $.each(param.compare.field, (index, element) => {
                this.compare(element)
            })
        }




        // cicliamo su tutti gli elementi presenti nella form ed eseguiamo le relative validazioni

        $.each(eTarget, (index, element) => {
            // if (!element.classList.contains("d-none")) {
            //     // !!!!
            //     console.log('°element no none°', element)
            //     // !!!!
            // }
            // if (element.classList.contains("d-none")) {
            //     // !!!!
            //     console.log('°element yes none°', element)
            //     // !!!!
            // }

            let isValid = true;
            // Oggetto di ritorno dalla validazione
            let resultValidation;
            // variabile per il settaggio dell country
            const country = params.localization;
            //   valore trimmato
            const elVal = $.trim(element.value)
            // eseguiamo la validazione solo sui campi con un data-validate-type settato
            if (element.getAttribute("data-validate-type") && !element.classList.contains("d-none") && element.getAttribute("data-is-compared") != false) {
                // !!!!
                console.log('element validation whit data-validate-type', element)
                // !!!!
                //! Se viene settato che tutti i campi devono essere required
                if (params.isAllRequired.isActive) {

                    isValid = !$.trim(element.value) ? false : true;
                    this.insertMessage(element, isValid, (isValid ? params.isAllRequired.message.validMessage : params.isAllRequired.message.invalidMessage))
                }
                //!  Controllo Nome & Cognome
                if (params.validationAlias.isActive && element.getAttribute("data-validate-type") == 'nameSurname' && elVal) {
                    resultValidation = this.validationNameSurname(elVal, params.validationNameSurname);
                    // prima validiamo il max length poi validiamo con la funzione
                    isValid = resultValidation.isValid;
                    this.insertMessage(element, isValid, resultValidation.message)
                }
                //!  Controllo Alias
                if (params.validationAlias.isActive && element.getAttribute("data-validate-type") == 'alias' && elVal) {
                    resultValidation = this.validationAlias(elVal, params.validationAlias);

                    // prima validiamo il max length poi validiamo con la funzione
                    isValid = resultValidation.isValid;
                    this.insertMessage(element, isValid, resultValidation.message)
                }
                //!  Controllo email
                if (params.validationMail.isActive && element.getAttribute("data-validate-type") == 'email' && elVal) {

                    resultValidation = this.validationEmail(elVal, params);

                    // prima validiamo il max length poi validiamo con la funzione
                    isValid = resultValidation.isValid;
                    this.insertMessage(element, isValid, resultValidation.message)
                }
                //! Postal code
                if (params.validationPostalCode.isActive && element.getAttribute("data-validate-type") == 'postalCode' && elVal) {

                    resultValidation = this.checkPostalCode(elVal, country, params);
                    isValid = resultValidation.isValid;
                    this.insertMessage(element, isValid, resultValidation.message)
                }
                //! TaxId
                if (params.validationTaxId.isActive && element.getAttribute("data-validate-type") == 'taxId' && elVal) {
                    if (params.validationTaxId.checkTaxIdAllEs) {
                        // !!!!
                        console.log('controllo tax id spagnola')
                        // !!!!
                        resultValidation = this.checkTaxIdAllEs(elVal, country, params);
                        isValid = resultValidation.isValid;
                        this.insertMessage(element, isValid, resultValidation.message)
                        console.log('controllo tax id spagnola resultValidation', resultValidation)
                    } else {
                        // !!!!
                        console.log('controllo tax generale')
                        // !!!!
                        resultValidation = this.checkTaxId(elVal, country, params);
                        isValid = resultValidation.isValid;
                        this.insertMessage(element, isValid, resultValidation.message)

                    }
                }
                //! Validazione numero di telefono
                if (params.validationPhone.isActive && element.getAttribute("data-validate-type") == 'phone' && elVal) {

                    if (params.validationPhone.acceptALLInternationalCode) {

                        resultValidation = this.validationPhonNumberEasyLevel(elVal, country, element.getAttribute("data-value-type"), params.validationPhone);

                    } else if (params.validationPhone.validationPhonNumberEasyLevel) {

                        resultValidation = this.validationPhonNumberEasyLevel(elVal, country, element.getAttribute("data-value-type"), params.validationPhone);
                    } else {
                        resultValidation = this.validationPhonNumber(elVal, country, element.getAttribute("data-value-type"), params.validationPhone);
                    }

                    isValid = resultValidation.isValid;
                    //^ Sostituiamo il valore inserito dall'utente con il valore sistemato (trim spazzi ecc...)
                    element.value = resultValidation.valueReturn;
                    this.insertMessage(element, isValid, resultValidation.message);
                }
                //^ andiamo ad inserire o a togliere la classe css bootstrap isValid
                this.toggleClass(element, isValid)
            }
            // cambiamo il valore in false di isValidForm per andare a fare il submit in caso di true
            if (isValid === false) {

                this.isValidForm = false;
            }

        })
        if (this.isValidForm === undefined) {

            this.isValidForm = true
        }
    };

    this.compare = function (y) {
        let fieldCompare = $(`input[data-validate-compare="${y}"]`);
        if (fieldCompare.length > 1) {
            if (fieldCompare[0].value.length > 1 && fieldCompare[1].value.length > 1 && fieldCompare[0].value == fieldCompare[1].value) {
                this.isValidForm = true;
                $.each(fieldCompare, (index, element) => {
                    // !!!!
                    console.log(`'element compare positivo ${y}'`, element)
                    // !!!!
                    this.toggleClass(element, true)
                    this.insertMessage(element, true, `${y} match up`)
                    this.toggleIsCompared(element, true)

                })
            } else {
                this.isValidForm = false;
                $.each(fieldCompare, (index, element) => {
                    // !!!!
                    console.log(`'element compare negativo ${y}'`, element)
                    // !!!!
                    this.toggleClass(element, false)
                    this.insertMessage(element, false, `${y} don’t match up`)
                    this.toggleIsCompared(element, false)

                })

            }
        }
    }
    //# #### METODI DI VALIDAZIONE #####
    //^ validazione Nome & Cognome
    /**
     * @param  {string} Alias valore che ci arriva dal value
     * @param  {object} param oggetto con i parametri client di validazione
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione
     *
     * @author Enomis
     * @version 1.0
    */
    this.validationNameSurname = function (value, param) {
        let result, checkLength;
        checkLength = value.length <= param.maxLength && value.length >= param.minLength;
        // !!!!
        console.log('****validationNameSurname**** is valid', checkLength ? true : false)
        // !!!!

        return result = {
            isValid: checkLength ? true : false,
            message: checkLength ? 'ok' : param.message.invalidMessageMaxLength
        }

    };
    //^ validazione Alias
    /**
     * @param  {string} Alias valore che ci arriva dal value
     * @param  {object} param oggetto con i parametri client di validazione
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione
     *
     * @author Enomis
     * @version 1.0
    */
    this.validationAlias = function (value, param) {
        let result, checkLength;
        checkLength = value.length <= param.maxLength;
        // !!!!
        console.log('****validationAlias**** result', checkLength ? true : false,)
        // !!!!
        return result = {
            isValid: checkLength ? true : false,
            message: checkLength ? 'ok' : param.message.invalidMessageMaxLength
        }

    };
    //! VALIDAZIONI NUMERO DI TELEFONO
    //^ validazione numero di telefono EASY
    //# ACCETTIAMO CHE VENGA INSERITO QUALSIASI NUMERO 
    //# UNICO SIMBOLO PERMESSO E' IL + 
    //# GLI SPAZZI VENGONO NORMALIZZATI 
    //# CONTROLLO LUNGHEZZA MASSIMA E MINIMA ESEGUITA SUI PARAMETRI PASSATI DAL CLIENT
    //# I PREFISSI INTERNAZIONALI E DELLE COMPAGNIE NON VENGONO CONTROLLATI
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
    this.validationPhonNumberEasyLevel = function (value, country, type, param) {
        //^ oggetto contentente i valori di ritorno della funzione
        let result;

        //^ valore che cambia in base al controllo eseguito
        let resultChecked = false;

        //^ variabile contentente il mesaaggio di errore
        let errorMessage;

        //^ valore di ritorno che andrà a modificare il value nel front
        let valueReturn;

        //* [ 1 ]
        //^ dividiamo il value in un array per andare ad eseguire i vari controlli
        //^ filtriamo i valori vuoti
        let numberArr = value.split('').filter((currentValue) => { return currentValue != ' ' });

        //* [ 2 ]
        //^ controlliamo il length number (valori compresi di eventuali prefissi)
        resultChecked = this.isValidLength(numberArr, param.minLengthWhitAllPrefix, param.maxLengthWhitAllPrefix);
        errorMessage = resultChecked ? param.message.validMessage : param.message.errorLengthNumberWhithAllPRefix;

        //* [ 3 ]
        //^ tramite regex controlliamo che il numero contenga solo numeri accendo come valore speciale solo il + all'inizio 
        if (resultChecked) {
            resultChecked = this.NumberWhitPrefix(numberArr.join(''));
            errorMessage = resultChecked ? param.message.validMessage : param.message.errorSpecialCharacters;
        }

        // resultChecked = this.NumberWhitPrefix(numberArr.join(''));
        // console.log('resultChecked', resultChecked)

        //* [ 4 ]
        //^ modifica del valore di ritorno
        valueReturn = numberArr.join('')

        // !!!!
        console.log('****validationPhonNumberEasyLevel**** result', resultChecked)
        // !!!!

        //! return
        result = {
            isValid: resultChecked,
            message: errorMessage,
            valueReturn: valueReturn
        }
        console.log('result', result)
        return result

    };

    //^ validazione numero di telefono COMPLETO
    //# GLI SPAZZI VENGONO NORMALIZZATI 
    //# ACCETTIAMO CHE VENGA INSERITO O UN CELLULARE O UN NUMERO FISSO  
    //# ESEGUIAMO IL CONTROLLO SUL PREFISSO INTERNAZIONALE RELATIVO AL PAESE 
    //# ESEGUIAMO IL CONTROLLO SUL PREFISSO DELLA COMPAGNIA TELEFONIA O DEL PREFISSO REGIONALE [ VALORI PRESENTI NELL' OGGETTO DI VALIDAZIONE ['localizationPath'] SE LATO CLIENTE è SETTATTO A TRUE 'validationPrefixCompanyPhoneOrRegion'
    //# CONTROLLO LUNGHEZZA MASSIMA E MINIMA ESEGUITA SUI PARAMETRI PASSATI DAL Client ma presenti nel ['localizationPath']

    //# 
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
    this.validationPhonNumber = function (value, country, type, param) {
        //^ oggetto contentente i valori di ritorno della funzione
        let result;

        //^ valore che cambia in base al controllo eseguito
        let resultChecked = false;

        //^ variabile contentente i m esaaggio di errore
        let errorMessage;

        //^ variabile che in base al type andremo a settare per navigare nell'oggetto di validazione
        let objPathTypePrefix;

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

        //# in base al type settimo una variabile che useremo per sapere se il numero di telefono deve essere un cellulare o un fisso (valore passato dal' html come data type)
        if (type == 'cellular') {
            objPathTypePrefix = 'prefixCompanyCellular';
        } else if (type == 'homePhone') {
            objPathTypePrefix = 'prefixRegionHomePhone';
        }

        //* [ 1 ]
        //^ dividiamo il value in un array per andare ad eseguire i vari controlli
        //^ filtriamo i valori vuoti     
        let numberArr = value.split('').filter((currentValue) => { return currentValue != ' ' });

        //* [ 2 ]
        //^ cicliamo sull'oggetto di validazione (non client) contenente i prefissi internazionali relativi al paese (valore passato lato client) e facciamo un check settando una variabile 'checkPrefixInternationalUser' (true||false) se troviamo il mech e inseriamo il prefisso corrispondente in 'internationalPrefixValue'
        //^ in caso di corrispondenza non trovata la variabile 'checkPrefixInternationalUser' sarà undefined
        objLocalizationPath[country].prefixInternational.map((items, index) => {
            let prefixCurrent = [];
            for (let i = 0; i < items.length; i++) {
                prefixCurrent.push(numberArr[i])
            }
            if (param.acceptNumberWithInternationalCode) {
                if (JSON.stringify(prefixCurrent.join("")) == JSON.stringify(items)) {
                    // controlliamo se il prefisso internazionale inserito è corretto
                    checkPrefixInternationalUser = true
                    numberArr.splice(0, items.length);
                    internationalPrefixValue = [...prefixCurrent]
                }
            }
        });

        //* [ 3 ]
        //^ check del prefisso di cellulare o del prefisso regionale se settato 'validationPrefixCompanyPhoneOrRegion' lato client 
        //^ cicliamo sull'oggetto di validazione (non client) contenente i prefissi delle compagnie telefoniche / o regionali 
        if (param.validationPrefixCompanyPhoneOrRegion) {
            performedCheck = true;
            objLocalizationPath[country][type][objPathTypePrefix].forEach((items) => {
                let arrPrefixCompany = [];
                for (let i = 0; i < items.length; i++) {
                    arrPrefixCompany.push(numberArr[i])
                }
                //? se è già stato trovato un riscontro positivo non eseguiamo il controllo con il prefisso attuale per evitare un sovraccarico di risorse inutili
                if (!checkPrefixCompanyRegionUser) {
                    if (JSON.stringify(arrPrefixCompany.join("")) == JSON.stringify(items)) {
                        // resultChecked = param.validationPrefixCompanyPhoneOrRegion ? true : resultChecked;
                        //^ inseriamo il prefisso mecchato nella variabile esterna 'companyPrefixValue'
                        companyPrefixValue = [...arrPrefixCompany];
                        checkPrefixCompanyRegionUser = true;
                        resultChecked = true;
                    } else {
                        resultChecked = false;
                    }
                    errorMessage = errorMessage ? errorMessage : (resultChecked ? param.message.validMessage : param.message.errorPrefixCompanyRegion);
                }

            });
        }

        //* [ 4 ]
        //^ controlliamo il length number tramite l'oggetto di validazione 'objLocalizationPath'
        if (param.validationLength) {
            performedCheck = true;
            resultChecked = this.isValidLength(numberArr, objLocalizationPath[country][type].minLength, objLocalizationPath[country][type].maxLength)
            // resultChecked = this.isValidLengthNumber(numberArr, country, type)
            errorMessage = errorMessage ? errorMessage : (resultChecked ? param.message.validMessage : param.message.errorLengthMessage);
        }

        //* [ 5 ]
        //^ se non è stato eseguito nessun controllo in precedenza controlliamo se il numero inserito dall'utente è un numero (solo numero)
        //^ in caso contrario eseguimao il controllo IsNumber solo se i controlli precedenti sono stati passati 
        if (!performedCheck) {
            resultChecked = this.regexIsNumber(numberArr.join(''));
            errorMessage = errorMessage ? errorMessage : (resultChecked ? param.message.validMessage : param.message.invalidMessage);
        } else {

            //^ tramite regex controlliamo se tutto quello inserito è un numero
            //# valido solo se è stato applicato almeno un controllo precedentemente
            resultChecked = resultChecked ? this.regexIsNumber(numberArr.join('')) : resultChecked;
            errorMessage = errorMessage ? errorMessage : (resultChecked ? param.message.validMessage : param.message.invalidMessage);
        }

        //^ modifica del valore di ritorno
        //^ [1] se abbiamo fatto il controllo accettando il prefisso internazionale  ora abbiamo un array con i numeri del prefisso internazionale e un array con il numero 'validato',
        //^ --- se true 'cutPrefixInternationalToResault' torniamo solo il numberArr in stringa ('join')
        //^ --- se false 'cutPrefixInternationalToResault' torniamo il numero fuso con il prefisso internazionale
        //^ [2] se non abbiamo fatto il controllo sul prefisso internazionale nel valore di ritorno uniamo solo l'array
        if (param.acceptNumberWithInternationalCode) {
            valueReturn = (param.cutPrefixInternationalToResault ? numberArr.join('') : internationalPrefixValue.concat(numberArr)).join('');
        } else {
            valueReturn = numberArr.join('')
        }


        //! return
        result = {
            isValid: resultChecked,
            message: errorMessage,
            valueReturn: valueReturn
        }
        // !!!!
        console.log('****validationPhonNumber**** result', result)
        // !!!!

        return result

    };

    //^ validazione email
    /**
     * @param  {string} email valore che ci arriva dal value facciamo mechare con la Regex
     * @param  {object} param oggetto con i parametri client di validazione
     * @return {boolean} (TRUE||FALSE) se la stringa passa la validazione
     *
     * @author Enomis
     * @version 1.0
    */
    this.validationEmail = function (value, param) {
        let result, resultChecked, checkLength;

        checkLength = value.length <= param.validationMail.maxLength;
        if (checkLength) {
            resultChecked = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
        } else {
            resultChecked = false;
        }


        result = {
            isValid: checkLength ? resultChecked : false,
            message: checkLength ? (resultChecked ? param.validationMail.message.validMessage : param.validationMail.message.invalidMessage) : param.validationMail.message.invalidMessageMaxLength
        }
        // !!!!
        console.log('****validationEmail**** result', result)
        // !!!!
        return result
    };

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
    this.checkPostalCode = function (value, country, param) {

        let result, resultChecked = RegExp(postalCodeRegex[country]).test(value);

        result = {
            isValid: resultChecked,
            message: resultChecked ? param.validationPostalCode.message.validMessage : param.validationPostalCode.message.invalidMessage
        }
        // !!!!
        console.log('****checkPostalCode**** result', result)
        // !!!!
        return result

    }

    //^ check tax ID Spagna un solo campo Cif Nif CTF
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
    this.checkTaxIdAllEs = function (value, country, param) {
        // let result, resultChecked = RegExp(taxIdRegex[country]).test(value) || RegExp(taxIdRegex[country]).test(country + value);
        let result, resultChecked;
        // //^ CONTROLLO 1  mech con regex DNI
        // resultChecked = /^(\d{8})([A-Z])$/.test(value)
        // //^ CONTROLLO 2  mech con regex CIF
        // resultChecked = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(value)
        // //^ CONTROLLO 2  mech con regex NIE
        // resultChecked = /^[XYZ]\d{7,8}[A-Z]$/.test(value)
        if (/^(\d{8})([A-Za-z])$/.test(value) || /^([ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw])(\d{7})([0-9A-Ja-j])$/.test(value) || /^[XYZxyz]\d{7,8}[A-Za-z]$/.test(value)) {
            resultChecked = true;
            console.log('****checkTaxIdAllEs**** resultCheckeda', resultChecked)
        } else {
            resultChecked = false;
            console.log('****checkTaxIdAllEs**** resultCheckedb', resultChecked)
        }


        result = {

            isValid: resultChecked,
            message: resultChecked ? param.validationTaxId.message.validMessage : param.validationTaxId.message.invalidCifOrNifOrDni
        }
        // !!!!
        console.log('****checkTaxIdAllEs**** result', result)
        // !!!!
        return result
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
    this.checkTaxId = function (value, country, param) {
        let result, resultChecked = RegExp(taxIdRegex[country]).test(value) || RegExp(taxIdRegex[country]).test(country + value);
        //^ CONTROLLO 1  mech con regex
        //^ CONTROLLO 2  mech con regex con aggiunta della localizzazione (IT,DE ecc.. )
        //^ ritorniamo sempre true perché anche se è un campo obbligatorio non ha bisogno di validazione stringente (PER ORA)
        let checkLength = value.length <= param.validationTaxId.maxLength;

        //     //! Facciamo ritornare true perché anche se è importante inserirlo perciò sarà require in questa fase non intendiamo fare una validazione stringente

        result = {
            isValid: checkLength ? resultChecked : false,
            message: checkLength ? (resultChecked ? param.validationTaxId.message.validMessage : param.validationTaxId.message.invalidMessage) : param.validationTaxId.message.invalidMessageMaxLength
        }
        // !!!!
        console.log('****checkTaxId**** result', result)
        // !!!!
        return result
    }

    //^ Check regex is Number
    /**
    * @param  {string} number valore di confronto accetta solo una stringa per il controllo
    * @return {boolean} (TRUE||FALSE) se trova anche solo un valore che non sia un numero
    *
    * @author Enomis
    * @version 1.0 *
    */
    this.regexIsNumber = function (number) {
        // !!!!
        console.log('****regexIsNumber**** ', /^-?\d+$/.test(number))
        // !!!!
        return /^-?\d+$/.test(number)
    }
    //^ Check regex is NumberWhitPrefix
    /**
    * @param  {string} number valore di confronto accetta solo una stringa per il controllo
    * @return {boolean} (TRUE||FALSE) se trova anche solo un valore che non sia un numero
    *
    * @author Enomis
    * @version 1.0 *
    */
    this.NumberWhitPrefix = function (number) {

        // !!!!
        console.log('****NumberWhitPrefix**** ', /^((00|\+))??3\d{0,20}$/.test(number))
        // !!!!

        return /^((00|\+))??3\d{0,20}$/.test(number)
    }


    // #### FUNZIONI ####
    //^ validazione del length 'numero2'
    this.isValidLength = function (value, minLength, maxLength) {
        // !!!!
        console.log('****isValidLength**** ', value.length >= minLength && value.length <= maxLength ? true : false)
        // !!!!
        return value.length >= minLength && value.length <= maxLength ? true : false;
    }
    // //^ validazione del length 'numero' tramite 'objLocalizationPath'
    // this.isValidLengthNumber = function (numberValidation, country, type,) {
    //     // !!!!
    //     console.log('****isValidLength**** ', numberValidation.length >= objLocalizationPath[country][type].minLength && numberValidation.length <= objLocalizationPath[country][type].maxLength ? true : false)
    //     // !!!!

    //     return numberValidation.length >= objLocalizationPath[country][type].minLength && numberValidation.length <= objLocalizationPath[country][type].maxLength ? true : false;
    // }

    //^ assegniamo la classe is-invalid all campo che non ha passato la validazione
    this.toggleClass = function (el, isValid) {

        $(el).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
    }
    this.toggleIsCompared = function (el, isValid) {

        $(el).data('data-is-compared', isValid)
    }
    //^ inseriamo nel html il messaggio di errore o di success
    this.insertMessage = function (el, isValid, messageValidation) {

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
    this.filterNumberNotZero = function (value) {
        if (value == '0') {
            return value
        } else if (Number(value)) {
            return value
        } else {
            return
        }
    }

    // ! Return 
    this.validationForm(param, eTarget);

    return this
}


