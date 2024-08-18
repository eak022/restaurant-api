const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");
const { authJwt } = require("../middlewares");

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantController.create
);
router.get("/", restaurantController.getAll);
router.get("/:id", [authJwt.verifyToken], restaurantController.getById);
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantController.update
);
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  restaurantController.delete
);
module.exports = router;
