
import { defineConfig } from 'vite';
import env from 'vite-plugin-env';

export default defineConfig({
  plugins: [
    env({
      // Path to your .env file
      path: '../../.env',
    }),
  ],
});
