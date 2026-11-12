
import { useContext } from "react";

import BackgroundThemeContext from "../../../contexts/BackgroundTheme/BackgroundThemeContext";

import './index.css'

const SelectField = ({
    label,
    value,
    onChange,
    options = [],
    disabled = false,
    id,
}) => {
    const { isDarkModeOn } = useContext(BackgroundThemeContext);

    return (
        <div className={`select-field ${isDarkModeOn ? "dark" : "light"}`}>
            {label && <label htmlFor={id}>{label}</label>}

            <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
