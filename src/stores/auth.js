import firebase from 'firebase';
import { observable, action } from 'mobx';
import { runInAction } from 'mobx';
import { Bind } from 'lodash-decorators';

export const STORAGE_KEY_FOR_USER_UID = 'USER_UID';

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
	@action
	signIn(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
			runInAction(() => {
				authStore.authUser = user;
			})
			this.setKeyToStorage(STORAGE_KEY_FOR_USER_UID, user.uid);
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