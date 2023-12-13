<template>
  <div>
    <div class="">
      <app-drawer :menu="menu" class="lg:tw-block md:tw-block tw-hidden" />
      <div class="lg:tw-pl-64 md:tw-pl-64 tw-pl-0 tw-w-full">
        <top-bar :menu="menu" class="" :links="links" />
        <!-- <app-header /> -->
        <div class="tw-p-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppHeader from "@/components/Navigation/AppHeader.vue";
import AppDrawer from "@/components/Navigation/AppDrawer.vue";
import TopBar from "@/components/Layout/TopBar.vue";
export default {
  components: { AppDrawer, TopBar },

  name: "DashboardLayout",
  data() {
    return {
      menu: [
        // {
        //   title: "Dashboard",
        //   icon: "carbon:analytics",
        //   parent: "analytics",
        //   url: "/",
        //   hasChildren: false,
        // },

        {
          title: "Transactions",
          icon: "ep:list",
          parent: "transactions",
          url: "/transactions",
          hasChildren: true,
          children: [
            {
              title: "Withdrawal",
              icon: "uil:money-withdrawal",
              parent: "transactions",
              url: "/",
              subItem: "withdrawals",
              hasChildren: false,
            },
            {
              title: "Deposit",
              icon: "streamline:money-atm-card-2-deposit-money-payment-finance-atm-withdraw",
              parent: "transactions",
              url: "/deposit",
              subItem: "deposit",
              hasChildren: false,
            },
            // {
            //   title: "Staking Interest",
            //   icon: "bx:lock",
            //   parent: "transactions",
            //   url: "/staking-interest",
            //   subItem: "staking-interest",
            //   hasChildren: false,
            // },
            // {
            //   title: "Referral Bonus",
            //   icon: "ri:share-line",
            //   parent: "transactions",
            //   url: "/referral-bonus",
            //   subItem: "referral-bonus",
            //   hasChildren: false,
            // },
          ],
        },
      ],
    };
  },
  computed: {
    links() {
      return this.$route.meta.links;
    },
  },
};
</script>

<style></style>
