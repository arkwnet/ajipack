<template>
  <div class="panel preview">
    <div class="header">プレビュー</div>
    <div class="main frame">
      <iframe width="320" height="240" :src="src"></iframe>
    </div>
    <div class="footer">
      <div class="button" id="button_play" @click="play">
        <img src="../assets/img/play.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, shallowRef } from "vue";

export default defineComponent({
  emits: [],
  data() {
    return {
      src: "about:blank",
    };
  },
  setup() {
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };
    return {
      handleReady,
      log: console.log,
    };
  },
  methods: {
    play() {
      this.$emit("play");
    },
    update(src) {
      this.src = "about:blank";
      this.src = src;
    },
  },
});
</script>

<style lang="scss">
@import "../assets/sass/Preview";
</style>
