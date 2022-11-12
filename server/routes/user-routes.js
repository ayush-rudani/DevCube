const { loginValiations, registerValiations } = require("../controllers/user-controller.js");
const { protect } = require("../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller.js");

router.get("/", userC.getAllUser);
router.post("/signup", registerValiations, userC.signup);
router.post("/login", loginValiations, userC.login);
router.get("/me", protect, userC.getMe);
// router.put("/user:id", userC.updateUser);

module.exports = router;
