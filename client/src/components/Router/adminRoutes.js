import AccountsPage from "../../pages/AccountsPage";
import { ACCOUNTS_ROUTE } from "../../utils/consts";

export const adminRoutes = [
    {
        path: ACCOUNTS_ROUTE,
        Component: AccountsPage,
    },
];
