/**
 * Created by francisco on 10/10/14.
 */
// Váriavel para o objecto XMLHttpRequest
var xmlHttpObj;

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
}

function MakeXMLHTTPCall()
{
    xmlHttpObj = CreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET","getTopTags.php",true);

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
        var doctext = xmlHttpObj.responseText;
        // because of the MIME type of reply from the server, the xml is not recognized as such.
        // to fix this issue the function textToXML is called.
        // note: doctext is a string containing the full well formed xml returned from our server
        var output = textToXML(doctext);

        // lista de nós com Tag x
        var nodelist = output.getElementsByTagName("name");
        var tag = "";
        for(var i=0;i<nodelist.length;i++){
            tag = tag + "<input type=\"radio\" name=\"tag\" value=\""+ nodelist[i].childNodes[0].nodeValue +"\">" +nodelist[i].childNodes[0].nodeValue + "<br/>";
        }

        var container = document.getElementById('toptags');
        container.innerHTML = tag;
/*for debug:
        alert(docxml);
        alert(doctext);
        var container = document.getElementById('debug');
        var container2 = document.getElementById('debug2');
        container.innerHTML = docxml;
        container2.innerHTML = doctext;
*/
    }
}


//from: http://sweerdenburg.wordpress.com/2011/10/22/converting-a-string-to-xml-in-javascript/
// Convert a string to XML Node Structure
// Returns null on failure
function textToXML ( text ) {
    try {
        var xml = null;

        if (window.DOMParser) {

            var parser = new DOMParser();
            xml = parser.parseFromString(text, "text/xml");

            var found = xml.getElementsByTagName("parsererror");

            if (!found || !found.length || !found[0].childNodes.length) {
                return xml;
            }

            return null;
        } else {

            xml = new ActiveXObject("Microsoft.XMLDOM");

            xml.async = false;
            xml.loadXML(text);

            return xml;
        }
    } catch (e) {
        // suppress
        alert('something went wrong in textToXML method')
    }
}