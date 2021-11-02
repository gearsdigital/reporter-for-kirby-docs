<template>
  <div class="landing-page">
    <div class="landing-page--wrap">
      <div class="landing-page--content">
        <img
          :src="$withBase(`/images/reporter-logo_${$page.lang}.svg`)"
          alt="Reporter for Kirby"
        />
        <Content />
      </div>
      <div class="landing-page--playground">
        <ReporterForm />
      </div>
    </div>
  </div>
</template>

<script>
import ReporterForm from "./ReporterForm";

export default {
  name: "LandingPageLayout",
  components: { ReporterForm }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=swap");

:root {
  --page-border: 15px;
  --page-height: 100vh;
  --c-white: #fff;
}

.landing-page {
  font-family: "JetBrains Mono", monospace;
  background: var(--c-bg-navbar);
  color: var(--c-text);
  width: calc(100% - var(--page-border) * 2);
  margin: var(--page-border);
  padding-bottom: 15px;

  img {
    display: block;
  }

  &--playground {
    border: var(--page-border) solid var(--c-brand-secondary-light);
    margin: var(--page-border);
  }

  &--content {
    padding: calc(var(--page-border) * 3);

    h1 {
      display: none;
    }

    h1 + p {
      font-size: 22px;
    }

    h1 + p + p {
      margin-bottom: 3.5rem;
      line-height: 32px;
    }

    p:last-child {
      margin: 0;
    }

    a {
      transition: all 170ms ease-in-out;
      color: var(--c-text);
      border-bottom: 1px dashed;

      &:hover {
        color: var(--c-text-light);
        border-bottom: 1px solid;
      }
    }

    a[target="_blank"] {
      border-bottom: none;
      color: var(--c-white);
      background: var(--c-text);
      font-size: 18px;
      padding: 0.75rem 3rem;
      font-weight: bold;
      border-radius: 4px;
      margin-right: 3rem;

      &:hover {
        background: var(--c-text-light);
      }

      span {
        display: none;
      }
    }
  }
}

@media only screen and (min-width: 1025px) {
  .landing-page {
    &--wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-items: center;
      max-width: 1260px;
      margin: auto;
      min-height: calc(var(--page-height) - var(--page-border) * 3);
    }

    &--playground {
      margin: auto;
      width: 520px;
    }

    &--content {
      max-width: 460px;
    }
  }
}
</style>
