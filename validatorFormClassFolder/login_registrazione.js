/*!
 * login_registrazione.js 0.2
 */

$(document).ready(function () {

    // Setting del campo redirect nel caso esiste un preventivo precompilato
    data_preventivo = sessionStorage.getItem("form_preventivo",);
    if (data_preventivo != '' && data_preventivo != null) {
        //   consoleLog('data_preventivo' , data_preventivo ) ;
        $("#login-redirect").val('preventivi.preventivi_nuovo_step3');
    }


    /**login validation**/
    $("#login-email").focusin(() => {
        $("#login-email").removeClass("is-invalid");
    });

    $("#login-password").focusin(() => {
        $("#login-password").removeClass("is-invalid");
    });

    $("#login-email").change(() => {
        $("#login-email").removeClass("is-invalid");
    });

    $("#login-password").change(() => {
        $("#login-password").removeClass("is-invalid");
    });

    $("#btn-home-calc").click(() => {
        let valid = true;
        if (document.getElementById("login-email").checkValidity() == false) {
            $("#login-email").addClass("is-invalid");
            valid = false;
        }
        if (
            document.getElementById("login-password").checkValidity() == false
        ) {
            $("#login-password").addClass("is-invalid");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        } else {
            localStorage.setItem("otp", true);
        }
    });

    /**
     * Recupera password
     */
    $("#btn_richiesta_recupera_password").click(function (e) {

        urlService = "/ajax/account/check_exist";
        var params = {
            email: $("#recupera_password_email").val(),
            _token: $('meta[name="csrf-token"]').attr("content"),
        };
        $.ajax({
            type: "POST",
            url: urlService,
            data: params,
            dataType: "json",
            error: function (xhr, status, error) {
                $('#modalErroreGenerico').modal('show');
            },
            success: function (response) {
                if (response.header.status == "SUCCESS") {
                    if (response.data.check == 1) {
                        $("#form-recupera-password").prop("onsubmit", "");
                        $("#form-recupera-password").submit();
                    } else {
                        $("#recupera_password_email").addClass("is-invalid");
                    }
                } else {
                    $('#modalErroreGenerico').modal('show');
                }
            },
        });
    });

    /**
     * VISUALIZZAZIONE DEI CAMPI DA MOSTRARE/NASCONDERE IN FATTURAZIONE
     */

    //todo: VERIFICA IN CHECKOUT
    // ! non ci sono campi con #radio
    // if ($("#radio_privato").is(":checked")) {
    //     nascondicampi_onready();
    // }
    // // OBSOLETE
    // $("#radio_privato").click(function () {
    //     selezione_utente_privato();
    // });


    // // OBSOLETE
    // $(
    //     "#radio_azienda , #radio_ditta , #radio_pubblica , #radio_ente , #radio_soggetto"
    // ).click(function () {
    //     visualizza_campi_fatturazione_azienda();
    //     azienda_required_attr();
    //     ditta_required_attr();
    // });

    checkTipologiaRegistrazioneCustomer();
    /**
     * Evento modifica tipologia utente
     */
    $("#selectTipologiaRegistrazioneCustomer").change(function () {
        checkTipologiaRegistrazioneCustomer();
    });


    // Se scelgo versione pro abilito info fatturazioni
    $("#input_registrazione_requirepro").on("click", function () {
        $('#form_registrazione_versione_pro').collapse('toggle');

        if ($(this).is(":checked") && $('#selectTipologiaRegistrazioneCustomer').val() != '') {

            $("#input_registrazione_fatturazione_enabled").val("1");
            $("#container_form_indirizzo_fatturazione").removeClass("d-none");


        } else {

            $("#input_registrazione_fatturazione_enabled").val("0");
            $("#container_form_indirizzo_fatturazione").addClass("d-none");

        }
        checkTipologiaRegistrazioneCustomer();

        if (!$(this).is(":checked")) {
            $("#container_form_indirizzo_fatturazione input").addClass("d-none");
        }


        console.log('isChecked', $(this).is(":checked"))
        console.log('####################################')

    });


    // esegue sempre


    if ($('#input_registrazione_requirepro').is(":checked")) {
        $("#form_registrazione_versione_pro").collapse();
    }


    function checkTipologiaRegistrazioneCustomer() {
        console.log('start checked form')
        // quando cambia 
        if ($("#input_registrazione_requirepro").is(":checked")) {
            $('#form_registrazione_versione_pro input').removeClass("d-none")

            // Usato in Form registrazione
            var tipologia_utente_selezionato = $("#selectTipologiaRegistrazioneCustomer").val();


            if (tipologia_utente_selezionato != '') {
                $("#container_form_indirizzo_fatturazione").removeClass("d-none");
                $("#container_form_indirizzo_fatturazione input").removeClass("d-none");
            } else {
                $("#container_form_indirizzo_fatturazione").addClass("d-none");

                $("#container_form_indirizzo_fatturazione input").addClass("d-none");
            }
            // # in sendago abbiamo tolto la pec 
            // if (tipologia_utente_selezionato > 1) {
            //     $('#input_registrazione_fatturazione_pec').attr('required', true);
            // } else {
            //     $('#input_registrazione_fatturazione_pec').removeAttr('required');
            //     $('#input_registrazione_fatturazione_pec').prop('required', null);
            // }

            // Utente privato
            if (tipologia_utente_selezionato == 1) {
                selezione_utente_privato();
            }
            // Utente azienda
            if (tipologia_utente_selezionato == 2) {
                selezione_utente_azienda();
            }
            // Utente ditta individuale
            if (tipologia_utente_selezionato == 3) {
                selezione_utente_ditta_individuale();
            }
            // Utente pubblica amministrazione
            if (tipologia_utente_selezionato == 4) {
                selezione_utente_pubblica_amministrazione();
            }
            // Utente ente associazione
            if (tipologia_utente_selezionato == 5) {
                selezione_utente_ente_associazione();
            }
            // Utente split payment
            //# elemento tolto in sendago
            // if (tipologia_utente_selezionato == 6) {
            //     selezione_utente_split_payment();
            // }


            if (
                tipologia_utente_selezionato != "undefinded" &&
                tipologia_utente_selezionato != null &&
                tipologia_utente_selezionato != ""
            ) {
                for (let i = 0; i < $(".descReg").length; i++) {
                    $(".descReg:eq(" + i + ")").addClass("d-none");
                }

                $(".descReg:eq(" + (tipologia_utente_selezionato - 1) + ")").removeClass("d-none");
                $("#alert_specifica_tipo_utente_pro").addClass("d-none");
                $("#form_campi_registrazione_versione_pro").removeClass("d-none");


            } else {
                $("#alert_specifica_tipo_utente_pro").removeClass("d-none");
                $("#form_campi_registrazione_versione_pro").addClass("d-none");

            }
        } else {
            $('#form_registrazione_versione_pro input').addClass("d-none")
        }
    }


    /**
     * Scelta utente privato - Gestione dei campi
     */
    function selezione_utente_privato() {

        //todo: Ridondandte
        // # eliminaimao il controllo non serve
        // if (
        //     !$(
        //         "#contenitore_codice_destinatario , #row_societa_piva , #row_societa_piva , #row_nota"
        //     ).hasClass("d-none")
        // ) {
        //     $("#contenitore_codice_destinatario").addClass("d-none");
        //     $("#row_societa_piva").addClass("d-none");
        //     $("#row_nota").addClass("d-none");
        //     // ! add display none input
        //     $("#contenitore_codice_destinatario input").addClass("d-none");
        //     $("#row_societa_piva input").addClass("d-none");
        // }

        $("#contenitore_codice_destinatario").addClass("d-none");
        $("#row_societa_piva").addClass("d-none");
        $("#row_nota").addClass("d-none");

        // ! add display none input
        $("#contenitore_codice_destinatario input").addClass("d-none");
        $("#row_societa_piva input").addClass("d-none");


        //Nome, Cognome - Rimuovo etichetta (non riportato in Fattura)
        $("#lbl_registrazione_nome_no_in_fattura").addClass("d-none");
        $("#lbl_registrazione_cognome_no_in_fattura").addClass("d-none");

        // Nome, cognome - Campi richiesti
        $("#row_fatturazione_nome").removeClass("d-none");
        $("#row_fatturazione_cognome").removeClass("d-none");
        // ! remove display none input
        $("#row_fatturazione_nome input").removeClass("d-none");
        $("#row_fatturazione_cognome input").removeClass("d-none");

        //# elemento tolto in sendago
        // $('#input_cfiscale').attr('pattern', '.{16,16}');


        // $('#input_registrazione_fatturazione_pec').removeAttr('required');
        // $('#input_registrazione_fatturazione_pec').prop('required', null);

        //     alert("priv") ;
    }


    /**
     * Scelta utente azienda - Gestione dei campi
     */
    function selezione_utente_azienda() {

        //Nome, Cognome -  aggiungo  etichetta (non riportato in Fattura)
        $("#lbl_registrazione_nome_no_in_fattura").removeClass("d-none");
        $("#lbl_registrazione_cognome_no_in_fattura").removeClass("d-none");

        $("#contenitore_codice_destinatario").removeClass("d-none");
        $("#row_societa_piva").removeClass("d-none");
        $("#row_nota").removeClass("d-none");

        // ! remove display none input
        $("#contenitore_codice_destinatario input").removeClass("d-none");
        $("#row_societa_piva input").removeClass("d-none");

        //societa obbligatorio
        $("#input_societa").attr("required", true);
        $("#req_societa").removeClass("d-none");


        //# elemento tolto in sendago
        // Codice fiscale non obbligatorio
        // $("#input_cfiscale").attr("required", false);
        // $("#req_cfiscale").addClass("d-none");

        // #ripetuto due volte
        // Partita iva obbligatoria
        // $("#input_piva").attr("required", true);
        // $("#req_piva").removeClass("d-none");


        // Partita iva obbligatoria
        $("#input_piva").attr("required", true);
        $("#req_piva").removeClass("d-none");

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_pec').attr('required', true);
        //! già commentanti in precedenza
        //  $('#input_registrazione_fatturazione_pec').removeAttr('required') ;
        //  $('#input_registrazione_fatturazione_pec').prop('required', null) ;

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_codice_destinatario').removeAttr('required');
        // $('#input_registrazione_fatturazione_codice_destinatario').prop('required', null);

        // $('#input_cfiscale').attr('pattern', '.{11,16}');
        // $('#input_registrazione_fatturazione_codice_destinatario').attr('pattern', '.{7,7}');



    }


    function selezione_utente_ditta_individuale() {

        //Nome, Cognome - Rimuovo etichetta (non riportato in Fattura)
        $("#lbl_registrazione_nome_no_in_fattura").addClass("d-none");
        $("#lbl_registrazione_cognome_no_in_fattura").addClass("d-none");

        $("#contenitore_codice_destinatario").removeClass("d-none");
        $("#row_societa_piva").removeClass("d-none");
        $("#row_nota").removeClass("d-none");
        // ! remove display none input
        $("#contenitore_codice_destinatario input").removeClass("d-none");
        $("#row_societa_piva input").removeClass("d-none");


        //Gestione fatturazione

        //societa non obbligatorio
        $("#input_societa").attr("required", false);
        $("#req_societa").addClass("d-none");


        //# elemento tolto in sendago
        // Codice fiscale   obbligatorio
        // $("#input_cfiscale").attr("required", true);
        // $("#req_cfiscale").removeClass("d-none");

        // Partita iva obbligatoria
        $("#input_piva").attr("required", true);
        $("#req_piva").removeClass("d-none");


        // Nome, cognome - Campi richiesti
        $("#row_fatturazione_nome").removeClass("d-none");
        $("#row_fatturazione_cognome").removeClass("d-none");

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_pec').attr('required', true);
        //! già commentanti in precedenza
        //    $('#input_registrazione_fatturazione_pec').removeAttr('required') ;
        //   $('#input_registrazione_fatturazione_pec').prop('required', null) ;


        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_codice_destinatario').removeAttr('required');
        // $('#input_registrazione_fatturazione_codice_destinatario').prop('required', null);


        // $('#input_cfiscale').attr('pattern', '.{16,16}');
        // $('#input_registrazione_fatturazione_codice_destinatario').attr('pattern', '.{7,7}');

    }


    /**
     * Scelta utente pubblica amministrazione - Gestione dei campi
     */
    function selezione_utente_pubblica_amministrazione() {
        //Nome, Cognome -  aggiungo  etichetta (non riportato in Fattura)
        $("#lbl_registrazione_nome_no_in_fattura").removeClass("d-none");
        $("#lbl_registrazione_cognome_no_in_fattura").removeClass("d-none");

        $("#contenitore_codice_destinatario").removeClass("d-none");
        $("#row_societa_piva").removeClass("d-none");
        $("#row_nota").removeClass("d-none");
        // ! remove display none input
        $("#contenitore_codice_destinatario input").removeClass("d-none");
        $("#row_societa_piva input").removeClass("d-none");



        //societa obbligatorio
        $("#input_societa").attr("required", true);
        $("#req_societa").removeClass("d-none");

        //# elemento tolto in sendago
        // Codice fiscale   obbligatorio
        // $("#input_cfiscale").attr("required", true);
        // $("#req_cfiscale").removeClass("d-none");

        // Partita iva  non obbligatoria
        $("#input_piva").attr("required", false);
        $("#req_piva").addClass("d-none");

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_pec').attr('required', true);
        //! già commentanti in precedenza
        //     $('#input_registrazione_fatturazione_pec').removeAttr('required') ;
        //    $('#input_registrazione_fatturazione_pec').prop('required', null) ;

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_codice_destinatario').removeAttr('required');
        // $('#input_registrazione_fatturazione_codice_destinatario').prop('required', null);

        // $('#input_cfiscale').attr('pattern', '.{11,16}');
        // $('#input_registrazione_fatturazione_codice_destinatario').attr('pattern', '.{6,6}');
    }


    /**
     * Scelta utente ente associazione - Gestione dei campi
     */
    function selezione_utente_ente_associazione() {
        //Nome, Cognome -  aggiungo  etichetta (non riportato in Fattura)
        $("#lbl_registrazione_nome_no_in_fattura").removeClass("d-none");
        $("#lbl_registrazione_cognome_no_in_fattura").removeClass("d-none");

        $("#contenitore_codice_destinatario").removeClass("d-none");
        $("#row_societa_piva").removeClass("d-none");
        $("#row_nota").removeClass("d-none");
        // ! remove display none input
        $("#contenitore_codice_destinatario input").removeClass("d-none");
        $("#row_societa_piva input").removeClass("d-none");



        //societa obbligatorio
        $("#input_societa").attr("required", true);
        $("#req_societa").removeClass("d-none");

        //# elemento tolto in sendago
        // Codice fiscale   obbligatorio
        // $("#input_cfiscale").attr("required", true);
        // $("#req_cfiscale").removeClass("d-none");


        // Partita iva  non obbligatoria
        $("#input_piva").attr("required", false);
        $("#req_piva").addClass("d-none");

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_pec').attr('required', true);
        //! già commentanti in precedenza
        //    $('#input_registrazione_fatturazione_pec').removeAttr('required') ;
        //    $('#input_registrazione_fatturazione_pec').prop('required', null) ;

        //# elemento tolto in sendago
        // $('#input_registrazione_fatturazione_codice_destinatario').removeAttr('required');
        // $('#input_registrazione_fatturazione_codice_destinatario').prop('required', null);

        //# elemento tolto in sendago
        // $('#input_cfiscale').attr('pattern', '.{11,16}');
        // $('#input_registrazione_fatturazione_codice_destinatario').attr('pattern', '.{6,6}');
    }

    //# elemento tolto in sendago
    /**
     * Scelta utente ente associazione - Gestione dei campi
     */
    // function selezione_utente_split_payment() {
    //     //Nome, Cognome -  aggiungo  etichetta (non riportato in Fattura)
    //     $("#lbl_registrazione_nome_no_in_fattura").removeClass("d-none");
    //     $("#lbl_registrazione_cognome_no_in_fattura").removeClass("d-none");

    //     $("#contenitore_codice_destinatario").removeClass("d-none");
    //     $("#row_societa_piva").removeClass("d-none");
    //     $("#row_nota").removeClass("d-none");
    //     // ! remove display none input
    //     $("#contenitore_codice_destinatario input").removeClass("d-none");
    //     $("#row_societa_piva input").removeClass("d-none");



    //     //societa obbligatorio
    //     $("#input_societa").attr("required", true);
    //     $("#req_societa").removeClass("d-none");

    //     // Codice fiscale   obbligatorio
    //     $("#input_cfiscale").attr("required", true);
    //     $("#req_cfiscale").removeClass("d-none");


    //     // Partita iva  non obbligatoria
    //     $("#input_piva").attr("required", false);
    //     $("#req_piva").addClass("d-none");

    //     $('#input_registrazione_fatturazione_pec').attr('required', true);
    //     //    $('#input_registrazione_fatturazione_pec').removeAttr('required') ;
    //     //    $('#input_registrazione_fatturazione_pec').prop('required', null) ;

    //     $('#input_registrazione_fatturazione_codice_destinatario').removeAttr('required');
    //     $('#input_registrazione_fatturazione_codice_destinatario').prop('required', null);

    //     $('#input_cfiscale').attr('pattern', '.{11,16}');
    //     $('#input_registrazione_fatturazione_codice_destinatario').attr('pattern', '.{6,6}');
    // }


    // Se seleziono un paese straniero p.iva e c.f sono validati

    $("#cod_paese").on("change", function () {
        var country_code_check = $(this).val();
        var tipo_utente_registrato = $("#selectTipologiaRegistrazioneCustomer").val()


        if (country_code_check.toUpperCase() == 'ES' || country_code_check.toUpperCase() == 'PT') {
            if (tipo_utente_registrato == 1 || tipo_utente_registrato == 3) {
                $('#input_cfiscale').attr('pattern', '.{16,16}');
            } else {
                $('#input_cfiscale').attr('pattern', '.{11,16}');
            }
            $('#input_piva').attr('pattern', '.{11,11}');
        } else {
            $('#input_cfiscale').attr('pattern', '.{0,32}');
            $('#input_piva').attr('pattern', '.{0,32}');
        }
    });


    $("#btn-salva-registrazione-customer, #btn-nwls, #btn-nwpss ").click(
        function () {
            checkvalidation();
        }
    );

    $("#input_registrazione_nome").on("change", function () {
        $("#input_registrazione_fatturazione_nome").val($(this).val());
    });

    $("#input_registrazione_cognome").on("change", function () {
        $("#input_registrazione_fatturazione_cognome").val($(this).val());
    });

    $("form.needs-validation input").on("focusout", function () {
        if (
            $(this).attr("id") != "prov-input" &&
            $(this).attr("id") != "cap-input"
        )
            if ($(this).val() == "" || $(this).val() == null) {
                $(this).next().removeClass("filledInput");
            } else {
                if ($(this).attr("type") != "radio")
                    $(this).next().addClass("filledInput");
            }
    });

    //# funzione nascosta per mancato utilizzo
    // ! non ci sono campi con #radio
    // function nascondicampi_onready() {
    //     $("#contenitore_codice_destinatario").addClass("d-none");
    //     $("#row_societa_piva").addClass("d-none");
    //     $("#row_nota").addClass("d-none");
    //     //     $("#contenitore_postalcode").addClass("d-none");
    // }

    //# funzione nascosta per mancato utilizzo
    // ! non ci sono campi con #radio
    // function visualizza_campi_fatturazione_azienda() {
    //     $("#contenitore_codice_destinatario").removeClass("d-none");
    //     $("#row_societa_piva").removeClass("d-none");
    //     $("#row_nota").removeClass("d-none");
    //     if ($("#req_cfiscale").hasClass("d-none")) {
    //         $("#req_cfiscale").removeClass("d-none");
    //     }
    //     if ($("#req_societa").hasClass("d-none")) {
    //         $("#req_societa").removeClass("d-none");
    //     }
    // }
    //# funzione nascosta per mancato utilizzo
    // ! non ci sono campi con #radio
    // function azienda_required_attr() {
    //     if ($("#radio_azienda").is(":checked")) {
    //         if (!$("#req_cfiscale").hasClass("d-none")) {
    //             $("#req_cfiscale").addClass("d-none");
    //         }
    //         $("#input_cfiscale").attr("required", false);

    //         $("#input_societa").attr("required", true);
    //         piva_required_attr();
    //     }
    // }
    //# funzione nascosta per mancato utilizzo
    // ! non ci sono campi con #radio
    // function ditta_required_attr() {
    //     if ($("#radio_ditta").is(":checked")) {
    //         if (!$("#req_societa").hasClass("d-none")) {
    //             $("#req_societa").addClass("d-none");
    //         }
    //         $("#input_societa").attr("required", false);

    //         piva_required_attr();
    //     }
    // }
    //# funzione nascosta per mancato utilizzo
    // ! non ci sono campi con #radio
    // function piva_required_attr() {
    //     if ($("#req_piva").hasClass("d-none")) {
    //         $("#req_piva").removeClass("d-none");
    //     }
    //     $("#input_piva").attr("required", true);
    // }

    // !!!!!!!!!!!!!!!!!!!!!!!!!
    // !!! VALIDATORE CUSTOM !!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!
    function checkvalidation() {

        try {
            console.log("Check reg");
            if (
                $('#typeahead-localita').length
                && $('#typeahead-localita').val() != ''
                && $('#input_registrazione_fatturazione_enabled').length
                && $('#input_registrazione_fatturazione_enabled').val() == '1'
                && $('#cap-input').length
                && $('#cap-input').val() == ''
                && $('#input_registrazione_fatturazione_cap_id').length
                && $('#input_registrazione_fatturazione_cap_id').val() == ''
            ) {
                indexUrl = window.location.href;
                var indexUrl = indexUrl.indexOf("registrazione");
                if (indexUrl !== -1) {
                    $('#typeahead-localita').val('');
                    $("#cap-input").val("");
                    $("#prov-input").val("");
                    $("#typeahead-localita").removeAttr("disabled");
                    $("#typeahead-localita").typeahead("val", "");
                    //   console.log("patched");
                }
            } else {
                //   console.log("Ok") ;
            }
        } catch (e) {
            console.log('errore', e);
        }

        // oggetto con i parametri da validare ed i messaggi di errore
        const paramForm = {
            selectorForm: "form",
            localization: localStorage.getItem("LOCALE").toUpperCase(),
            isAllRequired: {
                isActive: true,
                message: {
                    validMessage: traduzioni.valid_message_required,
                    invalidMessage: traduzioni.invalid_message_required
                }
            },
            validationNameSurname: {
                isActive: true,
                maxLength: 50,
                minLength: 3,
                message: {
                    validMessage: 'ok',
                    invalidMessage: 'no validate',
                    invalidMessageMaxLength: `${traduzioni.invalid_message_max_length} 3 - 50`

                }
            },
            validationMail: {
                isActive: true,
                maxLength: 50,
                message: {
                    validMessage: traduzioni.valid_message_email,
                    invalidMessage: traduzioni.invalid_message_email,
                    invalidMessageMaxLength: `${traduzioni.invalid_message_max_length} 50`

                }
            },
            validationPostalCode: {
                isActive: true,
                message: {
                    validMessage: traduzioni.valid_message_postalCode,
                    invalidMessage: traduzioni.invalid_message_postalCode
                }
            },
            validationTaxId: {
                isActive: true,
                maxLength: 11,
                message: {
                    validMessage: traduzioni.valid_message_tax_id,
                    invalidMessage: traduzioni.invalid_message_tax_id,
                    invalidMessageMaxLength: `${traduzioni.invalid_message_max_length} 11`
                }
            },
            validationPhone: {
                isActive: true,
                minLength: 6,
                maxLength: 10,
                minLengthWhitAllPrefix: 8,
                maxLengthWhitAllPrefix: 20,
                // accettiamo che l'utente inserisca qualiasi indirizzo internazionale
                acceptALLInternationalCode: true,
                // normalizationNumber: anche se vengono inseriti valori non numerici o caratteri speciali la funzione li escluderà andando a controllare solo i numeri
                normalizationNumber: false,

                // accettiamo che l'utente inserisca un prefisso internazionale nel numero
                acceptNumberWithInternationalCode: true,
                // eliminiamo dal value il prefisso internazionale (se validato in precedenza) per tornare il numero senza  di esso
                cutPrefixInternationalToResault: false,

                //^ validiamo il prefisso della compagnia telefonica o della regione
                validationPrefixCompanyPhoneOrRegion: false,
                //^ validazione del length parametro preso NELL'OGGETTO 'objLocalizationPath'
                validationLength: true,

                message: {
                    validMessage: traduzioni.valid_message_phone_generic,
                    invalidMessage: traduzioni.invalid_message_phone_generic,
                    errorLengthMessage: traduzioni.invalid_message_phone_length,
                    errorPrefixCompanyRegion: traduzioni.invalid_message_prefix_company_region,
                    errorLengthNumberWhithAllPRefix: `${traduzioni.invalid_message_max_length} 8 - 20`,
                    errorSpecialCharacters: traduzioni.invalid_special_characters
                }
            },
            validationAlias: {
                isActive: true,
                maxLength: 43,
                message: {
                    invalidMessageMaxLength: `${traduzioni.invalid_message_max_length} 43`
                }
            },
            compare: {
                field: ['password']
            }



        };

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll(".needs-validation");
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                "submit",
                function (event) {
                    let validation = new Validator(paramForm, event.target).isValidForm;

                    if (!validation || !form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                        status_validation = false;
                    } else {

                        console.log('°°°°°°° entrambe le validazioni passate °°°°°°°°');
                    }
                    form.classList.add("was-validated");
                }, false
            );
        });
    }
    // !!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!! END !!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!

    $(function () {
        $("#btn-salva-registrazione-customer").click(function () {
            var required = $(".reg").filter("[required]:visible");
            var allRequired = true;
            required.each(function () {
                // consoleLog($(this).attr("id"), $(this).attr("type"));
                if (


                    ($(this).attr("type") != "checkbox" &&
                        $(this).val() == "") ||
                    ($(this).attr("type") == "checkbox" &&
                        $(this).is(":checked") == false)
                ) {
                    allRequired = false;
                }
            });

            if (allRequired) {
                // Submit form
                //   console.log("--- REGISTRAZIOE READY SUBMIT ----- ");
                $("#form_registrazione").submit();
            } else {
                $("#modal_registrazione_error").modal("show");
            }
        });
    });

    try {


        var sceltaLocalitaPartenza = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: "/ajax/shipment/search_locality",
                wildcard: "%QUERY",
                cache: false,
                rateLimitWait: 200,
                replace: function (url, query) {
                    var url = "/ajax/shipment/search_locality";
                    return (
                        url +
                        "?word=" +
                        query +
                        "&country_iso=" +
                        $("#cod_paese").val()
                    );
                },
            },
        });

        $("#typeahead-localita")
            .typeahead(
                { hint: false, minLength: 3 },
                {
                    limit: 60,
                    name: "cerca-localita",
                    display: "value",
                    source: sceltaLocalitaPartenza,
                    templates: {
                        empty: function (context) {
                            $(".tt-dataset").html(
                                '<div class="px-2">Nessun risultato</div>'
                            );
                        },
                    },
                }
            )
            .on("typeahead:selected", function (ev, suggestion) {
                let cap = suggestion.cap;
                let provincia = suggestion.StateOrProvinceCode;

                let cap_id = suggestion.cap_id;
                let country_id = suggestion.country_id;
                let city = suggestion.comune;

                if (suggestion.iso_code != 'es' && suggestion.iso_code != 'pt') {
                    cap_id = suggestion.postalCodeID;
                    city = suggestion.locality;
                }

                $("#cap-input").val(cap);
                $("#prov-input").val(provincia);
                $("#cap-input").addClass('up_label');
                $("#prov-input").addClass('up_label');



                $("#input_registrazione_fatturazione_localita").val(city);
                $("#input_registrazione_fatturazione_cap_id").val(cap_id);
                $("#input_registrazione_fatturazione_country_id").val(country_id);


                $("#clear-localita").removeClass("d-none");
                $("#typeahead-localita").attr("disabled", true);
            })
            .on("typeahead:asyncrequest", function () {

                $("#spinnerLocalita").removeClass("d-none");
            })
            .on("typeahead:asynccancel typeahead:asyncreceive", function () {

                $("#spinnerLocalita").addClass("d-none");
            });

        $("#typeahead-localita").on("focusin", function () {
            $("#labelLocalita").addClass("filledInput");
        });

        $("#typeahead-localita").on("focusout", function () {
            if ($(this).val() == "" || $(this).val() == null) {
                $("#labelLocalita").removeClass("filledInput");
            }
        });

        $("#clear-localita").click(function () {
            $("#cap-input").val("");
            $("#prov-input").val("");
            $("#cap-input").removeClass('up_label');
            $("#prov-input").removeClass('up_label');
            $("#typeahead-localita").removeAttr("disabled");
            $("#typeahead-localita").typeahead("val", "");
            $(this).addClass("d-none");
        });

    } catch (err) {
        //  consoleLog("Login-registrazione", "Error typeahead-Bloodhound")
    }

});
