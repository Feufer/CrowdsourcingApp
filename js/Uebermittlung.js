// Festlegung was beim Klick auf den Button mit der ID 'posit' passiert
$(document).ready(function(){ //
    $('button#Abschicken').click(function(){
        // Ansteuern des HTML-Elements ausgabe und Änderung des Textes
        document.getElementById("ausgabe").innerText = "Bitte warten...";
                
        /* Definition des AJAX befehls. Ein AJAX-Befehl ist grundsätzlich in
         * in zwei Teile unterteilt. Obligatorisch ist der URL. Die Settings
         * sind optional.
         */
        $.ajax({
            /* Definiert das etwas Übergeben wird. Der type wurde der Übersicht-
             * lichkeit halber zuerst aufgeführt, obwohl er unter den Teil
             * Settings fallen würde.
             */
            type: 'POST',
            // URL zu welchem der Request gesendet wird.
            url: 'https://62.159.72.91/App_BTh/',/*"http://localhost/Webservice/","https://62.159.72.91/Webservice/", */
            
            username: "patrick.lenherr",
            password: "Diplomarbeit.2015",
            // Abfüllen des Strings der hinter den URL angehängt wird.
            data: "y=" + sessionStorage.getItem('y') + "&x=" + 
                    sessionStorage.getItem('x') + "&Ereignis=" + 
                    sessionStorage.getItem('Ereignis')+ "&Zeit=" + sessionStorage.getItem('Zeit') ,
            /* Mit dem Handler für Status Codes wird überprüft, ob eine 'Bad
             * Request' zurückgegeben wird. Nachträglich wird die Reaktion bei
             * Auftretten eines solchen definiert
             */
            statusCode: {400: function(){
                //Meldung an Benutzer das ein Fehler aufgetretten ist
                document.getElementById("ausgabe").innerText = 
                    "Derzeit ist leider kein Eintrag möglich."; 
                }
            },           
            // Definition was bei erfolgreicher Kommunikation geschieht.
            success: function(){
                //Meldung das Übermittlung erfolgreich war
                    alert('Die Übermittlung konnte erfolgreich durchgeführt werden');
                    //Weiterleitung auf Startseite.
                    location.href='../index.html';
                    //leeren des Sessionsspeichers
                    sessionStorage.clear();
            }
        });
    });
});

