import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyle } from "./style/globalStyle.tsx";
import { ThemeProvider } from "styled-components";
import { blueTheme } from "./theme.ts";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={blueTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
