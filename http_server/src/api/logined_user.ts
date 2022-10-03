import * as express from "express";

import UserManager from '../manager/user';
import { errorCode } from "../error_code";

let router = express.Router();

router.use( (req,res,next) =>{
    if(req.session.userId){
        next();
    }else{
        res.status(400).send({
            err_code: errorCode.USER_NO_LOGINED,
            err_msg: "请先登录",
        });
    }
});

router.post('/update_user_name', (req, res) => {

    UserManager.getInst().UpdateUser(req.session.userId!, {
        userName: req.body.userName
    }).then(
        (result) => {
            if(result.matchedCount == 1)
            {
                res.status(200).send({
                    err_code: 0
                });
            }
            else
            {
                res.status(500).send({
                    err_code: errorCode.UNKNOW_ERROR,
                    err_msg: "未知错误",
                });
                console.log(result);
            }
        }
    ).catch((error) => {
        res.status(500).send({
            err_code: errorCode.UNKNOW_ERROR,
            err_msg: "未知错误",
        });
        console.error(error);
    });
});

export default router;