import Vue from 'vue/dist/vue';
import App from '../components/app/index.vue';
import store from '../vuex/store';

Vue.config.devtools = true;

new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});
