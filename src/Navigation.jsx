import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navigation">
        <a className="link" href="https://open.spotify.com/user/tsurwagilly?si=95759c042c3c4969" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-spotify"></i>
        </a>
        <span>Gil's Spotify Playlist</span>
        <a className="link" href="https://github.com/GillyRabutTsurwa/spotify-clone-react" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
        </a>
    </nav>
  )
}
