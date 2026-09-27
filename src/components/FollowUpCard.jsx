import {
  CalendarDays,
  Volume2,
} from "lucide-react";

function FollowUpCard({ followUp, onSpeak }) {
  const timing = followUp?.timing || "";
  const instructions = followUp?.instructions || "";

  if (!timing && !instructions) {
    return (
      <div className="empty-state">
        <CalendarDays size={20} />

        <p>
          No follow-up information was provided.
        </p>
      </div>
    );
  }

  const speakFollowUp = () => {
    onSpeak(
      `${timing}. ${instructions}`
    );
  };

  return (
    <div className="followup-content">

      {timing && (
        <div className="followup-timing">

          <CalendarDays size={20} />

          <div>
            <span>Follow-up timing</span>

            <strong>
              {timing}
            </strong>
          </div>

        </div>
      )}

      {instructions && (
        <div className="followup-instructions">

          <strong>
            Instructions
          </strong>

          <p>
            {instructions}
          </p>

        </div>
      )}

      <button
        className="voice-button"
        onClick={speakFollowUp}
      >
        <Volume2 size={17} />
        Listen
      </button>

    </div>
  );
}

export default FollowUpCard;