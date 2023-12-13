import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

import "@/assets/css/style.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

// Plugins
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import { Icon } from "@iconify/vue2";

Vue.component("i-icon", Icon);

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});

Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);


import VueToast from 'vue-toast-notification';
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

Vue.use(VueToast);

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// import services from "./services.js";

import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

import $request from "@/https/axios"
Vue.prototype.$request = $request

import toastify from "toastify-js";
import "toastify-js/src/toastify.css"
Vue.prototype.$toastify = toastify

import { VueEditor } from "vue2-editor";
Vue.component("v-editor", VueEditor);

// vue-sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2, {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
  reverseButtons: false,
  buttonsStyling: true,
  customClass: {
    confirmButton: "tw-bg-green-600 tw-text-white tw-py-3",
    cancelButton: "tw-bg-red-600 tw-text-white tw-py-3",
  },
});

// Filters 
Vue.filter("formatCurrency", function (value) {
  if (!value) return "";
  value = Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
  });
  return value;
});

Vue.filter("formatDate", function (value) {
  if (!value) return "";
  let date = new Date(value);
  value = moment(String(date)).format("MMM DD, YYYY");
  return value;
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
