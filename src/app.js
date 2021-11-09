const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

// Make the server
var server;
var port = 5000;

// Page listeners (our router)
var router = require("./router.js");
router(app);

// Service listeners (our data processes)
var services = require("./services.js");
services(app);

// Listen
server = app.listen(port, function(err) {
    if (err) {
        throw err;
    }

    console.log("Listening on port " + port);
});