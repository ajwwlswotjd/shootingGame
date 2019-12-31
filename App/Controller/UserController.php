<?php

namespace Gondr\Controller;

use Gondr\DB;

class UserController extends MasterController
{

	public function login()
	{
		// var_dump($_POST);
		// extract($_POST);

		// var_dump($id);
		// $user = DB::fetch("SELECT * FROM user WHERE id = ? AND password = ?", [$id, $pw]);
		// if($user){
		// 	$_SESSION['user'] = $user;
		// } else {

		// }
	}

	public function registerProcess()
	{
		$username = $_POST['username'];
		$email = $_POST['email'];
		$password = $_POST['password'];

		$sql = "SELECT * FROM `shooting_user` WHERE `username` = ?";

		$user = DB::fetch($sql,[$username]);

		if($user){
			echo json_encode(['success' => false, 'msg' => '동일한 이름의 회원이 존재합니다.'],JSON_UNESCAPED_UNICODE);
			return;
		}

		$sql = "SELECT * FROM `shooting_user` WHERE `email` = ?";
		$user = DB::fetch($sql,[$email]);
		if($user){
			echo json_encode(['success' => false, 'msg' => '동일한 이메일의 회원이 존재합니다.'],JSON_UNESCAPED_UNICODE);
			return;
		}

		$sql = "INSERT INTO `shooting_user`(`id`, `username`, `email`, `password`) VALUES (null,?,?,PASSWORD(?))";
		$result = DB::query($sql,[$username,$email,$password]);
		
		if($result == 1){
			echo json_encode(['success' => true, 'msg' => '회원가입 성공'],JSON_UNESCAPED_UNICODE);	
		}else {
			echo json_encode(['success' => false, 'msg' => 'DB 오류 발생'],JSON_UNESCAPED_UNICODE);
		}
	}
}