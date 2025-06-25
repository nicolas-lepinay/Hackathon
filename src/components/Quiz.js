import React, { useState } from 'react';

function Quiz({ questions, onQuizEnd }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    const nextAnswers = [
      ...answers,
      {
        questionIndex: current,
        answerText: option.text,
        score: option.score,
      }
    ];
    setAnswers(nextAnswers);
    setScore(score + option.score);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      onQuizEnd(nextAnswers, score + option.score);
    }
  };

  const q = questions[current];

  return (
    <div className="quiz-container">
      <div className="question">
        <h2>Question {current + 1} sur {questions.length}</h2>
        <p style={{ fontWeight: 600 }}>{q.question}</p>
      </div>
      <ul className="options">
        {q.options.map((opt, idx) => (
          <li key={idx} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => handleAnswer(opt)}
              className="option-btn"
            >
              {opt.text}
            </button>
          </li>
        ))}
      </ul>
      <div className="progress">
        <progress value={current + 1} max={questions.length}></progress>
      </div>
    </div>
  );
}

export default Quiz;
