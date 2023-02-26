import { ErrorBoundary, UIContext, UIContextClass } from "@tkcrm/ui";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "@/components/App";
import { routes } from "./routes";

import "@/assets/css/style.css";

const rootElement = document.querySelector("#root");
rootElement &&
  createRoot(rootElement).render(
    <ErrorBoundary>
      <UIContext.Provider value={new UIContextClass({ routes })}>
        <Router>
          <App />
        </Router>
      </UIContext.Provider>
    </ErrorBoundary>
  );
