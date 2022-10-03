import * as express from "express";

import UserManager from '../manager/user';
import { errorCode } from "../error_code";
import LoginedUserRouter from './logined_user';

let router = express.Router();

router.post('/register', (req, res) => {
    if (req.body.userId.length < 6) {
        res.send({
            err_code: errorCode.INVALID_USERID,
            err_msg: "用户名需6位以上",
        });
        return;
    }

    if (req.body.userPassWord.length < 6) {
        res.send({
            err_code: errorCode.INVALID_USERPASSWORD,
            err_msg: "密码需6位以上",
        });
        return;
    }
    UserManager.getInst().RegisterUser(req.body.userId, req.body.userPassWord).then(
        () => {
            res.send({
                err_code: 0
            });
        }
    ).catch((error) => {
        if(error.code == 11000)
        {
            res.send({
                err_code: errorCode.USERID_EXISTED,
                err_msg: "用户名已存在",
            });
        }
        else
        {
            res.send({
                err_code: errorCode.UNKNOW_ERROR,
                err_msg: "未知错误",
            });
            console.log("RegisterUser fail", error);
        }
        
    })
});

router.post('/login', (req, res) => {
    UserManager.getInst().Login(req.body.userId, req.body.userPassWord).then(
        (result) => {
            if (result) {
                req.session.userId = req.body.userId;
                res.send({
                    err_code: 0,
                });
            }
            else {
                res.status(400).send({
                    err_code: errorCode.USERID_PASSWORD_ERROR,
                    err_msg: "用户名或密码错误",
                });
            }
        }
    ).catch((error) => {
        res.status(400).send({
            err_code: errorCode.USERID_PASSWORD_ERROR,
            err_msg: "用户名或密码错误",
        });
        console.log("RegisterUser fail", error);
    });
});

router.post('/user_info', (req, res) => {
    if (req.session.userId) {
        UserManager.getInst().GetUserInfo(req.session.userId).then(
            (result) => {
                if (result) {
                    res.send({
                        err_code: 0,
                        user_info: result,
                    });
                }
                else {
                    req.session.destroy((err)=>{console.log("req.session.destroy", req.session.userId, err);});
                    res.send({
                        err_code: errorCode.INVALID_USERID,
                        err_msg: "INVALID_USERID",
                    });
                }
            }
        ).catch((error) => {
            res.status(500).send({
                err_code: errorCode.UNKNOW_ERROR,
                err_msg: "未知错误",
            });
            console.error(error);
        });
    } else {
        res.status(400).send({
            err_code: errorCode.USER_NO_LOGINED,
            err_msg: "请先登录",
        });
    }
});

router.use("/", LoginedUserRouter);

export default router;