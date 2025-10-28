
import React from 'react';
import { Question, UserAnswers } from '../types';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: UserAnswers;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ score, totalQuestions, questions, userAnswers, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getResultFeedback = () => {
    if (percentage >= 80) return 'Tuyệt vời!';
    if (percentage >= 50) return 'Làm tốt lắm!';
    return 'Cần cố gắng hơn nhé!';
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{getResultFeedback()}</h2>
        <p className="text-gray-600 mt-2">Kết quả của bạn:</p>
        <p className={`text-5xl font-bold my-3 ${getResultColor()}`}>{score} / {totalQuestions}</p>
        <p className="text-lg text-gray-700">Đạt {percentage}%</p>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 my-6">
        <h3 className="font-bold text-lg text-gray-800 sticky top-0 bg-gray-50 py-2">Xem lại câu trả lời</h3>
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;
          return (
            <div key={question.id} className="p-3 border-b border-gray-200">
              <p className="font-semibold text-gray-800">{index + 1}. {question.question}</p>
              <p className={`mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                Câu trả lời của bạn: <span className="font-medium">{userAnswer || 'Chưa trả lời'}</span>
                {isCorrect ? ' ✔️' : ' ❌'}
              </p>
              {!isCorrect && (
                <p className="mt-1 text-blue-700">
                  Đáp án đúng: <span className="font-medium">{question.correctAnswer}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-transform transform hover:scale-105 duration-300"
        >
          Làm lại bài
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
