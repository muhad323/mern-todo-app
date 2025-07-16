const express = require("express");
const { register, login } = require("../controllers/UserController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", (req, res) => {
  res.status(200).json({ message: "Access granted", user: null });
});

module.exports = router;
