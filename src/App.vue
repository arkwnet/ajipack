<template>
  <Editor />
</template>

<script>
import { ipcRenderer } from "electron";
import Editor from "./components/Editor.vue";

export default {
  name: "App",
  components: {
    Editor,
  },
  mounted() {
    ipcRenderer.on("test", () => {
      this.test();
    });
  },
  methods: {
    test() {
      ipcRenderer.send("test", "Hello, world!");
    },
  },
};
</script>
