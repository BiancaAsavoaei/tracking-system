import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import vue from '@vitejs/plugin-vue';
//import vuetify from 'vuetify';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue(),
        //vuetify({
        //    autoImport: true,
       // }),
    ],
    resolve: {
        alias: {
            '@css': path.resolve(__dirname, 'public/css'),
            '@components': path.resolve(__dirname, 'resources/js/vue/components/'),
            '@composables': path.resolve(__dirname, 'resources/js/vue/composables/'),
            '@pages': path.resolve(__dirname, 'resources/js/vue/pages/'),
            '@config': path.resolve(__dirname, 'resources/js/vue/config/'),
        },
    },
    server: {
        host: '0.0.0.0',
        hmr: {
            clientPort: 5173,
            host: 'localhost',
            protocol: 'ws'
        },
        port: 5173,
    },
});
