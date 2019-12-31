<?php

use Gondr\Route;

Route::get("/","MainController@index");
Route::get("shooting","MainController@shooting");
Route::post("user_login","UserController@login");
Route::post("user_register", "UserController@registerProcess");