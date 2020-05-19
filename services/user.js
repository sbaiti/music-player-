const User = require("../models/user"),
    Q = require("q");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

userServices = {};
userServices.addUser = addUser;
userServices.login = login;
userServices.getUserById = getUserById
userServices.generateToken = generateToken;

async function addUser(user) {
    var deferred = Q.defer();
    let newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        login: user.login,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    User.findOne(
        { email: newUser.email } && { login: newUser.login },
        (err, user) => {
            if (err) deferred.reject(err);
            else if (user) deferred.reject("user already exist");
            else {
                newUser.save((err, userObject) => {
                    if (err) deferred.reject(err);
                    else deferred.resolve(userObject);
                });
            }
        }
    );
    return deferred.promise;
}

function login(userLogin) {
    var deferred = Q.defer();
    User.findOne({ login: userLogin.login }, async (err, user) => {
        if (err) deferred.reject(err);
        else if (!user) deferred.reject("Invalid login or password.");
        else {
            const validPassword = await bcrypt.compare(
                userLogin.password,
                user.password
            );
            if (!validPassword) deferred.reject("Invalid login or password.");
            else deferred.resolve(user);
        }
    });
    return deferred.promise;
}

function generateToken(user) {
    var deferred = Q.defer();
    const payload = {
        _id: user._id,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    jwt.sign(
        payload,
        config.get("secretOrKey"),
        { expiresIn: 720000 },
        (err, token) => {
            if (err) deferred.reject(err);
            else {
                deferred.resolve(token);
            }
        }
    );
    return deferred.promise;
}

function getUserById(id) {
    var deferred = Q.defer();

    User.findById({ _id: id }, (err, user) => {
        if (err) deferred.reject(err);
        else if (!user) deferred.reject("user with the given ID does not exist");
        else {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
}


module.exports = userServices;