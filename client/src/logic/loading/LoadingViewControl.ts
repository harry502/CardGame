
class LoadingViewControl extends core.ViewController {

	private view: LoadingView;

    private isResLoaded: boolean = false;
    private gameViewController: GameViewControl;

	public constructor() {
		super();
	}

	public destroy() {
		this.close();
		this.view = null;
		super.destroy();
	}

	public open(): void {
		if (this.view == null) {
			this.view = new LoadingView();
		}
		this.getParent().addChild(this.view);

		var groupName: string = "game";
		var subGroups: Array<string> = ["game"];
		core.LoadingManage.getInstance().loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
	}

	public close(): void {
		if (this.view != null && this.view.parent) {
			this.view.parent.removeChild(this.view);
		}
	}

    /**
     * 资源组加载完成
     */
	private onResourceLoadComplete(): void {
		this.isResLoaded = true;
		//this.gameViewController = core.PageManage.getInstance().addViewControl(GameViewControl, core.ViewLayerType.SceneLayer, core.RemoveViewType.RemoveBefore);
        GameViewControl.getInst().LoadView(ViewList.login);
	}

	/**
 	 * 资源组加载进度
 	 */
	private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number) {
		this.view.setProgress(itemsLoaded, itemsTotal);
	}
}
