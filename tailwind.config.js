module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      'ipad-pro': '834px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        /* Text Colors */
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)", 
          accent: "var(--text-accent)",
          muted: "var(--text-muted)",
          golden: "var(--text-golden)",
          gray: "var(--text-gray)",
          light: "var(--text-light)",
          white: "var(--text-white)"
        },
        /* Background Colors */
        background: {
          main: "var(--bg-light)",
          dark: "var(--bg-dark)",
          golden: "var(--bg-golden)",
          light: "var(--bg-light-golden)",
          cream: "var(--bg-cream)",
          white: "var(--bg-white)"
        },
        /* Border Colors */
        border: {
          primary: "var(--border-light)",
          golden: "var(--border-golden-light)",
          white: "var(--border-white)"
        },
        /* Component-specific Colors */
        header: {
          background: "var(--header-bg)"
        },
        button: {
          primary: "var(--button-bg-primary)",
          secondary: "var(--button-bg-secondary)",
          text: "var(--button-text-primary)"
        },
        footer: {
          background: "var(--footer-bg)"
        },
        star: {
          background: "var(--star-bg)"
        }
      },
      /* Typography */
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'bold': 'var(--font-weight-bold)'
      },
      lineHeight: {
        'xs': 'var(--line-height-xs)',
        'sm': 'var(--line-height-sm)',
        'base': 'var(--line-height-base)',
        'md': 'var(--line-height-md)',
        'lg': 'var(--line-height-lg)',
        'xl': 'var(--line-height-xl)'
      },
      fontFamily: {
        'geist': ['Geist', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif']
      },
      /* Spacing */
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)'
      },
      /* Border Radius */
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)', 
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
        '5xl': 'var(--radius-5xl)'
      },
      /* Gap */
      gap: {
        'xs': 'var(--gap-xs)',
        'sm': 'var(--gap-sm)',
        'md': 'var(--gap-md)',
        'lg': 'var(--gap-lg)',
        'xl': 'var(--gap-xl)',
        '2xl': 'var(--gap-2xl)',
        '3xl': 'var(--gap-3xl)',
        '4xl': 'var(--gap-4xl)',
        '5xl': 'var(--gap-5xl)'
      }
    }
  },
  plugins: []
};