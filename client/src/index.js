import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import EventStore from "./store/EventStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const Context = createContext(null);

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                eventStore: new EventStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);
