class MainMenuView extends core.UIView {

	private NormalGame:eui.Group;
	private Shop:eui.Group;
	private MyDeck:eui.Group;
	private tishiGroup:eui.Group;
	private tishi:eui.Label;
	private cancel:eui.Label;

	private timeid:number = 0;
	private timeid2:number = 0;

	public constructor() {
		super("resource/skins/MainMenu.exml");
	}

    public open()
	{
		this.addAllListener();
		core.SoundManager.getInstance().setBgmVolume(0.05);
		core.SoundManager.getInstance().playBgm("BGM_Main_m4a");
	}

	public destroy()
	{
		
	}

    private addAllListener()
	{
		this.NormalGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.tishi.text = "正在寻找对手，请稍后...";
			this.tishiGroup.visible = true;
			BattleConnect.getInst().isWaiting = true;
			BattleConnect.getInst().init();
			BattleConnect.getInst().bind();
			BattleConnect.getInst().start();

			if(this.timeid != 0)
				egret.clearTimeout(this.timeid);

			this.timeid = egret.setTimeout(()=>{
				if(BattleConnect.getInst().getisGameReady() == false && BattleConnect.getInst().isWaiting == true)
				{
					this.tishi.text = "暂未找到合适的对手";
					BattleConnect.getInst().isWaiting = false;
					BattleConnect.getInst().end();

					if(this.timeid2 != 0)
						egret.clearTimeout(this.timeid2);

					this.timeid2 = egret.setTimeout(()=>{
						this.tishiGroup.visible = false;
					},this,2000);
				}
			},this,12000);

			//GameViewControl.getInst().LoadView(ViewList.battle);
		},this);
		this.Shop.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			GameViewControl.getInst().LoadView(ViewList.shop);
		},this);
		this.MyDeck.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			GameViewControl.getInst().LoadView(ViewList.MyDeck);
		},this);
		this.cancel.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.tishiGroup.visible = false;
			BattleConnect.getInst().isWaiting = false;
			BattleConnect.getInst().end();
			if(this.timeid != 0)
				egret.clearTimeout(this.timeid);
			if(this.timeid2 != 0)
				egret.clearTimeout(this.timeid2);
		},this);
	}

}
