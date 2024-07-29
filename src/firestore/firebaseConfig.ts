import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
	apiKey: 'AIzaSyDeZ6NFhqvOFTEVcbzk-yHqcaO6ysrdR2g',
	authDomain: 'ikea-data-4d4f9.firebaseapp.com',
	projectId: 'ikea-data-4d4f9',
	storageBucket: 'ikea-data-4d4f9.appspot.com',
	messagingSenderId: '432212726264',
	appId: '1:432212726264:web:5ccb414f682a455e28460d',
	measurementId: 'G-RZ9Q9PN6R4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
