import { injectGlobal } from "react-emotion"
import { textColor, themeColor } from "./colors"

export function applyGlobalStyles() {
  injectGlobal`
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      background-color: ${themeColor};
      color: ${textColor};
      font: 18px Roboto, sans-serif;
      cursor: default;
      word-wrap: break-word;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    button, input, textarea {
      background: transparent;
      border: none;
      font: inherit;
      color: inherit;
      text-align: inherit;
    }

    fieldset {
      border: none;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: "Roboto Condensed", sans-serif;
      font-weight: 300;
    }

    ul, li {
      list-style: none;
    }
  `
}
