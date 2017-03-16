import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  actionList: [
    { code: 'removeAdGroup', label: '広告グループ削除' },
    { code: 'statusChangeCampaign', label: 'キャンペーン [有効/無効] 切り替え' },
    { code: 'statusChangeAdGroup', label: '広告グループ [有効/無効] 切り替え' },
    { code: 'updateAccountBudgets', label: '月予算の更新' },
  ],
  action: null,
  actionLabel: '未選択',
  advertiserId: null,
  campaignId: null,
  adGroupId: null,
  selectBtnViewFlag: false,
  loading: false,
  resultData: null,
};

const store = new Vuex.Store({
  actions,
  mutations,
  state,
});

export default store;
