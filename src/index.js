import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import * as serviceWorker from "./serviceWorker";

ReactDom.render(<App />, document.getElementById("app"));
serviceWorker.register();
