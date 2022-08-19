import { defineConfig } from 'vite'
import postcssPresetEnv from 'postcss-preset-env'

export default defineConfig({
    server: {
        host: '0.0.0.0',
    },
    resolve: {
        alias: [
            { find: '~', replacement: process.cwd() },
            { find: '@', replacement: '/src' },
        ],
    },
    plugins: [

    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                `,
            },
        },
        postcss: {
            plugins: [postcssPresetEnv({
                browsers: 'last 2 versions',
                autoprefixer: { grid: true },
            })],
        },
    },
})
