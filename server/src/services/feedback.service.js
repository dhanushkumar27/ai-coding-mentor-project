const buildFeedbackPrompt = require(
    "../ai/prompts/feedback/feedbackPrompt"
);

const {
    generateContent
} = require(
    "../ai/providers/gemini.provider"
);

const {
    parseFeedbackResponse
} = require(
    "../ai/parsers/feedback.parser"
);

const {
    validateFeedback
} = require(
    "../ai/validators/feedback.validator"
);

const {
    normalizeFeedbackResponse
} = require(
    "../ai/normalizers/feedback.normalizer"
);


const generateFeedback = async ({
    programmingLanguage,
    problemName,
    userInput,
    apiKey
}) => {

    /*
     * 1. Build final prompt
     */
    console.log(problemName)
    console.log(programmingLanguage)
    console.log(userInput)
    console.log(apiKey)
    const prompt = buildFeedbackPrompt({
        problemName,
        programmingLanguage,
        userInput
    });

    /*
     * 2. Send prompt to OpenRouter
     */
    const rawResponse =
        await generateContent(
            prompt,
            apiKey
        );


    /*
     * 3. Convert AI text → JavaScript object
     */
    const parsedResponse =
        parseFeedbackResponse(
            rawResponse
        );


    /*
     * 4. Validate AI object against
     *    canonical Feedback schema
     */
    const validatedResponse =
        validateFeedback(
            parsedResponse
        );


    /*
     * 5. Normalize validated response
     */
    const normalizedResponse =
        normalizeFeedbackResponse(
            validatedResponse,
            programmingLanguage
        );


    /*
     * Temporary development log
     */
    console.log(
        "++++++++++++ Feedback Response ++++++++++++"
    );

    console.log(
        normalizedResponse
    );


    return normalizedResponse;
};


module.exports = {
    generateFeedback
};