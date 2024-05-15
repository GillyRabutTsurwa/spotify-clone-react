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

export default function Dashboard(props) {
    const { code } = props;
    const [results, setResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [username, setUsername] = useState();
    const [playlists, setPlaylists] = useState([]);
    const accessToken = useAuth(code);
    const categories = ["afrique", "house", "vapourwave", "liked"]; // NOTE: juste pour le moment
    const randomIndex = Math.floor(Math.random() * categories.length); //NOTE: aussi juste pour le moment

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    //NEWIMPORTANT: takes a payload coming from child component
    function handleInputChange(payload) {
        console.log(payload);
        setUsername(payload);
    }

    //NOTEIMPORTANT: celle fonction-ci aussi
    function handleFormSubmit(payload) {
        console.log(payload);
        if (!accessToken) return;
        setUsername(payload);
        (async () => {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlists`, {
                user: username,
            });
            console.log(response);
            const playlists = response.data;
            setPlaylists(randomArray(playlists));
        })();
        console.log(username);
    }

    useEffect(() => {
        if (!accessToken) return;
        setUsername("tsurwagilly");
        (async () => {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlists`, {
                user: username,
            });
            console.log(response);
            const playlists = response.data;
            setPlaylists(randomArray(playlists));
        })();
        console.log(username);
        setUsername("");
    }, [accessToken]);

    return (
        <main className="container">
            <Search inputChange={handleInputChange} formSubmit={handleFormSubmit} />
            <ul className="playlists-list">
                {playlists.map((currentPlaylist) => {
                    return <Playlist currentPlaylist={currentPlaylist} accessToken={accessToken} />;
                })}
            </ul>
        </main>
    );
}
