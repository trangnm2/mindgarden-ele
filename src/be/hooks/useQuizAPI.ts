import { useCallback, useEffect, useRef, useState } from "react";
import { API_ACTIONS } from "@/be/constants";
import { UseQuizAPIOptions, AnswerOption } from "@/be/types";

const buildQuestionSignature = (payload: any) => {
  if (!payload) return "";
  const id = payload.id ?? payload.quiz_code ?? payload.quizCode ?? null;
  const text = payload.text ?? payload.content ?? payload.question ?? null;
  const answers = payload.answers ?? payload.quiz_possible_options ?? null;
  return JSON.stringify({ id, text, answers });
};

const postToParent = (type: string, payload: any = {}) => {
  if (window.parent) {
    window.parent.postMessage({ type, payload }, "*");
  }
};

export function useQuizAPI({ onAnswerCorrect, onAnswerIncorrect }: UseQuizAPIOptions = {}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestionIndexRef = useRef(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(null);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [quiz, setQuiz] = useState<any>(null);
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const isLastQuestionRef = useRef(false);
  const awaitingQuestionRef = useRef(false);
  const lastQuestionSignatureRef = useRef("");
  const hasSubmittedRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const pendingExternalAdvanceRef = useRef(false);

  const onAnswerCorrectRef = useRef(onAnswerCorrect);
  const onAnswerIncorrectRef = useRef(onAnswerIncorrect);

  useEffect(() => {
    hasSubmittedRef.current = hasSubmitted;
  }, [hasSubmitted]);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    onAnswerCorrectRef.current = onAnswerCorrect;
  }, [onAnswerCorrect]);

  useEffect(() => {
    onAnswerIncorrectRef.current = onAnswerIncorrect;
  }, [onAnswerIncorrect]);

  const forceAdvance = useCallback(() => {
    const nextIndex = currentQuestionIndexRef.current + 1;
    currentQuestionIndexRef.current = nextIndex;
    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
    setHasSubmitted(false);
    hasSubmittedRef.current = false;
    setCurrentResult(null);
    pendingExternalAdvanceRef.current = false;
  }, []);

  const finish = useCallback(() => {
    postToParent(API_ACTIONS.FINISH);
  }, []);

  const updateAnswer = useCallback(async () => {
    if (!selectedAnswer || isSubmitting) {
      return;
    }
    postToParent(API_ACTIONS.UPDATE_ANSWER, selectedAnswer.id);
    setIsSubmitting(true);
    isSubmittingRef.current = true;
    setHasSubmitted(true);
    hasSubmittedRef.current = true;
    return Promise.resolve();
  }, [selectedAnswer, isSubmitting]);

  const handleContinue = useCallback(() => {
    if (!hasSubmitted) return;
    if (isLastQuestionRef.current) {
      setIsCompleted(true);
    } else {
      awaitingQuestionRef.current = true;
      postToParent(API_ACTIONS.SHOW_LO5);
      const nextIndex = currentQuestionIndexRef.current + 1;
      currentQuestionIndexRef.current = nextIndex;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setHasSubmitted(false);
      hasSubmittedRef.current = false;
      setCurrentResult(null);
    }
  }, [hasSubmitted]);

  const handleAnswerSelect = useCallback(
    (answer: AnswerOption) => {
      if (!isSubmitting && !hasSubmitted) {
        setSelectedAnswer(answer);
      }
    },
    [isSubmitting, hasSubmitted]
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data || {};
      if (type === API_ACTIONS.FINISH) {
        setIsCompleted(true);
        setIsSubmitting(false);
        isSubmittingRef.current = false;
        setHasSubmitted(true);
        hasSubmittedRef.current = true;
        awaitingQuestionRef.current = false;
        pendingExternalAdvanceRef.current = false;
        return;
      }
      if (type === API_ACTIONS.RETURN_LO5) {
        const signature = buildQuestionSignature(payload);
        const isNewQuestion = signature !== lastQuestionSignatureRef.current;
        const shouldForceAdvance =
          isNewQuestion &&
          !awaitingQuestionRef.current &&
          hasSubmittedRef.current;

        if (shouldForceAdvance) {
          if (isSubmittingRef.current) {
            pendingExternalAdvanceRef.current = true;
          } else {
            forceAdvance();
          }
        }

        lastQuestionSignatureRef.current = signature;
        awaitingQuestionRef.current = false;
        setQuiz(payload);
        return;
      }

      if (type === API_ACTIONS.RETURN_UPDATE_ANSWER) {
        const isCorrect = payload?.isCorrect === true;
        const isLast = payload?.isLastQuestion === true;
        isLastQuestionRef.current = isLast;

        setAnswers((prevAnswers) => {
          const next = [...prevAnswers];
          next[currentQuestionIndexRef.current] = isCorrect;
          return next;
        });

        if (isCorrect) {
          setCorrectCount((prev) => prev + 1);
          onAnswerCorrectRef.current?.({
            currentQuestionIndex: currentQuestionIndexRef.current,
            correctAnswerId: payload?.correctAnswerId,
            incorrectAnswerId: payload?.incorrectAnswerId
          });
        } else {
          onAnswerIncorrectRef.current?.({
            currentQuestionIndex: currentQuestionIndexRef.current,
            correctAnswerId: payload?.correctAnswerId,
            incorrectAnswerId: payload?.incorrectAnswerId
          });
        }

        setIsSubmitting(false);
        isSubmittingRef.current = false;
        setCurrentResult(payload);

        if (pendingExternalAdvanceRef.current) {
          forceAdvance();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    postToParent(API_ACTIONS.SHOW_LO5);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [forceAdvance]);

  return {
    quiz,
    currentResult,
    answers,
    correctCount,
    currentQuestionIndex,
    selectedAnswer,
    isSubmitting,
    hasSubmitted,
    isCompleted,
    handleAnswerSelect,
    updateAnswer,
    handleContinue,
    finish
  };
}
