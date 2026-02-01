const express = require("express");
const {
  createproduct,
  readproduct,
  readpublish,
  readunpublish,
  productupdate,
  productdelete,
  togglePublish, 
} = require("../controllers/productcontrollers");

const route = express.Router();

route.post("/create", createproduct);
route.get("/get", readproduct);
route.get("/published", readpublish);
route.get("/unpublished", readunpublish);
route.put("/update/:id", productupdate);
route.delete("/delete/:id", productdelete);
route.patch("/toggle/:id", togglePublish);

module.exports = route;
