// KHONG SUA KHI DOI GAME
import "./AnswerOptionItem.css";
import HtmlContentRenderer from "@/fe/components/ContentRenderer/HtmlContentRenderer";

interface AnswerOptionItemProps {
  answer: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  isDisabled: boolean;
  isAnswered: boolean;
  correctIndex?: number;
  onClick: () => void;
}

const AnswerOptionItem = ({
  answer,
  index,
  isSelected,
  isCorrect,
  isDisabled,
  isAnswered,
  correctIndex = -1,
  onClick,
}: AnswerOptionItemProps) => {
  const getContainerClass = (): string => {
    let classes = "answer-container";

    if (isAnswered) {
      if (isSelected) {
        if (isCorrect) {
          classes += " correct";
        } else {
          classes += " wrong selected";
        }
      } 
      else if ((correctIndex >= 0 && index === correctIndex) || (isCorrect === false && index === correctIndex)) {
        classes += " correct";
      }
      else {
         classes += " wrong";
      }
    } else {
      if (isSelected) {
        classes += " selected";
      }
    }

    return classes;
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div
      onClick={() => !isDisabled && onClick()}
      className={getContainerClass()}
      style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
    >
      <div className="answer-label">
        {labels[index] ?? index + 1}
      </div>
      <div className="answer-text">
        <HtmlContentRenderer html={answer} />
      </div>
    </div>
  );
};

export default AnswerOptionItem;
