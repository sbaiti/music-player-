const express = require('express'),
    Router = express.Router(),
    multer = require('multer'),
    MusicServices = require('../../services/music'),
    passport = require("passport"),
    Music = require('../../models/music'),
    path = require('path');

/* storage of audio file */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.trim();
        cb(null, fileName)
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
    "/uploaded", passport.authenticate("jwt", { session: false }), upload.single('audio'),
    (req, res) => {
        let audio = {};
        if (req.file)
            audio.file = req.file.filename;
        MusicServices.addMusic({ ...audio, idUser: req.body.idUser })
            .then(musicObject => {
                res
                    .status(201)
                    .json({ music: musicObject, msg: "music added with success" })
            }
            )
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.get("/allMusicUploaded", (req, res) => {
    Music.find({ idUser: req.query.idUser }, (err, musics) => {
        if (err)
            return res.status(404).json({ success: false, msg: [{ err }] })
        return res.status(200).json({ success: true, musics })
    })
})

Router.get('/musicsByName', function (req, res, next) {
    var options = {
        root: path.resolve(process.cwd() + '/public/uploads/'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.query.audio;
    res.status(200).sendFile(fileName, options, function (err) {
        if (err)
            next(err);
    });
});


module.exports = Router;