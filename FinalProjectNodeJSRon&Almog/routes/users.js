const express = require('express');
const router = express.Router();
const User = require('./models/users_model');
const ComputedItem = require('./models/computed_model');
const CostItem = require('./models/costs_model');
const mongoose = require('mongoose');
const { query } = require('express');

/* 
In this endpoint - we allow the user to receive the detailed report of all the payments he has made by a specific month and year.
The parameters of the ID, of the month and of the year, we ask to get it in query params via the URL (as is customary in the HTTP protocol) in the GET method.
*/

router.get('/get-report-by-month/:id/:year/:month', async (req, res) => {
  const id = req.params.id;
  const year = req.params.year;
  const month = req.params.month;
  const number_month = parseInt(month);
  let messege = '';

  try {
    /*
    Here we are looking for both the relevant collection of the computed item, to take the total amount, and at the same time we are looking for all the cost-items according to the ID of this specific customer. To hunt him down the details of all his trades this month.
    */

    const item_to_send = await ComputedItem.findOne({ id: id, year: year });
    const costs_items = await CostItem.find(
      { id: id, year: year, month: number_month },
      { _id: 0, __v: 0 }
    );

    if (item_to_send == null) {
      res.send({ msg: 'There is no year and ID that match to your serch!' });
      return;
    } else {
      res.send({
        total_cost:
          'The total cost for month: ' +
          month +
          'in year: ' +
          year +
          ' is: ' +
          item_to_send.month.get(month),
        details: costs_items,
      });
    }
  } catch (error) {
    messege +=
      'There was a problem while getting the data from the mongo, the error is: --' +
      error;
    res.send(messege);
  }
});

module.exports = router;
