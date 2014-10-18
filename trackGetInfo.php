<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 17/10/14
 * Time: 16:33
 */
error_reporting(E_ALL);
ini_set('display_errors', 'on');

if(isset($_REQUEST['id'])){
    $limit = $_GET['id'];
}
else
    echo 'ERROR: music id not set';

