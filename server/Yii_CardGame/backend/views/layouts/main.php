<?php

/* @var $this \yii\web\View */
/* @var $content string */


use backend\assets\OrderAsset;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use common\widgets\Alert;

OrderAsset::register($this);
?>

<?php $this->beginPage() ?>
	<!DOCTYPE html>
	<html lang="<?= Yii::$app->language ?>">
	<head>
		<meta charset="<?= Yii::$app->charset ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?= Html::csrfMetaTags() ?>
		<title><?= Html::encode($this->title) ?></title>
		<?php $this->head() ?>
	</head>
	<body>
	<?php $this->beginBody() ?>

	<div class="wrap">
		<?php
		NavBar::begin([
			'brandLabel' => '爱拍茄子',
			'brandUrl' => Yii::$app->homeUrl,
			'options' => [
				'class' => 'navbar-inverse navbar-fixed-top',
			],
		]);

		$menuItems[] = '<li id="order-li" class="active">' . '<a href = "index.php?r=site/index">' . '毕业拍  ' . '<span id="order" class="badge" style="background-color:#337AB7">' . '</span>' . '</a>' . '</li>';
		if (Yii::$app->user->isGuest) {
			$menuItems[] = ['label' => '登陆', 'url' => ['/site/login']];
		} else {
			$menuItems[] = '<li>'
				. Html::beginForm(['/site/logout'], 'post')
				. Html::submitButton(
					'登出 (' . Yii::$app->user->identity->username . ')',
					['class' => 'btn btn-link']
				)
				. Html::endForm()
				. '</li>';
		}
		echo Nav::widget([
			'options' => ['class' => 'navbar-nav navbar-right'],
			'items' => $menuItems,
		]);
		NavBar::end();
		?>

		<div class="container">
			<?= Breadcrumbs::widget([
				'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
			]) ?>
			<?= Alert::widget() ?>
			<?= $content ?>
		</div>
	</div>

	<footer class="footer">
		<div class="container">
			<p class="pull-left">&copy; 爱拍茄子 <?= date('Y') ?></p>

			<p class="pull-right"><a>trieyouth</a>支持</p>
		</div>
	</footer>

	<?php $this->endBody() ?>
	</body>
	</html>
<?php $this->endPage() ?>