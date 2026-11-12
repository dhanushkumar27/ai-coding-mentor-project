const recognitionInput = ({
  language,
  problemName,
  userInput,
}) => `
# INPUT

Programming Language:
${language || "Not Provided"}

Problem Name:
${problemName || "Not Provided"}

User Submission:
${userInput}
`;

module.exports = recognitionInput;