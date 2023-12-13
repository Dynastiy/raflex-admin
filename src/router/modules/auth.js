import SignInVue from "@/modules/Auth/SignIn.vue";

const router = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignInVue,
    meta: {
      layout: "AppAuthLayout",
      parent: "login",
      name: "login",
      requiresAuth: false
    },
  },



];

export default router;
