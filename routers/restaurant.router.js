const express = require("express");
const router = express.Router();
const restaurantcontroller = require("../controllers/restaurant.controller");
const { authJwt } = require("../middlewares");

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantcontroller.create
);

router.get("/", restaurantcontroller.getAll);

router.get("/:id", [authJwt.verifyToken], restaurantcontroller.getById);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantcontroller.update
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantcontroller.delete
);

module.exports = router;
