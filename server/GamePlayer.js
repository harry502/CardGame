var basePlayer = require('./server_common/logic/gamebase/BasePlayer');

// 玩家对象
var initPlayer = function(roomId, userId, isRobot){
	
	//继承属性
	basePlayer.call(this, roomId, userId, isRobot);

	//自有属性
	this.HP = 30;
	this.HandNum = 0;
	this.DeckNum = 20;
	this.GameUserId = null;
	
};

module.exports = initPlayer;
