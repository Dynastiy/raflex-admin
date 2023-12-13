<template>
  <div class="tw-bg-white tw-p-6">
    <h4 class="tw-font-bold tw-mb-6">Withdrawal Requests</h4>
    <div class="tw-w-full tw-flex tw-justify-end">
      <filter-params
        @filterByStatus="filterByStatus($event)"
        @filterByOrder="filterByOrder($event)"
        @filterByPerPage="filterByPerPage($event)"
      />
    </div>
    <table-component
      :items="items"
      :fields="fields"
      :busy="busy"
      :dropdownItem="['approve', 'decline']"
      @approve="updateTxnStatus($event, 'approve')"
      @decline="updateTxnStatus($event, 'decline')"
      :disableEditAction="true"
      :disableDeleteAction="true"
      :disableViewAction="true"
      :showBaseCount="false"
    >
    </table-component>
    <div class="tw-flex tw-justify-between tw-mt-3">
      <button
        v-if="page > 1"
        class="gpt-btn gpt-primary"
        @click="changePage('prev')"
      >
        previous {{ +page - 1 }}
      </button>
      <div class="tw-self-end">
        <button class="gpt-btn gpt-primary" @click="changePage('next')">
          next {{ +page + 1 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import FilterParams from "@/components/Modals/FilterParams.vue";
// import FilterTabs from "@/components/Utils/FilterTabs.vue";
export default {
  components: { TableComponent, FilterParams },
  data() {
    return {
      // items: [],
      fields: [
        {
          key: "transaction_id",
          label: "#",
        },

        {
          key: "user_id",
          label: "User ID",
        },

        {
          key: "amount_formatted",
          label: "Amount",
        },

        {
          key: "date_time",
          label: "Date",
        },

        {
          key: "transaction_type",
          label: "Transaction Type",
        },

        {
          key: "status",
          label: "Status",
        },

        { key: "actions", label: "" },
        { key: "dots", label: "" },
      ],
      per_page: 10,
      page: 1,
      status: "admin_pending",
      order: "ASC",
    };
  },

  methods: {
    viewTxn(e) {
      this.$router.push(`/transaction/${e.transaction_id}`);
    },

    filterByStatus(e) {
      // alert(e);
      this.status = e;
      this.getTransactions();
    },

    filterByOrder(e) {
      this.order = e;
      this.getTransactions();
    },

    filterByPerPage(e) {
      this.per_page = e;
      this.getTransactions();
    },

    getTransactions() {
      this.$store.dispatch("user/list", {
        page: this.page,
        txn_type: this.status === "" ? this.txn_type : this.status,
        meta_key:
          this.status === ""
            ? "transaction_type_category"
            : "transaction_approval_status",
        order: this.order,
        per_page: this.per_page,
      });
    },

    updateTxnStatus(e, value) {
      let payload = {
        action: value,
        id: e.transaction_id,
        page: this.page,
        txn_type: this.status === "" ? this.txn_type : this.status,
        meta_key:
          this.status === ""
            ? "transaction_type_category"
            : "transaction_approval_status",
        order: this.order,
        per_page: this.per_page,
      };
      this.$store.dispatch("user/updateStatus", payload);
    },

    changePage(value) {
      if (value === "prev") {
        this.page--;
      } else {
        this.page++;
      }
    },
  },

  beforeMount() {
    this.getTransactions();
  },

  watch: {
    page(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getTransactions();
      }
    },
  },

  computed: {
    items() {
      let transactions = this.$store.getters["user/getTransactions"];
      return transactions;
    },

    busy() {
      return this.$store.getters["user/getLoading"];
    },

    txn_type() {
      return this.$route.meta.filter;
    },
  },
};
</script>

<style></style>
