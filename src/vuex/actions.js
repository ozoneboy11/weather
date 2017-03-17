function search(store) {
  store.commit('SEARCH', true);
}
function clickModalOverlay(store) {
  store.commit('CLICK_MODAL_OVERLAY', true);
}

export default {
  search,
  clickModalOverlay,
};
