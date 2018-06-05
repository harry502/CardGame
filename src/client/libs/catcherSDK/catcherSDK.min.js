// [AIV_SHORT]  Build version: 0.1.1 - Sunday, May 6th, 2018, 5:22:31 PM  
 (function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CONFIG = {
    /** 进度上报 最小间隔 */
    progressGap: 1000,
    /** ws重建 最小间隔 */
    restartGap: 500,
};
exports.default = CONFIG;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *  CatcherSDK 调试版本;
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(__webpack_require__(0));
var sdkVersion = '0.1.1';
var SDKStatus;
(function (SDKStatus) {
    SDKStatus[SDKStatus["inited"] = 0] = "inited";
    SDKStatus[SDKStatus["Connecting"] = 1] = "Connecting";
    SDKStatus[SDKStatus["Connected"] = 2] = "Connected";
    SDKStatus[SDKStatus["Ready"] = 3] = "Ready";
    SDKStatus[SDKStatus["Break"] = 4] = "Break";
    SDKStatus[SDKStatus["Reconnected"] = 5] = "Reconnected";
    SDKStatus[SDKStatus["GameOver"] = 6] = "GameOver";
})(SDKStatus || (SDKStatus = {}));
var SDKProtocolType;
(function (SDKProtocolType) {
    /** 管理命令(ASCII 0) */
    SDKProtocolType[SDKProtocolType["Admin"] = 48] = "Admin";
    /** sdk 命令(ASCII 1) */
    SDKProtocolType[SDKProtocolType["SDKCmd"] = 49] = "SDKCmd";
    /** 透传命令(ASCII 2) */
    SDKProtocolType[SDKProtocolType["Forward"] = 50] = "Forward";
})(SDKProtocolType || (SDKProtocolType = {}));
var SDKGClientCommand;
(function (SDKGClientCommand) {
    /** GateWay发起强制玩家退出游戏(ASCII 0) */
    SDKGClientCommand[SDKGClientCommand["Login"] = 48] = "Login";
    /** GateWay发起强制玩家退出游戏(ASCII 1) */
    SDKGClientCommand[SDKGClientCommand["Reconnect"] = 49] = "Reconnect";
    /** GateWay发起强制玩家退出游戏(ASCII 2) */
    SDKGClientCommand[SDKGClientCommand["Logout"] = 50] = "Logout";
    /** 敌方读条信息(ASCII 6) */
    SDKGClientCommand[SDKGClientCommand["Progress"] = 54] = "Progress";
})(SDKGClientCommand || (SDKGClientCommand = {}));
var SDKGServerCommand;
(function (SDKGServerCommand) {
    /** GateWay发起强制玩家退出游戏(ASCII 3) */
    SDKGServerCommand[SDKGServerCommand["Kick"] = 51] = "Kick";
    /** GateWay发起强制玩家退出游戏(ASCII 4) */
    SDKGServerCommand[SDKGServerCommand["GameOver"] = 52] = "GameOver";
    /** GateWay发出游戏开始(ASCII 5) */
    SDKGServerCommand[SDKGServerCommand["Ready"] = 53] = "Ready";
    /** 敌方读条信息(ASCII 6) */
    SDKGServerCommand[SDKGServerCommand["PlayerProgress"] = 55] = "PlayerProgress";
})(SDKGServerCommand || (SDKGServerCommand = {}));
var ProgressState;
(function (ProgressState) {
    ProgressState[ProgressState["CONNECTED"] = 0] = "CONNECTED";
    ProgressState[ProgressState["PROGRESSING"] = 1] = "PROGRESSING";
    ProgressState[ProgressState["INITIALIZING"] = 2] = "INITIALIZING";
    ProgressState[ProgressState["COMPLETED"] = 3] = "COMPLETED";
    ProgressState[ProgressState["WAITING"] = 4] = "WAITING";
})(ProgressState = exports.ProgressState || (exports.ProgressState = {}));
var RpcHandler = /** @class */ (function () {
    function RpcHandler() {
        this.rtt = 0;
        this.cbMap = {};
        this.rpcId = Math.floor(Math.random() * 1000000);
    }
    RpcHandler.prototype.newRpc = function (cb) {
        var rpcId = this.rpcId;
        this.cbMap[rpcId] = [cb, new Date()];
        this.rpcId++;
        return rpcId;
    };
    RpcHandler.prototype.atRpc = function (id, resp) {
        var cb = this.cbMap[id];
        delete this.cbMap[id];
        if (cb) {
            var rtt = (cb[1].valueOf() - (new Date()).valueOf()) / 2;
            this.rtt = (this.rtt + rtt) / 2;
            return cb[0](resp);
        }
    };
    Object.defineProperty(RpcHandler.prototype, "rpcRTT", {
        get: function () {
            return this.rtt;
        },
        enumerable: true,
        configurable: true
    });
    return RpcHandler;
}());
exports.log = {
    debug: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.debug.apply(console, args);
    },
    error: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, args);
    }
};
var CatcherSDKLocal = /** @class */ (function () {
    function CatcherSDKLocal(cfg) {
        this.packageCounter = 0;
        this.status = SDKStatus.inited;
        this.lastUpdateTime = 0;
        this.cfg = {
            url: cfg.url,
            gameVersion: cfg.gameVersion,
            gameId: cfg.gameId,
            messageType: cfg.messageType || 'JSON',
            accountToken: cfg.accountToken || this.bigRandom(),
            matchTicket: cfg.matchTicket || '',
            sdkVersion: cfg.sdkVersion || sdkVersion,
            isSuper: cfg.isSuper || false,
        };
        this.retryCount = 0;
        this.handlers = {};
        this.rpcHandler = new RpcHandler();
    }
    CatcherSDKLocal.instance = function () {
        if (!this._instance) {
            throw "Catcher SDK not initialized!";
        }
        return this._instance;
    };
    CatcherSDKLocal.init = function (cfg) {
        /*
        if (this._instance) {
            throw "Catcher SDK initialized!";
        }
        */
        this._instance = new this(cfg);
        return this._instance;
    };
    CatcherSDKLocal.prototype.start = function () {
        var _this = this;
        this.wsc = new WebSocket(this.cfg.url);
        this.wsc.binaryType = 'arraybuffer';
        this.wsc.addEventListener('close', function (e) { return _this.onClose(e); });
        this.wsc.addEventListener('message', function (e) { return _this.onMessage(e); });
        this.wsc.addEventListener('error', function (_e) { return _this.onError(); });
        this.wsc.addEventListener('open', function (e) { return _this.onOpen(e); });
        this.status = SDKStatus.Connecting;
    };
    CatcherSDKLocal.prototype.end = function () {
        var _this = this;
        if (this.status === SDKStatus.Ready) {
            this.status = SDKStatus.GameOver;
            return this.logout().then(function () {
                if (_this.wsc && _this.wsc.readyState === WebSocket.CONNECTING) {
                    _this.wsc.close();
                }
                return;
            });
        }
        return Promise.resolve();
    };
    CatcherSDKLocal.prototype.on = function (e, cb) {
        if (this.handlers[e] === undefined) {
            this.handlers[e] = [];
        }
        this.handlers[e].push(cb);
        return this;
    };
    CatcherSDKLocal.prototype.sendJson = function (json) {
        var data = '2' + JSON.stringify(json);
        this._send(data);
    };
    CatcherSDKLocal.prototype.sendData = function (data) {
        if (data instanceof ArrayBuffer) {
            this._send(this.buildPackage(data));
        }
        else if (this.isArrayBufferView(data)) {
            this._send(this.buildPackage(data.buffer));
        }
        else if (typeof data === 'string') {
            data = String.fromCharCode(SDKProtocolType.Forward) + data;
            this._send(data);
        }
        else {
            var jsonStr = JSON.stringify(data);
            jsonStr = String.fromCharCode(SDKProtocolType.Forward) + jsonStr;
            this._send(jsonStr);
        }
    };
    Object.defineProperty(CatcherSDKLocal.prototype, "serverTimeDiff", {
        get: function () {
            return this.timeDiff - this.rpcHandler.rpcRTT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatcherSDKLocal.prototype, "gameInfo", {
        get: function () {
            return this._gameInfo;
        },
        enumerable: true,
        configurable: true
    });
    CatcherSDKLocal.prototype.updateProgress = function (state, rate) {
        switch (this.status) {
            case SDKStatus.inited:
            case SDKStatus.Connecting:
                this.unsentProgress = { rate: rate, state: state };
                break;
            case SDKStatus.Connected:
                if (this._gameInfo) {
                    this.progress = { rate: rate, state: state };
                    this.debounceReportProgress();
                }
                break;
            default:
                break;
        }
    };
    CatcherSDKLocal.prototype.debounceReportProgress = function () {
        var _this = this;
        exports.log.debug(this.progress);
        if (this.progressTimer)
            return;
        var gap = Date.now() - this.lastUpdateTime;
        if (gap < config_1.default.progressGap) {
            this.progressTimer = setTimeout(function () {
                _this.progressTimer = null;
                _this._updateProgress();
            }, config_1.default.progressGap - gap);
            return;
        }
        this._updateProgress();
    };
    CatcherSDKLocal.prototype._updateProgress = function () {
        this.lastUpdateTime = Date.now();
        var progress = __assign({}, this.progress, { openId: this._gameInfo.userInfo.openId });
        exports.log.debug('updateProgress', progress);
        this.cmdRPC(SDKGClientCommand.Progress, progress, function (f) { return f; });
    };
    CatcherSDKLocal.prototype.onClose = function (e) {
        if (this.status === SDKStatus.GameOver) {
            return;
        }
        exports.log.error("connection closed! " + e.code + "/" + e.reason);
        this.onError();
    };
    CatcherSDKLocal.prototype.onMessage = function (e) {
        /*
            命令
            +------------+-----------+---------------+
            | 8bits Type | 8bits cmd |  header       |
            +------------+-----------+---------------+
            透传
            +------------+-----------+---------------+
            | 8bits Type |        payload            |
            +------------+-----------+---------------+
        */
        var data = e.data;
        if (data instanceof ArrayBuffer) {
            this.onArrayBufferMessage(data);
        }
        else if (typeof data === 'string') {
            this.onTextMessage(data);
        }
        else {
            exports.log.error("not support data type: " + data);
        }
    };
    CatcherSDKLocal.prototype.onArrayBufferMessage = function (data) {
        try {
            var abv = new Uint8Array(data);
            var type = abv[0];
            // 只有用户透传数据才有可能是 binary
            if (type == SDKProtocolType.Forward) {
                this.packageCounter++;
                var body = data.slice(1);
                if (this.cfg.messageType === "JSON") {
                    var jsonStr = Utf8ArrayToStr(body);
                    console.log(body, jsonStr);
                    var data_1 = JSON.parse(jsonStr);
                    this.emit('MESSAGE', { data: data_1 });
                }
                else if (this.cfg.messageType === 'STRING') {
                    var data_2 = Utf8ArrayToStr(body);
                    this.emit('MESSAGE', { data: data_2 });
                }
                else {
                    this.emit('MESSAGE', { data: body });
                }
                return;
            }
            exports.log.error("type: " + type + ", \u800C\u6B64\u5904\u5FC5\u987B\u662F Forward");
        }
        catch (error) {
            // TODO Error process
            exports.log.error(error);
        }
    };
    CatcherSDKLocal.prototype.onTextMessage = function (data) {
        try {
            var type = data.charCodeAt(0);
            if (type == SDKProtocolType.SDKCmd) {
                var cmd = data.charCodeAt(1);
                var body = JSON.parse(data.slice(2));
                this.processCommand(cmd, body);
                return;
            }
            else if (type == SDKProtocolType.Forward) {
                if (this.status !== SDKStatus.Ready) {
                    throw "处于非 Ready 状态时接受到 Forward 指令";
                }
                this.packageCounter++;
                var body = data.slice(1);
                if (this.cfg.messageType === "JSON") {
                    body = JSON.parse(body);
                }
                this.emit('MESSAGE', { data: body });
                return;
            }
        }
        catch (error) {
            // TODO Error process
            exports.log.error(error);
        }
    };
    /** 当 websocket error 时尝试重连，有 重连次数 与 最小间隔时间 限制 */
    CatcherSDKLocal.prototype.onError = function () {
        var _this = this;
        if (this.retryCount >= 3) {
            this.emit('ERROR', { code: -1, reason: 'websocket 断开后无法重建' });
            this.status = SDKStatus.GameOver;
            return;
        }
        if (this.restartTimer) {
            return;
        }
        var gap = Date.now() - this.lastRetryTime;
        if (gap < config_1.default.restartGap) {
            this.restartTimer = setTimeout(function () {
                _this.restartTimer = null;
                _this.restartWebsocket();
            }, config_1.default.restartGap - gap);
            return;
        }
        this.restartWebsocket();
    };
    CatcherSDKLocal.prototype.restartWebsocket = function () {
        /** gameover 状态触发 ws error, 不需重建 ws */
        if (this.status === SDKStatus.GameOver) {
            return;
        }
        this.lastRetryTime = Date.now();
        this.retryCount++;
        switch (this.status) {
            case SDKStatus.Connecting: {
                exports.log.debug('connecting failed!');
                break;
            }
            case SDKStatus.Connected: {
                exports.log.debug('connection losed!');
                this.status = SDKStatus.Connecting;
                break;
            }
            case SDKStatus.Ready: {
                exports.log.debug('game connection losed!');
                this.status = SDKStatus.Break;
                this.emit('BREAK', {});
                break;
            }
            case SDKStatus.Break: {
                exports.log.debug('break connecting losed!');
                break;
            }
            case SDKStatus.Reconnected: {
                exports.log.debug('break connection losed!');
                this.status = SDKStatus.Break;
                break;
            }
            default: {
                exports.log.error("error: never reach!");
            }
        }
        // 协议错误
        if (this.wsc.readyState === WebSocket.CONNECTING) {
            this.wsc.close();
        }
        this.start();
    };
    CatcherSDKLocal.prototype.onOpen = function (_e) {
        switch (this.status) {
            case SDKStatus.Connecting: {
                exports.log.debug("websocket connected!");
                this.status = SDKStatus.Connected;
                this.connnect();
                break;
            }
            case SDKStatus.Break: {
                exports.log.debug("websocket connected on break!");
                this.status = SDKStatus.Reconnected;
                this.reconnect();
                break;
            }
            default: {
                exports.log.error("onOpen: never reach!");
            }
        }
    };
    CatcherSDKLocal.prototype.emit = function (k, e) {
        var handlerList = this.handlers[k];
        if (handlerList) {
            try {
                for (var _i = 0, _a = handlerList; _i < _a.length; _i++) {
                    var cb = _a[_i];
                    cb(e);
                }
            }
            catch (err) {
                exports.log.error(err);
            }
        }
    };
    CatcherSDKLocal.prototype.connnect = function () {
        var _this = this;
        var req = {
            token: this.cfg.accountToken,
            game_version: this.cfg.gameVersion,
            sdk_version: this.cfg.sdkVersion,
            is_super: this.cfg.isSuper,
        };
        this.cmdRPC(SDKGClientCommand.Login, req, function (body) {
            if (body.code === 0) {
                _this.gameToken = body.token;
                _this._gameInfo = body.match_info;
                if (_this.unsentProgress) {
                    _this.updateProgress(_this.unsentProgress.state, _this.unsentProgress.rate);
                    _this.unsentProgress = undefined;
                }
                _this.retryCount = 0;
                exports.log.debug('CONNECT', _this._gameInfo);
                _this.emit('CONNECT', _this._gameInfo);
            }
            else {
                _this.onConnectionRefused(body);
            }
        });
    };
    CatcherSDKLocal.prototype.reconnect = function () {
        var _this = this;
        var req = {
            token: this.gameToken,
            recvnumber: this.packageCounter,
            game_version: this.cfg.gameVersion,
            sdk_version: this.cfg
        };
        this.cmdRPC(SDKGClientCommand.Reconnect, req, function (body) {
            if (body.code === 0) {
                _this.retryCount = 0;
                _this.status = SDKStatus.Ready;
                _this.emit('CONTINUE', _this._gameInfo);
            }
            else {
                _this.onConnectionRefused(body);
            }
        });
    };
    CatcherSDKLocal.prototype.onConnectionRefused = function (body) {
        exports.log.error("on protocol error: " + body.code + "/" + JSON.stringify(body));
        this.emit('ERROR', { code: body.code, reason: '登录 / 重登 GateWay 失败' });
        this.status = SDKStatus.GameOver;
        this.wsc.close();
    };
    CatcherSDKLocal.prototype.logout = function () {
        var _this = this;
        var req = {};
        exports.log.debug('logout start');
        return new Promise(function (resolve, _reject) {
            _this.cmdRPC(SDKGClientCommand.Logout, req, function () {
                exports.log.debug("logout succ");
                resolve();
            });
        });
    };
    CatcherSDKLocal.prototype.cmdRPC = function (cmd, request, cb) {
        var id = this.rpcHandler.newRpc(cb);
        request.msgId = id;
        var data = '1' + String.fromCharCode(cmd) + JSON.stringify(request);
        this._send(data);
    };
    CatcherSDKLocal.prototype.cmdResp = function (cmd, code, req) {
        var resp = { code: code, msgId: req.msgId };
        var data = '1' + String.fromCharCode(cmd) + JSON.stringify(resp);
        this._send(data);
    };
    CatcherSDKLocal.prototype.processCommand = function (cmd, body) {
        if (body.timestamp) {
            this.updateTimeDiff(body.timestamp);
        }
        try {
            switch (cmd) {
                case SDKGServerCommand.GameOver: {
                    this.emit('GAMEOVER', { code: 0, groupResult: body.groupResult });
                    this.cmdResp(SDKGServerCommand.GameOver, 0, body);
                    this.status = SDKStatus.GameOver;
                    this.wsc.close();
                    break;
                }
                case SDKGServerCommand.Kick: {
                    this.emit('KICK', { code: 0, reason: 'from server' });
                    this.cmdResp(SDKGServerCommand.Kick, 0, body);
                    this.status = SDKStatus.GameOver;
                    this.wsc.close();
                    break;
                }
                case SDKGServerCommand.Ready: {
                    if (this.status !== SDKStatus.Connected) {
                        throw "在非 Connected 状态受到 Ready 指令";
                    }
                    this.emit('READY', { code: 0, reason: 'from server' });
                    this.status = SDKStatus.Ready;
                    break;
                }
                case SDKGServerCommand.PlayerProgress: {
                    if (this.status !== SDKStatus.Connected) {
                        throw "在非 Connected 状态受到 Progress 指令";
                    }
                    this.emit('PROGRESS', {
                        openId: body.openId,
                        rate: body.rate,
                        state: body.state,
                    });
                    break;
                }
                case SDKGClientCommand.Login:
                case SDKGClientCommand.Logout:
                case SDKGClientCommand.Reconnect: {
                    exports.log.debug("Server Response: ", body);
                    var cbid = body.msgId;
                    if (cbid) {
                        this.rpcHandler.atRpc(cbid, body);
                    }
                    break;
                }
                default:
                    throw "Unknown Command " + cmd;
            }
        }
        catch (error) {
            exports.log.error(error);
        }
    };
    CatcherSDKLocal.prototype.bigRandom = function () {
        var out = [];
        for (var i = 0; i < 4; i++) {
            var i_1 = Math.floor(Math.random() * 10000);
            out.push(i_1.toString());
        }
        return out.join('-');
    };
    CatcherSDKLocal.prototype.updateTimeDiff = function (ts) {
        var now = new Date().valueOf();
        var timeDiff = (now - ts) / 2;
        if (!this.timeDiff) {
            this.timeDiff = timeDiff;
        }
        else {
            this.timeDiff = (this.timeDiff + timeDiff) / 2;
        }
    };
    CatcherSDKLocal.prototype._send = function (data) {
        if (this.wsc.readyState !== this.wsc.OPEN) {
            exports.log.error("WebSocket is already in CLOSING or CLOSED state.");
            return;
        }
        try {
            this.wsc.send(data);
        }
        catch (error) {
            exports.log.error("send error", error);
        }
    };
    CatcherSDKLocal.prototype.isArrayBufferView = function (value) {
        return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
    };
    CatcherSDKLocal.prototype.buildPackage = function (buffer) {
        var bv = new Uint8Array(buffer.byteLength + 1);
        bv[0] = SDKProtocolType.Forward;
        bv.set(new Uint8Array(buffer), 1);
        return bv;
    };
    CatcherSDKLocal.ProgressState = ProgressState;
    return CatcherSDKLocal;
}());
function Utf8ArrayToStr(arraybuffer) {
    if (!!window['TextDecoder']) {
        console.log('has TextDecoder');
        return new TextDecoder('utf8').decode(arraybuffer);
    }
    var array = new Uint8Array(arraybuffer);
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
exports.CatcherSDK = CatcherSDKLocal;
window['ALISDK'] = { CatcherSDK: exports.CatcherSDK };


/***/ })
/******/ ]))); 