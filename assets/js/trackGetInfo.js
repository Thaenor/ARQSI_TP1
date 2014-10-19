/**
 * Created by francisco on 17/10/14.
 */

// Track get info :: TGI

var xmlHttpObj;
var doctext;

function checkInfo(track, artist){

    if(artist == null || track == null){
        alert('something went wrong with the tracks');
        throw { name: 'FatalError', message: 'Invalid artist and/or track!' };
    }

    TGIMakeXMLHTTPCall('trackGetInfo.php', track, artist);
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

function TGIMakeXMLHTTPCall(method, track, artist)
{
    xmlHttpObj = TGICreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        var doc = document.getElementById('pagestatus');
        doc.innerHTML = 'loading...';
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET",method+'?track='+track+'&artist='+artist ,true);

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
        if(doctext != null){
            var container = document.getElementById('debug');
            container.innerHTML = doctext;
        }else {alert('no reply from server');}

        //alert('stopping execution here! the reply from the server is OK but I dont know how to treat it yet');
        //throw { name: 'FatalError', message: 'Stopping here!' };

    }
}