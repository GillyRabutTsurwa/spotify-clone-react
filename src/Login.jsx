import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";


export default function Login() {
    const [authURL, setAuthURL] = useState();
    useEffect(() => {
        const fetchAuthURL = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/authorisation`);
                //NOTE: pour la ligne dessous, on peut chercher pour la valeur de "OK" de la propriété response.statusText
                if (response.status !== 200) throw new Error("Something went wrong retrieving the authorisation URL");
                const URL = response.data.url;
                setAuthURL(URL);
            } catch (err) {
                console.error(err.message);
            }
        };
      fetchAuthURL(); //NOTE: i know i could make this an IIFE, mais ça, ça me va
    }, [])
    
    
    return (
        <div className="container">
        {authURL ? (
            <a href={authURL} className="btn-login">
            <span>Login With Spotify</span>
            <i className="fa-brands fa-spotify"></i>
            </a>
        ) : <h4>Nothing for you here...</h4>}
        </div>
    );
}
