<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 16/10/14
 * Time: 23:10
 */
error_reporting(E_ALL);
ini_set('display_errors', 'on');
require('DAL.php');

if(isset($_REQUEST['limit'])){
    $limit = $_GET['limit'];
}
else
    echo 'ERROR: limit not set';

if(isset($_REQUEST['tag'])){
    $tag = $_GET['tag'];
}
else
    echo 'ERROR: tag not set';

$tag = str_replace(" ", "+", $tag);

$url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=$tag&limit=$limit&api_key=50418e615431af81d0ba3193ed478a1d&format=json";
//DAL($url);

if($response= file_get_contents($url) === false){
    echo "Error in getTopTracks request to last.fm";
}else {
    $response= file_get_contents($url);
    echo $response;
}