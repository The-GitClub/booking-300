// const mongoose = require("mongoose");
// const config = require("../config/database");

// const bookingSchema = mongoose.Schema({
//   bookingDate: { type: String, required: true, unique: false },
//   time: { type: String, required: true, unique: false },
//   table: { type: String, required: true, unique: false },
//   name: { type: String, required: true, unique: false },
//   guests: { type: Number, required: true },
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  date: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  
  allergy: {
    type: String,
    required: false,
  },
  
  guests:{
    type: Number,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model("Bookings", BookingSchema);

