import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import Player from "./Player";
import Track from "./Track";

const spotifyAPI = new SpotifyWebApi({
    clientId: "a7d74f44a6174b56a37ad63b52cfef91",
});

export default function Dashboard(props) {
    const { code } = props;
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const accessToken = useAuth(code);

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch("");
    }

    console.log(accessToken);

    useEffect(() => {
        if (!accessToken) return;
        spotifyAPI.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) {
            setResults([]);
            return;
        }
        if (!accessToken) return;

        let cancel = false;
        spotifyAPI.searchTracks(search).then((response) => {
            if (cancel) return;
            console.log(response.body.tracks.items);
            const tracks = response.body.tracks.items.map((currentTrack) => {
                const albumArtwork = currentTrack.album.images.find((currentAlbumImage) => currentAlbumImage.width === 300); // this will work for now
                return {
                    id: currentTrack.id,
                    artist: currentTrack.artists[0].name,
                    title: currentTrack.name,
                    uri: currentTrack.uri,
                    album: currentTrack.album.name,
                    albumImg: albumArtwork.url,
                };
            });
            setResults(tracks);
            console.log(results);
        });
        console.log(accessToken);
        return () => (cancel = true);
    }, [search, accessToken]);

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh " }}>
            <div>
                <input onChange={(e) => setSearch(e.target.value)} type="search" id="mySearch" name="search" placeholder="Search Songs" />
            </div>
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {results.map((currentTrack) => {
                    return <Track track={currentTrack} key={currentTrack.id} chooseTrack={chooseTrack} />;
                })}
            </div>
            <Player accessToken={accessToken} trackURI={playingTrack?.uri} />
        </Container>
    );
}
