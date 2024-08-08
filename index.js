const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const restaurantRouter = require("./routers/restaurant.router");
const authRouter = require("./routers/auth.router");

// ใช้ CORS ก่อนการกำหนด route handlers
app.use(
  cors({
    origin: "http://localhost:5173", // เปลี่ยนเป็น origin ของคุณ
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// กำหนด route handlers
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
