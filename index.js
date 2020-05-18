const bodyParser = require('body-parser'),
    config = require("config"),
    express = require('express'),
    port = process.env.port || config.get('port'),
    mongoose = require("mongoose"),
    passport = require("passport"),
    app = express();

require("./passport/passportJwt")(passport);
passport.initialize();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./middleware/cors")(app);

//app.use("/music", require("./controllers/music"));
app.use("/user", require("./controllers/user/user"));

mongoose
    .connect(config.get("dbConfig"), { useNewUrlParser: true })
    .then(() => {
        console.log("data base connected !");
        app.listen(port, () => {
            console.log("server is connected on port:", port);
        });
    })
    .catch(err => {
        console.log(err);
    });
