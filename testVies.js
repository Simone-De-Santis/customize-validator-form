
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/xml; charset=utf-8");

var raw = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <soap:Body>\n        <checkVat xmlns=\"urn:ec.europa.eu:taxud:vies:services:checkVat:types\">\n            <countryCode>it</countryCode>\n            <vatNumber>02830440596</vatNumber>\n        </checkVat>\n    </soap:Body>\n</soap:Envelope>";

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://ec.europa.eu/taxation_customs/vies/services/checkVatService", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


