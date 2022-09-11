const express = require("express");
const router = express.Router();
const postC = require("../controllers/post-controller");

router.get('/', postC.getAllPost);

module.exports = router;
