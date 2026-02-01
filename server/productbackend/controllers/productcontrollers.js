const express = require("express");
const product = require("../models/productmodels");

const createproduct = async(req,res)=>{
    try{
        const {productname,
    producttype,
    quantity,
    mrp,
    sellingprice,
    brandname,
    image,
    exchangeEligible
    } = req.body;

    await product.create({
        productname,
    producttype,
    quantity,
    mrp,
    sellingprice,
    brandname,
    image,
    exchangeEligible
    })
    res.status(200).json({message:"Product is created Succesfully"});


}
catch(error){
    res.status(500).json({message:"server crash"});
}
}

const readproduct=async(req,res)=>{
    try{
        const read = await product.find();
        res.json(read);
    }
    catch(error){
        return res.status(500).json({message:"sever crash can't get product"});
    }
}
const readpublish =async(req,res)=>{
    try{
        const read = await product.find({isPublished:true});
        res.status(200).json(read);
    }
    catch(error){
        res.status(500).json({message:"server error"});
    }
}
const readunpublish=async(req,res)=>{
    try{
        const read = await product.find({isPublished:false});
        res.status(200).json(read);
    }
    catch(error){
        res.status(500).json({message:"server error"});
    }
}

const productupdate = async(req,res)=>{
    try{
       const {id} = req.params;
       const updated = await product.findOneAndUpdate(
        { _id: id },
        req.body,
        {new:true},
       ) ;
       if(!updated) return res.status(400).json({message:"product is not found"});

       res.status(200).json({message:"Product updated succesfully"});


    }
    catch(error){
        res.status(500).json({message:"server error"});

    }
}

const productdelete = async(req,res)=>{
    try{
        const {id} = req.params;
        const deleted = await product.findByIdAndDelete(id);
        if(!deleted) return res.status(400).json({message:"product not found"});

        res.status(200).json({message:"product deleted Succesfully"});

    }
    catch(error){
        res.status(500).json({message:"Server crash"});
    }
}




const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;

    const productData = await product.findById(id);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    productData.isPublished = !productData.isPublished;
    await productData.save();

    res.status(200).json({
      message: `Product ${
        productData.isPublished ? "Published" : "Unpublished"
      } successfully`,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {createproduct,readproduct,readpublish,
                  readunpublish,productupdate,productdelete,togglePublish
}