const OUTPUT_SCHEMA = `
Return ONLY valid JSON.

{
  "problem": {
    "name": "",
    "platform": "Unknown",
    "platformUrl": "",
    "problemNumber": "",
    "difficulty": "Unknown",
    "tags": [],
    "language": "",
    "recognized": false,
    "confidence": "low"
  },

  "solutions": {
    "bruteForce": {
      "summary": "",
      "algorithm": [],
      "code": "",

      "complexity": {
        "time": {
          "best": "",
          "average": "",
          "worst": ""
        },
        "space": ""
      },

      "pseudoCode": [],
      "pros": [],
      "cons": [],
      "testCases": [
        {
          "input": "",
          "output": ""
        }
      ],
      "notes": ""
    },

    "optimal": {
      "summary": "",
      "algorithm": [],
      "code": "",

      "complexity": {
        "time": {
          "best": "",
          "average": "",
          "worst": ""
        },
        "space": ""
      },

      "pseudoCode": [],
      "whyOptimal": [],
      "bestPractices": [],
      "tradeOffs": [],
      "references": [],
      "testCases": [
        {
          "input": "",
          "output": ""
        }
      ],
      "notes": ""
    }
  }
}

STRUCTURE REQUIREMENTS:

- The top-level object must contain exactly "problem" and "solutions".
- The "problem" object must contain exactly the fields shown above.
- The "solutions" object must contain exactly "bruteForce" and "optimal".
- Each solution must contain exactly the fields shown above.
- "algorithm", "pseudoCode", "pros", "cons", "whyOptimal", "bestPractices",
  "tradeOffs", and "references" must be arrays.
- "testCases" must be an array of objects.
- Each test case must contain exactly "input" and "output".
- Every test case "input" must be a string.
- Every test case "output" must be a string.
- "complexity" must contain exactly "time" and "space".
- "time" must contain exactly "best", "average", and "worst".
- "references" must contain URL strings only.
- "problem.language" must exactly equal the selected programming language.
- Do not add fields that are not present in this structure.

For an unknown problem, preserve the complete structure and use empty/default values
rather than inventing a solution.
`;

module.exports = OUTPUT_SCHEMA;

