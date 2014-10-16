/**
 * Created by francisco on 16/10/14.
 */

// artist.toptags - ATT

var xmlHttpObj;
var doctext;

function prepareArtist(){
    var artist = document.getElementById('artistname').value;
    var replaced = artist.split(' ').join('+');

    /*TODO: some input validation*/
    ATTMakeXMLHTTPCall('artistTopTags.php',replaced);
}


function ATTCreateXmlHttpRequestObject( )
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

function ATTMakeXMLHTTPCall(method, artist)
{
    xmlHttpObj = ATTCreateXmlHttpRequestObject();

    if (xmlHttpObj)
    {
        var doc = document.getElementById('pagestatus');
        doc.innerHTML = 'loading...';
        // Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET",method+'?artist='+artist ,true);

        // Registo do EventHandler
        xmlHttpObj.onreadystatechange = ATTstateHandler;
        xmlHttpObj.send(null);
    }

}

function ATTstateHandler()
{
    if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
    {
        // propriedade responseText que devolve a resposta do servidor
        doctext = xmlHttpObj.responseText;

        // because of the MIME type of reply from the server, the xml is not recognized as such.
        // to fix this issue the function textToXML is called.
        // note: doctext is a string containing the full well formed xml returned from our server
        var output = textToXML(doctext);

        // lista de nós com Tag x
        var nodelist = output.getElementsByTagName("name");
        var tag = "";
        for(var i=0;i<nodelist.length;i++){
//            tag = tag + "<input type=\"radio\" name=\"tag\" value=\""+ nodelist[i].childNodes[0].nodeValue +"\">" +nodelist[i].childNodes[0].nodeValue + "<br/>";
            tag = tag + "<option value=\""+ nodelist[i].childNodes[0].nodeValue +"\">" +nodelist[i].childNodes[0].nodeValue + '</option>';
        }

        var container = document.getElementById('toptags');
        container.innerHTML = tag;
        var container = document.getElementById('pagestatus');
        container.innerHTML = 'artist\'s top tags displayed, standing by...'
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

