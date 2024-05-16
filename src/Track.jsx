import "./Track.css";

export default function Track(props) {
    const { track, chooseTrack } = props;

    console.log(track);

    const playTrack = () => {
        chooseTrack(track);
    };

    return (
        <li onClick={playTrack} className="track">
            <figure>
                <img src={track.album.images[1].url} />
            </figure>
            <div className="blur">
                <h4>{track.artists[0].name}</h4>
                <i className="fa-solid fa-play"></i>
                <h5>{track.name}</h5>
            </div>
        </li>
    );
}
