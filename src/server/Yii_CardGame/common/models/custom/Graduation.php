<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/25
 * Time: 14:48
 */
namespace common\models\custom;

use yii\db\ActiveRecord;

/**
 * @property  string $name
 * @property  string $work
 * @property  int $num
 * @property  string $phone
 * @property int $status
 */
class Graduation extends ActiveRecord
{

	public static function tableName()
	{
		return "graduation";
	}


}