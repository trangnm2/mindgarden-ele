import { useRef, useCallback, useEffect } from "react";
import { AUDIO_URLS } from "@/fe/theme";

interface AudioRefs {
  buttonClick: HTMLAudioElement | null;
  wrongAnswer: HTMLAudioElement | null;
  correctAnswer: HTMLAudioElement | null;
  finishGame: HTMLAudioElement | null;
}

export const useAudioController = () => {
  const audioRefs = useRef<AudioRefs>({
    buttonClick: null,
    wrongAnswer: null,
    correctAnswer: null,
    finishGame: null,
  });

  useEffect(() => {
    audioRefs.current.buttonClick = new Audio(AUDIO_URLS.buttonClick);
    audioRefs.current.wrongAnswer = new Audio(AUDIO_URLS.wrongAnswer);
    audioRefs.current.correctAnswer = new Audio(AUDIO_URLS.correctAnswer);
    audioRefs.current.finishGame = new Audio(AUDIO_URLS.finishGame);

    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.load();
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  const playAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => { });
    }
  }, []);

  const playButtonClick = useCallback(() => {
    playAudio(audioRefs.current.buttonClick);
  }, [playAudio]);

  const playCorrectAnswer = useCallback(() => {
    playAudio(audioRefs.current.correctAnswer);
  }, [playAudio]);

  const playWrongAnswer = useCallback(() => {
    playAudio(audioRefs.current.wrongAnswer);
  }, [playAudio]);

  const playFinishGame = useCallback(() => {
    playAudio(audioRefs.current.finishGame);
  }, [playAudio]);

  return {
    playButtonClick,
    playCorrectAnswer,
    playWrongAnswer,
    playFinishGame,
  };
};
