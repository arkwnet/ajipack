<template>
  <div class="editor">
    <codemirror
      v-model="code"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
    />
  </div>
</template>

<script>
import { defineComponent, shallowRef } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default defineComponent({
  components: {
    Codemirror,
  },
  data() {
    return {
      code: "function setup() {\n}\n\nfunction loop() {\n}",
    };
  },
  setup() {
    const extensions = [javascript()];
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };
    return {
      extensions,
      handleReady,
      log: console.log,
    };
  },
  methods: {
    clear() {
      this.code = "";
    },
    get() {
      return this.code;
    },
    set(code) {
      this.code = code;
    },
  },
});
</script>

<style lang="scss">
@import "../assets/sass/Editor";
</style>
