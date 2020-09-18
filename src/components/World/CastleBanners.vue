<template>
  <div class="banners">
    <!-- 食物 -->
    <img class="food-icon" src="../../svg/food-icon.svg" />
    <!-- 这里是小气泡 -->
    <bubble type="food" :value="player.food" :radio="foodRatio" />
    <!-- 这里是旗帜栏 -->
    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

    <!-- 这里是生命值 -->
    <img class="health-icon" src="../../svg/health-icon.svg" />
    <!-- 这里是小气泡 -->
    <bubble type="health" :value="player.health" :radio="healthRatio" />
    <!-- 这里是旗帜栏 -->
    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import State from "../../State";
import { Player } from "../../common/Models";
import Bubble from "./Bubble.vue";
import BannerBar from "./BannerBar.vue";

declare type VueVm = Vue & Props & Computed;

class Props {
  player: Player = {
    player: Player,
    default: () => new Player()
  } as any;
}

class Computed {
  foodRatio = function(this: VueVm) {
    return this.player.food / State.maxFood;
  };
  healthRatio = function() {
    return this.player.health / State.maxHealth;
  };
}

export default {
  components: {
    Bubble,
    BannerBar
  },
  props: new Props() as any,
  computed: new Computed() as any
};
</script>