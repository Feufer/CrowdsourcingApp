//Festlegung was beim Klick auf den Button mit der ID 'posit' passiert
$(document).ready(function(){ //
    $('button#Abschicken').bind("click",function(){
        document.getElementById("ausgabe").innerText = "Bitte warten...";
        
        $.ajax({
            type: "get",
            url: "http://localhost/Webservice/",
            data: "y=" + sessionStorage.getItem('y') + "&x=" + sessionStorage.getItem('x') + "&Ereignis=" + sessionStorage.getItem('Ereignis'),
            success: console.log("übermittelt")
        }); 
    });
});

