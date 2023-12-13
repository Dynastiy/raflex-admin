/* eslint-disable no-undef */
// import Vue from "vue";
import $request from "@/https/axios";

import $middleware from "@/https/middleware";

import toastify from "toastify-js";

const getDefaultState = () => {
  return {
    transactions: [],
    loading: false
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    getTransactions: (state) => state.transactions,
    getLoading: (state) => state.loading
  },

  mutations: {
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
      state.loading = false;
    },

    SET_LOADING(state, payload) {
      state.loading = payload;
    },

    async LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.clear();
    },

    RESET(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], null);
      });
    },
  },
  actions: {
    // List Transactions
    list({ commit }, { meta_key, page, txn_type, per_page, order }) {
      commit("SET_LOADING", true);
      $request
        .get(
          `/transactions?meta_key=${meta_key}&meta_value=${txn_type}&order=${order}&pageno=${page}&posts_per_page=${per_page}&&metas_to_retrieve=transaction_type_category,balance_before,balance_after,transaction_approval_status`
        )
        .then((res) => {
          console.log(res);
          commit("SET_TRANSACTIONS", res.data.data);
        })
        .catch((err) => {
          console.log(err);
          commit("SET_LOADING", false);
        });
    },

    // Change Status
    updateStatus({ dispatch }, payload) {
      $middleware
        .put(`/payments/${payload.id}/${payload.action}`)
        .then((res) => {
          console.log(res);
          toastify({
            text: `${res.data.message}`,
            className: "info",
            position: "center",
            style: {
              background: "green",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
          dispatch("list", { page: payload.page, txn_type: payload.txn_type });
        })
        .catch((err) => {
          console.log(err);
          toastify({
            text: `${err.data.message}`,
            className: "info",
            position: "center",
            style: {
              background: "red",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
        });
    },
  },
};
