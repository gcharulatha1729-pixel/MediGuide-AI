import {
  Clock3,
  Volume2,
  ShieldCheck,
} from "lucide-react";

function MedicineCard({ medicine, onSpeak }) {
  const speakMedicine = () => {
    const text = `
      ${medicine.name || "Medicine"}.
      ${medicine.dosage || ""}.
      ${medicine.frequency || ""}.
      ${medicine.duration || ""}.
      ${medicine.food_timing || ""}.
      ${medicine.instructions || ""}
    `;

    onSpeak(text);
  };

  return (
    <article className="medicine-card">

      <div className="medicine-card-header">

        <div>
          <span className="medicine-label">
            PRESCRIBED MEDICINE
          </span>

          <h3>
            {medicine.name || "Medicine"}
          </h3>
        </div>

        <button
          className="voice-button"
          onClick={speakMedicine}
        >
          <Volume2 size={17} />
          Listen
        </button>

      </div>

      <div className="medicine-information">

        <div className="medicine-info-item">
          <span>Dosage</span>
          <strong>
            {medicine.dosage || "Not available"}
          </strong>
        </div>

        <div className="medicine-info-item">
          <span>Frequency</span>
          <strong>
            {medicine.frequency || "Not available"}
          </strong>
        </div>

        <div className="medicine-info-item">
          <span>Duration</span>
          <strong>
            {medicine.duration || "Not available"}
          </strong>
        </div>

        <div className="medicine-info-item">
          <span>Food timing</span>
          <strong>
            {medicine.food_timing || "Not specified"}
          </strong>
        </div>

      </div>

      {medicine.prescribed_times?.length > 0 && (
        <div className="prescribed-time">

          <Clock3 size={16} />

          <span>
            Prescribed time:
          </span>

          <strong>
            {medicine.prescribed_times.join(" • ")}
          </strong>

        </div>
      )}

      {medicine.instructions && (
        <div className="medicine-instructions">

          <strong>
            Instructions
          </strong>

          <p>
            {medicine.instructions}
          </p>

        </div>
      )}

      {medicine.confidence && (
        <div className="confidence-row">
          <span>AI confidence</span>

          <strong>
            {medicine.confidence}
          </strong>
        </div>
      )}

      {medicine.status && (
        <div className="medicine-status">
          Status: {medicine.status}
        </div>
      )}

      <div className="prescription-safety">

        <ShieldCheck size={16} />

        <span>
          Prescribed instructions cannot be changed
          from the patient dashboard.
        </span>

      </div>

    </article>
  );
}

export default MedicineCard;