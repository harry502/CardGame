<?php

/**
 * Created by PhpStorm.
 * User: MyLuffy
 * Date: 2016/5/25
 * Time: 21:42
 */
namespace backend\assets;

use yii\web\AssetBundle;

class OrderAsset extends AssetBundle
{
	public $basePath = '@webroot';
	public $baseUrl = '@web';
	public $css = [
		'css/site.css',
	];
	public $js = [
		'js/order.js',
	];
	public $depends = [
		'yii\web\YiiAsset',
		'yii\bootstrap\BootstrapAsset',
	];
}
