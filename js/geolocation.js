//Variabelndefinition
//Variabeln für die WGS84-Koordinaten
var lat = '';
var long='';
//Variabeln für die LV03-Koordinaten
var x = '';
var y='';

//Wartet bis Seite geladen ist.
document.addEventListener("deviceready", onDeviceReady, false);

// Funktion welche ausgeführt wird wenn die Seite geladen ist.
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


//Festlegung was beim Klick auf den Button mit der ID 'posit' passiert
$(document).ready(function(){ //
    $('button#posit').click(function(e){
        //Legt fest, dass der Browser nicht die ganze URL neu ladet.
        e.preventDefault();
            /*HTML5 Funktion welche die aktuelle Positon ausliest. onSuccess
            beschreibt was passiert wenn erfolgreich. onError beschreibt
            was passiert wenn die Funktion nicht erfolgreich ist.*/
            navigator.geolocation.getCurrentPosition(onSuccess, onError); 
    });
});


function onSuccess(position) {
    //Abfüllen der Variabeln mit der aktuellen Position (WGS84-Koordinaten)
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    /*Berechnen der LV03 Koordinaten aus den WGS84 Koordinaten und anschliessend
    in einen für die Session gültigen Speicher geschriben.*/
    sessionStorage.setItem('y', WGStoCHy(lat, lng));
    sessionStorage.setItem('x', WGStoCHx(lat, lng));
    //Ansteuerung des Div-Elements mit der ID geodata  
    var geoElement = document.getElementById('geodata'); 
    /*Definition welche Werte in das Element abgefüllt werden sollen
    mit sessionStorage.getItem('') werden die bestimmten Variabeln aus Sessions-
    Speicher gelesen*/
    geoElement.innerHTML =
    '<h3> y-Koordinate LV03 </h3>' + sessionStorage.getItem('y') + '<br />' +
    '<h3> x-Koordinate LV03 </h3>' + sessionStorage.getItem('x') + '<br />';  

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
    //Ansteuerung des Div-Elements mit der ID geodata
    var element = document.getElementById('geodata');
    //Definition welcher Wert in das Element abgef�llt werden soll.
    element.innerHTML = errString; 
}

//--------------------------------------------------------------------------------
// The MIT License (MIT)
// 
// Copyright (c) 2014 Federal Office of Topography swisstopo, Wabern, CH
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
// 
	
// Source: http://www.swisstopo.admin.ch/internet/swisstopo/en/home/topics/survey/sys/refsys/projections.html (see PDFs under "Documentation")
// Updated 9 dec 2014
// Please validate your results with NAVREF on-line service: http://www.swisstopo.admin.ch/internet/swisstopo/en/home/apps/calc/navref.html (difference ~ 1-2m)

// Convert WGS lat/long (° dec) to CH y
function WGStoCHy(lat, lng) {

  // Convert decimal degrees to sexagesimal seconds
  lat = DECtoSEX(lat);
  lng = DECtoSEX(lng);

  // Auxiliary values (% Bern)
  var lat_aux = (lat - 169028.66)/10000;
  var lng_aux = (lng - 26782.5)/10000;
  
  // Process Y
  y = 600072.37 
     + 211455.93 * lng_aux 
     -  10938.51 * lng_aux * lat_aux
     -      0.36 * lng_aux * Math.pow(lat_aux,2)
     -     44.54 * Math.pow(lng_aux,3);
     
  return y;
}

// Convert WGS lat/long (° dec) to CH x
function WGStoCHx(lat, lng) {
  
  // Convert decimal degrees to sexagesimal seconds
  lat = DECtoSEX(lat);
  lng = DECtoSEX(lng);
  
  // Auxiliary values (% Bern)
  var lat_aux = (lat - 169028.66)/10000;
  var lng_aux = (lng - 26782.5)/10000;

  // Process X
  x = 200147.07
     + 308807.95 * lat_aux 
     +   3745.25 * Math.pow(lng_aux,2)
     +     76.63 * Math.pow(lat_aux,2)
     -    194.56 * Math.pow(lng_aux,2) * lat_aux
     +    119.79 * Math.pow(lat_aux,3);
 
  return x;
  
}

// Convert angle in decimal degrees to sexagesimal seconds
function DECtoSEX(angle) {

  // Extract DMS
  var deg = parseInt(angle);
  var min = parseInt((angle-deg)*60);
  var sec = (((angle-deg)*60)-min)*60;   

  // Result sexagesimal seconds
  return sec + min*60.0 + deg*3600.0;
  
}