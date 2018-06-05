// TypeScript file

class Userinfo 
{
    private static inst: Userinfo;
    public static getInst() {
        if (Userinfo.inst == null) {
            Userinfo.inst = new Userinfo();
        }
        return Userinfo.inst;
    }
    userid:number;
    userName:string;
    score:number;
    GameNum:number;
    coins:number;
}

interface CardData
{
    CardId:number;
    Name:string;
    Skill:string;
    Cost:number;
    Attack:number;
    HP:number;
    IconUrl:string;
    Sound:string;
}

class Cardinfo
{
    private static inst: Cardinfo;
    private Cards:CardData[];
    public static getInst() {
        if (Cardinfo.inst == null) {
            Cardinfo.inst = new Cardinfo();
        }
        return Cardinfo.inst;
    }

    constructor()
    {
        this.Cards = RES.getRes("CardConfig_json").Cards as CardData[];
    }

    public GetCardslength()
    {
        return this.Cards.length;
    }

    public GetCardInfo(CardId:number)
    {
        for(let i of this.Cards)
        {
            if(i.CardId == CardId)
            {
                return i;
            }
        }
    }
}