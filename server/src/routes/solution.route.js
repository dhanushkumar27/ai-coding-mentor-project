const express = require("express");

const {
    solutionController,
} = require("../controllers/solution.controller");

const router = express.Router();

router.post("/", solutionController);

module.exports = router;