// TypeScript file
namespace Config {

    /** 双方玩家初始生命值 */
    export const MaxHP:number = 30;
    /** 双方玩家初始手牌数 */
    export const StartHandNum:number = 3;
    /** 双方玩家最大手牌数 */
    export const MaxHandNum:number = 5;
    /** 双方玩家回合开始时抽牌数 */
    export const TurnAddNum:number = 1;
    /** 卡组上限 */
    export const MaxDeckNum:number = 20;
    /** 最大回合数上限，暂未投入使用 */
    export const MaxTrunNum:number = 32;
    /** 一回合的时间 */
    export const TurnTime:number = 60;
    /** 每回合获得的能量数 */
    export const everyTurnPower:number = 5;
    /** 已投入使用的最大卡牌种类的数量 */
    export const CardsNumber:number = 10;
    /** 已设定好的最大卡牌种类的数量 */
    export const MaxCardsId:number = 20;
    /** 买一包卡牌所需的花费 */
    export const CardPackCost:number = 100;
    /** 一包卡牌所包含的卡牌数量 */
    export const PackCardsNum:number = 5;

    /** 手牌区域的宽 */
    export const HandBoxWidth:number = 1100;
    /** 手牌区域的高 */
    export const HandBoxheight:number = 280;
    /** 手牌之间的间隔 */
    export const HandDistance:number = 25;
    /** 卡牌的宽 */
    export const Cardwidth:number = 196;
    /** 卡牌的高 */
    export const Cardheight:number = 280;
}
