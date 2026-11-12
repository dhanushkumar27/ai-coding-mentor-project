import {
  useState,
  useEffect,
  useMemo,
} from "react";

import AIConfigContext from "./AIConfigContext";

const AIConfigProvider = ({ children }) => {
  const [apiKeyValue, setApiKeyValue] = useState(() => {
    try {
      return (
        localStorage.getItem("api_key_value")?.trim() ?? ""
      );
    } catch {
      return "";
    }
  });

  const [showApiKeyError, setShowApiKeyError] = useState(false)

  useEffect(() => {
    try {
      if (apiKeyValue) {
        localStorage.setItem(
          "api_key_value",
          apiKeyValue
        );
      } else {
        localStorage.removeItem("api_key_value");
      }
    } catch (error) {
      console.error("Unable to persist API configuration", error);
    }
  }, [apiKeyValue]);

  

  const contextValue = useMemo(
    () => ({
      apiKeyValue,
      setApiKeyValue,
      showApiKeyError,
      setShowApiKeyError,
    }),
    [apiKeyValue, showApiKeyError]
  );

  return (
    <AIConfigContext.Provider value={contextValue}>
      {children}
    </AIConfigContext.Provider>
  );
};

export default AIConfigProvider;