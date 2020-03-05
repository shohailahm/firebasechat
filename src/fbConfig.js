import firebase from 'firebase';
export const intiFire=()=>{
    var firebaseConfig = {
        apiKey: "AIzaSyA-kz-UcFun8iP7_DChv2mH9N3tGR-4mf8",
        authDomain: "chatapp-89dbc.firebaseapp.com",
        databaseURL: "https://chatapp-89dbc.firebaseio.com",
        projectId: "chatapp-89dbc",
        storageBucket: "chatapp-89dbc.appspot.com",
        messagingSenderId: "1043787722111",
        appId: "1:1043787722111:web:3d75a3723d99e0dc0f7e4a"
      };
      // Initialize Firebase
    return  firebase.initializeApp(firebaseConfig);
}
