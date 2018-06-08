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
            [['score', 'gamenum','wealth'],'integer'],
            [['username'],'string', 'max' => 20],
            [['password'],'string', 'max' => 32],
            [['decklist'],'string', 'max' => 1024],
            [['owncardlist'],'string', 'max' => 1024],
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
            'wealth' => 'Wealth',
            'decklist' => 'Deck List',
            'owncardlist' => 'Own Card List',
        ];
    }
    public function fields()
    {
        return [
            'userid',
            'username',
            'score',
            'gamenum',
            'wealth',
            'decklist',
            'owncardlist',
        ];
    }
}
