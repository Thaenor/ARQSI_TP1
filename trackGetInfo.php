<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 17/10/14
 * Time: 16:33
 */
error_reporting(E_ALL);
ini_set('display_errors', 'on');

if(isset($_REQUEST['artist'])){
    $artist = $_GET['artist'];
}
else
    echo 'ERROR: artist id not set';
if(isset($_REQUEST['track'])){
    $track = $_GET['track'];
}
else
    echo 'ERROR: track id not set';

$artist = str_replace(" ", "+", $artist);
$track = str_replace(" ", "+", $track);

//$urlgetInfo = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=68ed3dd100c7eff0e75cb3d44589154f&artist=$artist&track=$track";
$urlgetInfo = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=68ed3dd100c7eff0e75cb3d44589154f&artist=$artist&track=$track&format=json";
//$xml = simplexml_load_file($urlgetInfo);
//$albumName = (string) $xml->track[0]->album->title;

echo $albumName;

