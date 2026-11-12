const API_URL = `${import.meta.env.VITE_API_URL}/api/explanation`;

const getExplanation = async (props) => {
    const {
    problemName,
    programmingLanguage,
    code,
    apiKeyValue
} = props 

console.log(apiKeyValue)

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            problemName,
            programmingLanguage,
            userInput:code,
            apiKey:apiKeyValue
        }),
    });
   
    if (!response.ok) {
        throw new Error("Failed to generate Explanation.");
    }

    return await response.json();
};

export default getExplanation
