import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyAYE7MjFt8LdpImuAP4k8igmQvqV2XuTJI",
    authDomain: "quickforgetclone.firebaseapp.com",
    projectId: "quickforgetclone",
    storageBucket: "quickforgetclone.firebasestorage.app",
    messagingSenderId: "129152541857",
    appId: "1:129152541857:web:a7ebb8a0abc4c7dc9bfce0",
    measurementId: "G-GQ77SQ8YK3"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 