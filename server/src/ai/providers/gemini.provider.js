const OpenAI = require("openai/index.js");

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const DEFAULT_TIMEOUT_MS = 30_000;

let cachedDefaultClient = null;
let cachedDefaultApiKey = null;
let cachedReferer = null;
let cachedAppName = null;
let cachedTimeoutMs = null;

/*
 * ------------------------------------------------------------
 * CONFIGURATION
 * ------------------------------------------------------------
 */

const getConfig = () => {
    const defaultApiKey =
        process.env.OPENROUTER_API_KEY?.trim() || null;

    const model =
        process.env.OPENROUTER_MODEL?.trim() || null;

    const referer =
        process.env.OPENROUTER_HTTP_REFERER?.trim() ||
        "http://localhost:3000";

    const appName =
        process.env.OPENROUTER_APP_NAME?.trim() ||
        "AI Coding Mentor";

    const parsedTimeout =
        Number.parseInt(
            process.env.OPENROUTER_TIMEOUT_MS,
            10
        );

    const timeoutMs =
        Number.isFinite(parsedTimeout) &&
        parsedTimeout > 0
            ? parsedTimeout
            : DEFAULT_TIMEOUT_MS;

    return {
        defaultApiKey,
        model,
        referer,
        appName,
        timeoutMs,
    };
};

/*
 * ------------------------------------------------------------
 * ERROR CREATION
 * ------------------------------------------------------------
 */

const createError = ({
    code,
    message,
    status = 502,
    retryable = false,
    cause,
}) => {
    const error = new Error(message);

    error.code = code;
    error.status = status;
    error.retryable = retryable;

    if (cause) {
        error.cause = cause;
    }

    return error;
};

/*
 * ------------------------------------------------------------
 * CLIENT CREATION
 * ------------------------------------------------------------
 */

const createClient = ({
    apiKey,
    referer,
    appName,
    timeoutMs,
}) => {
    return new OpenAI({
        apiKey,
        baseURL: OPENROUTER_BASE_URL,
        timeout: timeoutMs,
        defaultHeaders: {
            "HTTP-Referer": referer,
            "X-Title": appName,
        },
    });
};

/*
 * ------------------------------------------------------------
 * DEFAULT CLIENT
 * ------------------------------------------------------------
 *
 * The server API key client is reused until its configuration
 * changes.
 */

const getDefaultClient = ({
    apiKey,
    referer,
    appName,
    timeoutMs,
}) => {
    const configChanged =
        !cachedDefaultClient ||
        cachedDefaultApiKey !== apiKey ||
        cachedReferer !== referer ||
        cachedAppName !== appName ||
        cachedTimeoutMs !== timeoutMs;

    if (configChanged) {
        cachedDefaultClient = createClient({
            apiKey,
            referer,
            appName,
            timeoutMs,
        });

        cachedDefaultApiKey = apiKey;
        cachedReferer = referer;
        cachedAppName = appName;
        cachedTimeoutMs = timeoutMs;
    }

    return cachedDefaultClient;
};

/*
 * ------------------------------------------------------------
 * CONNECTION ERROR DETECTION
 * ------------------------------------------------------------
 */

const isConnectionError = (error) => {
    const name = error?.name;
    const code = error?.code;
    const causeCode = error?.cause?.code;

    return (
        name === "APIConnectionError" ||
        name === "APIConnectionTimeoutError" ||
        code === "ECONNRESET" ||
        code === "ECONNREFUSED" ||
        code === "ENOTFOUND" ||
        code === "ETIMEDOUT" ||
        causeCode === "ECONNRESET" ||
        causeCode === "ECONNREFUSED" ||
        causeCode === "ENOTFOUND" ||
        causeCode === "ETIMEDOUT"
    );
};

/*
 * ------------------------------------------------------------
 * PROVIDER ERROR MAPPING
 * ------------------------------------------------------------
 *
 * The rest of the backend should depend on these application
 * error codes instead of OpenRouter-specific error structures.
 */

const mapProviderError = (error) => {
    if (isConnectionError(error)) {
        return createError({
            code: "AI_CONNECTION_ERROR",
            message:
                "Unable to connect to the AI service. Please check your internet connection and try again.",
            status: 503,
            retryable: true,
            cause: error,
        });
    }

    const status = Number.isInteger(error?.status)
        ? error.status
        : null;

    if (status === 400) {
        return createError({
            code: "AI_BAD_REQUEST",
            message:
                "The AI service rejected the request.",
            status: 400,
            retryable: false,
            cause: error,
        });
    }

    if (status === 401) {
        return createError({
            code: "AI_INVALID_API_KEY",
            message:
                "The OpenRouter API key is invalid or unauthorized.",
            status: 401,
            retryable: false,
            cause: error,
        });
    }

    if (status === 402) {
        return createError({
            code: "AI_INSUFFICIENT_CREDITS",
            message:
                "The OpenRouter account does not have sufficient credits.",
            status: 402,
            retryable: false,
            cause: error,
        });
    }

    if (status === 403) {
        return createError({
            code: "AI_FORBIDDEN",
            message:
                "The AI service denied this request.",
            status: 403,
            retryable: false,
            cause: error,
        });
    }

    if (status === 404) {
        return createError({
            code: "AI_MODEL_NOT_FOUND",
            message:
                "The configured AI model was not found or is unavailable.",
            status: 502,
            retryable: false,
            cause: error,
        });
    }

    if (status === 408) {
        return createError({
            code: "AI_TIMEOUT",
            message:
                "The AI service took too long to respond. Please try again.",
            status: 504,
            retryable: true,
            cause: error,
        });
    }

    if (status === 429) {
        return createError({
            code: "AI_RATE_LIMITED",
            message:
                "The AI service limit has been reached. Please wait and try again.",
            status: 429,
            retryable: true,
            cause: error,
        });
    }

    if (status >= 500 && status <= 599) {
        return createError({
            code: "AI_PROVIDER_UNAVAILABLE",
            message:
                "The AI service is temporarily unavailable. Please try again later.",
            status: 503,
            retryable: true,
            cause: error,
        });
    }

    return createError({
        code: "AI_PROVIDER_ERROR",
        message:
            "The AI service request failed. Please try again.",
        status: 502,
        retryable: true,
        cause: error,
    });
};

/*
 * ------------------------------------------------------------
 * SAFE ERROR LOGGING
 * ------------------------------------------------------------
 *
 * Never log:
 * - API keys
 * - authorization headers
 * - complete prompts
 * - complete AI responses
 */

const logProviderError = (error) => {
    console.error("OpenRouter API error:", {
        name: error?.name,
        status: error?.status,
        code: error?.code,
        message: error?.message,
    });
};

/*
 * ------------------------------------------------------------
 * GENERATE CONTENT
 * ------------------------------------------------------------
 *
 * This function is intentionally mode-independent.
 *
 * It accepts any valid prompt:
 *
 * Feedback prompt
 * Explanation prompt
 * Solution prompt
 *
 * and returns raw AI text.
 */

const generateContent = async (
    prompt,
    apiKey
) => {
    const {
        defaultApiKey,
        model,
        referer,
        appName,
        timeoutMs,
    } = getConfig();

    /*
     * User-provided key has priority over the server key.
     */
    const userApiKey =
        typeof apiKey === "string"
            ? apiKey.trim()
            : "";

    const selectedApiKey =
        userApiKey || defaultApiKey;

    /*
     * --------------------------------------------------------
     * LOCAL CONFIGURATION VALIDATION
     * --------------------------------------------------------
     */

    if (!selectedApiKey) {
        throw createError({
            code: "AI_API_KEY_NOT_CONFIGURED",
            message:
                "No OpenRouter API key is configured.",
            status: 500,
            retryable: false,
        });
    }

    if (!model) {
        throw createError({
            code: "AI_MODEL_NOT_CONFIGURED",
            message:
                "The OpenRouter model is not configured.",
            status: 500,
            retryable: false,
        });
    }

    if (
        typeof prompt !== "string" ||
        !prompt.trim()
    ) {
        throw createError({
            code: "AI_INVALID_PROMPT",
            message:
                "The AI request could not be created.",
            status: 500,
            retryable: false,
        });
    }

    /*
     * --------------------------------------------------------
     * CLIENT SELECTION
     * --------------------------------------------------------
     *
     * User key:
     *   isolated client
     *
     * Server key:
     *   cached shared client
     */

    const client = userApiKey
        ? createClient({
              apiKey: userApiKey,
              referer,
              appName,
              timeoutMs,
          })
        : getDefaultClient({
              apiKey: defaultApiKey,
              referer,
              appName,
              timeoutMs,
          });

    try {
        /*
         * ----------------------------------------------------
         * OPENROUTER REQUEST
         * ----------------------------------------------------
         */

        const response =
    await client.chat.completions.create({
        model,

        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],

        temperature: 0,
    });

    console.log("OPENROUTER MODEL:", model);

    console.log(
        "OPENROUTER RESPONSE:",
        JSON.stringify(response, null, 2)
    );

        /*
         * ----------------------------------------------------
         * RAW RESPONSE EXTRACTION
         * ----------------------------------------------------
         */

        const content =
            response?.choices?.[0]?.message?.content;

        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            throw createError({
                code: "AI_EMPTY_RESPONSE",
                message:
                    "The AI service returned an empty response.",
                status: 502,
                retryable: true,
            });
        }

        /*
         * IMPORTANT:
         *
         * This provider does NOT:
         *
         * - JSON.parse()
         * - normalize
         * - validate schema
         * - modify AI output
         * - determine feedback/explanation/solution
         *
         * It simply returns raw AI text.
         */

        return content.trim();
    } catch (error) {
        /*
         * Preserve our own application errors.
         */
        if (
            error?.code === "AI_EMPTY_RESPONSE"
        ) {
            throw error;
        }

        const mappedError =
            mapProviderError(error);

        logProviderError(error);

        throw mappedError;
    }
};

module.exports = {
    generateContent,
};
/*
const { GoogleGenAI } = require("@google/genai");

console.log(
    "GEMINI_MODEL:",
    process.env.GEMINI_MODEL
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateContent = async (prompt) => {

    const model = process.env.GEMINI_MODEL;

    console.log(
        "Generating with model:",
        model
    );

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });

    return response.text;
};

module.exports = {
    generateContent,
};
*/