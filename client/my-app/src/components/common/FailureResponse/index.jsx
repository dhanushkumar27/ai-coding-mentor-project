
import "./index.css";

const FailureState = ({
  title = "Something went wrong",
  message = "We couldn't complete your request.",
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="failure-container">
      <div className="failure-content">

        <div className="failure-icon">
          <span>!</span>
        </div>

        <h3 className="failure-title">{title}</h3>

        <p className="failure-message">{message}</p>

        <div className="failure-suggestions">
          <p>
            <span className="failure-bullet">•</span>
            Check your internet connection.
          </p>

          <p>
            <span className="failure-bullet">•</span>
            Check your API key or whether the AI service
            is unavailable.
          </p>
        </div>

        {showRetry && (
          <button
            type="button"
            className="failure-retry-btn"
            onClick={onRetry}
            disabled={!onRetry}
          >
            <span>↻</span>
            Try Again
          </button>
        )}

      </div>
    </div>
  );
};

export default FailureState;
