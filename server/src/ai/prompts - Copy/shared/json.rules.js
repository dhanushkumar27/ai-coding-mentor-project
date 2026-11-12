const JSON_RULES = `
Return ONLY valid JSON.

Do not use markdown.

Do not wrap the JSON inside code blocks.

Do not include explanations before or after the JSON.

Every required field must be present.

Never return null unless explicitly allowed.

Never omit required fields.
`;

module.exports = JSON_RULES;