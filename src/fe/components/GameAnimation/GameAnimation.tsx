// SUA KHI DOI GAME
import "./GameAnimation.css";
import { useEffect } from "react";
import { useGameAnimation, useDevice } from "@/fe/hooks";
import { FLOWER_ASSETS, TARGET_BUSH } from "@/fe/theme";

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
  const { assets } = useDevice();
  const {
    playerPosition,
    activatedFlowers,
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

  // 6 slots: 5 flowers + 1 target bush
  const totalSlots = totalQuestions + 1;

  return (
    <section className="animation-section flower-row-section">
      <div className="flower-row-track">
        {/* Player (squirrel) */}
        <div
          className={`flower-row-player${isJumping ? " flower-row-player-jump" : ""}`}
          style={{
            left: `${(playerPosition / totalSlots) * 100}%`,
          }}
        >
          <img src={assets.player} alt="Player" />
        </div>

        {/* Flowers */}
        {FLOWER_ASSETS.map((flower, idx) => (
          <div
            key={idx}
            className={`flower-slot${activatedFlowers[idx] ? " flower-activated" : " flower-dim"}`}
            style={{
              left: `${(idx / totalSlots) * 100}%`,
            }}
          >
            <img src={flower.src} alt={flower.alt} />
            {activatedFlowers[idx] && <div className="flower-glow" />}
          </div>
        ))}

        {/* Target Bush */}
        <div
          className={`flower-slot flower-target${correctCount >= totalQuestions ? " flower-activated" : " flower-dim"}`}
          style={{
            left: `${(totalQuestions / totalSlots) * 100}%`,
          }}
        >
          <img src={TARGET_BUSH.src} alt={TARGET_BUSH.alt} />
          {correctCount >= totalQuestions && <div className="flower-glow" />}
        </div>
      </div>
    </section>
  );
};

export default GameAnimation;
