
const validateSolution = (data) => {
    requireObject(data, "response");

    requireFields(
        data,
        ["problem", "solutions"],
        "response"
    );

    validateProblem(data.problem);

    requireObject(
        data.solutions,
        "solutions"
    );

    requireFields(
        data.solutions,
        ["bruteForce", "optimal"],
        "solutions"
    );

    validateBruteForce(
        data.solutions.bruteForce
    );

    validateOptimal(
        data.solutions.optimal
    );

    return true;
};


/* =========================================================
   PROBLEM VALIDATION
   ========================================================= */

const validateProblem = (problem) => {
    requireObject(problem, "problem");

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
        ],
        "problem"
    );

    requireString(
        problem.name,
        "problem.name"
    );

    requireString(
        problem.platform,
        "problem.platform"
    );

    requireString(
        problem.platformUrl,
        "problem.platformUrl"
    );

    requireString(
        problem.problemNumber,
        "problem.problemNumber"
    );

    requireString(
        problem.difficulty,
        "problem.difficulty"
    );

    requireArray(
        problem.tags,
        "problem.tags"
    );

    validateStringArray(
        problem.tags,
        "problem.tags"
    );

    requireString(
        problem.language,
        "problem.language"
    );

    requireBoolean(
        problem.recognized,
        "problem.recognized"
    );

    requireString(
        problem.confidence,
        "problem.confidence"
    );

    validatePlatform(
        problem.platform
    );

    validateDifficulty(
        problem.difficulty
    );

    validateConfidence(
        problem.confidence
    );
};


/* =========================================================
   BRUTE FORCE VALIDATION
   ========================================================= */

const validateBruteForce = (solution) => {
    validateCommonSolution(
        solution,
        "solutions.bruteForce"
    );

    requireFields(
        solution,
        [
            "pros",
            "cons",
        ],
        "solutions.bruteForce"
    );

    requireArray(
        solution.pros,
        "solutions.bruteForce.pros"
    );

    requireArray(
        solution.cons,
        "solutions.bruteForce.cons"
    );

    validateStringArray(
        solution.pros,
        "solutions.bruteForce.pros"
    );

    validateStringArray(
        solution.cons,
        "solutions.bruteForce.cons"
    );
};


/* =========================================================
   OPTIMAL VALIDATION
   ========================================================= */

const validateOptimal = (solution) => {
    validateCommonSolution(
        solution,
        "solutions.optimal"
    );

    requireFields(
        solution,
        [
            "whyOptimal",
            "bestPractices",
            "tradeOffs",
            "references",
        ],
        "solutions.optimal"
    );

    requireArray(
        solution.whyOptimal,
        "solutions.optimal.whyOptimal"
    );

    requireArray(
        solution.bestPractices,
        "solutions.optimal.bestPractices"
    );

    requireArray(
        solution.tradeOffs,
        "solutions.optimal.tradeOffs"
    );

    requireArray(
        solution.references,
        "solutions.optimal.references"
    );

    validateStringArray(
        solution.whyOptimal,
        "solutions.optimal.whyOptimal"
    );

    validateStringArray(
        solution.bestPractices,
        "solutions.optimal.bestPractices"
    );

    validateStringArray(
        solution.tradeOffs,
        "solutions.optimal.tradeOffs"
    );

    validateStringArray(
        solution.references,
        "solutions.optimal.references"
    );
};


/* =========================================================
   COMMON SOLUTION VALIDATION
   ========================================================= */

const validateCommonSolution = (
    solution,
    fieldName
) => {
    requireObject(
        solution,
        fieldName
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
        ],
        fieldName
    );

    requireString(
        solution.summary,
        `${fieldName}.summary`
    );

    requireArray(
        solution.algorithm,
        `${fieldName}.algorithm`
    );

    validateStringArray(
        solution.algorithm,
        `${fieldName}.algorithm`
    );

    requireString(
        solution.code,
        `${fieldName}.code`
    );

    validateComplexity(
        solution.complexity,
        `${fieldName}.complexity`
    );

    requireArray(
        solution.pseudoCode,
        `${fieldName}.pseudoCode`
    );

    validateStringArray(
        solution.pseudoCode,
        `${fieldName}.pseudoCode`
    );

    requireArray(
        solution.testCases,
        `${fieldName}.testCases`
    );

    validateTestCases(
        solution.testCases,
        `${fieldName}.testCases`
    );

    requireString(
        solution.notes,
        `${fieldName}.notes`
    );
};


/* =========================================================
   COMPLEXITY VALIDATION
   ========================================================= */

const validateComplexity = (
    complexity,
    fieldName
) => {
    requireObject(
        complexity,
        fieldName
    );

    requireFields(
        complexity,
        ["time", "space"],
        fieldName
    );

    requireObject(
        complexity.time,
        `${fieldName}.time`
    );

    requireFields(
        complexity.time,
        [
            "best",
            "average",
            "worst",
        ],
        `${fieldName}.time`
    );

    requireString(
        complexity.time.best,
        `${fieldName}.time.best`
    );

    requireString(
        complexity.time.average,
        `${fieldName}.time.average`
    );

    requireString(
        complexity.time.worst,
        `${fieldName}.time.worst`
    );

    requireString(
        complexity.space,
        `${fieldName}.space`
    );
};


/* =========================================================
   TEST CASE VALIDATION
   ========================================================= */

const validateTestCases = (
    testCases,
    fieldName
) => {
    testCases.forEach((testCase, index) => {
        const currentField =
            `${fieldName}[${index}]`;

        requireObject(
            testCase,
            currentField
        );

        requireFields(
            testCase,
            [
                "input",
                "output",
            ],
            currentField
        );

        requireString(
            testCase.input,
            `${currentField}.input`
        );

        requireString(
            testCase.output,
            `${currentField}.output`
        );
    });
};


/* =========================================================
   ENUM VALIDATION
   ========================================================= */

const validatePlatform = (platform) => {
    const normalizedPlatform =
        platform.trim().toLowerCase();

    const allowedPlatforms = [
        "unknown",
        "leetcode",
        "codeforces",
        "geeksforgeeks",
        "geeks for geeks",
        "gfg",
        "hackerrank",
        "hacker rank",
        "coding ninjas",
        "codingninjas",
    ];

    if (!allowedPlatforms.includes(normalizedPlatform)) {
        throwValidationError(
            `Invalid problem.platform '${platform}'.`
        );
    }
};


const validateDifficulty = (difficulty) => {
    const normalizedDifficulty =
        difficulty.trim().toLowerCase();

    const allowedDifficulties = [
        "unknown",
        "easy",
        "medium",
        "hard",
    ];

    if (!allowedDifficulties.includes(normalizedDifficulty)) {
        throwValidationError(
            `Invalid problem.difficulty '${difficulty}'.`
        );
    }
};


const validateConfidence = (confidence) => {
    const normalizedConfidence =
        confidence.trim().toLowerCase();

    const allowedConfidence = [
        "high",
        "medium",
        "low",
    ];

    if (!allowedConfidence.includes(normalizedConfidence)) {
        throwValidationError(
            `Invalid problem.confidence '${confidence}'.`
        );
    }
};


/* =========================================================
   GENERIC VALIDATION HELPERS
   ========================================================= */

const requireFields = (
    object,
    fields,
    objectName
) => {
    fields.forEach((fieldName) => {
        if (!(fieldName in object)) {
            throwValidationError(
                `Missing required field '${objectName}.${fieldName}'.`
            );
        }
    });
};


const requireObject = (
    value,
    fieldName
) => {
    if (
        value === null ||
        value === undefined ||
        typeof value !== "object" ||
        Array.isArray(value)
    ) {
        throwValidationError(
            `Field '${fieldName}' must be an object.`
        );
    }
};


const requireArray = (
    value,
    fieldName
) => {
    if (!Array.isArray(value)) {
        throwValidationError(
            `Field '${fieldName}' must be an array.`
        );
    }
};


const requireString = (
    value,
    fieldName
) => {
    if (typeof value !== "string") {
        throwValidationError(
            `Field '${fieldName}' must be a string.`
        );
    }
};


const requireBoolean = (
    value,
    fieldName
) => {
    if (typeof value !== "boolean") {
        throwValidationError(
            `Field '${fieldName}' must be a boolean.`
        );
    }
};


const validateStringArray = (
    array,
    fieldName
) => {
    array.forEach((value, index) => {
        if (typeof value !== "string") {
            throwValidationError(
                `Field '${fieldName}[${index}]' must be a string.`
            );
        }
    });
};


/* =========================================================
   ERROR CREATION
   ========================================================= */

const throwValidationError = (message) => {
    const error = new Error(message);

    error.code =
        "AI_RESPONSE_VALIDATION_ERROR";

    throw error;
};


/* =========================================================
   EXPORT
   ========================================================= */

module.exports = validateSolution;

