<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-justify-center tw-space-x-1"
    >
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        v-if="currentPage > 1"
        @click="changePage('prev')"
      >
        &laquo;
      </button>
      <div>
        <!-- <span class="tw-text-xs tw-font-semibold">
          Showing {{ currentPage }} of {{ totalPages }}
        </span> -->
        <slot />
      </div>
      <button
        type="button"
        @click="changePage('next')"
        v-if="currentPage < totalPages"
        class="btn btn-sm btn-outline-secondary"
      >
        &raquo;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current_page: {
      type: Number,
      default: 1,
    },
    total_pages: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      newPage: "",
      currentPage: 1,
      totalPages: 1,
    };
  },
  methods: {
    changePage(value) {
      this.$emit("change-page");
      if (value === "next") {
        this.$emit("next", this.currentPage++);
        console.log(this.currentPage, "current from next");
      }
      if (value === "prev") {
        this.$emit("prev", this.currentPage--);
        console.log(this.currentPage, "current fro prev");
      }
    },
  },

  watch: {
    current_page: {
      handler(val) {
        this.currentPage = val;
      },
      immediate: true,
    },
    total_pages: {
      handler(val) {
        this.totalPages = val;
      },
      immediate: true,
    },
  },

  //   computed: {
  //     current_page: {
  //       get: function () {
  //         return this.current_page;
  //       },
  //       set: function (newVal) {
  //         this.newPage = newVal;
  //       },
  //     },
  //   },
};
</script>

<style>
.paged a.first::after {
  content: "...";
}

.paged a.last::before {
  content: "...";
}
</style>

page: 1, perPage: 10, pages: [],
