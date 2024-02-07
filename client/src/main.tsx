import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.tsx";
import { ReactQueryProvider } from "./components/providers/react-query.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>
);
