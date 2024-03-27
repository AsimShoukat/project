import express from 'express';
const cartRouter = express.Router();
import cartModel from '../Models/cart/index.js';
import productModel from '../Models/products/index.js';
// Importing Middleware
import authMiddleware from './../middleware/authMiddleware.js';

// Importing Models
//import userModel from '../Models/user'; // Update path as necessary
 // Update path as necessary // Update path as necessary

cartRouter.post("/cart", [authMiddleware], async (req, res) => {
	try {
		const { userId, productsId } = req.body;

        // Using Sequelize model to create cart entry
        const cartEntry = await cartModel.create({
            user_id: userId,
            products_id: productsId
        });

		res.json(cartEntry);
	} catch (e) {
		console.error(e.message);
		res.status(501).json("Server Error");
	}
});

cartRouter.get("/cart/:userId", [authMiddleware], async (req, res) => {
	try {
		const { userId } = req.params;

        // Using Sequelize model to find carts and include product details
        const carts = await cartModel.findAll({
            where: { user_id: userId },
            include: productModel
        });

		if (carts.length > 0) {
			res.status(200).json(carts);
		} else {
			return res.status(404).json("No Item in Carts");
		}
	} catch (e) {
		console.error(e.message);
		res.status(501).json("Server Error");
	}
});

cartRouter.delete("/cart/delete/:cartId", [authMiddleware], async (req, res) => {
	try {
		const { cartId } = req.params;

        // Using Sequelize model to delete a cart entry
        const result = await cartModel.destroy({
            where: { id: cartId }
        });

        if (result > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "No item found to delete from cart." });
        }
	} catch (e) {
		console.error(e.message);
		res.status(500).json({ message: "Server Error" });
	}
});

cartRouter.get("/count", async (req, res) => {
	try {
		const { id } = req.user;

        // Using Sequelize to count carts
        const count = await cartModel.count({
            where: { user_id: id }
        });

        res.json({ count });
	} catch (e) {
		console.error(e.message);
		res.status(501).json("Server Error");
	}
});

export default cartRouter;



// const express = require("express");
// const router = express.Router();

// //importing MiddleWare
// const authMiddleWare = require("./../middleware/authMiddleware");

// //importing Pool
// const pool = require("../database/pool");

// router.post("/cart", [authMiddleWare], async (req, res) => {
// 	try {
// 		const { userId, productsId } = req.body;

// 		const {
// 			rows,
// 		} = await pool.query(
// 			"INSERT INTO carts(user_id,products_id) VALUES($1,$2) RETURNING *;",
// 			[userId, productsId]
// 		);

// 		if (rows.length > 0) {
// 			res.json(rows[0]);
// 		} else {
// 			return res.status(404).json("N0 Item in Carts");
// 		}
// 	} catch (e) {
// 		console.error(e.message);

// 		res.status(501).json("Sever Error");
// 	}
// });

// router.get("/cart/:userId", [authMiddleWare], async (req, res) => {
// 	try {
// 		const { userId } = req.params;
// 		const {
// 			rows,
// 		} = await pool.query(
// 			"SELECT carts.id AS id,user_id,products_id,name,catagory,img,description,price FROM carts JOIN products ON carts.products_id=products.id WHERE user_id=$1",
// 			[userId]
// 		);

// 		if (rows.length > 0) {
// 			//Remember here i am returing a Array
// 			res.status(200).json(rows);
// 		} else {
// 			return res.status(404).json("N0 Item in Carts");
// 		}
// 	} catch (e) {
// 		console.error(e.message);

// 		res.status(501).json("Sever Error");
// 	}
// });


// router.delete("/cart/delete/:cartId", [authMiddleWare], async (req, res) => {
// 	try {
// 		const { cartId } = req.params;

// 		const { rows } = await pool.query("DELETE FROM carts WHERE id=$1 RETURNING *", [cartId]);

// 		if (rows.length > 0) {
// 			// Item was found and deleted
// 			res.status(204).end(); // Correctly return a 204 No Content status
// 		} else {
// 			// No item found to delete
// 			res.status(404).json({ message: "No item found to delete from cart." });
// 		}
// 	} catch (e) {
// 		console.error(e.message);
// 		res.status(500).json({ message: "Server Error" }); // Use 500 for server errors
// 	}
// });


// router.get("/count", async (req, res) => {
// 	try {
// 		const { id } = req.user;

// 		const {
// 			rows,
// 		} = await pool.query(
// 			"SELECT COUNT(user_id) FROM carts JOIN products ON carts.products_id=products.id WHERE user_id=$1 GROUP BY user_id ",
// 			[id]
// 		);

// 		if (rows.length > 0) {
// 			res.json(rows[0]);
// 		} else {
// 			return res.json({ count: 0 });
// 		}
// 	} catch (e) {
// 		console.error(e.message);
// 		res.status(501).json("Sever Error");
// 	}
// });

// module.exports = router;
