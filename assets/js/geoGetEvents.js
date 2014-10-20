/**
 * Created by francisco on 19/10/2014.
 */

//geo get events : GGE
var i=0;
var locations = new Array();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    GGEMakeXMLHTTPCall('geoGetEvents.php', lat, long)
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function GGECreateXmlHttpRequestObject( )
{
    // detecção do browser simplificada
    // e sem tratamento de excepções
    xmlHttpObj=null;
    if (window.XMLHttpRequest) // IE 7 e Firefox
    {
        xmlHttpObj=new XMLHttpRequest()

    }
    else if (window.ActiveXObject) // IE 5 e 6
    {
        xmlHttpObj=new ActiveXObject("Microsoft.XMLHTTP")
    }
    return xmlHttpObj;
};

function GGEMakeXMLHTTPCall(method, lat, long)
{
    xmlHttpObj = GGECreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        var doc = document.getElementById('pagestatus');
        doc.innerHTML = 'loading...';
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET",method+'?lat='+lat+'&long='+long ,true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = GGEstateHandler;
        xmlHttpObj.send(null);
    }

}

function GGEstateHandler()
{
    if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseText que devolve a resposta do servidor
        doctext = xmlHttpObj.responseText;
        if(doctext != null){
            var json = JSON.parse(doctext);
            displayEvents(json);
        }else {alert('no reply from server');}

    }
}

function displayEvents(json){
    var ele = document.getElementById('selmaps');
    if(ele != null){
        ele.innerHTML="";
    }

    var titles = new Array();
    //var locations = new Array();
    for(i=0; i<5; i++){
        titles[i] = json.title[i];
        ele.innerHTML += '<option value="'+i+'">'+titles[i]+'</option> <br>';
        locations[i] = json.street[i].split(' ').join('+');

//ele.innerHTML += '<option value="'+locations[i]+'">'+locations[i]+'</option> <br>';
    }
    ele.style.visibility="visible";
    ele = document.getElementById('mapbutt');
    ele.style.visibility="visible";
}

function showmap(){
    var sel = document.getElementById('selmaps');
    var selVal = sel.options[sel.selectedIndex].value;

    var cont = document.getElementById('gps');
    cont.innerHTML = '<iframe src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDn-UcwMbrIiX8wgyNAlLyHnmqOvZsaddw&origin=Porto&destination='+locations[selVal]+'&zoom=10" editable="true" frameborder="0" style="border:0;"></iframe>';

    cont.style.visibility="visible";
}