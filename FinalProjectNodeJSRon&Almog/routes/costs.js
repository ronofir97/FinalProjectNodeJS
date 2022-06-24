const express = require('express');
const mongoose = require('mongoose');
const CostItem = require('./models/costs_model');
const User = require('./models/users_model');
const ComputedItem = require('./models/computed_model');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ msg: 'Welcome to costs items page.' });
});

/* POST end-point - add new cost item by user id*/
router.post('/add-cost-item', async (req, res) => {
    /*
    First thing before we add a new COST ITEM to a particular user by id, 
    we want to check that the user does exist in the user table so first of all we will perform a checking in user collection.*/
    try {
        const user = await User.findOne({ id: req.body.id });
        if (user) {
            console.log('User exists');
        }
        else {
            res.send({ msg: 'The user is not Exist !!! first of all add the user to the Users collection' });
            return;
        };
    }
    catch (error) {
        console.log('--------!There was a problem while checking the user, check the log!-------- ' + ' the error is ' + error);
    }

    /*
    The statements of the variables we will work with later in the practice
    */
    const cost_item_date = new Date(req.body.date);
    const year_in_costItem = cost_item_date.getFullYear();
    const cost_item_month = cost_item_date.getMonth() + 1;
    const cost_to_total = req.body.sum;
    const user_id = req.body.id;
    const cost_item_month_string = cost_item_month.toString();
    var messege_to_res = '';

    /*
    Adding a new cost item
    */
    try {
        var cost_item = new CostItem({
            id: req.body.id,
            sum: req.body.sum,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date,
            year: year_in_costItem,
            month: cost_item_month
        });
        messege_to_res += 'Cost Item added successfully: ' + cost_item;
        await cost_item.save();
    }
    catch (error) {
        console.log('There was a problem saving the data, please check the log ---- ' + error);
        messege_to_res += ('/n msg_cost_add_error:', 'Error is: --' + error + '-- please fix the problem and try again');
    }


    try {
        const computed_doc_by_year = await ComputedItem.findOne({ year: year_in_costItem, id: user_id });

        /*
        First thing we will check if for this specific year there is already a doc in the computed collection.
        There's already a record, so I'll do two things:
            1. I will add the new cost-item into the list of all the details.
            2. I will update the total of all purchases. 
        Otherwise, if the year does not exist there, I will create a new doc for this user,
        with this specific year,
        and then I will already update the records within it.
        */

        if (!computed_doc_by_year) {
            try {
                var map_for_item = new Map([
                    ['1', 0],
                    ['2', 0],
                    ['3', 0],
                    ['4', 0],
                    ['5', 0],
                    ['6', 0],
                    ['7', 0],
                    ['8', 0],
                    ['9', 0],
                    ['10', 0],
                    ['11', 0],
                    ['12', 0]
                ]);
                map_for_item.set(cost_item_month_string, cost_to_total);
                var new_year_for_computed = new ComputedItem({
                    id: user_id,
                    total_sum: cost_to_total,
                    year: year_in_costItem,
                    month: map_for_item
                })
                
                /*
                Save the new computed-item 
                */
                await new_year_for_computed.save();
            }
            catch (error) {
                messege_to_res += ' /n There was a proble, while adding new computed item -- check the log ' + error;
                console.log('There was a proble, while adding new computed item -- check the log ' + error);
            }
        }

        else {

            /*
            Otherwise, if there is a collection for the same customer (user id) with the intended year, we will simply update the total amount for that month, and we will also update the total amount for that year (just in case we need to in the future).
            */

            computed_doc_by_year.total_sum += cost_to_total;
            computed_doc_by_year.month.set(cost_item_month_string, computed_doc_by_year.month.get(cost_item_month_string) + cost_to_total);
            try {
                /*
                Save the update computed-item 
                */
                await computed_doc_by_year.save();
            }
            catch (error) {
                messege_to_res += ' /n There was a proble, while updating computed item -- check the log ' + error;
                console.log('There was a proble, while adding new computed item -- check the log ' + error);
            }
        }
    }
    catch (error) {
        messege_to_res += ('/n msg_addtocomputed_error:', 'There was an error while saving the data in the computed collection, please check the log ---- '+ error);
        console.log('There was an error while saving the data in the computed collection, please check the log --' + error + '--');
    }
    res.send(messege_to_res);
}
)
module.exports = router;
