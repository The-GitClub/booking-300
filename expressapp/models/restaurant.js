const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({

restaurantName: {
    type: String,
},
capacity:{
    type: Number,
    required: false,
  }

})


    module.exports = mongoose.model("Restaurant", RestaurantSchema);