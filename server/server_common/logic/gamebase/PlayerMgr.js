var etc = require('../../etc/projectCfg');

//玩家对象管理
var playerMgr = function( roomId, userId, isRobot ){
	var projectObj = require(etc.etcPlayerPath);
	if (projectObj == undefined || projectObj == null){
		console.warn("配置项目地址找不到：",etc.etcPlayerPath);
		return;
	}
	var object = new projectObj( roomId, userId, isRobot );
	return object;
}

module.exports = playerMgr;
