import { useState, useCallback, useMemo } from "react";

import AIResponseContext from "./AIResponseContext";

const INITIAL_STATUS = "Initial";
const INITIAL_TAB = "Feedback";

const AIResponseProvider = ({ children }) => {
  const [feedbackStatus, setFeedbackStatus] =
    useState(INITIAL_STATUS);

  const [explanationStatus, setExplanationStatus] =
    useState(INITIAL_STATUS);

  const [solutionStatus, setSolutionStatus] =
    useState(INITIAL_STATUS);

  const [feedback, setFeedback] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [solution, setSolution] = useState(null);

  const [selectedResponseTab, setSelectedResponseTab] =
    useState(INITIAL_TAB);

  const [responseSaved, setResponseSaved] = useState(false)

  const clearAIResponse = useCallback(() => {
    setFeedbackStatus(INITIAL_STATUS);
    setExplanationStatus(INITIAL_STATUS);
    setSolutionStatus(INITIAL_STATUS);

    setFeedback(null);
    setExplanation(null);
    setSolution(null);

    setSelectedResponseTab(INITIAL_TAB);
    setResponseSaved(false)
  }, []);

  const contextValue = useMemo(
    () => ({
      feedbackStatus,
      setFeedbackStatus,

      explanationStatus,
      setExplanationStatus,

      solutionStatus,
      setSolutionStatus,

      feedback,
      setFeedback,

      explanation,
      setExplanation,

      solution,
      setSolution,

      selectedResponseTab,
      setSelectedResponseTab,

      responseSaved,
      setResponseSaved,

      clearAIResponse,
    }),
    [
      feedbackStatus,
      explanationStatus,
      solutionStatus,
      feedback,
      explanation,
      solution,
      selectedResponseTab,
      responseSaved,
      clearAIResponse,
    ]
  );

  return (
    <AIResponseContext.Provider value={contextValue}>
      {children}
    </AIResponseContext.Provider>
  );
};

export default AIResponseProvider;