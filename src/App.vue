<template>
  <Editor ref="refEditor" />
  <Script ref="refScript" @changeScript="changeScript"></Script>
  <Data ref="refData"></Data>
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
      script: "",
    };
  },
  setup() {
    const refEditor = ref(null);
    const refScript = ref(null);
    const refData = ref(null);
    return {
      refEditor,
      refScript,
      refData,
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
    test() {
      ipcRenderer.send("test", "Hello, world!");
    },
    newProject() {
      this.filePath = "";
      this.initData();
      this.refEditor.clear();
      this.updateTitle();
    },
    openProject() {
      ipcRenderer.send("openProject", null);
    },
    saveProject() {
      this.data.code.main = this.refEditor.get();
      ipcRenderer.send("saveProject", {
        filePath: this.filePath,
        data: JSON.stringify(this.data),
      });
    },
    saveAsProject() {
      this.data.code.main = this.refEditor.get();
      ipcRenderer.send("saveProject", {
        filePath: "",
        data: JSON.stringify(this.data),
      });
    },
    exportProject() {
      this.data.code.main = this.refEditor.get();
      ipcRenderer.send("exportProject", {
        data: this.data.code.main,
      });
    },
    initData() {
      this.data = {
        version: 1,
        code: { main: "" },
      };
      this.script = "main";
      this.updateScriptPanel();
    },
    onMessage(data) {
      switch (data.type) {
        case "filePath":
          this.filePath = data.data;
          this.updateTitle();
          break;
        case "project":
          this.data = data.data;
          this.refEditor.set(this.data.code.main);
          this.script = "main";
          this.updateScriptPanel();
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
    changeScript(key) {
      if (this.script != key) {
        this.script = key;
        this.refEditor.set(this.data["code"][this.script]);
        this.updateScriptPanel();
      }
    },
    updateScriptPanel() {
      this.refScript.setKeys(Object.keys(this.data.code));
      this.refScript.setSelected(this.script);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/sass/App";
</style>
