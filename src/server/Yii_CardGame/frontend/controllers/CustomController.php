<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/25
 * Time: 14:02
 */
namespace frontend\controllers;

use common\base\ApiController;
use common\error\ErrorMsg;
use common\error\RightMsg;
use common\models\custom\NewGpOrderForm;
use Yii;

class CustomController extends ApiController
{

	public function actionGp()
	{
		$params = Yii::$app->request->post();
		if (!isset($data['num']) || !isset($data['mobile']) || !isset($data['name'])) {
			return ErrorMsg::info(Yii::$app->params['code']['paramsError']);
		}
		$data = Yii::$app->cache->get($params['browser']);
		if ($data === false) {
			return ErrorMsg::tempInfo("验证码失效");
		}
		if ($params['captcha'] !== $data) {
			return ErrorMsg::tempInfo("验证码错误");
		}
		Yii::$app->cache->delete($params['browser']);
		Yii::$app->cache->set($params['browser'], Yii::$app->params['vCode'], 7200);
		$model = new NewGpOrderForm();
		$model->name = $params['name'];
		$model->mobile = $params['mobile'];
		$model->num = $params['num'];
		$model->work = $params['work'];
		$model->other = $params['other'];
		if ($model->order()) {
			return RightMsg::info(null);
		} else {
			return ErrorMsg::tempInfo("订单提交失败");
		}
	}
}