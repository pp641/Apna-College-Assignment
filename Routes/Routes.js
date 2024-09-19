const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../Controllers/AuthController");
const authMiddleware = require("../Middlewares/IsLoggedIn");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserDetails);
router.get("/profile/:id", authMiddleware, getUserDetails);

module.exports = router;
