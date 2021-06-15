const functions = require("firebase-functions");
const admin = require('firebase-admin');
const app = require('express')(); 
admin.initializeApp();

const config = {
    apiKey: "AIzaSyCFpwjnrI9jKzcpClFAma3lrnbj9TC881Y",
    authDomain: "socialape-8cb96.firebaseapp.com",
    projectId: "socialape-8cb96",
    storageBucket: "socialape-8cb96.appspot.com",
    messagingSenderId: "938510500184",
    appId: "1:938510500184:web:6dbfa3ce99b5f4b2af252d",
    measurementId: "G-0TW1GHRF1C"
};

const firebase = require ('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(screams);
        })
        .catch((err) => console.error(err));
})

app.post('/scream', (req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    }; 

    db
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
});

//signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

//todo validate data
    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists){
                return res.status(400).json({ handle: 'this handle is already taken'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
            
        })
        .then(idtoken => {
            token = idtoken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json( { token });
        })
        .catch (err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use'){
                return res.status(400).json({ email: 'email is already in use'});
            } else {
              return res.status(500).json({ error: err.code });  
            }   
        })
});

exports.api = functions.https.onRequest(app);