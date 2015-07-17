lat = '';
long='';

//Festlegung was beim Klick auf den Button mit der ID posit passiert
$(document).ready(function(){ //
    $('button#posit').bind("click",function(e){
        e.preventDefault();
            navigator.geolocation.getCurrentPosition(onSuccess, onError);           
    });
});


function onSuccess(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var geoElement = document.getElementById('geodata'); //Ansteuerung des Div-Elements mit der ID geodata
    //Definition welche Werte in das Element abgefüllt werden sollen
    geoElement.innerHTML =
    '<h3> Geografische Breite </h3> <br />' + lat + '<br />' +
    '<h3> Geografische Länge </h3> <br />' + long + '<br />';
}

//Funktion welche festlegt, was passiert wenn ein Fehler auftritt.
function onError(error) {
    var errString = ''; //Erstellung einer leeren Variabel
    if (error.code) {
        //Abhandlung in welchem Fehlerfall welche Nachricht ausgegeben werden soll
        switch (error.code) {
            case 1:
                errString =
                    'Die App hat keine Berechtigung zu den Positionsdaten. Bitte schalten Sie Ihre Ortungsfunktion ein.';
                break;
            case 2:
                errString =
                    'Die Lage kann nicht ermittelt werden';
                break;
            case 3:
                errString =
                    'There was a timeout';
                break;
            default:
                errString =
                    'Ein unbekannter Fehler ist aufgetretten';
                break
        }
    }
    var element = document.getElementById('geodata'); //Ansteuerung des Div-Elements mit der ID geodata
    element.innerHTML = errString; //Definition welcher Wert in das Element abgefüllt werden soll.
}

console.log('abc');