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
}