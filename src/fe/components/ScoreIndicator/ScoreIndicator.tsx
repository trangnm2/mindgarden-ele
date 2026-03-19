// KHONG SUA KHI DOI GAME
import "./ScoreIndicator.css";

interface ScoreIndicatorProps {
  total: number;
  currentIndex: number;
  answerResults: (boolean | null)[];
  indicatorImage: string;
}

const ScoreIndicator = ({ total, currentIndex, answerResults, indicatorImage }: ScoreIndicatorProps) => {
  return (
    <div className="score-container">
      {Array.from({ length: total }).map((_, index) => {
        const statusClasses: string[] = [];
        const result = answerResults[index];

        if (result === true) {
          statusClasses.push("completed-correct");
        } else if (result === false) {
          statusClasses.push("completed-wrong");
        }

        if (index === currentIndex) {
          statusClasses.push("active");
        }

        return (
          <div 
             key={index} 
             className={`score-item ${statusClasses.join(" ")}`.trim()}
          >
             <img src={indicatorImage} alt="Score" />
          </div>
        );
      })}
    </div>
  );
};

export default ScoreIndicator;
