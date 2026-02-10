// KHONG SUA KHI DOI GAME
import "@/fe/styles/game-layout.css";
import { useEffect, useRef, useCallback } from "react";
import { useDevice } from "@/fe/context";
import { useQuizState, useAudioController, QuizAnswer } from "@/be";
import { GAME_TEXTS } from "@/fe/theme";
import { resolvePlayerName } from "@/fe/utils";
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
  const { assets, uiConfig } = useDevice();
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

  const mainMaxWidth = "w-[45%]";

  const playerName = resolvePlayerName(username);

  return (
    <div
      className="game-container flex flex-col"
    >
      <div className="w-full flex flex-col pt-[1cqw] pb-[1cqw]">
        {!isCompleted && (
          <header className="game-header">
            <ScoreIndicator
              total={totalQuestions}
              currentIndex={currentQuestionIndex}
              answerResults={answers}
              indicatorImage={assets.scoreIcon}
            />
          </header>
        )}

        <main 
          className={`game-main flex-1 flex flex-col px-[2%] pb-[0.5cqw] ${mainMaxWidth} mx-auto`}
          style={{ containerType: 'inline-size' }}
        >
          {isCompleted ? (
            <GameResultScreen
              score={correctCount}
              totalQuestions={totalQuestions}
              onRestart={onFinish}
              characterImage={assets.player}
              continueButton={assets.continueButton}
            />
          ) : (
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
                        isDisabled={hasSubmitted || isSubmitting}
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
                  isDisabled={(!selectedAnswer && !hasSubmitted) || isSubmitting}
                  onClick={hasSubmitted ? onContinue : onSubmit}
                  submitButtonImage={assets.submitButton}
                  continueButtonImage={assets.continueButton}
                />
              </div>
              {hasSubmitted && currentResult?.explanation && (
                <div className="mt-[1cqw] px-[1cqw] py-[0.5cqw] rounded-[1cqw] text-center" style={{ background: "rgba(255,255,255,0.8)" }}>
                  <p className="text-[1.5cqw]" style={{ color: "rgba(74,53,32,0.7)" }}>{currentResult.explanation}</p>
                </div>
              )}
            </div>
          )}
        </main>
        
        {!isCompleted && (
          <GameAnimation
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentQuestionIndex}
            hasSubmitted={hasSubmitted}
            currentResult={currentResult}
            correctCount={correctCount}
            playerName={playerName}
            assets={assets}
            uiConfig={uiConfig}
            onResetRef={handleResetRef}
          />
        )}
      </div>
    </div>
  );
};

export default GameController;
