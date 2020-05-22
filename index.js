const config = require('./back-part/config/default.json'),
    bodyParser = require('body-parser'),
    express = require('express'),
    port = process.env.port || config.port,
    mongoose = require("mongoose"),
    passport = require("passport"),
    app = express();

require("./back-part/passport/passportJwt")(passport);
passport.initialize();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./back-part/middleware/cors")(app);

app.use("/music", require("./back-part/controllers/music"));
app.use("/user", require("./back-part/controllers/user"));

mongoose
    .connect(config.dbConfig, { useNewUrlParser: true })
    .then(() => {
        console.log("data base connected !");
        app.listen(port, () => {
            console.log("server is connected on port:", port);
        });
    })
    .catch(err => {
        console.log(err);
    });
