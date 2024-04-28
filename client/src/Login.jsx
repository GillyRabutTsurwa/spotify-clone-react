import { Container } from "react-bootstrap";

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=a7d74f44a6174b56a37ad63b52cfef91&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing";

export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh " }}>
            <a href={AUTH_URL} className="btn btn-success btn-large">
                Login With Spotify
            </a>
        </Container>
    );
}
