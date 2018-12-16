<?php
return [
    'components' => [
	    'db' => [
		    'class' => 'yii\db\Connection',
			'dsn' => 'mysql:host=0.0.0.0;port=3306;dbname=CradGame',
		    'username' => '',
		    'password' => '',
			'charset' => 'utf8',
	    ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            'useFileTransport' => true,
        ],
    ],
];
