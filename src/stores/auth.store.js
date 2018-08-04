import firebase from 'firebase';
import { observable, action } from 'mobx';
import { Bind } from '../../node_modules/lodash-decorators';

export class AuthStore {
    // current user auth state
    @observable authUser = null;

    constructor() {
        this.setUserAuthState();
    }

    /**
     * Method set current user auth state
     */
    @action.bound
    setUserAuthState() {
        firebase.auth().onAuthStateChanged(user => {
            this.authUser = user;
        });
    }

    /**
     * Method return true if user authed otherwise false
     */
    @Bind()
    isUserAuthed() {
        if(this.authUser) return true;
        else return false;
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


