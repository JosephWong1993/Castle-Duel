<template>
  <svg viewBox="0 0 20 260">
    <path :d="`m 0,0 20,0 0,${height} -10,-10 -10,10 z`" :style="`fill:${color};stroke:none;`" />
  </svg>
</template>
<script lang="ts">
import Vue from "vue";

declare type Vm = Vue & Data & Props & Computed;

class Data {
  height = 0;
}

class Props {
  color = {
    type: String,
    default: ""
  };
  ratio: number = {
    type: Number,
    default: 0
  } as any;
}

class Watch {
  targetHeight(this: Vm, newValue: number, oldValue: number) {
    const vm = this;
    new TWEEN.Tween({ value: oldValue })
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ value: newValue }, 500)
      .onUpdate(function() {
        const tween = this;
        vm.height = tween.value.toFixed(0);
      })
      .start();
  }
}

class Computed {
  targetHeight: number = function(this: Vm) {
    return 220 * this.ratio + 40;
  } as any;
}

export default {
  template: "#banner",
  data() {
    return new Data();
  },
  props: new Props() as any,
  watch: new Watch() as any,
  computed: new Computed() as any,
  created(this: Vm) {
    let _this = this;
    _this.height = _this.targetHeight;
  }
};
</script>
