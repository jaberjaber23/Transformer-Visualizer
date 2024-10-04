import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            // Vercel will use its default output directory
            // No need to specify 'out' for Vercel adapter
            fallback: 'app.html' // For SPA-style routing
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