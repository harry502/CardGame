<?php
namespace frontend\models;

use Yii;
use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class SignUpForm extends Model
{
	public $username;
	public $phone;
	public $password;

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			['username', 'trim'],
			['username', 'required'],
			['username', 'unique', 'targetClass' => 'app\models\User', 'message' => 'This username has already been taken.'],
			['username', 'string', 'min' => 2, 'max' => 255],

			['phone', 'trim'],
			['phone', 'required'],
			[['phone'],'match','pattern'=>'(^(13\\d|14[57]|15[^4,\\D]|17[13678]|18\\d)\\d{8}|170[^346,\\D]\\d{7})','message'=>'手机格式不正确'],
			['phone', 'unique', 'targetClass' => 'app\models\User', 'message' => '手机已被注册'],

			['password', 'required'],
			['password', 'string', 'min' => 6],
		];
	}

	/**
	 * Signs user up.
	 *
	 * @return User|null the saved model or null if saving fails
	 */
	public function signup()
	{
		$this->username = "用户".substr(md5(time() . Yii::$app->security->generateRandomString()), 11,8);
		if ($this->validate()) {
			$user = new User();
			$user->username = $this->username;
			$user->phone = $this->phone;
			$user->created_at = time();
			$user->updated_at = time();
			$user->avatar = "default.jpg";
			$user->setPassword($this->password);
			$user->generateAuthKey();
			return $user->save();
		}
	}
}
