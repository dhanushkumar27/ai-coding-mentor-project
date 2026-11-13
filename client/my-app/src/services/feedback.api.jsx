
const API_URL = import.meta.env.VITE_API_URL;

const FEEDBACK_API_URL = `${API_URL}/api/feedback`;

const getFeedback = async (props) => {
    const {
        problemName,
        programmingLanguage,
        code,
        apiKeyValue
    } = props;

    if (!API_URL) {
        throw new Error("VITE_API_URL is not configured.");
    }

    const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            problemName,
            programmingLanguage,
            userInput: code,
            apiKey: apiKeyValue
        }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData?.error?.message ||
            responseData?.message ||
            "Failed to generate feedback."
        );
    }

    return responseData;
};

export default getFeedback;
