import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "~/App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root element does not exist");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
