import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from 'express-session';

import { } from "./config";
import APIRouter from "./api/api";

declare module 'express-session' {
    interface SessionData {
        userId: string;
    }
}

// process.on("unhandledRejection", rej => console.warn('全局捕获Rejection', rej));
// process.on("uncaughtException", error => console.warn('全局捕获Exception', error));

let app = express();

app.use(bodyParser.json());
app.use(cookieParser('express_cookie'));
app.use(session({
    secret: 'express_cookie',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 }//过期时间
}));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Max-Age', "2048000");
    res.header('Access-Control-Allow-Headers', "X-Requested-With,Content-Type");
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use(function (err, _req, res, _next) {
    console.warn('错误处理中间捕获Exception', err);
    res.status(500).send("内部错误");
});

app.use("/api", APIRouter);

app.listen(3001);