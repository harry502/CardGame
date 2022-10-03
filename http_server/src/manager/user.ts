import { mongocfg, MD5_SUFFIX, default_card_list } from '../config';
import MongoDb from '../mongo';
import * as crypto from 'crypto'

type CardItem = {
    cardId: number,
    cardNum: number
}

export type UserInfo = {
    userId: string,
    userPassWordMD5: string,
    userName: string,
    deckList: CardItem[],
    cardList: CardItem[],
    level: number,
    gameNumber: number,
    coins: number
};

let md5 = function (pwd) {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex')
};

export default class UserManager {
    private static inst: UserManager;
    private db: MongoDb;
    constructor() {
        this.db = new MongoDb(mongocfg.url, mongocfg.dbName);
        this.db.createTable(mongocfg.userTableName).catch((_err) => {
            console.log("table already exists");
        });
        this.db.createIndex(mongocfg.userTableName, {userId: 1}, true).catch((_err) => {
            console.log("table index already exists");
        });
    }
    public static getInst():UserManager {
        if (UserManager.inst == null) {
            UserManager.inst = new UserManager();
        }
        return UserManager.inst;
    }

    public async UpdateUser(userId: string, user: any) {
        return this.db.update(mongocfg.userTableName, {userId: userId}, user);
    }

    public async GetUserInfo(userId: string) {
        let findResult:UserInfo[] = await this.db.find(mongocfg.userTableName, {userId: userId});
        if(findResult.length >= 1)
        {
            let ans = findResult[0];
            return {
                userName: ans.userName,
                deckList: ans.deckList,
                cardList: ans.cardList,
                level: ans.level,
                gameNumber: ans.gameNumber
            };
        }
        return null;
    }

    public async GetUserDeckList(userId: string) {
        let findResult:UserInfo[] = await this.db.find(mongocfg.userTableName, {userId: userId});
        if(findResult.length >= 1)
        {
            return findResult[0].deckList;
        }
        return null;
    }

    public async GetUserCardList(userId: string) {
        let findResult:UserInfo[] = await this.db.find(mongocfg.userTableName, {userId: userId});
        if(findResult.length >= 1)
        {
            return findResult[0].cardList;
        }
        return null;
    }
    
    public async RegisterUser(userId: string, userPassWord: string) {
        let user = {
            userId: userId,
            userPassWordMD5: md5(userPassWord + MD5_SUFFIX),
            userName: "",
            deckList: default_card_list,
            cardList: default_card_list,
            level: 1,
            gameNumber: 0,
            coins: 500
        }

        return this.db.insert(mongocfg.userTableName, [user]);
    }

    public async Login(userId: string, userPassWord: string) {
        let findResult:UserInfo[] = await this.db.find(mongocfg.userTableName, {userId: userId});
        if(findResult.length >= 1)
        {
            if(md5(userPassWord + MD5_SUFFIX) == findResult[0].userPassWordMD5)
            {
                return true;
            }
        }
        return false;
    }
}