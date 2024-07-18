import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import MenuContextProvider from "./context/MenuContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MenuContextProvider>
      <App />
    </MenuContextProvider>
  </React.StrictMode>,
);
