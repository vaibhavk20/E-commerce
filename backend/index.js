// const app = require("./app");
require("dotenv").config();
const express = require("express");
const { connection } = require("./config/db");
const { productRouter } = require("./routes/productRoute");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const { userRouter } = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

// config
// dotenv.config({ path: "backend/config/config.env" });

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce");
});

app.use("/products", productRouter);

app.use("/api/v1", userRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("mongoDB is connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`server at port : ${process.env.port}`);
});
