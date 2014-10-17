/**
 * Created by francisco on 16/10/14.
 */

// tag.toptracks - TTT

var xmlHttpObj;
var doctext;

//validates and parses the track number
function prepareTrackN(){

    var selec = document.getElementById('toptags');
    var selecTag = selec.options[selec.selectedIndex].value;

    /*IT MAY BE REQUIRED TO PARSE THIS selectTag and REPLACE SPACES WITH PLUS SIGN!!!*/

    var ammount = document.getElementById('numberOfTracks').value;
    if( isNaN(ammount) == true ){
        alert('you have entered text instead of a number, please try again')
    } else {
        TTTMakeXMLHTTPCall('tagTopTracks.php',selecTag ,ammount);
    }
}

function TTTCreateXmlHttpRequestObject( )
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

function TTTMakeXMLHTTPCall(method, tag, limit)
{
    xmlHttpObj = TTTCreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        var doc = document.getElementById('pagestatus');
        doc.innerHTML = 'loading...';
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET",method+'?limit='+limit+'&tag='+tag ,true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = TTTstateHandler;
        xmlHttpObj.send(null);
    }

}

function TTTstateHandler()
{
    if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseText que devolve a resposta do servidor
        doctext = xmlHttpObj.responseText;

        //alert('stopping execution here! the reply from the server is OK but I dont know how to treat it yet');
        //throw { name: 'FatalError', message: 'Stopping here!' };

        var json = JSON.parse(doctext);

        var container = document.getElementById('debug');
        container.innerHTML = json.toptracks.track[1].name;
        createURLTable(json);

    }
}

function createURLTable(json){
    var table = document.getElementById('urlTable');
    for (var i in json.toptracks.track){
        console.log(json.toptracks.track[i].name + ' ' + json.toptracks.track[i].url);

    }
}