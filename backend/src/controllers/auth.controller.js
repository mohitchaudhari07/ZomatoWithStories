const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // In real application, hash the password before savingq
  const newUser = new userModel({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { userId: newUser._id, role: "user" },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  await newUser.save();
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true only in production (HTTPS)
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}

async function registerFoodPartner(req, res) {
  const { fullName, email, password, phone } = req.body;
  const isPartnerExist = await foodPartnerModel.findOne({ email });
  if (isPartnerExist) {
    return res.status(400).json({ message: "Food Partner already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newPartner = new foodPartnerModel({
    fullName,
    email,
    password: hashedPassword,
    phone,
  });
  const token = jwt.sign(
    { partnerId: newPartner._id, role: "food-partner" },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  await newPartner.save();
  res.status(201).json({
    message: "Food Partner registered successfully",
    partner: {
      id: newPartner._id,
      fullName: newPartner.fullName,
      email: newPartner.email,
      phone: newPartner.phone,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const partner = await foodPartnerModel.findOne({ email });

  if (!partner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, partner.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { partnerId: partner._id, role: "food-partner" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({
    message: "Login successful",
    partner: {
      id: partner._id,
      partnerName: partner.partnerName,
      email: partner.email,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
