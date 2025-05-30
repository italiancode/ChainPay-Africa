const { theme } = require("./src/styles/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Use theme colors directly
                brand: theme.colors.brand,
                status: theme.colors.status,
                background: theme.colors.background,
                text: theme.colors.text,
                border: theme.colors.border,
                
                // ChainPay specific colors
                'chainpay': {
                    'blue': {
                        light: '#E6F0FF',
                        DEFAULT: '#0066FF',
                        dark: '#0052CC',
                    },
                    'sky': {
                        light: '#E6F9FF',
                        DEFAULT: '#00C2FF',
                        dark: '#0099CC',
                    },
                    'gold': {
                        light: '#FFF5E6',
                        DEFAULT: '#FFB800',
                        dark: '#CC9200',
                    },
                    'gray': {
                        50: '#F5F9FF',
                        100: '#E8EDF5',
                        200: '#D1D8E5',
                        300: '#B4BDCC',
                        400: '#8F96A7',
                        500: '#5A6478',
                        600: '#0A0F1E',
                    }
                },
            },
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.sizes,
            borderRadius: theme.radius,
            boxShadow: theme.shadows,
            spacing: theme.spacing,
            screens: theme.breakpoints,
            backgroundImage: {
                'gradient-primary': theme.colors.gradients.primary,
                'gradient-secondary': theme.colors.gradients.secondary,
                'gradient-dark': theme.colors.gradients.dark,
                'gradient-dark-primary': theme.colors.gradients['dark-primary'],
                'gradient-dark-secondary': theme.colors.gradients['dark-secondary'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-in-out',
                'slide-down': 'slideDown 0.3s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            zIndex: {
                'modal': 100,
                'dropdown': 50,
                'header': 40,
                'footer': 30,
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
}