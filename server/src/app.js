const express = require("express");
const cors = require("cors");

const analyzeRouter = require("./routes/analysis.route");
const feedbackRouter = require("./routes/feedback.route");
const solutionRouter = require("./routes/solution.route");
const explanationRouter = require("./routes/explanation.route")

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Health Check */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Coding Mentor Backend Running 🚀",
    });
});

/* API Routes */
app.use("/api/analyze", analyzeRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/solution", solutionRouter);
app.use("/api/explanation", explanationRouter);

/* 404 Handler */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found",
    });
});

module.exports = app;