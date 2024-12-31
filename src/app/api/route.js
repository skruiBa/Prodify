'use server';
import OpenAI from 'openai';

// Temporary API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const AI_PROMPT =
  'You are an intelligent assistant integrated into a productivity app. Your purpose is to help users organize their daily tasks, break down long-term goals into actionable steps, and provide tailored advice or brainstorming support. You respond to user queries with clarity and offer motivational insights or structured guidance when needed. Your tone is supportive, concise, and focused on empowering the user to achieve their goals efficiently. 50 words or less';

// Function for generating answers
export async function POST(request) {
  try {
    const { prompt } = await request.json(); // Get the prompt from the request

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Specify the GPT-4 model
      messages: [
        {
          role: 'system',
          content: AI_PROMPT
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 100 // Limit the response length
    });
    return new Response(JSON.stringify({ completion: completion.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
