<template>
  <div class="castle" :class="`player-${index}`">
    <img class="building" :src="`svg/castle${index}.svg`" />
    <img class="ground" :src="`svg/ground${index}.svg`" />
    <!-- 稍后将在这里添加一个城堡旗帜(castle-banners)组件 -->
    <castle-banners :player="player" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Player } from "../../common/Models";
import CastleBanners from "./CastleBanners.vue";

class Props {
  player = {
    type: Object,
    default: () => new Player()
  };
  index = {
    type: Number,
    default: 0
  };
}

export default {
  components: {
    CastleBanners
  },
  props: new Props()
};
</script>