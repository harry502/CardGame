var alProtocol = require('./protocol/ALProtocol');
var logicMgr = require('./logic/gamebase/LogicMgr');

const OK = 0;
const STOP = 1;

let GAPI = global.GAPI;

function getUser(state, id) {
    return state.users.find((x) => x.openId == id);
}

function init(matchId, users) {
    console.log("game inited!");
    let state = {
        matchId: matchId,
        users: users
    };
    return [OK, state];
}

function start(state) {
    console.log("game start!");
    
    //创建逻辑对象
    var logicObj = new logicMgr(state.matchId, state.users);
    logicObj.startGame(state);
    state.logicObj = logicObj;
    /*state.users.forEach((x) => {
        x.conn.sendJson({
            "message": "hello ~~!"
        });
    })*/
    return [OK, state];
}

//客户端发起的请求
function handle_message(message, from, state) {
    console.log("game handle message!", message);
    //console.log("game handle from!", from);
    //console.log("game handle state!", state);

    var logicObj = state.logicObj;
    var sFunction = message["function"];
    var params = message["params"];
    if (typeof logicObj[sFunction] === 'function'){
        logicObj[sFunction]( state, from, params);
    }else{
        console.warn("CP自定义函数未定义:",sFunction);
    }
    if (logicObj.bGameOver){
        return [STOP, state];
    }else{
        return [OK, state];
    }
}

//gateway推送来的请求
function handle_command(data, state) {
    console.log("game handle command!",data.cmd);
    var sFunction = alProtocol.Gac2GasFun[data.cmd];
    if (sFunction == null){
        console.warn("Gac2Gas接收协议的函数未定义，cmd：", data.cmd);
        return [STOP, state];
    }

    var logicObj = state.logicObj;
    if (typeof logicObj[sFunction] === 'function'){
        if (data.cmd == "TIMEOUT"){
            logicObj[sFunction]( state, data.ctx )
            if (logicObj.bGameOver){
                return [STOP, state];
            }
        }else{
            logicObj[sFunction]( state, data.openIds );
        }
        if (data.cmd == "DISCONNECT"){
            return [STOP, state];
        }
    }else{
        console.warn("函数未定义:",sFunction);
        return [STOP, state];
    }

    return [OK, state];
}

//结束游戏
function terminate(reason, state){
    console.log("terminate:",reason);
    //console.log("terminate:state:",state);

    var retData = {};
    var groupResult = [];
    var groupData = {};
    var logicObj = state.logicObj;

    if (logicObj == undefined){
        state.users.forEach((user) => {
            groupData = {};
            groupData.groupId = user.groupId;
            groupData.result = 0;//-1表示负,0表示平,1表示胜
            groupResult.push(groupData);
        })
        retData.groupResult = groupResult;
        return retData;
    }
    //console.log("terminate:logicObj:",logicObj);
  
    switch(reason){
        case "EMPTY_GAME"://玩家全部离开，游戏逻辑没有在规定时间关闭游戏, 或者游戏开始前， 玩家没有入场
            logicObj.gameOverByGateWay(state);
            break;
        case "NORMAL"://正常结束游戏
            logicObj.gameOver(state);
            break;
        case "SYSTEM"://系统错误导致的关闭游戏   
            logicObj.gameOverByGateWay(state);
            break;
        case "ADMIN":// 管理员关闭游戏
            logicObj.gameOver(state);
            break;
    }

    if (logicObj.winnerGroupID != undefined){
        state.users.forEach((user) => {
            groupData = {};
            groupData.groupId = user.groupId;
            if(user.groupId == logicObj.winnerGroupID){
                groupData.result = 1;//-1表示负,0表示平,1表示胜
            }else{
                groupData.result = -1;//-1表示负,0表示平,1表示胜
            }
            groupResult.push(groupData);
        })

    }else{
        state.users.forEach((user) => {
            groupData = {};
            groupData.groupId = user.groupId;
            groupData.result = 0;//-1表示负,0表示平,1表示胜
            groupResult.push(groupData);
        })
    }
    retData.groupResult = groupResult;
    return retData;
}

module.exports = {
    init: init,
    start: start,
    handle_command: handle_command,
    handle_message: handle_message,
    terminate: terminate,
}
