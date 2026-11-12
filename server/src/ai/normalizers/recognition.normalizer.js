const normalizeRecognition = (data) => {

    // Case 1: AI cannot analyze the input.
    if (!data.canAnalyze) {
        return data;
    }

    // Case 2: Multiple possible problems.
    if (data.problemSelectionRequired) {

        data.possibleProblems = data.possibleProblems.map(normalizeProblem);

        return data;
    }

    // Case 3: Exactly one recognized problem.
    data.selectedProblem = normalizeProblem(data.selectedProblem);

    return data;
};

const normalizeProblem = (problem) => {

    return {
        ...problem,

        name: problem.name.trim(),

        platform: normalizePlatform(problem.platform),

        problemNumber: problem.problemNumber.trim(),

        difficulty: normalizeDifficulty(problem.difficulty),
    };

};

const normalizePlatform = (platform) => {

    const value = platform.trim().toLowerCase();

    switch (value) {
        case "leetcode":
            return "LeetCode";

        case "codeforces":
            return "Codeforces";

        case "coding ninjas":
            return "Coding Ninjas";

        default:
            return platform.trim();
    }

};

const normalizeDifficulty = (difficulty) => {

    const value = difficulty.trim().toLowerCase();

    switch (value) {
        case "easy":
            return "Easy";

        case "medium":
            return "Medium";

        case "hard":
            return "Hard";

        default:
            return difficulty.trim();
    }

};

module.exports = {
    normalizeRecognition,
};