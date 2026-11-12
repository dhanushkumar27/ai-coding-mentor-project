import { useContext } from "react";
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext'

import './index.css'

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  className = "",
  id,
}) => {
  const { isDarkModeOn } = useContext(BackgroundThemeContext);

  return (
      <div className={`input-field ${isDarkModeOn ? "dark" : "light"} ${className}`}>
          {label && <label htmlFor={id}>{label}</label>}

          <input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
          />
      </div>
  );
};

export default InputField;