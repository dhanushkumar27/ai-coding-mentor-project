import { useContext } from "react";
import AIConfigContext from "./AIConfigContext";

const useAIConfig = () => {
  const context = useContext(AIConfigContext);

  if (!context) {
    throw new Error(
      "useAIConfig must be used inside AIConfigProvider"
    );
  }

  return context;
};

export default useAIConfig;