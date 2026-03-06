import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
    plugins: [react(), svgr()],
    define: {
        'process.env': {}
    },
    resolve: {
        alias: {
            '@material-ui/pickers': path.resolve(__dirname, 'node_modules/@material-ui/pickers/index.js'),
        },
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux'],
                    'vendor-mui': [
                        '@mui/material',
                        '@mui/icons-material',
                        '@mui/styles',
                        '@emotion/react',
                        '@emotion/styled',
                    ],
                    'vendor-utils': ['lodash', 'howler', 'axios', 'react-number-format'],
                },
            },
        },
    },
});
