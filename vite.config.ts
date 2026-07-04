import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';
import app from './api/app.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'local-api-middleware',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api')) {
            next();
            return;
          }

          app(req as any, res as any, next);
        });
      },
    },
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths(),
  ],
})
