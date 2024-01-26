import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";
import { LOGIN_ROUTE, MAINPAGE_ROUTE } from "../../utils/consts";

const AppRouter = () => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken) {
        return (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            {userRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}
            {role === "admin" &&
                adminRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
            <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
