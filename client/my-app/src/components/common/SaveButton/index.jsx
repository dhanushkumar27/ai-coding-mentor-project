
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";

import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext";
import CodeInputContext from "../../../contexts/CodeInputContext/CodeInputContext";
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext'

import './index.css'

const SaveButton = () => {

  const {
    feedback,
    explanation,
    solution,
    responseSaved,
    setResponseSaved
  } = useContext(AIResponseContext);

  const {
    problemName,
    code,
    programmingLanguage
  } = useContext(CodeInputContext);

  const saveBtnText = responseSaved ? "Saved" : "Save";

  const onClickSaveButton = () => {

    // Check whether already saved
    if (responseSaved) {
      alert("Response already saved.");
      return;
    }

    // Check whether there is any response
    if (
      feedback === null &&
      explanation === null &&
      solution === null
    ) {
      alert("No data available to save.");
      return;
    }

    // Check problem name
    if (!problemName.trim()) {
      alert("Enter problem name to save.");
      return;
    }

    try {

      // Get existing saved responses
      const existingResponses = JSON.parse(
        localStorage.getItem("aiCodingMentor_saved_response") || "[]"
      );

      // Create new response object
      const newResponse = {
        id: uuidv4(),
        problemName,
        code,
        programmingLanguage,
        feedback,
        explanation,
        solution,
        date: new Date().toISOString()
      };

      // Add new response to existing list
      const updatedResponses = [
        ...existingResponses,
        newResponse
      ];

      // Store updated list
      localStorage.setItem(
        "aiCodingMentor_saved_response",
        JSON.stringify(updatedResponses)
      );

      setResponseSaved(true);

      alert("Response saved successfully.");

    } catch (error) {
      console.error("Error saving response:", error);
      alert("Unable to save response. Please try again.");
    }
  };

  const {isDarkModeOn} = useContext(BackgroundThemeContext)

  return (
    <button
    type="button"
    className={`save-btn ${isDarkModeOn ? "dark" : "light"} ${responseSaved ? "saved" : ""}`}
    onClick={onClickSaveButton}
    disabled={responseSaved}
    >
        {saveBtnText}
    </button>
  );
};

export default SaveButton;
