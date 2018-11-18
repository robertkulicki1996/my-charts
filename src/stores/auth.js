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

	@observable gitHubToken = null;

	constructor() {
		this.setUserAuthState();
	}

	/**
	 * Method set current user auth state
	 */
	@action.bound
  setUserAuthState() {
		return new Promise((resolve, reject) => {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					this.authUser = user;
					this.setKeyToStorage(STORAGE_KEY_FOR_USER_UID, user.uid);
					resolve(user);
				} else {
					this.authUser = user;
					this.removeKeyFromStorage(STORAGE_KEY_FOR_USER_UID);
					reject('error');
				}
			});
		});
	}

	/**
	 * Get current signed in user info
	 */
	@action.bound
	async getCurrentUserInfo() {
		return firebase.auth().currentUser;
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

	@action.bound
	async signUp(name, email,password) {
		await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({displayName: name});
    }).catch((error) => {
			window.console.log(error);
    });
	}

	/**
	 * Method to sign in with email and password
	 * @param {string} email 
	 * @param {string} password 
	 */
	@action.bound
	signIn(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
			runInAction(() => {
				this.authUser = user;
			})
			this.setKeyToStorage(STORAGE_KEY_FOR_USER_UID, user.uid);
		});
	}

	@action.bound
	async signInWithGitHub() {
		await firebase.auth().signInWithPopup(provider)
		.then(result => {
			const token = result.credential.accessToken;
			runInAction(() => {
				this.authUser = result.user;
				// This gives you a GitHub Access Token. You can use it to access the GitHub API.
				this.gitHubToken = token;
			})
			this.setKeyToStorage(STORAGE_KEY_FOR_USER_UID, token);
		}).catch(error => {
			window.console.log(error);
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