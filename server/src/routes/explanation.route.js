const express = require("express");

const {
    explanationController,
} = require("../controllers/explanation.controller");

const router = express.Router();

router.post("/", explanationController);

module.exports = router;