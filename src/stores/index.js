// import all stores
import configStore from './config';
import authStore from './auth';
import dataStore from './data';

// all stores in application
const exportStores = {
	configStore,
	authStore,
	dataStore
}

// export all stores as default
export default exportStores;