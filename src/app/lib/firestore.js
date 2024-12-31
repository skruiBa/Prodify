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
  onSnapshot
} from 'firebase/firestore';

export const fsAddTask = async (userId, task) => {
  try {
    const taskRef = collection(db, `users/${userId}/tasks`);
    await addDoc(taskRef, task);
    console.log('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const fsUpdateTask = async (userId, taskId, updates) => {
  try {
    const taskRef = doc(db, `users/${userId}/tasks/${taskId}`);
    await updateDoc(taskRef, updates);
    console.log('Task updated successfully:', updates);
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error;
  }
};

export const fsListenToTasksByDate = (userId, date, callback) => {
  try {
    const tasksRef = collection(db, `users/${userId}/tasks`);
    const q = query(tasksRef, where('date', '==', date));

    return onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

export const fsDeleteTask = async (userId, taskId) => {
  try {
    const taskRef = doc(db, `users/${userId}/tasks/${taskId}`);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
};

export const fsDeleteMiniTask = async (userId, taskId, updatedMiniTasks) => {
  try {
    const taskRef = doc(db, `users/${userId}/tasks/${taskId}`);
    await updateDoc(taskRef, {
      miniTasks: updatedMiniTasks
    });
    console.log('Task updated successfully');
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
};

export const fsAddTemplate = async (userId, template) => {
  try {
    const taskRef = collection(db, `users/${userId}/templates`);
    await addDoc(taskRef, template);
    console.log('template added successfully');
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
};

export const fsListenToTemplates = async (userId, callback) => {
  try {
    const templatesRef = collection(db, `users/${userId}/templates`);

    return onSnapshot(
      templatesRef,
      (snapshot) => {
        const templates = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data() // Spread the document fields
        }));
        callback(templates); // Pass updated templates to the callback
      },
      (error) => {
        console.error('Error with Firestore listener:', error);
      }
    );
  } catch (error) {
    console.error('Error getting templates:', error);
    return () => {};
  }
};

export const fsDeleteTemplate = async (userId, templateId) => {
  try {
    const taskRef = doc(db, `users/${userId}/templates/${templateId}`);
    await deleteDoc(taskRef);
    console.log('Template deleted successfully');
  } catch (error) {
    console.error('Error deleting template:', error);
    return null;
  }
};

export const fsListenToVisions = (userId, callback) => {
  try {
    const visionsRef = collection(db, `users/${userId}/visions`);
    const unsubscribe = onSnapshot(
      visionsRef,
      (snapshot) => {
        const visions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        callback(visions);
      },
      (error) => {
        console.error('Error with Firestore listener:', error);
      }
    );

    return unsubscribe; // Return the unsubscribe function
  } catch (error) {
    console.error('Error setting up Firestore listener:', error);
    return () => {}; // Return a no-op function in case of failure
  }
};

export const fsAddVision = async (userId, vision) => {
  try {
    const visionRef = collection(db, `users/${userId}/visions`);
    await addDoc(visionRef, vision);
    console.log('vision added successfully');
  } catch (error) {
    console.error('Error adding vision:', error);
    return null;
  }
};

export const fsDeleteVision = async (userId, visionId) => {
  try {
    const visionRef = doc(db, `users/${userId}/visions/${visionId}`);
    await deleteDoc(visionRef);
    console.log('Vision deleted successfully');
  } catch (error) {
    console.error('Error deleting Vision:', error);
    return null;
  }
};
export const fsUpdateVision = async (userId, visionId, updatedVision) => {
  try {
    const visionRef = doc(db, `users/${userId}/visions/${visionId}`);
    await updateDoc(visionRef, updatedVision);
    console.log('Vision updated successfully');
  } catch (error) {
    console.error('Error updating vision:', error);
    return null;
  }
};
