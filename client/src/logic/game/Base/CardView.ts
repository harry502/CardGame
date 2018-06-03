class CardView extends eui.Component
{
    public CardGroup:eui.Group;
    public CardIcon:eui.Image;
    public Skill:eui.Label;
    public Name:eui.Label;
    public Cost:eui.Label;
    public Attack:eui.Label;
    public HP:eui.Label;
    public Card:CardData;
    public CanTouch:boolean;

    constructor()
    {
        super();
        this.skinName = "resource/skins/CardSkin.exml";
    }
    
    public init(CardId:number)
    {
        this.Card = Cardinfo.getInst().GetCardInfo(CardId);
        this.CardIcon.texture = RES.getRes(this.Card.IconUrl);
        this.Skill.text = this.Card.Skill;
        this.Name.text = this.Card.Name;
        this.Cost.text = String(this.Card.Cost);
        this.Attack.text = String(this.Card.Attack);
        this.HP.text = String(this.Card.HP);
        this.CanTouch = true;
    }

    public BeHurted(minuend:number):boolean
    {
        if(Number(this.HP.text) > minuend)
        {
            this.HP.text = String(Number(this.HP.text) - minuend);
            return true;
        }
        else
        {
            this.Dead();
            return false;
        }
    }

    public Dead()
    {
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }

    public GetAttack()
    {
        return Number(this.Attack.text);
    }

    public GetHP()
    {
        return Number(this.HP.text);
    }

    public GetRank()
    {
        return Number(this.Cost.text);
    }

}