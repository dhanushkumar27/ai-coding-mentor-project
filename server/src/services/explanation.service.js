const buildExplanationPrompt = require(
    "../ai/prompts/explanation/explanation.prompt"
);

const {
    generateContent,
} = require(
    "../ai/providers/gemini.provider"
);

const {
    parseExplanationResponse,
} = require(
    "../ai/parsers/explanation.parser"
);

const {
    validateExplanation,
} = require(
    "../ai/validators/explanation.validator"
);

const {
    normalizeExplanationResponse,
} = require(
    "../ai/normalizers/explanation.normalizer"
);

const generateExplanation = async ({
    programmingLanguage,
    problemName,
    userInput,
    apiKey,
}) => {

    // 1. Build explanation prompt
    const prompt =
        buildExplanationPrompt({
            problemName,
            programmingLanguage,
            userInput,
        });

const rawResponse =
    await generateContent(
        prompt,
        apiKey
    );

    console.log("========== RAW EXPLANATION RESPONSE ==========");
    console.log(rawResponse);
    console.log("========== END RAW EXPLANATION RESPONSE ==========");

const parsedResponse =
    parseExplanationResponse(
        rawResponse
    );

    // 4. Validate response structure
    const validatedResponse =
        validateExplanation(
            parsedResponse
        );

    // 5. Normalize validated response
    const normalizedResponse =
        normalizeExplanationResponse(
            validatedResponse,
            programmingLanguage
        );

    console.log(
        "++++++++++++ Explanation Response ++++++++++++"
    );

    console.log(
        normalizedResponse
    );

    return normalizedResponse;
};


module.exports = {
    generateExplanation,
};