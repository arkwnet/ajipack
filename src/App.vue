<template>
  <Editor ref="editor" />
  <Script></Script>
  <Data></Data>
  <Preview></Preview>
</template>

<script>
import { ref } from "vue";
import { ipcRenderer } from "electron";
import Editor from "./components/Editor.vue";
import Script from "./components/Script.vue";
import Data from "./components/Data.vue";
import Preview from "./components/Preview.vue";

export default {
  name: "App",
  components: {
    Editor,
    Script,
    Data,
    Preview,
  },
  data() {
    return {
      data: null,
      filePath: "",
    };
  },
  setup() {
    const editor = ref(null);
    return {
      editor,
    };
  },
  mounted() {
    this.initData();
    ipcRenderer.on("newProject", () => {
      this.newProject();
    });
    ipcRenderer.on("openProject", () => {
      this.openProject();
    });
    ipcRenderer.on("saveProject", () => {
      this.saveProject();
    });
    ipcRenderer.on("saveAsProject", () => {
      this.saveAsProject();
    });
    ipcRenderer.on("exportProject", () => {
      this.exportProject();
    });
    ipcRenderer.on("message", (e, data) => {
      this.onMessage(data);
    });
    ipcRenderer.on("test", () => {
      this.test();
    });
    this.updateTitle();
  },
  methods: {
    newProject() {
      this.filePath = "";
      this.initData();
      this.editor.clear();
      this.updateTitle();
    },
    openProject() {
      ipcRenderer.send("openProject", null);
    },
    saveProject() {
      this.data.code.main = this.editor.get();
      ipcRenderer.send("saveProject", {
        filePath: this.filePath,
        data: JSON.stringify(this.data),
      });
    },
    saveAsProject() {
      this.data.code.main = this.editor.get();
      ipcRenderer.send("saveProject", {
        filePath: "",
        data: JSON.stringify(this.data),
      });
    },
    exportProject() {
      this.data.code.main = this.editor.get();
      ipcRenderer.send("exportProject", {
        data: this.data.code.main,
      });
    },
    initData() {
      this.data = {
        version: 1,
        code: { main: "" },
      };
    },
    onMessage(data) {
      switch (data.type) {
        case "filePath":
          this.filePath = data.data;
          this.updateTitle();
          break;
        case "project":
          this.data = data.data;
          this.editor.set(this.data.code.main);
          break;
      }
    },
    updateTitle() {
      let fp;
      if (this.filePath == "") {
        fp = "無題";
      } else {
        fp = this.filePath;
      }
      document.title = fp + " - Ajipack Studio";
    },
    test() {
      ipcRenderer.send("test", "Hello, world!");
    },
  },
};
</script>

<style lang="scss">
@import "./assets/sass/App";
</style>
