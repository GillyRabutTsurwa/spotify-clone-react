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
    }, [refreshToken, expiresIn]);

    return accessToken;
}
