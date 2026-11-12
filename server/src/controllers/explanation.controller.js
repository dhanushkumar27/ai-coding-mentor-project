const {
    generateExplanation,
} = require("../services/explanation.service");


const explanationController = async (req, res) => {
    try {
        const {
            problemName,
            programmingLanguage,
            userInput,
            apiKey,
        } = req.body;


        // Basic request validation
        if (
            typeof programmingLanguage !== "string" ||
            !programmingLanguage.trim()
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_PROGRAMMING_LANGUAGE",
                    message: "programmingLanguage is required.",
                },
            });
        }


        if (
            typeof userInput !== "string" ||
            !userInput.trim()
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_USER_INPUT",
                    message: "userInput is required.",
                },
            });
        }


        const explanation =
            await generateExplanation({
                problemName,
                programmingLanguage,
                userInput: userInput.trim(),
                apiKey,
            });


        return res.status(200).json({
            success: true,
            data: explanation,
        });

    } catch (error) {
        console.error(
            "======== Explanation Error ========"
        );

        console.error(error);


        return res
            .status(error.status || 500)
            .json({
                success: false,
                error: {
                    code:
                        error.code ||
                        "EXPLANATION_GENERATION_FAILED",

                    message:
                        error.message ||
                        "Unable to generate explanation.",
                },
            });
    }
};


module.exports = {
    explanationController,
};