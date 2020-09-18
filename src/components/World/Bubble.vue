<template>
  <div class="stat-bubble" :class="`${type}-bubble`" :style="bubbleStyle">
    <img :src="`svg/${type}-bubble.svg`" />
    <div class="counter">{{value}}</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import State from "../../State";

declare type VueVm = Vue & Props & Computed;

class Props {
  type: string = {
    type: String,
    default: ""
  } as any;
  value = {
    type: Number,
    default: 0
  };
  ratio: number = {
    type: Number,
    default: 1
  } as any;
}

class Computed {
  bubbleStyle = function(this: VueVm) {
    return {
      top: (this.ratio * 220 + 40) * State.worldRatio + "px"
    };
  };
}

export default {
  props: new Props() as any,
  computed: new Computed() as any
};
</script>