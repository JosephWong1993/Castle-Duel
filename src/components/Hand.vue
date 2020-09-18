<template>
  <div class="hand">
    <div class="wrapper">
      <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
        <!-- 卡牌 -->
        <Card v-for="card of Cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
      </transition-group>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";
import { CardModel } from "../common/Models";

declare type Vm = Vue & Methods;

class Props {
  Cards = {
    type: Array,
    default: () => []
  };
}

class Methods {
  handlePlay = function(this: Vm, card) {
    let vm = this;
    vm.$emit("card-play", card);
  };
  handleLeaveTransitionEnd(this: Vm) {
    const vm = this;
    vm.$emit("card-leave-end");
  }
}

export default {
  components: {
    Card
  },
  props: new Props(),
  methods: new Methods()
};
</script>