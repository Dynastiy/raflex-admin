import IndexViewVue from "@/modules/Home/IndexPage.vue";

import Transactions from "@/modules/Transactions/IndexPage.vue";
import Withdrawals from "@/modules/Transactions/WithdrawalPage.vue";

import TransactionDetails from "@/modules/Transactions/uuid/_uuid.vue";


const router = [
  {
    path: "/analytics",
    name: "analytics",
    component: IndexViewVue,
    meta: {
      layout: "AppDashboardLayout",
      parent: "analytics",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/",
    name: "withdrawals",
    component: Withdrawals,
    meta: {
      layout: "AppDashboardLayout",
      parent: "transactions",
      name: "home",
      header: "Withdrawal Requests",
      filter: "blockchain_withdrawal",
      subName: "withdrawals",
      requiresAuth: true
    },
  },

  {
    path: "/deposit",
    name: "deposit",
    component: Transactions,
    meta: {
      layout: "AppDashboardLayout",
      parent: "transactions",
      header: "Blockchain Deposits",
      filter: "blockchain_deposit",
      name: "home",
      subName: "deposit",
      requiresAuth: true
    },
  },

  {
    path: "/referral-bonus",
    name: "referral-bonus",
    component: Transactions,
    meta: {
      layout: "AppDashboardLayout",
      parent: "transactions",
      header: "Referral Bonus",
      filter: "referral_bonus",
      name: "home",
      subName: "referral-bonus",
      requiresAuth: true
    },
  },

  {
    path: "/staking-interest",
    name: "staking-interest",
    component: Transactions,
    meta: {
      layout: "AppDashboardLayout",
      parent: "transactions",
      header: "Staking Interest",
      filter: "staking_from_wallet",
      name: "home",
      subName: "staking-interest",
      requiresAuth: true
    },
  },

  {
    path: "/transaction/:id",
    name: "transaction-details",
    component: TransactionDetails,
    meta: {
      layout: "AppDashboardLayout",
      parent: "transactions",
      name: "Details",
      requiresAuth: true
    },
  },

 
];

export default router;
