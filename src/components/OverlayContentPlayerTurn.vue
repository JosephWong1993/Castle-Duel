<template>
  <div>
    <div class="big" v-if="player.skipTurn">
      {{player.name}},
      <br />your turn is skipped!
    </div>
    <div class="big" v-else>
      {{player.name}},
      <br />your turn has come!
    </div>
    <div>Tap to continue</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Player } from "../common/Models";

declare type VueVm = Vue & Props;

class Props {
  player = {
    type: Object,
    default: () => {
      return new Player("");
    }
  };
}

export default {
  props: new Props()
};
</script>