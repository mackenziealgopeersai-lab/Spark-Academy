
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AppState, Message, Quiz } from './types';
import Welcome from './components/Welcome';
import Chat from './components/Chat';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import { getChatResponse, generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.WELCOME);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartChat = () => {
    setCurrentState(AppState.CHAT);
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'model',
        text: "Hi there! I'm Spark, your AI study buddy. What subject should we dive into today? Science, History, Math... or maybe something totally different?",
        timestamp: new Date()
      }]);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getChatResponse(messages, text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response || "Oops, my circuits got a bit tangled! Could you say that again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError("I had trouble connecting to my brain! Let's try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Determine topic from chat or use default
      const lastTopics = messages.slice(-4).map(m => m.text).join(" ");
      const quiz = await generateQuiz(lastTopics || "General Science and History");
      setCurrentQuiz(quiz);
      setCurrentState(AppState.QUIZ);
    } catch (err) {
      setError("I couldn't generate a quiz right now. Let's chat more first!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishQuiz = (score: number) => {
    setQuizScore(score);
    setCurrentState(AppState.QUIZ_RESULTS);
  };

  const handleRestart = () => {
    setCurrentState(AppState.WELCOME);
    setMessages([]);
    setCurrentQuiz(null);
  };

  return (
    <div className="min-h-screen sparkle-bg flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={handleRestart}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              S
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Spark Academy
            </h1>
          </div>
          {currentState !== AppState.WELCOME && (
             <button 
                onClick={handleRestart}
                className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
             >
               Home
             </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 relative">
        {currentState === AppState.WELCOME && (
          <Welcome onStart={handleStartChat} />
        )}
        
        {currentState === AppState.CHAT && (
          <Chat 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onStartQuiz={handleStartQuiz}
            isLoading={isLoading}
            error={error}
          />
        )}

        {currentState === AppState.QUIZ && currentQuiz && (
          <QuizView 
            quiz={currentQuiz} 
            onFinish={handleFinishQuiz} 
          />
        )}

        {currentState === AppState.QUIZ_RESULTS && (
          <ResultsView 
            score={quizScore} 
            total={currentQuiz?.questions.length || 3}
            onRestartChat={handleStartChat}
            onGoHome={handleRestart}
          />
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        Spark Academy &copy; {new Date().getFullYear()} • Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;
