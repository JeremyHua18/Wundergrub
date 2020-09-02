import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyBZN9CgS6RlVbBvkwlk6BDgQO1qFYFemZQ",
  authDomain: "react-firebase-aa4aa.firebaseapp.com",
  databaseURL: "https://react-firebase-aa4aa.firebaseio.com",
  projectId: "react-firebase-aa4aa",
  storageBucket: "react-firebase-aa4aa.appspot.com",
  messagingSenderId: "727714665930",
  appId: "1:727714665930:web:beb3eb425d04aca2a5eb33",
  measurementId: "G-T0ME3V7YY3"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}
export default Firebase;