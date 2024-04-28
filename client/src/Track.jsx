import "./Track.css";

export default function Track(props) {
    const { track, chooseTrack } = props;

    const playTrack = () => {
        chooseTrack(track);
    };

    return (
        <div onClick={playTrack} className="track" style={{ cursor: "pointer" }}>
            <img src={track.albumImg} />
            {/* <h4 key={track.id}>{track.title}</h4>
            <p>{track.album}</p> */}
        </div>
    );
}
