<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-6">
        <img src="@/assets/img/peppi-icon.svg" class="tw-h-12 tw-w-12" alt="" />
        <h5 class="tw-font-bold tw-text-2xl tw-mb-0">Welcome back,</h5>
        <small class="tw-text-light tw-text-xs"
          >Sign in to continue to Peppy Stores</small
        >
      </div>
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <span v-if="error" class="tw-mb-2 error-alert">{{ error }}</span>

          <div>
            <validation-provider
            name="username"
            rules="required"
            v-slot="{ dirty, valid, invalid, errors }"
          >
            <label for="username">Username</label>
            <div class="input-field" :class="{
              'error': dirty && invalid,
              'success': dirty && valid,
            }">
              <input
                type="text"
                name="text"
                id="username"
                v-model="credentials.username"
                placeholder="username"
              />
              <span
                class="email-iccon"
              >
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
              name="email"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="email">Email</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="credentials.email"
                  placeholder="Enter email"
                />
                <span class="email-iccon">
                  <i-icon icon="heroicons:envelope" class="form-icon" />
                </span>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
          </div>

        <div class="tw-mb-3">
          <validation-provider
            class=""
            name="password"
            rules="required"
            v-slot="{ dirty, valid, invalid, errors }"
          >
            <label for="password">Password</label>
            <div class="input-field" :class="{
              'error': dirty && invalid,
              'success': dirty && valid,
            }">
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
                  :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
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
              class="peppi-btn peppi-primary w-100"
              v-bind:disabled="invalid"
              :class="{ 'tw-bg-gray-400': invalid }"
            >
              <span>Sign Up</span>
            </button>
          </div>
        </form>
      </validation-observer>
      <div class="tw-text-center tw-mt-3">
        <span class="tw-text-xs tw-font-semibold"
          >Already have an account?
          <router-link to="/" class="tw-text-primary"
            >Sign In</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        email: "",
        password: "",
        username:""
      },
      typePassword: true,
    };
  },
  methods: {
    // ...mapActions("auth", ["loginUser"]),

    onSubmit() {
      let credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
      };
      console.log(credentials);
      // this.loginUser(credentials)
    },
  },

  mounted() {
    // this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  watch: {},

  computed: {
    // ...mapState("auth", {
    //   loading: (state) => state.loading,
    //   error: (state) => state.error,
    //   errors: (state) => state.validationErrors,
    //   user: (state) => state.user,
    //   success: (state) => state.success,
    // }),
  },
};
</script>
