import "./Playlist.css";

function Playlist(props) {
    const { currentPlaylist, accessToken } = props;
    function handleClick(playlist) {
        console.log(playlist);
        console.log(accessToken);
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
