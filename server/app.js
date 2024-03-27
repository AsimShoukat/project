import express from 'express';
import cors from 'cors';
// Update the import statements according to your file structure
import dbinit from './database/dbinit.js';// Assuming you have a dbInit file as discussed
import userRouter from './routes/auth.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


(async () => {
  try {
    await dbinit();
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
})();

// Routing
app.use('/api/auth', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


export default app;



// const express = require("express");
// const app = express();
// const cors = require("cors");

// //requiring router
// const auth = require("./routes/auth");
// const products = require("./routes/products");
// const cart = require("./routes/cart");

// module.exports = () => {
// 	//req.body by default express gives us
// 	app.use(express.json());
// 	app.use(express.urlencoded({ extended: false }));

// 	app.use(cors());

// 	//Routing
// 	app.use(auth);
// 	app.use(products);
// 	app.use(cart);

// 	return app;
// };
