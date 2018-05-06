class GameInfo
{
    private static inst: GameInfo;
    public static getInst() {
        if (GameInfo.inst == null) {
            GameInfo.inst = new GameInfo();
        }
        return GameInfo.inst;
    }
    private constructor() {}

    selfGroupId: number = -1; //0为p1, 1为p2
    selfUserId: string = "";
    selfUserName: string = "";
    selfUserIcon: string = "";
    rivalGroupId: number = -1;
    rivalUserId: string = "";
    rivalUserName: string = "";
    rivalUserIcon: string = "";
}

interface ServerMsg {
    function: string;
    param: any;
}

interface SMP_StartGame {
    StartUserId:string
}

class BattleConnect
{
	private isGameReady: boolean = false;
    private static inst: BattleConnect;
    private Control:BattleViewControl;

    public static getInst() {
        if (BattleConnect.inst == null) {
            BattleConnect.inst = new BattleConnect();
        }
        return BattleConnect.inst;
    }

    public constructor()
    {
        this.init();
        this.bind();
    }

    public bindBattleView(Control:BattleViewControl)
    {
        this.Control = Control;
    }

    public bind():void
    {	
        let self = this;
        ALISDK.CatcherSDK.instance()
            .on('CONNECT', (e) => {
                console.log("onConnect", e);
                for (let userInfo of e.playerList) {
                    if (userInfo.groupId === e.userInfo.groupId) {
                        GameInfo.getInst().selfGroupId = userInfo.groupId;
                        GameInfo.getInst().selfUserId = userInfo.openId;
                        GameInfo.getInst().selfUserName = userInfo.nickname;
                        GameInfo.getInst().selfUserIcon = userInfo.avatarUrl;
                    } else {
                        GameInfo.getInst().rivalGroupId = userInfo.groupId;
                        GameInfo.getInst().rivalUserId = userInfo.openId;
                        GameInfo.getInst().rivalUserName = userInfo.nickname;
                        GameInfo.getInst().rivalUserIcon = userInfo.avatarUrl;
                    }
                }
            })
            .on('READY', (_e) => {
            })
            .on('KICK', () => {
            })
            .on('GAMEOVER', (e) => {
                console.log("onResult", e);
            })
            .on('BREAK', () => {
            })
            .on('CONTINUE', () => {
            })
            .on('ERROR', () => {
            })
            .on('MIC_CHANGE',()=>{
			})
            .on('AUDIO_CHANGE',()=>{
            })
            .on('MESSAGE', (msg) => {
                let sm = msg.data as ServerMsg ;

                switch (sm.function) {
                    case "StartGame":
                        let gameInfo = sm.param as SMP_StartGame;
                        self.isGameReady = true;
                        GameViewControl.getInst().LoadView(ViewList.battle);
                        this.Control.StartGame(gameInfo.StartUserId);
                        break;
                    case "Enemysummon":
                        this.Control.Enemysummon(sm.param.Block_num,sm.param.CardId);
                        break;
                    case "EnemyNextTurn":
                        this.Control.EnemyNextTurn();
                        break;
                    case "Result":
                        this.Control.Result(sm.param.winner);
                        break;
                    default:
                        break;
                }
            });
    }

    public getisGameReady():boolean
    {
        return this.isGameReady;
    }

    public start():void
    {
        ALISDK.CatcherSDK.instance().start();
        ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.COMPLETED);
    }

    public end():void
    {
        ALISDK.CatcherSDK.instance().end();
    }

    public init()
    {
        var URL = RES.getRes("netconfig_json");
        ALISDK.CatcherSDK.init({
            url: URL.url,
            gameId: '1231231',
            gameVersion: "0.0.1",
        });
    }
}