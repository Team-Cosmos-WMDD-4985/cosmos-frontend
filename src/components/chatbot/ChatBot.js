import axios from 'axios';

const openAIKey = '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';

const openAIApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openAIKey}`
  }
});

export const sendMessageToOpenAI = async (message) => {
  try {
    const response = await openAIApi.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: message
      }]
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return 'Sorry, I could not fetch a response. Please try again.';
  }
};
