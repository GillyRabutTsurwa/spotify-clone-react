import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import Player from "./Player";
import Track from "./Track";
import "./Dashboard.css";

const spotifyAPI = new SpotifyWebApi({
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID
});

function randomArray(arr) {
    let newArray = [];
    // let numofPosts = 9;

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

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    console.log(accessToken);

    useEffect(() => {
        if (!accessToken) return;
        spotifyAPI.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyAPI
            .getPlaylist("00GNrKOUhzk1xanzyoWQhI", {
                offset: 800,
            })
            .then((response) => {
                console.log(response.body);
                console.log(response.body.tracks.items);
                const tracks = response.body.tracks.items.map((currentTrack) => {
                    const albumArtwork = currentTrack.track.album.images.find((currentAlbumImage) => currentAlbumImage.width === 300);
                    return {
                        id: currentTrack.track.id,
                        artist: currentTrack.track.artists[0].name,
                        title: currentTrack.track.name,
                        uri: currentTrack.track.uri,
                        album: currentTrack.track.album.name,
                        albumImg: albumArtwork.url,
                    };
                });
                const randomTracks = randomArray(tracks);
                setResults(randomTracks);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [accessToken]);

    return (
        <main className="container">
            <div className="tracks-list">
                {results.map((currentTrack) => {
                    return <Track track={currentTrack} key={currentTrack.id} chooseTrack={chooseTrack} />;
                })}
            </div>
            <Player accessToken={accessToken} trackURI={playingTrack?.uri} />
        </main>
    );
}