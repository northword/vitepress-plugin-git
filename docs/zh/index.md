---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vitepress Plugin Git"
  tagline: Enhance code blocks features for VitePress.

  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started

    - theme: alt
      text: GitHub
      link: https://github.com/northword/vitepress-plugin-git
  image:
    src: /logo.svg
    alt: Vitepress Plugin Git
features:
  - icon: 💡
    title: Icons
    details: Automatically fill the missing product icons
    link: /features#💡-fill-icons

  - icon: 🪧
    title: Title Bar
    details: Add Title Bar to your code blocks
    link: /features#🪧-title-bar
---

::: code-group

```sh [npm]
npm install vitepress-plugin-git
```

```sh [yarn]
yarn add vitepress-plugin-git
```

```sh [pnpm]
pnpm add vitepress-plugin-git
```

```sh [bun]
bun add vitepress-plugin-git
```

:::

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
