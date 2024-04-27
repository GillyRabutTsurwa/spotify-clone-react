import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";

const spotifyAPI = new SpotifyWebApi({
    clientId: "a7d74f44a6174b56a37ad63b52cfef91",
});

export default function Dashboard(props) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const { code } = props;
    const accessToken = useAuth(code);

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
        return () => (cancel = true);
    }, [search, accessToken]);

    return (
        <div>
            <div>
                <input onChange={(e) => setSearch(e.target.value)} type="search" id="mySearch" name="q" placeholder="Search Songs" />
                <button>Search</button>
            </div>
            <div>
                {results.map((currentTrack) => {
                    return (
                        <div>
                            <img src={currentTrack.albumImg} />
                            <h4 key={currentTrack.id}>{currentTrack.title}</h4>
                            <p>{currentTrack.album}</p>
                        </div>
                    );
                })}
            </div>
            <div>bottom</div>
        </div>
    );
}
