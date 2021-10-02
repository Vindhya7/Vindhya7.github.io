import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/index.css";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router basename="/">
    <App />
  </Router>,
  document.querySelector("#root")
);
