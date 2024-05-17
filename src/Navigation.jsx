import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation(props) {
    const { playlistName, playlistOwner } = props;
    console.log(playlistName);
    return (
        <nav className="navigation">
            <Link to="/library" className="link">
                <i className="fa-brands fa-spotify"></i>
            </Link>
            {/* <span>{user}'s Spotify Playlist</span> */}
            <span>
                {playlistOwner}'s {playlistName} Playlist
            </span>
            <a className="link" href="https://github.com/GillyRabutTsurwa/spotify-clone-react" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>
            </a>
        </nav>
    );
}
