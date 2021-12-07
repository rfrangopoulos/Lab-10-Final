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
            var dbo = client.db("restaurant");

            dbo.collection("restaurants").find().toArray(function(err, data) {
                if (err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    res.send(JSON.stringify({msg: "Success!", restData: data}));
                }
                client.close();
            });
        });
    });

    app.delete('/delete-record', function(req, res) {

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                res.send(JSON.stringify({msg: err}));
            } else {
                var dbo = client.db("restaurant");
                var search = {id: req.body.id};

                dbo.collection("restaurants").deleteOne(search, function(err) {
                    if (err) {
                        var search = {id: req.body.id};
                    } else {
                        res.send(JSON.stringify({msg: "Success!"}));
                        console.log("Record Deleted");
                        client.close();
                    }
                })
            }
        })


        // if (fs.existsSync(FILENAME)) {
        //     fs.readFile(FILENAME, "utf-8", function(err, data) {
        //         if (err) {
        //             res.send(JSON.stringify({msg: err}));
        //         } else {
        //             var dataArray = JSON.parse(data);
        //             console.log(JSON.stringify(dataArray));
        //             for (let i = 0; i < dataArray.length; i++) {
        //                 if (dataArray[i].id == id) {
        //                     dataArray.splice(i, 1);
        //                     break;
        //                 }
        //             }
        //             fs.writeFile(FILENAME, JSON.stringify(dataArray), function(err) {
        //                 if(err) {
        //                     res.send(JSON.stringify({msg: err}));
        //                 } else {
        //                     res.send(JSON.stringify({msg: "Success!"}));
        //                 }
        //             });
        //         }
        //     });
        // }
    });

};

module.exports = services;