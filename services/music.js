const Music = require("../models/music"),
    Q = require("q");

MusicServices = {};
MusicServices.addMusic = addMusic;
MusicServices.findAllUploadedMusic = findAllUploadedMusic;

/* ******************* add music ************************** */

function addMusic(music) {
    var deferred = Q.defer();
    newMusic = new Music({
        file: music.file,
    });
    Music.findOne(
        { file: newMusic.file },
        (err, music) => {
            if (err) deferred.reject(err);
            else if (music) deferred.reject("musicModel already exists");
            else {
                newMusic.save((err, musicObject) => {
                    if (err) deferred.reject(err);
                    else deferred.resolve(musicObject);
                });
            }
        }
    );
    return deferred.promise;
}

/* ********************************* find all *************************** */

function findAllUploadedMusic() {
    var deferred = Q.defer();
    Music.find({}, (err, musics) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(musics);
        }
    });
    return deferred.promise;
}

module.exports = MusicServices;
