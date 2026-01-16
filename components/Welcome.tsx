
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-indigo-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <img 
          src="https://picsum.photos/seed/tutor/200/200" 
          alt="Spark Mascot" 
          className="relative w-40 h-40 rounded-3xl shadow-2xl border-4 border-white"
        />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Learn Anything with <span className="text-indigo-600">Spark</span>
      </h2>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Your personal AI tutor designed for students. Ask questions, explore new topics, and test your knowledge with fun quizzes!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
        <FeatureCard 
          icon="💬" 
          title="Interactive Chat" 
          description="Ask Spark about history, science, math, or anything else."
        />
        <FeatureCard 
          icon="🧠" 
          title="Smart Explanations" 
          description="Get answers that make sense and use fun examples."
        />
        <FeatureCard 
          icon="🎯" 
          title="Custom Quizzes" 
          description="Test your knowledge with quizzes made just for you."
        />
      </div>

      <button
        onClick={onStart}
        className="group relative px-10 py-5 bg-indigo-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
      >
        Let's Get Started
        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-slate-500 text-sm leading-snug">{description}</p>
  </div>
);

export default Welcome;
