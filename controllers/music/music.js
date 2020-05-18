var express = require('express');
var Router = express.Router();
var multer = require('multer');
var MusicServices = require('../../services/music')

/* storage of audio file */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.trim();
        cb(null, Date.now() + '-' + fileName)
    }
});

var upload = multer({ storage: storage });

/* spotify  api*/
var SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL,
});

Router.get('/login', (req, res) => {
    var html = spotifyApi.createAuthorizeURL(scopes)
    console.log(html)
    res.send(html + "&show_dialog=true")
})

Router.get('/redirect', async (req, res) => {
    const { code } = req.query;
    try {
        var data = await spotifyApi.authorizationCodeGrant(code)
        const { access_token, refresh_token } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        res.redirect('http://localhost:3000/home');
    } catch (err) {
        res.redirect('/#/error/invalid token');
    }
});

Router.get('/userinfo', async (req, res) => {
    try {
        var result = await spotifyApi.getMe();
        console.log(result.body);
        res.status(200).send(result.body)
    } catch (err) {
        res.status(400).send(err)
    }
});

Router.get('/playlists', async (req, res) => {
    try {
        const { token } = req.query;
        spotifyApi.setAccessToken(token);
        var result = await spotifyApi.getUserPlaylists();
        res.status(200).json(result.body);
    } catch (err) {
        res.status(400).json(err)
    }

});

/* uploaded api */
Router.post(
    "/uploaded", upload.single('audio'),
    (req, res) => {
        let audio;
        if (req.file)
            audio.file = req.file.filename;
        MusicServices.addMusic(audio)
            .then(musicObject => {
                res
                    .status(201)
                    .json({ Room: musicObject, msg: "music added with success" })
            }
            )
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);


module.exports = Router;