import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    // sets values for action object
    type: 'LOGIN',
    uid
  });

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
            .then((result) => {
                var token = result.credential.accessToken;
                var user = result.user;

                console.log(token)
                console.log(user)
            });
    };
};

export const logout = () => ({
    type: 'LOGOUT'
  });

export const startLogout = () => {
    firebase.auth().signOut().then(() => {
        //console.log('signed out')
    }).catch((e) => {
        console.log('error ', e)
    });

    return () => {
        return firebase.auth().signOut();
    };

};