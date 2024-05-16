import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import Search from "./Search";
import Playlist from "./Playlist";
import "./Playlists.css";

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

export default function Playlists() {
    const code = JSON.parse(sessionStorage.getItem("code"));
    // const [results, setResults] = useState([]);
    // const [playingTrack, setPlayingTrack] = useState();
    const [username, setUsername] = useState();
    const [playlists, setPlaylists] = useState([]);
    const accessToken = useAuth(code);
    // const categories = ["afrique", "house", "vapourwave", "liked"]; // NOTE: juste pour le moment
    // const randomIndex = Math.floor(Math.random() * categories.length); //NOTE: aussi juste pour le moment

    // function chooseTrack(track) {
    //     setPlayingTrack(track);
    // }

    async function getSpotifyUser() {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/me`);
        const data = response.data;
        return data;
    }

    async function getUserPlaylists(spotifyUser) {
        try {
            // NOTE: code repetitive ici
            let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlists`, {
                user: spotifyUser,
            });
            console.log(response);
            const playlists = response.data;
            setPlaylists(randomArray(playlists));
        } catch (err) {
            console.error(err);
        } finally {
            console.log(spotifyUser);
        }
    }

    //NEWIMPORTANT: takes a payload coming from child component
    function handleInputChange(payload) {
        console.log(payload);
        setUsername(payload);
    }

    //NOTEIMPORTANT: celle fonction-ci aussi
    async function handleFormSubmit(payload) {
        console.log(payload);
        if (!accessToken) return;
        const user = await getSpotifyUser();
        setUsername(payload || user.id);
        // NOTE: et ici. mais pour le moment ca se regle
        try {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlists`, {
                user: username,
            });
            console.log(response);
            const playlists = response.data;
            setPlaylists(randomArray(playlists));
        } catch (err) {
            console.error(err);
        } finally {
            console.log(username);
        }
    }

    useEffect(() => {
        if (!accessToken) return;
        (async () => {
            const user = await getSpotifyUser();
            await getUserPlaylists(user.id);
        })();
    }, [accessToken]);

    return (
        <main className="container">
            <Search inputChange={handleInputChange} formSubmit={handleFormSubmit} />
            <ul className="playlists-list">
                {playlists.map((currentPlaylist) => {
                    return <Playlist currentPlaylist={currentPlaylist} accessToken={accessToken} key={currentPlaylist.id} />;
                })}
            </ul>
        </main>
    );
}
