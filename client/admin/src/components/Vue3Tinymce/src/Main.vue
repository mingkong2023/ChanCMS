<template>
  <div :id="state.id" class="tiny-textarea"></div>
  <p v-if="state.err">{{ state.err }}</p>
</template>

<script>
export default {
  name: 'Vue3Tinymce',
};
</script>

<script setup>
import {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from 'vue';

import {
  uuid,
  getTinymce,
  getContent,
  setContent,
  resetContent,
  setModeDisabled,
  getContentStyle,
  imageUploadHandler,
} from '../utils';

import { scriptLoader } from '../scriptLoader';

const props = defineProps({
  modelValue: String,
  setting: { type: Object, default: () => ({}) },
  setup: Function,
  disabled: Boolean,
  scriptSrc: String,
  debug: Boolean,
});

const emit = defineEmits(['update:modelValue', 'init', 'change']);

let mounting = true;

const state = reactive({
  editor: null,
  id: uuid('tinymce'),
  err: '',
});

const getModelValue = () => String(props.modelValue ?? '');

const updateValue = (val) => emit('update:modelValue', val);

const printLog = (e, val, oldVal) => {
  if (!props.debug) return;
  console.log(`来自：${e.type} | \n ${val} \n ${oldVal || '--'}`);
};

const onChanged = (e, editor) => {
  if (!editor) editor = state.editor;

  const content = getContent(editor);
  printLog(e, content);

  updateValue(content);
  emit('change', content);
};

const onInited = (editor) => {
  setContent(getModelValue(), editor);

  if (props.disabled && editor.mode.get() !== 'readonly') {
    setModeDisabled(editor);
  }

  // change input undo redo keyup
  editor.on('change input undo redo', (e) => {
    onChanged(e, editor);
  });

  emit('init', editor);
};

const initEditor = () => {
  if (getTinymce() === null) {
    state.err = 'tinymce is null';
    return;
  }

  if (props.debug) {
    console.warn('vue3-tinymce 进入debug模式');
  }

  let setting = {
    ...props.setting,
    selector: `#${state.id}`,
    content_style: getContentStyle(props.setting?.content_style),
    setup: (editor) => {
      state.editor = editor;
      if (props.setup) props.setup(editor);
      editor.on('init', () => onInited(editor));
    },
  };

  // custom_images_upload true
  if (props.setting.custom_images_upload) {
    setting.images_upload_handler = (...arg) => {
      return imageUploadHandler.apply(null, [props.setting, ...arg]);
    };
  }

  getTinymce().init(setting);
  mounting = false;
};

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (!state.editor || !state.editor.initialized) return;
    if (oldVal === val || val === getContent(state.editor)) return;

    printLog({ type: 'propsChanged to setContent' }, val, oldVal);

    if (val === null) return resetContent('', state.editor);
    setContent(getModelValue(), state.editor);
  }
);

watch(
  () => props.disabled,
  (val) => {
    if (!state.editor || !state.editor.initialized) return;
    setModeDisabled(state.editor, val);
  }
);

defineExpose({
  id: state.id,
  editor: state.editor,
});

onMounted(() => {
  if (getTinymce() !== null) {
    initEditor();
    return;
  }

  const scriptSrc =
    props.scriptSrc ??
    'https://cdn.bootcdn.net/ajax/libs/tinymce/6.1.2/tinymce.min.js';
  scriptLoader.load(scriptSrc, initEditor);
});

onActivated(() => {
  if (!mounting) initEditor();
});

onDeactivated(() => {
  if (!state.editor) return;
  // state.editor.remove();
  getTinymce()?.remove(`#${state.id}`);
});

onBeforeUnmount(() => {
  if (!state.editor) return;
  getTinymce()?.remove(`#${state.id}`);
});
</script>
