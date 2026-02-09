import "./GameResultScreen.css";
import { GAME_TEXTS } from "@/fe/theme";

interface GameResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  mascotImage: string;
  continueButton: string;
}

const GameResultScreen = ({ score, totalQuestions, onRestart, mascotImage, continueButton }: GameResultScreenProps) => {
  const isWinner = score >= totalQuestions;

  return (
    <div className="game-overlay">
      <div className="overlay-content">
        <img
          src={mascotImage}
          alt="Mascot"
          className={`mx-auto ${isWinner ? "celebrating" : ""}`}
          style={{ width: '40cqw', marginBottom: '2cqw' }}
        />

        <h2>
          {isWinner ? GAME_TEXTS.result.winTitle : GAME_TEXTS.result.loseTitle}
        </h2>

        <p>
          {isWinner
            ? GAME_TEXTS.result.winMessage
            : GAME_TEXTS.result.loseMessage(score, totalQuestions)}
        </p>

        <button
          onClick={onRestart}
          className="restart-btn"
        >
          <img src={continueButton} alt={GAME_TEXTS.buttons.continue} />
        </button>
      </div>
    </div>
  );
};

export default GameResultScreen;
