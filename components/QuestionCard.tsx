import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onRestart: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  score,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  onNext,
  onRestart,
}) => {
  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-4">
        <div className="flex justify-between items-center text-gray-700 font-semibold">
          <span className="text-lg" aria-live="polite">Điểm: {score}</span>
          <span className="text-lg">Câu: {questionNumber}/{totalQuestions}</span>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex-grow">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          let optionStyle = 'bg-white border-gray-300 hover:bg-indigo-50 hover:border-indigo-300';
          let textStyle = 'text-gray-700';

          if (isAnswered) {
            const isCorrectAnswer = option === question.correctAnswer;
            const isSelectedAnswer = option === selectedAnswer;

            if (isCorrectAnswer) {
              optionStyle = 'bg-green-100 border-green-500 ring-2 ring-green-300';
              textStyle = 'text-green-800 font-semibold';
            } else if (isSelectedAnswer) {
              optionStyle = 'bg-red-100 border-red-500 ring-2 ring-red-300';
              textStyle = 'text-red-800 font-semibold';
            } else {
              optionStyle = 'bg-gray-100 border-gray-200';
              textStyle = 'text-gray-500';
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(option)}
              disabled={isAnswered}
              className={`w-full text-left p-4 border rounded-lg transition-all duration-200 flex items-start space-x-3 disabled:cursor-not-allowed ${optionStyle}`}
              aria-pressed={selectedAnswer === option}
            >
              <span className={`font-bold ${textStyle}`}>{optionLetter}.</span>
              <span className={textStyle}>{option}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 text-right h-12 flex items-center justify-end">
        {isAnswered && (
          isLastQuestion ? (
            <button
              onClick={onRestart}
              className="animate-fade-in bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform transform hover:scale-105 duration-300"
            >
              Làm lại bài
            </button>
          ) : (
            <button
              onClick={onNext}
              className="animate-fade-in bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-transform transform hover:scale-105 duration-300"
            >
              Câu tiếp theo
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
