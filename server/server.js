require("dotenv").config();

const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const queryString = require("node:querystring");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 4242;
const CLIENT_ID = "a7d74f44a6174b56a37ad63b52cfef91";
const CLIENT_SECRET = "d9e3610739d7497eadfab42dae8098e1";

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
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: refreshToken,
    });
    spotifyAPI
        .refreshAccessToken()
        .then((data) => {
            console.log("Access token refreshed");
            console.log(data.body);
            // spotifyAPI.setAccessToken(data.body.access_token);
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
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
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