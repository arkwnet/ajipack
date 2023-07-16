<template>
  <div class="dialog">
    <div class="main">
      <h1>新しいスクリプト</h1>
      <h2>スクリプト名</h2>
      <p><input type="text" class="text" v-model="key" /></p>
    </div>
    <div class="footer">
      <div class="button">
        <div @click="ok">OK</div>
        <div @click="cancel">キャンセル</div>
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
      key: "",
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
    ok() {
      if (this.key != "") {
        this.$emit("add", this.key);
      }
    },
    cancel() {
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss">
@import "../../assets/sass/components/Dialog";
</style>
