<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 16/10/14
 * Time: 17:11
 */
error_reporting(E_ALL);
ini_set('display_errors', 'on');

//$api_key = '68ed3dd100c7eff0e75cb3d44589154f';
//ARQSI 2014
//50418e615431af81d0ba3193ed478a1d

if(isset($_REQUEST['artist'])){
    $artist = $_GET['artist'];
}
else
echo 'ERROR: artist not set';


$urlxml = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=$artist&api_key=68ed3dd100c7eff0e75cb3d44589154f";

if($response= file_get_contents($urlxml) === false){
    echo "Error in getTopTags request to last.fm";
}else {
    $response= file_get_contents($urlxml);
    echo $response;
}
