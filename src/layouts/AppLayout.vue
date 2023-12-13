<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppDefaultLayout";
export default {
  name: "AppLayout",
  mounted(){
    console.log(this.isOnline, "ommo");
  },

  watch: {
    
  },

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },

    isOnline(){
      return window.navigator
    }
  },
};
</script>
