import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import Player from "./Player";
import Navigation from "./Navigation";
import Tracks from "./Tracks";
import "./Dashboard.css";

function randomArray(arr) {
    let newArray = [];

    while (newArray.length < arr.length) {
        const randomNumber = Math.round(Math.random() * (arr.length - 1));
        if (!newArray.includes(arr[randomNumber])) {
            newArray.push(arr[randomNumber]);
        }
    }
    return newArray;
}

export default function Dashboard(props) {
    const { code } = props;
    const [results, setResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const accessToken = useAuth(code);
    const categories = ["afrique", "house", "vapourwave", "liked"]; // NOTE: juste pour le moment
    const randomIndex = Math.floor(Math.random() * categories.length); //NOTE: aussi juste pour le moment

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    console.log(accessToken);

    useEffect(() => {
        if (!accessToken) return;
        (async () => {
            let playlist = [];
            let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/playlists/${categories[randomIndex]}`);
            console.log(response);
            playlist = response.data.playlist;
            const tracks = playlist.map((currentTrack) => {
                const albumArtwork = currentTrack.album.images.find((currentAlbumImage) => currentAlbumImage.width === 300);
                return {
                    id: currentTrack._id,
                    artist: currentTrack.artist,
                    title: currentTrack.title,
                    uri: currentTrack.uri,
                    album: currentTrack.album.name,
                    albumImg: albumArtwork.url,
                };
            });
            const randomTracks = randomArray(tracks);
            setResults(randomTracks);
        })();
    }, [accessToken]);

    return (
        <main className="container">
            <Navigation />
            <Tracks tracks={results} chooseTrack={chooseTrack} />
            <Player accessToken={accessToken} trackURI={playingTrack?.uri} />
        </main>
    );
}
