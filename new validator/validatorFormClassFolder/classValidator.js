(function (window, document, undefined) {
    const messageVal = {
        invalid: {
            required: traduzioni.invalid_message_required,
            email: traduzioni.invalid_message_email,
            postalcode: traduzioni.invalid_message_postalCode,
            checkTaxId: traduzioni.invalid_message_tax_id,
            checkTaxIdEs: traduzioni.invalid_cif_nif_dni,
            specialCharacters: traduzioni.invalid_special_characters,
            matchUp: traduzioni.invalid_match_up,
            maxLength: traduzioni.invalid_message_max_length,
            phoneLv1: traduzioni.invalid_message_phone_generic,
            phoneLv2: traduzioni.invalid_message_phone_lv2,
            phoneLv3: traduzioni.invalid_message_phone_lv3,
            compare: traduzioni.invalid_message_compare,
            forbiddenCharacters: traduzioni.invalid_message_forbiddenCharacters,
            minLength: traduzioni.invalid_message_minLength,
            alpha: traduzioni.invalid_message_alpha,
            numeric: traduzioni.invalid_message_numeric,
            integer: traduzioni.invalid_message_integer,
            alphaNumeric: traduzioni.invalid_message_alphaNumeric,
            exactLength: traduzioni.invalid_message_exactLength,
        },
        valid: {
            required: traduzioni.valid_message_required,
            email: traduzioni.valid_message_email,
            postalCode: traduzioni.valid_message_postalCode,
            taxId: traduzioni.valid_message_tax_id,
            phoneGeneric: traduzioni.valid_message_phone_generic
        },
        default: 'Enter a valid value'
    };
    const genericRegexVal = {
        phoneNumberWhitPrefix: /^((00|\+))??3\d{0,20}$/,
        ruleRegex: /^(.+?)\[(.+)\]$/,
        numericRegex: /^[0-9]+$/,
        integerRegex: /^\-?[0-9]+$/,
        decimalRegex: /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        emailRegex2: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}/,
        alphaRegex: /^[a-z]+$/i,
        alphaNumericRegex: /^[a-z0-9]+$/i,
        alphaDashRegex: /^[a-z0-9_\-]+$/i,
        naturalRegex: /^[0-9]+$/i,
        naturalNoZeroRegex: /^[1-9][0-9]*$/i,
        ipRegex: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex: /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex: /^[\d\-\s]+$/,
        urlRegex: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        dateRegex: /\d{4}-\d{1,2}-\d{1,2}/,
        dni: /^(\d{8})([A-Z])$/,
        cfi: /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/,
        nie: /^[XYZ]\d{7,8}[A-Z]$/
    };
    const postalCodeRegex = {
        GB: /GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4}$/,
        JE: /^JE\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}$/,
        GG: /^GY\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}$/,
        IM: /^IM\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}$/,
        US: /^\d{5}([ \-]\d{4})?/,
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/,
        DE: /^\d{5}$/,
        JP: /^\d{3}-\d{4}$/,
        FR: /^\d{2}[ ]?\d{3}$/,
        AU: /^\d{4}$/,
        IT: /^\d{5}$/,
        CH: /^\d{4}$/,
        AT: /^\d{4}$/,
        ES: /^\d{5}$/,
        NL: /^\d{4}[ ]?[A-Z]{2}$/,
        BE: /^\d{4}$/,
        DK: /^\d{4}$/,
        SE: /^\d{3}[ ]?\d{2}$/,
        NO: /^\d{4}$/,
        BR: /^\d{5}[\-]?\d{3}$/,
        PT: /^\d{4}([\-]\d{3})?/,
        FI: /^\d{5}$/,
        AX: /^22\d{3}$/,
        KR: /^\d{3}[\-]\d{3}$/,
        CN: /^\d{6}$/,
        TW: /^\d{3}(\d{2})?/,
        SG: /^\d{6}$/,
        DZ: /^\d{5}$/,
        AD: /^AD\d{3}$/,
        AR: /^([A-HJ-NP-Z])?\d{4}([A-Z]{3})?/,
        AM: /^(37)?\d{4}$/,
        AZ: /^\d{4}$/,
        BH: /^((1[0-2]|[2-9])\d{2})?/,
        BD: /^\d{4}$/,
        BB: /^(BB\d{5})?/,
        BY: /^\d{6}$/,
        BM: /^[A-Z]{2}[ ]?[A-Z0-9]{2}$/,
        BA: /^\d{5}$/,
        IO: /^BBND 1ZZ/,
        BN: /^[A-Z]{2}[ ]?\d{4}$/,
        BG: /^\d{4}$/,
        KH: /^\d{5}$/,
        CV: /^\d{4}$/,
        CL: /^\d{7}$/,
        CR: /^\d{4,5}|\d{3}-\d{4}$/,
        HR: /^\d{5}$/,
        CY: /^\d{4}$/,
        CZ: /^\d{3}[ ]?\d{2}$/,
        DO: /^\d{5}$/,
        EC: /^([A-Z]\d{4}[A-Z]|(?:[A-Z]{2})?\d{6})?/,
        EG: /^\d{5}$/,
        EE: /^\d{5}$/,
        FO: /^\d{3}$/,
        GE: /^\d{4}$/,
        GR: /^\d{3}[ ]?\d{2}$/,
        GL: /^39\d{2}$/,
        GT: /^\d{5}$/,
        HT: /^\d{4}$/,
        HN: /^(?:\d{5})?/,
        HU: /^\d{4}$/,
        IS: /^\d{3}$/,
        IN: /^\d{6}$/,
        ID: /^\d{5}$/,
        IL: /^\d{5}$/,
        JO: /^\d{5}$/,
        KZ: /^\d{6}$/,
        KE: /^\d{5}$/,
        KW: /^\d{5}$/,
        LA: /^\d{5}$/,
        LV: /^\d{4}$/,
        LB: /^(\d{4}([ ]?\d{4})?)?/,
        LI: /^(948[5-9])|(949[0-7])/,
        LT: /^\d{5}$/,
        LU: /^\d{4}$/,
        MK: /^\d{4}$/,
        MY: /^\d{5}$/,
        MV: /^\d{5}$/,
        MT: /^[A-Z]{3}[ ]?\d{2,4}$/,
        MU: /^(\d{3}[A-Z]{2}\d{3})?/,
        MX: /^\d{5}$/,
        MD: /^\d{4}$/,
        MC: /^980\d{2}$/,
        MA: /^\d{5}$/,
        NP: /^\d{5}$/,
        NZ: /^\d{4}$/,
        NI: /^((\d{4}-)?\d{3}-\d{3}(-\d{1})?)?/,
        NG: /^(\d{6})?/,
        OM: /^(PC )?\d{3}$/,
        PK: /^\d{5}$/,
        PY: /^\d{4}$/,
        PH: /^\d{4}$/,
        PL: /^\d{2}-\d{3}$/,
        PR: /^00[679]\d{2}([ \-]\d{4})?/,
        RO: /^\d{6}$/,
        RU: /^\d{6}$/,
        SM: /^4789\d/,
        SA: /^\d{5}$/,
        SN: /^\d{5}$/,
        SK: /^\d{3}[ ]?\d{2}$/,
        SI: /^\d{4}$/,
        ZA: /^\d{4}$/,
        LK: /^\d{5}$/,
        TJ: /^\d{6}$/,
        TH: /^\d{5}$/,
        TN: /^\d{4}$/,
        TR: /^\d{5}$/,
        TM: /^\d{6}$/,
        UA: /^\d{5}$/,
        UY: /^\d{5}$/,
        UZ: /^\d{6}$/,
        VA: /^00120/,
        VE: /^\d{4}$/,
        ZM: /^\d{5}$/,
        AS: /^96799/,
        CC: /^6799/,
        CK: /^\d{4}$/,
        RS: /^\d{6}$/,
        ME: /^8\d{4}$/,
        CS: /^\d{5}$/,
        YU: /^\d{5}$/,
        CX: /^6798/,
        ET: /^\d{4}$/,
        FK: /^FIQQ 1ZZ/,
        NF: /^2899/,
        FM: /^(9694[1-4])([ \-]\d{4})?/,
        GF: /^9[78]3\d{2}$/,
        GN: /^\d{3}$/,
        GP: /^9[78][01]\d{2}$/,
        GS: /^SIQQ 1ZZ/,
        GU: /^969[123]\d([ \-]\d{4})?/,
        GW: /^\d{4}$/,
        HM: /^\d{4}$/,
        IQ: /^\d{5}$/,
        KG: /^\d{6}$/,
        LR: /^\d{4}$/,
        LS: /^\d{3}$/,
        MG: /^\d{3}$/,
        MH: /^969[67]\d([ \-]\d{4})?/,
        MN: /^\d{6}$/,
        MP: /^9695[012]([ \-]\d{4})?/,
        MQ: /^9[78]2\d{2}$/,
        NC: /^988\d{2}$/,
        NE: /^\d{4}$/,
        VI: /^008(([0-4]\d)|(5[01]))([ \-]\d{4})?/,
        PF: /^987\d{2}$/,
        PG: /^\d{3}$/,
        PM: /^9[78]5\d{2}$/,
        PN: /^PCRN 1ZZ/,
        PW: /^96940/,
        RE: /^9[78]4\d{2}$/,
        SH: /^(ASCN|STHL) 1ZZ/,
        SJ: /^\d{4}$/,
        SO: /^\d{5}$/,
        SZ: /^[HLMS]\d{3}$/,
        TC: /^TKCA 1ZZ/,
        WF: /^986\d{2}$/,
        XK: /^\d{5}$/,
        YT: /^976\d{2}$/
    };
    const taxIdRegex = {
        AL: /[J|K][0-9]{8}{L]/,
        AR: /[0-9]{11}/,
        AU: /[0-9]{11}/,
        AT: /ATU[0-9]{8}/,
        BY: /[0-9]{9}/,
        BE: /BE0[0-9]{9}/,
        BO: /[0-9]{7}/,
        BR: /[0-9]{8}/,
        BG: /BG[0-9]{9,10}/,
        CA: /[0-9A-Z]{8,9}/,
        CL: /[0-9]{8}/,
        CN: /[0-9]{18}/,
        CO: /[0-9]{9}/,
        CR: /[0-9]{10,12}/,
        HR: /HR\d{11}/,
        CY: /CY[0-9]{8,9}L/,
        CZ: /CZ[0-9]{8,10}/,
        DK: /DK[0-9]{8}/,
        DO: /[0-9]{9}/,
        EC: /[0-9]{13}/,
        SV: /[0-9]{14}/,
        EE: /EE[0-9]{9}/,
        FI: /FI[0-9]{8}/,
        FR: /FR[0-9A-Z]{2}[0-9]{9}/,
        DE: /DE[0-9]{9}/,
        GR: /(EL|GR)[0-9]{9}/,
        GT: /[0-9]{9}/,
        HN: /[0-9]{14}/,
        HK: /[0-9]{8}/,
        HU: /HU[0-9]{8}/,
        IS: /[0-9][A-Z]{6}/,
        ID: /[0-9]{15}/,
        IN: /[0-9]{10}{V|C}{1}/,
        IE: /IE[0-9]S[0-9]{5}L/,
        IL: /[0-9]{9}/,
        IT: /IT[0-9]{11}/,
        JP: /[0-9]{12,13}/,
        LV: /LV[0-9]{11}/,
        LT: /LT([0-9]{9}|[0-9]{12})/,
        LU: /(LU)?[0-9]{8}/,
        MT: /MT[0-9]{8}/,
        MX: /([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]:|2[0-9]|3[0-1])[A-Z|\d]{3})/,
        NL: /NL[0-9]{9}B[0-9]{2}/,
        NZ: /[0-9]{13}/,
        NI: /([0-9]{13})([A-Z]{1})/,
        NO: /MVA[0-9]{9}/,
        PA: /[0-9]{14}/,
        PY: /[0-9]{7}/,
        PE: /[0-9]{11}/,
        PH: /[0-9]{12}/,
        PL: /PL[0-9]{10}/,
        PT: /PT[0-9]{9}/,
        RO: /(RO)?[0-9]{2,10}/,
        RU: /[0-9]{10,12}/,
        SM: /[0-9]{5}/,
        RS: /[0-9]{9}/,
        SK: /SK[0-9]{10}/,
        SI: /SI[0-9]{8}/,
        ES: /[0-9A-Z][0-9]{7}[0-9A-Z]/,
        // ESOLD: /ES[0-9A-Z][0-9]{7}[0-9A-Z]/,
        SE: /SE[0-9]{12}/,
        CH: /CHE[0-9]{6,9}/,
        TR: /[0-9]{10}/,
        UA: /[0-9]{10}/,
        GB: /GB([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})/,
        UY: /[0-9]{12}/,
        US: /\d{2}-\d{7}/,
        UZ: /[2|4][0000000}[X][2|4][0-9]{7}[X]/,
        VE: /[J|K|V|E]{9}/
    };
    const objLocalizationPath = {
        IT: {
            localization: "IT",
            prefixInternational: ["+39", "0039"],

            prefixCompanyCellular: [
                "330", "333", "334", "335", "336", "337", "338", "339", "360", "363", "366", "368", "352", "340", "342", "345", "346", "347", "348", "349", "320", "323", "327", "328", "329", "380", "383", "388", "389", "390", "391", "392", "393", "397", "331", "370", "353", "375", "379", "373", "350", "351", "382", "376", "371", "377", "378",
            ],
            prefixRegionHomePhone: [
                "00419", "010", "011", "0121", "0122", "0123", "0124", "0125", "0131", "0141", "0142", "0143", "0144", "015", "0161", "0163", "0165", "0166", "0171", "0172", "0173", "0174", "0175", "0182", "0183", "0184", "0185", "0187", "019", "02", "030", "031", "0321", "0322", "0323", "0324", "0331", "0332", "0341", "0342", "0343", "0344", "0345", "0346", "035", "0362", "0363", "0364", "0365", "0371", "0372", "0373", "0374", "0375", "0376", "0377", "0381", "0382", "0383", "0384", "0385", "0386", "039", "040", "041", "0421", "0422", "0423", "0424", "0425", "0426", "0427", "0428", "0429", "0431", "0432", "0433", "0434", "0435", "0436", "0437", "0438", "0439", "0442", "0444", "0445", "045", "0461", "0462", "0463", "0464", "0465", "0471", "0472", "0473", "0474", "0481", "049", "050", "051", "0521", "0522", "0523", "0524", "0525", "0532", "0533", "0534", "0535", "0536", "0541", "0542", "0543", "0544", "0545", "0546", "0547", "055", "0564", "0565", "0566", "0571", "0572", "0573", "0574", "0575", "0577", "0578", "0583", "0584", "0585", "0586", "0587", "0588", "059", "06", "070", "071", "0721", "0722", "0731", "0732", "0733", "0734", "0735", "0736", "0737", "0742", "0743", "0744", "0746", "075", "0761", "0763", "0765", "0766", "0771", "0773", "0774", "0775", "0776", "0781", "0782", "0783", "0784", "0785", "0789", "079", "080", "081", "0823", "0824", "0825", "0827", "0828", "0831", "0832", "0833", "0835", "0836", "085", "0861", "0862", "0863", "0864", "0865", "0871", "0872", "0873", "0874", "0875", "0881", "0882", "0883", "0884", "0885", "089", "090", "091", "0921", "0922", "0923", "0924", "0925", "0931", "0932", "0933", "0934", "0935", "0941", "0942", "095", "0961", "0962", "0963", "0964", "0965", "0966", "0967", "0968", "0971", "0972", "0973", "0974", "0975", "0976", "0981", "0982", "0983", "0984", "0985", "099"
            ],

        },
        ES: {
            localization: "ES",
            prefixInternational: ["+34", "0034"],
            prefixCompanyCellular: [
                '606', '608', '609', '616', '618', '619', '620', '626', '628', '629', '630', '636', '638', '639', '646', '648', '649', '650', '659', '660', '669', '676', '679', '680', '681', '682', '683', '686', '689', '690', '696', '699', '717', '605', '615', '625', '635', '645', '651', '652', '653', '654', '655', '656', '657', '658', '665', '675', '685', '691', '692', '747', '748', '600', '603', '607', '610', '617', '627', '634', '637', '647', '661', '662', '663', '664', '666', '667', '670', '671', '672', '673', '674', '677', '678', '687', '697', '711', '727', '622', '623', '633', '712', '722', '693', '694', '695', '688', '640', '641', '642', '643', '612', '631', '632', '604', '601', '684', '611', '644', '698'
            ],
            prefixRegionHomePhone: [
                '945', '845', '967', '867', '965', '966', '865', '950', '850', '984', '985', '884', '920', '820', '924', '824', ' 93', '83', '947', '847', '927', '827', '956', '856', '942', '842', '964', '864', '956', '926', '826', '957', '857', '981', '881', '969', '869', '972', '872', '958', '858', '949', '849', '943', '843', '959', '859', '974', '874', '971', '871', '953', '853', '987', '887', '973', '873', '982', '882', '91', '81', '951', '952', '851', '95', '968', '868', '948', '848', '988', '888', '979', '879', '928', '828', '986', '886', '941', '841', '923', '823', '921', '821', '954', '955', '854', '975', '875', '977', '877', '922', '822', '978', '878', '925', '825', '960', '961', '962', '963', '860', '983', '883', '944', '946', '846', '980', '880', '976', '876'
            ],

        },
    };
    const objReplaceCharacter = {
        'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Ă': 'A', 'Ā': 'A', 'Ą': 'A', 'Æ': 'A', 'Ǽ': 'A', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'ă': 'a', 'ā': 'a', 'ą': 'a', 'æ': 'a', 'ǽ': 'a', 'Þ': 'B', 'þ': 'b', 'ß': 'Ss', 'Ç': 'C', 'Č': 'C', 'Ć': 'C', 'Ĉ': 'C', 'Ċ': 'C', 'ç': 'c', 'č': 'c', 'ć': 'c', 'ĉ': 'c', 'ċ': 'c', 'Đ': 'Dj', 'Ď': 'D', 'Đ': 'D', 'đ': 'dj', 'ď': 'd', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ĕ': 'E', 'Ē': 'E', 'Ę': 'E', 'Ė': 'E', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ĕ': 'e', 'ē': 'e', 'ę': 'e', 'ė': 'e', 'Ĝ': 'G', 'Ğ': 'G', 'Ġ': 'G', 'Ģ': 'G', 'ĝ': 'g', 'ğ': 'g', 'ġ': 'g', 'ģ': 'g', 'Ĥ': 'H', 'Ħ': 'H', 'ĥ': 'h', 'ħ': 'h', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 'İ': 'I', 'Ĩ': 'I', 'Ī': 'I', 'Ĭ': 'I', 'Į': 'I', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'į': 'i', 'ĩ': 'i', 'ī': 'i', 'ĭ': 'i', 'ı': 'i', 'Ĵ': 'J', 'ĵ': 'j', 'Ķ': 'K', 'ķ': 'k', 'ĸ': 'k', 'Ĺ': 'L', 'Ļ': 'L', 'Ľ': 'L', 'Ŀ': 'L', 'Ł': 'L', 'ĺ': 'l', 'ļ': 'l', 'ľ': 'l', 'ŀ': 'l', 'ł': 'l', 'Ñ': 'N', 'Ń': 'N', 'Ň': 'N', 'Ņ': 'N', 'Ŋ': 'N', 'ñ': 'n', 'ń': 'n', 'ň': 'n', 'ņ': 'n', 'ŋ': 'n', 'ŉ': 'n', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O', 'Ō': 'O', 'Ŏ': 'O', 'Ő': 'O', 'Œ': 'O', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'ō': 'o', 'ŏ': 'o', 'ő': 'o', 'œ': 'o', 'ð': 'o', 'Ŕ': 'R', 'Ř': 'R', 'ŕ': 'r', 'ř': 'r', 'ŗ': 'r', 'Š': 'S', 'Ŝ': 'S', 'Ś': 'S', 'Ş': 'S', 'š': 's', 'ŝ': 's', 'ś': 's', 'ş': 's', 'Ŧ': 'T', 'Ţ': 'T', 'Ť': 'T', 'ŧ': 't', 'ţ': 't', 'ť': 't', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ũ': 'U', 'Ū': 'U', 'Ŭ': 'U', 'Ů': 'U', 'Ű': 'U', 'Ų': 'U', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ũ': 'u', 'ū': 'u', 'ŭ': 'u', 'ů': 'u', 'ű': 'u', 'ų': 'u', 'Ŵ': 'W', 'Ẁ': 'W', 'Ẃ': 'W', 'Ẅ': 'W', 'ŵ': 'w', 'ẁ': 'w', 'ẃ': 'w', 'ẅ': 'w', 'Ý': 'Y', 'Ÿ': 'Y', 'Ŷ': 'Y', 'ý': 'y', 'ÿ': 'y', 'ŷ': 'y', 'Ž': 'Z', 'Ź': 'Z', 'Ż': 'Z', 'Ž': 'Z', 'ž': 'z', 'ź': 'z', 'ż': 'z', 'ž': 'z', '.': ' ', '“': '"', '”': '"', '‘': "'", '’': "'", '•': '-', '…': '...', '—': '-', '–': '-', '¿': '?', '¡': '!', '°': ' ', '¼': ' 1/4 ', '½': ' 1/2 ', '¾': ' 3/4 ', '⅓': ' 1/3 ', '⅔': ' 2/3 ', '⅛': ' 1/8 ', '⅜': ' 3/8 ', '⅝': ' 5/8 ', '⅞': ' 7/8 ',
        '÷': ' divided by ', '×': ' times ', '±': ' plus-minus ', '√': ' square root ', '∞': ' infinity ',
        '≈': ' almost equal to ', '≠': ' not equal to ', '≡': ' identical to ', '≤': ' less than or equal to ', '≥': ' greater than or equal to ',
        '←': ' left ', '→': ' right ', '↑': ' up ', '↓': ' down ', '↔': ' left and right ', '↕': ' up and down ',
        '℅': ' care of ', '℮': ' estimated ', 'Ω': ' ohm ', '♀': ' female ', '♂': ' male ', '©': ' Copyright ', '®': ' Registered ', '™': ' Trademark '
    };
    const objCharactersToExclude = {
        1: ['"', '^', '/', '~', '`']
    }

    /**
     * @param  {object} param oggetto di configurazione passato lato client
     * @param  {object} fields evento oggetto di validazione che verrà poi convertito per tornare un oggetto con i nodi html dei fields da validare
     *
     * @return {boolean} validationForm elabora il valore del parametro this.isValidForm
     * 
     * @author Enomis
     * @version 1.0
     */
    class Validator {
        constructor(param, typeEvent, fields) {
            this.paramClient = param
            this.isValidForm = true;
            // this.form = this._isForm(fields) || {};
            this.isValidFields;
            this.fieldsToValidate = this._convertFields(fields);
            // console.log('fields', fields)
            // console.log('fieldsToValidate', this.fieldsToValidate)


            // riempito solo se viene inviato un fields input singolo
            this.valueInputField;

            // console.log('fieldsToValidate', this.fieldsToValidate)
            // console.log('valueInputField', this.valueInputField)
            if (this.valueInputField) {
                const elValType = this.valueInputField.getAttribute("data-validate-type");
                // console.log('elValType', elValType)

                let passControll = true;
                const fieldElement = this.valueInputField

                this._startValidation(this.paramClient, elValType, passControll, fieldElement)

            }
            if (this.fieldsToValidate) {
                $.each(this.fieldsToValidate, (index, element) => {
                    // siamo all'interno del ciclo dell'elemento da validare
                    // console.log('element', element)
                    const elValType = element.getAttribute("data-validate-type")
                    // console.log('elValType', elValType)
                    const fieldElement = element
                    let passControll = true;

                    this._startValidation(this.paramClient, elValType, passControll, fieldElement)
                })
            }




        }

        /**
         * 
         * @param {object} param - parametri per la validazione dei campi 'client'
         * @param {string} elValType - il tipo di validazione da andare ad applicare
         * @param {boolean} passControll - valore booleano che diventa false se un campo non passa una validazie 
         * @param {object} fieldElement - field completo dell'elemento da validare
         */
        _startValidation (param, elValType, passControll, fieldElement) {
            // creiamo un ciclo per validare l'elemento oggetto del ciclo con il suo relativo insieme di regole (rules)
            $.each(param.fieldValidation, (index, element) => {
                // cicliamo sui parametri passati dal client

                if (elValType == element.dataValidateType) {
                    // quando troviamo corrispondenza tra il data type dell'elemento e le regole passate dal client ....

                    // variabile con le regole
                    const rules = element.validationRules.split('|')
                    // cicliamo su rules e applichiamo i relativi metodi nel _hooks se il campo è visibile 
                    if (!$(fieldElement).hasClass('d-none')) {

                        $.each(rules, (index, element) => {
                            // se l'_hook è stato settato eseguiamo

                            // dividiamo il rule in un array con il secondo parametro se impostato e passiamo all' esecuzione dell' hook
                            let ruleParam = element.split('-');
                            if (typeof this._hooks[ruleParam[0]] === 'function') {
                                // console.log('passControll', passControll)
                                if (passControll) {
                                    if (!this._hooks[ruleParam[0]].apply(this, [fieldElement, ruleParam[1]])) {
                                        // settiamo la validazione su false se troviamo un elemento che non passa la validazione

                                        this.isValidForm = false;
                                        passControll = false;
                                        // andiamo a settare la classe
                                        this._toggleClass(fieldElement, false);
                                        // andiamo a settare il messaggio di errore 
                                        if (messageVal['invalid'][ruleParam[0]]) {
                                            this._insertMessage(fieldElement, false, messageVal['invalid'][ruleParam[0]]);
                                        } else {
                                            this._insertMessage(fieldElement, false, messageVal.default);
                                        }
                                    } else {
                                        this._toggleClass(fieldElement, true);
                                        this._insertMessage(fieldElement, true, messageVal.default);
                                    }
                                }
                            }
                            // console.log('element rules', element)
                        })

                    }

                }

            })
        }

        // CONVERTIAMO i campi in base al tipo di evento
        _convertFields (fields) {
            // console.log('fields', fields)
            if (fields.tagName == 'FORM') {
                // console.log('1 - form')
                this.valueInputField = false
                return fields
            } else if (fields.type == 'submit') {
                // console.log('2 - submit')
                this.valueInputField = false
                return fields.target
            } else if (fields.type == 'keyup' || fields.type == 'focusout') {
                // console.log('3 - keyup / focusout')
                this.valueInputField = false
                return fields.target
                // return fields.currentTarget
            } else if (fields.localName == 'input') {
                // console.log('4 - input')
                // console.log('4 - input', fields)
                this.valueInputField = fields
                return false


            } else {
                return false
            }
        }

        _toggleClass (element, isValid) {
            // console.log('element toggle class', element)
            $(element).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
        }

        _insertMessage (element, isValid, messageValidation) {
            isValid ? $(element).nextAll('.valid-feedback').html(`${messageValidation}`) : $(element).nextAll('.invalid-feedback').html(`${messageValidation}`)
        }

    }

    /*
     * @private
     * Oggetto contenente tutti gli hook di convalida
    */
    Validator.prototype._hooks = {


        // "default": function (field, defaultName) {
        //     return field.value !== defaultName;
        // },

        // matches: function (field, matchName) {
        //     var el = this.form[matchName];

        //     if (el) {
        //         return field.value === el.value;
        //     }

        //     return false;
        // },
        //^ validazione Comparazione
        /**
         * @param  {string} nameDataCompare - valore del campo del data-validate-compare parametro passato lato client nella stringa preceduta da un - es: compare-password
         * data-validate-compare='password'[campo 1]
         * data-validate-compare='password'[campo 2]
         * @return {boolean} setta IsValidForm a true o false se i campi sono uguali (true)
         *
         * @author Enomis
         * @version 1.0
        */
        compare: function (field, nameDataCompare) {
            let fieldCompare = $(`input[data-validate-compare="${nameDataCompare}"]`);
            if (fieldCompare.length > 1) {
                if (fieldCompare[0].value == fieldCompare[1].value) {
                    this.isValidForm = true;
                    $.each(fieldCompare, (index, element) => {
                        this._toggleClass(element, true)
                        // this.insertMessage(element, true, `${nameDataCompare} match up`)
                    })
                    return true
                } else {
                    this.isValidForm = false;
                    $.each(fieldCompare, (index, element) => {
                        this._toggleClass(element, false)
                    })
                    return false
                }
            }
        },

        //******************************* */

        /**
         * Controlliamo se sono stati inseriti caratteri uguali a quelli che noi reputiamo non ammissibili e ritorniamo un errore
         * 
         * @param  {object} field -valore dell'intero items
         * 
         * @return {string} -sett valore per il relativo sett di caratteri da confrontare
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0 *
        */
        forbiddenCharacters: function (field, sett) {
            arrValue = field.value.split('');
            var isValidString = true
            arrValue.map((element) => {

                if (objCharactersToExclude[sett].includes(element)) {
                    // console.log('################ trovato elemento non valido ################')
                    isValidString = false
                }
            })

            return isValidString
        },




        /**
         * Sostituiamo i valori del value andando a sostituire i caratteri speciali in base all'oggetto objReplaceCharacter
         * 
         * @param  {object} field -valore dell'intero items
         * 
         * @return {extra} modifica il value del field che subisce il replace in base all'oggetto con tutti i valori objReplaceCharacter
         * @return {boolean} string Replace width objReplaceCharacter
         *
         * @author Enomis
         * @version 1.0 *
        */
        replaceString: function (field) {
            strValue = field.value;
            // console.log("strValue1", strValue);


            for (const property in objReplaceCharacter) {
                // console.log(`${property}: ${objReplaceCharacter[property]}`);
                // console.log(property);
                // console.log(objReplaceCharacter[property]);
                strValue = strValue.replaceAll(property, objReplaceCharacter[property]);
                // console.log("strValue2", strValue.replaceAll(property, objReplaceCharacter[property]));
            }

            // console.log("strValue2", strValue);
            field.value = strValue;
            return true
        },

        /**
         * Controlliamo se inserto un valore che corrispende alle regole di DNI CIF NIE senza fare differenza
         * 
         * @param  {object} field -valore dell'intero items
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0 *
        */
        checkTaxIdEs: function (field) {
            let resultChecked;
            // //^ CONTROLLO 1  mech con regex DNI
            // /^(\d{8})([A-Z])$/.test(value)
            // //^ CONTROLLO 2  mech con regex CIF
            // /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(value)
            // //^ CONTROLLO 2  mech con regex NIE
            // /^[XYZ]\d{7,8}[A-Z]$/.test(value)



            if (genericRegexVal.dni.test(field.value) || genericRegexVal.cfi.test(field.value) || genericRegexVal.nie.test(field.value)) {
                resultChecked = true;
            } else {
                resultChecked = false;
            }
            return resultChecked
        },

        /**
         * Controlliamo che il taxId abbia un path valido
         * 
         * @param  {object} field -valore dell'intero items
         * 
         * @return {boolean} (TRUE|False) per validazione
         *
         * @author Enomis
         * @version 1.0 *
        */
        checkTaxId: function (field) {
            let resultChecked = taxIdRegex[this.paramClient.localization].test(field.value) || taxIdRegex[this.paramClient.localization].test(this.paramClient.localization + field.value);

            return resultChecked
        },

        /**
        * Se impostato il valore del campo non può essere vuoto o null 
        * @param  {object} field -valore dell'items
        * 
        * @return {boolean} (TRUE||FALSE)
        *
        * @author Enomis
        * @version 1.0
       */
        required: function (field) {
            var value = field.value;

            if ((field.type === 'checkbox') || (field.type === 'radio')) {
                return (field.checked === true);
            }

            return (value !== null && value !== '');
        },

        /**
         * Controlliamo che il postal code inserito sia valido tramite le regex per località
         * @param  {object} field -valore dell'items
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        postalCode: function (field) {

            return postalCodeRegex[this.paramClient.localization].test(field.value);
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
        * Controlliamo che sia stato inserito un numero , accettiamo che inizi con 00 oppure con il +
        * 
        * @param  {object} field -completo dell'input di riferimento
        * @return {boolean} (TRUE||FALSE)
        *
        * @author Enomis
        * @version 1.0 *
        * 
        */
        phoneLv1: function (field) {
            // console.log('#####################in check lv1 #############################')
            return /^((00|\+))??\d{0,20}$/.test(field.value)
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Passiamo prima per il lv1 eseguimao il controllo sul prefisso internazionale +39/+34/0039/ecc.. in base alla localizzazione
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
         */
        phoneLv2: function (field) {
            // console.log('#####################in check lv2 no if #############################')
            let ValArr = field.value.split('').filter((currentValue) => { return currentValue != ' ' });
            // se passa il controllo del livello 1 proseguiamo ed è stato inserito come primo valore o '0' o '+'
            if (this._hooks['phoneLv1'].apply(this, [field]) && (ValArr[0] === '0' || ValArr[0] === '+')) {
                // console.log('#####################in check lv2 if 1 #############################')

                let checkInternationalPrefix = false;
                objLocalizationPath[this.paramClient.localization].prefixInternational.map((items, index) => {
                    let prefixCurrent = [];

                    for (let i = 0; i < items.length; i++) {
                        prefixCurrent.push(ValArr[i])
                    }

                    // eseguiamo ancora il controllo solo se non è stato trovato il prefisso internazionale
                    if (!checkInternationalPrefix) {
                        // controlliamo se il prefisso internazionale inserito corrisponde a quelli nell'oggetto di validazione
                        if (JSON.stringify(prefixCurrent.join("")) == JSON.stringify(items)) {
                            checkInternationalPrefix = true
                        } else {
                            checkInternationalPrefix = false
                        }
                    }
                });
                return checkInternationalPrefix
            } else {
                // console.log('#####################in check lv2 if 2 #############################')
                return this._hooks['phoneLv1'].apply(this, [field])
            }
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Passiamo prima per il lv2 -> lv1 controlliamo il prefisso di cellulare o fisso 331/0773/ecc... in base alla localizzazione
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        phoneLv3: function (field) {
            // console.log('#####################in check lv3 start #############################')
            // console.log('l2', this._hooks['phoneLv2'].apply(this, [field]))
            // se passa il controllo al l2 e di conseguenza al lv1 andiamo ad eseguire il controllo sul prefisso della compagnia se cellulare o sul prefisso regionale se numero fisso
            if (this._hooks['phoneLv2'].apply(this, [field])) {
                // console.log('#####################in check lv3 no if #############################')

                let ValArr = field.value.split('').filter((currentValue) => { return currentValue != ' ' });
                // se il campo inizia con 0 o con + vuol dire che è stato inserito un prefisso internazionale cho dobbiamo andare a tagliare per confrontare il prefisso della compagnia
                let arrNumberWithoutprefix;
                if (ValArr[0] === '0' || ValArr[0] == '+') {
                    // console.log('#####################in check lv3 in if #############################')
                    objLocalizationPath[this.paramClient.localization].prefixInternational.map((items, index) => {
                        let prefixCurrent = [];
                        for (let i = 0; i < items.length; i++) {
                            prefixCurrent.push(ValArr[i])
                        }
                        // eseguiamo ancora il controllo solo se non è stato trovato il prefisso internazionale
                        // controlliamo se il prefisso internazionale inserito corrisponde a quelli nell'oggetto di validazione
                        if (JSON.stringify(prefixCurrent.join("")) == JSON.stringify(items)) {
                            // variabile con il numero di telefono senza IL PREFISSO INTERNAZIONALE se trovata la corrispondenza
                            arrNumberWithoutprefix = ValArr.splice(prefixCurrent.length)
                        }

                    });
                }



                let checkPrefixCompanyRegion = false;
                if (!checkPrefixCompanyRegion) {
                    // giriamo sul' arr dei telefoni cellulari
                    objLocalizationPath[this.paramClient.localization].prefixCompanyCellular.map((items, index) => {
                        let currentPrefix = [];
                        for (let i = 0; i < items.length; i++) {
                            currentPrefix.push(arrNumberWithoutprefix ? arrNumberWithoutprefix[i] : ValArr[i])
                        }
                        if (JSON.stringify(currentPrefix.join("")) == JSON.stringify(items)) {
                            checkPrefixCompanyRegion = true
                        }
                    })
                    // giriamo sul' arr dei telefoni fissi
                    objLocalizationPath[this.paramClient.localization].prefixRegionHomePhone.map((items, index) => {
                        let currentPrefix = [];
                        for (let i = 0; i < items.length; i++) {
                            currentPrefix.push(arrNumberWithoutprefix ? arrNumberWithoutprefix[i] : ValArr[i])
                        }
                        if (JSON.stringify(currentPrefix.join("")) == JSON.stringify(items)) {
                            checkPrefixCompanyRegion = true
                        }
                    })
                }


                // console.log('phone validation lv 3', checkPrefixCompanyRegion)
                return checkPrefixCompanyRegion
            } else {
                return this._hooks['phoneLv1'].apply(this, [field])
            }

        },

        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
          * 
          * Info Controlliamo tramite 2 regex diverse se quella inserita è una email 'valida' controlliamo solo il phat
          * 
          * @param  {object} field -completo dell'input di riferimento
          * 
          * @return {boolean} -(TRUE||FALSE)
          *
          * @author Enomis
          * @version 1.0
         */
        email: function (field) {
            return genericRegexVal.emailRegex.test(field.value) || genericRegexVal.emailRegex2.test(field.value);
        },

        /**
         * 
         * Controlliamo il min length
         * 
         * @param  {object} field -completo dell'input di riferimento
         * @param  {string} length -parametro passato lato client nella stringa preceduta da un - es: minLength-10
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        minLength: function (field, length) {
            // controlliamo se il length passato è un numero
            if (!genericRegexVal.numericRegex.test(length)) {
                return false;
            }

            return (field.value.length >= parseInt(length, 10));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo il max Length
         * 
         * @param  {object} field -completo dell'input di riferimento
         * @param  {string} length -parametro passato lato client nella stringa preceduta da un - es: minLength-10
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        maxLength: function (field, length) {
            // controlliamo se il length passato è un numero
            if (!genericRegexVal.numericRegex.test(length)) {
                return false;
            }

            return (field.value.length <= parseInt(length, 10));
        },
        //  TODO CAMBIARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo il length esatto
         * 
         * @param  {object} field -completo dell'input di riferimento
         * @param  {string} length -parametro passato lato client nella stringa preceduta da un - es: minLength-10
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        exactLength: function (field, length) {
            // controlliamo se il length passato è un numero
            if (!genericRegexVal.numericRegex.test(length)) {
                return false;
            }

            return (field.value.length === parseInt(length, 10));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo che sono stati inseriti solo lettere
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        alpha: function (field) {
            return (genericRegexVal.alphaRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo sono stati inseriti solo numeri e lettere
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        alphaNumeric: function (field) {
            return (genericRegexVal.alphaNumericRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
        * 
        * Controlliamo sono stati inseriti lettere accettando solo il trattino centrale '-'
        * 
        * @param  {object} field -completo dell'input di riferimento
        * 
        * @return {boolean} (TRUE||FALSE)
        *
        * @author Enomis
        * @version 1.0
       */
        alphaDash: function (field) {
            return (genericRegexVal.alphaDashRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo sono stati inseriti solo numeri
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        numeric: function (field) {
            return (genericRegexVal.numericRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo se è stato inserito un numero intero accettiamo il trattino per i numeri negativi es: -42
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        integer: function (field) {
            return (genericRegexVal.integerRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo se è stato inserito un numero decimale accettiamo il trattino per i numeri negativi es: -42.90
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        decimal: function (field) {
            return (genericRegexVal.decimalRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo se è stato inserito un numero naturale positivo es: 98
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        isNatural: function (field) {
            return (genericRegexVal.naturalRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
         * 
         * Controlliamo se è stato inserito un numero naturale che non inizia con 0 positivo es: 98 ok 098 no
         * 
         * @param  {object} field -completo dell'input di riferimento
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        isNaturalNoZero: function (field) {
            return (genericRegexVal.naturalNoZeroRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
        * 
        * Controlliamo se è stato un indirizzo ip valido , controlliamo il phat
        * 
        * @param  {object} field -completo dell'input di riferimento
        * 
        * @return {boolean} (TRUE||FALSE)
        *
        * @author Enomis
        * @version 1.0
       */
        validIp: function (field) {
            return (genericRegexVal.ipRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
        * 
        * Controlliamo se è stato inserito un url valido , controlliamo il phat(validiamo l'inserimento dell' http/https) es :https://regex101.com/ ok www.regex101.com/ no
        * 
        * @param  {object} field -completo dell'input di riferimento
        * 
        * @return {boolean} (TRUE||FALSE)
        *
        * @author Enomis
        * @version 1.0
       */
        validUrl: function (field) {
            return (genericRegexVal.urlRegex.test(field.value));
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        /**
        * 
        * Controlliamo se è stato inserito numero valido di carta di credito
        * 
        * @param  {object} field -completo dell'input di riferimento
        * 
        * @return {boolean} (TRUE||FALSE)
        *
        * @author {Luhn Check} Code from https://gist.github.com/4075533
        * @version 1.0
       */
        validCreditCard: function (field) {
            // Luhn Check Code from https://gist.github.com/4075533
            // accept only digits, dashes or spaces
            if (!numericDashRegex.test(field.value)) return false;

            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0, nDigit = 0, bEven = false;
            var strippedField = field.value.replace(/\D/g, "");

            for (var n = strippedField.length - 1; n >= 0; n--) {
                var cDigit = strippedField.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE


        /**
         * 
         * Controlliamo l'estensione di un file caricato
         * 
         * @param  {object} field -completo dell'input di riferimento
         * @param  {type} type parametro passato lato client nella stringa preceduta da un - es: isFileType-pdf
         * 
         * @return {boolean} (TRUE||FALSE)
         *
         * @author Enomis
         * @version 1.0
        */
        isFileType: function (field, type) {
            if (field.type !== 'file') {
                return true;
            }

            var ext = field.value.substr((field.value.lastIndexOf('.') + 1)),
                typeArray = type.split(','),
                inArray = false,
                i = 0,
                len = typeArray.length;

            for (i; i < len; i++) {
                if (ext.toUpperCase() == typeArray[i].toUpperCase()) inArray = true;
            }

            return inArray;
        },
        //  TODO SETTARE MESSAGGIO DI ERRORE

        // ! non testate
        greater_than_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate > validDate;
        },

        less_than_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate < validDate;
        },

        greater_than_or_equal_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate >= validDate;
        },

        less_than_or_equal_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate <= validDate;
        },

        valid_base64: function (field) {
            return (genericRegexVal.base64Regex.test(field.value));
        },

        greater_than: function (field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) > parseFloat(param));
        },

        less_than: function (field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) < parseFloat(param));
        }
    };


    //! ESEMPIO 
    Validator.prototype.clog = function (a) {
        console.log(a)

        // return this for chaining
        return this;
    };


    window.Validator = Validator;
})(window, document);

/*
* Export as a CommonJS module
*/
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validator;
}
