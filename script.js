$(document).ready(function () {
	'use strict'

	//^ oggetto per il confronto tra i dati inseriti
	const objLocalizationPath = {
		postalCodeRegex: {
			GB: /GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4}/,
			JE: /JE\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}/,
			GG: /GY\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}/,
			IM: /IM\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}/,
			US: /\d{5}([ \-]\d{4})?/,
			CA: /[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d/,
			DE: /\d{5}/,
			JP: /\d{3}-\d{4}/,
			FR: /\d{2}[ ]?\d{3}/,
			AU: /\d{4}/,
			IT: /\d{5}/,
			CH: /\d{4}/,
			AT: /\d{4}/,
			ES: /\d{5}/,
			NL: /\d{4}[ ]?[A-Z]{2}/,
			BE: /\d{4}/,
			DK: /\d{4}/,
			SE: /\d{3}[ ]?\d{2}/,
			NO: /\d{4}/,
			BR: /\d{5}[\-]?\d{3}/,
			PT: /\d{4}([\-]\d{3})?/,
			FI: /\d{5}/,
			AX: /22\d{3}/,
			KR: /\d{3}[\-]\d{3}/,
			CN: /\d{6}/,
			TW: /\d{3}(\d{2})?/,
			SG: /\d{6}/,
			DZ: /\d{5}/,
			AD: /AD\d{3}/,
			AR: /([A-HJ-NP-Z])?\d{4}([A-Z]{3})?/,
			AM: /(37)?\d{4}/,
			AZ: /\d{4}/,
			BH: /((1[0-2]|[2-9])\d{2})?/,
			BD: /\d{4}/,
			BB: /(BB\d{5})?/,
			BY: /\d{6}/,
			BM: /[A-Z]{2}[ ]?[A-Z0-9]{2}/,
			BA: /\d{5}/,
			IO: /BBND 1ZZ/,
			BN: /[A-Z]{2}[ ]?\d{4}/,
			BG: /\d{4}/,
			KH: /\d{5}/,
			CV: /\d{4}/,
			CL: /\d{7}/,
			CR: /\d{4,5}|\d{3}-\d{4}/,
			HR: /\d{5}/,
			CY: /\d{4}/,
			CZ: /\d{3}[ ]?\d{2}/,
			DO: /\d{5}/,
			EC: /([A-Z]\d{4}[A-Z]|(?:[A-Z]{2})?\d{6})?/,
			EG: /\d{5}/,
			EE: /\d{5}/,
			FO: /\d{3}/,
			GE: /\d{4}/,
			GR: /\d{3}[ ]?\d{2}/,
			GL: /39\d{2}/,
			GT: /\d{5}/,
			HT: /\d{4}/,
			HN: /(?:\d{5})?/,
			HU: /\d{4}/,
			IS: /\d{3}/,
			IN: /\d{6}/,
			ID: /\d{5}/,
			IL: /\d{5}/,
			JO: /\d{5}/,
			KZ: /\d{6}/,
			KE: /\d{5}/,
			KW: /\d{5}/,
			LA: /\d{5}/,
			LV: /\d{4}/,
			LB: /(\d{4}([ ]?\d{4})?)?/,
			LI: /(948[5-9])|(949[0-7])/,
			LT: /\d{5}/,
			LU: /\d{4}/,
			MK: /\d{4}/,
			MY: /\d{5}/,
			MV: /\d{5}/,
			MT: /[A-Z]{3}[ ]?\d{2,4}/,
			MU: /(\d{3}[A-Z]{2}\d{3})?/,
			MX: /\d{5}/,
			MD: /\d{4}/,
			MC: /980\d{2}/,
			MA: /\d{5}/,
			NP: /\d{5}/,
			NZ: /\d{4}/,
			NI: /((\d{4}-)?\d{3}-\d{3}(-\d{1})?)?/,
			NG: /(\d{6})?/,
			OM: /(PC )?\d{3}/,
			PK: /\d{5}/,
			PY: /\d{4}/,
			PH: /\d{4}/,
			PL: /\d{2}-\d{3}/,
			PR: /00[679]\d{2}([ \-]\d{4})?/,
			RO: /\d{6}/,
			RU: /\d{6}/,
			SM: /4789\d/,
			SA: /\d{5}/,
			SN: /\d{5}/,
			SK: /\d{3}[ ]?\d{2}/,
			SI: /\d{4}/,
			ZA: /\d{4}/,
			LK: /\d{5}/,
			TJ: /\d{6}/,
			TH: /\d{5}/,
			TN: /\d{4}/,
			TR: /\d{5}/,
			TM: /\d{6}/,
			UA: /\d{5}/,
			UY: /\d{5}/,
			UZ: /\d{6}/,
			VA: /00120/,
			VE: /\d{4}/,
			ZM: /\d{5}/,
			AS: /96799/,
			CC: /6799/,
			CK: /\d{4}/,
			RS: /\d{6}/,
			ME: /8\d{4}/,
			CS: /\d{5}/,
			YU: /\d{5}/,
			CX: /6798/,
			ET: /\d{4}/,
			FK: /FIQQ 1ZZ/,
			NF: /2899/,
			FM: /(9694[1-4])([ \-]\d{4})?/,
			GF: /9[78]3\d{2}/,
			GN: /\d{3}/,
			GP: /9[78][01]\d{2}/,
			GS: /SIQQ 1ZZ/,
			GU: /969[123]\d([ \-]\d{4})?/,
			GW: /\d{4}/,
			HM: /\d{4}/,
			IQ: /\d{5}/,
			KG: /\d{6}/,
			LR: /\d{4}/,
			LS: /\d{3}/,
			MG: /\d{3}/,
			MH: /969[67]\d([ \-]\d{4})?/,
			MN: /\d{6}/,
			MP: /9695[012]([ \-]\d{4})?/,
			MQ: /9[78]2\d{2}/,
			NC: /988\d{2}/,
			NE: /\d{4}/,
			VI: /008(([0-4]\d)|(5[01]))([ \-]\d{4})?/,
			PF: /987\d{2}/,
			PG: /\d{3}/,
			PM: /9[78]5\d{2}/,
			PN: /PCRN 1ZZ/,
			PW: /96940/,
			RE: /9[78]4\d{2}/,
			SH: /(ASCN|STHL) 1ZZ/,
			SJ: /\d{4}/,
			SO: /\d{5}/,
			SZ: /[HLMS]\d{3}/,
			TC: /TKCA 1ZZ/,
			WF: /986\d{2}/,
			XK: /\d{5}/,
			YT: /976\d{2}/,
		},
		taxIdRegex: {
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
			ES: /ES[0-9A-Z][0-9]{7}[0-9A-Z]/,
			SE: /SE[0-9]{12}/,
			CH: /CHE[0-9]{6,9}/,
			TR: /[0-9]{10}/,
			UA: /[0-9]{10}/,
			GB: /GB([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})/,
			UY: /[0-9]{12}/,
			US: /\d{2}-\d{7}/,
			UZ: /[2|4][0000000}[X][2|4][0-9]{7}[X]/,
			VE: /[J|K|V|E]{9}/
		},
		IT: {
			localization: "IT",
			prefixInternational: ["+39", "0039"],
			cellular: {
				minLength: 6,
				maxLength: 10,
				prefixCompanyCellular: [
					"330",
					"333",
					"334",
					"335",
					"336",
					"337",
					"338",
					"339",
					"360",
					"363",
					"366",
					"368",
					"352",
					"340",
					"342",
					"345",
					"346",
					"347",
					"348",
					"349",
					"320",
					"323",
					"327",
					"328",
					"329",
					"380",
					"383",
					"388",
					"389",
					"390",
					"391",
					"392",
					"393",
					"397",
					"331",
					"370",
					"353",
					"375",
					"379",
					"373",
					"350",
					"351",
					"382",
					"376",
					"371",
					"377",
					"378",
				]
			},
			homePhone: {
				minLength: 6,
				maxLength: 10,
				prefixRegionHomePhone: [
					"004191",
					"010",
					"011",
					"012",
					"012",
					"012",
					"012",
					"012",
					"013",
					"014",
					"014",
					"014",
					"014",
					"015",
					"016",
					"016",
					"016",
					"016",
					"017",
					"017",
					"017",
					"017",
					"017",
					"018",
					"018",
					"018",
					"018",
					"018",
					"019",
					"02",
					"030",
					"031",
					"032",
					"032",
					"032",
					"032",
					"033",
					"033",
					"034",
					"034",
					"034",
					"034",
					"034",
					"034",
					"035",
					"036",
					"036",
					"036",
					"036",
					"037",
					"037",
					"037",
					"037",
					"037",
					"037",
					"037",
					"038",
					"038",
					"038",
					"038",
					"038",
					"038",
					"039",
					"040",
					"041",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"044",
					"044",
					"044",
					"045",
					"046",
					"046",
					"046",
					"046",
					"046",
					"047",
					"047",
					"047",
					"047",
					"048",
					"049",
					"050",
					"051",
					"052",
					"052",
					"052",
					"052",
					"052",
					"053",
					"053",
					"053",
					"053",
					"053",
					"054",
					"054",
					"054",
					"054",
					"054",
					"054",
					"054",
					"055",
					"056",
					"056",
					"056",
					"057",
					"057",
					"057",
					"057",
					"057",
					"057",
					"057",
					"058",
					"058",
					"058",
					"058",
					"058",
					"058",
					"059",
					"06070",
					"071",
					"072",
					"072",
					"073",
					"073",
					"073",
					"073",
					"073",
					"073",
					"073",
					"074",
					"074",
					"074",
					"074",
					"075",
					"076",
					"076",
					"076",
					"076",
					"077",
					"077",
					"077",
					"077",
					"077",
					"078",
					"078",
					"078",
					"078",
					"078",
					"078",
					"079",
					"080",
					"081",
					"082",
					"082",
					"082",
					"082",
					"082",
					"083",
					"083",
					"083",
					"083",
					"083",
					"085",
					"086",
					"086",
					"086",
					"086",
					"086",
					"087",
					"087",
					"087",
					"087",
					"087",
					"088",
					"088",
					"088",
					"088",
					"088",
					"089",
					"090",
					"091",
					"092",
					"092",
					"092",
					"092",
					"092",
					"093",
					"093",
					"093",
					"093",
					"093",
					"094",
					"094",
					"095",
					"096",
					"096",
					"096",
					"096",
					"096",
					"096",
					"096",
					"096",
					"097",
					"097",
					"097",
					"097",
					"097",
					"097",
					"098",
					"098",
					"098",
					"098",
					"098",
					"099",
				],
			}
		},
		ES: {
			localization: "ES",
			prefixInternational: ["+38", "0038"],
			cellular: {
				minLength: 6,
				maxLength: 10,
				prefixCompanyCellular: [
					"330",
					"333",
					"334",
					"335",
					"336",
					"337",
					"338",
					"339",
					"360",
					"363",
					"366",
					"368",
					"352",
					"340",
					"342",
					"345",
					"346",
					"347",
					"348",
					"349",
					"320",
					"323",
					"327",
					"328",
					"329",
					"380",
					"383",
					"388",
					"389",
					"390",
					"391",
					"392",
					"393",
					"397",
					"331",
					"370",
					"353",
					"375",
					"379",
					"373",
					"350",
					"351",
					"382",
					"376",
					"371",
					"377",
					"378",
				]
			},
			homePhone: {
				minLength: 6,
				maxLength: 10,
				prefixRegionHomePhone: [
					"004191",
					"010",
					"011",
					"012",
					"012",
					"012",
					"012",
					"012",
					"013",
					"014",
					"014",
					"014",
					"014",
					"015",
					"016",
					"016",
					"016",
					"016",
					"017",
					"017",
					"017",
					"017",
					"017",
					"018",
					"018",
					"018",
					"018",
					"018",
					"019",
					"02",
					"030",
					"031",
					"032",
					"032",
					"032",
					"032",
					"033",
					"033",
					"034",
					"034",
					"034",
					"034",
					"034",
					"034",
					"035",
					"036",
					"036",
					"036",
					"036",
					"037",
					"037",
					"037",
					"037",
					"037",
					"037",
					"037",
					"038",
					"038",
					"038",
					"038",
					"038",
					"038",
					"039",
					"040",
					"041",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"042",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"043",
					"044",
					"044",
					"044",
					"045",
					"046",
					"046",
					"046",
					"046",
					"046",
					"047",
					"047",
					"047",
					"047",
					"048",
					"049",
					"050",
					"051",
					"052",
					"052",
					"052",
					"052",
					"052",
					"053",
					"053",
					"053",
					"053",
					"053",
					"054",
					"054",
					"054",
					"054",
					"054",
					"054",
					"054",
					"055",
					"056",
					"056",
					"056",
					"057",
					"057",
					"057",
					"057",
					"057",
					"057",
					"057",
					"058",
					"058",
					"058",
					"058",
					"058",
					"058",
					"059",
					"06070",
					"071",
					"072",
					"072",
					"073",
					"073",
					"073",
					"073",
					"073",
					"073",
					"073",
					"074",
					"074",
					"074",
					"074",
					"075",
					"076",
					"076",
					"076",
					"076",
					"077",
					"077",
					"077",
					"077",
					"077",
					"078",
					"078",
					"078",
					"078",
					"078",
					"078",
					"079",
					"080",
					"081",
					"082",
					"082",
					"082",
					"082",
					"082",
					"083",
					"083",
					"083",
					"083",
					"083",
					"085",
					"086",
					"086",
					"086",
					"086",
					"086",
					"087",
					"087",
					"087",
					"087",
					"087",
					"088",
					"088",
					"088",
					"088",
					"088",
					"089",
					"090",
					"091",
					"092",
					"092",
					"092",
					"092",
					"092",
					"093",
					"093",
					"093",
					"093",
					"093",
					"094",
					"094",
					"095",
					"096",
					"096",
					"096",
					"096",
					"096",
					"096",
					"096",
					"096",
					"097",
					"097",
					"097",
					"097",
					"097",
					"097",
					"098",
					"098",
					"098",
					"098",
					"098",
					"099",
				],
			}
		},
	};

	// ! sanitize number
	function filterNumberNotZero(value) {
		if (value == '0') {
			return value
		} else if (Number(value)) {
			return value
		} else {
			return
		}
	}
	// !creiamo una funzione unica per iil check dei prefissi per per cellular che per home 
	function prefixCutCheckAll(arr, country, type) {
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

		numberArr = arr.filter((value) => filterNumberNotZero(value));
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
	// ! validazione email
	function validazioneEmail(email) {
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
	// !check postal code
	function checkPostalCode(valore, regionPostalCode) {
		return (RegExp(objLocalizationPath.postalCodeRegex[regionPostalCode]).test(valore) ? true : false)
	}
	// !check tax ID
	function checkTaxID(valore, regionTaxId) {
		//^ CONTROLLO 1  mech con regex
		//^ CONTROLLO 2  mech con regex con aggiunta della localizzazione (IT,DE ecc.. )
		//^ ritorniamo sempre true perché anche se è un campo obbligatorio non ha bisogno di validazione stringente (PER ORA)

		if (RegExp(objLocalizationPath.taxIdRegex[regionTaxId]).test(valore)) {
			return true;
		} else if ((RegExp(objLocalizationPath.taxIdRegex[regionTaxId]).test(regionTaxId + valore))) {
			return true;
		}
		return true;

	}



	//^ funzione per sanitize il numero di telefono e restituirlo senza l'eventuale prefisso
	// function prefixCutCellular(arr, country, type) {
	// 	const x = arr;
	// 	objLocalizationPath[country][type].prefixCellular.map((items, index) => {
	// 		//^ creiamo un array con i primi valori inseriti dall'utente in riferimento al controllo che andiamo a fare 
	// 		//^ i primi 3 se il controllo lo andiamo a fare con un campo che ha 3 valori e 4 su 4 e così via
	// 		let arrPrefix = [];
	// 		for (let i = 0; i < items.length; i++) {
	// 			arrPrefix.push(x[i])
	// 		}
	// 		if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
	// 			x.splice(0, items.length);
	// 		}
	// 	});
	// 	return x;
	// };
	// function checkPrefixCompanyCellular(arr, country, type) {
	// 	//- const x = arr;
	// 	let isValid = false;

	// 	objLocalizationPath[country][type].prefixCompanyCellular.forEach((items) => {
	// 		// -console.log('items company', items);
	// 		//- console.log('arr', arr);
	// 		let arrPrefix = [];
	// 		for (let i = 0; i < items.length; i++) {
	// 			arrPrefix.push(arr[i])
	// 		}
	// 		if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
	// 			isValid = true;
	// 		}

	// 	});
	// 	return isValid;
	// };
	// function checkprefixRegionHomePhone(arr, country, type) {
	// 	//^ filtriamo il valore dell'arr per pulirlo da elementi che non sono numeri
	// 	const x = arr.filter((value) => filterNumberNotZero(value));
	// 	console.log('arr', x)
	// 	//^ mettiamo in un array un numero di campi uguali a quelli presenti con l'elemento di confronto
	// 	objLocalizationPath[country][type].prefixRegionHomePhone.map((items, index) => {
	// 		let arrPrefix = [];
	// 		for (let i = 0; i < items.length; i++) {
	// 			arrPrefix.push(x[i])
	// 		}
	// 		//^ se troviamo il mech tra l'elemento arrPrefix e gli elementi presenti in array andiamo a validare il record
	// 		if (JSON.stringify(arrPrefix.join("")) == JSON.stringify(items)) {
	// 			console.log('prefix trovato', arrPrefix.join(""), JSON.stringify(items))
	// 		}
	// 	});
	// 	console.log(x)
	// 	// return x;
	// };

	$(".form").submit(function (e) {
		//^ preveniamo il default
		e.preventDefault();
		//^ prendiamo tutti i valori delle input
		$(".form input").each(function (index, items) {
			//^ controlliamo che valore è richiesto nel labeel e attiviamo la validazione di riferimento 
			let isValid = false;

			console.log(items.getAttribute("data-validate-type"))

			if (items.value) {
				// ! VALIDAZIONE NUMERO DI CELLULARE
				if (items.getAttribute("data-validate-type") == 'cellular') {
					let arrPhoneNumber = items.value.trim().split("");
					isValid = prefixCutCheckAll(
						arrPhoneNumber,
						items.getAttribute("data-validate-country"),
						items.getAttribute("data-validate-type")
					)
				}
				// ! VALIDAZIONE NUMERO DI FISSO
				if (items.getAttribute("data-validate-type") == 'homePhone') {
					let arrPhoneNumber = items.value.trim().split("");
					isValid = prefixCutCheckAll(
						arrPhoneNumber,
						items.getAttribute("data-validate-country"),
						items.getAttribute("data-validate-type")
					)
				}
				// ! VALIDAZIONE EMAIL
				if (items.getAttribute("data-validate-type") == 'email') {
					isValid = validazioneEmail(items.value.trim())
				}
				// ! VALIDAZIONE postalcode
				//^ per il momento il postal code dipende dalla selezione della regione nel form
				if (items.getAttribute("data-validate-type") == 'postalCode') {
					isValid = checkPostalCode(items.value.trim(), $(".form #selectRegion").val())
				}
				// ! validazione TaxID (P.IVA)
				if (items.getAttribute("data-validate-type") == 'taxID') {
					isValid = checkTaxID(items.value.trim(), $(".form #selectRegion").val())
				}
				//! validazione ctf
				if (items.getAttribute("data-validate-type") == 'fiscalCode') {
					isValid = true
				}

			}
			//^ cambiamo la classe sul front end in basse all check della funzione utilizzando bootstrap
			$(items).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
		});
	});
});
