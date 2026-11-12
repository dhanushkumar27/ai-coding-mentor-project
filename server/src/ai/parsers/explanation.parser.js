/*
 * ============================================================
 * EXPLANATION RESPONSE PARSER
 * ============================================================
 *
 * Responsibility:
 *
 * Raw AI response
 *        ↓
 * JavaScript object
 *
 * The parser is responsible only for:
 * - removing accidental Markdown code fences
 * - extracting JSON when small surrounding text exists
 * - parsing JSON
 * - ensuring the parsed value is an object
 *
 * The parser does NOT:
 * - validate the explanation schema
 * - normalize values
 * - sanitize explanation content
 * - determine correctness
 * - generate explanation content
 * - modify the meaning of the response
 */


const createParserError = (
    message,
    cause = undefined
) => {
    const error = new Error(message);

    error.code =
        "AI_RESPONSE_PARSE_ERROR";

    error.status = 502;
    error.retryable = true;

    if (cause) {
        error.cause = cause;
    }

    return error;
};


const removeCodeFence = (
    text
) => {
    const trimmed =
        text.trim();

    const match =
        trimmed.match(
            /^```(?:json)?\s*([\s\S]*?)\s*```$/i
        );

    return match
        ? match[1].trim()
        : trimmed;
};


const extractJsonObject = (
    text
) => {
    const start =
        text.indexOf("{");

    const end =
        text.lastIndexOf("}");

    if (
        start === -1 ||
        end === -1 ||
        start >= end
    ) {
        return null;
    }

    return text.slice(
        start,
        end + 1
    );
};


const ensureJSONObject = (
    parsed
) => {
    if (
        parsed === null ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
    ) {
        throw createParserError(
            "The AI response must contain a JSON object."
        );
    }

    return parsed;
};


const parseExplanationResponse = (
    rawResponse
) => {

    /*
     * Step 1:
     * Make sure the AI returned something usable.
     */
    if (
        typeof rawResponse !== "string" ||
        !rawResponse.trim()
    ) {
        throw createParserError(
            "The AI response was empty or invalid."
        );
    }


    /*
     * Step 2:
     * Remove accidental Markdown code fences.
     */
    const cleanedResponse =
        removeCodeFence(
            rawResponse
        );


    /*
     * Step 3:
     * Try parsing the complete response first.
     *
     * Expected case:
     *
     * {
     *   "problem": {...},
     *   ...
     * }
     */
    try {

        const parsed =
            JSON.parse(
                cleanedResponse
            );

        return ensureJSONObject(
            parsed
        );

    } catch (error) {

        /*
         * If the response was valid JSON but
         * the value was not an object, preserve
         * our parser error.
         */
        if (
            error?.code ===
            "AI_RESPONSE_PARSE_ERROR"
        ) {
            throw error;
        }
    }


    /*
     * Step 4:
     * If extra text exists around the JSON,
     * attempt to extract the JSON object.
     *
     * Example:
     *
     * Here is the explanation:
     *
     * {
     *   ...
     * }
     */
    const extractedJson =
        extractJsonObject(
            cleanedResponse
        );


    if (!extractedJson) {
        throw createParserError(
            "The AI response does not contain valid JSON."
        );
    }


    /*
     * Step 5:
     * Parse the extracted JSON.
     */
    try {

        const parsed =
            JSON.parse(
                extractedJson
            );

        return ensureJSONObject(
            parsed
        );

    } catch (error) {

        if (
            error?.code ===
            "AI_RESPONSE_PARSE_ERROR"
        ) {
            throw error;
        }

        throw createParserError(
            "The AI response contains malformed JSON.",
            error
        );
    }
};


module.exports = {
    parseExplanationResponse,
};