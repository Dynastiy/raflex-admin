<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-4">
        <img src="@/assets/img/raflex-logo.png" class="tw-h-12 tw-w-8" alt="" />
        <h5 class="tw-font-bold tw-text-2xl tw-mb-0">Welcome back,</h5>
        <small class="tw-text-light tw-text-xs tw-block"
          >Sign in to continue to Raflex administrative panel</small
        >
      </div>
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <span v-if="error" class="tw-mb-5 tw-block tw-text-xs tw-text-red-600">{{ error }}</span>
          <div>
            <validation-provider
              name="email"
              rules="required|email"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="username">Email</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <input
                  type="text"
                  name="text"
                  id="username"
                  v-model="credentials.email"
                  placeholder="username"
                />
                <span class="email-iccon">
                  <i-icon icon="heroicons:user" class="form-icon" />
                </span>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
          </div>

          <div class="tw-my-3">
            <validation-provider
              class=""
              name="password"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="password">Password</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <input
                  :type="typePassword ? 'password' : 'text'"
                  name="password"
                  id="password"
                  v-model="credentials.password"
                  placeholder="Password"
                />
                <span
                  class="password-iccon"
                  role="button"
                  @click="typePassword = !typePassword"
                >
                  <i-icon
                    :icon="
                      typePassword ? 'tabler:eye' : 'gridicons:not-visible'
                    "
                    class="form-icon"
                  />
                </span>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
          </div>

          <div class="tw-mt-4">
            <button
              class="gpt-btn gpt-primary w-100"
              v-bind:disabled="invalid"
              :class="{ 'tw-bg-gray-400': invalid || loading }"
            >
              <span>Sign in</span>
            </button>
          </div>
        </form>
      </validation-observer>
      <!-- <div class="tw-text-center tw-mt-3">
        <span class="tw-text-xs tw-font-semibold"
          >Don't have an account?
          <router-link to="/sign-up" class="tw-text-primary"
            >Sign Up</router-link
          >
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        email: "",
        password: "",
      },
      typePassword: true,
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),

    onSubmit() {
      let credentials = {
        user_email: this.credentials.email,
        user_password: this.credentials.password,
      };
      this.loginUser(credentials)
    },
  },

  mounted() {
    this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  watch: {},

  computed: {
    ...mapState("auth", {
      loading: (state) => state.loading,
      error: (state) => state.error,
      errors: (state) => state.validationErrors,
      user: (state) => state.user,
      success: (state) => state.success,
    }),
  },
};
</script>
