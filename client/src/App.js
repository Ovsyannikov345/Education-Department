import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/en-gb";
import AppRouter from "./components/Router/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
            <BrowserRouter>
                <NavBar />
                <AppRouter />
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default observer(App);
