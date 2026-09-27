import {
  ShieldCheck,
  Languages,
  Volume2,
  Settings2,
} from "lucide-react";

function Header({
  selectedLanguage,
  setSelectedLanguage,
  languages,
  voiceEnabled,
  setVoiceEnabled,
  highContrast,
  setHighContrast,
}) {
  return (
    <header className="topbar">

      <div className="brand">

        <div className="brand-icon">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h2>CarePath AI</h2>
          <span>Discharge Companion</span>
        </div>

      </div>


      <div className="top-actions">

        <div className="language-control">

          <Languages size={18} />

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


        <button
          className={`icon-button ${
            voiceEnabled ? "active" : ""
          }`}
          onClick={() =>
            setVoiceEnabled(!voiceEnabled)
          }
          title="Voice assistance"
        >
          <Volume2 size={19} />
        </button>


        <button
          className={`icon-button ${
            highContrast ? "active" : ""
          }`}
          onClick={() =>
            setHighContrast(!highContrast)
          }
          title="Accessibility"
        >
          <Settings2 size={19} />
        </button>

      </div>

    </header>
  );
}

export default Header;