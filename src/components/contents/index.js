import moment from 'moment';
import store from '../../vuex/store';

moment.locale('ja', { weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'] });

export default {
  name: 'contentsArea',
  data: () => { // eslint-disable-line arrow-body-style
    return store.state;
  },
  methods: {
    clickAction: (action) => {
      store.dispatch('clickAction', action);
    },
    reload: () => {
      store.dispatch('reload');
    },
    getDate(date) {
      return moment(date).format('YYYY年MM月DD日(ddd) HH:mm:ss');
    },
    getParams(record) {
      console.log(store.state.action);
      if (store.state.action === 'statusChangeAdGroup') {
        const recordObject = JSON.parse(record._source.fields.veriables); // eslint-disable-line no-underscore-dangle, max-len
        return recordObject.adGroupAndActiveStatus[0].active_flag ? '有効にした' : '無効にした';
      } else if (store.state.action === 'updateAccountBudgets') {
        console.log(record._source.fields.query.replace('mutation', '')); // eslint-disable-line no-underscore-dangle, max-len
        const recordObject = JSON.parse(record._source.fields.query.replace('mutation', '')); // eslint-disable-line no-underscore-dangle, max-len
        console.log(recordObject);
        return recordObject.adGroupAndActiveStatus[0].active_flag ? '有効にした' : '無効にした';
      }
      return '';
    },
  },
};
