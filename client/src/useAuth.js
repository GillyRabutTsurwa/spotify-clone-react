import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
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
        const interval = setInterval(() => {
            axios
                .post("http://localhost:4242/refresh", {
                    refreshToken: refreshToken,
                })
                .then((response) => {
                    console.log(response.data);
                    setAccessToken(response.data.accessToken);
                    setExpiresIn(response.data.expiresIn);
                })
                .catch((err) => {
                    console.error(err);
                    window.location = "/";
                });

            return () => clearInterval(interval); //use a new interval when expiresIn or refreshToken changes before a refresh
        }, (expiresIn - 60) * 1000);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
