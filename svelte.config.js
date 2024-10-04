import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            // Vercel Edge Functions are not yet supported with SvelteKit
            runtime: 'nodejs18.x'
        })
    }
};

export default config;