import { useState } from "react";
import {
  Upload,
  ShieldCheck,
  Languages,
  Volume2,
  Settings2,
  FileText,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Utensils,
  Clock3,
} from "lucide-react";

import emptyPatientData from "./data/patientSchema";
import languages from "./translation/languages";
import { processDischargeSummary } from "./services/api";
import MedicineCard from "./components/MedicineCard";
import WarningCard from "./components/WarningCard";
import DietCard from "./components/DietCard";
import FollowUpCard from "./components/FollowUpCard";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("upload");
  const [patientData, setPatientData] = useState(emptyPatientData);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [fileName, setFileName] = useState("");

  const speak = (text) => {
    if (!voiceEnabled || !text) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);

      const language = languages.find(
        (item) => item.code === selectedLanguage
      );

      speech.lang = language?.voice || "en-IN";
      speech.rate = 0.9;

      window.speechSynthesis.speak(speech);
    }
  };
const handleFileUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  setFileName(file.name);
  setScreen("processing");

  try {
    const data = await processDischargeSummary(file);

    setPatientData(data);

    setScreen("dashboard");
  } catch (error) {
    console.error(error);

    setScreen("upload");

    alert(
      "Unable to process the document. Please try again."
    );
  }
};
  const resetApp = () => {
    setPatientData(emptyPatientData);
    setFileName("");
    setScreen("upload");
  };

  return (
    <div
      className={`app ${highContrast ? "high-contrast" : ""} font-${fontSize}`}
    >
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>

          <div>
           <h2>MediGuide AI</h2>
<span>Discharge Companion</span>
          </div>
        </div>

        <div className="top-actions">
          <div className="language-control">
            <Languages size={18} />
            <span className="language-label">Language</span>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.nativeName}
                </option>
              ))}
            </select>
          </div>

          <button
            className={`icon-button ${voiceEnabled ? "active" : ""}`}
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title="Voice assistance"
          >
            <Volume2 size={19} />
          </button>

          <button
            className="icon-button"
            onClick={() =>
              setHighContrast((previous) => !previous)
            }
            title="Accessibility"
          >
            <Settings2 size={19} />
          </button>
        </div>
      </header>

      {screen === "upload" && (
        <UploadScreen
          onUpload={handleFileUpload}
          fileName={fileName}
        />
      )}

      {screen === "processing" && (
        <ProcessingScreen fileName={fileName} />
      )}

      {screen === "dashboard" && (
        <Dashboard
          data={patientData}
          speak={speak}
          resetApp={resetApp}
        />
      )}
    </div>
  );
}

/* =========================
   UPLOAD SCREEN
========================= */

function UploadScreen({ onUpload, fileName }) {
  return (
    <main className="page-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="status-pill">
            <ShieldCheck size={16} />
            Patient-first healthcare AI
          </div>

          <h1>
            Turn your discharge summary
            <span> into a plan you can follow.</span>
          </h1>

          <p>
            Upload your hospital discharge summary and CarePath AI
            organizes medicines, food instructions, warning signs and
            follow-up details into one simple patient-friendly view.
          </p>

          <div className="benefits">
            <div>
              <CheckCircle2 size={18} />
              Easy to understand
            </div>

            <div>
              <CheckCircle2 size={18} />
              Multilingual support
            </div>

            <div>
              <CheckCircle2 size={18} />
              Voice assistance
            </div>
          </div>
        </div>

        <div className="upload-card">
          <div className="process-steps">
  <div className="process-step active">
    <span>1</span>
    <small>Upload</small>
  </div>

  <div className="process-line"></div>

  <div className="process-step">
    <span>2</span>
    <small>Understand</small>
  </div>

  <div className="process-line"></div>

  <div className="process-step">
    <span>3</span>
    <small>Follow</small>
  </div>
</div>
          <div className="upload-icon">
            <Upload size={30} />
          </div>

          <h2>Upload discharge summary</h2>

          <p>
            PDF, image or scanned document
          </p>
<div className="upload-helper">
  Select your discharge summary to begin
</div>

<div className="file-format-note">
  <span>PDF</span>
  <span>JPG</span>
  <span>JPEG</span>
  <span>PNG</span>
  <em>Scanned, photographed or handwritten</em>
</div>

          <label className="upload-button">
            <Upload size={18} />
            Choose Document

            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={onUpload}
              hidden
            />
          </label>
{fileName && (
  <div className="selected-file">
    <FileText size={17} />

    <div className="selected-file-content">
      <span>Selected document</span>
      <strong>{fileName}</strong>
      <small>Ready to process</small>
    </div>
  </div>
)}
          <div className="file-format-note">
  PDF, JPG, JPEG or PNG • Scanned, photographed or handwritten
</div>

          <div className="privacy-note">
  <ShieldCheck size={16} />
  <span>
    Your document is processed securely and used only to create your recovery plan.
  </span>
</div>
<div className="upload-next-info">
  <strong>What happens next?</strong>
  <span>
    We extract your instructions, check for unclear information, and organize them into a simple recovery plan.
  </span>
</div>
<div className="safety-indicator">
  <ShieldCheck size={15} />
  <span>Unclear medical instructions are flagged for verification.</span>
</div>
        </div>
      </section>

      <section className="trust-section">
        <div>
          <ShieldCheck size={22} />
          <div>
            <strong>Safety-first design</strong>
            <span>
              The system does not guess unclear medical instructions.
            </span>
          </div>
        </div>

        <div>
          <Languages size={22} />
          <div>
            <strong>Made for India</strong>
            <span>
              Patient information can be presented in regional languages.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   PROCESSING SCREEN
========================= */

function ProcessingScreen({ fileName }) {
  return (
    <main className="processing-page">
      <div className="processing-card">
        <div className="processing-loader">
          <LoaderCircle size={48} />
        </div>

        <h1>Understanding your document</h1>

        <p>
          We're organizing the information into a clear recovery plan.
        </p>

        <div className="processing-file">
          <FileText size={18} />
          {fileName}
        </div>

        <div className="processing-steps">
          <div className="processing-step done">
            <CheckCircle2 size={18} />
            Document received
          </div>

          <div className="processing-step active">
            <LoaderCircle size={18} />
            Extracting medical information
          </div>

          <div className="processing-step">
            <ShieldCheck size={18} />
            Checking information for safety
          </div>
        </div>
        <div className="processing-safety">
  <ShieldCheck size={16} />
  <span>
    If any medical instruction is unclear, the system will ask for verification instead of guessing.
  </span>
</div>
      </div>
    </main>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({ data, speak, resetApp }) {
  const medicines = data?.medicines || [];
  const diet = data?.diet || [];
  const warnings = data?.warnings || [];
  const followUp = data?.follow_up || {};
  const verification = data?.verification || {};

  const isRefused =
  verification.refusal === true ||
  verification.status === "REFUSED";
  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">YOUR RECOVERY PLAN</span>

          <h1>
            {data?.patient_name
              ? `Hello, ${data.patient_name}`
              : "Your Recovery Plan"}
          </h1>

          <p>
            Everything important from your discharge summary,
            organized in one place.
          </p>
          <div className="dashboard-summary">
  <span>{medicines.length} prescribed medicine{medicines.length !== 1 ? "s" : ""}</span>
  <span>•</span>
  <span>{warnings.length} warning sign{warnings.length !== 1 ? "s" : ""}</span>
  <span>•</span>
  <span>{diet.length} diet instruction{diet.length !== 1 ? "s" : ""}</span>
</div>
<div className="dashboard-status">
  <span className="dashboard-status-dot"></span>
  <span>Recovery plan ready</span>
</div>
        </div>

       <button
  className="secondary-button"
  onClick={() =>
    speak(
      `Your recovery plan contains ${medicines.length} prescribed medicines, ${diet.length} diet instructions, ${warnings.length} warning signs, and follow-up information.`
    )
  }
>
  <Volume2 size={17} />
  Listen to plan
</button>
      </div>

      {verification.refusal && (
        <section className="verification-card">
          <AlertTriangle size={24} />

          <div>
            <strong>We need to verify this information</strong>

            <p>
              {verification.refusal_message ||
                "Some medical information could not be identified reliably. Please contact your hospital before following this instruction."}
            </p>
          </div>
        </section>
      )}

{isRefused && (
  <section className="refusal-card">
    <div className="refusal-icon">
      <ShieldCheck size={24} />
    </div>

    <div className="refusal-content">
      <span className="refusal-label">
        VERIFICATION REQUIRED
      </span>

      <h2>We couldn't safely confirm this information</h2>

      <p>
        {verification.refusal_message ||
          "Some medical instructions are unclear. Please contact the hospital to confirm them before taking the medicine."}
      </p>

      <div className="refusal-note">
        <ShieldCheck size={16} />
        <span>
          The system does not guess unclear medication instructions.
        </span>
      </div>
    </div>
  </section>
)}
      <section className="dashboard-grid">
        <div className="main-column">
          <section className="dashboard-card">
            <div className="section-heading">
              <div>
                <span className="section-label">MEDICATIONS</span>
                <h2>Your medicines</h2>
              </div>

              <div className="section-icon">
                <Clock3 size={20} />
              </div>
            </div>

            {medicines.length === 0 ? (
              <EmptyState text="Medicine information will appear here after processing the discharge summary." />
            ) : (
              <div className="medicine-list">
                {medicines.map((medicine, index) => (
  <MedicineCard
    key={index}
    medicine={medicine}
    onSpeak={speak}
  />
))}
              </div>
            )}
          </section>

          <section className="dashboard-card">
            <div className="section-heading">
              <div>
                <span className="section-label">FOOD & DIET</span>
                <h2>What to follow</h2>
              </div>

              <div className="section-icon">
                <Utensils size={20} />
              </div>
            </div>

    <DietCard
  diet={diet}
  onSpeak={speak}
/>

          </section>
        </div>

        <aside className="side-column">
          <section className="dashboard-card warning-card">
            <div className="section-heading">
              <div>
                <span className="section-label">IMPORTANT</span>
                <h2>Warning signs</h2>
              </div>

              <div className="warning-icon">
                <AlertTriangle size={20} />
              </div>
            </div>
<WarningCard
  warnings={warnings}
  onSpeak={speak}
/>
          </section>

          <section className="dashboard-card followup-card">
            <div className="section-heading">
              <div>
                <span className="section-label">NEXT STEP</span>
                <h2>Follow-up</h2>
              </div>

              <CalendarDays size={20} />
            </div>
<FollowUpCard
  followUp={followUp}
  onSpeak={speak}
/>
          </section>
        </aside>
      </section>
    </main>
  );
}

/* =========================
   MEDICINE CARD
========================= */


/* =========================
   EMPTY STATE
========================= */

function EmptyState({ text }) {
  return (
    <div className="empty-state">
      <FileText size={20} />
      <p>{text}</p>
    </div>
  );
}

export default App;