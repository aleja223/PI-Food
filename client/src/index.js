import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
