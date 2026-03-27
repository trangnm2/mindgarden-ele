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

  // 6 items total: 5 flowers + 1 bouquet, evenly spaced
  const totalSlots = totalQuestions + 1;
  const getSlotPosition = (idx: number) => `${(idx / (totalSlots - 1)) * 100}%`;

  return (
    <section className="animation-section flower-row-section">
      <div className="flower-row-track">
        {/* Player (squirrel) */}
        <div
          className={`flower-row-player${isJumping ? " flower-row-player-jump" : ""}`}
          style={{
            left: getSlotPosition(playerPosition),
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
              left: getSlotPosition(idx),
            }}
          >
            <img src={flower.src} alt={flower.alt} />
            {activatedFlowers[idx] && <div className="flower-glow" />}
          </div>
        ))}

        {/* Target Bouquet */}
        <div
          className={`flower-slot flower-target${correctCount >= totalQuestions ? " flower-activated" : " flower-dim"}`}
          style={{
            left: getSlotPosition(totalQuestions),
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
