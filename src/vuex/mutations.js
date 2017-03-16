import moment from 'moment';
import get from 'lodash/get';

function send(url, params) {
  const p = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest(); // eslint-disable-line no-undef
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.setRequestHeader('Accept', 'application/json, text/plain, */*');
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200 || req.status === 304) {
          const jsonData = JSON.parse(req.responseText);
          resolve(get(jsonData, 'responses[0].hits.hits', null));
        }
        reject({
          status: req.status,
          statusText: req.statusText,
        });
      }
    };
    req.send(params);
  });
  return p;
}

function clickSelect(state) {
  state.selectBtnViewFlag = !state.selectBtnViewFlag;
}
function clickAction(state, action) {
  state.action = action;
  state.actionLabel = '未選択';
  state.actionList.forEach((act) => {
    if (act.code === action) {
      state.actionLabel = act.label;
    }
  });
  state.selectBtnViewFlag = !state.selectBtnViewFlag;
}
function search(state) {
  const url = 'https://search-glasgow-es-aynbsjcvdv5ootyfiz2jlg7qwe.ap-northeast-1.es.amazonaws.com/prd.resource_server.*/_msearch?timeout=0&preference=1487726160766';
  let veriables = '';
  let params = '';
  console.log(state.action);
  if (state.action === 'statusChangeAdGroup') {
    veriables = `ad_group_id:${state.adGroupId}`;
    params = `{"ignore_unavailable":true}\n{"size":500,"sort":{"@timestamp":"desc"},"query":{"filtered":{"query":{"query_string":{"query":"type:\\"mutation\\" AND (fields.mutations:\\"updateAdGroupsActiveFlags\\") AND (fields.veriables:\\"${veriables}\\")","analyze_wildcard":true}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"gte":1479964473725,"lte":1487740473725}}}],"must_not":[]}}}},"highlight":{"pre_tags":["@kibana-highlighted-field@"],"post_tags":["@/kibana-highlighted-field@"],"fields":{"*":{}},"fragment_size":2147483647},"aggs":{"2":{"date_histogram":{"field":"@timestamp","interval":"1d","pre_zone":"+09:00","pre_zone_adjust_large_interval":true,"min_doc_count":0,"extended_bounds":{"min":1479964473725,"max":1487740473725}}}},"fields":["*","_source"],"script_fields":{},"fielddata_fields":["@timestamp"]}\n`; // eslint-disable-line quotes
  } else if (state.action === 'updateAccountBudgets') {
    veriables = `advertiser_id:${state.advertiserId}`;
    params = `{"ignore_unavailable":true}\n{"size":500,"sort":{"@timestamp":"desc"},"query":{"filtered":{"query":{"query_string":{"query":"type:\\"mutation\\" AND (fields.mutations:\\"updateAccountBudgets\\")AND(fields.query:\\"${veriables}\\")","analyze_wildcard":true}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"gte":1481633246754,"lte":1489409246754}}}],"must_not":[]}}}},"highlight":{"pre_tags":["@kibana-highlighted-field@"],"post_tags":["@/kibana-highlighted-field@"],"fields":{"*":{}},"fragment_size":2147483647},"aggs":{"2":{"date_histogram":{"field":"@timestamp","interval":"1d","pre_zone":"+09:00","pre_zone_adjust_large_interval":true,"min_doc_count":0,"extended_bounds":{"min":1481633246753,"max":1489409246753}}}},"fields":["*","_source"],"script_fields":{},"fielddata_fields":["@timestamp"]}\n`; // eslint-disable-line quotes
  }
  send(url, params).then((data) => {
    state.resultData = data;
  }).catch((err) => {
    console.log('Error!');
    console.log(err);
  });
}
function clickModalOverlay(state) { // eslint-disable-line no-unused-vars
  state.selectBtnViewFlag = !state.selectBtnViewFlag;
}
function reload(state) { // eslint-disable-line no-unused-vars
  console.log('🐥');
  console.log(moment('2017-02-21T02:41:37.926Z').format('YYYY年MM月DD日 HH:mm:ss(ddd)'));
}

export default {
  CLICK_SELECT: clickSelect,
  CLICK_ACTION: clickAction,
  SEARCH: search,
  CLICK_MODAL_OVERLAY: clickModalOverlay,
  RELOAD: reload,
};
