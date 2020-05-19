const Music = require("../models/music"),
    Q = require("q");

MusicServices = {};
MusicServices.addMusic = addMusic;

/* ******************* add music ************************** */

function addMusic(music) {
    var deferred = Q.defer();
    newMusic = new Music({
        file: music.file,
        idUser: music.idUser
    });
    Music.findOne(
        { file: newMusic.file },
        (err, music) => {
            if (err) deferred.reject(err);
            else if (music) deferred.reject("music already exists");
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

module.exports = MusicServices;
