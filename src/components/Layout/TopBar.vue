<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="tw-bg-white tw-shadow">
    <div class="tw-relative tw-bg-white tw-py-4 tw-px-6">
      <div
        class="tw-flex tw-items-center tw-justify-between overflow-auto sm:tw-whitespace-nowrap"
      >
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <div
            class="tw-font-semibold sm:tw-text-xs lg:tw-text-base sm:tw-mr-3 lg:tw-mr-0 tw-capitalize"
          >
            <span class="tw-uppercase">
              {{ $route.meta.parent.split("-")[0] }}
              <span class="tw-text-dark-100"> - </span>
            </span>
            <span class="tw-capitalize">
              {{ start_case($route.meta.name) }}</span
            >
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-gap-5" >

          <span class="tw-flex tw-flex-col tw-items-end">
            <span class="text-capitalize tw-text-[14px] tw-font-semibold"> Raflex Admin </span>
            <div class="tw-text-white">
              <span
                @click="logout"
                role="button"
                class="menu-item-link tw-text-semibold tw-block tw-rounded-lg tw-text-[13px] tw-text-red-500"
              >
                <div class="tw-flex tw-items-center tw-gap-1">
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
          </span>
          <span role="button" @click="drawer = !drawer" class="lg:tw-hidden md:tw-hidden tw-block">
              <i-icon icon="grommet-icons:menu" width="25px" />
            </span>
        </div>
      </div>
    </div>

    <div class="">
      <el-drawer
        :with-header="false"
        :visible.sync="drawer"
        direction="rtl"
        size="80%"
      >
      <div class="tw-h-full tw-bg-primary">
        <div class="tw-flex tw-p-8 tw-justify-end tw-mb-8 tw-bg-dark-400 tw-shadow">
          <span @click="drawer = !drawer" role="button">
            <i-icon icon="codicon:close" class="tw-text-white" width="25px" />
          </span>
        </div>
        <ul class="tw-p-0 tw-flex tw-flex-col tw-space-y-3">
          <li class="" v-for="item in menu" :key="item?.id">
            <router-link
            :class="[
                item.parent === routeParent
                  ? 'tw-bg-white tw-text-dark-300'
                  : 'tw-text-white',
              ]"
              class="tw-px-8 tw-flex tw-gap-3 tw-items-center tw-py-4 tw-text-[13px] tw-uppercase tw-block tw-no-underline tw-font-normal tw-tracking-widest"
              :to="item?.url"
            >
              <i-icon :icon="item?.icon" class="tw-text-lg" />
              <span>{{ item?.title }}</span></router-link
            >
          </li>
        </ul>
      </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { startCase, split } from "lodash";
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    menu: {
      type: Array,
      default: () => []    
    }
  },

  data(){
    return {
      drawer: false
    }
  },

  methods: {
    start_case(value) {
      return startCase(value);
    },

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

    structureTitle() {
      const splitArr = split(this.$route.name, "-");
      if (splitArr.length > 0) {
        splitArr.shift();
      }

      // console.log(splitArr);
      splitArr.forEach((element) => {
        // console.log(startCase(element));
        element = this.start_case(element);
        console.log(element);
        // console.log(startCase(element))
      });
      console.log(splitArr);
      return splitArr.join(" - ");
    },
  },

  computed: {
    isActive() {
      return this.$route.meta.subName;
    },

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
  },
};
</script>

<style scoped></style>
