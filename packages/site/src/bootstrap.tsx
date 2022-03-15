import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";

import "./assets/css/style.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
