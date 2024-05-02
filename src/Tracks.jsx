import Track from "./Track";
import "./Tracks.css";

export default function Tracks(props) {
    const { tracks, chooseTrack } = props;
    return (
        <ul className="tracks-list">
            {tracks.map((currentTrack) => {
                return <Track track={currentTrack} key={currentTrack.id} chooseTrack={chooseTrack} />;
            })}
        </ul>
    );
}
