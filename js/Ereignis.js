//Festlegung was beim Klick auf den Button mit der ID 'Weier' passiert
$(document).ready(function(){ //
    $('button#Weiter').click(function(e){
        e.preventDefault();
            /*Mit Hilfe dieses HMTL5-Elements werden lat und long in einen für
            die die Session gültigen Speicher gespeichet. Der erste Wert
            Definiert den Schlüssel. An der zweiten Stelle folgt der Wert des
            Eintrags. Es wurde im Fall dieser App auf einen nummerischen Wert
            des Schlüssels verzichtet, da da nach dem senden der Werte an den
            Server das ganze wieder gelöscht wird.*/
            sessionStorage.setItem('Ereignis', $('#EreignisInput').val());
            location.href='Abschluss.html';               
    });
});

