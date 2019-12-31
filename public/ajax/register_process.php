<?php

use Gondr\DB;
var_dump(DB::$con);
require_once dirname(dirname(__DIR__)).'\\App\\db.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM `shooting_user` WHERE `username` = ?";
$result = sizeof(DB::fetchAll($sql,[$username]));
if($result==1){
	echo "username";
	exit;
}

$sql = "SELECT * FROM `shooting_user` WHERE `email` = ?";
$result = sizeof(DB::fetchAll($sql,[$email]));
if($result==1){
	echo "email";
	exit;
}

$sql = "INSERT INTO `shooting_user`(`id`, `username`, `email`, `password`) VALUES (null,?,?,PASSWORD(?))";
$result = DB::query($sql,[$username,$email,$password]);
echo $result ? "s" : "f";