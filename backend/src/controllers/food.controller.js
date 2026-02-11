const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.models");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const saveModel = require("../models/saveModel.model");

async function createFood(req, res) {
  try {
    const fileUploadResult = await storageService.uploadFile(req);

    const foodItem = await foodModel.create({
      name: req.body.name,
      videoUrl: fileUploadResult.videoUrl,
      description: req.body.description,
      FoodPartner: req.foodPartner.id,
    });

    res
      .status(201)
      .json({ message: "Food item created successfully", foodItem });
  } catch (err) {
    console.log("Upload failed:", err);
    res.status(500).json({ error: err.message });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});

    res.status(200).json({ foodItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Food liked successfully",
    like,
  });
}

async function saveFoodItem(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;
    const videoUrl = req.body.videoUrl;

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
      videoUrl: { $exists: true },
    });

    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
        videoUrl: { $exists: true },
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: -1 },
      });
      return res
        .status(200)
        .json({ message: "Food item unsaved successfully" });
    }

    const save = await saveModel.create({
      user: user.id,
      food: foodId,
      videoUrl: videoUrl,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { saveCount: 1 },
    });

    res.status(200).json({ message: "Food item saved successfully", save });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getSavedFoodItems(req, res) {
  try {
    const user = req.user;
    const savedItems = await saveModel.find({ user: user._id });
    console.log("saved" + savedItems);

    res.status(200).json({ savedItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function removeSavedItem(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { saveCount: -1 },
    });
    res.status(200).json({ message: "Saved item removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFoodItem,
  getSavedFoodItems,
  removeSavedItem,
};
