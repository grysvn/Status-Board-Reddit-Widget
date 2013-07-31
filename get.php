<?php
$subreddit = $_GET['subreddit'];
$rest_json = file_get_contents("http://www.reddit.com/r/".$subreddit."/hot.json");
$rest_vars = json_decode($rest_json, true);
print($rest_json);
?>