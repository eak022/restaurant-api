const express = require("express");
const app = express();
require("dotenv").config();
const RestaurantRouter = require("./routers/restaurant.router");
const PORT = process.env.PORT || 5000;
const authController = require("./routers/auth.router");
const db = require("./models/");
const role = db.Role;
const cors = require("cors");

const corsOption = {
  origin: "http://localhost:5173",
};
//dev mode
db.sequelize.sync({ force: true }).then(() => {
  initRole();
  console.log("Drob and sync DB");
});

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

app.use("/api/v1/restaurant", RestaurantRouter);
app.use("/api/v1/auth", authController);
app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});
app.listen(PORT, () => {
  console.log("Listenig to http://localhost:" + PORT);
});
