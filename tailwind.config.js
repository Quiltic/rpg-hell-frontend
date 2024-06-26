/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        {
            pattern:
                /(bg|ring|text)-(body|mind|soul|arcana|charm|crafting|nature|medicine|thieving|core|base|dark|light|aabase)(-(1|2|3|4|5|6|7|8|9)00|)/,
        },
    ],
    theme: {
        extend: {},
        fontFamily: {
            serif: ["Heebo", "Georgia", "serif", "monospace"],
        },
        container: {
            center: true,
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            light: {
                DEFAULT: "rgb(251, 248, 240)",
                // 100: '#4d3e15',
                // 200: '#9b7c29',
                300: "#D8D0BF",
                400: "#f4ecd7",
                500: "#fbf8f0",
                600: "#FDFBF6",
                // 700: '#fcfbf5',
                // 800: '#fdfcf9',
                // 900: '#fefefc'
            },
            dark: {
                DEFAULT: "rgb(46, 38, 45)",
                // 100: '#090709',
                // 200: '#120f12',
                300: "#453842",
                400: "#3b3039",
                500: "#2e262d",
                600: "#221C21",
                700: "#1b161a",
                // 800: '#3B3039',
                // 900: '#d8d0d7'
            },
            grey: {
                DEFAULT: "#CDCDCD",
                300: "#E4E4E4",
                400: "#DFDFDF",
                500: "#CDCDCD",
                600: "#C6C6C6",
                700: "#B2B2B2",
            },
            body: {
                DEFAULT: "rgb(204, 120, 51)",
                100: "#29180a",
                200: "#523014",
                300: "#7a481f",
                400: "#a36029",
                500: "#cc7833",
                600: "#d6935c",
                700: "#e0ae85",
                800: "#ebc9ad",
                900: "#f5e4d6",
            },
            mind: {
                DEFAULT: "rgb(51, 143, 204)",
                100: "#0a1d29",
                200: "#143952",
                300: "#1f567a",
                400: "#2972a3",
                500: "#338fcc",
                600: "#5ca5d6",
                700: "#85bce0",
                800: "#add2eb",
                900: "#d6e9f5",
            },
            soul: {
                DEFAULT: "rgb(95, 50, 200)",
                100: "#130a28",
                200: "#261450",
                300: "#391e78",
                400: "#4c28a0",
                500: "#5f32c8",
                600: "#7e59d5",
                700: "#9e82e0",
                800: "#beacea",
                900: "#dfd5f5",
            },
            arcana: {
                DEFAULT: "#d4b254",
                100: "#2f260c",
                200: "#5f4c18",
                300: "#8e7223",
                400: "#bd972f",
                500: "#d4b254",
                600: "#ddc176",
                700: "#e5d198",
                800: "#eee0ba",
                900: "#f6f0dd",
            },
            crafting: {
                DEFAULT: "#873622",
                100: "#1b0b07",
                200: "#36160d",
                300: "#512014",
                400: "#6c2b1b",
                500: "#873622",
                600: "#bd4c2f",
                700: "#d6745b",
                800: "#e4a292",
                900: "#f1d1c8",
            },
            charm: {
                DEFAULT: "#c03097",
                100: "#260a1e",
                200: "#4d133c",
                300: "#731d5b",
                400: "#992679",
                500: "#c03097",
                600: "#d452af",
                700: "#df7dc3",
                800: "#e9a9d7",
                900: "#f4d4eb",
            },
            nature: {
                DEFAULT: "#1f7a34",
                100: "#06180a",
                200: "#0d3115",
                300: "#13491f",
                400: "#19612a",
                500: "#1f7a34",
                600: "#2eb24d",
                700: "#55d372",
                800: "#8de2a1",
                900: "#c6f0d0",
            },
            medicine: {
                DEFAULT: "#cf3f3f",
                100: "#2b0b0b",
                200: "#561616",
                300: "#822020",
                400: "#ad2b2b",
                500: "#cf3f3f",
                600: "#d96666",
                700: "#e28c8c",
                800: "#ecb2b2",
                900: "#f5d9d9",
            },
            thieving: {
                DEFAULT: "#545140",
                100: "#11100d",
                200: "#222019",
                300: "#333126",
                400: "#434133",
                500: "#545140",
                600: "#7e795f",
                700: "#a29d83",
                800: "#c1beac",
                900: "#e0ded6",
            },
            blurple: {
                DEFAULT: "#5865F2",
            },
            core: {
                DEFAULT: "#666666",
            },
            base: {
                DEFAULT: "#666666",
            },
            aabase: {
                DEFAULT: "#666666",
            },
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
};
