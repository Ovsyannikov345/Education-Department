import LoginPage from "../../pages/LoginPage";
import { LOGIN_ROUTE } from "../../utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
];
