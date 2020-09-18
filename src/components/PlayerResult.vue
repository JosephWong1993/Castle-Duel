<template>
  <div class="player-result" :class="result">
    <span class="name">{{player.name}}</span>
    <span class="result">{{result}}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Player } from "../common/Models";

declare type VueVm = Vue & {
  player: Player;
} & Computed;

class Props {
  player = {
    type: Player,
    default: () => new Player()
  };
}

class Computed {
  result = function(this: VueVm) {
    let _this = this;
    return _this.player.dead ? "defeated" : "victorious";
  };
}

export default {
  props: new Props()
};
</script>