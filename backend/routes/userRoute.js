const express = require("express");
const { registerUser} = require("../controllers/userController");

const router = express.Router();
const { isAuthenticated, authoriseRoles } = require("../middleware/auth")

// register user
router.route("/register").post(registerUser);
// router.get("/register",registerUser);

module.exports = router;