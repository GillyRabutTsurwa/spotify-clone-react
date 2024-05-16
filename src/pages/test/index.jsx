import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Tracks from "../../Tracks";
import Player from "../../Player";
import Navigation from "../../Navigation";

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

function Test() {
    const { state } = useLocation();
    const { id } = useParams();
    const [tracks, setTracks] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    const accessToken = JSON.parse(sessionStorage.getItem("access_token"));

    console.log(state);

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    useEffect(() => {
        if (!accessToken) return;
        (async () => {
            try {
                let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlist`, {
                    playlistID: id,
                });
                const tracks = response.data.map((currentData) => currentData.track);
                console.log(tracks);
                setTracks(randomArray(tracks));
            } catch (err) {
                console.error(err);
            } finally {
                console.log("Done");
            }
        })();
    }, [accessToken]);

    return (
        <>
            <Navigation />
            <Tracks tracks={tracks} chooseTrack={chooseTrack} />
            <Player accessToken={accessToken} trackURI={playingTrack?.uri} />
        </>
    );
}

export default Test;
