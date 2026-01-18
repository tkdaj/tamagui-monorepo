import React from "react";
import ReactDOM from "react-dom/client";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <TamaguiProvider config={config} defaultTheme="light">
        <App />
      </TamaguiProvider>
    </React.StrictMode>
  );
}
