'use client';

import { useEffect, useState } from 'react';
import { signInAnonymouslyUser, signIn, createAccount } from '@/app/lib/auth';
import PageWrapper from '@/components/PageWrapper';
import PrimaryButton from '@/components/PrimaryButton';
import TertiaryButton from '@/components/TertiaryButton';
import Tooltip from '@/components/Tooltip';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigateHome();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async (e) => {
    e.preventDefault();
    try {
      await signInAnonymouslyUser(); // Sign in
      navigateHome();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await createAccount(email, password);
      navigateHome();
    } catch (err) {
      setError(err.message);
    }
  };
  const navigateHome = () => {
    window.location.href = '/';
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-8">Login</h1>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full m">
        <label htmlFor="email" className="text-white/60">
          Email
        </label>
        <div
          className="flex flex-col w-full h-auto mx-auto gap-4 
          items-center justify-between mb-4 bg-backgroundlight p-4
          border shadow-md shadow-background"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete=""
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xl bg-transparent outline-none"
            required
            autoFocus
          />
        </div>
        <label htmlFor="password" className="text-white/60">
          Password
        </label>
        <div
          className="flex flex-col w-full h-auto mx-auto gap-4 
          items-center justify-between mb-4 bg-backgroundlight p-4
          border shadow-md shadow-background"
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-xl bg-transparent outline-none"
            required
            autoComplete="current-password"
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <PrimaryButton onClick={handleLogin} type="submit" className="w-full">
            Login
          </PrimaryButton>
          <PrimaryButton onClick={handleCreateAccount} type="submit" className="w-full">
            Create Account
          </PrimaryButton>
        </div>
      </form>

      {/* Anonymous Login Button */}
      <div className="flex flex-row  items-center">
        <TertiaryButton onClick={handleAnonymousLogin}>Login Anonymously</TertiaryButton>
        <Tooltip
          text={
            <>
              <p>Use this for testing the website functionality. Account works for 30 days.</p>
            </>
          }
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </PageWrapper>
  );
}
