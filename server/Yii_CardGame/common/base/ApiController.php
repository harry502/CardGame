<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/23
 * Time: 23:08
 */
namespace common\base;


use common\error\ErrorMsg;
use Yii;
use yii\web\Controller;
use yii\web\Response;

class ApiController extends Controller
{

	public function init()
	{
		Yii::$app->response->format = Response::FORMAT_JSON;
	}

	public function beforeAction($action)
	{
		$url = Yii::$app->controller->id ."+". $action->id;
		if ($url === 'site+login' || $url === 'site+sign-up' || $url === 'site+forget-password'
			|| $url === "site+index" || $url=== 'site+captcha' || $url === 'site+send-msg'
		|| $url === 'custom+gp') {
			return true;
		} else if ($url === 'site+error') {
			return $this->afterAction($action, ErrorMsg::info(Yii::$app->params['code']['serverError']));
		} else {
			$params = array_merge(Yii::$app->request->get(), Yii::$app->request->post());
			if (!isset($params['token'])) {
				return $this->afterAction($action, ErrorMsg::info(Yii::$app->params['code']['tokenLose']));
			} else {
				$data = Yii::$app->cache->get($params['token']);
				if ($data === false) {
					return $this->afterAction($action, ErrorMsg::info(Yii::$app->params['code']['tokenNotWork']));
				} else {
					return true;
					//return $this->afterAction($action, ['code' => Yii::$app->params['code']['tokenNotWork'], 'error' => json_encode($data)]);
				}
			}
		}
	}

	public function afterAction($action, $result)
	{
		Yii::$app->response->data = $result;
		Yii::$app->response->send();
	}


}