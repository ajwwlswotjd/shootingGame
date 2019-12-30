<?php

namespace Gondr;

class DB {

	public static $con = null;
	
	public static function getDB()
	{
		if(self::$con==null)
		{
			self::$con = new \PDO("mysql:host=localhost; dbname=wotjd;charset=utf8mb4;","root");
		}

		return self::$con;
	}

	public static function fetchAll($sql,$param = [])
	{
		$con = self::getDB();
		$q = $con->prepare($sql);
		$q->execute($param);
		return $q->fetchAll(\PDO::FETCH_OBJ);
	}

}