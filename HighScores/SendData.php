<?php
	$db = mysql_connect('mysql.hostinger.co.uk', 'u767140841_rbrnx', 'football277') or die('Failed to connect: ' . mysql_error());
	mysql_select_db('u767140841_putt') or die('Failed to access database');
	
	$username = mysql_real_escape_string($_POST['name'], $db);
	$score = mysql_real_escape_string($_POST['score'], $db);
	
	$query = "INSERT INTO Scores
	SET name = '$username'
	, score = '$score'
	, ts = CURRENT_TIMESTAMP
	ON DUPLICATE KEY UPDATE
	ts = if('$score'>score,CURRENT_TIMESTAMP,ts), score = if ('$score'>score, '$score', score);"; 
    //And finally we send our query.
    $result = mysql_query($query) or die('Query failed: ' . mysql_error());
	
	
	// Test if our data came through
/*if (isset($_POST["data"])) {
    // Decode our JSON into PHP objects we can use
    $data = json_decode($_POST["data"]);
    // Access our object's data and array values.
    echo "<script>console.log('Object is: " . $data->data . "');</script>";
    //echo "Name is: " . $data->name . "<br>";
	//echo "Score is: " . $data->score;
}*/

?>