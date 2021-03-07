const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true},
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true},
    role: { type: String, default: "customer", enum: ["customer", "staff", "manager"]},
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings'
      }]
});

module.exports = mongoose.model('user',schema);