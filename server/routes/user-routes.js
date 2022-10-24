const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller.js");
const { protect } = require("../middleware/auth.js");

router.get("/", userC.getAllUser);
router.post("/signup", userC.signup);
router.post("/login", userC.login);
// router.put("/user:id", userC.updateUser);
router.get("/me", protect, userC.getMe);

module.exports = router;
