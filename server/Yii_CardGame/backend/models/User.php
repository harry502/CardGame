<?php

namespace backend\models;

use Yii;

class User extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'User';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['score', 'gamenum'],'integer'],
            [['username'],'string', 'max' => 20],
            [['password'],'string', 'max' => 32],
        ];
    }
    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'userid' => 'User ID',
            'username' => 'User Name',
            'score' => 'Score',
            'password' => 'Password',
            'gamenum' => 'Game Num',
            'icon' => 'icon'
        ];
    }
    public function fields()
    {
        return [
            'userid',
            'username',
            'score',
            'password',
            'gamenum',
            'icon'
        ];
    }
}
