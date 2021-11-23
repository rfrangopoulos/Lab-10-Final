const fs = require('fs');

const FILENAME = "./src/files/restaurant.txt";

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

        var restaurantData = [];

        if (fs.existsSync(FILENAME)) {
            
            // Read in current database
            fs.readFile(FILENAME, "utf-8", function(err, data) {
                if (err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    restaurantData = JSON.parse(data);
                    
                    restaurantData.push(restDataJS);
                    
                    fs.writeFile(FILENAME, JSON.stringify(restaurantData), function(err) {
                        if(err) {
                            res.send(JSON.stringify({msg: err}));
                        } else {
                            res.send(JSON.stringify({msg: "Success!"}));
                        }
                    });
                }
            });
        } else {
            restaurantData.push(restDataJS);
            fs.writeFile(FILENAME, JSON.stringify(restaurantData), function(err) {
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    res.send(JSON.stringify({msg: "Success!"}));
                }
            });
        }
    });

    app.get('/get-record', function(req, res) {

        if (fs.existsSync(FILENAME)) {
            fs.readFile(FILENAME, "utf-8", function(err, data) {
                if (err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    
                    res.send(JSON.stringify({msg: "Success!", restData: data}));
                }
            });
        } else {
            res.send(JSON.stringify({msg: "Success!", restData: "[]"}));
        }
    })

    app.delete('/delete-record', function(req, res) {

        var id = req.body.id;

        if (fs.existsSync(FILENAME)) {
            fs.readFile(FILENAME, "utf-8", function(err, data) {
                if (err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    var dataArray = JSON.parse(data);
                    console.log(JSON.stringify(dataArray));
                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].id == id) {
                            dataArray.splice(i, 1);
                            break;
                        }
                    }
                    fs.writeFile(FILENAME, JSON.stringify(dataArray), function(err) {
                        if(err) {
                            res.send(JSON.stringify({msg: err}));
                        } else {
                            res.send(JSON.stringify({msg: "Success!"}));
                        }
                    });
                }
            });
        }
    });

};

module.exports = services;