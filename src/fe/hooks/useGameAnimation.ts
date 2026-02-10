// SUA KHI DOI GAME
import { useEffect, useRef, useState } from "react";

interface UseGameAnimationOptions {
  totalQuestions: number;
  currentQuestionIndex: number;
  hasSubmitted: boolean;
  currentResult: any;
  correctCount: number;
}

export const useGameAnimation = ({
  totalQuestions,
  currentQuestionIndex,
  hasSubmitted,
  currentResult,
  correctCount
}: UseGameAnimationOptions) => {
  const [bot1Position, setBot1Position] = useState(0);
  const [bot2Position, setBot2Position] = useState(0);
  const bot1PositionRef = useRef(bot1Position);
  const bot2PositionRef = useRef(bot2Position);

  useEffect(() => {
    bot1PositionRef.current = bot1Position;
    bot2PositionRef.current = bot2Position;
  }, [bot1Position, bot2Position]);

  const [movedBotThisTurn, setMovedBotThisTurn] = useState<number | null>(null);
  const lastProcessedIndex = useRef<number>(-1);

  useEffect(() => {
    if (!hasSubmitted) {
      setMovedBotThisTurn(null);
    }
  }, [hasSubmitted]);

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      setBot1Position(0);
      setBot2Position(0);
      lastProcessedIndex.current = -1;
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (hasSubmitted && lastProcessedIndex.current !== currentQuestionIndex) {
      const botsAvailable: number[] = [];
      if (bot1PositionRef.current < totalQuestions) botsAvailable.push(1);
      if (bot2PositionRef.current < totalQuestions) botsAvailable.push(2);

      let botToMove: number | null = null;

      if (!currentResult?.isCorrect) {
        if (botsAvailable.length > 0) {
          botToMove = botsAvailable[Math.floor(Math.random() * botsAvailable.length)];
        }
      } else {
        if (botsAvailable.length > 0 && Math.random() < 0.6) {
          botToMove = botsAvailable[Math.floor(Math.random() * botsAvailable.length)];
        }
      }

      if (botToMove === 1) {
        setBot1Position(prev => Math.min(prev + 1, totalQuestions));
      } else if (botToMove === 2) {
        setBot2Position(prev => Math.min(prev + 1, totalQuestions));
      }

      setMovedBotThisTurn(botToMove);
      lastProcessedIndex.current = currentQuestionIndex;
    }
  }, [hasSubmitted, currentResult, totalQuestions, currentQuestionIndex]);

  const resetPositions = () => {
    setBot1Position(0);
    setBot2Position(0);
    lastProcessedIndex.current = -1;
  };

  const playerPosition = correctCount;

  const isJumping = {
    player: hasSubmitted && currentResult?.isCorrect === true,
    bot1: hasSubmitted && movedBotThisTurn === 1,
    bot2: hasSubmitted && movedBotThisTurn === 2,
  };

  return {
    playerPosition,
    bot1Position,
    bot2Position,
    isJumping,
    resetPositions,
  };
};
