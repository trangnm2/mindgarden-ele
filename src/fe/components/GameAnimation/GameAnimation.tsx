// SUA KHI DOI GAME
import "./GameAnimation.css";
import { UIConfigType } from "@/fe/theme/uiConfig";
import { useGameAnimation } from "@/fe/hooks";

export interface GameAnimationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  hasSubmitted: boolean;
  currentResult: any;
  correctCount: number;
  playerName: string;
  assets: Record<string, string>;
  uiConfig: UIConfigType;
  onResetRef?: (resetFn: () => void) => void;
}

const GameAnimation = ({
  totalQuestions,
  currentQuestionIndex,
  hasSubmitted,
  currentResult,
  correctCount,
  playerName,
  assets,
  uiConfig,
  onResetRef,
}: GameAnimationProps) => {
  const {
    playerPosition,
    bot1Position,
    bot2Position,
    isJumping,
    resetPositions,
  } = useGameAnimation({
    totalQuestions,
    currentQuestionIndex,
    hasSubmitted,
    currentResult,
    correctCount,
  });

  if (onResetRef) {
    onResetRef(resetPositions);
  }

  const { startIconLeft, finishIconLeft } = uiConfig.animationArea;

  const playerOffset = uiConfig.animationArea.playerLeftOffset ?? 6;
  const bot1Offset = uiConfig.animationArea.bot1LeftOffset ?? 3;
  const bot2Offset = uiConfig.animationArea.bot2LeftOffset ?? 0;

  const start = startIconLeft + 7.5;
  const end = finishIconLeft;
  const step = (end - start) / 5;
  const maxOffset = Math.max(playerOffset, bot1Offset, bot2Offset);

  const calculatePosition = (progress: number, offset: number) => {
    if (progress === 0) {
      return start + offset;
    }
    if (progress === 5) {
      return end + (maxOffset - offset);
    }
    return start + step * progress;
  };

  return (
    <div className="animation-section">
      <div className="animation-track">
        <div 
          className="absolute bottom-0 z-10 opacity-80 w-[8%] translate-x-[50%]" 
          style={{ left: `${startIconLeft + 10}%` }}
        >
           <img src={assets.startIcon} alt="Start" className="w-full h-auto" />
        </div>

        <div 
          className="absolute bottom-0 z-10 w-[7%] -translate-x-[50%]" 
          style={{ left: `${finishIconLeft}%` }}
        >
           <img src={assets.finishIcon} alt="Finish" className="w-full h-auto" />
        </div>

        <div
          className="player bottom-[9cqw]"
          style={{
            left: `${calculatePosition(playerPosition, playerOffset)}%`,
            zIndex: 101
          }}
        >
          <span className="player-name" id="playerName">{playerName}</span>
          <img src={assets.player} alt="Player" />
        </div>

        <div
          className="player bottom-[5cqw]"
          style={{
            left: `${calculatePosition(bot1Position, bot1Offset)}%`,
            zIndex: 102
          }}
        >
          <img src={assets.bot1} alt="Bot 1" />
        </div>

        <div
          className="player bottom-[1cqw]"
          style={{
            left: `${calculatePosition(bot2Position, bot2Offset)}%`,
            zIndex: 103
          }}
        >
          <img src={assets.bot2} alt="Bot 2" />
        </div>
      </div>
    </div>
  );
};

export default GameAnimation;
