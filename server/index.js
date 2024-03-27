//import express from 'express';
import 'dotenv/config';
//import path from 'path';
import dbinit from './database/dbinit.js';
import  {connectDB}  from './database/db-details.js';

// Since you're moving to ES6 modules, ensure your app.js exports using the ES6 default export.
import app from './app.js';

//const app = createApp();
const PORT = process.env.PORT || 5000;

connectDB();

// Assuming dbInit is an async function; if not, adjust accordingly.
dbinit().then(() => {
  console.log("DB synced");
}).catch((error) => {
  console.error("Error during DB initialization:", error);
});

app.get("/", (req, res) => {
  res.send("okk");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// const app = require("./app")();
// i
// require("dotenv").config();
// var path = require("path");
// const { PORT } = process.env;
// import dbinit from "./database/db_init.js";
// import { connectDB } from "./database/db-details.js";

// connectDB();
// dbinit().then(()=>{console.log("DB synced")});





// app.get("/", (req, res) => {
// 	res.send("okk");
// });

// app.get("/login", (req, res) => {});

// app.post("/login", (req, res) => {});

// app.get("/singup", (req, res) => {});

// app.post("/signup", () => {});
