<?php
	$db = @mysql_connect('mysql.hostinger.co.uk', 'u767140841_rbrnx', 'football277') or die('Failed to connect: ' . mysql_error());
	mysql_select_db('u767140841_putt') or die('Failed to access database');
	
	$username = mysql_real_escape_string($_POST['name'], $db);
	$score = mysql_real_escape_string($_POST['score'], $db);
	$hash = $_POST['hash'];
	
	$secretKey = "15111994";
	$expected_hash = md5($username . $score . $secretKey);

	$courseValue = $_POST['coursevalue'];
	if ($courseValue == '1'){	
		if ($expected_hash == $hash){
			$query = "INSERT INTO Course1Scores
			SET name = '$username'
			, score = '$score'
			, ts = CURRENT_TIMESTAMP
			ON DUPLICATE KEY UPDATE
			ts = if('$score'>score,CURRENT_TIMESTAMP,ts), score = if ('$score'>score, '$score', score);"; 
			//And finally we send our query.
			$result = mysql_query($query) or die('Query failed: ' . mysql_error());
		}
	}
	
	if ($courseValue = '2'){	
		if ($expected_hash == $hash){
			$query = "INSERT INTO Course2Scores
			SET name = '$username'
			, score = '$score'
			, ts = CURRENT_TIMESTAMP
			ON DUPLICATE KEY UPDATE
			ts = if('$score'>score,CURRENT_TIMESTAMP,ts), score = if ('$score'>score, '$score', score);"; 
			//And finally we send our query.
			$result = mysql_query($query) or die('Query failed: ' . mysql_error());
		}
	}
?>