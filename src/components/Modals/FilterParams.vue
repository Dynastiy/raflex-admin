<template>
  <div class="lg:tw-w-2/12 md:tw-w-3/12">
    <el-popover placement="bottom-end" width="300" trigger="click">
      <template>
        <div>
          <h6
            class="tw-text-xs tw-text-white tw-p-2 tw-rounded-[4px] tw-font-medium tw-bg-primary"
          >
            Approval Status
          </h6>

          <div class="tw-flex tw-flex-col tw-gap-2">
            <span
              class="tw-flex tw-items-center tw-gap-2"
              v-for="(item, idx) in approval_status"
              :key="idx"
            >
              <input
                type="radio"
                class="tw-w-fit tw-accent-primary"
                v-model="status"
                :value="item.value"
                @change="filterByStatus"
                :name="item.label"
                id=""
              />
              <span class="tw-text-xs">{{ item.label }}</span>
            </span>
          </div>
          <h6
            class="tw-text-xs tw-text-white tw-p-2 tw-rounded-[4px] tw-font-medium tw-bg-primary tw-mt-2"
          >
            Order By
          </h6>

          <div class="tw-flex tw-flex-col tw-gap-2">
            <span
              class="tw-flex tw-items-center tw-gap-2"
              v-for="(item, idx) in orders"
              :key="idx"
            >
              <input
                type="radio"
                class="tw-w-fit tw-accent-primary"
                v-model="order"
                :value="item.value"
                @change="filterByOrder"
                :name="item.label"
                id=""
              />
              <span class="tw-text-xs">{{ item.label }}</span>
            </span>
          </div>

          <h6
            class="tw-text-xs tw-text-white tw-p-2 tw-rounded-[4px] tw-font-medium tw-bg-primary tw-mt-2"
          >
            Per Page
          </h6>
          <div class="tw-flex">
            <input
              type="number"
              class="tw-w-fit tw-p-3"
              name=""
              min="1"
              max="100"
              v-model="per_page"
              id=""
            />
          </div>
        </div>
      </template>
      <!-- <el-button >Click to activate</el-button> -->
      <div
        slot="reference"
        role="button"
        class="tw-flex tw-items-center tw-justify-between tw-border tw-rounded-[4px] tw-border-primary tw-px-3 tw-py-2"
      >
        <span class="tw-flex tw-gap-2 tw-items-center">
          <span>
            <i-icon icon="mi:filter" />
          </span>
          <span class="tw-text-sm tw-block">Filters</span>
        </span>
        <span>
          <i-icon icon="prime:angle-down" />
        </span>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approval_status: [
        {
          label: "All",
          value: "",
        },
        {
          label: "Admin Pending",
          value: "admin_pending",
        },
        {
          label: "Admin Approved",
          value: "admin_approved",
        },
        {
          label: "Admin Declined",
          value: "admin_declined",
        },
      ],
      orders: [
        {
          label: "Ascending",
          value: "ASC",
        },
        {
          label: "Descending",
          value: "DESC",
        },
      ],
      value: 1,
      status: "admin_pending",
      order: "ASC",
      per_page: 10,
    };
  },

  methods: {
    filterByStatus() {
      this.$emit("filterByStatus", this.status);
    },

    filterByOrder() {
      this.$emit("filterByOrder", this.order);
    },

    filterByPerPage() {
      this.$emit("filterByPerPage", this.page);
    },
  },

  watch: {
    per_page(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.filterByPerPage();
      }
    },
  },

  computed: {

  }
};
</script>

<style></style>
