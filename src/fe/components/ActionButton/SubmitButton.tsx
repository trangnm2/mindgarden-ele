// KHONG SUA KHI DOI GAME
import "./SubmitButton.css";
import { GAME_TEXTS } from "@/fe/theme";

interface ActionButtonProps {
  isAnswered: boolean;
  isDisabled: boolean;
  onClick: () => void;
  submitButtonImage: string;
  continueButtonImage: string;
}

const SubmitButton = ({ 
  isAnswered, 
  isDisabled, 
  onClick,
  submitButtonImage,
  continueButtonImage,
}: ActionButtonProps) => {

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="submit-btn"
    >
      <img
        src={isAnswered ? continueButtonImage : submitButtonImage}
        alt={isAnswered ? GAME_TEXTS.buttons.continue : GAME_TEXTS.buttons.submit}
      />
    </button>
  );
};

export default SubmitButton;
