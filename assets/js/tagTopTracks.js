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

        createURLTable(json);

    }
}

function createURLTable(json){
    var table = document.getElementById('urlTable');

    for(var i=1 in json.toptracks.track){

        var tr = document.createElement('tr');
        var td = document.createElement('td');

        var link = document.createElement('a');
        var method = "checkInfo("+'"'+json.toptracks.track[i].name+'"'+","+'"'+json.toptracks.track[i].artist.name+'"'+")";
        var linkText = document.createTextNode(json.toptracks.track[i].name);
        link.appendChild(linkText);

        link.href="javascript:"+method+";";
        td.appendChild(link);
        tr.appendChild(td);
        table.appendChild(tr);

    }

    var container = document.getElementById('pagestatus');
    container.innerHTML = 'Top tracks displayed.'
}

/*
 var method = "getMoreInfo("+'"'+topTracks[i].artist.name+'"'+","+'"'+topTracks[i].name+'"'+")";
 a.href="javascript:"+method+";";

 td.innerHTML += '<a onmouseover="'+
 "getMoreInfo('"+topTracks[i].artist.name+"', '"+topTracks[i].name+"');"
 +'">'+topTracks[i].name+'</a>';
 */