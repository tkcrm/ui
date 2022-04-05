import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary, UIContext, UIContextClass } from "@tkcrm/ui";

import App from "./components/App";
import { routes } from "./routes";

import "./assets/css/style.css";

const rootElement = document.querySelector("#root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <UIContext.Provider value={new UIContextClass({ routes })}>
        <Router>
          <App />
        </Router>
      </UIContext.Provider>
    </ErrorBoundary>
  );
}
