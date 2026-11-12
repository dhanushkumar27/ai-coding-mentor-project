const buildSolutionPrompt = require(
    "../ai/prompts/solution/solution.prompt"
);

const { generateContent } = require(
    "../ai/providers/gemini.provider"
);

const parseSolutionResponse = require(
    "../ai/parsers/solution.parser"
);

const validateSolution = require(
    "../ai/validators/solution.validator"
);

const normalizeSolution = require(
    "../ai/normalizers/solution.normalizer"
);


const generateSolution = async ({
    programmingLanguage,
    problemName,
    userInput,
    apiKey
}) => {

    const prompt = buildSolutionPrompt({
        problemName,
        programmingLanguage,
        userInput
    });

    const rawResponse =
        await generateContent(
            prompt,
            apiKey
        );



    const parsedResponse =
        parseSolutionResponse(
            rawResponse
        );

    validateSolution(
        parsedResponse
    );

    const normalizedResponse =
        normalizeSolution(
            parsedResponse
        );


    return normalizedResponse;
};


module.exports = {
    generateSolution
};