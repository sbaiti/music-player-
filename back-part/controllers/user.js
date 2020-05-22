const express = require("express"),
    Router = express.Router(),
    userServices = require("../services/user"),
    { validate } = require("../validators/user"),
    passport = require("passport"),
    Joi = require("joi");

Router.post(
    "/addUser",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        userServices
            .addUser(req.body)
            .then(userObject =>
                res
                    .status(201)
                    .json({ user: userObject, msg: "user added with success" })
            )
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.post("/login", (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    userServices
        .login(req.body)
        .then(user =>
            userServices.generateToken(user).then(token => {
                res.status(200).json({
                    token,
                    user,
                    msg: "success"
                });
            })
        )
        .catch(err => {
            res.status(400).json({ err });
        });
});

function validateLogin(req) {
    const schema = {
        login: Joi.string()
            .min(1)
            .max(50)
            .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required()
    };

    return Joi.validate(req, schema);
}
module.exports = Router;