import React from "react";

const spotify_client_id = "a7d74f44a6174b56a37ad63b52cfef91";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${spotify_client_id}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
    return (
        <div>
            <a href={AUTH_URL}>Login</a>
        </div>
    );
}
