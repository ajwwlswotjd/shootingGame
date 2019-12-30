<?php
class ABC {
	public static $b = 20;
	public $a = 10;
}

$a = new ABC();
echo $a->a;
echo ABC::$b;