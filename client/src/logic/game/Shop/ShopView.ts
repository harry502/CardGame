class ShopView extends core.UIView {
	private Coins:eui.Label;
	private BuyPack:eui.Group;
	private CardBox:eui.Group;
	private card_1:CardView;
	private card_2:CardView;
	private card_3:CardView;
	private card_4:CardView;
	private card_5:CardView;
	private sure:eui.Group;
	private tishi:eui.Group;
	private back:eui.Group;

	private cardList:CardView[];

	public constructor(){
		super("resource/skins/ShopSkin.exml");
	}

	public open()
	{
		this.addAllListener();
		this.cardList=[];
		this.cardList.push(this.card_1);
		this.cardList.push(this.card_2);
		this.cardList.push(this.card_3);
		this.cardList.push(this.card_4);
		this.cardList.push(this.card_5);

		this.Coins.text = String(Userinfo.getInst().coins);
	}

	public destroy()
	{

	}

	private addAllListener()
	{
		this.BuyPack.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.BuyCardPack();
		},this);
		this.sure.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.CardBox.visible = false;
		},this);
		this.back.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			GameViewControl.getInst().LoadView(ViewList.Main);
		},this);
	}

	private BuyCardPack()
	{
		if(Number(this.Coins.text)<Config.CardPackCost)
		{
			this.tishi.visible = true;
			egret.setTimeout(()=>{
				this.tishi.visible = false;
			},this,2000);
			return;
		}

		this.CardBox.visible = true;
		var list:number[] = this.GetCardList(Config.PackCardsNum);
		for(let i = 0; i < Config.PackCardsNum; i++)
		{
			this.cardList[i].init(list[i]);
		}
		this.Coins.text = String(Number(this.Coins.text) - Config.CardPackCost);
		CardManager.getInst().AddCardList(list);
		CardManager.getInst().saveCard();
		Userinfo.getInst().coins -= Config.CardPackCost;

		var params = {};
        HttpManager.getInst().init();
        params['userid'] = Userinfo.getInst().userid;
		params['cost'] = Config.CardPackCost;
        HttpManager.getInst().post("user/usecoin",params,this);
	}

	private onPostComplete(event:egret.Event):void 
    {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var result = JSON.parse(request.response);
    }

	private GetCardList(num:number):number[]
	{
		var list = [];
		for(let i = 0; i < num; i++)
		{
			list.push(Math.floor(Math.random()*Config.CardsNumber));
		}
		return list;
	}
}
