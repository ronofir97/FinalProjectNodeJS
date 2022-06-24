const mongoose = require('mongoose');
const CostItem = require('./costs_model');

const Schema = mongoose.Schema;

/*
Our calculated (copmuted) consent is structured as follows:
- The customer's ID so that we can identify which customer it is, add and update the data for him according to the new products that are added for him.
- Total amount of all ---- year ----.
--The year-- which represents the same document of the computed model.
12-month MAP, which basically for each month the MAP holds the total amount of expenses in that month.
*/

let ComputedItem = new Schema(
  {
    id: {
      type: String,
      unique: false,
      require: true,
    },
    total_sum: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Map,
      of: Number,
    },
  },
  { collection: 'Computed' }
);

module.exports = mongoose.model('Computed', ComputedItem);
