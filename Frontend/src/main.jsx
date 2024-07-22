import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>    
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);
