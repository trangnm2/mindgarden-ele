// KHONG SUA KHI DOI GAME
import "./game-layout.css";
import { useEffect, useRef, useCallback, type CSSProperties } from "react";
import { useDevice } from "@/fe/hooks";
import { useQuizState, useAudioController, QuizAnswer } from "@/be";
import { GAME_TEXTS } from "@/fe/theme";
import { resolvePlayerName } from "@/fe/hooks";
import {
  ScoreIndicator,
  QuestionPanel,
  AnswerOptionItem,
  SubmitButton,
  GameAnimation,
  GameResultScreen
} from "@/fe/components";

interface GameControllerProps {
  customQuestions?: any[] | null;
}

const GameController = ({ customQuestions }: GameControllerProps) => {
  const { assets } = useDevice();
  const { playButtonClick, playCorrectAnswer, playWrongAnswer, playFinishGame } = useAudioController();
  const animationResetRef = useRef<(() => void) | null>(null);

  const {
    quiz,
    selectedAnswer,
    currentResult,
    answers,
    correctCount,
    currentQuestionIndex,
    isSubmitting,
    hasSubmitted,
    isCompleted,
    totalQuestions,
    handleAnswerSelect,
    updateAnswer,
    handleContinue,
    finish,
    restart,
    isSampleMode,
    username,
  } = useQuizState({
    onAnswerCorrect: () => {
      playCorrectAnswer();
    },
    onAnswerIncorrect: () => {
      playWrongAnswer();
    },
    customQuestions
  });

  useEffect(() => {
    if (isCompleted) {
      playFinishGame();
    }
  }, [isCompleted, playFinishGame]);

  const onAnswerSelect = (answer: QuizAnswer) => {
    if (hasSubmitted || isSubmitting) return;
    playButtonClick();
    handleAnswerSelect(answer);
  };

  const onSubmit = () => {
    if (!selectedAnswer || hasSubmitted || isSubmitting) return;
    playButtonClick();
    updateAnswer();
  };

  const onContinue = () => {
    playButtonClick();
    handleContinue();
  };

  const onFinish = () => {
    playButtonClick();
    if (isSampleMode) {
      animationResetRef.current?.();
      restart();
      return;
    }
    finish();
  };

  const handleResetRef = useCallback((resetFn: () => void) => {
    animationResetRef.current = resetFn;
  }, []);

  if (!quiz) {
    return (
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${assets.background})` }}
      >
        <div className="font-roboto text-xl" style={{ color: "#4a3520" }}>{GAME_TEXTS.loading}</div>
      </div>
    );
  }

  const playerName = resolvePlayerName(username);
  const gameContainerStyle = {
    ["--game-background" as string]: `url(${assets.background})`,
  } as CSSProperties;

  return (
    <div
      className="game-container flex flex-col"
      style={gameContainerStyle}
    >
      <div className="game-shell w-full flex flex-col">
        <header className="game-header">
          <ScoreIndicator
            total={totalQuestions}
            currentIndex={currentQuestionIndex}
            answerResults={answers}
            indicatorImage={assets.scoreIcon}
          />
        </header>

        <main 
          className="game-main"
          style={{ containerType: 'inline-size' }}
        >
          <div className="question-section">
            <QuestionPanel
              question={quiz.text ?? ""}
              imageUrl={undefined}
              audioUrl={quiz.audioUrl}
              questionFrame={assets.questionFrame}
            />

            <div
              className="answers-grid"
              key={currentQuestionIndex}
            >
              {quiz.answers?.map((answer: QuizAnswer, idx: number) => {
                const isSelected = selectedAnswer?.id === answer.id;

                let isCorrectAnswer: boolean | null = null;
                if (hasSubmitted && currentResult && isSelected) {
                  isCorrectAnswer = currentResult.isCorrect;
                }

                return (
                  <div key={answer.id}>
                    <AnswerOptionItem
                      answer={answer.content ?? ""}
                      index={idx}
                      isSelected={isSelected}
                      isCorrect={isCorrectAnswer}
                      isDisabled={hasSubmitted || isSubmitting || isCompleted}
                      isAnswered={hasSubmitted}
                      correctIndex={quiz.correctIndex}
                      onClick={() => onAnswerSelect(answer)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-0 w-full">
              <SubmitButton
                isAnswered={hasSubmitted}
                isDisabled={isCompleted || ((!selectedAnswer && !hasSubmitted) || isSubmitting)}
                onClick={hasSubmitted ? onContinue : onSubmit}
                submitButtonImage={assets.submitButton}
                continueButtonImage={assets.continueButton}
              />
            </div>
          </div>
        </main>

        <GameAnimation
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          hasSubmitted={hasSubmitted}
          currentResult={currentResult}
          correctCount={correctCount}
          playerName={playerName}
          onResetRef={handleResetRef}
        />

        {isCompleted && (
          <GameResultScreen
            score={correctCount}
            totalQuestions={totalQuestions}
            onRestart={onFinish}
          />
        )}
      </div>
    </div>
  );
};

export default GameController;
