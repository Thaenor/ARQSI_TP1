<?php
	header("Content-Type: text/xml");
	
	require "config.php";
	
	$lfmBaseUrl = "http://ws.audioscrobbler.com/2.0/?format=json&api_key={$api_key}&method=";
	$lfmMethod = "artist.gettoptags";
	$lfmMethodOpt = "artist=" . $_GET["a"];
	
	$lfmJson = json_decode(file_get_contents($lfmBaseUrl . $lfmMethod . "&" . $lfmMethodOpt), true);
	$lfmTags = array_slice($lfmJson["toptags"]["tag"], 0, 5);
	
	$domDoc = new DOMDocument("1.0", "UTF-8");
	
	$xmlRoot = $domDoc->createElement("tags");
	$xmlRoot = $domDoc->appendChild($xmlRoot);
	
	foreach($lfmTags as $vTag)
	{
		$xmlTag = $domDoc->createElement("tag", $vTag["name"]);
		$xmlTag = $xmlRoot->appendChild($xmlTag);
	}
	
	echo $domDoc->saveXML();
?>