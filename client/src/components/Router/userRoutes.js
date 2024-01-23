import {
    ADDEVENT_ROUTE,
    MAINPAGE_ROUTE,
    OFFENSIVES_ROUTE,
    ADDOFFENSIVE_ROUTE,
    REPORTS_ROUTE,
    EVENTDETAILS_ROUTE,
    OFFENSEDETAILS_ROUTE,
} from "../../utils/consts";
import MainPage from "../../pages/Main";
import AddEvent from "../../pages/AddEventPage";
import EventDetailsPage from "../../pages/EventDetailsPage";
import OffensesPage from "../../pages/OffensesPage";
import AddOffensePage from "../../pages/AddOffensePage";
import OffenseDetailsPage from "../../pages/OffenseDetailsPage";
import ReportsPage from "../../pages/ReportsPage";

export const userRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage,
    },
    {
        path: ADDEVENT_ROUTE,
        Component: AddEvent,
    },
    {
        path: EVENTDETAILS_ROUTE,
        Component: EventDetailsPage,
    },
    {
        path: OFFENSIVES_ROUTE,
        Component: OffensesPage,
    },
    {
        path: ADDOFFENSIVE_ROUTE,
        Component: AddOffensePage,
    },
    {
        path: OFFENSEDETAILS_ROUTE,
        Component: OffenseDetailsPage,
    },
    {
        path: REPORTS_ROUTE,
        Component: ReportsPage,
    },
];
