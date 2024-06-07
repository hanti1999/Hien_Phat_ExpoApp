import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBUyXMdjilQFSQ5l9C9Zu3wTnFZZH5IPgI',
  authDomain: 'hien-phat-expoapp.firebaseapp.com',
  projectId: 'hien-phat-expoapp',
  storageBucket: 'hien-phat-expoapp.appspot.com',
  messagingSenderId: '744401507270',
  appId: '1:744401507270:web:b9f4f295df70aba2f418c7',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
