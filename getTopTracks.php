<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 12/10/2014
 * Time: 16:13
 */

require_once 'api_key.php';
$method = 'tag.gettopartists';
$tag;
$limit;
/* these will be defined after validation of user input
$urlxml = 'http://ws.audioscrobbler.com/2.0/?method='.$method.'&tag='.$tag.'&limit='.$limit.'&api_key='.$api_key;
$urljson = 'http://ws.audioscrobbler.com/2.0/?method=tag.'.$method.'&tag='.$tag.'&limit='.$limit.'&api_key='.$api_key.'&format=json';
*/

$url = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=disco&api_key=68ed3dd100c7eff0e75cb3d44589154f&format=json';
if($response= file_get_contents($url) === false){
    echo "Error in getTopTags request to last.fm";
}else {
    $response= file_get_contents($url);
    echo $response;
}