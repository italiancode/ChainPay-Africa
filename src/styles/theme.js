const theme = {
  colors: {
    brand: {
      primary: '#0066FF',
      secondary: '#00C2FF',
      accent: '#FFB800',
      success: '#00D632',
      warning: '#FFB800',
      error: '#FF3366',
      info: '#0091FF',
    },
    status: {
      success: '#00D632',
      warning: '#FFB800',
      error: '#FF3366',
      info: '#0091FF',
    },
    background: {
      main: '#FFFFFF',
      card: '#FFFFFF',
      dark: '#0A0F1E',
      light: '#F5F7FA',
      medium: '#E8EDF5',
      overlay: 'rgba(10, 15, 30, 0.7)',
      'dark-main': '#0A0F1E',
      'dark-card': '#1A2235',
      'dark-light': '#2A3348',
      'dark-medium': '#3A445B',
    },
    text: {
      primary: '#0A0F1E',
      secondary: '#5A6478',
      muted: '#8F96A7',
      dark: '#0A0F1E',
      light: '#FFFFFF',
      'dark-primary': '#FFFFFF',
      'dark-secondary': '#B4BDCC',
      'dark-muted': '#8F96A7',
    },
    border: {
      light: '#E8EDF5',
      medium: '#D1D8E5',
      dark: '#B4BDCC',
      'dark-light': '#2A3348',
      'dark-medium': '#3A445B',
      'dark-dark': '#4A556E',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0066FF 0%, #00C2FF 100%)',
      secondary: 'linear-gradient(135deg, #FFB800 0%, #FFD600 100%)',
      dark: 'linear-gradient(135deg, #0A0F1E 0%, #1A2235 100%)',
      'dark-primary': 'linear-gradient(135deg, #1A2235 0%, #2A3348 100%)',
      'dark-secondary': 'linear-gradient(135deg, #2A3348 0%, #3A445B 100%)',
    },
  },
  radius: {
    'none': '0',
    'sm': '0.375rem',
    'md': '0.5rem',
    'lg': '0.75rem',
    'xl': '1rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    'full': '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(10, 15, 30, 0.05)',
    md: '0 4px 6px rgba(10, 15, 30, 0.07)',
    lg: '0 8px 16px rgba(10, 15, 30, 0.1)',
    xl: '0 12px 24px rgba(10, 15, 30, 0.15)',
    'dark-sm': '0 2px 4px rgba(0, 0, 0, 0.2)',
    'dark-md': '0 4px 6px rgba(0, 0, 0, 0.25)',
    'dark-lg': '0 8px 16px rgba(0, 0, 0, 0.3)',
    'dark-xl': '0 12px 24px rgba(0, 0, 0, 0.35)',
  },
  typography: {
    fontFamily: {
      sans: 'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
  }
};

module.exports = { theme };
