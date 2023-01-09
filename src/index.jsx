import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";

const Root = ReactDOM.createRoot(document.getElementById("root"));
Root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
