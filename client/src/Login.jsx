import "./Login.css";

const DEV_CLIENT_URI = import.meta.env.VITE_DEV_CLIENT_REDIRECT_URI;
const PROD_CLIENT_URI = import.meta.env.VITE_PROD_CLIENT_REDIRECT_URI;

const REDIRECT_URI = import.meta.env.DEV ? DEV_CLIENT_URI : PROD_CLIENT_URI;


const AUTH_URL =
    `https://accounts.spotify.com/authorize?client_id=a7d74f44a6174b56a37ad63b52cfef91&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing`;

export default function Login() {
    return (
        <div className="container">
            <a href={AUTH_URL} className="btn-login">
                <span>Login With Spotify</span>
                <i class="fa-brands fa-spotify"></i>
            </a>
        </div>
    );
}
