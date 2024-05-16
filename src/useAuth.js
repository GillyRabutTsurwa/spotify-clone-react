import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
    const storedAccessToken = JSON.parse(sessionStorage.getItem("access_token"));

    const [accessToken, setAccessToken] = useState(storedAccessToken || null);
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
                    code: code,
                });
                console.log(response.data);
                setAccessToken(response.data.accessToken);
                sessionStorage.setItem("access_token", JSON.stringify(response.data.accessToken));
                setExpiresIn(response.data.expiresIn); //NOTE: j'en ai besoin vraiment ici ?
                window.location.href = "/callback";
            } catch (err) {
                console.error(err);
                window.location = "/";
            }
        })();
    }, [code]);

    useEffect(() => {
        if (!expiresIn) return;
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/refresh`);
                console.log(response.data);
                setAccessToken(response.data.accessToken);
                sessionStorage.setItem("access_token", JSON.stringify(response.data.accessToken));
                setExpiresIn(response.data.expiresIn); // ici j'en ai besoin pour l'interval (minuteur)
            } catch (err) {
                console.error(err);
                window.location = "/";
            }
            return () => clearInterval(interval);
        }, (expiresIn + 60) * 1000); //NOTE: changing interval from 59 minutes to 60.5 minutes
    }, []);
    return accessToken;
}
