
class BattleViewControl extends core.ViewController {
	private view:BattleView;

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
		BattleConnect.getInst().bindBattleView(this);
		if(this.view == null){
			this.view = new BattleView();
		}
		this.getParent().addChild(this.view);
		this.view.open();
    }

	public update(): void {

	}

	public StartGame(userId:string)
	{
		if(GameInfo.getInst().selfUserId == userId)
		{
			this.view.StartGame("Me");
		}
		else if(GameInfo.getInst().rivalUserId == userId)
		{
			this.view.StartGame("Enemy");
		}
		else
		{
			console.error("无效UserId");
		}
	}

	public EnemyNextTurn()
	{
		this.view.EnemyNextTurn();
	}

	public Enemysummon(Block_num:number,CardId:number)
	{
		this.view.Enemysummon(Block_num,CardId);
	}

	public Result(winner:string)
	{
		if(winner == GameInfo.getInst().selfUserId)
		{
			this.view.Result("Me");
		}
		else if(winner == GameInfo.getInst().rivalUserId)
		{
			this.view.Result("Enemy");
		}
		else if(winner == "")
		{
			this.view.Result("");
		}
		else
		{
			console.error("无效UserId");
		}
	}

}
