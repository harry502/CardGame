var playerMgr = require('./PlayerMgr');

let GAPI = global.GAPI;

//规则对象=房间对象
var BaseLogic = function( ){
	
	this.gameStart = false;
	this.winnerGroupID;
	this.playerList = [];
	this.bGameOver = false;
}

module.exports = BaseLogic;

//初始化
BaseLogic.prototype.onInit = function(roomId, accountList) {
	this.roomId = roomId;

	//加入玩家
	for (let i = 0; i < accountList.length; i++){
		let initplayer = new playerMgr(roomId, accountList[i]["openId"], accountList[i]["isRobot"]);
		this.playerList.push(initplayer);
	}
}

// 开始游戏
BaseLogic.prototype.startGame = function( gateWayObj ) {
	//游戏已开始
	if (this.gameStart){
		return false;
	}
	this.gameStart = true;

	return true;
}

//游戏正常结束
BaseLogic.prototype.gameOver = function( gateWayObj, userId ) {
	if (userId){
		var userObj = gateWayObj.users.find((x) => x.openId == userId);
		if (userObj){
			this.winnerGroupID = userObj.groupId;
		}
	}
	this.bGameOver = true;
	return true
}


//平台触发游戏强制结束
BaseLogic.prototype.gameOverByGateWay = function(  ) {
	this.bGameOver = true;
	return true
}

//踢出玩家
BaseLogic.prototype.kickUser = function( userList, reason ) {
	if (userList == undefined){
		console.warn("kickUser,userList:",userList);
		return true;
	}
	reason = reason || "gameServerKick";
	for(let i = 0; i < userList.length; i++){
		for(let j = 0; j < this.playerList.length; j++){
			if (userList[i] == this.playerList[j].userId){
				GAPI.kickUser(userList[i], reason);
				this.playerList.splice(j,1);
				break;
			}
		}
	}

	return true
}

//玩家离开
BaseLogic.prototype.userQuit = function( gateWayObj, userList ) {
	if (userList == undefined){
		console.warn("userQuit,userList:",userList);
		return true;
	}

	for(let i = 0; i < userList.length; i++){
		for(let j = 0; j < this.playerList.length; j++){
			if (userList[i] == this.playerList[j].userId){
				this.playerList.splice(j,1);
				break;
			}
		}
	}
	return true
}

//暂停游戏
BaseLogic.prototype.pauseGame = function( gateWayObj, userList ){

}

//继续游戏
BaseLogic.prototype.continueGame = function( gateWayObj, userList ){
	
}

///////////////////////////////【CP自定义发消息】///////////////////////////////////////
//自定义指定给谁发送 【userList：string | string[]】
BaseLogic.prototype.sendCPRPC = function( functionName, userList, retData ){
	var message = {
		"function": functionName,
		"param": retData,
	};
	GAPI.sendTo(userList, message);
}

//自定义房间广播消息
BaseLogic.prototype.sendCPBroadcast = function( functionName, retData ){
	var message = {
		"function": functionName,
		"param": retData,
	};
	GAPI.sendBroadcast(message);
}

////////////////////////////////////【TICK】//////////////////////////////////////////////
//定时器回调
BaseLogic.prototype.tickCallBack = function( gateWayObj, ctx ){
	var object = ctx.obj;
	var sFunction = ctx.function;
	var params = ctx.params
	object[sFunction](params);
	return this.bGameOver;
}

//注册间隔tick【对象，方法名，时间(毫秒)，传参】
BaseLogic.prototype.registerInterval = function(object, functionName, time, params){
	
	if (typeof object[functionName] != 'function'){
		console.warn("注册间隔Tick回调函数不存在：",functionName);
		return null;
	}
	params = params || {};
	var callback = {
		obj:object,
		function:functionName,
		params:params,
	};
	var intervalID = GAPI.setInterval(time, callback);
	
	return intervalID;
}

//注销指定间隔tick
BaseLogic.prototype.unregisterInterval = function(intervalID){
	if (intervalID == null){
		return false;
	}
	GAPI.clearInterval(intervalID);

	return true;
}

//注册定时tick【对象，方法名，时间(毫秒)，传参】
BaseLogic.prototype.registerTimeOut = function(object, functionName, time, params){
	
	if (typeof object[functionName] != 'function'){
		console.warn("注册定时Tick回调函数不存在：",functionName);
		return null;
	}
	params = params || {};
	var callback = {
		obj:object,
		function:functionName,
		params:params,
	};
	var intervalID = GAPI.setTimeout(time, callback);
	
	return intervalID;
}

//注销指定定时tick
BaseLogic.prototype.unregisterTimeOut = function(intervalID){
	if (intervalID == null){
		return false;
	}
	GAPI.clearTimout(intervalID);

	return true;
}
