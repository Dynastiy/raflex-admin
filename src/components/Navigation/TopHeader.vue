<template>
  <div class="top-header">
    <div class="tw-flex tw-items-center tw-justify-between tw-p-3">
      <div>
        <span class="tw-flex tw-space-x-3">
          <a href="/">
            <i-icon icon="bxl:facebook" class="top-header-icon"/>
          </a>
          <a href="/"> 
            <i-icon icon="mdi:twitter" class="top-header-icon"/>
          </a>
          <a href="/">
            <i-icon icon="raphael:instagram" class="top-header-icon"/>
          </a>
        </span>
      </div>
      <div class="tw-hidden lg:tw-block md:tw-block">
        <span class="tw-tracking-widest">welcome to peppy stores</span>
      </div>
      <div class="tw-flex tw-space-x-2">
        <router-link class="tw-tracking-wider" to="/sign-in">sign in</router-link>
        <span>/</span>
        <router-link class="tw-tracking-wider" to="/sign-up">sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.top-header a,
.top-header span {
  text-transform: uppercase;
  color: var(--dark-20);
  font-size: 13px;
  text-decoration: none;
  font-weight: 400;
}

.top-header-icon {
    font-size: 15px;
}
</style>
