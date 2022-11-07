$(document).ready(function () {
	'use strict'

	//^ oggetto per il confronto tra i dati inseriti
	const objLocalizationPath = {
		italia: {
			localization: "italia",
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
		spagna: {
			localization: "spagna",
			prefixCellular: ["+38", "0038"],
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
			],
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
				"0773",
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
		},
	};

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



			if (items.value) {
				// ! VALIDAZIONE NUMERO DI TELEFONO
				// * CELLULARE e FISSO

				if (items.getAttribute("data-validate-type") == 'cellular' || 'homePhone') {
					let arrPhoneNumber = items.value.trim().split("");
					isValid = prefixCutCheckAll(
						arrPhoneNumber,
						items.getAttribute("data-validate-country"),
						items.getAttribute("data-validate-type")
					)
				}
			}
			//^ cambiamo la classe sul front end in basse all ckeck della funzione
			$(items).removeClass('is-valid').removeClass('is-invalid').addClass(isValid ? 'is-valid' : 'is-invalid')
		});
	});
});
