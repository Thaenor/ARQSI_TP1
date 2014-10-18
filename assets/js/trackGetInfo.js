/**
 * Created by francisco on 17/10/14.
 */

// Track get info :: TGI

var xmlHttpObj;
var doctext;

function checkInfo(artist, track){

    alert(artist+ " " +track);
    throw { name: 'FatalError', message: 'Stopping here!' };
    if(mdid == null){
        alert('something went wrong with the tracks');
        throw { name: 'FatalError', message: 'Invalid mbid!' };
    }

    //TGIMakeXMLHTTPCall('trackGetInfo', mbid);
}

function TGICreateXmlHttpRequestObject( )
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

function TGIMakeXMLHTTPCall(method, id)
{
    xmlHttpObj = TGICreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        var doc = document.getElementById('pagestatus');
        doc.innerHTML = 'loading...';
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET",method+'?id='+id ,true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = TGIstateHandler;
        xmlHttpObj.send(null);
    }
}


function TGIstateHandler()
{
    if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseText que devolve a resposta do servidor
        doctext = xmlHttpObj.responseText;

        console.log(doctext);
        //alert('stopping execution here! the reply from the server is OK but I dont know how to treat it yet');
        //throw { name: 'FatalError', message: 'Stopping here!' };

    }
}