const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const restaurantRouter = require("./routers/restaurant.router");
const authRouter = require("./routers/auth.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT);
});
