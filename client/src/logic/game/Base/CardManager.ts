class CardManager
{
    private static inst: CardManager;
    private isReady:boolean = false;
    private CardsList:number[];
    public static getInst() {
    if (CardManager.inst == null) {
            CardManager.inst = new CardManager();
        }
        return CardManager.inst;
    }

    constructor()
    {
        this.CardsList = new Array<number>(Config.MaxCardsId);
    }

    public update()
    {
        var params = {};
        HttpManager.getInst().init();
        params['userid'] = Userinfo.getInst().userid;
        HttpManager.getInst().post("http://119.29.204.43/CardGame/backend/web/index.php?r=user/getcard",params,this);
    }

    public getList():number[]
    {
        return this.CardsList;
    }
    public setList(cardlist:string)
    {
        this.CardsList = Array<number>(20);
        var list:any = cardlist.split('|');
        for(let t of list)
        {
            var temp:string[] = t.split(':');
            this.CardsList[temp[0]] = temp[1];

        }
        console.log(this.CardsList);
    }
    public AddCardList(cardlist:number[])
    {
        for(let t of cardlist)
        {
            this.CardsList[t]++;
        }
        console.log(this.CardsList);
    }

    public saveCard()
    {
        var liststr:string = "";

        for( let t in this.CardsList)
        {
            liststr += String(t) + ":" + String(this.CardsList[t]) + "|";
        }
        liststr = liststr.substr(0, liststr.length - 1);

        var params = {};
        HttpManager.getInst().init();
        params['userid'] = Userinfo.getInst().userid;
        params['cardlist'] = liststr;
        HttpManager.getInst().post("http://119.29.204.43/CardGame/backend/web/index.php?r=user/setcard",params,this);
    }

    private onPostComplete(event:egret.Event):void 
    {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var result = JSON.parse(request.response);
        if(result["Mark"] == "获取成功")
        {
            this.setList(result["card"]);
        }
    }
}