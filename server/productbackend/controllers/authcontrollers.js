const OtpModel = require("../models/otpmodel");
const UserModel = require("../models/usermodel");

const generateOtp = async (req, res) => {
  try {
    const { email, phoneno } = req.body;

    if (!email && !phoneno) {
      return res.status(400).json({ message: "Email or phone number is required" });
    }

    const identifier = email || phoneno;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    console.log("🔐 OTP for", identifier, "=>", otpCode); 

    await OtpModel.findOneAndUpdate(
      { identifier },
      { otp: otpCode, expiresAt },
      { upsert: true }
    );

    return res.status(200).json({
      message: "OTP generated successfully",
      otp: otpCode
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otpCode, email, phoneno } = req.body;

    const identifier = email || phoneno;

    if (!identifier || !otpCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const otpRecord = await OtpModel.findOne({
      identifier,
      otp: otpCode
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await UserModel.findOneAndUpdate(
      email ? { email } : { phoneno },
      { verified: true },
      { upsert: true }
    );

    await OtpModel.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateOtp, verifyOtp };
