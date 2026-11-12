const {
    requireFields,
    requireBoolean,
    requireArray,
    requireObject,
} = require("../helpers/validation.helper");

const validateRecognition = (data) => {

    requireObject({ data }, "data");

    requireFields(data, [
        "canAnalyze",
        "problemSelectionRequired",
        "selectedProblem",
        "possibleProblems",
    ]);

    requireBoolean(data, "canAnalyze");
    requireBoolean(data, "problemSelectionRequired");

    requireObject(data, "selectedProblem");
    requireArray(data, "possibleProblems");

    // Case 1: AI cannot analyze the input.
    if (!data.canAnalyze) {
        return data;
    }

    // Case 2: Multiple possible problems found.
    if (data.problemSelectionRequired) {

        for (const problem of data.possibleProblems) {

            requireObject({ problem }, "problem");

            requireFields(problem, [
                "name",
                "platform",
                "problemNumber",
                "difficulty",
            ]);
        }

        return data;
    }

    // Case 3: Exactly one problem recognized.
    requireFields(data.selectedProblem, [
        "name",
        "platform",
        "problemNumber",
        "difficulty",
    ]);

    return data;
};

module.exports = {
    validateRecognition,
};