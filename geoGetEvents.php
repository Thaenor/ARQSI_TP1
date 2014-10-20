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

//http://www.lastfm.com.br/api/show/geo.getEvents
$url = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat=$lat&long=$long&limit=5&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
//DAL($url);

if ($url = file_get_contents($url)) {
    $json = json_decode($url);
    $events = array();
    $eventLat = array();
    $eventLong = array();
    for($i=0; $i<5; $i++){
        $events[] = $json->events->event[$i]->title;
        $eventStreet[] = $json->events->event[$i]->venue->location->street;
    }
} else {
    exit('Failed to open '.$url);
}

/*{
  "title": [
    "fiesta",
    "musica ao vivo",
    "festival das batatas"
  ],
  "street": [
    "rua coisa",
    "travessa cenas",
    "campo batatas"
  ]
}*/

$jsonReply = "{
    \"title\": [
        \"$events[0]\",
        \"$events[1]\",
        \"$events[2]\",
        \"$events[3]\",
        \"$events[4]\"
    ],
  \"street\": [
        \"$eventStreet[0]\",
        \"$eventStreet[1]\",
        \"$eventStreet[2]\",
        \"$eventStreet[3]\",
        \"$eventStreet[4]\"
    ]
}";

print_r($jsonReply);