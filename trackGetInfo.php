<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 17/10/14
 * Time: 16:33
 */
error_reporting(E_ALL);
ini_set('display_errors', 'on');

if(isset($_REQUEST['track'])){
    $track = $_GET['track'];
}
else
    echo 'ERROR: track id not set';

if(isset($_REQUEST['artist'])){
    $artist = $_GET['artist'];
}
else
    echo 'ERROR: artist id not set';

$artist = str_replace(" ", "+", $artist);
$track = str_replace(" ", "+", $track);

//nome do album
$url = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=68ed3dd100c7eff0e75cb3d44589154f&artist=$artist&track=$track&format=json";
if ($url = file_get_contents($url)) {
    $json = json_decode($url);
    $album_title = $json->track->album->title;
} else {
    exit('Failed to open '.$url);
}

//nome do artista - stored in $artist

//imagem do artista
/*$url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=$artist&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
if($url = file_get_contents($url)){
    $json = json_decode($url);
    $artist_image = $json->artist->image[1];
    var_dump($artist_image);
}*/

//(3) top albuns
$url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=$artist&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
if($url = file_get_contents($url)) {
    $json = json_decode($url);
    $top_albuns = array();
    for($i=0; $i<3; $i++){
        $top_albuns[] = $json->topalbums->album[$i]->name;
    }
}

//top track do artista
$url="http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=$artist&limit=1&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
if($url = file_get_contents($url)){
    $json = json_decode($url);
    $toptrack = $json->toptracks->track->name;
}

//compiling all the information into one JSON file.
/* Expected format of JSON file:
{
  "topAlbuns": [
    "asd",
    "asd",
    "asd"
  ],
  "album": "bananas",
  "artist": "cantoril",
  "image": "something",
  "toptrack": "tracka"
}
*/

$jsonReply = "{
  \"topAlbuns\": [
    \"$top_albuns[0]\",
    \"$top_albuns[1]\",
    \"$top_albuns[2]\"
  ],
  \"album\": \"$album_title\",
  \"artist\": \"$artist\",
  \"image\": \"na\",
  \"toptrack\": \"$toptrack\"
}";

//print_r(json_encode($jsonReply));
print_r($jsonReply);