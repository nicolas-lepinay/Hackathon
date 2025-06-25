// src/App.js
import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

function App() {
  const [questions, setQuestions] = useState(null);
  const [currentStep, setCurrentStep] = useState('quiz'); // 'quiz' ou 'result'
  const [userAnswers, setUserAnswers] = useState([]);     // [{questionIndex, answerText, score}]
  const [score, setScore] = useState(0);

  // Chargement du JSON de questions au démarrage
  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  // Quand l'utilisateur termine le quiz
  const handleQuizEnd = (answers, totalScore) => {
    setUserAnswers(answers);
    setScore(totalScore);
    setCurrentStep('result');
  };

  if (!questions) {
    return <div style={{textAlign: "center", marginTop: 50}}>Chargement des questions...</div>;
  }

  return (
    <div className="App">
        <img
            src="https://cdn-icons-png.flaticon.com/512/2724/2724637.png"
            alt="Feuille écologie"
            style={{ width: 56, margin: '0 auto 16px auto', display: 'block' }}
        />

      <h1>Quiz Écologique</h1>
      {currentStep === 'quiz' && (
        <Quiz
          questions={questions}
          onQuizEnd={handleQuizEnd}
        />
      )}
      {currentStep === 'result' && (
        <Result
          questions={questions}
          userAnswers={userAnswers}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
