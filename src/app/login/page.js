'use client';

import { useEffect, useState } from 'react';
import { signInAnonymouslyUser, signIn, createAccount } from '@/app/lib/auth';
import Button from '@/components/Button';
import PageWrapper from '@/components/PageWrapper';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // temporary login details
  useEffect(() => {
    setEmail('test@gmail.com');
    setPassword('password');
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async (e) => {
    e.preventDefault();
    try {
      await signInAnonymouslyUser(); // Sign in
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await createAccount(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-8">Login</h1>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-dark-6 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-dark-6 text-white"
          required
        />
        <Button onClick={handleLogin} type="submit">
          Login
        </Button>
        <Button onClick={handleCreateAccount} type="submit">
          Create Account
        </Button>
      </form>

      {/* Anonymous Login Button */}
      <Button onClick={handleAnonymousLogin}>Login Anonymously</Button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </PageWrapper>
  );
}
