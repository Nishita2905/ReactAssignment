import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDCxhrPfbBw3VocQeFWaJEB98psOg7Z1dU",
    authDomain: "fir-tutorial-f6f6d.firebaseapp.com",
    projectId: "fir-tutorial-f6f6d",
    storageBucket: "fir-tutorial-f6f6d.appspot.com",
    messagingSenderId: "119806440316",
    appId: "1:119806440316:web:37d24aee28d1c13655aaf9",
    measurementId: "G-NFE6Q9ZMYW"
};

const fire = firebase.initializeApp(config);
firebase.analytics();
export default fire;