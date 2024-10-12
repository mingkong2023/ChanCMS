<template>
  <div>
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { createEditor } from "vue-codemirror";

export default {
  components: {
    codemirror: createEditor({
      options: {
        mode: "htmlmixed",
        theme: "material",
        lineNumbers: true,
      },
    }),
  },
  mounted() {
    const textarea = this.$refs.textarea;
    this.$refs.codemirror.editor.swapDoc(
      CodeMirror.fromTextArea(textarea, {
        mode: "htmlmixed",
        theme: "material",
        lineNumbers: true,
      }).getDoc(),
    );
  },
};
</script>
