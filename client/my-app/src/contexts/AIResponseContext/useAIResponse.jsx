import { useContext } from "react";
import AIResponseContext from "./AIResponseContext";

const useAIResponse = () => {
  const context = useContext(AIResponseContext);

  if (!context) {
    throw new Error(
      "useAIResponse must be used inside AIResponseProvider"
    );
  }

  return context;
};

export default useAIResponse;