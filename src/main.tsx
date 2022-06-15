import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { projectApiSlice } from "./redux/rtkQuery/projectApiSlice";

import store from "./redux/store";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <BrowserRouter>
    {/* <ApiProvider api={projectApiSlice}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ApiProvider> */}
  </BrowserRouter>
  // </StrictMode>
);

