<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

function DAL($url){
    $dbName= 'i100537';
    $dbHost='localhost';
    $dbUser='i100537';
    $dbPass='6655000';
    $tableName="Information";


    $mycon= new mysqli($dbHost,$dbUser,$dbPass,$dbName);
    if(mysqli_connect_errno()){
        printf("Connected failed: %s \n",  mysqli_connect_error());
    }

    $sql = "INSERT INTO Information ( url) VALUES ('$url')";
    //mysqli_query($mycon,$sql);
    mysqli_query($mycon,$sql);
    $mycon->close();

}
