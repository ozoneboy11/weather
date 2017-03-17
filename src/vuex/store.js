import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  locationCode: null,
  loading: false,
  resultData: null,
};

const store = new Vuex.Store({
  actions,
  mutations,
  state,
});

export default store;
