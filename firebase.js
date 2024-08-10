// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import {getFirestore} from "firebase/firestore";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBs7lwwW-pU7W7v0t3pn1LXRCMiUXU7sHU",
      authDomain: "pantry-tracker-22dd2.firebaseapp.com",
      projectId: "pantry-tracker-22dd2",
      storageBucket: "pantry-tracker-22dd2.appspot.com",
      messagingSenderId: "598955372615",
      appId: "1:598955372615:web:a6d3fd43b69356aebf4162",
      measurementId: "G-EQWGCBN7K2"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const firestore = getFirestore(app);

    export {firestore};