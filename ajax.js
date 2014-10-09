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
            xmlHttpObj.open("GET","http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=68ed3dd100c7eff0e75cb3d44589154f", true);

    // Registo do EventHandler
            xmlHttpObj.onreadystatechange = stateHandler;
    xmlHttpObj.send(null);
         }

      }


     function stateHandler()
        {
        if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) // resposta do servidor completa
        {
          // propriedade responseXML que devolve a resposta do servidor
      		var docxml = xmlHttpObj.responseXML;

      		// lista de nós com Tag x
      		var nodelist = docxml.getElementsByTagName("name");
          var tag = "";
          for(var i=0;i<nodelist.length;i++){
            tag = tag+ "<br/>"+nodelist[i].childNodes[0].nodeValue;
          }

    var container = document.getElementById('toptags');
    container.innerHTML = tag;
        }
    }
