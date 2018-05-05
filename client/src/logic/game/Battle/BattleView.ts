enum Playerstatus
{
    MyTurn = 0,
    Battle = 1,
    EnemyTurn = 2,
    Stop = 3
}



class BattleView extends core.UIView {

    //UI界面组件
    private Enemy_block_1:eui.Image;
    private Enemy_block_2:eui.Image;
    private Enemy_block_3:eui.Image;
    private My_block_1:eui.Image;
    private My_block_2:eui.Image;
    private My_block_3:eui.Image;
    private MyCardNum:eui.Label;
    private MyHandNum:eui.Label;
    private MyHP:eui.Label;
    private EnemyCardNum:eui.Label;
    private EnemyHandNum:eui.Label;
    private EnemyHP:eui.Label;
    private MyTimeGroup:eui.Group;
    private MyTime:eui.Label;
    private EnemyTimeGroup:eui.Group;
    private EnemyTime:eui.Label;
    private ShowCard:CardView;
    private MyBattleBox:eui.Group;
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


	public constructor() {
		super("resource/skins/BattleSkin.exml");
	}

    public open()
	{
		this.addAllListener();
        this.Mystatus = Playerstatus.Stop;
        this.Timer = new egret.Timer(1000,60);
        this.Timer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.MyTime.text = String( Number(this.MyTime.text) - 1 );
            this.EnemyTime.text = String( Number(this.EnemyTime.text) - 1 );
        },this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            if(this.Mystatus = Playerstatus.MyTurn)
            {
                this.BattleTurn();
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
            this.BattleTurn();
        },this)
	}

    private addHandListener(cardView:CardView)
    {
        cardView.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
            this.ChangeShowCard(cardView.Card.CardId);
            this.removeChild(cardView);
            this.addChild(cardView);
        },this);
        cardView.addEventListener(egret.TouchEvent.TOUCH_MOVE,(evt:egret.TouchEvent)=>{
            if(cardView.CanTouch)
            {
                cardView.x=evt.stageX - cardView.width/2;
                cardView.y=evt.stageY - cardView.height/2;
            }
        },this);
        cardView.addEventListener(egret.TouchEvent.TOUCH_END,(evt:egret.TouchEvent)=>{
            if(cardView.CanTouch == false)
            {
                return;
            }

            if(this.My_block_1.hitTestPoint(evt.stageX,evt.stageY))
            {
                cardView.CanTouch = false;
                var pos = this.MyBattleBox.localToGlobal(this.My_block_1.x,this.My_block_1.y);
                cardView.x = pos.x;
                cardView.y = pos.y;
                this.MyBattleCard[0] = cardView;
                this.HandCard.splice(this.HandCard.indexOf(cardView),1);
            }
            if(this.My_block_2.hitTestPoint(evt.stageX,evt.stageY))
            {
                cardView.CanTouch = false;
                var pos = this.MyBattleBox.localToGlobal(this.My_block_2.x,this.My_block_2.y);
                cardView.x = pos.x;
                cardView.y = pos.y;
                this.MyBattleCard[1] = cardView;
                this.HandCard.splice(this.HandCard.indexOf(cardView),1);
            }
            if(this.My_block_3.hitTestPoint(evt.stageX,evt.stageY))
            {
                cardView.CanTouch = false;
                var pos = this.MyBattleBox.localToGlobal(this.My_block_3.x,this.My_block_3.y);
                cardView.x = pos.x;
                cardView.y = pos.y;
                this.MyBattleCard[2] = cardView;
                this.HandCard.splice(this.HandCard.indexOf(cardView),1);
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
            egret.setTimeout(()=>{
                this.TishiGroup.visible = false;
                this.Mystatus = Playerstatus.MyTurn;
                this.Timer.start();
            },this,1000)
        }
        else
        {
            this.TishiGroup.visible = true;
            this.Tishi.text = "您是后手";
            egret.setTimeout(()=>{
                this.TishiGroup.visible = false;
                this.Mystatus = Playerstatus.EnemyTurn;
                this.Timer.start();
            },this,1000)
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
            this.addChild(card);
            this.addHandListener(card);
            card.init( Math.floor(Math.random() * Cardinfo.getInst().GetCardslength()) );
            this.HandCard.push(card);
            this.UpdateHandCard();
            this.MyCardNum.text = String( Number(this.MyCardNum.text) - 1 );
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

        if(Player == "Me" && Number(this.MyHP.text)<=HP )
        {
            this.MyHP.text = "0";
        }
        else if(Player == "Enemy" && Number(this.EnemyHP.text)<=HP )
        {
            this.EnemyHP.text = "0";
        }
    }

    /** 开始战斗阶段 */
    public BattleTurn()
    {
        this.Mystatus = Playerstatus.Battle;
        this.Timer.reset();
        this.MyTime.text = String(Config.TurnTime);
        this.EnemyTime.text = String(Config.TurnTime);

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
            }
        }

        //TODO 网络请求，下一回合
        this.Mystatus = Playerstatus.EnemyTurn;
    }

}
