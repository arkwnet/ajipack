<template>
  <div class="panel script">
    <div class="header">スクリプト管理</div>
    <div class="main scroll">
      <div class="list">
        <div v-for="key in keys" :key="key">
          <div v-if="key == selected">
            <div class="item selected">{{ key }}</div>
          </div>
          <div v-else>
            <div class="item">{{ key }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { defineComponent, shallowRef } from "vue";

export default defineComponent({
  data() {
    return {
      selected: "",
      keys: [],
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
    setKeys(keys) {
      this.keys = keys;
    },
    setSelected(selected) {
      this.selected = selected;
    },
  },
});
</script>

<style lang="scss">
@import "../assets/sass/Script";
</style>
