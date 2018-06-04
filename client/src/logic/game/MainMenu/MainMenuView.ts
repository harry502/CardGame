class MainMenuView extends core.UIView {

	private NormalGame:eui.Group;
	private Shop:eui.Group;
	private MyDeck:eui.Group;
	private WaitGroup:eui.Group;

	public constructor() {
		super("resource/skins/MainMenu.exml");
	}

    public open()
	{
		this.addAllListener();
		core.SoundManager.getInstance().playBgm("BGM_Main_m4a");
	}

	public destroy()
	{
		
	}

    private addAllListener()
	{
		this.NormalGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.WaitGroup.visible = true;
			BattleConnect.getInst().init();
			BattleConnect.getInst().bind();
			BattleConnect.getInst().start();
			//GameViewControl.getInst().LoadView(ViewList.battle);
		},this);
		this.Shop.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			GameViewControl.getInst().LoadView(ViewList.shop);
		},this);
		this.MyDeck.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			GameViewControl.getInst().LoadView(ViewList.MyDeck);
		},this);
	}

}
