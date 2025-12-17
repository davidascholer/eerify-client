import tailwindcss from "@tailwindcss/vite";
import reactSwc from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig(() => {
  const isVitest = !!process.env.VITEST;

  return {
    plugins: [
      // Disable React plugins entirely during Vitest to avoid preamble issues;
      // esbuild handles JSX with tsconfig `jsx: react-jsx`.
      ...(isVitest ? [] : [reactSwc()]),
      tailwindcss(),
      // Spark plugins removed; icons and app run without proxy
    ],
    define: {
      // Inject app version for use in UI (e.g., Settings page)
      APP_VERSION: JSON.stringify(process.env.npm_package_version || '0.0.0'),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.VITE_APP_VERSION || process.env.npm_package_version || '0.0.0'),
    },
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    globals: true,
    css: true,
  },
  };
});
