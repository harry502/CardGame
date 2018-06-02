class DeckManager
{
    private static inst: DeckManager;
    private isReady:boolean = false;
    private DeckCards:number[] = [];
    public static getInst() {
    if (DeckManager.inst == null) {
            DeckManager.inst = new DeckManager();
        }
        return DeckManager.inst;
    }

    public update()
    {
        var params = {};
        HttpManager.getInst().init();
        params['userid'] = Userinfo.getInst().userid;
        HttpManager.getInst().post("http://119.29.204.43/CardGame/backend/web/index.php?r=user/getdeck",params,this);
    }

    public getDeck():number[]
    {
        return this.DeckCards;
    }
    
    public setDeckbyStr(decklist:string)
    {
        this.DeckCards = [];
        var list:any = decklist.split('|');
        for(let t of list)
        {
            var temp:string[] = t.split(':');
            for(let i = 0; i<Number(temp[1]); i++)
            {
                this.DeckCards.push(Number(temp[0]));
            }
        }
        console.log(this.DeckCards);
    }

    public setDeck(decklist:number[])
    {
        this.DeckCards = [];
        for(let i=0; i<decklist.length; i++)
		{
            for(let l=0; l<decklist[i]; l++)
			{
                this.DeckCards.push(i);
            }
		}
        console.log(this.DeckCards);
    }

    

    public saveDeck()
    {
        var list = {};
        var liststr:string = "";
        for( let t of this.DeckCards)
        {
            if(list[t] == null)
            {
                list[t] = 1;
            }
            else
            {
                list[t]++;
            }
        }

        for( let t in list)
        {
            liststr += String(t) + ":" + String(list[t]) + "|";
        }
        liststr = liststr.substr(0, liststr.length - 1);

        var params = {};
        HttpManager.getInst().init();
        params['userid'] = Userinfo.getInst().userid;
        params['decklist'] = liststr;
        HttpManager.getInst().post("http://119.29.204.43/CardGame/backend/web/index.php?r=user/setdeck",params,this);
    }

    private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var result = JSON.parse(request.response);
        if(result["Mark"] == "获取成功")
        {
            this.setDeckbyStr(result["deck"]);
        }
    }
}