
import React from 'react';

interface ResultsViewProps {
  score: number;
  total: number;
  onRestartChat: () => void;
  onGoHome: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ score, total, onRestartChat, onGoHome }) => {
  const percentage = (score / total) * 100;
  
  let title = "Great job!";
  let message = "You're really getting the hang of this. Let's learn some more!";
  let emoji = "🌟";

  if (percentage === 100) {
    title = "Perfect Score!";
    message = "Wow, you're a genius! Spark is impressed.";
    emoji = "🏆";
  } else if (percentage < 50) {
    title = "Good Effort!";
    message = "Learning is a journey. Let's chat more about this topic so you can master it!";
    emoji = "📚";
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 animate-in zoom-in-95 duration-500">
      <div className="text-7xl mb-6">{emoji}</div>
      <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{title}</h2>
      <div className="bg-indigo-50 px-8 py-4 rounded-3xl mb-6">
        <span className="text-indigo-600 font-black text-5xl">
          {score}
          <span className="text-indigo-300 text-2xl font-bold ml-2">/ {total}</span>
        </span>
      </div>
      
      <p className="text-lg text-slate-600 max-w-md mb-10 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onRestartChat}
          className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          Keep Learning
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
