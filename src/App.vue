<template>
  <Editor ref="refEditor" />
  <Script
    ref="refScript"
    @scriptChange="scriptChange"
    @scriptAdd="scriptAdd"
    @scriptDelete="scriptDelete"
  ></Script>
  <Data ref="refData"></Data>
  <Preview></Preview>
  <Cover v-if="isCover"></Cover>
  <ScriptDialog
    v-if="isScriptDialog"
    @add="dialogScriptAdd"
    @close="dialogScriptClose"
  ></ScriptDialog>
</template>

<script>
import { ref } from "vue";
import { ipcRenderer } from "electron";
import Editor from "./components/Editor.vue";
import Script from "./components/Script.vue";
import Data from "./components/Data.vue";
import Preview from "./components/Preview.vue";
import Cover from "./components/Cover.vue";
import ScriptDialog from "./components/Dialog/ScriptDialog.vue";

export default {
  name: "App",
  components: {
    Editor,
    Script,
    Data,
    Preview,
    Cover,
    ScriptDialog,
  },
  data() {
    return {
      data: null,
      filePath: "",
      script: "",
      isCover: false,
      isScriptDialog: false,
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
      this.scriptUpdate();
      ipcRenderer.send("saveProject", {
        filePath: this.filePath,
        data: JSON.stringify(this.data),
      });
    },
    saveAsProject() {
      this.scriptUpdate();
      ipcRenderer.send("saveProject", {
        filePath: "",
        data: JSON.stringify(this.data),
      });
    },
    exportProject() {
      this.scriptUpdate();
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
      this.scriptUpdate();
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
          this.scriptUpdate();
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
    scriptChange(key) {
      this.scriptUpdate();
      if (this.script != key) {
        this.script = key;
        this.refEditor.set(this.data["code"][this.script]);
        this.scriptUpdate();
      }
    },
    scriptUpdate() {
      this.data["code"][this.script] = this.refEditor.get();
      this.refScript.setKeys(Object.keys(this.data.code));
      this.refScript.setSelected(this.script);
    },
    scriptAdd() {
      this.isCover = true;
      this.isScriptDialog = true;
    },
    scriptDelete(key) {
      delete this.data["code"][key];
      this.scriptChange("main");
      this.scriptUpdate();
    },
    dialogScriptAdd(key) {
      if (this.data["code"][key] == undefined) {
        this.data["code"][key] = "";
        this.scriptChange(key);
        this.scriptUpdate();
        this.dialogScriptClose();
      }
    },
    dialogScriptClose() {
      this.isCover = false;
      this.isScriptDialog = false;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/sass/App";
</style>
