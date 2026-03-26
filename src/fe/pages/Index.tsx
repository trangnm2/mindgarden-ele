// KHONG SUA KHI DOI GAME
import GameController from "./GameController";
import { useEffect, useState } from "react";
import { DeviceProvider } from "@/fe/hooks";
import { DeviceType } from "@/fe/hooks";

interface IndexProps {
  forcedDeviceType?: DeviceType;
}

const Index = ({ forcedDeviceType }: IndexProps) => {
  const [customQuestions, setCustomQuestions] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const learningObjectCode = urlParams.get("learning_object_code");

      if (learningObjectCode) {
        try {
          const response = await fetch(
            `https://ai-math.clevai.edu.vn/quiz/load-quizs?learning_object_code=${learningObjectCode}`,
          );
          if (response.ok) {
            const data = await response.json();
            if (data.status && data.quizzes) {
              const letterToId: { [key: string]: number } = { A: 1, B: 2, C: 3, D: 4 };

              const fetchedQuestions = data.quizzes.map((quiz: any, index: number) => {
                const answers = quiz.quiz_possible_options
                  .sort((a: any, b: any) => a.option_code.localeCompare(b.option_code))
                  .map((opt: any) => ({
                    id: letterToId[opt.option_code] || 0,
                    content: opt.option_value,
                  }));

                return {
                  id: quiz.quiz_code || `Q_${index}`,
                  text: quiz.content,
                  answers: answers,
                  correctAnswerId: letterToId[quiz.quiz_answers.option_code] || 0,
                  audioUrl: null,
                };
              });
              setCustomQuestions(fetchedQuestions);
            }
          }
        } catch (error) {}
      }
    };

    fetchQuestions();
  }, []);

  return (
    <DeviceProvider forcedDeviceType={forcedDeviceType}>
      <div className="h-full w-full">
        <GameController customQuestions={customQuestions} />
      </div>
    </DeviceProvider>
  );
};

export default Index;
