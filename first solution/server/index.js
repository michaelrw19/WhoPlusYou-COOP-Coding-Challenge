const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(express.json()); //To obtain the data in JSON format
app.use(bodyParser.urlencoded({extended: true}));

app.post("/user", function(req, res) {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country
    }
    const response = {
        error: false
    }
    res.send(response)

    /*
        Using npm i mysql to send data to the database

        connection.query("INSERT INTO userTable (FirstName, LastName, Email, Password, PhoneNumber, Address, City, Province, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [user.firstName, user.lastName, user.email, user.password, user.phoneNumber, user.address, user.city, user.province, user.country], function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(response)
            }
        });
    
    */
})

app.listen("8000", function() {
    console.log("Server running on port 8000")
})