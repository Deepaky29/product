const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroute");
const productRoutes = require("./routes/productroute");
const app = express();

dotenv.config();
app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongodb connected successfully"))
    .catch((error)=>console.log(error) )

app.use("/auth", authRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});