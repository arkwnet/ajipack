<template>
  <div class="panel data">
    <div class="header">データ管理</div>
    <div class="main scroll">
      <div class="list">
        <div v-for="file in files" :key="file.name" @click="click(file.name)">
          <div v-if="file.name == selected">
            <div class="item selected">
              <div class="icon"><img :src="file.base64" /></div>
              <div class="text">{{ file.name }}</div>
            </div>
          </div>
          <div v-else>
            <div class="item">
              <div class="icon"><img :src="file.base64" /></div>
              <div class="text">{{ file.name }}</div>
            </div>
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
  data() {
    return {
      selected: "",
      files: [],
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
    setFiles(files) {
      this.files = files;
    },
    setSelected(selected) {
      this.selected = selected;
    },
    click(key) {
      this.selected = key;
    },
    add() {
      this.$emit("add");
    },
    del() {
      const value = window.confirm(
        "データ " + this.selected + " を削除しますか?"
      );
      if (value == true) {
        this.$emit("delete", this.selected);
      }
    },
  },
});
</script>

<style lang="scss">
@import "../assets/sass/Data";
</style>
