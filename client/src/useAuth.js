import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
    const storedAccessToken = JSON.parse(sessionStorage.getItem("access_token"));

    const [accessToken, setAccessToken] = useState(storedAccessToken || null);
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios
            .post("http://localhost:4242/login", {
                code: code,
            })
            .then((response) => {
                console.log(response.data);
                setAccessToken(response.data.accessToken);
                sessionStorage.setItem("access_token", JSON.stringify(response.data.accessToken));
                setRefreshToken(response.data.refreshToken);
                setExpiresIn(response.data.expiresIn);
            })
            .catch((err) => {
                console.error(err);
                window.location = "/";
            });
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        console.log("Refresh Token");
        console.log(refreshToken);
        const interval = setInterval(() => {
            axios
                .post("http://localhost:4242/refresh", {
                    refreshToken: refreshToken,
                })
                .then((response) => {
                    console.log(response.data);
                    setAccessToken(response.data.accessToken);
                    sessionStorage.setItem("access_token", JSON.stringify(response.data.accessToken));
                    setExpiresIn(response.data.expiresIn);
                })
                .catch((err) => {
                    console.error(err);
                    window.location = "/";
                });

            return () => clearInterval(interval);
        }, (expiresIn - 60) * 1000);
    }, [refreshToken, expiresIn]);
    return accessToken;
}
