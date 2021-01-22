const mongoose = require("mongoose");
const config = require("../config/database");

const bookingSchema = mongoose.Schema({
  bookingDate: { type: String, required: true, unique: false },
  time: { type: String, required: true, unique: false },
  table: { type: String, required: true, unique: false },
  name: { type: String, required: true, unique: false },
  guests: { type: Number, required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
