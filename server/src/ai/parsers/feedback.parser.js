/*
 * ============================================================
 * FEEDBACK RESPONSE PARSER
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
 * - validate the feedback schema
 * - normalize values
 * - sanitize feedback
 * - determine correctness
 * - generate or modify feedback
 */

/*
 * ============================================================
 * PARSER ERROR
 * ============================================================
 */

const createParserError = (
    message,
    cause = undefined
) => {
    const error = new Error(message);

    error.code = "AI_RESPONSE_PARSE_ERROR";
    error.status = 502;
    error.retryable = true;

    if (cause) {
        error.cause = cause;
    }

    return error;
};

/*
 * ============================================================
 * REMOVE MARKDOWN CODE FENCE
 * ============================================================
 *
 * Converts:
 *
 * ```json
 * { ... }
 * ```
 *
 * into:
 *
 * { ... }
 *
 * Formatting cleanup only.
 */

const removeCodeFence = (text) => {
    const trimmed = text.trim();

    const match = trimmed.match(
        /^```(?:json)?\s*([\s\S]*?)\s*```$/i
    );

    return match
        ? match[1].trim()
        : trimmed;
};

/*
 * ============================================================
 * EXTRACT JSON OBJECT
 * ============================================================
 *
 * Used only when the model adds small surrounding text.
 *
 * Example:
 *
 * Here is the feedback:
 * { ... }
 *
 * becomes:
 *
 * { ... }
 *
 * This is intentionally conservative.
 */

const extractJsonObject = (text) => {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

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

/*
 * ============================================================
 * OBJECT CHECK
 * ============================================================
 */

const ensureJSONObject = (parsed) => {
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

/*
 * ============================================================
 * PARSE FEEDBACK RESPONSE
 * ============================================================
 */

const parseFeedbackResponse = (
    rawResponse
) => {
    if (
        typeof rawResponse !== "string" ||
        !rawResponse.trim()
    ) {
        throw createParserError(
            "The AI response was empty or invalid."
        );
    }

    const cleanedResponse =
        removeCodeFence(rawResponse);

    /*
     * --------------------------------------------------------
     * FIRST ATTEMPT
     * --------------------------------------------------------
     *
     * Ideal response:
     *
     * {
     *   ...
     * }
     */

    try {
        const parsed =
            JSON.parse(cleanedResponse);

        return ensureJSONObject(parsed);
    } catch (error) {
        /*
         * If JSON parsing succeeded but the value
         * was not an object, preserve our parser error.
         */

        if (
            error?.code ===
            "AI_RESPONSE_PARSE_ERROR"
        ) {
            throw error;
        }
    }

    /*
     * --------------------------------------------------------
     * SECOND ATTEMPT
     * --------------------------------------------------------
     *
     * Handle small surrounding text.
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

    try {
        const parsed =
            JSON.parse(extractedJson);

        return ensureJSONObject(parsed);
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
    parseFeedbackResponse,
};