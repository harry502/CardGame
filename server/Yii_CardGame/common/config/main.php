<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
//        'cache' => [
//            'class' => 'yii\caching\FileCache',
//        ],
	    'cache'=>[
		    'class' => 'yii\redis\Cache',
	    ],
	    'redis' => [
		    'class' => 'yii\redis\Connection',
		    'hostname' => '127.0.0.1',
		    'port' => 6379,
		    'database' => 0,
	    ],
    ],
];
