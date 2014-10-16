<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 16/10/14
 * Time: 23:10
 */
error_reporting(E_ALL);
ini_set('display_errors', 'on');

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

echo 'Im so fuckin high \n';
echo $limit;
echo $tag;