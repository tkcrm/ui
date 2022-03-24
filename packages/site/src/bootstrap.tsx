import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary, UIContext, UIContextClass } from "@tkcrm/ui";

import App from "./components/App";
import { routes } from "./routes";

import "./assets/css/style.css";

ReactDOM.render(
  <ErrorBoundary>
    <UIContext.Provider value={new UIContextClass({ routes })}>
      <Router>
        <App />
      </Router>
    </UIContext.Provider>
  </ErrorBoundary>,
  document.querySelector("#root")
);
