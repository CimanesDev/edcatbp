import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Add a new document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

// Get a single document
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Get all documents in a collection
export const getDocuments = async (collectionName, conditions = []) => {
  try {
    let q = collection(db, collectionName);
    
    // Apply conditions if any
    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

// Helper function to create a query condition
export const createQueryCondition = (field, operator, value) => {
  return where(field, operator, value);
};

// Helper function to create an order by condition
export const createOrderByCondition = (field, direction = 'asc') => {
  return orderBy(field, direction);
};

// Add a document with a custom ID
export const setDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

// Subcollection helpers
export const getSubcollectionDocs = async (parentCollection, parentId, subcollection) => {
  try {
    const subColRef = collection(db, parentCollection, parentId, subcollection)
    const querySnapshot = await getDocs(subColRef)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    throw error
  }
}

export const setSubcollectionDoc = async (parentCollection, parentId, subcollection, docId, data) => {
  try {
    const docRef = doc(db, parentCollection, parentId, subcollection, docId)
    await setDoc(docRef, { ...data })
  } catch (error) {
    throw error
  }
}

export const updateSubcollectionDoc = async (parentCollection, parentId, subcollection, docId, data) => {
  try {
    const docRef = doc(db, parentCollection, parentId, subcollection, docId)
    await updateDoc(docRef, { ...data })
  } catch (error) {
    throw error
  }
}

export const deleteSubcollectionDoc = async (parentCollection, parentId, subcollection, docId) => {
  try {
    const docRef = doc(db, parentCollection, parentId, subcollection, docId)
    await deleteDoc(docRef)
  } catch (error) {
    throw error
  }
} 