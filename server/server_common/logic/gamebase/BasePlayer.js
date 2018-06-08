
// 玩家对象
var basePlayer = function( roomId, userId, isRobot){
	this.roomId = roomId;
	this.userId = userId;
	this.isRobot = (isRobot==undefined) ? 0 : isRobot;//0不是1是
	//console.log(roomId, userId);
}

module.exports = basePlayer;
