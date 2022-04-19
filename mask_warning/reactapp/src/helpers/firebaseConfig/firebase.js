import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBElP6zmx4eQzXA9DVZd0FSeynofjM2Ax4",
  authDomain: "mask-warning.firebaseapp.com",
  projectId: "mask-warning",
  storageBucket: "mask-warning.appspot.com",
  messagingSenderId: "496830122240",
  appId: "1:496830122240:web:3505a9bc2f1cc8efd94be5",
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
