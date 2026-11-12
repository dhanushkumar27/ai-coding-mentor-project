const { z } = require("zod");

/*
 * ============================================================
 * ENUMS
 * ============================================================
 */

const ProblemConfidenceSchema = z.enum([
    "high",
    "medium",
    "low",
]);

const AnalysisStatusSchema = z.enum([
    "correct",
    "incorrect",
    "incomplete",
    "unknown",
]);

const AnalysisConfidenceSchema = z.enum([
    "high",
    "medium",
    "low",
]);

const ErrorTypeSchema = z.enum([
    "syntax",
    "compilation",
    "runtime",
    "logic",
    "algorithm",
    "complexity",
    "code-quality",
    "naming",
]);

const IssueSeveritySchema = z.enum([
    "major",
    "minor",
]);

/*
 * ============================================================
 * PROBLEM
 * ============================================================
 */

const ProblemSchema = z
    .object({
        name: z.string(),

        platform: z.string(),

        problemNumber: z.string(),

        difficulty: z.string(),

        tags: z.array(
            z.string()
        ),

        language: z.string(),

        recognized: z.boolean(),

        confidence:
            ProblemConfidenceSchema,
    })
    .strict();

/*
 * ============================================================
 * ENCOURAGEMENT
 * ============================================================
 */

const EncouragementSchema = z
    .object({
        emoji: z.string(),

        message: z.string(),
    })
    .strict();

/*
 * ============================================================
 * ANALYSIS
 * ============================================================
 */

const AnalysisSchema = z
    .object({
        status:
            AnalysisStatusSchema,

        confidence:
            AnalysisConfidenceSchema,

        errorTypes:
            z.array(
                ErrorTypeSchema
            ),
    })
    .strict();

/*
 * ============================================================
 * ISSUE
 * ============================================================
 *
 * Every issue contains exactly:
 *
 * - description
 * - severity
 * - type
 * - location
 */

const IssueSchema = z
    .object({
        description:
            z.string(),

        severity:
            IssueSeveritySchema,

        type:
            ErrorTypeSchema,

        location:
            z.string(),
    })
    .strict();

/*
 * ============================================================
 * FEEDBACK
 * ============================================================
 */

const FeedbackSchema = z
    .object({
        strengths:
            z.array(
                z.string()
            ),

        issues:
            z.array(
                IssueSchema
            ),

        hints:
            z.array(
                z.string()
            ),

        thinkingQuestions:
            z.array(
                z.string()
            ),
    })
    .strict();

/*
 * ============================================================
 * CODE REVIEW
 * ============================================================
 */

const CodeReviewSchema = z
    .object({
        variableNaming:
            z.array(
                z.string()
            ),

        cleanCode:
            z.array(
                z.string()
            ),

        optimization:
            z.array(
                z.string()
            ),
    })
    .strict();

/*
 * ============================================================
 * LEARNING
 * ============================================================
 */

const LearningSchema = z
    .object({
        conceptsToLearn:
            z.array(
                z.string()
            ),

        edgeCasesToTest:
            z.array(
                z.string()
            ),

        references:
            z.array(
                z.string()
            ),
    })
    .strict();

/*
 * ============================================================
 * COMPLETE FEEDBACK RESPONSE
 * ============================================================
 */

const FeedbackResponseSchema = z
    .object({
        problem:
            ProblemSchema,

        encouragement:
            EncouragementSchema,

        analysis:
            AnalysisSchema,

        feedback:
            FeedbackSchema,

        codeReview:
            CodeReviewSchema,

        learning:
            LearningSchema,
    })
    .strict();

/*
 * ============================================================
 * VALIDATION ERROR
 * ============================================================
 */

const createValidationError = (
    validationError
) => {
    const error = new Error(
        "The AI response does not match the expected feedback format."
    );

    error.code =
        "AI_RESPONSE_VALIDATION_ERROR";

    error.status = 502;

    /*
     * A malformed model response may succeed
     * on another attempt.
     */

    error.retryable = true;

    /*
     * Keep structured validation details
     * internally.
     *
     * Do not send these directly to frontend.
     */

    error.details =
        validationError.issues.map(
            (issue) => ({
                path: issue.path,
                code: issue.code,
                message: issue.message,
            })
        );

    error.cause =
        validationError;

    return error;
};

/*
 * ============================================================
 * VALIDATE FEEDBACK
 * ============================================================
 *
 * Input:
 *   Parsed JavaScript object
 *
 * Output:
 *   Validated JavaScript object
 *
 * Responsibility:
 *   Schema validation only.
 *
 * Does NOT:
 * - parse JSON
 * - normalize values
 * - modify data
 * - determine correctness
 * - generate feedback
 */

const validateFeedback = (
    parsedResponse
) => {
    const result =
        FeedbackResponseSchema.safeParse(
            parsedResponse
        );

    if (!result.success) {
        throw createValidationError(
            result.error
        );
    }

    return result.data;
};

module.exports = {
    FeedbackResponseSchema,
    validateFeedback,
};