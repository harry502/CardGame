<?php
namespace frontend\controllers;

use common\base\ApiController;
use common\error\ErrorMsg;
use common\error\RightMsg;
use common\util\PhoneCaptchaUtil;
use frontend\models\LoginForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use Yii;
use yii\captcha\CaptchaAction;

/**
 * Site controller
 */
class SiteController extends ApiController
{

	public function actions()
	{
		return [
			'error' => [
				'class' => 'yii\web\ErrorAction',
			],
		];
	}

	public function actionIndex()
	{
		$browser_id = Yii::$app->security->generateRandomString();
		Yii::$app->cache->set($browser_id, Yii::$app->params['vCode'], 7200);
		return RightMsg::info(['browser' => $browser_id]);
	}

	public function actionCaptcha($browser)
	{
		$data = Yii::$app->cache->get($browser);
		if ($data === false) {
			return ErrorMsg::info(Yii::$app->params['code']['notFound']);
		}
		$code = substr(md5(time() . Yii::$app->security->generateRandomString()), 11, 4);
		Yii::$app->cache->delete($browser);
		Yii::$app->cache->set($browser, $code,7200);
		$cap = new CaptchaAction("id", $this);
		$cap->fixedVerifyCode = $code;
		$cap->maxLength = 6;
		$cap->minLength = 4;
		$cap->height = 40;
		$cap->width = 80;
		$cap->backColor = 0xffffff;
		$cap->foreColor = 0x000000;
		return $cap->run();
	}

	public function actionSendMsg()
	{
		$params = Yii::$app->request->post();
		if (!isset($params['captcha']) || !isset($params['browser']) || !isset($params['mobile'])) {
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
		Yii::$app->cache->set($params['browser'],Yii::$app->params['vCode'], 7200);
		$util = new PhoneCaptchaUtil();
		$code = $util->genCode();
		$res = $util->sendCaptcha($params['mobile'], $code);
		if ($res['code'] === 1) {
			Yii::$app->cache->set($params['mobile'], $code, 600);
			return RightMsg::info(null);
		} else {
			return ErrorMsg::tempInfo('验证码发送失败');
		}
	}

	public function actionSignUp()
	{
		$params = Yii::$app->request->post();
		if (!isset($params['captcha']) || !isset($params['password']) || !isset($params['mobile'])) {
			return ErrorMsg::info(Yii::$app->params['code']['paramsError']);
		}
		$data = Yii::$app->cache->get($params['mobile']);
		if ($data === false) {
			return ErrorMsg::tempInfo('验证码失效');
		}
		if ($params['captcha'] !== $data) {
			return ErrorMsg::tempInfo("验证码错误");
		}
		Yii::$app->cache->delete($params['mobile']);
		$model = new SignUpForm();
		$model->phone = $params['mobile'];
		$model->password = $params['password'];
		if ($model->signup()) {
			return RightMsg::info(null);
		} else {
			return ErrorMsg::info(Yii::$app->params['code']['serverError']);
		}
	}

	public function actionLogin()
	{
		$data = Yii::$app->request->post();
		if (!isset($data['username']) || !isset($data['password'])) {
			return ErrorMsg::info(Yii::$app->params['code']['paramsError']);
		}
		$model = new LoginForm();
		$model->username = $data['username'];
		$model->password = $data['password'];
		$res = $model->login();
		if ( $res !== false) {
			$cache = Yii::$app->cache->get($res);
			$token = $cache['token_hash'];
			$avatar = $cache['avatar'];
			return RightMsg::info(['token'=>$token,'avatar'=>$avatar]);
		} else {
			return ErrorMsg::tempInfo($model->errors);
		}
	}

	public function actionLogout()
	{
		$data = Yii::$app->request->post();
		if(!isset($data['token'])){
			return ErrorMsg::info(Yii::$app->params['code']['paramsError']);
		}
		$cache = Yii::$app->cache->get($data['token']);
		if($cache !==false){
			Yii::$app->cache->delete(md5(md5($cache['phone'].Yii::$app->params['vCode'])));
		}
		Yii::$app->cache->delete($data['token']);
		return RightMsg::info(null);
	}

	public function actionForgetPassword(){
		$params = Yii::$app->request->post();
		if (!isset($params['captcha']) || !isset($params['password']) || !isset($params['mobile'])) {
			return ErrorMsg::info(Yii::$app->params['code']['paramsError']);
		}
		$data = Yii::$app->cache->get($params['mobile']);
		if ($data === false) {
			return ErrorMsg::tempInfo('验证码失效');
		}
		if ($params['captcha'] !== $data) {
			return ErrorMsg::tempInfo("验证码错误");
		}
		Yii::$app->cache->delete($params['mobile']);
		$model = new ResetPasswordForm();
		$model->phone = $params['mobile'];
		$model->password = $params['password'];
		if ($model->resetPassword()) {
			return RightMsg::info(null);
		} else {
			return ErrorMsg::info(Yii::$app->params['code']['serverError']);
		}
	}

	public function actionChangePassword(){
		$params = Yii::$app->request->post();
		if (!isset($params['captcha']) || !isset($params['password']) || !isset($params['mobile'])) {
			return ErrorMsg::info(Yii::$app->params['code']['paramsError']);
		}
		$data = Yii::$app->cache->get($params['mobile']);
		if ($data === false) {
			return ErrorMsg::tempInfo('验证码失效');
		}
		if ($params['captcha'] !== $data) {
			return ErrorMsg::tempInfo("验证码错误");
		}
		Yii::$app->cache->delete($params['mobile']);
		$model = new ResetPasswordForm();
		$model->phone = $params['mobile'];
		$model->password = $params['password'];
		if ($model->resetPassword()) {
			return RightMsg::info(null);
		} else {
			return ErrorMsg::info(Yii::$app->params['code']['serverError']);
		}
	}

	public function actionUserInfo(){

	}

}
