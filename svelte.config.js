import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            // Specify the output directory for Vercel
            out: 'build', // Vercel can serve from this directory
            fallback: null, // Set to 'index.html' if you want a fallback for SPA
            precompress: false,
            strict: false
        }),
        prerender: {
            entries: ['/'] // Add your routes here
        },
        alias: {
            '~': './src' // Alias for imports
        },
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/transformer-explainer' : ''
        }
    }
};

export default config;
