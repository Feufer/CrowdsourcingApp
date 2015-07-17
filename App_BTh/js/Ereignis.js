$(document).ready(function(){
    $('button#Weiter').bind("click",function(e){
        e.preventDefault();
        var Ereignis = $('#EreignisInput').val();
        var Opfer = $('#OpferInput').val();
        return Opfer;
        return Ereignis;
        console.log('Opfer, Ereignis');
    });
});

