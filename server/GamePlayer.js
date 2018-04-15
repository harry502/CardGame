var basePlayer = require('./server_common/logic/gamebase/BasePlayer');

// 玩家对象
var initPlayer = function(roomId, userId, isRobot){
	
	//继承属性
	basePlayer.call(this, roomId, userId, isRobot);

	//自有属性
	this.item = {};//玩家技能item1,item2
	this.score = 0;//玩家分数
	this.status = 0;//玩家状态 0摇晃 1下抓 2拉回 3停止
	this.dir = 0;//摇晃方向，0为左，1为右
	this.goodid = null;
	
};

module.exports = initPlayer;
