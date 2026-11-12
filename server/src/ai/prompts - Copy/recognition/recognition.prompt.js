const ROLE = require("./role");
const recognitionInput = require("./input");
const RULES = require("./rules");
const OUTPUT = require("./outputSchema");

const JSON_RULES = require("../shared/json.rules");
const FORMATTING_RULES = require("../shared/formatting.rules");

const buildRecognitionPrompt = ({
  language,
  problemName,
  userInput,
}) => {
  return `
${ROLE}

${recognitionInput({
  language,
  problemName,
  userInput,
})}

${RULES}

${OUTPUT}

${JSON_RULES}

${FORMATTING_RULES}
`;
};

module.exports = buildRecognitionPrompt;