
class ShopViewControl extends core.ViewController {
	private view:ShopView;

	public constructor() {
		super();
	}

	public destroy() {
		if(this.view)
		{
			this.view.parent.removeChild(this.view);
			this.view.destroy();
			this.view = null;
		}

		super.destroy();
	}

	public open(viewNum?:ViewList): void {
		if(this.view == null){
			this.view = new ShopView();
		}
		this.getParent().addChild(this.view);
		this.view.open();
    }

	public update(): void {
		
	}

}
