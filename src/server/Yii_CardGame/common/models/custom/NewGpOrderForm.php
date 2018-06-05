<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/26
 * Time: 11:10
 */
namespace common\models\custom;

use Yii;
use yii\base\Exception;
use yii\base\Model;

class NewGpOrderForm extends Model
{

	public $name;
	public $work;
	public $num;
	public $mobile;
	public $other;

	public function rules()
	{
		return [
			[['name', 'num', 'mobile'], 'required'],
			[['mobile'], 'match', 'pattern' => '(^(13\\d|14[57]|15[^4,\\D]|17[13678]|18\\d)\\d{8}|170[^346,\\D]\\d{7})', 'message' => '手机格式不正确']
		];
	}

	public function order()
	{
		if ($this->validate()) {
			$transaction = Yii::$app->db->beginTransaction();
			try{
				$order = new Graduation();
				$order->name = $this->name;
				$order->work = $this->work;
				$order->num = $this->num;
				$order->phone = $this->mobile;
				$order->status = 0;
				$count = Graduation::findOne(['id' => 0]);
				$count->num = $count->num + 1;
				$order->save();
				$count->update();
				$transaction->commit();
				return true;
			}catch (Exception $e){
				$transaction->rollBack();
				return false;
			}
		}
		return false;
	}
}