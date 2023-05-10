import { createApp } from 'vue';
import { createI10n } from './composables';
import messages from './locales';
import App from './App.vue';

import 'reset-css';
import './styles/main.scss';

createI10n({ messages });

const app = createApp(App);
app.mount('#app');
