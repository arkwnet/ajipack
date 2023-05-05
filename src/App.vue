<template>
  <Editor ref="editor" />
</template>

<script>
import { ref } from "vue";
import { ipcRenderer } from "electron";
import Editor from "./components/Editor.vue";

export default {
  name: "App",
  components: {
    Editor,
  },
  setup() {
    const editor = ref(null);
    return {
      editor,
    };
  },
  mounted() {
    ipcRenderer.on("newProject", () => {
      this.newProject();
    });
    ipcRenderer.on("saveAsProject", () => {
      this.saveAsProject();
    });
    ipcRenderer.on("test", () => {
      this.test();
    });
  },
  methods: {
    newProject() {
      this.editor.clear();
    },
    saveAsProject() {
      ipcRenderer.send("saveAsProject", { version: "1" });
    },
    test() {
      ipcRenderer.send("test", "Hello, world!");
    },
  },
};
</script>
