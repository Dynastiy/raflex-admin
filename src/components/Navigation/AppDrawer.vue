<template>
  <div
    id="app-drawer"
    class="tw-flex tw-flex-col tw-justify-between tw-pt-6 tw-px-4 tw-py-4 tw-pb-12 tw-bg-secondary tw-z-20 tw-fixed tw-left-0 tw-top-0 tw-h-screen tw-overflow-auto tw-w-64"
  >
    <div>
      <div class="tw-flex tw-justify-center tw-text-white">
        <img src="@/assets/img/raflex-logo.png" class="tw-w-8" alt="" />
        <!-- <span class="tw-font-bold tw-text-xl">SamzugaGPT</span> -->
      </div>
      <hr class="tw-border-white tw-my-4 tw-border-2">

      <ul class="tw-pl-0 tw-flex tw-flex-col tw-gap-4 tw-mt-12">
        <li v-for="(item, index) in menu" :key="index">
          <div class="menu-item">
            <span
              role="button"
              class="tw-flex tw-justify-between tw-capitalize tw-text-semibold tw-block tw-p-3 tw-rounded-[4px] tw-text-[13px] hover:tw-bg-gray200 hover:tw-text-dark-300"
              @click="item.hasChildren ? openSubMenu(item) : goToLink(item)"
              :class="[
                item.parent === routeParent
                  ? 'tw-bg-white tw-text-dark-300'
                  : 'tw-text-white',
              ]"
            >
              <div class="tw-flex tw-items-center tw-gap-2">
                <i-icon
                  :icon="item.icon"
                  v-if="item.icon"
                  class="menu-item-icon"
                  width="16px"
                />
                <span class="tw-flex tw-flex-col">
                  <span
                    :class="item.header ? 'menu-title-header' : 'menu-title'"
                  >
                    {{ item.title }}
                  </span>
                </span>
              </div>
              <span v-if="item.hasChildren">
                <i-icon
                  :icon="
                    subMenu === item.title
                      ? 'prime:angle-down'
                      : 'prime:angle-right'
                  "
                  width="22px"
                />
              </span>
            </span>
            <div
              class="sub-menu tw-flex tw-flex-col tw-space-y-6 tw-mt-4 tw-ml-6"
              :class="[subMenu === item.title ? 'tw-block' : 'tw-hidden']"
            >
              <span
                role="button"
                class=""
                v-for="(subMenu, index) in item.children"
                :key="index"
                @click="$router.push(subMenu.url)"
              >
                <span
                  class="sub-menu-items tw-text-xs tw-flex tw-gap-2 tw-capitalize"
                  :class="[
                    subMenu.subItem === subMenuRouteName
                      ? 'tw-text-white tw-font-semibold'
                      : 'tw-text-gray-300',
                  ]"
                >
                  <i-icon
                    :icon="subMenu.icon"
                    class="menu-item-icon"
                    width="17px"
                  />
                  <span class="sub-menu-title"> {{ subMenu.title }} </span>
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="tw-text-white">
      <span
        @click="logout"
        role="button"
        class="menu-item-link tw-text-semibold tw-block tw-p-3 tw-rounded-lg tw-text-[13px] tw-text-white hover:tw-bg-gray200 hover:tw-text-dark-300"
      >
        <div class="tw-flex tw-items-center tw-space-x-3">
          <i-icon
            icon="material-symbols:logout"
            class="menu-item-icon"
            width="16px"
          />
          <span class="tw-flex tw-flex-col">
            <span> Logout </span>
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{
    menu: {
      type: Array,
      default: () => []    
    }
  },
  data() {
    return {
     
    };
  },

  methods: {
    goToLink(item) {
      this.$router.push(item.url).catch(() => {});
    },

    openSubMenu(item) {
      let value = this.subMenu === item.title ? null : item.title;
      this.$store.commit("drawer/SET_SUB_MENU", value);
    },

    collapseAppDrawer() {
      this.$store.dispatch("drawer/setCollapseState");
    },

    logout() {
      this.$swal
        .fire({
          title: "Uhhhh! 😔",
          text: "Are you sure you want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, logout!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.userLogout();
          }
        });
    },

    userLogout() {
      this.$store.dispatch("auth/logout");
      this.$swal
        .fire({
          title: "Woo hoo 😫",
          text: "Logged out succesfully",
          icon: "success",
          confirmButtonText: "Ok!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.$router.go();
          }
        });
    },
  },

  computed: {
    routeName() {
      return this.$route.meta.name;
    },

    subMenuRouteName() {
      return this.$route.meta.subName;
    },

    routeParent() {
      return this.$route.meta.parent;
    },

    user() {
      return this.$store.getters["auth/getUser"];
    },

    ...mapState("drawer", {
      isCollapsed: (state) => state.collapsed,
      subMenu: (state) => state.subMenu,
    }),
  },
};
</script>

<style></style>
