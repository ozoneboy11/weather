function clickSelect(store) {
  store.commit('CLICK_SELECT', true);
}
function clickAction(store, action) {
  store.commit('CLICK_ACTION', action);
}
function search(store) {
  store.commit('SEARCH', true);
}
function clickModalOverlay(store) {
  store.commit('CLICK_MODAL_OVERLAY', true);
}
function reload(store) {
  store.commit('RELOAD', true);

  // const state = store.state;
  // const { active, asc, desc } = state;
}

export default {
  clickSelect,
  clickAction,
  search,
  clickModalOverlay,
  reload,
};
