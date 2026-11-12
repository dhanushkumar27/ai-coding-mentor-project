
/* ==========================================================
   BASIC VALIDATION HELPERS
   All validation logic for Explanation is kept in this file.
========================================================== */


/*
 * Validate that a value is a non-null object
 * and is not an array.
 */
const requireObject = (object, fieldName) => {

    if (
        object === null ||
        object === undefined ||
        typeof object !== "object" ||
        Array.isArray(object)
    ) {
        throw new Error(
            `Field "${fieldName}" must be an object.`
        );
    }
};


/*
 * Validate that all required fields exist
 * in an object.
 */
const requireFields = (object, fields) => {

    if (
        object === null ||
        object === undefined ||
        typeof object !== "object" ||
        Array.isArray(object)
    ) {
        throw new Error(
            "Cannot validate fields because the parent value is not an object."
        );
    }


    fields.forEach((fieldName) => {

        if (!(fieldName in object)) {

            throw new Error(
                `Missing required field "${fieldName}".`
            );

        }

    });
};


/*
 * Validate that a field exists and is a string.
 */
const requireString = (object, fieldName) => {

    if (!(fieldName in object)) {

        throw new Error(
            `Missing required field "${fieldName}".`
        );

    }


    if (typeof object[fieldName] !== "string") {

        throw new Error(
            `Field "${fieldName}" must be a string.`
        );

    }

};


/*
 * Validate that a field exists and is an array.
 */
const requireArray = (object, fieldName) => {

    if (!(fieldName in object)) {

        throw new Error(
            `Missing required field "${fieldName}".`
        );

    }


    if (!Array.isArray(object[fieldName])) {

        throw new Error(
            `Field "${fieldName}" must be an array.`
        );

    }

};


/*
 * Validate that a field exists and is a number.
 */
const requireNumber = (object, fieldName) => {

    if (!(fieldName in object)) {

        throw new Error(
            `Missing required field "${fieldName}".`
        );

    }


    if (
        typeof object[fieldName] !== "number" ||
        Number.isNaN(object[fieldName])
    ) {

        throw new Error(
            `Field "${fieldName}" must be a number.`
        );

    }

};


/*
 * Validate that a field exists,
 * is an array,
 * and every item is a string.
 */
const requireStringArray = (object, fieldName) => {

    requireArray(
        object,
        fieldName
    );


    object[fieldName].forEach((item, index) => {

        if (typeof item !== "string") {

            throw new Error(
                `Field "${fieldName}" must contain only strings. Invalid value at index ${index}.`
            );

        }

    });

};


/* ==========================================================
   MAIN EXPLANATION VALIDATOR
========================================================== */

const validateExplanation = (data) => {

    /*
     * Validate top-level data.
     */
    requireObject(
        { data },
        "data"
    );


    /*
     * Validate required top-level fields.
     */
    requireFields(data, [
        "problem",
        "overview",
        "prerequisites",
        "intuition",
        "patternRecognition",
        "visualHint",
        "analogies",
        "approach",
        "algorithmFlow",
        "dryRun",
        "complexity",
        "keyConcepts",
        "importantObservations",
        "commonMistakes",
        "interviewTips",
    ]);


    /* ================= PROBLEM ================= */

    validateProblem(
        data.problem
    );


    /* ================= OVERVIEW ================= */

    requireString(
        data,
        "overview"
    );


    /* ================= PREREQUISITES ================= */

    requireStringArray(
        data,
        "prerequisites"
    );


    /* ================= INTUITION ================= */

    requireString(
        data,
        "intuition"
    );


    /* ================= PATTERN ================= */

    validatePatternRecognition(
        data.patternRecognition
    );


    /* ================= VISUAL HINT ================= */

    requireString(
        data,
        "visualHint"
    );


    /* ================= ANALOGIES ================= */

    requireStringArray(
        data,
        "analogies"
    );


    /* ================= APPROACH ================= */

    requireStringArray(
        data,
        "approach"
    );


    /* ================= ALGORITHM FLOW ================= */

    requireStringArray(
        data,
        "algorithmFlow"
    );


    /* ================= DRY RUN ================= */

    validateDryRun(
        data.dryRun
    );


    /* ================= COMPLEXITY ================= */

    validateComplexity(
        data.complexity
    );


    /* ================= KEY CONCEPTS ================= */

    requireStringArray(
        data,
        "keyConcepts"
    );


    /* ================= IMPORTANT OBSERVATIONS ================= */

    requireStringArray(
        data,
        "importantObservations"
    );


    /* ================= COMMON MISTAKES ================= */

    requireStringArray(
        data,
        "commonMistakes"
    );


    /* ================= INTERVIEW TIPS ================= */

    requireStringArray(
        data,
        "interviewTips"
    );


    /*
     * Return the original validated data.
     */
    return data;

};


/* ==========================================================
   PROBLEM
========================================================== */

const validateProblem = (problem) => {

    requireObject(
        { problem },
        "problem"
    );


    requireFields(problem, [
        "name",
        "platform",
        "problemNumber",
        "difficulty",
    ]);


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
        "problemNumber"
    );


    requireString(
        problem,
        "difficulty"
    );

};


/* ==========================================================
   PATTERN RECOGNITION
========================================================== */

const validatePatternRecognition = (
    patternRecognition
) => {

    requireObject(
        { patternRecognition },
        "patternRecognition"
    );


    requireFields(patternRecognition, [
        "name",
        "cues",
    ]);


    requireString(
        patternRecognition,
        "name"
    );


    requireStringArray(
        patternRecognition,
        "cues"
    );

};


/* ==========================================================
   DRY RUN
========================================================== */

const validateDryRun = (dryRun) => {

    /*
     * dryRun must be an array.
     */
    requireArray(
        { dryRun },
        "dryRun"
    );


    /*
     * Validate every dry-run step.
     */
    dryRun.forEach((step, index) => {

        requireObject(
            { step },
            "step"
        );


        requireFields(step, [
            "step",
            "description",
            "state",
        ]);


        /*
         * Step number must be a number.
         */
        requireNumber(
            step,
            "step"
        );


        /*
         * Step numbers must be:
         *
         * 1
         * 2
         * 3
         * ...
         *
         * They must also be integers.
         */
        if (
            !Number.isInteger(step.step) ||
            step.step !== index + 1
        ) {

            throw new Error(
                `Dry-run step must be a sequential positive integer. Expected ${
                    index + 1
                }, received ${
                    step.step
                }.`
            );

        }


        /*
         * Validate description.
         */
        requireString(
            step,
            "description"
        );


        /*
         * Validate state.
         */
        validateDryRunState(
            step.state
        );

    });

};


/* ==========================================================
   DRY RUN STATE
========================================================== */

const validateDryRunState = (state) => {

    requireObject(
        { state },
        "state"
    );


    requireFields(state, [
        "variables",
        "dataStructures",
    ]);


    requireStringArray(
        state,
        "variables"
    );


    requireStringArray(
        state,
        "dataStructures"
    );

};


/* ==========================================================
   COMPLEXITY
========================================================== */

const validateComplexity = (complexity) => {

    requireObject(
        { complexity },
        "complexity"
    );


    requireFields(complexity, [
        "time",
        "space",
        "explanation",
    ]);


    requireString(
        complexity,
        "time"
    );


    requireString(
        complexity,
        "space"
    );


    requireString(
        complexity,
        "explanation"
    );

};


/* ==========================================================
   EXPORT
========================================================== */

module.exports = {
    validateExplanation,
};

