import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
    css: {
        modules: {
            // add file name to make it easier to debug
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
    },
    plugins: [
        react(),
        {
            ...eslint({
                failOnWarning: true,
                failOnError: true,
            }),
            apply: "build",
        },
        {
            ...eslint({
                failOnWarning: false,
                failOnError: false,
            }),
            apply: "serve",
            enforce: "post",
        },
    ],
});