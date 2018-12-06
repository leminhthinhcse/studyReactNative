import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAK_VVrlpW99bJKU7YrCUflwRji78ArYDc",
    authDomain: "weathertracking-1803.firebaseapp.com",
    databaseURL: "https://weathertracking-1803.firebaseio.com",
    projectId: "weathertracking-1803",
    storageBucket: "weathertracking-1803.appspot.com",
    messagingSenderId: "466306459989"
  };
export const firebaseApp = firebase.initializeApp(config);