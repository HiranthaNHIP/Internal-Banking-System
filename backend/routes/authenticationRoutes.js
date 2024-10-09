const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

//create the post endpoint for employee login from authController
router.post("/login", login);

//create the post endpoint for employees registering from authController
router.post("/register", register);

module.exports = router;