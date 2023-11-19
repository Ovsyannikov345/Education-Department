import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/Router/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default observer(App);
