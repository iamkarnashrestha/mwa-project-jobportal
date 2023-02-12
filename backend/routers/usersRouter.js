const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  getUserById,
  updateUserById,
  totalUsers,
} = require("../controllers/usersController");

router.post("/login", login);
router.post("/signup", signup);
router.get("/totalUsers", totalUsers);
router.get("/:email", getUserById);
router.put("/update/:user_id", updateUserById);

module.exports = router;
