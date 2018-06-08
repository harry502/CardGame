<?php
namespace frontend\models;

use common\models\User;
use Yii;
use yii\base\Model;

/**
 * Login form
 */
class LoginForm extends Model
{
    public $username;
    public $password;

    private $_user = null;


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['username', 'password'], 'required'],
            // password is validated by validatePassword()
            ['password', 'validatePassword'],
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, '用户名或密码错误');
            }
        }
    }

    public function login()
    {
        if ($this->validate()) {
			$user = $this->getUser();
	        if($user->generateToken()){
		        $data = Yii::$app->cache->get(md5($user->phone.Yii::$app->params['vCode']));
		        if($data !== false){
			        Yii::$app->cache->delete($data);
			        Yii::$app->cache->delete(md5($user->phone.Yii::$app->params['vCode']));
		        }
		        $array = array(
			        'username'=>$user->username,
			        'phone'=>$user->phone,
			        'avatar'=>$user->avatar,
			        'token_hash'=>$user->token_hash,
			        'token_time'=>$user->token_time,
		        );
		        Yii::$app->cache->set($user->token_hash,$array,Yii::$app->params['tokenWorkTime']);
		        Yii::$app->cache->set(md5($user->phone.Yii::$app->params['vCode']),$user->token_hash,Yii::$app->params['tokenWorkTime']);
		        return $user->token_hash;
	        }
        } else {
            return false;
        }
    }

    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    protected function getUser()
    {
        if ($this->_user === null) {
	        if (preg_match("/^[a-z]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i", $this->username)) {
		        $this->_user = User::findByEmail($this->username);
	        } else if(preg_match("(^(13\\d|14[57]|15[^4,\\D]|17[13678]|18\\d)\\d{8}|170[^346,\\D]\\d{7})",$this->username)) {
		        $this->_user = User::findByPhone($this->username);
	        }else{
		        $this->_user = User::findByUsername($this->username);
	        }
        }
        return $this->_user;
    }
}
