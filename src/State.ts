import { Pile } from "./Cards";
import { Player } from "./common/Models";

// 应用状态集合
export class AppState {
  maxHealth = 10;
  maxFood = 10;
  handSize = 5;
  cardUid = 0;
  currentPlayingCard = null;

  //  用户界面
  activeOverlay = null;
  // 世界
  worldRatio = 0;
  // 游戏
  turn = 1;
  players = [
    new Player("Anne of Cleves"),
    new Player("William the Bald")
  ];
  testHand = [];

  currentPlayerIndex = Math.round(Math.random());

  /** 玩家可以抽牌的牌堆 */
  drawPile = Pile;
  /** 弃牌堆 */
  discardPile = {};

  canPlay = false;
  overlayCloseHandlers: {
    "player-turn"(): void;
    "last-play"(): void;
    "game-over"(): void;
  } = null;
}

const state = new AppState();
export default state;
