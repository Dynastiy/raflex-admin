<template>
  <div class="tw-bg-gray-100 lg:tw-px-8 md:tw-px-8 tw-px-0">
    <top-header />
    <div class="tw-bg-white lg:tw-shadow-lg md:tw-shadow-lg tw-shadow-sm tw-rounded-md ">
        <app-header />
      <slot />
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/Navigation/TopHeader.vue";
import AppHeader from '@/components/Navigation/AppHeader.vue';
export default {
  components: { TopHeader, AppHeader },
  name: "AppHomeLayout",
};
</script>
