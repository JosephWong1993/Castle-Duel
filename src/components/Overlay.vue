<template>
  <div class="overlay" @click="handleClick">
    <div class="content">
      <!-- 这里是插槽 -->
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

declare type VueVm = Vue & Methods;

class Methods {
  handleClick = function(this: VueVm) {
    let _this = this;
    _this.$emit("close");
  };
}

export default {
  methods: new Methods()
};
</script>