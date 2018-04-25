<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/24
 * Time: 14:04
 */
namespace common\error;

use Yii;

class ErrorMsg
{
	public static function info($code)
	{
		switch ($code) {
			case Yii::$app->params['code']['tokenLose']:
				return ['code' => Yii::$app->params['code']['tokenLose'], 'error' => 'token丢失'];
			case Yii::$app->params['code']['tokenNotWork']:
				return ['code' => Yii::$app->params['code']['tokenNotWork'], 'error' => '身份验证失效，请重新登录'];
			case Yii::$app->params['code']['paramsError']:
				return ['code'=>Yii::$app->params['code']['paramsError'],'error'=>'参数不完整'];
			case Yii::$app->params['code']['notFound']:
				return ['code'=>Yii::$app->params['code']['notFound'],'error'=>'not found'];
			case Yii::$app->params['code']['serverError']:
				return ['code' => Yii::$app->params['code']['serverError'], 'error' => '天哪，服务器错误，有人要扣工资了'];
			default:
				return ['code' => Yii::$app->params['code']['noReason'], 'error' => 'no message'];
		}
	}

	public static function tempInfo($error){
		return ['code'=>Yii::$app->params['code']['tempCode'],"error"=>$error];
	}
}