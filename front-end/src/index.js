import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
     //using browser router for entire app.
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);