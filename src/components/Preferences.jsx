import {
  Languages,
  Volume2,
  Type,
  Contrast,
} from "lucide-react";

function Preferences({
  selectedLanguage,
  setSelectedLanguage,
  languages,
  voiceEnabled,
  setVoiceEnabled,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
}) {
  return (
    <section className="preferences-card">

      <div className="preference-row">

        <div className="preference-icon">
          <Languages size={19} />
        </div>

        <div className="preference-content">
          <strong>Language</strong>

          <select
            value={selectedLanguage}
            onChange={(event) =>
              setSelectedLanguage(event.target.value)
            }
          >
            {languages.map((language) => (
              <option
                key={language.code}
                value={language.code}
              >
                {language.nativeName}
              </option>
            ))}
          </select>
        </div>

      </div>


      <div className="preference-row">

        <div className="preference-icon">
          <Volume2 size={19} />
        </div>

        <div className="preference-content">
          <strong>Voice assistance</strong>

          <button
            className={`toggle-button ${
              voiceEnabled ? "enabled" : ""
            }`}
            onClick={() =>
              setVoiceEnabled(!voiceEnabled)
            }
          >
            {voiceEnabled ? "ON" : "OFF"}
          </button>
        </div>

      </div>


      <div className="preference-row">

        <div className="preference-icon">
          <Type size={19} />
        </div>

        <div className="preference-content">
          <strong>Text size</strong>

          <select
            value={fontSize}
            onChange={(event) =>
              setFontSize(event.target.value)
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

      </div>


      <div className="preference-row">

        <div className="preference-icon">
          <Contrast size={19} />
        </div>

        <div className="preference-content">
          <strong>High contrast</strong>

          <button
            className={`toggle-button ${
              highContrast ? "enabled" : ""
            }`}
            onClick={() =>
              setHighContrast(!highContrast)
            }
          >
            {highContrast ? "ON" : "OFF"}
          </button>
        </div>

      </div>

    </section>
  );
}

export default Preferences;