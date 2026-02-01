const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    identifier:{
        type:String,
        required:true,
    },
    otp:{type:String},
    expireat:{type:Date,required:true},
    resendcount:{type:Number,default:0},
});
module.exports = mongoose.model("OTP",otpSchema);