<template>
  <div class="tw-mt-2">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="tab.title"
        :name="tab.name"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <div class="">
          <slot :activeTab="activeTab" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      default: () => [],
      type: Array,
      required: false,
    },
    currentTab: {
      default: 0,
      type: Number,
      required: false,
    },
    currentName: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      activeTab: 0,
      selectedIndex: 0,
      activeName: "",
    };
  },

  methods: {
    activateCurrentTab(index) {
      this.activeTab = index;
      this.selectedIndex = index;
    },

    handleClick(tab, event) {
      console.log(tab, event);
      this.activeTab = tab._data.index;
      this.activeName = tab.name;
    },
  },

  watch: {
    currentTab: {
      handler: function (val) {
        this.activeTab = val;
        this.selectedIndex = val;
      },
      immediate: true,
      deep: true,
    },

    currentName: {
      handler: function (val) {
        this.activeName = val;
      },
      immediate: true
    },
  },
};
</script>

<style>
.el-tabs__item {
  color: var(--dark-100) !important;
  font-weight: 400;
  font-size: 13.7px;
}

.el-tabs__item.is-active {
  color: var(--primary) !important;
  font-weight: 600;
}

.el-tabs__active-bar {
  background-color: var(--primary) !important;
}
</style>
