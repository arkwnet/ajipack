<template>
  <div class="dialog">
    <div class="main">
      <h1>新しいスクリプト</h1>
      <h2>スクリプト名</h2>
      <p><input type="text" class="text" /></p>
    </div>
    <div class="footer">
      <div class="button">
        <div>OK</div>
        <div>キャンセル</div>
      </div>
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
@import "../../assets/sass/components/Dialog";
</style>
