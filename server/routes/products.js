import express from 'express';
const productRouter = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';

// Importing Product Model
import productModel from '../Models/products/index.js'; // Update the path according to your project structure

productRouter.get("/",authMiddleware, async (req, res) => {
	try {
		// Using Sequelize to find all products
		const products = await productModel.findAll();
		if (products.length === 0) {
			// Consider returning an empty array with a 200 OK status if no products found is a normal scenario
			return res.status(200).json([]);
		}
		res.json(products);
	} catch (e) {
		console.error(e.message);
		res.status(500).json({ message: "Server Error" }); // Changed to 500 Internal Server Error
	}
});

productRouter.get("/:id",authMiddleware, async (req, res) => {
	try {
		const { id } = req.params;

		// Using Sequelize to find a product by its id
		const product = await productModel.findByPk(id);

		if (product) {
			res.json(product);
		} else {
			return res.status(404).json("Item does not exist");
		}
	} catch (e) {
		console.error(e.message);
		res.status(500).json("Server Error");
	}
});

export default productRouter;





// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");

// //importing Pool
// const pool = require("../database/pool");


// router.get("/products", async (req, res) => {
// 	try {
// 		const { rows } = await pool.query("SELECT * FROM products");
// 		if (rows.length === 0) {
// 			// Consider returning an empty array with a 200 OK status if no products found is a normal scenario
// 			return res.status(200).json([]); // Or use 404 if you prefer to indicate no content explicitly
// 		}
// 		res.json(rows);
// 	} catch (e) {
// 		console.error(e.message);
// 		res.status(500).json({message: "Server Error"}); // Changed to 500 Internal Server Error
// 	}
// });


// router.get("/products/:id", async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [
// 			id,
// 		]);

// 		if (rows.length > 0) {
// 			res.json(rows[0]);
// 		} else {
// 			return res.status(404).json("Item is not Exits");
// 		}
// 	} catch (e) {
// 		console.error(e.message);
// 		res.status(501).json("Server Error");
// 	}
// });

// module.exports = router;
