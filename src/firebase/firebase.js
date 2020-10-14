import firebase from 'firebase';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// set database variable
const database = firebase.database();
// set auth provider to google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// set custom parms to force account selection
googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
});

export { firebase, googleAuthProvider, database as default };

// // database.ref('expenses')
// //     .once('value')
// //     .then((snapshot) => {
// //         //console.log(snapshot.val())
// //         const expenses = [];
// //         // snapshot for each returns child snapshot/indv objects
// //         snapshot.forEach((childSnapshot) => {
// //             expenses.push({
// //                 id: childSnapshot.key,
// //                 ...childSnapshot.val()
// //             });
// //         });
// //         console.log(expenses);
// //     });

// // const onExpensesChange = database.ref('expenses')
// //     .on('value', (snapshot) => {
// //         //console.log(snapshot.val())
// //         const expenses = [];
// //         // snapshot for each returns child snapshot/indv objects
// //         snapshot.forEach((childSnapshot) => {
// //             expenses.push({
// //                 id: childSnapshot.key,
// //                 ...childSnapshot.val()
// //             });
// //         });
// //         console.log(expenses);
// //     }, (e) => {
// //         console.log('Error with data fetching: ', e);
// //     });
// // events for .on include value, removed, changed, added
// database.ref('expenses')
//     .on('child_removed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     })

// database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     })

// database.ref('expenses')
//     .on('child_added', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     })

// // create array data with database push
// database.ref('expenses').push({
//     description: 'rent',
//     amount: 1234,
//     createdAt: 1000,
//     notes: ''
// })
// // can also use pub/sub for changes
// // note - can set function to a variable for easy tracking and turning off
// // const onValueChange = database.ref().on('value', (snapshot) => {
// //     console.log(snapshot.val());
// // }, (e) => {
// //     console.log('Error with data fetching: ', e);
// // });

// // const onTestChange = database.ref().on('value', (snapshot) => {
// //     const name = snapshot.val().name;
// //     const title = snapshot.val().job.title;
// //     const company = snapshot.val().job.company;
// //     console.log(`${name} is a ${title} at ${company}`);
// // }, (e) => {
// //     console.log('Error with data fetching: ', e);
// // });

// // setTimeout(() => {
// //     database.ref('job/title').set('Manager');
// // }, 3500);
// // // now unsubscribe
// // // setTimeout(() => {
// // //     database.ref().off('value', onValueChange);
// // // }, 7000);
// // setTimeout(() => {
// //     database.ref('job/company').set('ARC');
// // }, 5000);

// // database.ref('location/city')
// //     .once('value')
// //     .then((snapshot) => {
// //         const val = snapshot.val();
// //         console.log(val);
// //     })
// //     .catch((e) => {
// //         console.log('Error fetching data: ', e);
// //     })
// // set returns a promise so you can change then/catch blocks
// // database.ref()
// //     .set({
// //         name: 'Randy Covert',
// //         age: 26,
// //         stressLevel: 5,
// //         job: {
// //             title: 'Software developer',
// //             company: 'Google'
// //         },
// //         isSingle: false,
// //         location: {
// //             city: 'Chicago',
// //             country: 'United States'
// //         }
// //     }).then(() => {
// //         console.log('Data is saved.');
// //     }).catch((e) => {
// //         console.log('This failed: ', e);
// //     });

// //update api takes object as arg
// // note alternate syntax for nest object update
// // database.ref()
// //     .update({
// //         stressLevel: 9,
// //         'job/company': 'Amazon',
// //         'location/city': 'Seattle'
// //     });
// // now use remove api
// // database.ref('isSingle')
// //     .remove()
// //     .then(() => {
// //         console.log('isSingle removed.');
// //     }).catch((e) => {
// //         console.log('remove failed with: ', e);
// //     });

// // can also use set to remove data
// // database.ref('isSingle').set(null);

// //database.ref().set('This is my data');
// // database.ref('age').set(27);
// // database.ref('location/city').set('New York');

// // database.ref('attributes').set({
// //     height: '6ft 1in',
// //     weight: 197
// // }).then(() => {
// //     console.log('Attributes added')
// // }).catch((e) => {
// //     console.log('Something went wrong: ', e);
// // });

// // console.log('I made a request to change the data...')