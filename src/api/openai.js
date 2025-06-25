const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
 
async function getOpenAIFeedback(apiKey, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`Erreur OpenAI API : ${response.status}`);
  }
  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export { getOpenAIFeedback, OPENAI_API_KEY };
