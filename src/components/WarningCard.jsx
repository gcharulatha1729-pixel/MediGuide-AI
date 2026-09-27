import {
  AlertTriangle,
  Volume2,
} from "lucide-react";

function WarningCard({ warnings, onSpeak }) {
  if (!warnings || warnings.length === 0) {
    return (
      <div className="empty-state">
        <AlertTriangle size={20} />
        <p>
          No warning signs were provided.
        </p>
      </div>
    );
  }

  return (
    <div className="warning-content">

      {warnings.map((warning, index) => (
        <div
          className="warning-item"
          key={index}
        >
          <div className="warning-item-text">
            <AlertTriangle size={18} />

            <span>
              {warning}
            </span>
          </div>

          <button
            className="mini-voice"
            onClick={() => onSpeak(warning)}
            title="Listen"
          >
            <Volume2 size={16} />
          </button>
        </div>
      ))}

    </div>
  );
}

export default WarningCard;