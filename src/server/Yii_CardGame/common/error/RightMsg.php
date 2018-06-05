<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/24
 * Time: 14:46
 */
namespace common\error;

class RightMsg{

	public static function info($data){
		return ['code'=>0,'message'=>'success','data'=>$data];
	}

}