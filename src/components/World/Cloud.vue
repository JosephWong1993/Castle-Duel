<template>
  <div class="cloud" :class="`cloud-${type}`" :style="style">
    <img :src="`svg/cloud${type}.svg`" @load="initPosition" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

declare type Vm = Vue & Props & Data & Methods;

const coludAnimationDurations = {
  min: 10000,
  max: 50000
};

class Props {
  type: number = {
    type: Number,
    default: 1
  } as any;
}

class Data {
  style = {
    transform: "none",
    zIndex: 0
  };
}

class Methods {
  setPosition(this: Vm, left, top) {
    const vm = this;
    // 使用transform可以获得更好的性能
    vm.style.transform = `translate(${left}px,${top}px)`;
  }
  initPosition(this: Vm) {
    const vm = this;
    // 元素宽度
    const width = vm.$el.clientWidth;
    vm.setPosition(-width, 0);
  }
  startAnimation(this: Vm, delay = 0) {
    const vm = this;
    // 元素宽度
    const width = vm.$el.clientWidth;

    // 随机动画持续时间
    const { min, max } = coludAnimationDurations;
    const animationDuration = Math.random() * (max - min) + min;

    // 将速度快的云朵放到最前面
    vm.style.zIndex = Math.round(max - animationDuration);

    // 随机位置
    const top = Math.random() * (window.innerHeight * 0.3);

    new TWEEN.Tween({ value: -width })
      .to({ value: window.innerWidth }, animationDuration)
      .delay(delay)
      .onUpdate(function() {
        vm.setPosition(this.value, top);
      })
      .onComplete(() => {
        // 随机延迟
        vm.startAnimation(Math.random() * 10000);
      })
      .start();
  }
}

export default {
  props: new Props() as any,
  data() {
    return new Data();
  },
  methods: new Methods(),
  mounted(this: Vm) {
    const vm = this;

    //  以负值延迟开始动画
    //  所以动画将中途开始
    vm.startAnimation(-Math.random() * coludAnimationDurations.min);
  }
};
</script>