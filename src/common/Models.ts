export class CardModel {
    type = "";
    title = "";
    description = "";
    note = "";
}

export class Player {
    name = "";
    //  游戏开始时的状态
    food = 10;
    health = 10;
    /** 是否跳过下个回合 */
    skipTurn = false;
    /** 跳过了上个回合 */
    skippedTurn = false;
    hand = [];
    lastPlayedCardId = null;
    dead = false;

    constructor()
    constructor(name: string)
    constructor(name?: string) {
        let _this = this;
        if (Boolean(name)) {
            _this.name = name;
        }
    }
}