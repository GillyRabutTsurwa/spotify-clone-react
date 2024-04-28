import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(props) {
    const { accessToken, trackURI } = props;
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackURI]);

    if (!accessToken) return null;
    return (
        <SpotifyPlayer
            token={accessToken}
            name="Gil's Player"
            uris={trackURI ? [trackURI] : []}
            callback={(state) => {
                if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            showSaveIcon
        />
    );
}
