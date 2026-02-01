import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import loginImage from "../assets/product.jpg";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!identifier) {
    setMessage("Please enter email or phone number");
    return;
  }

  try {
    const payload = identifier.includes("@")
      ? { email: identifier }
      : { phoneno: identifier };

    const res = await API.post("/auth/otp", payload);

    console.log("🔐 OTP for user:", identifier, "=>", res.data.otp);

    navigate("/otp", { state: { identifier } });

    setMessage("OTP sent successfully. Check console.");
  } catch (error) {
    setMessage("Failed to send OTP");
  }
};
  return (
    <div className="flex h-screen bg-white">
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

          <label className="block text-sm text-gray-700 mb-2">
            Email or Phone number
          </label>

          <input
            type="text"
            placeholder="Enter email or phone number"
            className="w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-700"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          {message && (
            <p className="text-sm text-indigo-700 mb-4">{message}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-900 text-white py-3 rounded-md font-medium hover:bg-indigo-800 transition"
          >
            Login
          </button>

          <div className="mt-16 border rounded-md py-4 text-center text-sm text-gray-600">
            Don’t have a Productr Account?
            <span className="block text-indigo-700 font-medium cursor-pointer mt-1">
              SignUp Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
