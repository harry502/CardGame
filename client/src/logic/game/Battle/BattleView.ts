enum Playerstatus
{
    MyTurn = 0,
    Battle = 1,
    EnemyTurn = 2,
    Stop = 3,
    End = 4
}



class BattleView extends core.UIView {

    //UI界面组件
    private GameGroup:eui.Group;
    private Enemy_block_1:eui.Image;
    private Enemy_block_2:eui.Image;
    private Enemy_block_3:eui.Image;
    private My_block_1:eui.Image;
    private My_block_2:eui.Image;
    private My_block_3:eui.Image;
    private MyCardNum:eui.Label;
    private MyHandNum:eui.Label;
    private MyHP:eui.Label;
    private MyPower:eui.Label;
    private EnemyCardNum:eui.Label;
    private EnemyHandNum:eui.Label;
    private EnemyHP:eui.Label;
    private EnemyPower:eui.Label;
    private MyTimeGroup:eui.Group;
    private MyTime:eui.Label;
    private EnemyTimeGroup:eui.Group;
    private EnemyTime:eui.Label;
    private ShowCard:CardView;
    private MyBattleBox:eui.Group;
    private EnemyBattleBox:eui.Group;
    private Tishi:eui.Label;
    private TishiGroup:eui.Group;
    private ExitTurnGroup:eui.Group;
    private HandCardBox:eui.Group;

    //游戏相关数据
    private PlayTurn:number;
    private CanTouch:boolean;
    private MyBattleCard:CardView[] = new Array<CardView>(3);
    private EnemyBattleCard:CardView[] = new Array<CardView>(3);
    private HandCard:CardView[] = new Array<CardView>();
    private Mystatus:Playerstatus;
    private Timer:egret.Timer;
    private MyBlocks:eui.Image[] = new Array<eui.Image>();


	public constructor() {
		super("resource/skins/BattleSkin.exml");
	}

    public open()
	{
		this.addAllListener();
        this.init();
        this.Mystatus = Playerstatus.Stop;

        this.Timer = new egret.Timer(1000,60);
        this.Timer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.MyTime.text = String( Number(this.MyTime.text) - 1 );
            this.EnemyTime.text = String( Number(this.EnemyTime.text) - 1 );
        },this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            if(this.Mystatus == Playerstatus.MyTurn)
            {
                this.MyBattleTurn();
            }
        },this);

        while(this.HandCard.length < Config.StartHandNum)
        {
            this.DrawCard();
        }
	}

	public destroy()
	{
		
	}

    private addAllListener()
	{
        this.ExitTurnGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
            if(this.Mystatus == Playerstatus.MyTurn)
            {
                this.MyBattleTurn();
            }
        },this)
	}

    private init()
    {
        this.MyBlocks.push(this.My_block_1);
        this.MyBlocks.push(this.My_block_2);
        this.MyBlocks.push(this.My_block_3);
        this.MyHP.text = String(Config.MaxHP);
        this.MyHandNum.text = "0";
        this.MyCardNum.text = String(Config.MaxDeckNum);
        this.EnemyHP.text = String(Config.MaxHP);
        this.EnemyHandNum.text = String(Config.StartHandNum);
        this.EnemyCardNum.text = String(Config.MaxDeckNum - Config.StartHandNum);
    }

    private addHandListener(cardView:CardView)
    {
        cardView.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
            this.ChangeShowCard(cardView.Card.CardId);
            this.GameGroup.removeChild(cardView);
            this.GameGroup.addChild(cardView);
        },this);
        cardView.addEventListener(egret.TouchEvent.TOUCH_MOVE,(evt:egret.TouchEvent)=>{
            if(cardView.CanTouch && this.Mystatus == Playerstatus.MyTurn)
            {
                cardView.x=evt.stageX - cardView.width/2;
                cardView.y=evt.stageY - cardView.height/2;
            }
        },this);
        cardView.addEventListener(egret.TouchEvent.TOUCH_END,(evt:egret.TouchEvent)=>{
            if(cardView.CanTouch == false || this.Mystatus != Playerstatus.MyTurn)
            {
                return;
            }

            for(let i = 0; i<this.MyBlocks.length; i++)
            {
                if(this.MyBlocks[i].hitTestPoint(evt.stageX,evt.stageY) && this.MyBattleCard[i] == null)
                {
                    if(this.UsePower("Me",cardView.Card.Rank) == false)
                    {
                        this.TishiGroup.visible = true;
                        this.Tishi.text = "能量不足";
                        this.Mystatus = Playerstatus.Stop;
                        egret.setTimeout(()=>{
                            this.TishiGroup.visible = false;
                            this.Mystatus = Playerstatus.MyTurn;
                        },this,1000);
                        break;
                    }

                    cardView.CanTouch = false;
                    var pos = this.MyBattleBox.localToGlobal(this.MyBlocks[i].x,this.MyBlocks[i].y);
                    cardView.x = pos.x;
                    cardView.y = pos.y;
                    this.MyBattleCard[i] = cardView;
                    this.HandCard.splice(this.HandCard.indexOf(cardView),1);

                    //网络请求，召唤卡片
                    var data = {};
                    data["Block_num"] = i;
                    data["CardId"] = cardView.Card.CardId;
                    ALISDK.CatcherSDK.instance().sendJson({function:"summonCard",params:data});
                }
            }

            this.UpdateHandCard();
        },this);
    }

    public StartGame(player:"Me"|"Enemy")
    {
        if(player == "Me")
        {
            this.TishiGroup.visible = true;
            this.Tishi.text = "您是先手";
            this.MyTimeGroup.visible = true;
            this.EnemyTimeGroup.visible = false;

            egret.setTimeout(()=>{
                this.TishiGroup.visible = false;
                this.Mystatus = Playerstatus.MyTurn;
                this.AddPower("Me");
                this.DrawCard();
                this.Timer.start();
            },this,3000)
        }
        else
        {
            this.TishiGroup.visible = true;
            this.Tishi.text = "您是后手";
            this.MyTimeGroup.visible = false;
            this.EnemyTimeGroup.visible = true;
            this.ExitTurnGroup.visible = false;

            egret.setTimeout(()=>{
                this.TishiGroup.visible = false;
                this.Mystatus = Playerstatus.EnemyTurn;
                this.AddPower("Enemy");
                this.MyCardNum.text = String( Number(this.MyCardNum.text) - 1 );
                this.MyHandNum.text = String(Config.StartHandNum + 1);
                this.Timer.start();
            },this,3000)
        }
    }

    private UpdateHandCard()
    {
        var tmpx = this.HandCardBox.x;
        var tmpy = this.HandCardBox.y;

        for(let i=0; i<this.HandCard.length; i++)
        {
            this.HandCard[i].x = tmpx;
            this.HandCard[i].y = tmpy;
            tmpx += Config.Cardwidth + Config.HandDistance;
        }
    }

    private DrawCard()
    {
        if(this.HandCard.length<5)
        {
            var card = new CardView();
            this.GameGroup.addChild(card);
            this.addHandListener(card);
            card.init( Math.floor(Math.random() * Cardinfo.getInst().GetCardslength()) );
            this.HandCard.push(card);
            this.UpdateHandCard();
            this.MyCardNum.text = String( Number(this.MyCardNum.text) - 1 );
            this.MyHandNum.text = String(this.HandCard.length);
        }
    }

    private addStandListener(cardView:CardView)
    {
        cardView.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
            this.ChangeShowCard(cardView.Card.CardId);
        },this);
    }

    public ChangeShowCard(CardId:number):void
    {
        this.ShowCard.visible = true;
        this.ShowCard.init(CardId);
    }

    public HurtPlayer(Player:"Me"|"Enemy",HP:number)
    {
        if(Player == "Me" && Number(this.MyHP.text)>HP )
        {
            this.MyHP.text = String( Number(this.MyHP.text) - HP);
        }
        else if(Player == "Enemy" && Number(this.EnemyHP.text)>HP )
        {
            this.EnemyHP.text = String( Number(this.EnemyHP.text) - HP);
        }
        else if(Player == "Me" && Number(this.MyHP.text)<=HP )
        {
            this.MyHP.text = "0";
        }
        else if(Player == "Enemy" && Number(this.EnemyHP.text)<=HP )
        {
            this.EnemyHP.text = "0";

            var data = {};
            ALISDK.CatcherSDK.instance().sendJson({function:"gameover",params:data});
        }
    }

    /** 开始战斗阶段 */
    public MyBattleTurn()
    {
        this.Mystatus = Playerstatus.Battle;

        for(let i=0; i<3; i++)
        {
            if(this.MyBattleCard[i]!=null)
            {
                if(this.EnemyBattleCard[i]!=null)
                {
                    var issurvival = this.EnemyBattleCard[i].BeHurted(this.MyBattleCard[i].GetAttack());
                    if(issurvival == false)
                    {
                        this.EnemyBattleCard[i] = null;
                    }
                }
                else
                {
                    this.HurtPlayer("Enemy",this.MyBattleCard[i].GetAttack());
                }
            }
        }

        //TODO 网络请求，下一回合
        this.Mystatus = Playerstatus.Stop;
        this.EnemyTurn();
        var data = {};
        ALISDK.CatcherSDK.instance().sendJson({function:"NextTurn",params:data});
    }

    public EnemyTurn()
    {   
        this.MyTimeGroup.visible = false;
        this.EnemyTimeGroup.visible = true;
        this.ExitTurnGroup.visible = false;
        this.Timer.reset();

        this.AddPower("Enemy");
        //抽卡
        if(Number(this.EnemyCardNum.text)>0)
        {
            this.EnemyCardNum.text = String( Number(this.EnemyCardNum.text) - 1);
        }
        else
        {
            var data = {};
            ALISDK.CatcherSDK.instance().sendJson({function:"gameover",params:data});
        }


        if(Number(this.EnemyHandNum.text)<5)
            this.EnemyHandNum.text = String( Number(this.EnemyHandNum.text) + 1);
        
        this.TishiGroup.visible = true;
        this.Tishi.text = "对手回合";
        this.MyTimeGroup.visible = false;
        this.EnemyTimeGroup.visible = true;

        egret.setTimeout(()=>{
            if(this.Mystatus == Playerstatus.End)
            {
                return;
            }

            this.TishiGroup.visible = false;
            this.Mystatus = Playerstatus.EnemyTurn;           
            this.Timer.reset();
            this.MyTime.text = String(Config.TurnTime);
            this.EnemyTime.text = String(Config.TurnTime);
            this.Timer.start();
        },this,3000)
    }

    public EnemyNextTurn()
    {
        if(this.Mystatus == Playerstatus.End)
        {
            return;
        }

        this.Mystatus = Playerstatus.Battle;
        this.EnemyBattleTurn();

        this.MyTurn();
    }

    private MyTurn()
    {
        this.TishiGroup.visible = true;
        this.Tishi.text = "您的回合";
        this.MyTimeGroup.visible = true;
        this.EnemyTimeGroup.visible = false;
        this.ExitTurnGroup.visible = true;

        egret.setTimeout(()=>{
            this.TishiGroup.visible = false;
            this.Mystatus = Playerstatus.MyTurn;
            this.AddPower("Me");
            this.DrawCard();        
            this.Timer.reset();
            this.MyTime.text = String(Config.TurnTime);
            this.EnemyTime.text = String(Config.TurnTime);
            this.Timer.start();
        },this,3000)
    }

    public EnemyBattleTurn()
    {
        for(let i=0; i<3; i++)
        {
            if(this.EnemyBattleCard[i]!=null)
            {
                if(this.MyBattleCard[i]!=null)
                {
                    var issurvival = this.MyBattleCard[i].BeHurted(this.EnemyBattleCard[i].GetAttack());
                    if(issurvival == false)
                    {
                        this.MyBattleCard[i] = null;
                    }
                }
                else
                {
                    this.HurtPlayer("Me",this.EnemyBattleCard[i].GetAttack());
                }
            }
        }
    }

    public Enemysummon(Block_num:number,CardId:number)
    {
        if(this.Mystatus == Playerstatus.End)
        {
            return;
        }

        if(this.UsePower("Enemy",Cardinfo.getInst().GetCardInfo(CardId).Rank ) == false)
        {
            console.error("对手法力值无法召唤");
            return;
        }

        var cardView = new CardView();
        this.GameGroup.addChild(cardView);
        cardView.init(CardId);
        if(Block_num == 0)
        {
            cardView.CanTouch = false;
            var pos = this.EnemyBattleBox.localToGlobal(this.Enemy_block_1.x,this.Enemy_block_1.y);
            cardView.x = pos.x;
            cardView.y = pos.y;
            this.EnemyBattleCard[0] = cardView;
        }
        else if(Block_num == 1)
        {
            cardView.CanTouch = false;
            var pos = this.EnemyBattleBox.localToGlobal(this.Enemy_block_2.x,this.Enemy_block_2.y);
            cardView.x = pos.x;
            cardView.y = pos.y;
            this.EnemyBattleCard[1] = cardView;
        }
        else if(Block_num == 2)
        {
            cardView.CanTouch = false;
            var pos = this.EnemyBattleBox.localToGlobal(this.Enemy_block_3.x,this.Enemy_block_3.y);
            cardView.x = pos.x;
            cardView.y = pos.y;
            this.EnemyBattleCard[2] = cardView;
        }
    }

    public Result(Winner:"Me"|"Enemy"|"")
    {
        if(this.Mystatus == Playerstatus.End)
        {
            return;
        }

        this.Timer.stop();
        this.MyTimeGroup.visible = false;
        this.EnemyTimeGroup.visible = false;
        this.Mystatus = Playerstatus.End;
        this.TishiGroup.visible = true;
        if(Winner == "Me")
        {
            this.Tishi.text = "获胜";
        }
        else if(Winner == "Enemy")
        {
            this.Tishi.text = "失败";
        }
        else
        {
            this.Tishi.text = "平局";
        }

        egret.setTimeout(()=>{
            GameViewControl.getInst().LoadView(ViewList.Main);
            BattleConnect.getInst().end();
        },this,3000)
    }

    public AddPower(Player:"Me"|"Enemy")
    {
        if(Player == "Me")
        {
            this.MyPower.text = String(Number(this.MyPower.text) + Config.everyTurnPower );
        }
        else
        {
            this.EnemyPower.text = String(Number(this.EnemyPower.text) + Config.everyTurnPower );
        }
    }

    public UsePower(Player:"Me"|"Enemy",pow:number):boolean
    {
        if(Player == "Me")
        {
            if(Number(this.MyPower.text) >= pow)
            {
                this.MyPower.text = String( Number(this.MyPower.text) - pow);
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            if(Number(this.EnemyPower.text) >= pow)
            {
                this.EnemyPower.text = String( Number(this.EnemyPower.text) - pow);
                return true;
            }
            else
            {
                return false;
            }
        }
    }

}
