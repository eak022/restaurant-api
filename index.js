const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const restaurantRouter = require("./routers/restaurant.router");
const authRouter = require("./routers/auth.router")
const db = require("./models/");
const role = db.Role;

//db.equelize.sync({force:true}).then(()=>{
//  initRole();
// console.log("Drop and sync DB");
//})

const initRole = () =>{
 role.create({ id:1, name:"user"});
 role.create({ id: 2, name: "moderator" });
 role.create({ id: 3, name: "admin" });
}


// ใช้ middleware
app.use(express.json()); // สำหรับ parsing application/json
app.use(express.urlencoded({ extended: true })); // สำหรับ parsing application/x-www-form-urlencoded
app.use("/api/v1/restaurants", restaurantRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
app.use("/api/v1/auth", authRouter);