import React, { useState, useCallback, useEffect } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import { Question } from './types';
import QuestionCard from './components/QuestionCard';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const startNewQuiz = useCallback(() => {
    // Shuffle the questions for a new session
    const shuffledQuestions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }, []);

  useEffect(() => {
    startNewQuiz();
  }, [startNewQuiz]);

  const handleAnswerSelect = useCallback((answer: string) => {
    if (isAnswered) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setSelectedAnswer(answer);
    setIsAnswered(true);
  }, [isAnswered, currentQuestionIndex, questions]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [currentQuestionIndex, questions.length]);
  
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-lg mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Luyện Thi Địa Lý</h1>
        </header>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 min-h-[480px] flex flex-col transition-all duration-500 ease-in-out">
          {currentQuestion ? (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              score={score}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNextQuestion}
              onRestart={startNewQuiz}
            />
          ) : (
             <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Đang tải câu hỏi...</p>
             </div>
          )}
        </div>
         <footer className="text-center mt-6 text-indigo-200 text-sm">
          <p>Chúc bạn có một kỳ thi thành công!</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
