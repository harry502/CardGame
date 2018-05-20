<?php
namespace backend\controllers;
header("Access-Control-Allow-Origin:*");
use yii\rest\ActiveController;
use backend\models\User;
use yii\web\Response;
use yii;
use yii\data\ArrayDataProvider;
class UserController extends ActiveController
{
    public $modelClass = 'backend\models\User';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'items'
    ];

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['contentNegotiator']['formats'] = '';
        $behaviors['contentNegotiator']['formats']['application/json'] = Response::FORMAT_JSON;//设置json格式
        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index'], $actions['login'], $actions['create'], $actions['update'], $actions['upload']);//删除自动生成的方法
        return $actions;
    }

    public function actionIndex($userid)//返回模型
    {
        $modelClass = $this->modelClass;
        $query = $modelClass::find()->where(['userid' => $userid])->one();
        return $query;
    }

    public function actionLogin()//账号密码登录
    {
        $modelClass = $this->modelClass;
        $model = $modelClass::find()->where(['username' => $_POST['username']])->one();
        if ($model == null) {
            return [
                'status' => 201,
                'Mark' => '无效用户名'
            ];
        } else if ($model->password != $this->createToken($_POST['username'],$_POST['password'])) {
            return [
                'status' => 202,
                'Mark' => '密码错误'
            ];
        } else {
            if (!$model->save()) {
                return array_values($model->getFirstErrors())[0];
            } else {
                return [
                    'userid' => $model->userid,
                    'status' => 200,
                    'Mark' => '登录成功'
                ];
            }
        }
    }

    public function actionCreate()//注册账号
    {
        if ($_POST['password'] != $_POST['password1']) {
            return [
                'status' => 202,
                'Mark' => '两次密码不一致'
            ];
        }
        $model = new User();
        $modelClass = $this->modelClass;
        $model->attributes = Yii::$app->request->post();
        $model->password = $this->createToken($_POST['username'],$_POST['password']);
        
        if(strlen($_POST['username']) < 6) {
            return [
                'status' => 202,
                'Mark' => '用户名不可小于6位'
            ];
        } else if(strlen($_POST['password']) < 6) {
            return [
                'status' => 202,
                'Mark' => '密码不可小于6位'
            ];
        } else if (!$modelClass::find()->where(['username' => $model->username])->one()) {
            if (!$model->save()) {
                return array_values($model->getFirstErrors())[0];
            } else {
                return [
                    'status' => 200,
                    'Mark' => '注册成功'
                ];
            }
        }else {
            return [
                'status' => 201,
                'Mark' => '已有此用户名'
            ];
        }
    }
/*
    public function actionUpdate()//更新账号
    {

    }
*/
    protected function createToken($username,$password)
    {
        $token=$username.$password;
        $token=md5(sha1($token));
        return $token;
    }
}

class MydataProvider extends ArrayDataProvider
{
    protected function prepareModels()
    {
        if (($models = $this->allModels) === null) {
            return [];
        }

        if (($sort = $this->getSort()) !== false) {
            $models = $this->sortModels($models, $sort);
        }

        if (($pagination = $this->getPagination()) !== false) {
            $pagination->totalCount = $this->getTotalCount();

            if ($pagination->getPageSize() > 0) {
                $models = array_slice($models, $pagination->getOffset(), $pagination->getLimit(), true);
            }
        }

        return [
            'Data'=>$models,
            'status'=>200,
            'Mark'=>'查询成功',
        ];
    }
}