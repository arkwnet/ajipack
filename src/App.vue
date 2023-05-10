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
    ipcRenderer.on("message", (e, data) => {
      this.onMessage(data);
    });
    ipcRenderer.on("test", () => {
      this.test();
    });
  },
  methods: {
    newProject() {
      this.filePath = "";
      this.initData();
      this.editor.clear();
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
          break;
        case "project":
          this.data = data.data;
          this.editor.set(this.data.code.main);
          break;
      }
    },
    test() {
      ipcRenderer.send("test", "Hello, world!");
    },
  },
};
</script>
