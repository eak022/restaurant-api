const express = require("express");
const router = express.Router();
const restaurantcontroller = require("../controllers/restaurant.controller");

router.post("/", restaurantcontroller.create);

router.get("/", restaurantcontroller.getAll);

router.get("/:id", restaurantcontroller.getById);

router.put("/:id", restaurantcontroller.getById);

module.exports = router;
