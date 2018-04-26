<?php

/* @var $this yii\web\View */

use yii\bootstrap\Tabs;

$this->title = '毕业拍';
?>
<div class="site-index">
	<?php
	echo Tabs::widget([
		'options' => ['class'=>'nav nav-tabs'],
		'items' => [
			[
				'label' => '新单子',
				'url' => 'index.php?r=site/index',
				'active' => true
			],
			[
				'label' => '历史纪录',
				'url' => '#',
			],
			[
				'label' => '搜索',
				'url' => '#',
			],
		],
	]);
	?>

</div>
