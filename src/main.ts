import { createApp } from 'vue';
import { createI10n } from './composables';
import messages from './locales';
import App from './App.vue';
import config from './config.yaml';

import 'reset-css';
import './styles/main.scss';

createI10n({
  messages,
  dateFormat: config.formats.DATE,
  timeFormat: config.formats.TIME,
});

const app = createApp(App);
app.mount('#app');
