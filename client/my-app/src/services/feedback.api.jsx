

const getFeedback = async (props) => {
    const {
    problemName,
    programmingLanguage,
    code,
    apiKeyValue
} = props 

const API_URL = import.meta.env.VITE_API_URL;

const FEEDBACK_API_URL = `${API_URL}/api/v1/feedback`;

console.log(FEEDBACK_API_URL)
 
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
        throw new Error("Failed to generate feedback.");
    }

    return await response.json();
};

export default getFeedback
