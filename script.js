$(document).ready(function () {
	'use strict'

	//^ oggetto per il confronto tra i dati inseriti
	const objLocalizationPath = {
		postalCodeRegex: {
			GB: /GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4}/gm,
			JE: /JE\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}/gm,
			GG: /GY\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}/gm,
			IM: /IM\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}/gm,
			US: /\d{5}([ \-]\d{4})?/gm,
			CA: /[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d/gm,
			DE: /\d{5}/gm,
			JP: /\d{3}-\d{4}/gm,
			FR: /\d{2}[ ]?\d{3}/gm,
			AU: /\d{4}/gm,
			IT: /\d{5}/gm,
			CH: /\d{4}/gm,
			AT: /\d{4}/gm,
			ES: /\d{5}/gm,
			NL: /\d{4}[ ]?[A-Z]{2}/gm,
			BE: /\d{4}/gm,
			DK: /\d{4}/gm,
			SE: /\d{3}[ ]?\d{2}/gm,
			NO: /\d{4}/gm,
			BR: /\d{5}[\-]?\d{3}/gm,
			PT: /\d{4}([\-]\d{3})?/gm,
			FI: /\d{5}/gm,
			AX: /22\d{3}/gm,
			KR: /\d{3}[\-]\d{3}/gm,
			CN: /\d{6}/gm,
			TW: /\d{3}(\d{2})?/gm,
			SG: /\d{6}/gm,
			DZ: /\d{5}/gm,
			AD: /AD\d{3}/gm,
			AR: /([A-HJ-NP-Z])?\d{4}([A-Z]{3})?/gm,
			AM: /(37)?\d{4}/gm,
			AZ: /\d{4}/gm,
			BH: /((1[0-2]|[2-9])\d{2})?/gm,
			BD: /\d{4}/gm,
			BB: /(BB\d{5})?/gm,
			BY: /\d{6}/gm,
			BM: /[A-Z]{2}[ ]?[A-Z0-9]{2}/gm,
			BA: /\d{5}/gm,
			IO: /BBND 1ZZ/gm,
			BN: /[A-Z]{2}[ ]?\d{4}/gm,
			BG: /\d{4}/gm,
			KH: /\d{5}/gm,
			CV: /\d{4}/gm,
			CL: /\d{7}/gm,
			CR: /\d{4,5}|\d{3}-\d{4}/gm,
			HR: /\d{5}/gm,
			CY: /\d{4}/gm,
			CZ: /\d{3}[ ]?\d{2}/gm,
			DO: /\d{5}/gm,
			EC: /([A-Z]\d{4}[A-Z]|(?:[A-Z]{2})?\d{6})?/gm,
			EG: /\d{5}/gm,
			EE: /\d{5}/gm,
			FO: /\d{3}/gm,
			GE: /\d{4}/gm,
			GR: /\d{3}[ ]?\d{2}/gm,
			GL: /39\d{2}/gm,
			GT: /\d{5}/gm,
			HT: /\d{4}/gm,
			HN: /(?:\d{5})?/gm,
			HU: /\d{4}/gm,
			IS: /\d{3}/gm,
			IN: /\d{6}/gm,
			ID: /\d{5}/gm,
			IL: /\d{5}/gm,
			JO: /\d{5}/gm,
			KZ: /\d{6}/gm,
			KE: /\d{5}/gm,
			KW: /\d{5}/gm,
			LA: /\d{5}/gm,
			LV: /\d{4}/gm,
			LB: /(\d{4}([ ]?\d{4})?)?/gm,
			LI: /(948[5-9])|(949[0-7])/gm,
			LT: /\d{5}/gm,
			LU: /\d{4}/gm,
			MK: /\d{4}/gm,
			MY: /\d{5}/gm,
			MV: /\d{5}/gm,
			MT: /[A-Z]{3}[ ]?\d{2,4}/gm,
			MU: /(\d{3}[A-Z]{2}\d{3})?/gm,
			MX: /\d{5}/gm,
			MD: /\d{4}/gm,
			MC: /980\d{2}/gm,
			MA: /\d{5}/gm,
			NP: /\d{5}/gm,
			NZ: /\d{4}/gm,
			NI: /((\d{4}-)?\d{3}-\d{3}(-\d{1})?)?/gm,
			NG: /(\d{6})?/gm,
			OM: /(PC )?\d{3}/gm,
			PK: /\d{5}/gm,
			PY: /\d{4}/gm,
			PH: /\d{4}/gm,
			PL: /\d{2}-\d{3}/gm,
			PR: /00[679]\d{2}([ \-]\d{4})?/gm,
			RO: /\d{6}/gm,
			RU: /\d{6}/gm,
			SM: /4789\d/gm,
			SA: /\d{5}/gm,
			SN: /\d{5}/gm,
			SK: /\d{3}[ ]?\d{2}/gm,
			SI: /\d{4}/gm,
			ZA: /\d{4}/gm,
			LK: /\d{5}/gm,
			TJ: /\d{6}/gm,
			TH: /\d{5}/gm,
			TN: /\d{4}/gm,
			TR: /\d{5}/gm,
			TM: /\d{6}/gm,
			UA: /\d{5}/gm,
			UY: /\d{5}/gm,
			UZ: /\d{6}/gm,
			VA: /00120/gm,
			VE: /\d{4}/gm,
			ZM: /\d{5}/gm,
			AS: /96799/gm,
			CC: /6799/gm,
			CK: /\d{4}/gm,
			RS: /\d{6}/gm,
			ME: /8\d{4}/gm,
			CS: /\d{5}/gm,
			YU: /\d{5}/gm,
			CX: /6798/gm,
			ET: /\d{4}/gm,
			FK: /FIQQ 1ZZ/gm,
			NF: /2899/gm,
			FM: /(9694[1-4])([ \-]\d{4})?/gm,
			GF: /9[78]3\d{2}/gm,
			GN: /\d{3}/gm,
			GP: /9[78][01]\d{2}/gm,
			GS: /SIQQ 1ZZ/gm,
			GU: /969[123]\d([ \-]\d{4})?/gm,
			GW: /\d{4}/gm,
			HM: /\d{4}/gm,
			IQ: /\d{5}/gm,
			KG: /\d{6}/gm,
			LR: /\d{4}/gm,
			LS: /\d{3}/gm,
			MG: /\d{3}/gm,
			MH: /969[67]\d([ \-]\d{4})?/gm,
			MN: /\d{6}/gm,
			MP: /9695[012]([ \-]\d{4})?/gm,
			MQ: /9[78]2\d{2}/gm,
			NC: /988\d{2}/gm,
			NE: /\d{4}/gm,
			VI: /008(([0-4]\d)|(5[01]))([ \-]\d{4})?/gm,
			PF: /987\d{2}/gm,
			PG: /\d{3}/gm,
			PM: /9[78]5\d{2}/gm,
			PN: /PCRN 1ZZ/gm,
			PW: /96940/gm,
			RE: /9[78]4\d{2}/gm,
			SH: /(ASCN|STHL) 1ZZ/gm,
			SJ: /\d{4}/gm,
			SO: /\d{5}/gm,
			SZ: /[HLMS]\d{3}/gm,
			TC: /TKCA 1ZZ/gm,
			WF: /986\d{2}/gm,
			XK: /\d{5}/gm,
			YT: /976\d{2}/gm,
		},
		taxIdRegex: {
			AL: /\^[J|K][0-9]{8}{L]/gm,
			AR: /\^[0-9]{11}/gm,
			AU: /\^[0-9]{11}/gm,
			AT: /\^ATU[0-9]{8}/gm,
			BY: /\^[0-9]{9}/gm,
			BE: /\^BE0[0-9]{9}/gm,
			BO: /\^[0-9]{7}/gm,
			BR: /\^[0-9]{8}/gm,
			BG: /\^BG[0-9]{9,10}/gm,
			CA: /\^[0-9A-Z]{8,9}/gm,
			CL: /\^[0-9]{8}/gm,
			CN: /\^[0-9]{18}/gm,
			CO: /\^[0-9]{9}/gm,
			CR: /\^[0-9]{10,12}/gm,
			HR: /\^HR\d{11}/gm,
			CY: /\^CY[0-9]{8,9}L/gm,
			CZ: /\^CZ[0-9]{8,10}/gm,
			DK: /\^DK[0-9]{8}/gm,
			DO: /\^[0-9]{9}/gm,
			EC: /\^[0-9]{13}/gm,
			SV: /\^[0-9]{14}/gm,
			EE: /\^EE[0-9]{9}/gm,
			FI: /\^FI[0-9]{8}/gm,
			FR: /\^FR[0-9A-Z]{2}[0-9]{9}/gm,
			DE: /\^DE[0-9]{9}/gm,
			GR: /\^(EL|GR)[0-9]{9}/gm,
			GT: /\^[0-9]{9}/gm,
			HN: /\^[0-9]{14}/gm,
			HK: /\^[0-9]{8}/gm,
			HU: /\^HU[0-9]{8}/gm,
			IS: /\^[0-9][A-Z]{6}/gm,
			ID: /\^[0-9]{15}/gm,
			IN: /\^[0-9]{10}{V|C}{1}/gm,
			IE: /\^IE[0-9]S[0-9]{5}L/gm,
			IL: /\^[0-9]{9}/gm,
			IT: /\^IT[0-9]{11}/gm,
			JP: /\^[0-9]{12,13}/gm,
			LV: /\^LV[0-9]{11}/gm,
			LT: /\^LT([0-9]{9}|[0-9]{12})/gm,
			LU: /\^(LU)?[0-9]{8}/gm,
			MT: /\^MT[0-9]{8}/gm,
			MX: /\^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]:|2[0-9]|3[0-1])[A-Z|\d]{3})/gm,
			NL: /\^NL[0-9]{9}B[0-9]{2}/gm,
			NZ: /\^[0-9]{13}/gm,
			NI: /\^([0-9]{13}([A-Z]{1})/gm,
			NO: /\^MVA[0-9]{9}/gm,
			PA: /\^[0-9]{14}/gm,
			PY: /\^[0-9]{7}/gm,
			PE: /\^[0-9]{11}/gm,
			PH: /\^[0-9]{12}/gm,
			PL: /\^PL[0-9]{10}/gm,
			PT: /\^PT[0-9]{9}/gm,
			RO: /\^(RO)?[0-9]{2,10}/gm,
			RU: /\^[0-9]{10,12}/gm,
			SM: /\^[0-9]{5}/gm,
			RS: /\^[0-9]{9}/gm,
			SK: /\^SK[0-9]{10}/gm,
			SI: /\^SI[0-9]{8}/gm,
			ES: /\^ES[0-9A-Z][0-9]{7}[0-9A-Z]/gm,
			SE: /\^SE[0-9]{12}/gm,
			CH: /\^CHE[0-9]{6,9}/gm,
			TR: /\^[0-9]{10}/gm,
			UA: /\^[0-9]{10}/gm,
			GB: /\^GB([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})/gm,
			UY: /\^[0-9]{12}/gm,
			US: /\^\d{2}-\d{7}/gm,
			UZ: /\^[2|4][0000000}[X][2|4][0-9]{7)[X]/gm,
			VE: /\^[J|K|V|E]{9}/gm
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
		if (RegExp(objLocalizationPath.postalCodeRegex[regionPostalCode]).test(valore)) {
			console.log('vero')
			return true;
		}
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
				// ! validazione identificativo fiscale (P.IVA)
				if (items.getAttribute("data-validate-type") == 'tax-identification') {
					isValid =
				}
			}
			//^ cambiamo la classe sul front end in basse all check della funzione utilizzando bootstrap
			$(items).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
		});
	});
});
