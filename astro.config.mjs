// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

import node from '@astrojs/node';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["astro", /^astro\/.*/],
      },
    },
    ssr: {
      noExternal: ["lucide-react", "nanostores", "@nanostores/react"],
    },
  },

  integrations: [react(), svelte()],
  adapter: netlify(),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
});