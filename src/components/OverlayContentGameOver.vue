<template>
  <div>
    <div class="big">Game Over</div>
    <player-result v-for="(player, index) of players" :key="index" :player="player"></player-result>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Player } from "../common/Models";
import PlayerResult from "./PlayerResult.vue";

class Props {
  Players = {
    type: Array,
    default: () => []
  };
}

export default {
  components: {
    PlayerResult
  },
  props: new Props()
};
</script>