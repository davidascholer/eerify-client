var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import tailwindcss from "@tailwindcss/vite";
import reactSwc from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path';
var projectRoot = process.env.PROJECT_ROOT || import.meta.dirname;
// https://vite.dev/config/
export default defineConfig(function () {
    var isVitest = !!process.env.VITEST;
    return {
        plugins: __spreadArray(__spreadArray([], (isVitest ? [] : [reactSwc()]), true), [
            tailwindcss(),
        ], false),
        server: {
            proxy: {
                // Dev-time proxy to avoid CORS when calling TMDB
                '/tmdb': {
                    target: 'https://api.themoviedb.org/3',
                    changeOrigin: true,
                    secure: true,
                    rewrite: function (path) { return path.replace(/^\/tmdb/, ''); },
                },
                '/tmdb-image': {
                    target: 'https://image.tmdb.org/t/p',
                    changeOrigin: true,
                    secure: true,
                    rewrite: function (path) { return path.replace(/^\/tmdb-image/, ''); },
                },
            },
        },
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
