const express = require("express");

const { analyze } = require("../controllers/analysis.controller");

const router = express.Router();

router.post("/", analyze);

module.exports = router;