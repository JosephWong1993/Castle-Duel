<template>
  <div id="#app" :class="cssClass">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    <div class="world">
      <castle v-for="(player,index) in players" :key="index" :player="player" :index="index"></castle>
      <div class="land" />
      <div class="clouds">
        <cloud v-for="cloudIndex in 10" :key="cloudIndex" :type="(cloudIndex-1)%5+1"></cloud>
      </div>
    </div>
    <transition name="hand">
      <hand
        v-if="!activeOverlay"
        :Cards="currentHand"
        @card-play="handlePlayCard"
        @card-leave-end="handleCardLeaveEnd"
      ></hand>
    </transition>

    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay"></div>
    </transition>

    <transition name="zoom">
      <Overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
        <component
          :is="`overlay-content-${activeOverlay}`"
          :player="currentPlayer"
          :opponent="currentOpponent"
          :players="players"
        />
      </Overlay>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Utils from "./Utils";
import state, { AppState } from "./State";
import Cards from "./Cards";
import { Player } from "./common/Models";
import TopBar from "./components/TopBar.vue";
import Hand from "./components/Hand.vue";
import Card from "./components/Card.vue";
import Overlay from "./components/Overlay.vue";
import OverlayContentPlayerTurn from "./components/OverlayContentPlayerTurn.vue";
import OverlayContentLastPlay from "./components/OverlayContentLastPlay.vue";
import OverlayContentGameOver from "./components/OverlayContentGameOver.vue";
import Castle from "./components/World/Castle.vue";
import Cloud from "./components/World/Cloud.vue";

declare type Vm = Vue & AppState & Computed & Methods;

class Computed {
  currentPlayer: Player = function(this: Vm) {
    return this.players[this.currentPlayerIndex];
  } as any;
  currentOpponentId: number = function(this: Vm) {
    return this.currentPlayerIndex === 0 ? 1 : 0;
  } as any;
  currentOpponent: Player = function(this: Vm) {
    return this.players[this.currentOpponentId];
  } as any;
  currentHand: Array<any> = function(this: Vm) {
    const vm = this;
    return vm.currentPlayer.hand;
  } as any;
  cssClass(this: Vm) {
    const vm = this;
    return {
      "can-play": vm.canPlay
    };
  }
}

class Methods {
  /** 开始游戏 */
  beginGame(this: Vm) {
    console.log("beginGame");
    const vm = this;
    vm.players.forEach(vm.drawInitialHand);
  }

  /** 初始化玩家手牌 */
  drawInitialHand(this: Vm, player: Player) {
    const vm = this;
    for (let i = 0; i < vm.handSize; i++) {
      player.hand.push(vm.drawCard());
    }
  }

  /** 从牌堆中随机抽取一张牌 */
  drawCard(this: Vm) {
    const vm = this;
    if (vm.getDrawPileCount() === 0) {
      vm.refillPile();
    }

    const choice = Math.round(Math.random() * (vm.getDrawPileCount() - 1)) + 1;

    let accumulation = 0;
    for (let k in vm.drawPile) {
      accumulation += vm.drawPile[k];
      if (choice <= accumulation) {
        // Draw the card from the pile
        vm.drawPile[k]--;
        return {
          id: k,
          uid: vm.cardUid++,
          def: Cards[k]
        };
      }
    }
  }

  /** 获取玩家可抽牌的数量 */
  getDrawPileCount(this: Vm) {
    const vm = this;
    let result = 0;
    for (let k in vm.drawPile) {
      result += vm.drawPile[k];
    }
    return result;
  }

  /** 用弃牌堆重新填充牌堆 */
  refillPile(this: Vm) {
    const vm = this;
    Object.assign(vm.drawPile, vm.discardPile);
    vm.discardPile = {};
  }

  playCard(this: Vm, card) {
    const vm = this;
    if (vm.canPlay) {
      vm.canPlay = false;
      vm.currentPlayingCard = card;

      //  将卡牌从玩家手牌中移除
      const index = vm.currentPlayer.hand.indexOf(card);
      vm.currentPlayer.hand.splice(index, 1);

      //  将卡牌放到弃牌堆中
      Utils.addCardToPile(vm.discardPile, card.id);
    }
  }

  /** 出牌 */
  handlePlayCard(this: Vm, card) {
    const vm = this;
    vm.playCard(card);
  }

  handleCardLeaveEnd(this: Vm) {
    this.applyCard();
  }

  applyCard(this: Vm) {
    const vm = this;
    const card = vm.currentPlayingCard;

    vm.applyCardEffect(card);

    // 稍等一会,让玩家观察到发生了什么
    setTimeout(() => {
      // 检查玩家是否"死亡"
      vm.players.forEach(Utils.checkPlayerLost);

      if (Utils.isOnePlayerDead()) {
        vm.endGame();
      } else {
        vm.nextTurn();
      }
    });
  }

  endGame(this: Vm) {
    const vm = this;
    vm.activeOverlay = "game-over";
  }

  nextTurn(this: Vm) {
    const vm = this;
    vm.turn++;
    vm.currentPlayerIndex = vm.currentOpponentId;
    vm.activeOverlay = "player-turn";
  }

  newTurn(this: Vm) {
    const vm = this;
    vm.activeOverlay = null;
    if (vm.currentPlayer.skipTurn) {
      vm.skipTurn();
    } else {
      vm.startTurn();
    }
  }

  skipTurn(this: Vm) {
    const vm = this;
    vm.currentPlayer.skippedTurn = true;
    vm.currentPlayer.skipTurn = false;
    vm.nextTurn();
  }

  startTurn(this: Vm) {
    const vm = this;
    vm.currentPlayer.skippedTurn = false;
    //  如果两名玩家都已经玩过一个回合
    if (vm.turn > 2) {
      //  抽一张新的卡牌
      setTimeout(() => {
        vm.currentPlayer.hand.push(vm.drawCard());
        vm.canPlay = true;
      }, 800);
    } else {
      vm.canPlay = true;
    }
  }

  applyCardEffect(this: Vm, card) {
    const vm = this;
    vm.currentPlayer.lastPlayedCardId = card.id;
    card.def.play(vm.currentPlayer, vm.currentOpponent);
    // Check if the stats (health, food) are not outside the boundaries
    vm.players.forEach(vm.checkStatsBounds);
  }

  checkStatsBounds(this: Vm, player) {
    const vm = this;
    // Health
    if (player.health < 0) {
      player.health = 0;
    } else if (player.health > vm.maxHealth) {
      player.health = vm.maxHealth;
    }

    // Food
    if (player.food < 0) {
      player.food = 0;
    } else if (player.food > vm.maxFood) {
      player.food = vm.maxFood;
    }
  }

  handleOverlayClose(this: Vm) {
    const vm = this;
    vm.overlayCloseHandlers[vm.activeOverlay]();
  }
}

export default {
  components: {
    TopBar,
    Hand,
    Overlay,
    OverlayContentPlayerTurn,
    OverlayContentLastPlay,
    OverlayContentGameOver,
    Castle,
    Cloud
  },
  data: function() {
    return state;
  },
  methods: new Methods(),
  computed: new Computed() as any,
  created(this: Vm) {
    let vm = this;

    vm.overlayCloseHandlers = {
      "player-turn"() {
        if (vm.turn > 1) {
          vm.activeOverlay = "last-play";
        } else {
          vm.newTurn();
        }
      },
      "last-play"() {
        vm.newTurn();
      },
      "game-over"() {
        //  重新加载游戏
        document.location.reload();
      }
    };

    vm.activeOverlay = "player-turn";
  },
  mounted(this: Vm) {
    const vm = this;
    vm.beginGame();
  }
};
</script>