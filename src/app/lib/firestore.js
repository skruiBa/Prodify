import { db } from './firebaseConfig';
import {
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  querySnapshot,
  onSnapshot,
  orderBy
} from 'firebase/firestore';

export const fsAddTask = async (userId, task, date) => {
  try {
    const taskRef = collection(db, `users/${userId}/tasks/${date}/tasks`);
    const docRef = await addDoc(taskRef, task); // Add the document and get the reference
    console.log('Task added successfully with ID:', docRef.id); // Get the ID of the new document
    return docRef.id; // Return the document ID if needed
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};
export const fsTasksSnapshot = (userId, date, callback) => {
  try {
    const tasksRef = collection(db, `users/${userId}/tasks/${date}/tasks`);
    const q = query(tasksRef, orderBy('time'));

    return onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // console.log('Tasks updated:', tasks);

        callback(tasks); // Pass updated tasks to the callback
      },
      (error) => {
        console.error('Error with Firestore listener:', error);
      }
    );
  } catch (error) {
    console.error('Error getting tasks:', error);
    return null;
  }
};

export const fsUpdateTask = async (userId, taskId, updates, date) => {
  try {
    const taskRef = doc(db, `users/${userId}/tasks/${date}/tasks/${taskId}`);
    console.log(taskRef);
    await updateDoc(taskRef, updates);
    console.log('Task updated successfully:', updates);
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error;
  }
};

export const fsDeleteTask = async (userId, taskId, date) => {
  try {
    const taskRef = doc(db, `users/${userId}/tasks/${date}/tasks/${taskId}`);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
};
