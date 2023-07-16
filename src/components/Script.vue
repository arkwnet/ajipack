<template>
  <div class="panel script">
    <div class="header">スクリプト管理</div>
    <div class="main scroll">
      <div class="list">
        <div v-for="key in keys" :key="key" @click="click(key)">
          <div v-if="key == selected">
            <div class="item selected">{{ key }}</div>
          </div>
          <div v-else>
            <div class="item">{{ key }}</div>
          </div>
        </div>
      </div>
    </div>
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
  emits: [],
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
    click(key) {
      if (key != this.selected) {
        this.$emit("scriptChange", key);
      }
    },
    add() {
      this.$emit("scriptAdd");
    },
    del() {
      if (this.selected != "main") {
        const value = window.confirm(
          this.selected + " スクリプトを削除しますか?"
        );
        if (value == true) {
          this.$emit("scriptDelete", this.selected);
        }
      } else {
        alert("main スクリプトは削除できません");
      }
    },
  },
});
</script>

<style lang="scss">
@import "../assets/sass/Script";
</style>
