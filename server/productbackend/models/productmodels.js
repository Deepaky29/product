const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname:{type:String},
    producttype:{type:String},
    quantity:{type:Number},
    mrp:{type:Number},
    sellingprice:{type:Number},
    brandname:{type:String},
    image:[String],
    exchangeEligible: {
    type: Boolean,
    default: false
  },

  isPublished: {
    type: Boolean,
    default: false   
  }


});
module.exports = mongoose.model("Product",productSchema);