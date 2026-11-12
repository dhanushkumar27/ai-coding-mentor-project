
const normalizeSolution = (data) => {
    return {
        problem: normalizeProblem(data.problem),

        solutions: {
            bruteForce: normalizeBruteForce(
                data.solutions.bruteForce
            ),

            optimal: normalizeOptimal(
                data.solutions.optimal
            ),
        },
    };
};


/* =========================================================
   PROBLEM
   ========================================================= */

const normalizeProblem = (problem) => {
    return {
        name: normalizeString(problem.name),

        platform: normalizePlatform(
            problem.platform
        ),

        platformUrl: normalizeString(
            problem.platformUrl
        ),

        problemNumber: normalizeString(
            problem.problemNumber
        ),

        difficulty: normalizeDifficulty(
            problem.difficulty
        ),

        tags: normalizeStringArray(
            problem.tags
        ),

        language: normalizeString(
            problem.language
        ),

        recognized: problem.recognized,

        confidence: normalizeConfidence(
            problem.confidence
        ),
    };
};


/* =========================================================
   BRUTE FORCE
   ========================================================= */

const normalizeBruteForce = (solution) => {
    return {
        ...normalizeCommonSolution(solution),

        pros: normalizeStringArray(
            solution.pros
        ),

        cons: normalizeStringArray(
            solution.cons
        ),
    };
};


/* =========================================================
   OPTIMAL
   ========================================================= */

const normalizeOptimal = (solution) => {
    return {
        ...normalizeCommonSolution(solution),

        whyOptimal: normalizeStringArray(
            solution.whyOptimal
        ),

        bestPractices: normalizeStringArray(
            solution.bestPractices
        ),

        tradeOffs: normalizeStringArray(
            solution.tradeOffs
        ),

        references: normalizeStringArray(
            solution.references
        ),
    };
};


/* =========================================================
   COMMON SOLUTION
   ========================================================= */

const normalizeCommonSolution = (solution) => {
    return {
        summary: normalizeString(
            solution.summary
        ),

        algorithm: normalizeStringArray(
            solution.algorithm
        ),

        code: normalizeString(
            solution.code
        ),

        complexity: normalizeComplexity(
            solution.complexity
        ),

        pseudoCode: normalizeStringArray(
            solution.pseudoCode
        ),

        testCases: normalizeTestCases(
            solution.testCases
        ),

        notes: normalizeString(
            solution.notes
        ),
    };
};


/* =========================================================
   COMPLEXITY
   ========================================================= */

const normalizeComplexity = (complexity) => {
    return {
        time: {
            best: normalizeString(
                complexity.time.best
            ),

            average: normalizeString(
                complexity.time.average
            ),

            worst: normalizeString(
                complexity.time.worst
            ),
        },

        space: normalizeString(
            complexity.space
        ),
    };
};


/* =========================================================
   TEST CASES
   ========================================================= */

const normalizeTestCases = (testCases) => {
    return testCases.map((testCase) => ({
        input: normalizeString(
            testCase.input
        ),

        output: normalizeString(
            testCase.output
        ),
    }));
};


/* =========================================================
   STRING ARRAY
   ========================================================= */

const normalizeStringArray = (values) => {
    return values.map((value) =>
        normalizeString(value)
    );
};


/* =========================================================
   STRING
   ========================================================= */

const normalizeString = (value) => {
    return value.trim();
};


/* =========================================================
   PLATFORM
   ========================================================= */

const normalizePlatform = (platform) => {
    const normalized =
        platform.trim().toLowerCase();

    const platformMap = {
        "unknown": "Unknown",

        "leetcode": "LeetCode",

        "codeforces": "Codeforces",

        "geeksforgeeks": "GeeksforGeeks",

        "geeks for geeks": "GeeksforGeeks",

        "gfg": "GeeksforGeeks",

        "hackerrank": "HackerRank",

        "hacker rank": "HackerRank",

        "coding ninjas": "Coding Ninjas",

        "codingninjas": "Coding Ninjas",
    };

    return (
        platformMap[normalized] ||
        platform
    );
};


/* =========================================================
   DIFFICULTY
   ========================================================= */

const normalizeDifficulty = (difficulty) => {
    const normalized =
        difficulty.trim().toLowerCase();

    const difficultyMap = {
        unknown: "Unknown",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
    };

    return (
        difficultyMap[normalized] ||
        difficulty
    );
};


/* =========================================================
   CONFIDENCE
   ========================================================= */

const normalizeConfidence = (confidence) => {
    const normalized =
        confidence.trim().toLowerCase();

    const confidenceMap = {
        high: "high",
        medium: "medium",
        low: "low",
    };

    return (
        confidenceMap[normalized] ||
        confidence
    );
};


/* =========================================================
   EXPORT
   ========================================================= */

module.exports = normalizeSolution;

