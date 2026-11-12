const { recognizeProblem } = require("./recognition.service");

const { generateSolution } = require("./solution.service");

const analyze = async ({
    language,
    problemName,
    userInput,
}) => {

    const recognition = await recognizeProblem({
        language,
        problemName,
        userInput,
    });

    if (!recognition.canAnalyze) {
        return recognition;
    }

    if (recognition.problemSelectionRequired) {
        return recognition;
    }

    const solutions = await generateSolution({
        language,
        problem: recognition.selectedProblem,
        userInput,
    });

    return {
        recognition,
        solution,
    };
};

module.exports = {
    analyze,
};