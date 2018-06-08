var baseLogic = require('./server_common/logic/gamebase/BaseLogic');
var playerMgr = require('./GamePlayer');

//规则对象=房间对象
var GameScript = function(roomId, accountList){
	//继承属性
	baseLogic.call(this);
}

module.exports = GameScript;

//继承方法
GameScript.prototype = new baseLogic();
GameScript.prototype.constructor = GameScript;

//初始化
GameScript.prototype.onInit = function( roomId, accountList ) {
	
	console.log("typeof",accountList.length);
	//console.log("accountList",accountList);
	//加入玩家
	for (let i = 0; i < accountList.length; i++){
		let initplayer = new playerMgr(roomId, accountList[i]["openId"], accountList[i]["isRobot"]);
		this.playerList.push(initplayer);
	}
}

// 开始游戏
GameScript.prototype.startGame = function(gateWayObj) {
	
	//X秒后开始接受消息 前端ready go 动画时间预留
	var tempThis = this;
	setTimeout(function(){
		tempThis.canCatch = true;
	},1000);

	//60秒后结束游戏
	this.intervalID = this.registerInterval(this, "countResult", 30*60*1000,gateWayObj);

	var retData = {};

	//this.registerTimeOut(this, 'sendInitData', 0);

	return true;
}

GameScript.prototype.sendInitData = function(){
	var retData = {};
	//房间广播同步房间数据
	retData.StartUserId = this.playerList[0].userId;
	this.sendCPBroadcast("StartGame",retData);
}

GameScript.prototype.CheckUser = function(gateWayObj,userId,params){
	console.log(params);
	var id = params.userid;
	var retData = {};

	setTimeout(function(){
		if(this)this.gameOver(gateWayObj, "" );
	},10000);

	if(this.playerList[0].userId == userId)
	{
		this.playerList[0].GameUserId = id;
		if(this.playerList[1].GameUserId != null && this.playerList[1].GameUserId !=id )
		{
			console.log("确认无误");
			var retData = {};
			//房间广播同步房间数据
			retData.StartUserId = this.playerList[0].userId;
			this.sendCPBroadcast("StartGame",retData);
		}
		else if(this.playerList[1].GameUserId == id)
		{
			console.log("玩家为同一人");
			console.log(this.playerList[0].GameUserId);
			console.log(this.playerList[1].GameUserId);
			console.log(id);
			this.gameOver(gateWayObj, "" );
		}
	}
	else
	{
		this.playerList[1].GameUserId = id;
		if(this.playerList[0].GameUserId != null && this.playerList[0].GameUserId !=id )
		{
			console.log("确认无误");
			var retData = {};
			//房间广播同步房间数据
			retData.StartUserId = this.playerList[0].userId;
			this.sendCPBroadcast("StartGame",retData);
		}
		else if(this.playerList[0].GameUserId == id)
		{
			console.log("玩家为同一人");
			console.log(this.playerList[0].GameUserId);
			console.log(this.playerList[1].GameUserId);
			console.log(id);
			this.gameOver(gateWayObj, "" );
		}
	}
}

GameScript.prototype.summonCard = function(gateWayObj,userId,params){
	var Block_num = params.Block_num;
	var CardId = params.CardId;
	var retData = {};

	retData.CardId = CardId;
	retData.Block_num = Block_num;
	if(this.playerList[0].userId == userId)
	{
		this.sendCPRPC("Enemysummon",this.playerList[1].userId,retData);
	}
	else
	{
		this.sendCPRPC("Enemysummon",this.playerList[0].userId,retData);
	}
}

GameScript.prototype.NextTurn = function(gateWayObj,userId,params){
	var retData = {};

	if(this.playerList[0].userId == userId)
	{
		this.sendCPRPC("EnemyNextTurn",this.playerList[1].userId,retData);
	}
	else
	{
		this.sendCPRPC("EnemyNextTurn",this.playerList[0].userId,retData);
	}
}

GameScript.prototype.gameover = function(gateWayObj,userId,params){
	var retData = {};
	retData.winner = userId;

	this.sendCPBroadcast("Result",retData);
	this.gameOver(gateWayObj, retData.winner );
}

//结果计算
GameScript.prototype.countResult = function(gateWayObj) {
	console.log("gateWayObj",gateWayObj);
	this.canCatch = false;

	var retData = {};
	//通过得分判断胜负
	if (this.playerList[0].HP <= 0 || this.playerList[0].DeckNum <= 0){
		retData.winner = this.playerList[1].userId;
	}else if (this.playerList[1].HP <= 0 || this.playerList[1].DeckNum <= 0){
		retData.winner = this.playerList[0].userId;
	}else{
		retData.winner = "";
	}
	this.sendCPBroadcast("Result", retData );
	this.gameOver(gateWayObj, retData.winner );
}

//玩家离开游戏结束
GameScript.prototype.userQuit = function(gateWayObj,userList ) {

	for(let i = 0; i < userList.length; i++){
		for(let j = 0; j < this.playerList.length; j++){
			if (userList[i] == this.playerList[j].userId){
				this.playerList.splice(j,1);
				break;
			}
		}
	}

	var retData = {};
	if (this.playerList[0]){
		retData.winner = this.playerList[0].userId;
		//房间广播同步房间数据
		this.sendCPBroadcast("Result", retData );
	}else if (this.playerList[1]){
		retData.winner = this.playerList[1].userId;
		//房间广播同步房间数据
		this.sendCPBroadcast("Result", retData );
	}
	
	this.gameOver(gateWayObj, retData.winner );
	return true
}
