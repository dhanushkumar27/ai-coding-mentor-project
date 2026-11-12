
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import BackgroundThemeContext from "../../../contexts/BackgroundTheme/BackgroundThemeContext"


import "./index.css";

const STORAGE_KEY = "aiCodingMentor_saved_response";

const getSavedWork = () => {
  try {
    const savedData = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(savedData) ? savedData : [];
  } catch (error) {
    console.error("Unable to read saved responses:", error);
    return [];
  }
};

const MyLibraryBody = () => {
  const [savedWorkList, setSavedWorkList] = useState(getSavedWork);
  const {isDarkModeOn} = useContext(BackgroundThemeContext)

  const onDeleteSavedWork = (id) => {
    const updatedList = savedWorkList.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedList)
    );

    setSavedWorkList(updatedList);
  };

  const formatDate = (createdAt) => {
    if (!createdAt) return "Date unavailable";

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  if (savedWorkList.length === 0) {
    return (
      <div className="library-empty-state">
        <h2>Your library is empty</h2>
        <p>
          Save your code analysis, explanations, and solutions
          to access them later.
        </p>
        <Link to="/workspace" className="library-link">
          Go to Workspace
        </Link>
      </div>
    );
  }

  

  return (
    <ul className="saved-work-list">
      {savedWorkList.map((item) => {
        const { id, problemName, date } = item;

        return (
          <li className="saved-work-item" key={id} 
          style={{border:isDarkModeOn ? "2px solid white":"2px solid black"}}>
            <div className="saved-work-header">
              <span className="saved-work-date">
                Created on: {formatDate(date)}
              </span>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDeleteSavedWork(id)}
                aria-label={`Delete ${problemName}`}
              >
                &times;
              </button>
            </div>

            <p className="saved-work-name">
              {problemName || "Untitled Problem"}
            </p>

            <Link
              className="view-button"
              to={`/savedWorkDetails/${id}`}
            >
              View
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MyLibraryBody;
