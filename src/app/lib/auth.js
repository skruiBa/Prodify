import { auth } from './firebaseConfig'; // Your Firebase config
import { signInAnonymously, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Anonymous Sign-In
export const signInAnonymouslyUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log('Anonymous user signed in:', userCredential.user);
    return userCredential.user; // Returns the authenticated user
  } catch (error) {
    console.error('Error during anonymous sign-in:', error.message);
    throw error;
  }
};

export const signIn = async (email, password) => {
  console.log('signIn called with email:', email, 'and password:', password);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
    return userCredential.user; // Returns the authenticated user
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    throw error;
  }
};

export const createAccount = async (email, password) => {
  console.log('signUp called with email:', email, 'and password:', password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Account created successfully:', userCredential.user);
    return userCredential.user; // Returns the authenticated user
  } catch (error) {
    console.error('Error during sign-up:', error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
};
