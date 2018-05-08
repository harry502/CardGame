
class MainMenuView extends core.UIView {

	private NormalGame:eui.Group;
	private RankGame:eui.Group;
	private MyDeck:eui.Group;
	private WaitGroup:eui.Group;

	public constructor() {
		super("resource/skins/MainMenu.exml");
	}

    public open()
	{
		this.addAllListener();
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
	}

}
