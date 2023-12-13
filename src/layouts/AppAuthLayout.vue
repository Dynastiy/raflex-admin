<template>
  <div class="tw-p-6 tw-flex tw-justify-center tw-items-center tw-h-screen">
    <div class="tw-bg-white lg:tw-w-4/12 md:tw-w-5/12 tw-w-full tw-py-5 tw-px-8">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>
