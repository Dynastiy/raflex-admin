<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
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
            <span class="tw-capitalize tw-text-gray400">
              {{ start_case($route.meta.name) }}</span
            >
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-space-x-1">
          <!-- <span class="header-icon" role="button">
            <i-icon icon="ion:notifications-outline" />
          </span> -->

          <span class="d-flex align-items-center" style="gap: 5px">
            <span
              class="header-icon notifications font-weight-bolder text-uppercase"
              >ABB</span
            >
            <span class="text-capitalize" style="font-size: 14px">Helllllo</span>
          </span>
        </div>
      </div>
    </div>
    <div
      class="tw-cursor-pointer tw-py-4 tw-px-6 tw-bg-gray100 tw-flex tw-justify-end tw-items-center tw-list-none tw-text-gray2 tw-text-xs tw-font-medium tw-space-x-2"
    >
      <template>
        <router-link
          v-for="(link, index) in links"
          :to="link.path"
          v-slot="{ navigate }"
          :key="index"
        >
          <a
            @click="navigate(link.path)"
            :key="index"
            class="tw-py-2 tw-px-4 tw-no-underline tw-rounded-lg tw-border hover:tw-bg-gray200"
            :class="[
              isActive === link.label
                ? 'tw-bg-primary tw-text-white'
                : 'tw-bg-gray400 tw-text-dark-100',
            ]"
            >{{ link.label }}</a
          >
        </router-link>
      </template>
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
  },

  methods: {
    start_case(value) {
      return startCase(value);
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
  },
};
</script>

<style scoped></style>
