import { defineClientAppEnhance } from '@vuepress/client';
// @ts-ignore
import CustomLayout from './components/LandingPageLayout.vue';

export default defineClientAppEnhance(({ app }) => {
    app.component('LandingPageLayout', CustomLayout)
})
