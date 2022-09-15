const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller.js");

router.get("/", userC.getAllUser);
router.post("/signup", userC.signup);
router.post("/login", userC.login);
router.update("/user:id", userC.updateUser);

module.exports = router;
