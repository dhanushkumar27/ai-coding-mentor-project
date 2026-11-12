
import "./index.css";

const Loader = ({
  title = "Analyzing your code",
  subtitle = "Please wait while we prepare your response."
}) => {
  return (
    <div className="loader-container">
      <div className="loader-content">

        <div className="loader-icon">
          <span className="loader-ring"></span>
          <span className="loader-inner-icon">{"</>"}</span>
        </div>

        <h3 className="loader-title">{title}</h3>

        <p className="loader-subtitle">{subtitle}</p>

        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <p className="loader-hint">
          This may take a few moments
        </p>

      </div>
    </div>
  );
};

export default Loader;
