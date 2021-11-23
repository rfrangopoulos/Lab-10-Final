const path = require('path');

// Page Listeners
var router = function(app) {
    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/home.html"));
    });

    app.get('/form', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/form.html"));
    });

    app.get('/table', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/table.html"));
    });

    app.get('/browse', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/restaurant.html"));
    });

};

module.exports = router;