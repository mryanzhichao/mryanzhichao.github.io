<?php

	$mysqli=new mysqli("localhost","root","","php");
	if($mysqli->connect_errno){
		die($mysqli->connect_error);
	}
	$mysqli->query("set names utf8");
	$sql="SELECT * FROM product";

	$result=$mysqli->query($sql);

	if($result->num_rows){
		$array=$result->fetch_all(MYSQLI_ASSOC);

		echo json_encode($array);
	}

	$mysqli->close();


 ?>