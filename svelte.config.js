import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            fallback: null,
            precompress: false,
            strict: false
        }),
        prerender: {
            entries: ['/' /* other routes if needed */]
        },
        alias: {
            '~': './src'
        },
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/transformer-explainer' : ''
        }
    }
};

export default config;
