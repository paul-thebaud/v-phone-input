<script
  setup
  lang="ts"
>
</script>

<template>
  <div class="banner">
    <div class="banner-underlay"/>
    <p>
      This documentation is about <strong>upcoming VPhoneInput v6</strong>. If
      you want to use the <strong
        >stable release, use
        <a
          href="https://github.com/paul-thebaud/v-phone-input?tab=readme-ov-file#tldr"
          >VPhoneInput v5</a
        ></strong
      >.
    </p>
  </div>
</template>

<style>
html {
  --vp-layout-top-height: 88px;
}

@media (min-width: 450px) {
  html {
    --vp-layout-top-height: 64px;
  }
}

@media (min-width: 900px) {
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
  min-height: var(--vp-layout-top-height);
  padding: 8px;
  text-align: center;
  background-color: var(--vp-c-bg);
  color: var(--vp-custom-block-danger-text);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-underlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: var(--vp-custom-block-danger-bg);
  pointer-events: none;
}

a {
  text-decoration: underline;
}
</style>
