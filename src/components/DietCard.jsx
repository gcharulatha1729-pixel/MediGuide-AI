import {
  CheckCircle2,
  Volume2,
} from "lucide-react";

function DietCard({ diet, onSpeak }) {
  if (!diet || diet.length === 0) {
    return (
      <div className="empty-state">
        <CheckCircle2 size={20} />
        <p>
          No diet instructions were provided.
        </p>
      </div>
    );
  }

  return (
    <div className="diet-content">

      {diet.map((item, index) => (
        <div
          className="diet-item"
          key={index}
        >
          <div className="diet-item-text">
            <CheckCircle2 size={18} />

            <span>
              {item}
            </span>
          </div>

          <button
            className="mini-voice"
            onClick={() => onSpeak(item)}
            title="Listen"
          >
            <Volume2 size={16} />
          </button>
        </div>
      ))}

    </div>
  );
}

export default DietCard;