import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/Api";
import loginImage from "../assets/product.jpg";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier; 
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto-focus next input
      if (value && index < otp.length - 1) {
        const next = document.getElementById(`otp-${index + 1}`);
        next.focus();
      }
    }
  };

  
  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setMessage("Please enter complete OTP");
      return;
    }

    try {
      await API.post("/auth/otp-verified", {
        otpCode,
        email: identifier.includes("@") ? identifier : undefined,
        phoneno: !identifier.includes("@") ? identifier : undefined,
      });
      setMessage("Login successful");

      
      navigate("/producthome");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-orange-100">
        <div className="relative w-[360px] h-[520px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4 text-indigo-900 font-bold text-lg">
            Productr<span className="text-orange-400">®</span>
          </div>

          <img src={loginImage} className="w-full h-full object-cover" />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center font-semibold">
            Uplist your <br /> product to market
          </div>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-md px-6">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-8">
            Login to your Productr Account
          </h2>

          <p className="text-sm text-gray-600 mb-2">Enter OTP</p>
          <p className="text-xs text-gray-500 mb-4">Check console for OTP</p>

          <div className="flex gap-3 mb-6">
            {otp.map((val, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(e, i)}
                className="w-12 h-12 border rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            ))}
          </div>

          {message && <p className="text-sm text-indigo-700 mb-4">{message}</p>}

          <button
            onClick={handleVerify}
            className="w-full bg-indigo-900 text-white py-3 rounded-md font-medium hover:bg-indigo-800 transition"
          >
            Enter your OTP
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Didn’t receive OTP?
            <span className="text-indigo-700 font-medium cursor-pointer ml-1">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
