const express = require('express');
const mongoose = require("mongoose");
const CostItem = require('./models/costs_model');
const User = require('./models/users_model');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ msg: "Welcome to costs items page." });
});

/* POST end-point - add new cost item by user id*/
router.post("/add-cost-item", async (req, res) => {
    /*
    First thing before we add a new COST ITEM to a particular user by id, 
    we want to check that the user does exist in the user table so first of all we will perform a test.*/
    try {
        const user = await User.findOne({ id: req.body.id });
        if (user) {
            console.log("User exists");
        }
        else {
            res.send({ msg: "The user is not Exist!!! first of all add the user to the Users collection" });
            return;
        };
    }
    catch (error) {
        console.log("--------!There was a problem while checking the user, check the log!--------")
    }

    try {
        const cost_item = new CostItem({
            id: req.body.id,
            sum: req.body.sum,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date
        });
        console.log("8");
        await cost_item.save();
        console.log("9");
        console.log(req.body.id);
        res.send({ msg: "Cost item added successfully!", data: cost_item });
    }
    catch (error) {
        console.log("There was a problem saving the data, please check the log.");
        res.send({ msg: "Error is: " + error + "please fix the problem and try again" });
    }
})

module.exports = router;
