<template>
  <div class="panel preview">
    <div class="header">プレビュー</div>
    <div class="frame">
      <iframe width="320" height="240" src="/preview/index.html"></iframe>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  setup() {},
  methods: {},
});
</script>

<style lang="scss">
@import "../assets/sass/Preview";
</style>
