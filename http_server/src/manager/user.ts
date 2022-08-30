import { mongocfg } from '../config';
import MongoDb from '../mongo';

type CardItem = {
    cardId: number,
    cardNum: number
}

type UserInfo = {
    userId: string,
    userPassWord: string,
    userName: string,
    deckList: CardItem[],
    cardList: CardItem[],
    level: number,
    gameNumber: number
};

export default class UserManager {
    private static inst: UserManager;
    private db: MongoDb;
    constructor() {
        this.db = new MongoDb(mongocfg.url, mongocfg.dbName);
        this.db.createTable(mongocfg.userTableName).catch((_err) => {
            console.log("table already exists");
        });
    }
    public static getInst():UserManager {
        if (UserManager.inst == null) {
            UserManager.inst = new UserManager();
        }
        return UserManager.inst;
    }

    public async UpdateUser(user: UserInfo) {
        return this.db.update(mongocfg.userTableName, {userId: user.userId}, user);
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
}