<template>
  <Editor ref="refEditor" />
  <Script
    ref="refScript"
    @change="scriptChange"
    @add="scriptAdd"
    @delete="scriptDelete"
  ></Script>
  <Data ref="refData" @add="dataAdd" @delete="dataDelete"></Data>
  <Preview ref="refPreview" @play="previewPlay"></Preview>
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
    const refPreview = ref(null);
    return {
      refEditor,
      refScript,
      refData,
      refPreview,
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
    this.previewPlay();
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
      this.previewPlay();
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
        data: this.generatePackage(),
      });
    },
    generatePackage() {
      let data = "";
      if (this.data.data.length >= 1) {
        data += "const ajiData = [";
        for (let i = 0; i < this.data.data.length; i++) {
          data +=
            '{ id: "' +
            this.data.data[i].name +
            '", data: "' +
            this.data.data[i].base64 +
            '"}';
        }
        data += "];\n";
      }
      const keys = Object.keys(this.data.code);
      for (let i = 0; i < keys.length; i++) {
        data += this.data["code"][keys[i]] += "\n";
      }
      return data;
    },
    initData() {
      this.data = {
        version: 1,
        code: { main: "" },
        data: [],
      };
      this.script = "main";
      this.scriptUpdate();
      this.dataUpdate();
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
          this.dataUpdate();
          this.previewPlay();
          break;
        case "preview":
          this.refPreview.update(data.data);
          break;
        case "data":
          this.data.data.push();
          for (let i = 0; i < this.data.data.length; i++) {
            if (this.data.data[i].name == data.data.name) {
              alert("既に同名のデータが存在します");
              break;
            }
          }
          if (this.data["data"][data.data.name] == undefined) {
            this.data.data.push({
              name: data.data.name,
              type: data.data.type,
              base64: data.data.base64,
            });
            this.dataUpdate();
          }
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
      this.scriptChange("main");
      delete this.data["code"][key];
      this.scriptUpdate();
    },
    dataUpdate() {
      this.refData.setFiles(this.data.data);
      this.refData.setSelected("");
    },
    dataAdd() {
      ipcRenderer.send("addData", null);
    },
    dataDelete(key) {
      for (let i = 0; i < this.data.data.length; i++) {
        if (this.data.data[i].name == key) {
          this.data.data.splice(i, 1);
          break;
        }
      }
      this.dataUpdate();
    },
    previewPlay() {
      this.data["code"][this.script] = this.refEditor.get();
      ipcRenderer.send("exportPreview", {
        data: this.generatePackage(),
      });
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
