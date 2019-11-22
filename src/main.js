import Vue from 'vue';
import Validate from '@seunghyum/v-validate';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Validate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
