/* eslint-disable no-undef */

const getDefaultState = () => {
    return {
      collapsed: false,
      subMenu: null
    };
  };
  
  export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {
      isCollapsed: (state) => state.collapsed,
      subMenu: (state) => state.subMenu
    },
  
    mutations: {
      SET_COLLAPSE_STATE(state, payload) {
        state.collapsed = payload;
      },
      SET_SUB_MENU(state, payload) {
        state.subMenu = payload;
      },
    },
    actions: {
      setCollapseState({ state, commit }) {
        let value = state.collapsed ? false : true;
        commit("SET_COLLAPSE_STATE", value);
      },
    },
  };