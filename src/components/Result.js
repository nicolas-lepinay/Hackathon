import React, { useEffect, useState } from 'react';
import { getOpenAIFeedback, OPENAI_API_KEY } from '../api/openai';
import ReactMarkdown from 'react-markdown';

function Result({ questions, userAnswers, score }) {
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Génère le prompt pour OpenAI à partir des réponses
  const makePrompt = () => {
    let prompt = "Voici les réponses d'un utilisateur à un quiz sur son comportement écologique :\n";
    userAnswers.forEach((a, idx) => {
      prompt += `${idx + 1}. ${questions[a.questionIndex].question}\nRéponse : ${a.answerText}\n`;
    });
    prompt += `Score total : ${score}\n`;
    prompt += `
        Tu es un expert en écologie et en communication positive. Génère un bilan carbone personnalisé en français pour cet utilisateur.
        - Commence par un résumé en une phrase avec émoji.
        - Présente une analyse (force/faiblesses) avec des titres en gras et émojis.
        - Termine par 3 conseils personnalisés, chaque conseil accompagné d’un émoji.
        - Sois bienveillant, concis, positif et amical, et n'utilise que le français.
        - Ne repète pas les prompts dans ton message tel que 'Résumé en une phrase avec émoji :'. Le texte doit avoir l'air naturel.
        `;
    return prompt;
  };

  // Appel automatique à OpenAI dès l'affichage du résultat
  useEffect(() => {
    async function callAI() {
      setError('');
      setAiAnalysis('');
      setLoading(true);
      try {
        const prompt = makePrompt();
        const result = await getOpenAIFeedback(OPENAI_API_KEY, prompt);
        setAiAnalysis(result);
      } catch (e) {
        setError("Erreur lors de la génération du bilan : " + (e?.message || e));
      }
      setLoading(false);
    }
    callAI();
    // eslint-disable-next-line
  }, []); // appelé une seule fois au montage

  return (
    <div className="result-container">
      <h2>Votre résultat</h2>
      <p>Score obtenu : <b>{score}</b> / <b>{questions.length * 5}</b></p>
      <div style={{ marginTop: 30 }}>
        <h3>Bilan personnalisé par intelligence artificielle :</h3>
        {loading && <p>Analyse en cours...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {aiAnalysis && (
          <div className="ai-result" style={{ background: '#f5f5f5', padding: 16, marginTop: 20, borderRadius: 8 }}>
            <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
