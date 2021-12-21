const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const dbURL = "mongodb://localhost";

var services = function(app) {
    app.post('/write-record', function(req, res) {

        var id = "rest" + Date.now();

        var restDataJS = {
            id: id,
            restName: req.body.restName,
            restAddress: req.body.restAddress,
            restCity: req.body.restCity,
            restZip: req.body.restZip,
            restPhone: req.body.restPhone,
            restFoodType: req.body.restFoodType,
            restAvgCustRating: req.body.restAvgCustRating
        };

        console.log(restDataJS);

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if (err) {
                res.send(JSON.stringify({msg: err}));
            } else {
                var dbo = client.db("restaurant");
                dbo.collection("restaurants").insertOne(restDataJS, function(err) {
                    if(err) {
                        res.send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "Success!"}));
                        client.close();
                    }
                });
            }
        });
    });

    app.get('/get-record', function(req, res) {

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(200).send(JSON.stringify({msg: err}));
            } else {
                var dbo = client.db("restaurant");

                dbo.collection("restaurants").find().toArray(function(err, data) {
                    if (err) {
                        res.send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "Success!", restData: data}));
                    }
                    client.close();
                });
            }
        });
    });

    app.get('/get-recordByType', function(req, res) {
        var type = req.query.restFoodType;
        var search = (type === "") ? { } : {restFoodType: type};

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(200).send(JSON.stringify({msg: err}));
            } else {
                var dbo = client.db("restaurant");

                dbo.collection("restaurants").find(search).toArray(function(err, data) {
                    if (err) {
                        res.send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "Success!", restData: data}));
                    }
                    client.close();
                });
            }
        });
    });

    app.delete('/delete-record', function(req, res) {

        var restID = req.query.id;
        var search = {id: restID};

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(200).send(JSON.stringify({msg: err}));
            } else {
                var dbo = client.db("restaurant");

                dbo.collection("restaurants").deleteOne(search, function(err) {
                    if (err) {
                        return res.status(200).send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "Success!"}));
                        client.close();
                    }
                })
            }
        })
    });

    app.put('/update-record', function(req, res) {
        var restID = req.body.id;
        var restName = req.body.restName;
        var restAddress = req.body.restAddress;
        var restCity = req.body.restCity;
        var restZip = req.body.restZip;
        var restPhone = req.body.restPhone;
        var restFoodType = req.body.restFoodType;
        var restAvgCustRating = req.body.restAvgCustRating;

        var search = {id: restID};
        var newData = {
            $set: {
                restName: restName,
                restAddress: restAddress,
                restCity: restCity,
                restZip: restZip,
                restPhone: restPhone,
                restFoodType: restFoodType,
                restAvgCustRating: restAvgCustRating
            }
        }

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(200).send(JSON.stringify({msg: err}));
            } else {
                var dbo = client.db("restaurant");
                dbo.collection("restaurants").updateOne(search, newData, function(err) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "Success!"}));
                        console.log("Record Updated");
                        client.close();
                    }
                })
            }
        })
    });

};

module.exports = services;