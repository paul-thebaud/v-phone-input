<script
  setup
  lang="ts"
>
</script>

<template>
  <div class="banner">
    This documentation is about <strong>upcoming VPhoneInput v6</strong>. If you
    want to use the <strong
      >stable release, use
      <a href="https://github.com/paul-thebaud/v-phone-input"
        >VPhoneInput v5</a
      ></strong
    >.
  </div>
</template>

<style>
html {
  --vp-layout-top-height: 88px;
}

@media (min-width: 375px) {
  html {
    --vp-layout-top-height: 64px;
  }
}

@media (min-width: 768px) {
  html {
    --vp-layout-top-height: 40px;
  }
}
</style>

<style scoped>
.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--vp-z-index-layout-top);
  padding: 8px;
  text-align: center;
  background: var(--vp-custom-block-danger-bg);
  color: var(--vp-custom-block-danger-text);
  font-size: 0.875rem;
}

a {
  text-decoration: underline;
}
</style>
