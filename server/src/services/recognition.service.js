const buildRecognitionPrompt = require("../ai/prompts/recognition/recognition.prompt");

const { generateContent } = require("../ai/providers/gemini.provider");

const { parseJSON } = require("../ai/parsers/response.parser");

const {validateRecognition} = require("../ai/validators/recognition.validator")
const {normalizeRecognition} = require("../ai/normalizers/recognition.normalizer")

const recognizeProblem = async ({
    language,
    problemName,
    userInput,
}) => {

    const prompt = buildRecognitionPrompt({
        language,
        problemName,
        userInput,
    });

    
    const rawResponse = await generateContent(prompt);

  const parsedResponse = parseJSON(rawResponse);

  const validatedResponse = validateRecognition(parsedResponse);

  const normalizedResponse = normalizeRecognition(validatedResponse);

  return normalizedResponse;
    };

module.exports = {
    recognizeProblem,
};
