import "./Playlist.css";
import { useNavigate } from "react-router-dom";

function Playlist(props) {
    const { currentPlaylist, accessToken } = props;
    const navigate = useNavigate();

    function handleClick(playlist) {
        console.log(playlist);
        console.log(accessToken);
        navigate(`/library/${currentPlaylist._id}`, {
            state: {
                playlist: currentPlaylist,
                accessToken: accessToken,
            },
        });
    }
    return (
        <li onClick={() => handleClick(currentPlaylist)} className="playlist">
            <figure>
                <img src={currentPlaylist.images[0].url} />
            </figure>
            <div className="blur">
                <h4>{currentPlaylist.name}</h4>
            </div>
        </li>
    );
}

export default Playlist;
