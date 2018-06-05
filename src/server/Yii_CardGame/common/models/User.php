<?php
namespace common\models;

use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * User model
 *
 * @property integer $id
 * @property string $username
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property string $auth_key
 * @property integer $email_status
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $password write-only password
 * @property string $phone
 * @property string $avatar
 * @property string $token_hash
 * @property int $token_time
 */
class User extends ActiveRecord implements IdentityInterface
{
    const EMAIL_DELETE = 0;
    const EMAIL_ACTIVE = 10;


    public static function tableName()
    {
        return 'user';
    }


	public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }


    public function rules()
    {
        return [
            ['email_status', 'default', 'value' => self::EMAIL_DELETE],
        ];
    }

    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
	    return static::findOne(['token_hash' => $token]);
    }


    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }

	public static function findByEmail($email){
		return static::findOne(['email'=>$email,'email_status'=>self::EMAIL_ACTIVE]);
	}

	public static function findByPhone($phone)
	{
		return static::findOne(['phone'=>$phone]);
	}
    public function getId()
    {
        return $this->getPrimaryKey();
    }


    public function getAuthKey()
    {
        return $this->auth_key;
    }


    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }


    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }


    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }


    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

	public function generateToken()
	{
		$this->token_hash = Yii::$app->security->generateRandomString();
		$this->token_time = time();
		return $this->update();
	}

	public function isTokenValid($token)
	{
		if ($token === $this->token_hash) {
			return $this->token_time + 3600*24*14 >= time();
		} else {
			return false;
		}
	}

	public function removeToken()
	{
		$this->token_hash = null;
		$this->token_time = null;
		return $this->update();
	}

}
