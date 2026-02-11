const express = require("express");
const foodController = require("../controllers/food.controller");
const authmiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authmiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

/*router.get('/', foodController.getAllFoodItems);*/

router.get("/", authmiddleware.authUserMiddleware, foodController.getFoodItems);

router.post("/like",authmiddleware.authUserMiddleware, foodController.likeFood);

router.get("/saved", authmiddleware.authUserMiddleware, foodController.getSavedFoodItems);

router.post("/remove-save", authmiddleware.authUserMiddleware, foodController.removeSavedItem);

router.post(
  "/save",
  authmiddleware.authUserMiddleware,
  foodController.saveFoodItem,
);

module.exports = router;
