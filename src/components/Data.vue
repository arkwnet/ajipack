<template>
  <div class="panel data">
    <div class="header">データ管理</div>
    <div class="main scroll"></div>
    <div class="footer">
      <div class="button" id="button_add" @click="add()">
        <img src="../assets/img/add.svg" />
      </div>
      <div class="button" id="button_del" @click="del()">
        <img src="../assets/img/delete.svg" />
      </div>
    </div>
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
  methods: {
    add() {
      //
    },
    del() {
      //
    },
  },
});
</script>

<style lang="scss">
@import "../assets/sass/Data";
</style>
