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

app.post("/login", (request, response) => {
    const code = request.body.code;
    console.log(code);
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:5173/callback",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
    });
    spotifyAPI.authorizationCodeGrant(code).then((data) => {
        response.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        });
    });
});

app.get("/login", (request, response) => {
    const scope =
        "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";
    const parsedParams = {
        response_type: "code",
        redirect_uri: "http://localhost:5173/callback",
        client_id: CLIENT_ID,
        scope: scope,
    };

    response.json({
        url: "https://accounts.spotify.com/authorize?" + queryString.stringify(parsedParams),
    });
});

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});
