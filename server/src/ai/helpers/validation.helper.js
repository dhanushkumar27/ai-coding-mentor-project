const {
    requireFields,
    requireObject,
    requireString,
    requireArray,
} = require("./validation.helper");


const validateSolution = (data) => {

    requireObject(
        { data },
        "data"
    );

    requireFields(
        data,
        [
            "problem",
            "solutions",
        ]
    );

    validateProblem(
        data.problem
    );

    requireObject(
        data,
        "solutions"
    );

    requireFields(
        data.solutions,
        [
            "bruteForce",
            "optimal",
        ]
    );

    validateSolutionType(
        data.solutions.bruteForce,
        true
    );

    validateSolutionType(
        data.solutions.optimal,
        false
    );

    return data;
};


/* ================= PROBLEM ================= */

const validateProblem = (problem) => {

    requireObject(
        { problem },
        "problem"
    );

    requireFields(
        problem,
        [
            "name",
            "platform",
            "platformUrl",
            "problemNumber",
            "difficulty",
            "tags",
            "language",
            "recognized",
            "confidence",
        ]
    );

    requireString(
        problem,
        "name"
    );

    requireString(
        problem,
        "platform"
    );

    requireString(
        problem,
        "platformUrl"
    );

    requireString(
        problem,
        "problemNumber"
    );

    requireString(
        problem,
        "difficulty"
    );

    requireStringArray(
        problem,
        "tags"
    );

    requireString(
        problem,
        "language"
    );

    requireBoolean(
        problem,
        "recognized"
    );

    requireConfidence(
        problem
    );

};


/* ================= SOLUTION ================= */

const validateSolutionType = (
    solution,
    isBruteForce
) => {

    requireObject(
        { solution },
        "solution"
    );

    requireFields(
        solution,
        [
            "summary",
            "algorithm",
            "code",
            "complexity",
            "pseudoCode",
            "testCases",
            "notes",
        ]
    );

    requireString(
        solution,
        "summary"
    );

    requireStringArray(
        solution,
        "algorithm"
    );

    requireString(
        solution,
        "code"
    );

    requireStringArray(
        solution,
        "pseudoCode"
    );

    validateComplexity(
        solution.complexity
    );

    validateTestCases(
        solution.testCases
    );

    requireString(
        solution,
        "notes"
    );


    /* ---------- Brute Force ---------- */

    if (isBruteForce) {

        requireFields(
            solution,
            [
                "pros",
                "cons",
            ]
        );

        requireStringArray(
            solution,
            "pros"
        );

        requireStringArray(
            solution,
            "cons"
        );

    }


    /* ---------- Optimal ---------- */

    else {

        requireFields(
            solution,
            [
                "whyOptimal",
                "bestPractices",
                "tradeOffs",
                "references",
            ]
        );

        requireStringArray(
            solution,
            "whyOptimal"
        );

        requireStringArray(
            solution,
            "bestPractices"
        );

        requireStringArray(
            solution,
            "tradeOffs"
        );

        requireStringArray(
            solution,
            "references"
        );

    }

};


/* ================= COMPLEXITY ================= */

const validateComplexity = (
    complexity
) => {

    requireObject(
        { complexity },
        "complexity"
    );

    requireFields(
        complexity,
        [
            "time",
            "space",
        ]
    );

    requireObject(
        complexity,
        "time"
    );

    requireFields(
        complexity.time,
        [
            "best",
            "average",
            "worst",
        ]
    );

    requireString(
        complexity.time,
        "best"
    );

    requireString(
        complexity.time,
        "average"
    );

    requireString(
        complexity.time,
        "worst"
    );

    requireString(
        complexity,
        "space"
    );

};


/* ================= TEST CASES ================= */

const validateTestCases = (
    testCases
) => {

    if (!Array.isArray(testCases)) {

        throw new Error(
            'Field "testCases" must be an array.'
        );

    }

    testCases.forEach(
        (testCase, index) => {

            const fieldPath = `testCases[${index}]`;

            if (
                testCase === null ||
                typeof testCase !== "object" ||
                Array.isArray(testCase)
            ) {

                throw new Error(
                    `Field "${fieldPath}" must be an object.`
                );

            }

            if (!Object.prototype.hasOwnProperty.call(testCase, "input")) {

                throw new Error(
                    `Missing required field: ${fieldPath}.input`
                );

            }

            if (!Object.prototype.hasOwnProperty.call(testCase, "output")) {

                throw new Error(
                    `Missing required field: ${fieldPath}.output`
                );

            }

            if (typeof testCase.input !== "string") {

                throw new Error(
                    `Field "${fieldPath}.input" must be a string.`
                );

            }

            if (typeof testCase.output !== "string") {

                throw new Error(
                    `Field "${fieldPath}.output" must be a string.`
                );

            }

        }
    );

};


/* ================= CONFIDENCE ================= */

const requireConfidence = (
    problem
) => {

    requireString(
        problem,
        "confidence"
    );

    const allowedValues = [
        "high",
        "medium",
        "low",
    ];

    if (!allowedValues.includes(problem.confidence.toLowerCase())) {

        throw new Error(
            'Field "confidence" must be high, medium, or low.'
        );

    }

};


/* ================= IMPORTED HELPER WRAPPERS ================= */

/*
 * These wrappers are intentionally local to this validator.
 * The shared validation helper remains unchanged.
 */

const {
    requireBoolean,
    requireStringArray,
} = require("./validation.helper");


module.exports = {
    validateSolution,
};