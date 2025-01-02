'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import PageWrapper from '@/components/PageWrapper';
import TopNavbar from '@/components/Task/TasksTopNavbar';

export default function Improve() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });

      if (!res.ok) throw new Error('Failed to fetch response');

      const data = await res.json();
      console.log('Response:', data);

      setResponse(data.completion);
    } catch (error) {
      console.error('Error:', error.message);
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavbar />
      <PageWrapper>
        <h1 className="text-2xl font-bold mb-4">Chat with GPT-4</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4 flex flex-col w-full h-full">
          <input
            type="text"
            placeholder="..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border bg-dark-6 text-white p-2 rounded h-full"
            required
          />
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Loading...' : 'Ask'}
          </Button>
        </form>

        {response && (
          <div className="p-4 bg-dark-6 text-white rounded">
            <h2 className="font-semibold mb-2">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
