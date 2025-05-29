import dns from 'dns';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import commonjs from '@rollup/plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';

// Ensure consistent DNS resolution for development
(dns as any).setDefaultResultOrder('verbatim');

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      svgr(),
      react(),
      mkcert(),
      tsconfigPaths(),
      nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: true,
      }),
    ],
    optimizeDeps: {
      include: ['buffer', 'process'], // Pre-bundle to avoid ESM import issues
    },
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        buffer: 'buffer',
        process: 'process/browser',
        stream: 'stream-browserify',
        util: 'util',
      },
    },
    define: {
      global: 'globalThis',
      'process.env': process.env,
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        plugins: [
          commonjs({
            include: [/node_modules/],
            transformMixedEsModules: true,
            requireReturnsDefault: 'auto',
            exclude: ['**/node_modules/es5-ext/_postinstall.js'],
          }),
        ],
      },
    },
    server: {
      port: 3002,
      strictPort: true,
      https: true,
      host: 'localhost',
      hmr: {
        overlay: false,
      },
      watch: {
        usePolling: false,
        useFsEvents: false,
      },
    },
    preview: {
      port: 3002,
      strictPort: true,
      https: true,
      host: 'localhost',
    },
  });
};
