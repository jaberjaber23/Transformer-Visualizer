import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            // Remove custom output directories
            // The adapter will use the default output directory
            // pages: 'build',   // REMOVE THIS LINE
            // assets: 'build',  // REMOVE THIS LINE
            fallback: null,
            precompress: false,
            strict: false // Ignore errors about dynamic routes
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
