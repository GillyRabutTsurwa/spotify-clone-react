require("dotenv").config({
    path: "../.env", //IMPORTANT: fixes the issue of env variables being undefined within separate directory. can also do path.join(__dirname, "..")
});

const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 4242;

app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.post("/refresh", (request, response) => {
    const refreshToken = request.body.refreshToken;
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:5173/callback",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: refreshToken,
    });
    spotifyAPI
        .refreshAccessToken()
        .then((data) => {
            console.log("Access token refreshed");
            console.log(data.body);
            response.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            console.error("Could not refresh accesss token", err);
        });
});

app.post("/login", (request, response) => {
    const code = request.body.code;
    console.log(code);
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:5173/callback",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    spotifyAPI
        .authorizationCodeGrant(code)
        .then((data) => {
            response.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            console.log("Done");
        });
});

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});
