import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
    plugins: [react(), svgr()],
    define: {
        'process.env.REACT_APP_ENVIRONMENT': JSON.stringify(mode === 'production' ? 'PROD' : 'DEV'),
        'process.env': {}
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
                        '@emotion/react',
                        '@emotion/styled',
                    ],
                    'vendor-utils': ['lodash', 'howler', 'axios', 'react-number-format'],
                },
            },
        },
    },
}));
