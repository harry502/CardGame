<?php
namespace frontend\models;

use yii\base\Model;
use yii\base\InvalidParamException;
use common\models\User;

/**
 * Password reset form
 */
class ResetPasswordForm extends Model
{
    public $password;
	public $phone;

    private $_user = null;

    public function rules()
    {
        return [
            ['password', 'required'],
            ['password', 'string', 'min' => 6],
        ];
    }


    public function resetPassword()
    {
        $user = $this->getUSer();
        $user->setPassword($this->password);
        return $user->save(false);
    }

	/**
	 * Finds user by [[phone]]
	 *
	 * @return User|null
	 */
	private function getUSer(){
		if($this->_user === null){
			$this->_user = User::findByPhone($this->phone);
		}
		return $this->_user;
	}
}
