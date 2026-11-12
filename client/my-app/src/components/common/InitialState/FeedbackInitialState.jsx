import "./feedbackInitialState.css";

const CommonInitialState = ({ title, subtitle }) => {

  return (
    <div className="feedback-state">

      <div className="feedback-state-content">

        <div className="mentor-icon">
          <span>&lt;/&gt;</span>
        </div>

        <span className="state-eyebrow">
          AI CODING MENTOR
        </span>

        <h2 className="state-title">
          {title}
        </h2>

        <p className="empty-description">
          {subtitle}
        </p>

      </div>

    </div>
  );
};

export default CommonInitialState;