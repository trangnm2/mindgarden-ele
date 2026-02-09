import "./QuestionPanel.css";
import HtmlContentRenderer from "@/fe/components/HtmlContentRenderer";

interface QuestionPanelProps {
  question: string;
  imageUrl?: string;
  audioUrl?: string;
  questionFrame: string;
}

const QuestionPanel = ({ 
  question, 
  imageUrl,
  audioUrl,
  questionFrame,
}: QuestionPanelProps) => {

  return (
    <div 
      className="question-container" 
      style={{ borderImageSource: `url(${questionFrame})` }}
    >
      <div className="question-text">
        <HtmlContentRenderer html={question} />
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Question" 
          />
        )}
      </div>

      {audioUrl && (
        <div className="audio-control mt-2 mb-[1cqw] w-full flex justify-center relative z-10">
           <audio src={audioUrl} controls className="max-w-full" />
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;
