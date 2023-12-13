import Vue from "vue";
import Vuex from "vuex";

// Modules
import drawer from "./drawer"

import auth from "./modules/auth"
import user from "./modules/user"

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    drawer,
    auth,
    user
  },
});
