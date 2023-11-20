import {
    ADDEVENT_ROUTE,
    MAINPAGE_ROUTE,
    OFFENSIVE_ROUTE,
    REPORTS_ROUTE,
} from "../../utils/consts";
import AddEvent from "../../pages/AddEventPage";
import MainPage from "../../pages/Main";
import OffensivePage from "../../pages/OffensivePage";
import ReportsPage from "../../pages/ReportsPage";

export const publicRoutes = [
    {
        path: ADDEVENT_ROUTE,
        Component: AddEvent,
    },
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage,
    },
    {
        path: OFFENSIVE_ROUTE,
        Component: OffensivePage,
    },
    {
        path: REPORTS_ROUTE,
        Component: ReportsPage,
    },
];
