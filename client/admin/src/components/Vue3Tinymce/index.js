import Vue3Tinymce from './src/Main.vue';

Vue3Tinymce.install = function (app) {
  app.component('Vue3Tinymce', Vue3Tinymce);
};

export default Vue3Tinymce;
