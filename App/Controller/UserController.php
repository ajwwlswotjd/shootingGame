<?php

namespace Gondr\Controller;

use Gondr\DB;

class UserController extends MasterController
{

	public function login()
	{
		$username = $_POST['username'];
		$password = $_POST['password'];
		$sql = "SELECT * FROM `shooting_user` WHERE `username` = ? AND `password` = PASSWORD(?)";
		$user = DB::fetch($sql,[$username,$password]);
		if(!$user){
			echo json_encode([
				'success' => false,
				'msg' => 'Incorrect username or password.'
			],JSON_UNESCAPED_UNICODE);
		}else {
			echo json_encode([
				'success' => true,
				'msg' => 'Hello, '.htmlentities($user->username).'!'
			],JSON_UNESCAPED_UNICODE);
			$_SESSION['user'] = $user;
		}
	}

	public function registerProcess()
	{
		$username = $_POST['username'];
		$email = $_POST['email'];
		$password = $_POST['password'];

		$sql = "SELECT * FROM `shooting_user` WHERE `username` = ?";

		$user = DB::fetch($sql,[$username]);

		if($user){
			echo json_encode(['success' => false, 'msg' => 'Username already in use'],JSON_UNESCAPED_UNICODE);
			return;
		}

		$sql = "SELECT * FROM `shooting_user` WHERE `email` = ?";
		$user = DB::fetch($sql,[$email]);
		if($user){
			echo json_encode(['success' => false, 'msg' => 'Email already in use'],JSON_UNESCAPED_UNICODE);
			return;
		}

		$sql = "INSERT INTO `shooting_user`(`id`, `username`, `email`, `password`) VALUES (null,?,?,PASSWORD(?))";
		$result = DB::query($sql,[$username,$email,$password]);
		
		if($result == 1){
			echo json_encode(['success' => true, 'msg' => 'Sign up has been completed. Welcome '.$username.'!'],JSON_UNESCAPED_UNICODE);	
		}else {
			echo json_encode(['success' => false, 'msg' => 'DB Error Occurred, Please try again.'],JSON_UNESCAPED_UNICODE);
		}
	}

	public function logout()
	{
		unset($_SESSION['user']);
	}
}