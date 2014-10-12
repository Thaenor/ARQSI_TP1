/**
 * Created by francisco on 12/10/2014.
 */
var xmlHttpObj;

function CreateXmlHttpRequestObject(){
    xmlHttpObj=null;
    if (window.XMLHttpRequest){
        xmlHttpObj=new XMLHttpRequest()
    }
    else if (window.ActiveXObject){
        xmlHttpObj=new ActiveXObject("Microsoft.XMLHTTP")
    }
    return xmlHttpObj;
}

function getTopTracks() {
    xmlHttpObj = CreateXmlHttpRequestObject();
    if (xmlHttpObj) {
        xmlHttpObj.open("GET","getTopTracks.php",true);
        xmlHttpObj.onreadystatechange = stateHandler;
        xmlHttpObj.send(null);
    }
    return false;
}

function stateHandler() {
    if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
        var doctext = xmlHttpObj.responseText;
        console.log(doctext);
        //TODO: add logic to tread php reply.
        var container = document.getElementById('debug');
        container.innerHTML = doctext;
    }
}