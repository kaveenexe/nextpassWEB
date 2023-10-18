// const express = require('express');
// const app = express();

// const admin = require("firebase-admin");
// const credentials = require("./serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(credentials)
// });


// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.post('/signup',async(req,res) =>{
//     console.log(req.body);
//     const user = {
//         email: req.body.email,
//         password: req.body.password,
//         // confirmPassword: req.body.confirmPassword,
//         // handle: req.body.handle
//     }


//     const userResponse = await admin.auth().createUser({
//         email: user.email,
//         password: user.password,
//         emailVerified: true,
//         disabled: false
//     });
//     res.send(userResponse);
// })
