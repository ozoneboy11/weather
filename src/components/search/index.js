import store from '../../vuex/store';

export default {
  name: 'searchArea',
  data: () => { // eslint-disable-line arrow-body-style
    return store.state;
  },
  methods: {
    clickSelect: () => {
      store.dispatch('clickSelect');
    },
    clickAction: (action) => {
      store.dispatch('clickAction', action);
    },
    search: () => {
      store.dispatch('search');
    },
  },
};
