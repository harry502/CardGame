<?php
namespace backend\controllers;

use backend\models\LoginForm;
use backend\models\SignupForm;
use common\message\MQ;
use common\models\custom\Graduation;
use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\ErrorAction;
use yii\web\UploadedFile;
/**
 * Site controller
 */
class SiteController extends Controller
{
	public function behaviors()
	{
		return [
			'access' => [
				'class' => AccessControl::className(),
				'only' => ['logout', 'index','order'],
				'rules' => [
					[
						'actions' => ['logout', 'index','order'],
						'allow' => true,
						'roles' => ['@'],
					],
				],
			],
			'verbs' => [
				'class' => VerbFilter::className(),
				'actions' => [
					'logout' => ['post'],
				],
			],
		];
	}

	public function actions()
	{
		return [
			'captcha' => [
				'class' => 'yii\captcha\CaptchaAction',
				'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
			],
		];
	}

	public function actionError()
	{
		$this->layout = false;
		$action = new ErrorAction("error-action", $this);
		return $action->run();
	}

	public function actionIndex()
	{
		return $this->render("index");
	}

	public function actionLogin()
	{
		$this->layout = false;
		$model = new LoginForm();
		if (!Yii::$app->user->isGuest) {
			return $this->goHome();
		}
		if ($model->load(Yii::$app->request->post()) && $model->login()) {
			return $this->goBack();
		}
		return $this->render('login', [
			'model' => $model,
		]);
	}

	public function actionSignup()
	{
		$model = new SignupForm();
		if ($model->load(Yii::$app->request->post())) {
			if ($user = $model->signup()) {
				if (Yii::$app->getUser()->login($user)) {
					return $this->goHome();
				}
			}
		}

		return $this->render('signup', [
			'model' => $model,
		]);
	}

	public function actionLogout()
	{
		Yii::$app->user->logout();
		return $this->goHome();
	}


	public function actionOrder()
	{
		header('Content-Type: text/event-stream');
		header('Cache-Control: no-cache');
		$this->layout = false;
		$order = Graduation::findOne(['id'=>0]);
		echo "data: ".$order->num."\n\n";
		flush();
	}
	public function actionUpload()
	{
		$model = new UploadForm();
		$dir='';
		if (Yii::$app->request->isPost)
		{

			$model->file = UploadedFile::getInstance($model, 'file');

			if ($model->validate())
			{
				$dir='upload/picture' . $model->file->baseName . '.' . $model->file->extension;
				$model->file->saveAs($dir);
			}
		}
		return $dir;
	}
	public function actionCheck()
	{
		/*$signature = $_GET["signature"];
		$timestamp = $_GET["timestamp"];
		$nonce = $_GET["nonce"];

		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );

		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}*/
		return 1;
	}
}
