import { sveltekit } from '@sveltejs/kit/vite';
import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [sveltekit({
    adapter: process.env.VERCEL === '1'
      ? vercelAdapter({ runtime: 'nodejs24.x' })
      : nodeAdapter(),
  })],
  server: { port: 5173 },
});
