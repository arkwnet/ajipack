<template>
  <div class="panel data">
    <div class="header">データ管理</div>
    <div class="main scroll"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { defineComponent, shallowRef } from "vue";

export default defineComponent({
  data() {
    return {};
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
  methods: {},
});
</script>

<style lang="scss">
@import "../assets/sass/Data";
</style>
