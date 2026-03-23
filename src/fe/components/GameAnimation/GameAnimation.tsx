// SUA KHI DOI GAME
import "./GameAnimation.css";
import { useEffect } from "react";
import { useGameAnimation, useDevice } from "@/fe/hooks";
import { MARKER_VISIBILITY } from "@/fe/theme";

export interface GameAnimationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  hasSubmitted: boolean;
  currentResult: any;
  correctCount: number;
  playerName: string;
  onResetRef?: (resetFn: () => void) => void;
}

const GameAnimation = ({
  totalQuestions,
  currentQuestionIndex,
  hasSubmitted,
  currentResult,
  correctCount,
  playerName,
  onResetRef,
}: GameAnimationProps) => {
  const { assets, deviceType } = useDevice();
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

  useEffect(() => {
    onResetRef?.(resetPositions);
  }, [onResetRef, resetPositions]);

  const calculatePosition = (progress: number) => {
    const maxLeft = deviceType === "mobile" ? 85 : 98;
    const maxPosition = 5;
    const clampedProgress = Math.max(0, Math.min(progress, maxPosition));
    return (clampedProgress / maxPosition) * maxLeft;
  };

  return (
    <section className="animation-section race-section">
      <div className="animation-track race-track">
        <div
          className="start-marker"
          style={{ visibility: ((deviceType === "mobile" && MARKER_VISIBILITY.startMB) || (deviceType !== "mobile" && MARKER_VISIBILITY.startPC)) ? "visible" : "hidden" }}
        >
          <img src={assets.startIcon} alt="Start" />
        </div>
        <div className="race-lanes">
          <div className="race-lane">
            <div
              className={`player user${isJumping.player ? " moving" : ""}`}
              style={{
                left: `${calculatePosition(playerPosition)}%`,
                zIndex: 101,
              }}
            >
              <span className="player-name" id="playerName">{playerName}</span>
              <img src={assets.player} alt="Player" />
            </div>
          </div>

          <div className="race-lane">
            <div
              className={`player bot1${isJumping.bot1 ? " moving" : ""}`}
              style={{
                left: `${calculatePosition(bot1Position)}%`,
                zIndex: 102,
              }}
            >
              <img src={assets.bot1} alt="Bot 1" />
            </div>
          </div>

          <div className="race-lane">
            <div
              className={`player bot2${isJumping.bot2 ? " moving" : ""}`}
              style={{
                left: `${calculatePosition(bot2Position)}%`,
                zIndex: 103,
              }}
            >
              <img src={assets.bot2} alt="Bot 2" />
            </div>
          </div>
        </div>
        <div
          className="finish-marker"
          style={{ visibility: ((deviceType === "mobile" && MARKER_VISIBILITY.endMB) || (deviceType !== "mobile" && MARKER_VISIBILITY.endPC)) ? "visible" : "hidden" }}
        >
          <img src={assets.finishIcon} alt="Finish" />
        </div>
      </div>
    </section>
  );
};

export default GameAnimation;
