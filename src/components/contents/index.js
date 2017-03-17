import moment from 'moment';
import numeral from 'numeral';
import store from '../../vuex/store';

moment.locale('ja', { weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'] });

export default {
  name: 'contentsArea',
  data: () => { // eslint-disable-line arrow-body-style
    return store.state;
  },
  methods: {
    getDate(date) {
      return moment(date).format('YYYY年MM月DD日(ddd) HH:mm:ss');
    },
    getNum(num) {
      return numeral(num).format('0,0');
    },
    getMonthlyBudget() {
    },
    getDailyBudget() {
    },
  },
};
