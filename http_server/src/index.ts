import { } from "./config"
import {errorCode} from "./error_code"
import UserManager from './manager/user';

let express = require("express");
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Max-Age', 2048000);
    res.header('Access-Control-Allow-Headers', "X-Requested-With,Content-Type");
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/api/hello', (_req, res) => {
    res.send('hello');
});

app.post('/api/user/getcard', (req, res) => {
    UserManager.getInst().GetUserCardList(req.body.userId).then(
        (result) => {
            if (result) {
                res.send({
                    err_code: 0,
                    cardList: result,
                });
            }
            else {
                res.send({
                    err_code: errorCode.INVALID_USERID
                });
            }
        }
    )
});

app.post('/api/user/getdeck', (req, res) => {
    UserManager.getInst().GetUserDeckList(req.body.userId).then(
        (result) => {
            if (result) {
                res.send({
                    err_code: 0,
                    deckList: result,
                });
            }
            else {
                res.send({
                    err_code: errorCode.INVALID_USERID
                });
            }
        }
    )
});

app.listen(3001);