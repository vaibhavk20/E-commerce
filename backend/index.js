// const app = require("./app");
require("dotenv").config();
const express = require("express");
const { connection } = require("./config/db");
const { productRouter } = require("./routes/productRoute");
const app = express();
connection;

app.use(express.json());

// config
// dotenv.config({ path: "backend/config/config.env" });

app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce");
});

app.use("/products", productRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("mongoDB is connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`server at port : ${process.env.port}`);
});
