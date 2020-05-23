var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    userServices = require("../services/user"),
    config = require('../config/default.json');

//,passport.authenticate('jwt',{session:false}) 
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

        userServices.getUserById(jwt_payload._id).then((user) => {
            return done(null, user);
        }).catch(err => {
            return done(null, false);
        })
    }));

}
