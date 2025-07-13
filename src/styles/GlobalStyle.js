import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Inter:wght@400;600&display=swap');

  :root {
    --font-heading: 'Cormorant Garamond', serif;
    --font-body: 'Inter', sans-serif;
    --bg-dark: #211517;
    --text-primary: #F5EAE0;
    --text-secondary: #a0998f;
    --accent: #E58969;
    --accent-hover: #D17A5A;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    background-color: var(--bg-dark);
    color: var(--text-primary);
    font-size: 1.6rem;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
  }
`;

export default GlobalStyle;