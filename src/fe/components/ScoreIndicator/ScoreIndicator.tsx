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
        let statusClass = "";
        const result = answerResults[index];

        if (index === currentIndex) {
           statusClass = "active";
        } else if (result === true) {
           statusClass = "completed-correct";
        } else if (result === false) {
           statusClass = "completed-wrong";
        }

        return (
          <div 
             key={index} 
             className={`score-item ${statusClass}`}
          >
             <img src={indicatorImage} alt="Score" />
          </div>
        );
      })}
    </div>
  );
};

export default ScoreIndicator;
