import React from "react";
import ReactDOM from "react-dom";

// Component
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";

// Css
import "./index.css";

// Redux
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
