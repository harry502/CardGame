<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/25
 * Time: 21:02
 */
namespace common\message;

class MQ {

	private static $_instance = null;

	public  static $size = 0;

	private function __construct() {
	}

	private function __clone() {
	}

	static public function getInstance() {
		if (is_null ( self::$_instance ) || !isset ( self::$_instance )) {
			self::$_instance = new self ();
		}
		return self::$_instance;
	}



}