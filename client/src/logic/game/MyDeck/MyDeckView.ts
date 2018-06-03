class MyDeckView extends core.UIView {

	private back:eui.Image;
	private SaveDeck:eui.Group;
	private CardBox:eui.Group;
	private DeckBox:eui.Group;
	private tishiGroup:eui.Group;
	private tishi:eui.Label;

	private AllCards:ShowCard[] = [];
	private DeckCards:eui.Label[] = [];
	private Decklist:number[];
	private DeckNum:number;

	public constructor(){
		super("resource/skins/MyCard.exml");
	}

	public open()
	{
		this.Decklist = new Array<number>(Config.MaxCardsId);
		for(let n = 0; n < this.Decklist.length; n++)
			this.Decklist[n] = 0;
		
		this.DeckNum=0;
		this.addAllListener();
		this.setCardView();

		var deck = DeckManager.getInst().getDeck();
		for(let t of deck)
		{
			this.AddDeck(t);
		}
		this.setDeckView();
	}

	public destroy()
	{

	}

	private addAllListener()
	{
		this.back.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			GameViewControl.getInst().LoadView(ViewList.Main);
		},this);
		this.SaveDeck.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			if(this.DeckNum <20)
			{
				this.tishiGroup.visible = true;
				this.tishi.text = "卡组不足20张";
				egret.setTimeout(()=>{
					this.tishiGroup.visible = false;
				},this,1000);
			}
			else
			{
				DeckManager.getInst().setDeck(this.Decklist);
				DeckManager.getInst().saveDeck();

				this.tishiGroup.visible = true;
				this.tishi.text = "卡组保存成功";
				egret.setTimeout(()=>{
					this.tishiGroup.visible = false;
				},this,1000);
			}
		},this);
	}

	private setCardView()
	{
		var cardlist:number[] = CardManager.getInst().getList();
		var temp:ShowCard;

		for(let i=0; i<Config.CardsNumber; i++)
		{
			temp = new ShowCard();
			temp.init(i,cardlist[i]);
			if(i%2 != 0)
			{
				temp.y+=temp.height;
			}
			temp.x += Math.floor(i/2) * (temp.width + 50) + 25;
			this.CardBox.addChild(temp);
			this.AllCards.push(temp);
			this.CardAddLisnter(temp)
		}
	}

	private setDeckView()
	{
		var temp:eui.Label;
		var id = 0;
		this.DeckCards = [];
		this.DeckBox.removeChildren();
		for(let i=0; i<Config.MaxCardsId; i++)
		{
			for(let l=0; l<this.Decklist[i]; l++)
			{
				temp = new eui.Label();
				temp["CardId"] = i;
				temp.size = 50;
				temp.text = Cardinfo.getInst().GetCardInfo(i).Name;
				temp.x = 25;
				temp.y = id*75 + 25;
				id++;
				this.DeckCards.push(temp);
				this.DeckAddLisnter(temp);
				this.DeckBox.addChild(temp);
			}
		}
	}

	private CardAddLisnter(temp:ShowCard)
	{
		temp.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
			if(temp.num > 0)
			{
				this.AddDeck(temp.CardId);
				this.setDeckView();
			}
		},this)
	}

	private DeckAddLisnter(temp:eui.Label)
	{
		temp.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
			this.DeleteDeck(temp["CardId"]);
			this.setDeckView();
		},this);
	}

	private AddDeck(CardId:number)
	{
		if(CardId >= Config.CardsNumber)
		{
			console.error("CardId 错误");
		}
		if(this.DeckNum >= 20)
		{
			return;
		}
		if(this.Decklist[CardId] >= 4)
		{
			this.tishiGroup.visible = true;
			this.tishi.text = "不可大于四张";
			egret.setTimeout(()=>{
				this.tishiGroup.visible = false;
			},this,1000);
			return;
		}

		for(let t of this.AllCards)
		{
			if(t.CardId == CardId)
			{
				t.subone();
			}
		}

		this.Decklist[CardId]++;
		this.DeckNum++;
	}

	private DeleteDeck(CardId:number)
	{
		if(CardId >= Config.CardsNumber)
		{
			console.error("CardId 错误");
		}
		if(this.Decklist[CardId] <= 0)
		{
			return;
		}
		this.Decklist[CardId]--;
		this.DeckNum--;

		for(let t of this.AllCards)
		{
			if(t.CardId == CardId)
			{
				t.addone();
			}
		}
	}

	private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var result = JSON.parse(request.response);
    }
}

class ShowCard extends eui.Component
{
	public card:CardView;
	public number:eui.Label;
	public num:number;
	public CardId:number;

	constructor()
	{
		super();
		this.skinName = "resource/skins/ShowCardSkin.exml";
	}

	public init(cardid:number,num:number)
	{
		this.card.init(cardid);
		this.number.text = "X"+num;
		this.num = num;
		this.CardId = cardid;
	}

	public addone()
	{
		this.num++;
		this.number.text = "X"+this.num;
	}

	public subone()
	{
		if(this.num<=0)
		{
			return;
		}

		this.num--;
		this.number.text = "X"+this.num;
	}
}
