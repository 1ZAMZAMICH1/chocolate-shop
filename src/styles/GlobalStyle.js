import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-dark: #1a090d;
    --bg-gradient-start: #2d0f15;
    --bg-gradient-end: #0d0406;
    --accent: #D4AF37;
    --text-primary: #f0e6e6;
    --text-secondary: #ccc;
    --ui-border: rgba(255, 255, 255, 0.1);
    --ui-background: rgba(255, 255, 255, 0.05);
  }

  body {
    background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-dark) 50%, var(--bg-gradient-end) 100%);
    background-attachment: fixed;
    min-height: 100vh;
  }
`;