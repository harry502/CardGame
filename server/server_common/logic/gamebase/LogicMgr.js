var etc = require('../../etc/projectCfg');

//逻辑对象管理
var logicMgr = function(roomId, accountList){
	var projectObj = require(etc.etcLogicPath);
	if (projectObj == undefined || projectObj == null){
		console.warn("配置项目地址找不到：",etc.etcLogicPath);
		return;
	}
	var object = new projectObj();
	object.onInit(roomId, accountList);
	return object;
}

module.exports = logicMgr;
