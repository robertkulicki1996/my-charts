import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBmuixka4Dh_b2hMDIDW46d-wwYcyTVFkY",
    authDomain: "my-charts.firebaseapp.com",
    databaseURL: "https://my-charts.firebaseio.com",
    projectId: "my-charts",
    storageBucket: "my-charts.appspot.com",
    messagingSenderId: "1034435102832"
};

export class ConfigStore {
    constructor() {
        firebase.initializeApp(config);
    }
}

const configStore = new ConfigStore();

export default configStore;