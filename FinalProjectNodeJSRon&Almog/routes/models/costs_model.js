const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* A new schema in which we define exactly which fields
we want to appear when I add a new item to the COSTS table, in the category 
field we used ENUM that will contain exactly the
categories we defined and that will be restricted in these categories. */

let CostItem = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    sum: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      enum: ['food', 'health', 'housing', 'sport', 'education', 'other'],
      default: 'other',
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    year: {
      type: Number,
      require: true,
    },
    month: {
      type: Number,
      require: true,
    },
  },
  { collection: 'Costs' }
);

module.exports = mongoose.model('Costs', CostItem);
