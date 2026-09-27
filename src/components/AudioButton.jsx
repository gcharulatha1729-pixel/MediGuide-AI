import { Volume2 } from "lucide-react";

function AudioButton({ text, onSpeak }) {
  return (
    <button
      className="voice-button"
      onClick={() => onSpeak(text)}
      title="Listen"
    >
      <Volume2 size={17} />
      Listen
    </button>
  );
}

export default AudioButton;