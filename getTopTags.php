<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 10/10/14
 * Time: 15:39
 *
 * documentation: http://pt2.php.net/manual/en/function.simplexml-load-file.php
 * http://pt2.php.net/manual/en/simplexmlelement.construct.php
 */
require_once 'api_key.php';
$method = 'gettoptags';

$urlxml = 'http://ws.audioscrobbler.com/2.0/?method=artist.'.$method.'&artist=cher&api_key='.$api_key;
//$urlJSON = 'http://ws.audioscrobbler.com/2.0/?method=artist.'.$method.'&artist=cher&api_key='.$api_key.'&format=json';

if($response= file_get_contents($urlxml) === false){
    echo "Error in getTopTags request to last.fm";
}else {
    $response= file_get_contents($urlxml);
    echo $response;
}