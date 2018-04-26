<?php
/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/24
 * Time: 14:37
 */
namespace common\util;

class PhoneCaptchaUtil
{

	private $apikey = "2f07597a87f5c5b94e56b032b1eadcc1";

	public function genCode()
	{
		$checkstr = '';
		$str = '1234567890';
		$len = strlen($str) - 1;
		for ($i = 0; $i < 4; $i++) {
			$num = mt_rand(0, $len);//产生一个0到$len之间的随机数
			$checkstr .= $str[$num];
		}
		return $checkstr;
	}

	public function sendCaptcha($mobile, $code)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8', 'Content-Type:application/x-www-form-urlencoded', 'charset=utf-8'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$yzmcontent = "【爱拍茄子】尊敬的用户，你的验证码是：" . $code . "，请在10分钟内输入。请勿告诉其他人。";
		$data = array('content' => urlencode($yzmcontent), 'apikey' => $this->apikey, 'mobile' => $mobile);
		$json_data = $this->send_yzm($ch, $data);
		$array = json_decode($json_data, true);
		return $array;
	}

	private function send_yzm($ch, $data)
	{
		curl_setopt($ch, CURLOPT_URL, 'https://api.dingdongcloud.com/v1/sms/sendyzm');
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
		return curl_exec($ch);
	}
}