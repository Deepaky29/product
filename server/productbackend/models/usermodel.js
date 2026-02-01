const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{type:String},
    phoneno:{type:String},
    verified :{
        type:Boolean,
        default:false,
    }
})
module.exports = mongoose.model("User",userSchema);