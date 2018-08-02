import firebase from 'firebase';
import { observable, action } from 'mobx';

export class AuthStore {
    // ocurrent user auth state
    @observable authUser = null;

    constructor() {
        firebase.auth().onAuthStateChanged(user => {
            this.authUser = user;
        });
        // setTimeout(() => console.log("authUserAfterConstructor",this.authUser),2000);
    }

    /**
     * Method to sign in with email and password
     * @param {string} email 
     * @param {string} password 
     */
    @action
    signIn(email, password) {
        if(this.authUser) {
            return Promise.resolve(this.authUser);
        }
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     * Method to sign out from application
     */
    @action
    signOut() {
        if(this.authUser) {
            return firebase.auth().signOut();
        }
        return Promise.resolve(this.authUser);
    }
}

const authStore = new AuthStore();

export default authStore;


