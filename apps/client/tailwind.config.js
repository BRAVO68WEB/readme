const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            maxWidth: {
                "8xl": "90rem",
            },
            colors: {
                primary: colors.indigo["600"],
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                accent: "rgb(var(--color-accent) / <alpha-value>)",
                text: "rgb(var(--color-text) / <alpha-value>)",
                background: colors.gray["900"],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
