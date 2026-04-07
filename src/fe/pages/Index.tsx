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
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const learningObjectCode = urlParams.get('learning_object_code');

      if (learningObjectCode) {
        try {
          const response = await fetch(`https://ai-math.clevai.edu.vn/quiz/load-quizs?learning_object_code=${learningObjectCode}`);
          if (!response.ok) {
            setFetchError(`Lỗi tải câu hỏi (HTTP ${response.status})`);
            return;
          }
          const data = await response.json();
           if (data.status && data.quizzes) {
              const letterToId: {[key: string]: number} = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 };
              
              const fetchedQuestions = data.quizzes.map((quiz: any, index: number) => {
                  const answers = quiz.quiz_possible_options
                      .sort((a: any, b: any) => a.option_code.localeCompare(b.option_code))
                      .map((opt: any) => ({
                          id: letterToId[opt.option_code] || 0,
                          content: opt.option_value
                      }));
                  
                  return {
                      id: quiz.quiz_code || `Q_${index}`,
                      text: quiz.content,
                      answers: answers,
                      correctAnswerId: letterToId[quiz.quiz_answers.option_code] || 0,
                      audioUrl: null
                  };
              });
              setCustomQuestions(fetchedQuestions);
          } else {
              setFetchError("Không tìm thấy câu hỏi cho mã học liệu này");
          }
        } catch (error) {
          setFetchError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng và thử lại.");
        }
      }
    };

    fetchQuestions();
  }, []);

  const handleRetry = () => {
    setFetchError(null);
    setCustomQuestions(null);
    window.location.reload();
  };

  if (fetchError) {
    return (
      <DeviceProvider forcedDeviceType={forcedDeviceType}>
        <div style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          fontFamily: "'Nunito', sans-serif",
        }}>
          <div style={{
            textAlign: "center",
            padding: "2rem",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.15)",
            maxWidth: "400px",
          }}>
            <h2 style={{ color: "#ff6b6b", fontSize: "1.4rem", marginBottom: "0.8rem" }}>
              Lỗi tải dữ liệu
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.2rem", fontSize: "0.9rem" }}>
              {fetchError}
            </p>
            <button
              onClick={handleRetry}
              style={{
                padding: "0.6rem 1.6rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Thử lại
            </button>
          </div>
        </div>
      </DeviceProvider>
    );
  }

  return (
    <DeviceProvider forcedDeviceType={forcedDeviceType}>
      <div className="h-full w-full">
        <GameController customQuestions={customQuestions} />
      </div>
    </DeviceProvider>
  );
};

export default Index;
