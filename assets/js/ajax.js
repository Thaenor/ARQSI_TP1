/**
 * Created by francisco on 16/10/14.
 */

// Váriavel para o objecto XMLHttpRequest
var xmlHttpObj;
var doctext;

function CreateXmlHttpRequestObject( )
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

function MakeXMLHTTPCall(method, artist)
{
    xmlHttpObj = CreateXmlHttpRequestObject();

    //to stop execution of Javascript
    //throw { name: 'FatalError', message: 'Stopping here!' };

    if (xmlHttpObj)
    {
        var doc = document.getElementById('toptags');
        doc.innerHTML = 'loading...';
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET",method+'?artist='+artist ,true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = stateHandler;
        xmlHttpObj.send(null);
    }

}

function stateHandler()
{
    if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseText que devolve a resposta do servidor
        doctext = xmlHttpObj.responseText;
        //alert(doctext);
        //console.log(doctext);
        return doctext;
    }
}