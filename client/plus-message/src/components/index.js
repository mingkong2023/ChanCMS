import {createApp} from 'vue';
import Message from "./Message/Message.vue";
window.CHAN = {
  message: (id, props) => {
    createApp(Message, props).mount(id);
  }
};
