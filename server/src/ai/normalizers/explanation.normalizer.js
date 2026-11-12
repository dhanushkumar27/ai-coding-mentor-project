/*
 * ============================================================
 * EXPLANATION NORMALIZER
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
 * - normalizing predictable frontend data
 *
 * The normalizer does NOT:
 * - validate schema
 * - determine algorithm correctness
 * - invent information
 * - generate explanation content
 * - repair invalid data
 * - modify the meaning of the explanation
 */


const normalizeExplanationResponse = (
    validatedExplanation,
    programmingLanguage
) => {

    if (
        !validatedExplanation ||
        typeof validatedExplanation !== "object"
    ) {
        const error = new Error(
            "Cannot normalize an invalid explanation response."
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
                validatedExplanation.problem,
                programmingLanguage
            ),

        overview:
            normalizeString(
                validatedExplanation.overview
            ),

        prerequisites:
            normalizeStringArray(
                validatedExplanation.prerequisites
            ),

        intuition:
            normalizeString(
                validatedExplanation.intuition
            ),

        patternRecognition:
            normalizePatternRecognition(
                validatedExplanation.patternRecognition
            ),

        visualHint:
            normalizeString(
                validatedExplanation.visualHint
            ),

        analogies:
            normalizeStringArray(
                validatedExplanation.analogies
            ),

        approach:
            normalizeStringArray(
                validatedExplanation.approach
            ),

        algorithmFlow:
            normalizeStringArray(
                validatedExplanation.algorithmFlow
            ),

        dryRun:
            normalizeDryRun(
                validatedExplanation.dryRun
            ),

        complexity:
            normalizeComplexity(
                validatedExplanation.complexity
            ),

        keyConcepts:
            normalizeStringArray(
                validatedExplanation.keyConcepts
            ),

        importantObservations:
            normalizeStringArray(
                validatedExplanation.importantObservations
            ),

        commonMistakes:
            normalizeStringArray(
                validatedExplanation.commonMistakes
            ),

        interviewTips:
            normalizeStringArray(
                validatedExplanation.interviewTips
            ),
    };
};


/* ============================================================
   PROBLEM
============================================================ */

const normalizeProblem = (
    problem,
    programmingLanguage
) => {

    const language =
        typeof programmingLanguage === "string" &&
        programmingLanguage.trim()
            ? programmingLanguage.trim()
            : undefined;


    return {
        name:
            normalizeString(
                problem.name
            ),

        platform:
            normalizePlatform(
                problem.platform
            ),

        problemNumber:
            normalizeString(
                problem.problemNumber
            ),

        difficulty:
            normalizeDifficulty(
                problem.difficulty
            ),
    };
};


/* ============================================================
   PATTERN RECOGNITION
============================================================ */

const normalizePatternRecognition = (
    pattern
) => {

    return {
        name:
            normalizeString(
                pattern.name
            ),

        cues:
            normalizeStringArray(
                pattern.cues
            ),
    };
};


/* ============================================================
   DRY RUN
============================================================ */

const normalizeDryRun = (
    dryRun
) => {

    return dryRun.map(
        (step, index) => {

            return {
                step:
                    index + 1,

                description:
                    normalizeString(
                        step.description
                    ),

                state:
                    normalizeDryRunState(
                        step.state
                    ),
            };
        }
    );
};


const normalizeDryRunState = (
    state
) => {

    return {
        variables:
            normalizeStringArray(
                state.variables
            ),

        dataStructures:
            normalizeStringArray(
                state.dataStructures
            ),
    };
};


/* ============================================================
   COMPLEXITY
============================================================ */

const normalizeComplexity = (
    complexity
) => {

    return {
        time:
            normalizeString(
                complexity.time
            ),

        space:
            normalizeString(
                complexity.space
            ),

        explanation:
            normalizeString(
                complexity.explanation
            ),
    };
};


/* ============================================================
   GENERIC NORMALIZERS
============================================================ */

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

    if (
        !Array.isArray(values)
    ) {
        return [];
    }

    return values
        .filter(
            value =>
                typeof value === "string"
        )
        .map(
            value =>
                value.trim()
        )
        .filter(Boolean);
};


/* ============================================================
   PLATFORM
============================================================ */

const normalizePlatform = (
    platform
) => {

    const value =
        normalizeString(
            platform
        ).toLowerCase();


    switch (value) {

        case "leetcode":
            return "LeetCode";

        case "codeforces":
            return "Codeforces";

        case "coding ninjas":
        case "codingninjas":
            return "Coding Ninjas";

        default:
            return normalizeString(
                platform,
                "Unknown"
            );
    }
};


/* ============================================================
   DIFFICULTY
============================================================ */

const normalizeDifficulty = (
    difficulty
) => {

    const value =
        normalizeString(
            difficulty
        ).toLowerCase();


    switch (value) {

        case "easy":
            return "Easy";

        case "medium":
            return "Medium";

        case "hard":
            return "Hard";

        default:
            return normalizeString(
                difficulty,
                "Unknown"
            );
    }
};


module.exports = {
    normalizeExplanationResponse,
};