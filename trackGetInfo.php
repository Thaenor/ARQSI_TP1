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

//get album name and artist (artist already exists in $artist but was parsed for spaces to compile the url)
//the mbid will be user later to display album cover
$url = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=68ed3dd100c7eff0e75cb3d44589154f&artist=$artist&track=$track&format=json";
if ($url = file_get_contents($url)) {
    $json = json_decode($url);
    $album_title = $json->track->album->title;
    $mbid = $json->track->album->mbid;
    $artistN = $json->track->artist->name;
} else {
    exit('Failed to open '.$url);
}

//retrieving the 3 top albums
$url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=$artist&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
if($url = file_get_contents($url)) {
    $json = json_decode($url);
    $top_albuns = array();
    for($i=0; $i<3; $i++){
        $top_albuns[] = $json->topalbums->album[$i]->name;
    }
}

//retrieving artist top track & image
$url="http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=$artist&limit=1&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json";
if($url = file_get_contents($url)){
    $json = json_decode($url);
    $toptrack = $json->toptracks->track->name;
    $artist_image = (array) $json->toptracks->track->image[2];
    $image_url = $artist_image["#text"];
}

//getting cover art
$url="http://coverartarchive.org/release/$mbid";
if($url= file_get_contents($url)){
    $json = json_decode($url);
    $coverart = $json->images[0]->thumbnails->small;
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
  "toptrack": "tracka",
  "cover": "img"
}
*/

$jsonReply = "{
  \"topAlbuns\": [
    \"$top_albuns[0]\",
    \"$top_albuns[1]\",
    \"$top_albuns[2]\"
  ],
  \"album\": \"$album_title\",
  \"artist\": \"$artistN\",
  \"image\": \"$image_url\",
  \"toptrack\": \"$toptrack\",
  \"cover\": \"$coverart\"
}";

//print_r(json_encode($jsonReply));
print_r($jsonReply);
