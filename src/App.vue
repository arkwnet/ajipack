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
    ipcRenderer.on("test", () => {
      this.test();
    });
  },
  methods: {
    newProject() {
      this.editor.clear();
    },
    test() {
      ipcRenderer.send("test", "Hello, world!");
    },
  },
};
</script>
