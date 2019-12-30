<?php

use Gondr\Route;

Route::get("/","MainController@index");
Route::get("shooting","MainController@shooting");