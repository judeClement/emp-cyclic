const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  // },
  // place: {
  //   type: String,
  //   required: true,
  // },
  // designation: {
  //   type: String,
  //   required: true,
  // },
  // salary: {
  //   type: Number,
  //   required: true,
  // },
  username:String,
  place:String,
  designation:String,
  salary:Number
});

const EmployeeModel = mongoose.model('Employee', schema);

module.exports = EmployeeModel;
