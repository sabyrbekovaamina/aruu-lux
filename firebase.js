import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5Uh9uT9PmIsCwoXHyH8tNOxQVlTLIRcI",
  authDomain: "aruu-lux.firebaseapp.com",
  projectId: "aruu-lux",
  storageBucket: "aruu-lux.appspot.com",
  messagingSenderId: "771999945899",
  appId: "1:771999945899:web:9cbe84aaca200f34f3d3ee",
  measurementId: "G-VGWQ21DEN5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
