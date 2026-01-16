
import React, { useState } from 'react';
import { Quiz } from '../types';

interface QuizViewProps {
  quiz: Quiz;
  onFinish: (score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Topic: {quiz.topic}</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">Quiz Time!</h3>
          </div>
          <span className="text-slate-400 font-medium">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-500" 
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 animate-in fade-in zoom-in-95 duration-300">
        <h4 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-snug">
          {currentQuestion.question}
        </h4>

        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, idx) => {
            let statusClass = "border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30";
            if (selectedAnswer !== null) {
              if (idx === currentQuestion.correctAnswer) {
                statusClass = "border-green-500 bg-green-50 text-green-700";
              } else if (idx === selectedAnswer) {
                statusClass = "border-red-500 bg-red-50 text-red-700";
              } else {
                statusClass = "border-slate-100 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-6 py-4 rounded-2xl border-2 font-medium transition-all flex items-center gap-4 ${statusClass}`}
              >
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-base md:text-lg">{option}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`p-6 rounded-2xl mb-8 animate-in slide-in-from-top-2 duration-300 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
              <h5 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Awesome! Correct!' : 'Almost! Not quite.'}
              </h5>
            </div>
            <p className={`text-sm md:text-base leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
