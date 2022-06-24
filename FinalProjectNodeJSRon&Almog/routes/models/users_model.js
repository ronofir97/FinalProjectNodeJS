const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema(
  {
    id: {
      type: String,
      unique: false,
      require: true,
    },
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    birthday: {
      type: Date,
      require: true,
    },
    marital_status: {
      type: String,
      require: true,
    },
  },
  { collection: 'Users' }
);

module.exports = mongoose.model('Users', User);
