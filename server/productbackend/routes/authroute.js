const express = require("express");
const {generateOtp,verifyOtp} = require("../controllers/authcontrollers");
const route = express.Router();

route.post("/otp",generateOtp);
route.post("/otp-verified",verifyOtp);

module.exports = route;