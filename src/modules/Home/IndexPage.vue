<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-4">
          <b-skeleton
            v-for="item in 4"
            :key="item"
            width="100%"
            height="80px"
          ></b-skeleton>
        </div>
      </template>
      <div class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-4">
        <div
          class="tw-w-full tw-bg-gradient-to-r tw-p-3 tw-rounded-lg"
          :class="{
            'tw-from-cyan-400 tw-to-cyan-500': name === 'all',
            'tw-from-amber-400 tw-to-amber-500': name === 'pending',
            'tw-from-green-400 tw-to-green-500': name === 'approved',
            'tw-from-red-400 tw-to-red-500': name === 'declined',
            
          }"
          v-for="(value, name) in cardsData"
          :key="name"
        >
          <span class="tw-text-xs tw-font-semibold tw-uppercase">{{
            name.split("_").join(" ")
          }}</span>
          <div class="tw-font-bold tw-text-2xl">
            <slot :name="name" :value="value">{{ value ? value : "0" }} </slot>
          </div>
        </div>
      </div>
    </b-skeleton-wrapper>

    <div class="tw-bg-white tw-p-4 tw-rounded-lg">
      <h5 class="tw-font-semibold">Recent Pending Withdrawals</h5>
      <table-component
        :items="items"
        :fields="fields"
        :busy="busy"
        :disableEditAction="true"
        :disableViewAction="true"
        :disableDeleteAction="true"
        :showBaseCount="false"
      >
        <template #button>
          <span
            class="tw-text-xs tw-text-primary tw-underline"
            role="button"
            @click="$router.push('/withdrawals')"
          >
            View All Withdrawals
          </span>
        </template>
      </table-component>
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
import TableComponent from "@/components/TableComponent.vue";
export default {
  components: { TableComponent },
  data() {
    return {
      analytics: {},
      displayKey: [
      "all", "pending", "approved",
        "declined",
      ],
      fields: [
        {
          key: "transaction_id",
          label: "#",
          // formatter: (val) => {
          //   let result = val.slice(0, 5);
          //   return `#${result}`;
          // },
        },

        {
          key: "amount_formatted_disp",
          label: "Amount",
          // formatter: (item) => {
          //   return item ? Number(item).toLocaleString() : "0";
          // },
        },

        {
          key: "post_date",
          label: "Date",
          // formatter: (item) => {
          //   return item
          //     ? Number(item).toLocaleString("en-US", {
          //         style: "currency",
          //         currency: "NGN",
          //       })
          //     : "NGN 0.00";
          // },
        },

        {
          key: "txn_type",
          label: "Transaction Type",
        },

        {
          key: "status",
          label: "Status",
        },

        { key: "actions", label: "" },
      ],
      busy: false,
      loading: false,
    };
  },
  methods: {
    getPercentage(value1, value2) {
      let perc = (value1 / value2) * 100;
      return perc;
    },
    viewOrder(e) {
      this.$router.push(`/transaction/${e.transaction_id}`);
    },

  },

  beforeMount() {
    this.$store.dispatch('user/list') 
  },

  computed: {
    cardsData() {
      let data = {
        all: 0,
        pending: 0,
        approved: 0,
        declined: 0,
      };
      return pick(data, this.displayKey);
    },

    items() {
      let transactions = this.$store.getters['user/getTransactions']
      let sliced = transactions.slice(0,5)
      return sliced
    }
  },
};
</script>

<style></style>
