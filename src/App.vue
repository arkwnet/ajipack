<template>
  <Editor />
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  name: "App",
  components: {
    Editor,
  },
  methods: {
    test() {
      return "Hello, world!";
    },
  },
};
</script>
