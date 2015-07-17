document.addEventListener("deviceready", onDeviceReady, true);
           
//Device is Ready
function onDeviceReady() {
    var output = '';
    output += '<li>'+'y-Koordinate: '+sessionStorage.getItem('y')+'</li>';
    output += '<li>'+'x-Koordinate: '+sessionStorage.getItem('x')+'</li>';
    output += '<li>'+'Ereignis: '+sessionStorage.getItem('Ereignis')+'</li>';
    $('#Uebersicht').html(output);
    $('#Uebersicht').listview("refresh");
}