<?php
/**
 * Created by PhpStorm.
 * User: francisco
 * Date: 10/10/14
 * Time: 15:08
 */

error_reporting(E_ALL);
ini_set('display_errors', 'on');
?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>last.fm widget</title>
    <script src="getTopTags_ajax.js" type="text/javascript"></script>
    <script src="getTopTracks_ajax.js" type="text/javascript">
    <link rel=StyleSheet href="main.css" type="text/css"/>

<!--
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
-->

</head>
<body onload="MakeXMLHTTPCall();">

<div class="widget">
    <form action="#" onsubmit="return getTopTracks();" method="get">
        <ledgend id="legdendt">Last.fm widget</ledgend><hr/>
        <input id="numberOfTracks" type="text" name="textfield" size="5" value="3">
        <input type="submit">
        <div id="toptags">loading...</div>
    </form>


</div>

<!-- debug paragraphs (replaced with console.log()) -->
<p>debug area 1:</p>
<p id="debug"></p>
<hr/>
<p>debug area 2:</p>
<p id="debug2"></p>

</body>
</html>
