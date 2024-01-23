import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const Context = createContext(null);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
