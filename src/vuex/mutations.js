import get from 'lodash/get';
import moment from 'moment';

function send(url, params) {
  const p = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest(); // eslint-disable-line no-undef
    req.open('GET', url, true);
    // req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // req.setRequestHeader('Accept', 'application/json, text/plain, */*');
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

function search(state) {
  state.loading = true;
  state.resultData = null;
  const url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010';
  const params = '{pref:13}';
  send(url, params).then((data) => {
    state.resultData = data;
  }).catch((err) => {
    console.log('Error!');
    console.log(err);
  });
  setTimeout(() => {
    state.loading = false;
  }, 2000);
}
function clickModalOverlay(state) { // eslint-disable-line no-unused-vars
  state.selectBtnViewFlag = !state.selectBtnViewFlag;
}

export default {
  SEARCH: search,
  CLICK_MODAL_OVERLAY: clickModalOverlay,
};
