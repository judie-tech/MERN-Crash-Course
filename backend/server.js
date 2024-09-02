import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body
app.post("/api/products", async (req, res) => {
  const product = req.body; //user will send this data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//postman desktop application

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted " });
  } catch (error) {}
});

app.listen(5001, () => {
  connectDB();
  console.log("server started at http://localhost:5001");
});

//ug75tedJgCUjEHu8
