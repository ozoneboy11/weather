import store from '../../vuex/store';

import HeaderArea from '../../components/header/index.vue';
import SearchArea from '../../components/search/index.vue';
import ContentsArea from '../../components/contents/index.vue';

export default {
  name: 'app',
  components: {
    HeaderArea,
    SearchArea,
    ContentsArea,
  },
  data: () => { // eslint-disable-line arrow-body-style
    return store.state;
  },
  methods: {
    clickModalOverlay: () => {
      store.dispatch('clickModalOverlay');
    },
  },
};
