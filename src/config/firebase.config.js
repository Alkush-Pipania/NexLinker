import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCyUds5tlPdzK6j8FKIsGCgYK4SFrfVcpA",
  authDomain: "resume-builder-2024-3d12f.firebaseapp.com",
  projectId: "resume-builder-2024-3d12f",
  storageBucket: "resume-builder-2024-3d12f.appspot.com",
  messagingSenderId: "621825203040",
  appId: "1:621825203040:web:b976d1ac35dc249a185c05"
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APPID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app);
export { auth, db ,storage };
