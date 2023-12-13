<template>
    <div>
      <div>
        <el-radio-group v-model="channel" @change="changeFilter">
          <el-radio-button
            v-for="(tab, idx) in tabs"
            :key="idx"
            :label="tab.label"
            >{{ tab.title }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tabs: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        channel: "",
      };
    },
  
    methods: {
      changeFilter() {
        this.$emit("filter-changed", this.channel);
      },
    },
  
    watch: {},
  };
  </script>
  
  <style></style>
  