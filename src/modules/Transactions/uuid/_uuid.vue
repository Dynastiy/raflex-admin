<template>
  <div>
    <div class="tw-flex tw-items-center tw-space-x-2">
      <span
        class="back-button peppi-btn peppi-primary"
        role="button"
        @click="$router.go(-1)"
      >
        <i-icon icon="ic:baseline-arrow-back" width="20px" />
      </span>

      <div>
        <small class="tw-font-light tw-text-xs tw-mb-0">Go Back</small>
        <h6 class="tw-mb-0 tw-font-semibold">
          {{ "Order Details" }}
        </h6>
      </div>
    </div>
    <!-- <h5 class="tw-font-semibold">Order Details</h5> -->
    <div class="tw-bg-white tw-p-6 tw-mt-6">
      <div class="tw-mb-5">
        <div class="tw-flex tw-justify-between">
          <div>
            <h6 class="tw-font-semibold tw-mb-0">
              {{ "Order ID:" }}
              <span class="tw-uppercase">{{
                "#" + item.id.split("-").join("").slice(0, 5)
              }}</span>
            </h6>
            <h6 class="tw-text-sm tw-mb-0">
              {{ item.created_at | formatDate }}
            </h6>
            <span class="tw-flex tw-items-center tw-gap-2">
              <span class="status" :class="item.status"></span>
              <span class="tw-text-[12px]">{{ item.status }}</span>
            </span>
          </div>

          <div>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none tw-text-dark100"
              v-if="item.status === 'pending'"
              text="Left align"
              dropleft
              no-caret
            >
              <template #button-content>
                <span class="tw-text-dark100 tw-font-bold">
                  <i-icon icon="iconamoon:menu-kebab-vertical-bold" />
                </span>
              </template>
              <template v-if="dropdownItem.length > 0">
                <b-dropdown-item
                  v-for="(dropdown, index) in dropdownItem"
                  :key="index"
                  class="text-capitalize"
                  @click="updateStatus(dropdown)"
                  >{{ dropdown.split("_").join(" ") }}</b-dropdown-item
                >
              </template>
            </b-dropdown>
          </div>
        </div>
      </div>

      <div class="tw-grid tw-grid-cols-2 tw-gap-6">
        <div class="tw-flex tw-gap-3">
          <span class="tw-bg-gray200 tw-p-2 tw-rounded-full tw-h-fit">
            <i-icon icon="ci:user-03" />
          </span>
          <div>
            <h6 class="tw-mb-1 tw-font-semibold">Customer</h6>
            <div class="tw-flex tw-flex-col">
              <!-- {{ item.user }} -->
              <span
                v-for="(value, name) in userData"
                :key="name"
                class="tw-mb-0"
              >
                <span class="tw-text-gray-500 tw-text-sm tw-capitalize"
                  >{{ name }}:
                </span>
                <span class="tw-text-sm">{{ value }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="tw-flex tw-gap-3">
          <span class="tw-bg-gray200 tw-p-2 tw-rounded-full tw-h-fit">
            <i-icon icon="iconamoon:location-light" />
          </span>
          <div>
            <h6 class="tw-mb-1 tw-font-semibold">Pickup Location</h6>
            <div class="tw-flex tw-flex-col">
              <!-- {{ item.user }} -->
              <span v-for="(value, name) in pickupData" :key="name" class="">
                <span class="tw-text-gray-500 tw-text-sm tw-capitalize"
                  >{{ name }}:
                </span>
                <span class="tw-text-sm tw-capitalize">{{ value }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="tw-flex tw-gap-3">
          <span class="tw-bg-gray200 tw-p-2 tw-rounded-full tw-h-fit">
            <i-icon icon="fluent:payment-32-regular" />
          </span>
          <div>
            <h6 class="tw-mb-1 tw-font-semibold">Payment Information</h6>
            <div class="tw-flex tw-flex-col">
              <!-- {{ item.user }} -->
              <span v-for="(value, name) in txnData" :key="name" class="">
                <span class="tw-text-gray-500 tw-text-sm tw-capitalize"
                  >{{ name.split("_").join(" ") }}:
                </span>
                <span class="tw-text-sm">{{ value }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h6 class="tw-mb-1 tw-font-semibold tw-mt-6">Products</h6>
        <div>
          <table-component :items="products" :fields="fields">
          </table-component>
          <div class="tw-bg-gray400 tw-p-3 tw-w-4/12 tw-ml-auto">
            <div class="tw-flex tw-flex-col tw-items-end">
              <span
                v-for="(value, name) in costDetails"
                :key="name"
                class="tw-mb-0"
              >
                <span class="tw-text-gray-500 tw-text-[13px] tw-capitalize"
                  >{{ name.split("_").join(" ") }}:
                </span>
                <span class="tw-text-[13px]">{{ value }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import { pick } from "lodash";
export default {
  components: { TableComponent },
  data() {
    return {
      id: this.$route.params.id,
      item: {},
      products: [],
      fields: [
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "price",
          label: "UNIT PRICE",
          formatter: (val) => {
            return Number(val).toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
            });
          },
        },
        {
          key: "pivot.quantity",
          label: "QUANTITY",
          formatter: (val) => {
            return Number(val).toLocaleString();
          },
        },
        {
          key: "totalOrderAmount",
          label: "TOTAL AMOUNT",
        },
      ],
      userDisplay: ["username", "email"],
      pickupDisplay: ["name", "address"],
      txnDisplay: ["tx_ref", "description"],
      costDisplay: ["total_quantity", "total_amount"],
      dropdownItem:['complete', 'cancel']
    };
  },
  methods: {
    getOrder() {
      this.busy = true;
      this.$request(`admin/orders/${this.id}`)
        .then((res) => {
          let resPayload = res.data;
          console.log(resPayload);
          this.item = resPayload.order;
          this.products = resPayload.order.products;
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    updateStatus(value) {
      let payload = {
        status: value === 'cancel' ? 'canceled' : 'completed'
      }
      this.$request.post(`admin/orders/update-status/${this.id}`, payload)
        .then((res) => {
          console.log(res);
          this.getOrder()
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },
  },

  beforeMount() {
    this.getOrder();
  },

  computed: {
    userData() {
      return pick(this.item.user, this.userDisplay);
    },
    pickupData() {
      return pick(this.item.pickup_location, this.pickupDisplay);
    },
    txnData() {
      return pick(this.item.payment, this.txnDisplay);
    },
    costDetails() {
      let data = {
        total_quantity: Number(this.item.total_quantity).toLocaleString(),
        total_amount: Number(this.item.total_amount).toLocaleString("en-US", {
          style: "currency",
          currency: "NGN",
        }),
      };
      return pick(data, this.costDisplay);
    },
  },
};
</script>

<style></style>
