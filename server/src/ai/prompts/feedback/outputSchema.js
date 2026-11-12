const OUTPUT_SCHEMA = `
{
  "problem": {
    "name": "",
    "platform": "Unknown",
    "problemNumber": "",
    "difficulty": "Unknown",
    "tags": [],
    "language": "",
    "recognized": false,
    "confidence": "low"
  },

  "encouragement": {
    "emoji": "",
    "message": ""
  },

  "analysis": {
    "status": "unknown",
    "confidence": "low",
    "errorTypes": []
  },

  "feedback": {
    "strengths": [],
    "issues": [],
    "hints": [],
    "thinkingQuestions": []
  },

  "codeReview": {
    "variableNaming": [],
    "cleanCode": [],
    "optimization": []
  },

  "learning": {
    "conceptsToLearn": [],
    "edgeCasesToTest": [],
    "references": []
  }
}
`;

module.exports = OUTPUT_SCHEMA;