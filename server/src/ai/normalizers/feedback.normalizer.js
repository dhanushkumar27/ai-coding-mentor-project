/*
 * ============================================================
 * FEEDBACK NORMALIZER
 * ============================================================
 *
 * Responsibility:
 *
 * Validated AI response
 *        ↓
 * Canonical application response
 *
 * The validator must run before the normalizer.
 *
 * The normalizer is responsible only for:
 * - applying application-authoritative values
 * - applying safe defaults
 * - trimming strings
 * - removing accidental whitespace
 * - normalizing string arrays
 * - normalizing predictable frontend data
 *
 * The normalizer does NOT:
 * - validate schema
 * - determine correctness
 * - invent information
 * - repair invalid data
 * - change the meaning of feedback
 * - generate feedback
 * - provide solutions
 */

/*
 * ============================================================
 * BASIC HELPERS
 * ============================================================
 */

const normalizeString = (
    value,
    fallback = ""
) => {
    if (
        typeof value !== "string"
    ) {
        return fallback;
    }

    return value.trim();
};

const normalizeStringArray = (
    values
) => {
    if (!Array.isArray(values)) {
        return [];
    }

    return values
        .filter(
            (value) =>
                typeof value === "string"
        )
        .map(
            (value) => value.trim()
        )
        .filter(Boolean);
};

/*
 * ============================================================
 * PROBLEM
 * ============================================================
 */

const normalizeProblem = (
    problem,
    programmingLanguage
) => {
    /*
     * The programming language selected by
     * the application is authoritative.
     *
     * The AI must not override it.
     */

    const language =
        typeof programmingLanguage === "string" &&
        programmingLanguage.trim()
            ? programmingLanguage.trim()
            : normalizeString(
                  problem.language,
                  ""
              );

    return {
        name: normalizeString(
            problem.name,
            ""
        ),

        platform: normalizeString(
            problem.platform,
            "Unknown"
        ),

        problemNumber: normalizeString(
            problem.problemNumber,
            ""
        ),

        difficulty: normalizeString(
            problem.difficulty,
            "Unknown"
        ),

        tags: normalizeStringArray(
            problem.tags
        ),

        language,

        recognized:
            problem.recognized === true,

        confidence:
            problem.confidence,
    };
};

/*
 * ============================================================
 * ENCOURAGEMENT
 * ============================================================
 */

const normalizeEncouragement = (
    encouragement
) => {
    return {
        emoji: normalizeString(
            encouragement.emoji,
            ""
        ),

        message: normalizeString(
            encouragement.message,
            ""
        ),
    };
};

/*
 * ============================================================
 * ANALYSIS
 * ============================================================
 */

const normalizeAnalysis = (
    analysis
) => {
    return {
        status:
            analysis.status,

        confidence:
            analysis.confidence,

        errorTypes:
            normalizeStringArray(
                analysis.errorTypes
            ),
    };
};

/*
 * ============================================================
 * ISSUES
 * ============================================================
 */

const normalizeIssue = (
    issue
) => {
    return {
        description:
            normalizeString(
                issue.description,
                ""
            ),

        severity:
            issue.severity,

        type:
            issue.type,

        location:
            normalizeString(
                issue.location,
                "unknown"
            ),
    };
};

const normalizeIssues = (
    issues
) => {
    if (!Array.isArray(issues)) {
        return [];
    }

    return issues.map(
        normalizeIssue
    );
};

/*
 * ============================================================
 * HINTS
 * ============================================================
 *
 * Canonical format:
 *
 * hints: string[]
 *
 * Example:
 *
 * [
 *   "Check how the loop behaves...",
 *   "Trace a small example..."
 * ]
 */

const normalizeHints = (
    hints
) => {
    return normalizeStringArray(
        hints
    );
};

/*
 * ============================================================
 * FEEDBACK
 * ============================================================
 */

const normalizeFeedback = (
    feedback
) => {
    return {
        strengths:
            normalizeStringArray(
                feedback.strengths
            ),

        issues:
            normalizeIssues(
                feedback.issues
            ),

        hints:
            normalizeHints(
                feedback.hints
            ),

        thinkingQuestions:
            normalizeStringArray(
                feedback.thinkingQuestions
            ),
    };
};

/*
 * ============================================================
 * CODE REVIEW
 * ============================================================
 */

const normalizeCodeReview = (
    codeReview
) => {
    return {
        variableNaming:
            normalizeStringArray(
                codeReview.variableNaming
            ),

        cleanCode:
            normalizeStringArray(
                codeReview.cleanCode
            ),

        optimization:
            normalizeStringArray(
                codeReview.optimization
            ),
    };
};

/*
 * ============================================================
 * LEARNING
 * ============================================================
 */

const normalizeLearning = (
    learning
) => {
    return {
        conceptsToLearn:
            normalizeStringArray(
                learning.conceptsToLearn
            ),

        edgeCasesToTest:
            normalizeStringArray(
                learning.edgeCasesToTest
            ),

        references:
            normalizeStringArray(
                learning.references
            ),
    };
};

/*
 * ============================================================
 * COMPLETE NORMALIZATION
 * ============================================================
 */

const normalizeFeedbackResponse = (
    validatedFeedback,
    programmingLanguage
) => {
    if (
        !validatedFeedback ||
        typeof validatedFeedback !== "object"
    ) {
        const error = new Error(
            "Cannot normalize an invalid feedback response."
        );

        error.code =
            "AI_RESPONSE_NORMALIZATION_ERROR";

        error.status = 502;
        error.retryable = false;

        throw error;
    }

    return {
        problem:
            normalizeProblem(
                validatedFeedback.problem,
                programmingLanguage
            ),

        encouragement:
            normalizeEncouragement(
                validatedFeedback.encouragement
            ),

        analysis:
            normalizeAnalysis(
                validatedFeedback.analysis
            ),

        feedback:
            normalizeFeedback(
                validatedFeedback.feedback
            ),

        codeReview:
            normalizeCodeReview(
                validatedFeedback.codeReview
            ),

        learning:
            normalizeLearning(
                validatedFeedback.learning
            ),
    };
};

module.exports = {
    normalizeFeedbackResponse,
};