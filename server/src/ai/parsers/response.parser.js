const createParserError = (message, cause) => {
    const error = new Error(message);

    error.status = 502;
    error.code = "INVALID_AI_JSON";
    error.cause = cause;

    return error;
};

const removeCodeFence = (text) => {
    return text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "")
        .trim();
};

const extractJSONObject = (text) => {
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (
        firstBrace === -1 ||
        lastBrace === -1 ||
        firstBrace > lastBrace
    ) {
        return null;
    }

    return text.slice(
        firstBrace,
        lastBrace + 1
    );
};

const parseJSON = (text) => {
    if (typeof text !== "string") {
        throw createParserError(
            "AI response must be a string."
        );
    }

    const rawText = text.trim();

    if (!rawText) {
        throw createParserError(
            "AI returned an empty response."
        );
    }

    if (process.env.NODE_ENV !== "production") {
        console.log(
            "\n========== RAW AI RESPONSE =========="
        );
        console.log(rawText);
        console.log(
            "=====================================\n"
        );
    }

    // Attempt 1: AI returned clean JSON.
    try {
        return JSON.parse(rawText);
    } catch (directParseError) {
        // Continue with tolerant parsing.
    }

    // Attempt 2: AI wrapped JSON in Markdown code fences.
    const cleaned = removeCodeFence(rawText);

    try {
        return JSON.parse(cleaned);
    } catch (fencedParseError) {
        // Continue with JSON extraction.
    }

    // Attempt 3: AI added text around the JSON object.
    const extracted = extractJSONObject(cleaned);

    if (!extracted) {
        throw createParserError(
            "No JSON object found in AI response."
        );
    }

    try {
        return JSON.parse(extracted);
    } catch (parseError) {
        if (process.env.NODE_ENV !== "production") {
            console.error(
                "\n========== JSON PARSING ERROR =========="
            );
            console.error(parseError.message);
            console.error(
                "========================================\n"
            );
        }

        throw createParserError(
            "Invalid JSON returned by AI.",
            parseError
        )
    }
}

module.exports = {
    parseJSON,
}