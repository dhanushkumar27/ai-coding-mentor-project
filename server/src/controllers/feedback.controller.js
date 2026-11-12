const {
    generateFeedback
} = require(
    "../services/feedback.service"
);


const feedbackController = async (
    req,
    res
) => {

    try {

        const {
            problemName,
            programmingLanguage,
            userInput,
            apiKey
        } = req.body;


        const feedback =
            await generateFeedback({
                problemName,
                programmingLanguage,
                userInput,
                apiKey
            });


        return res.status(200).json({
            success: true,
            data: feedback
        });

    } catch (error) {

        console.error(
            "======== Feedback Error ========"
        );

        console.error(error);


        return res
            .status(error.status || 500)
            .json({
                success: false,

                error: {
                    code:
                        error.code ||
                        "FEEDBACK_GENERATION_FAILED",

                    message:
                        error.message ||
                        "Unable to generate feedback."
                }
            });
    }
};


module.exports = {
    feedbackController
};