import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { userRoutes } from "./userRoutes";
import { LOGIN_ROUTE, MAINPAGE_ROUTE } from "../../utils/consts";

const AppRouter = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    useEffect(() => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";

        document.body.appendChild(iframe);
        iframe.contentWindow.addEventListener("storage", () => {
            setAccessToken(localStorage.getItem("accessToken"));
        });

        return () => {
            iframe.contentWindow.removeEventListener("storage", () => {
                setAccessToken(localStorage.getItem("accessToken"));
            });
            document.body.removeChild(iframe);
        };
    }, []);

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
            <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
