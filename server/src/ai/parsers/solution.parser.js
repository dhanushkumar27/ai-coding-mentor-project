
const removeMarkdownCodeFence = (text) => {
    const trimmedText = text.trim();

    const fencedMatch = trimmedText.match(
        /^```(?:json)?\s*([\s\S]*?)\s*```$/i
    );

    if (fencedMatch) {
        return fencedMatch[1].trim();
    }

    return trimmedText;
};


/*
 * Finds a balanced JSON object inside a string.
 *
 * Important:
 * - Braces inside JSON strings are ignored.
 * - Escaped quotes are handled correctly.
 * - Nested objects are supported.
 */
const extractJsonObject = (text) => {

    for (let startIndex = 0; startIndex < text.length; startIndex += 1) {

        if (text[startIndex] !== "{") {
            continue;
        }

        let depth = 0;
        let insideString = false;
        let isEscaped = false;

        for (
            let currentIndex = startIndex;
            currentIndex < text.length;
            currentIndex += 1
        ) {

            const character = text[currentIndex];

            if (insideString) {

                if (isEscaped) {
                    isEscaped = false;
                    continue;
                }

                if (character === "\\") {
                    isEscaped = true;
                    continue;
                }

                if (character === '"') {
                    insideString = false;
                }

                continue;
            }

            if (character === '"') {
                insideString = true;
                continue;
            }

            if (character === "{") {
                depth += 1;
                continue;
            }

            if (character === "}") {
                depth -= 1;

                if (depth === 0) {
                    return text.slice(
                        startIndex,
                        currentIndex + 1
                    );
                }

                if (depth < 0) {
                    break;
                }
            }
        }
    }

    throw new Error(
        "AI response does not contain a complete JSON object."
    );
};


const parseSolutionResponse = (rawResponse) => {

    if (
        rawResponse === null ||
        rawResponse === undefined
    ) {
        const error = new Error(
            "AI response is empty."
        );

        error.code = "AI_RESPONSE_EMPTY";

        throw error;
    }

    if (typeof rawResponse !== "string") {
        const error = new Error(
            "AI response must be a string."
        );

        error.code = "AI_RESPONSE_TYPE_ERROR";

        throw error;
    }

    const cleanedResponse = removeMarkdownCodeFence(
        rawResponse
    );

    if (!cleanedResponse) {
        const error = new Error(
            "AI response is empty."
        );

        error.code = "AI_RESPONSE_EMPTY";

        throw error;
    }

    /*
     * First attempt:
     * The model followed the JSON-only requirement.
     */
    try {

        const parsedResponse = JSON.parse(
            cleanedResponse
        );

        if (
            parsedResponse === null ||
            typeof parsedResponse !== "object" ||
            Array.isArray(parsedResponse)
        ) {
            const error = new Error(
                "AI response must contain a JSON object."
            );

            error.code = "AI_RESPONSE_OBJECT_ERROR";

            throw error;
        }

        return parsedResponse;

    } catch (directParseError) {

        /*
         * Second attempt:
         * The model returned additional text around the JSON object.
         *
         * We extract a balanced JSON object rather than simply taking
         * the first and last braces.
         */
        try {

            const jsonText = extractJsonObject(
                cleanedResponse
            );

            const parsedResponse = JSON.parse(
                jsonText
            );

            if (
                parsedResponse === null ||
                typeof parsedResponse !== "object" ||
                Array.isArray(parsedResponse)
            ) {
                const error = new Error(
                    "AI response must contain a JSON object."
                );

                error.code = "AI_RESPONSE_OBJECT_ERROR";

                throw error;
            }

            return parsedResponse;

        } catch (extractedParseError) {

            const error = new Error(
                "AI response could not be parsed as valid JSON."
            );

            error.code = "AI_RESPONSE_PARSE_ERROR";

            error.cause = extractedParseError;

            throw error;
        }
    }
};


module.exports = parseSolutionResponse;

