let ALProtocol = module.exports

//对应后端接受接口
ALProtocol.Gac2GasFun = {};
ALProtocol.Gac2GasFun["DISCONNECT"] = "userQuit"; //玩家主动离开游戏
ALProtocol.Gac2GasFun["AWAY"] = "pauseGame"; //暂离游戏
ALProtocol.Gac2GasFun["RETURN"] = "continueGame"; //恢复游戏
ALProtocol.Gac2GasFun["TIMEOUT"] = "tickCallBack"; //定时器回调
