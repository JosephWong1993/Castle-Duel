<template>
  <div class="card" :class="'type-'+def.type" @click="play">
    <div class="title">{{def.title}}</div>
    <img class="separator" src="../svg/card-separator.svg" />
    <div class="description">
      <div v-html="def.description"></div>
    </div>
    <div class="note" v-if="def.note">
      <div v-html="def.note"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { CardModel } from "../common/Models";

declare type VueVm = Vue & Methods;

class Props {
  def = {
    type: Object,
    default: () => new CardModel()
  };
}

class Methods {
  play = function(this: VueVm) {
    let _this = this;
    _this.$emit("play");
  };
}

export default {
  props: new Props() as any,
  methods: new Methods()
};
</script>