import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Validate from './directives/validate';

Vue.config.productionTip = false;

Vue.use(Validate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
