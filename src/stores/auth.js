import firebase from 'firebase';
import { observable, action } from 'mobx';
import { runInAction } from 'mobx';
import { Bind } from 'lodash-decorators';

export const STORAGE_KEY_FOR_USER_UID = 'USER_UID';

export const provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');
provider.setCustomParameters({'allow_signup': 'false'});

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
			if (user) {
				this.authUser = user;
				this.setKeyToStorage(STORAGE_KEY_FOR_USER_UID, user.uid);
			} else {
				this.authUser = user;
				this.removeKeyFromStorage(STORAGE_KEY_FOR_USER_UID);
			}
		});
	}

	/**
	 * Method set value to localstorage
	 * @param {string} key 
	 * @param {string} value 
	 */
	@Bind()
	setKeyToStorage(key, value) {
		window.localStorage.setItem(key, value);
	}

	/**
	 * Method remove value from localstorage
	 * @param {string} key 
	 */
	@Bind()
	removeKeyFromStorage(key) {
		window.localStorage.removeItem(key);
	}

	@Bind()
	isUserAuthenticated() {
		return !!this.authUser || !!localStorage.getItem(STORAGE_KEY_FOR_USER_UID);
	};

	/**
	 * Method to sign in with email and password
	 * @param {string} email 
	 * @param {string} password 
	 */
	@action.bound
	signIn(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
			runInAction(() => {
				authStore.authUser = user;
			})
			this.setKeyToStorage(STORAGE_KEY_FOR_USER_UID, user.uid);
		});
	}

	@action.bound
	signInWithGitHub() {
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			console.log(token, user);
		}).catch(function(error) {
			// Handle Errors here.
			// var errorCode = error.code;
		  // var errorMessage = error.message;
			// The email of the user's account used.
			// var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			// var credential = error.credential;
			console.log(error);
		});
	}

	/**
	 * Method to sign out from application
	 */
	@action
	signOut() {
		return firebase.auth().signOut().then((user) => {
			runInAction(() => {
				authStore.authUser = user;
			});
			this.removeKeyFromStorage(STORAGE_KEY_FOR_USER_UID);
		});
	}
}

const authStore = new AuthStore();

export default authStore;