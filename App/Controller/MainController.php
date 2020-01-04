<?php

namespace Gondr\Controller;

use Gondr\DB;

class MainController extends MasterController {

	public function index()
	{
		$this->render("main");
	}

	public function shooting()
	{
		$this->render("shooting");
	}

	public function test()
	{
		$this->render('test');
	}

	public function inGame()
	{
		require __ROOT . '/views/game/game.php';
	}
}