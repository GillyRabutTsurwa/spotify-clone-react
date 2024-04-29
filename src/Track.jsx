import "./Track.css";

export default function Track(props) {
    const { track, chooseTrack } = props;

    const playTrack = () => {
        chooseTrack(track);
    };

    return (
        <div onClick={playTrack} className="track">
            <figure>
            <img src={track.albumImg} />
            </figure>
            <div className="blur">
                <h4>{track.artist}</h4>
                <i className="fa-solid fa-play"></i>
                <h5>{track.title}</h5>
            </div>
        </div>
    );
}
