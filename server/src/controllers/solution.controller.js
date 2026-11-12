const { generateSolution } = require("../services/solution.service");

const solutionController = async (req, res) => {
    try {

        const {
            problemName,
            programmingLanguage,
            userInput,
            apiKey
        } = req.body;

        const solution = await generateSolution({
                problemName,
                programmingLanguage,
                userInput,
                apiKey
        });

        return res.status(200).json({
            success: true,
            data: solution
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

module.exports = {
    solutionController,
};