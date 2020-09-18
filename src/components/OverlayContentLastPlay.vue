<template>
  <div>
    <div v-if="opponent.skippedTurn">{{opponent.name}} was skipped!</div>
    <template v-else>
      <div>{{opponent.name}} just played:</div>
      <card :def="lastPlayedCard"></card>
    </template>
  </div>
</template>
<script lang="ts">
import vue from "vue";
import Utils from "../Utils";
import Cards from "../Cards";
import Card from "./Card.vue";
import { Player } from "../common/Models";

declare type VueVm = vue & Props & Computed;
export type overlayContentLastPlayVm = VueVm;

class Props {
  opponent: Player = {
    type: Object,
    default: () => new Player()
  } as any;
}

class Computed {
  lastPlayedCard = function(this: VueVm) {
    let _this = this;
    return Utils.getLastPlayedCard(Cards, _this.opponent);
  };
}

export default {
  components: {
    Card
  },
  props: new Props() as any,
  computed: new Computed() as any
};
</script>