
enum ViewList
{
	login=0,
	Main=1,
	battle=2,
	shop=3,
	MyDeck=4
}

class GameViewControl{
	private NowView:ViewList = ViewList.login;

	private static inst: GameViewControl;
    public static getInst() {
        if (GameViewControl.inst == null) {
            GameViewControl.inst = new GameViewControl();
        }
        return GameViewControl.inst;
    }

	public constructor() {
	}

	public LoadView(viewnum:ViewList)
	{
		switch(viewnum)
		{
			case ViewList.login :
				core.PageManage.getInstance().addViewControl(LoginViewControl, core.ViewLayerType.SceneLayer,
							 core.RemoveViewType.RemoveBefore);
				break;
			case ViewList.Main :
				core.PageManage.getInstance().addViewControl(MainMenuViewControl, core.ViewLayerType.SceneLayer,
							 core.RemoveViewType.RemoveBefore);
				break;
			case ViewList.battle :
				core.PageManage.getInstance().addViewControl(BattleViewControl, core.ViewLayerType.SceneLayer,
							 core.RemoveViewType.RemoveBefore);
				break;
			case ViewList.shop :
				core.PageManage.getInstance().addViewControl(ShopViewControl, core.ViewLayerType.SceneLayer,
							 core.RemoveViewType.RemoveBefore);
				break;
			case ViewList.MyDeck :
				core.PageManage.getInstance().addViewControl(MyDeckViewControl, core.ViewLayerType.SceneLayer,
							 core.RemoveViewType.RemoveBefore);
				break;
		}
	}

}
