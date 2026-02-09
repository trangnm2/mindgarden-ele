import "@/fe/styles/game-layout.css";
import { useEffect } from "react";
import { useDevice } from "@/fe/context";
import { useQuizState, useAudioController, QuizAnswer } from "@/be";
import { useRaceAnimation } from "@/fe/hooks";
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

  const {
    playerPosition,
    bot1Position,
    bot2Position,
    isJumping,
    resetPositions,
  } = useRaceAnimation({
    totalQuestions,
    currentQuestionIndex,
    hasSubmitted,
    currentResult,
    correctCount,
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
      resetPositions();
      restart();
      return;
    }
    finish();
  };

  if (!quiz) {
    return (
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${assets.background})` }}
      >
        <div className="text-foreground font-roboto text-xl">{GAME_TEXTS.loading}</div>
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
              indicatorImage={assets.banhChung}
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
              mascotImage={assets.mascotRed}
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
                <div className="mt-[1cqw] px-[1cqw] py-[0.5cqw] bg-background/80 rounded-[1cqw] text-center">
                  <p className="text-[1.5cqw] text-foreground/70">{currentResult.explanation}</p>
                </div>
              )}
            </div>
          )}
        </main>
        
        {!isCompleted && (
          <GameAnimation
            playerPosition={playerPosition}
            bot1Position={bot1Position}
            bot2Position={bot2Position}
            isJumping={isJumping}
            playerName={playerName}
            mascotRed={assets.mascotRed}
            mascotGreen={assets.mascotGreen}
            mascotBlue={assets.mascotBlue}
            startLine={assets.startLine}
            finishLine={assets.finishLine}
            uiConfig={uiConfig}
          />
        )}
      </div>
    </div>
  );
};

export default GameController;
