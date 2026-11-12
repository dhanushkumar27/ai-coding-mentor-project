const API_URL = "http://localhost:5000/api/feedback";

const getFeedback = async (props) => {
    const {
    problemName,
    programmingLanguage,
    code,
    apiKeyValue
} = props 

 
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
