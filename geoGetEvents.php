<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 19/10/2014
 * Time: 19:13
 */

error_reporting(E_ALL);
ini_set('display_errors', 'on');
require('DAL.php');

if(isset($_REQUEST['lat'])){
    $lat = $_GET['lat'];
}
else
    echo 'ERROR: latitude id not set';

if(isset($_REQUEST['long'])){
    $long = $_GET['long'];
}
else
    echo 'ERROR: longitude id not set';

echo "latitude: $lat & longitude: $long";

//http://www.lastfm.com.br/api/show/geo.getEvents
$url = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat=$lat&long=$long&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
//DAL($url);