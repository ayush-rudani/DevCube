const express = require("express");
const router = express.Router();
const getAllUser = require("../controllers/user-controller.js");

router.get("/", getAllUser);

module.exports = router;
