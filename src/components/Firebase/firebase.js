import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyDsvSTa0at-4TA_hndJrnGi-DEf1Wu8MnU",
  authDomain: "send-me-a-postcard.firebaseapp.com",
  databaseURL: "https://send-me-a-postcard.firebaseio.com",
  projectId: "send-me-a-postcard",
  storageBucket: "send-me-a-postcard.appspot.com",
  messagingSenderId: "115285480451",
  appId: "1:115285480451:web:1c4737435b25db2b5faa36",
  measurementId: "G-DEV8WR20KY"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;