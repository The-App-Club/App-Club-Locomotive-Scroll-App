import {createGlobalStyle} from 'styled-components';
import '@fontsource/kaushan-script';
import '@fontsource/sirin-stencil';

const GlobalStyles = createGlobalStyle`
  *,::before,::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Kaushan Script";
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export {GlobalStyles};
