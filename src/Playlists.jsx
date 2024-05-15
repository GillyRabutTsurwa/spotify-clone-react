import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import Player from "./Player";
import Navigation from "./Navigation";
import Tracks from "./Tracks";
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

    //NEW
    function handleChange(e) {
        setUsername(e.target.value);
    }

    //NEW
    function handleSubmit(e) {
        e.preventDefault();
        if (!accessToken) return;
        setUsername(e.target.elements.username.value);
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
    }

    //NEW
    function handleClick(playlist) {
        const { id, name } = playlist;
        console.log({ name: name, id: id });
    }

    console.log(accessToken);

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
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={username} name="username" id="username" placeholder="Enter Spotify Username" />
                <input type="submit" value="Search" />
            </form>
            <ul className="playlists-list">
                {playlists.map((currentPlaylist) => {
                    return (
                        <li onClick={() => handleClick(currentPlaylist)} className="playlist">
                            <figure>
                                <img src={currentPlaylist.images[0].url} />
                            </figure>
                            <div className="blur">
                                <h4>{currentPlaylist.name}</h4>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
